import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import Modal from './Modal';
import { ShieldAlert, ShieldCheck, Lock, Unlock } from 'lucide-react';

export const GlobalRegistrationControl = () => {
  const { isGlobalRegistrationOpen, setGlobalRegistration } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseAllClick = () => {
    setIsModalOpen(true);
  };

  const handleReopenAllClick = () => {
    setGlobalRegistration(true);
  };

  return (
    <div className="admin-card p-5 border border-gold/20 relative overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <h4 className="admin-title text-sm tracking-widest uppercase font-semibold text-gold flex items-center gap-2">
          {isGlobalRegistrationOpen ? (
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          ) : (
            <ShieldAlert className="w-4 h-4 text-red-400" />
          )}
          Event Registration Control
        </h4>
        <span
          className={`admin-badge ${
            isGlobalRegistrationOpen ? 'admin-badge-success' : 'admin-badge-danger'
          }`}
        >
          {isGlobalRegistrationOpen ? '● GLOBAL OPEN' : '■ GLOBAL CLOSED'}
        </span>
      </div>

      <p className="text-xs text-dim mb-4 leading-relaxed">
        {isGlobalRegistrationOpen
          ? 'Registrations are currently ACTIVE across the festival. Closing will disable forms on public event pages.'
          : 'GLOBAL REGISTRATION LOCKOUT ACTIVE. All public registration forms are currently disabled.'}
      </p>

      {isGlobalRegistrationOpen ? (
        <button
          onClick={handleCloseAllClick}
          className="w-full admin-btn admin-btn-danger text-xs font-semibold uppercase tracking-wider py-2.5 flex items-center justify-center gap-2"
        >
          <Lock className="w-4 h-4" />
          CLOSE REGISTRATION FOR ALL EVENTS
        </button>
      ) : (
        <button
          onClick={handleReopenAllClick}
          className="w-full admin-btn admin-btn-primary text-xs font-semibold uppercase tracking-wider py-2.5 flex items-center justify-center gap-2"
        >
          <Unlock className="w-4 h-4" />
          REOPEN REGISTRATION FOR ALL EVENTS
        </button>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => setGlobalRegistration(false)}
        title="CLOSE ALL REGISTRATIONS?"
        message="This will stop new registrations for every EUPHORIA event. Students will no longer be able to register anywhere on the website."
        confirmText="Close All Registrations"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
};

export default GlobalRegistrationControl;
