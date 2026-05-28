export default function Card({ title, children, badge }) {
  return (
    <div className="rounded-2xl border p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-slate-900">{title}</h3>
        {badge ? <div className="text-sm text-indigo-600">{badge}</div> : null}
      </div>
      <div className="mt-3 text-sm text-slate-600">{children}</div>
    </div>
  );
}
