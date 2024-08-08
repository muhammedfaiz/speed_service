// eslint-disable-next-line react/prop-types
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-lg w-full z-10">
        <div className="p-4">
          <button
            className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
            onClick={onClose}
          >
            &times;
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};
export default Modal;
