import React from 'react';
import { useAdmin } from '../../context/AdminContext';
import { CheckCircle, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useAdmin();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 max-w-sm w-full px-4 pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';
        const isDanger = toast.type === 'danger';

        let borderColor = 'rgba(212, 175, 100, 0.3)';
        let bgColor = '#14110D';
        let textColor = '#F0E8D8';
        let Icon = Info;
        let iconColor = '#D4AF64';

        if (isSuccess) {
          borderColor = 'rgba(52, 211, 153, 0.4)';
          Icon = CheckCircle;
          iconColor = '#34D399';
        } else if (isWarning) {
          borderColor = 'rgba(245, 158, 11, 0.4)';
          Icon = AlertTriangle;
          iconColor = '#F59E0B';
        } else if (isDanger) {
          borderColor = 'rgba(239, 68, 68, 0.4)';
          Icon = AlertCircle;
          iconColor = '#EF4444';
        }

        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-lg border shadow-2xl animate-fadeIn text-sm"
            style={{ backgroundColor: bgColor, borderColor, color: textColor }}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <Icon className="w-5 h-5 flex-shrink-0" style={{ color: iconColor }} />
              <span className="truncate font-medium">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-muted hover:text-white transition-colors p-1 flex-shrink-0"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ToastContainer;
