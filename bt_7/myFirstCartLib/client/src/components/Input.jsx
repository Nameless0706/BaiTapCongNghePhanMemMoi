export const Input = ({ label, ...props }) => (
  <div className="mb-2">
    <label className="block text-sm font-medium">{label}</label>
    <input {...props} className="border p-2 w-full rounded" />
  </div>
);
