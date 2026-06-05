"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const newRegimeSlabs = [
  { upto: 400000, rate: 0 },
  { upto: 800000, rate: 0.05 },
  { upto: 1200000, rate: 0.1 },
  { upto: 1600000, rate: 0.15 },
  { upto: 2000000, rate: 0.2 },
  { upto: 2400000, rate: 0.25 },
  { upto: Infinity, rate: 0.3 },
];

const oldRegimeSlabs = {
  below60: [
    { upto: 250000, rate: 0 },
    { upto: 500000, rate: 0.05 },
    { upto: 1000000, rate: 0.2 },
    { upto: Infinity, rate: 0.3 },
  ],
  senior: [
    { upto: 300000, rate: 0 },
    { upto: 500000, rate: 0.05 },
    { upto: 1000000, rate: 0.2 },
    { upto: Infinity, rate: 0.3 },
  ],
  superSenior: [
    { upto: 500000, rate: 0 },
    { upto: 1000000, rate: 0.2 },
    { upto: Infinity, rate: 0.3 },
  ],
};

const ageOptions = [
  { value: "below60", label: "Below 60 years" },
  { value: "senior", label: "60 to 79 years" },
  { value: "superSenior", label: "80 years and above" },
];

const gstRates = [0, 5, 12, 18, 28];
const tdsRates = [1, 2, 5, 10, 20];
const depreciationRates = [10, 15, 30, 40];

const advanceTaxSchedule = [
  { label: "15 June", percent: 0.15 },
  { label: "15 September", percent: 0.45 },
  { label: "15 December", percent: 0.75 },
  { label: "15 March", percent: 1 },
];

const formatInr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

