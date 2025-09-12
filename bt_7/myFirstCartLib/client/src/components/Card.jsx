export const Card = ({ title, children }) => (
  <div className="border rounded p-4 shadow-sm">
    <h3 className="font-bold mb-2">{title}</h3>
    {children}
  </div>
);