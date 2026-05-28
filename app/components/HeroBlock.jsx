export default function HeroBlock(){
  return (
    <section className="container py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="text-sm inline-flex items-center rounded-full bg-[var(--gold)]/10 px-3 py-1 text-[var(--gold)] font-medium">Established 2015</div>
          <h1 className="mt-6 text-3xl md:text-4xl font-extrabold text-[var(--navy)]">MM &amp; Co. — Cost Accountants &amp; Compliance Advisors</h1>
          <p className="mt-4 text-slate-700 max-w-xl">Delivering precision, regulatory confidence, and strategic financial clarity since 2015. Led by gold-medalists and all-India rank holders, our team specialises in cost audit, GST, taxation, audit and compliance advisory.</p>

          <div className="mt-6 flex gap-4">
            <a href="#contact" className="inline-flex items-center gap-3 rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white">Schedule a Consultation</a>
            <a href="#overview" className="inline-flex items-center gap-3 rounded-full border px-5 py-3 text-sm font-semibold">View Firm Profile</a>
          </div>
        </div>

        <div>
          <div className="card p-8 relative overflow-hidden">
            <div className="absolute -left-8 -top-6 h-36 w-36 rounded-full bg-gradient-to-tr from-indigo-200 to-rose-200 opacity-40" />
            <div className="absolute right-6 top-8 h-24 w-24 rounded-xl bg-[var(--gold)]/10" />
            <div className="relative">
                <div className="h-56 w-full rounded-xl overflow-hidden border border-white/30">
                  <img src="/abs.jpg" alt="Abstract finance illustration" className="w-full h-full object-cover" />
                </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  )
}
