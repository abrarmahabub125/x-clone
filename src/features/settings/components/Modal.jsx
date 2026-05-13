import { X } from "lucide-react";
import { useEffect } from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        className="bg-x-bg/20 absolute inset-0 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="border-x-divider bg-x-bg relative w-full max-w-md transform overflow-hidden rounded-3xl border p-6 shadow-2xl transition-all">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="hover:bg-x-surface cursor-pointer rounded-full p-1 transition-colors"
          >
            <X className="text-x-text size-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
