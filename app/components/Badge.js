export default function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-600">
      {children}
    </span>
  );
}
