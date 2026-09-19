import React, { useEffect } from 'react';
import { X, AlertTriangle, AlertCircle, Info } from 'lucide-react';

export const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'warning' // warning, danger, info
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isDanger = variant === 'danger';
  const isWarning = variant === 'warning';

  let iconColor = '#D4AF64';
  let Icon = Info;
  let btnClass = 'admin-btn-primary';

  if (isDanger) {
    iconColor = '#EF4444';
    Icon = AlertCircle;
    btnClass = 'admin-btn-danger';
  } else if (isWarning) {
    iconColor = '#F59E0B';
    Icon = AlertTriangle;
    btnClass = 'admin-btn-primary';
  }

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div
        className="admin-modal-content p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-dim hover:text-white p-1 rounded-md transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4 mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${iconColor}15`, border: `1px solid ${iconColor}30` }}
          >
            <Icon className="w-6 h-6" style={{ color: iconColor }} />
          </div>
          <div>
            <h3 className="admin-title text-xl font-semibold mb-1">{title}</h3>
            <p className="text-dim text-sm leading-relaxed">{message}</p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="admin-btn admin-btn-secondary"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`admin-btn ${btnClass}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