function toNumber(value) {
  const parsed = Number(String(value).replaceAll(",", ""));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function calculateSlabTax(taxableIncome, slabs) {
  let previousLimit = 0;
  let tax = 0;

  for (const slab of slabs) {
    if (taxableIncome <= previousLimit) {
      break;
    }

    const taxableInSlab = Math.min(taxableIncome, slab.upto) - previousLimit;
    tax += taxableInSlab * slab.rate;
    previousLimit = slab.upto;
  }

  return Math.max(0, tax);
}

function getSurchargeRate(taxableIncome, regime) {
  if (taxableIncome > 50000000) {
    return regime === "old" ? 0.37 : 0.25;
  }

  if (taxableIncome > 20000000) {
    return 0.25;
  }

  if (taxableIncome > 10000000) {
    return 0.15;
  }

  if (taxableIncome > 5000000) {
    return 0.1;
  }

  return 0;
}

function calculateTax({
  grossIncome,
  deductions,
  standardDeduction,
  slabs,
  rebateLimit,
  maxRebate,
  resident,
  regime,
}) {
  const taxableIncome = Math.max(0, grossIncome - deductions - standardDeduction);
  const slabTax = calculateSlabTax(taxableIncome, slabs);
  const rebate =
    resident && taxableIncome <= rebateLimit ? Math.min(slabTax, maxRebate) : 0;
  const taxAfterRebate = Math.max(0, slabTax - rebate);
  const surchargeRate = getSurchargeRate(taxableIncome, regime);
  const surcharge = taxAfterRebate * surchargeRate;
  const cess = (taxAfterRebate + surcharge) * 0.04;
  const totalTax = Math.round(taxAfterRebate + surcharge + cess);

  return {
    taxableIncome,
    slabTax: Math.round(slabTax),
    rebate: Math.round(rebate),
    surcharge: Math.round(surcharge),
    cess: Math.round(cess),
    totalTax,
    monthlyTax: Math.round(totalTax / 12),
  };
}

function calculateGst({ amount, rate, mode }) {
  const value = toNumber(amount);
  const gstRate = toNumber(rate) / 100;

  if (mode === "inclusive") {
    const base = gstRate ? value / (1 + gstRate) : value;
    const gst = value - base;

    return {
      base: Math.round(base),
      gst: Math.round(gst),
      total: Math.round(value),
    };
  }

  const gst = value * gstRate;

  return {
    base: Math.round(value),
    gst: Math.round(gst),
    total: Math.round(value + gst),
  };
}

function calculateHra({ basicDa, hraReceived, rentPaid, isMetro }) {
  const salary = toNumber(basicDa);
  const actualHra = toNumber(hraReceived);
  const rentMinusTenPercent = Math.max(0, toNumber(rentPaid) - salary * 0.1);
  const salaryPercent = salary * (isMetro ? 0.5 : 0.4);
  const exemption = Math.min(actualHra, rentMinusTenPercent, salaryPercent);

  return {
    actualHra: Math.round(actualHra),
    rentMinusTenPercent: Math.round(rentMinusTenPercent),
    salaryPercent: Math.round(salaryPercent),
    exemption: Math.round(Math.max(0, exemption)),
    taxableHra: Math.round(Math.max(0, actualHra - exemption)),
  };
}

function calculateTds({ amount, rate }) {
  const base = toNumber(amount);
  const tds = base * (toNumber(rate) / 100);

  return {
    tds: Math.round(tds),
    netPayable: Math.round(Math.max(0, base - tds)),
  };
}

function calculateBusinessTax({ profit, rate, applyCess }) {
  const taxableProfit = toNumber(profit);
  const taxBeforeCess = taxableProfit * (toNumber(rate) / 100);
  const cess = applyCess ? taxBeforeCess * 0.04 : 0;

  return {
    taxableProfit: Math.round(taxableProfit),
    taxBeforeCess: Math.round(taxBeforeCess),
    cess: Math.round(cess),
    totalTax: Math.round(taxBeforeCess + cess),
  };
}

function calculatePricing({
  materialCost,
  labourCost,
  overheadCost,
  otherCost,
  marginPercent,
  gstPercent,
}) {
  const baseCost =
    toNumber(materialCost) +
    toNumber(labourCost) +
    toNumber(overheadCost) +
    toNumber(otherCost);
  const margin = baseCost * (toNumber(marginPercent) / 100);
  const sellingPrice = baseCost + margin;
  const gst = sellingPrice * (toNumber(gstPercent) / 100);

  return {
    baseCost: Math.round(baseCost),
    margin: Math.round(margin),
    sellingPrice: Math.round(sellingPrice),
    gst: Math.round(gst),
    invoiceValue: Math.round(sellingPrice + gst),
  };
}

function calculateBreakEven({ fixedCost, sellingPrice, variableCost }) {
  const fixed = toNumber(fixedCost);
  const selling = toNumber(sellingPrice);
  const variable = toNumber(variableCost);
  const contribution = Math.max(0, selling - variable);
  const units = contribution ? Math.ceil(fixed / contribution) : 0;

  return {
    contribution: Math.round(contribution),
    units,
    salesValue: Math.round(units * selling),
  };
}

function calculateEmi({ principal, annualRate, months }) {
  const loan = toNumber(principal);
  const monthCount = toNumber(months);
  const monthlyRate = toNumber(annualRate) / 100 / 12;

  if (!loan || !monthCount) {
    return { emi: 0, totalPayment: 0, interest: 0 };
  }

  const emi = monthlyRate
    ? (loan * monthlyRate * (1 + monthlyRate) ** monthCount) /
      ((1 + monthlyRate) ** monthCount - 1)
    : loan / monthCount;
  const totalPayment = emi * monthCount;

  return {
    emi: Math.round(emi),
    totalPayment: Math.round(totalPayment),
    interest: Math.round(Math.max(0, totalPayment - loan)),
  };
}

function calculateDepreciation({
  assetCost,
  residualValue,
  usefulLife,
  depreciationRate,
  method,
}) {
  const cost = toNumber(assetCost);
  const residual = toNumber(residualValue);

  if (method === "slm") {
    const annualDepreciation = toNumber(usefulLife)
      ? Math.max(0, cost - residual) / toNumber(usefulLife)
      : 0;

    return {
      annualDepreciation: Math.round(annualDepreciation),
      monthlyDepreciation: Math.round(annualDepreciation / 12),
      closingValue: Math.round(Math.max(residual, cost - annualDepreciation)),
    };
  }

  const annualDepreciation = cost * (toNumber(depreciationRate) / 100);

  return {
    annualDepreciation: Math.round(annualDepreciation),
    monthlyDepreciation: Math.round(annualDepreciation / 12),
    closingValue: Math.round(Math.max(0, cost - annualDepreciation)),
  };
}

function ResultCard({ title, result, active }) {
  return (
    <div
      className={`rounded-xl border p-6 shadow-sm ${
        active ? "border-[#d8bc80] bg-[#102040] text-white" : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p
            className={`text-xs font-bold uppercase tracking-[0.14em] ${
              active ? "text-[#fbf5e8]" : "text-[#244b7a]"
            }`}
          >
            {title}
          </p>
          <div className="mt-3 text-3xl font-bold">
            {formatInr.format(result.totalTax)}
          </div>
        </div>
        {active ? (
          <span className="rounded-xl bg-[#d8bc80] px-3 py-2 text-xs font-bold text-[#102040]">
            Lower
          </span>
        ) : null}
      </div>

      <div className="mt-6 grid gap-3 text-sm">
        {[
          ["Taxable income", result.taxableIncome],
          ["Tax before rebate", result.slabTax],
          ["Rebate", result.rebate],
          ["Surcharge", result.surcharge],
          ["Health & education cess", result.cess],
          ["Monthly estimate", result.monthlyTax],
        ].map(([label, value]) => (
          <div
            key={label}
            className={`flex items-center justify-between gap-4 border-t pt-3 ${
              active ? "border-white/15" : "border-slate-200"
            }`}
          >
            <span className={active ? "text-slate-200" : "text-slate-600"}>
              {label}
            </span>
            <span className="font-bold">{formatInr.format(value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TaxCalculator() {
  const [grossIncome, setGrossIncome] = useState("1200000");
  const [oldDeductions, setOldDeductions] = useState("150000");
  const [newDeductions, setNewDeductions] = useState("0");
  const [ageGroup, setAgeGroup] = useState("below60");
  const [isSalaried, setIsSalaried] = useState(true);
  const [isResident, setIsResident] = useState(true);
  const [gstAmount, setGstAmount] = useState("100000");
  const [gstRate, setGstRate] = useState("18");
  const [gstMode, setGstMode] = useState("exclusive");
  const [basicDa, setBasicDa] = useState("600000");
  const [hraReceived, setHraReceived] = useState("240000");
  const [rentPaid, setRentPaid] = useState("300000");
  const [isMetro, setIsMetro] = useState(true);
  const [advanceTaxPaid, setAdvanceTaxPaid] = useState("0");
  const [tdsAmount, setTdsAmount] = useState("100000");
  const [tdsRate, setTdsRate] = useState("10");
  const [businessProfit, setBusinessProfit] = useState("1500000");
  const [businessTaxRate, setBusinessTaxRate] = useState("30");
  const [applyBusinessCess, setApplyBusinessCess] = useState(true);
  const [materialCost, setMaterialCost] = useState("500000");
  const [labourCost, setLabourCost] = useState("120000");
  const [overheadCost, setOverheadCost] = useState("80000");
  const [otherCost, setOtherCost] = useState("25000");
  const [marginPercent, setMarginPercent] = useState("20");
  const [pricingGstPercent, setPricingGstPercent] = useState("18");
  const [fixedCost, setFixedCost] = useState("600000");
  const [unitSellingPrice, setUnitSellingPrice] = useState("1200");
  const [unitVariableCost, setUnitVariableCost] = useState("800");
  const [loanPrincipal, setLoanPrincipal] = useState("1000000");
  const [loanRate, setLoanRate] = useState("10");
  const [loanMonths, setLoanMonths] = useState("60");
  const [assetCost, setAssetCost] = useState("1000000");
  const [residualValue, setResidualValue] = useState("50000");
  const [usefulLife, setUsefulLife] = useState("5");
  const [depreciationRate, setDepreciationRate] = useState("15");
  const [depreciationMethod, setDepreciationMethod] = useState("slm");

  const results = useMemo(() => {
    const income = toNumber(grossIncome);

    const oldResult = calculateTax({
      grossIncome: income,
      deductions: toNumber(oldDeductions),
      standardDeduction: isSalaried ? 50000 : 0,
      slabs: oldRegimeSlabs[ageGroup],
      rebateLimit: 500000,
      maxRebate: 12500,
      resident: isResident,
      regime: "old",
    });

    const newResult = calculateTax({
      grossIncome: income,
      deductions: toNumber(newDeductions),
      standardDeduction: isSalaried ? 75000 : 0,
      slabs: newRegimeSlabs,
      rebateLimit: 1200000,
      maxRebate: 60000,
      resident: isResident,
      regime: "new",
    });

    return { oldResult, newResult };
  }, [ageGroup, grossIncome, isResident, isSalaried, newDeductions, oldDeductions]);

  const lowerRegime =
    results.newResult.totalTax <= results.oldResult.totalTax ? "new" : "old";
  const savings = Math.abs(results.newResult.totalTax - results.oldResult.totalTax);
  const estimatedTax =
    lowerRegime === "new" ? results.newResult.totalTax : results.oldResult.totalTax;
  const paidAdvanceTax = toNumber(advanceTaxPaid);
  const gstResult = useMemo(
    () => calculateGst({ amount: gstAmount, rate: gstRate, mode: gstMode }),
    [gstAmount, gstMode, gstRate]
  );
  const hraResult = useMemo(
    () => calculateHra({ basicDa, hraReceived, rentPaid, isMetro }),
    [basicDa, hraReceived, isMetro, rentPaid]
  );
  const tdsResult = useMemo(
    () => calculateTds({ amount: tdsAmount, rate: tdsRate }),
    [tdsAmount, tdsRate]
  );
  const businessTaxResult = useMemo(
    () =>
      calculateBusinessTax({
        profit: businessProfit,
        rate: businessTaxRate,
        applyCess: applyBusinessCess,
      }),
    [applyBusinessCess, businessProfit, businessTaxRate]
  );
  const pricingResult = useMemo(
    () =>
      calculatePricing({
        materialCost,
        labourCost,
        overheadCost,
        otherCost,
        marginPercent,
        gstPercent: pricingGstPercent,
      }),
    [
      labourCost,
      marginPercent,
      materialCost,
      otherCost,
      overheadCost,
      pricingGstPercent,
    ]
  );
  const breakEvenResult = useMemo(
    () =>
      calculateBreakEven({
        fixedCost,
        sellingPrice: unitSellingPrice,
        variableCost: unitVariableCost,
      }),
    [fixedCost, unitSellingPrice, unitVariableCost]
  );
  const emiResult = useMemo(
    () =>
      calculateEmi({
        principal: loanPrincipal,
        annualRate: loanRate,
        months: loanMonths,
      }),
    [loanMonths, loanPrincipal, loanRate]
  );
  const depreciationResult = useMemo(
    () =>
      calculateDepreciation({
        assetCost,
        residualValue,
        usefulLife,
        depreciationRate,
        method: depreciationMethod,
      }),
    [
      assetCost,
      depreciationMethod,
      depreciationRate,
      residualValue,
      usefulLife,
    ]
  );

  return (
    <div className="bg-white text-[#102040]">
      <section className="border-b border-slate-200 bg-[#102040] text-white">
        <div className="container grid gap-8 py-20 lg:grid-cols-[1fr_0.75fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#fbf5e8]">
              Tax and business calculators
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
              Practical calculators for tax, pricing, loans, and planning.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-[#f2f6fb]">
              Estimate income tax, GST, TDS, product pricing, break-even,
              EMI, depreciation, HRA, and advance tax from one place.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.08] p-6">
            <div className="text-sm font-bold uppercase tracking-[0.16em] text-[#fbf5e8]">
              Quick result
            </div>
            <p className="mt-4 text-2xl font-bold text-white">
              {lowerRegime === "new" ? "New regime" : "Old regime"} is lower by{" "}
              {formatInr.format(savings)}
            </p>
            <p className="mt-3 text-sm leading-7 text-[#f2f6fb]">
              This is an estimate for regular income. Special-rate income,
              marginal relief, and case-specific deductions need professional
              review.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="container space-y-10">
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
            <div className="self-start rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#244b7a]">
              Enter details
            </p>

            <div className="mt-6 grid gap-5">
              <label className="block">
                <span className="text-sm font-bold text-slate-700">
                  Annual gross income
                </span>
                <input
                  type="number"
                  min="0"
                  value={grossIncome}
                  onChange={(event) => setGrossIncome(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#244b7a] focus:ring-2 focus:ring-[#f7ecd5]"
                />
              </label>

              <label className="block">
                <span className="text-sm font-bold text-slate-700">
                  Age category
                </span>
                <select
                  value={ageGroup}
                  onChange={(event) => setAgeGroup(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#244b7a] focus:ring-2 focus:ring-[#f7ecd5]"
                >
                  {ageOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-bold text-slate-700">
                  Old regime deductions
                </span>
                <input
                  type="number"
                  min="0"
                  value={oldDeductions}
                  onChange={(event) => setOldDeductions(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#244b7a] focus:ring-2 focus:ring-[#f7ecd5]"
                />
              </label>

              <label className="block">
                <span className="text-sm font-bold text-slate-700">
                  New regime deductions
                </span>
                <input
                  type="number"
                  min="0"
                  value={newDeductions}
                  onChange={(event) => setNewDeductions(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#244b7a] focus:ring-2 focus:ring-[#f7ecd5]"
                />
              </label>

              <div className="grid gap-3 border-t border-slate-200 pt-5">
                <label className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={isSalaried}
                    onChange={(event) => setIsSalaried(event.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-[#102040] focus:ring-[#d8bc80]"
                  />
                  Apply salaried standard deduction
                </label>

                <label className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={isResident}
                    onChange={(event) => setIsResident(event.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-[#102040] focus:ring-[#d8bc80]"
                  />
                  Resident individual eligible for rebate
                </label>
              </div>
            </div>
          </div>

            <div className="space-y-6">
            <div className="grid gap-5 xl:grid-cols-2">
              <ResultCard
                title="New regime"
                result={results.newResult}
                active={lowerRegime === "new"}
              />
              <ResultCard
                title="Old regime"
                result={results.oldResult}
                active={lowerRegime === "old"}
              />
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#244b7a]">
                    Professional / business income tax
                  </p>
                  <h2 className="mt-3 text-xl font-bold text-[#102040]">
                    Quick tax estimate on business profit.
                  </h2>
                </div>
                <div className="rounded-xl bg-[#fbf5e8] px-4 py-3 text-right">
                  <div className="text-xs font-bold uppercase tracking-[0.12em] text-[#244b7a]">
                    Total tax
                  </div>
                  <div className="mt-1 text-2xl font-bold text-[#102040]">
                    {formatInr.format(businessTaxResult.totalTax)}
                  </div>
                </div>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <label className="block">
                  <span className="text-sm font-bold text-slate-700">
                    Taxable profit
                  </span>
                  <input
                    type="number"
                    min="0"
                    value={businessProfit}
                    onChange={(event) => setBusinessProfit(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#244b7a] focus:ring-2 focus:ring-[#f7ecd5]"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-bold text-slate-700">
                    Tax rate %
                  </span>
                  <input
                    type="number"
                    min="0"
                    value={businessTaxRate}
                    onChange={(event) => setBusinessTaxRate(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#244b7a] focus:ring-2 focus:ring-[#f7ecd5]"
                  />
                </label>
                <label className="flex items-center gap-3 pt-7 text-sm font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={applyBusinessCess}
                    onChange={(event) =>
                      setApplyBusinessCess(event.target.checked)
                    }
                    className="h-4 w-4 rounded border-slate-300 text-[#102040] focus:ring-[#d8bc80]"
                  />
                  Add 4% cess
                </label>
              </div>
              <div className="mt-5 grid gap-3 border-t border-slate-200 pt-4 text-sm md:grid-cols-3">
                {[
                  ["Taxable profit", businessTaxResult.taxableProfit],
                  ["Tax before cess", businessTaxResult.taxBeforeCess],
                  ["Cess", businessTaxResult.cess],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4">
                    <span className="text-slate-600">{label}</span>
                    <span className="font-bold">{formatInr.format(value)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-[#102040]">
                Important calculation notes
              </h2>
              <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-700">
                <p>
                  Uses AY 2026-27 individual slab rates, Section 87A rebate
                  limits, and 4% health and education cess.
                </p>
                <p>
                  Surcharge is estimated using standard slab thresholds, but
                  marginal relief and special-rate income are not modelled.
                </p>
                <p>
                  For return filing, capital gains, business income, losses, or
                  high-income cases, confirm the final computation with a tax
                  professional.
                </p>
              </div>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl bg-[#102040] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#244b7a]"
                >
                  Discuss with MM & Co.
                </Link>
                <a
                  href="https://www.incometax.gov.in/iec/foportal/help/individual/return-applicable-1"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-[#102040] transition hover:bg-slate-50"
                >
                  View official slabs
                </a>
              </div>
            </div>

            </div>
          </div>

          <div className="space-y-5">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#244b7a]">
                Tax utilities
              </p>
              <h2 className="mt-3 text-3xl font-bold text-[#102040]">
                Everyday tax calculations in one clean workspace.
              </h2>
            </div>

            <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#244b7a]">
                  GST calculator
                </p>
                <div className="mt-5 grid gap-4">
                  <label className="block">
                    <span className="text-sm font-bold text-slate-700">
                      Amount
                    </span>
                    <input
                      type="number"
                      min="0"
                      value={gstAmount}
                      onChange={(event) => setGstAmount(event.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#244b7a] focus:ring-2 focus:ring-[#f7ecd5]"
                    />
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="block">
                      <span className="text-sm font-bold text-slate-700">
                        Rate
                      </span>
                      <select
                        value={gstRate}
                        onChange={(event) => setGstRate(event.target.value)}
                        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-[#244b7a] focus:ring-2 focus:ring-[#f7ecd5]"
                      >
                        {gstRates.map((rate) => (
                          <option key={rate} value={rate}>
                            {rate}%
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="block">
                      <span className="text-sm font-bold text-slate-700">
                        Mode
                      </span>
                      <select
                        value={gstMode}
                        onChange={(event) => setGstMode(event.target.value)}
                        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-[#244b7a] focus:ring-2 focus:ring-[#f7ecd5]"
                      >
                        <option value="exclusive">Add GST</option>
                        <option value="inclusive">Includes GST</option>
                      </select>
                    </label>
                  </div>
                </div>
                <div className="mt-5 grid gap-3 border-t border-slate-200 pt-4 text-sm">
                  {[
                    ["Taxable value", gstResult.base],
                    ["GST amount", gstResult.gst],
                    ["Invoice value", gstResult.total],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-4">
                      <span className="text-slate-600">{label}</span>
                      <span className="font-bold">{formatInr.format(value)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#244b7a]">
                  HRA exemption
                </p>
                <div className="mt-5 grid gap-4">
                  {[
                    ["Basic + DA", basicDa, setBasicDa],
                    ["HRA received", hraReceived, setHraReceived],
                    ["Rent paid", rentPaid, setRentPaid],
                  ].map(([label, value, setter]) => (
                    <label key={label} className="block">
                      <span className="text-sm font-bold text-slate-700">
                        {label}
                      </span>
                      <input
                        type="number"
                        min="0"
                        value={value}
                        onChange={(event) => setter(event.target.value)}
                        className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#244b7a] focus:ring-2 focus:ring-[#f7ecd5]"
                      />
                    </label>
                  ))}
                  <label className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                    <input
                      type="checkbox"
                      checked={isMetro}
                      onChange={(event) => setIsMetro(event.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-[#102040] focus:ring-[#d8bc80]"
                    />
                    Metro city for 50% salary test
                  </label>
                </div>
                <div className="mt-5 grid gap-3 border-t border-slate-200 pt-4 text-sm">
                  {[
                    ["Eligible exemption", hraResult.exemption],
                    ["Taxable HRA", hraResult.taxableHra],
                    ["Rent less 10% salary", hraResult.rentMinusTenPercent],
                    [isMetro ? "50% of salary" : "40% of salary", hraResult.salaryPercent],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-4">
                      <span className="text-slate-600">{label}</span>
                      <span className="font-bold">{formatInr.format(value)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#244b7a]">
                  Advance tax planner
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  Uses the lower regime estimate above and shows cumulative
                  installment targets.
                </p>
                <label className="mt-5 block">
                  <span className="text-sm font-bold text-slate-700">
                    Advance tax already paid
                  </span>
                  <input
                    type="number"
                    min="0"
                    value={advanceTaxPaid}
                    onChange={(event) => setAdvanceTaxPaid(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#244b7a] focus:ring-2 focus:ring-[#f7ecd5]"
                  />
                </label>
                <div className="mt-5 grid gap-3 border-t border-slate-200 pt-4 text-sm">
                  {advanceTaxSchedule.map((item) => {
                    const target = Math.round(estimatedTax * item.percent);
                    const payable = Math.max(0, target - paidAdvanceTax);

                    return (
                      <div key={item.label} className="rounded-xl bg-slate-50 p-3">
                        <div className="flex justify-between gap-4">
                          <span className="font-bold text-[#102040]">
                            {item.label}
                          </span>
                          <span className="font-bold">
                            {Math.round(item.percent * 100)}%
                          </span>
                        </div>
                        <div className="mt-2 flex justify-between gap-4 text-slate-600">
                          <span>Target</span>
                          <span>{formatInr.format(target)}</span>
                        </div>
                        <div className="mt-1 flex justify-between gap-4 text-slate-600">
                          <span>Payable after paid amount</span>
                          <span>{formatInr.format(payable)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>

          <div className="space-y-5">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#244b7a]">
                Business planning tools
              </p>
              <h2 className="mt-3 text-3xl font-bold text-[#102040]">
                Pricing, profitability, loan, and asset planning helpers.
              </h2>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#244b7a]">
                  TDS calculator
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  Basic TDS amount and net payable calculation.
                </p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-bold text-slate-700">
                      Payment amount
                    </span>
                    <input
                      type="number"
                      min="0"
                      value={tdsAmount}
                      onChange={(event) => setTdsAmount(event.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#244b7a] focus:ring-2 focus:ring-[#f7ecd5]"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-bold text-slate-700">
                      TDS rate
                    </span>
                    <select
                      value={tdsRate}
                      onChange={(event) => setTdsRate(event.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#244b7a] focus:ring-2 focus:ring-[#f7ecd5]"
                    >
                      {tdsRates.map((rate) => (
                        <option key={rate} value={rate}>
                          {rate}%
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="mt-5 grid gap-3 border-t border-slate-200 pt-4 text-sm">
                  {[
                    ["TDS amount", tdsResult.tds],
                    ["Net payable", tdsResult.netPayable],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-4">
                      <span className="text-slate-600">{label}</span>
                      <span className="font-bold">{formatInr.format(value)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#244b7a]">
                  Costing / product pricing
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  Build a basic selling price from cost, margin, and GST.
                </p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {[
                    ["Material cost", materialCost, setMaterialCost],
                    ["Labour cost", labourCost, setLabourCost],
                    ["Overheads", overheadCost, setOverheadCost],
                    ["Other cost", otherCost, setOtherCost],
                    ["Margin %", marginPercent, setMarginPercent],
                    ["GST %", pricingGstPercent, setPricingGstPercent],
                  ].map(([label, value, setter]) => (
                    <label key={label} className="block">
                      <span className="text-sm font-bold text-slate-700">
                        {label}
                      </span>
                      <input
                        type="number"
                        min="0"
                        value={value}
                        onChange={(event) => setter(event.target.value)}
                        className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#244b7a] focus:ring-2 focus:ring-[#f7ecd5]"
                      />
                    </label>
                  ))}
                </div>
                <div className="mt-5 grid gap-3 border-t border-slate-200 pt-4 text-sm">
                  {[
                    ["Total cost", pricingResult.baseCost],
                    ["Margin amount", pricingResult.margin],
                    ["Selling price before GST", pricingResult.sellingPrice],
                    ["GST", pricingResult.gst],
                    ["Invoice value", pricingResult.invoiceValue],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-4">
                      <span className="text-slate-600">{label}</span>
                      <span className="font-bold">{formatInr.format(value)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#244b7a]">
                  Break-even point
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  Estimate the units and sales needed to cover fixed cost.
                </p>
                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  {[
                    ["Fixed cost", fixedCost, setFixedCost],
                    ["Selling price / unit", unitSellingPrice, setUnitSellingPrice],
                    ["Variable cost / unit", unitVariableCost, setUnitVariableCost],
                  ].map(([label, value, setter]) => (
                    <label key={label} className="block">
                      <span className="text-sm font-bold text-slate-700">
                        {label}
                      </span>
                      <input
                        type="number"
                        min="0"
                        value={value}
                        onChange={(event) => setter(event.target.value)}
                        className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#244b7a] focus:ring-2 focus:ring-[#f7ecd5]"
                      />
                    </label>
                  ))}
                </div>
                <div className="mt-5 grid gap-3 border-t border-slate-200 pt-4 text-sm">
                  {[
                    ["Contribution / unit", breakEvenResult.contribution],
                    ["Break-even units", breakEvenResult.units],
                    ["Break-even sales", breakEvenResult.salesValue],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-4">
                      <span className="text-slate-600">{label}</span>
                      <span className="font-bold">
                        {label === "Break-even units"
                          ? value.toLocaleString("en-IN")
                          : formatInr.format(value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#244b7a]">
                  EMI / loan calculator
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  Plan business loan EMI, total repayment, and interest.
                </p>
                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  {[
                    ["Loan amount", loanPrincipal, setLoanPrincipal],
                    ["Annual rate %", loanRate, setLoanRate],
                    ["Tenure months", loanMonths, setLoanMonths],
                  ].map(([label, value, setter]) => (
                    <label key={label} className="block">
                      <span className="text-sm font-bold text-slate-700">
                        {label}
                      </span>
                      <input
                        type="number"
                        min="0"
                        value={value}
                        onChange={(event) => setter(event.target.value)}
                        className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#244b7a] focus:ring-2 focus:ring-[#f7ecd5]"
                      />
                    </label>
                  ))}
                </div>
                <div className="mt-5 grid gap-3 border-t border-slate-200 pt-4 text-sm">
                  {[
                    ["Monthly EMI", emiResult.emi],
                    ["Total interest", emiResult.interest],
                    ["Total payment", emiResult.totalPayment],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-4">
                      <span className="text-slate-600">{label}</span>
                      <span className="font-bold">{formatInr.format(value)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#244b7a]">
                  Depreciation calculator
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  Basic Companies Act SLM or Income Tax WDV style depreciation
                  estimate.
                </p>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  <label className="block">
                    <span className="text-sm font-bold text-slate-700">
                      Method
                    </span>
                    <select
                      value={depreciationMethod}
                      onChange={(event) =>
                        setDepreciationMethod(event.target.value)
                      }
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#244b7a] focus:ring-2 focus:ring-[#f7ecd5]"
                    >
                      <option value="slm">Companies Act SLM</option>
                      <option value="wdv">Income Tax WDV</option>
                    </select>
                  </label>
                  {[
                    ["Asset cost", assetCost, setAssetCost],
                    ["Residual value", residualValue, setResidualValue],
                    ["Useful life years", usefulLife, setUsefulLife],
                  ].map(([label, value, setter]) => (
                    <label key={label} className="block">
                      <span className="text-sm font-bold text-slate-700">
                        {label}
                      </span>
                      <input
                        type="number"
                        min="0"
                        value={value}
                        onChange={(event) => setter(event.target.value)}
                        disabled={depreciationMethod === "wdv" && label !== "Asset cost"}
                        className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#244b7a] focus:ring-2 focus:ring-[#f7ecd5] disabled:bg-slate-100 disabled:text-slate-400"
                      />
                    </label>
                  ))}
                  <label className="block">
                    <span className="text-sm font-bold text-slate-700">
                      WDV rate
                    </span>
                    <select
                      value={depreciationRate}
                      onChange={(event) => setDepreciationRate(event.target.value)}
                      disabled={depreciationMethod === "slm"}
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-[#244b7a] focus:ring-2 focus:ring-[#f7ecd5] disabled:bg-slate-100 disabled:text-slate-400"
                    >
                      {depreciationRates.map((rate) => (
                        <option key={rate} value={rate}>
                          {rate}%
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="mt-5 grid gap-3 border-t border-slate-200 pt-4 text-sm md:grid-cols-3">
                  {[
                    ["Annual depreciation", depreciationResult.annualDepreciation],
                    ["Monthly depreciation", depreciationResult.monthlyDepreciation],
                    ["Closing value", depreciationResult.closingValue],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-4">
                      <span className="text-slate-600">{label}</span>
                      <span className="font-bold">{formatInr.format(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
