import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import Modal from './Modal';
import { Lock, Unlock } from 'lucide-react';

export const RegistrationToggle = ({ eventId, currentStatus, eventTitle = 'this event' }) => {
  const { toggleEventRegistration, isGlobalRegistrationOpen } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // If global registration is closed, effective status is closed
  const isEffectiveOpen = isGlobalRegistrationOpen && currentStatus === 'open';

  const handleToggleClick = (e) => {
    e.stopPropagation();
    if (currentStatus === 'open') {
      // Prompt confirmation before closing
      setIsModalOpen(true);
    } else {
      // Reopening directly
      toggleEventRegistration(eventId, 'open');
    }
  };

  const confirmClose = () => {
    toggleEventRegistration(eventId, 'closed');
  };

  return (
    <>
      <div className="inline-flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={handleToggleClick}
          className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
            isEffectiveOpen
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25'
              : 'bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/25'
          }`}
          title={!isGlobalRegistrationOpen ? 'Globally Closed by Admin' : `Click to toggle registration`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isEffectiveOpen ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'
            }`}
          />
          {isEffectiveOpen ? 'OPEN' : 'CLOSED'}
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmClose}
        title="CLOSE REGISTRATION?"
        message={`Students will no longer be able to register for ${eventTitle}. Are you sure you want to close registrations?`}
        confirmText="Close Registration"
        cancelText="Cancel"
        variant="warning"
      />
    </>
  );
};

export default RegistrationToggle;
