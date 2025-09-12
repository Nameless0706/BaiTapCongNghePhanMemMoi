export const Modal = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white p-4 rounded shadow-md">
        {children}
        <button onClick={onClose} className="mt-2 text-red-500">Close</button>
      </div>
    </div>
  );
};