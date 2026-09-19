import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import Modal from '../../components/admin/Modal';
import {
  CalendarDays,
  Plus,
  Clock,
  MapPin,
  Trash2,
  Filter
} from 'lucide-react';

export const AdminSchedule = () => {
  const { schedule, events, addScheduleItem, deleteScheduleItem } = useAdmin();

  const [dateFilter, setDateFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [newItem, setNewItem] = useState({
    eventId: events[0]?.id || 'escape-exe',
    eventName: events[0]?.title || 'Battle of Bands',
    date: 'Feb 14, 2026',
    startTime: '09:00 AM',
    endTime: '01:00 PM',
    venue: 'Open Air Stage',
    category: 'Music'
  });

  const filteredSchedule = schedule.filter((s) => {
    return dateFilter === 'all' || s.date === dateFilter;
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const selectedEvt = events.find((evt) => evt.id === newItem.eventId);
    addScheduleItem({
      ...newItem,
      eventName: selectedEvt ? selectedEvt.title : newItem.eventName,
      venue: selectedEvt ? selectedEvt.venue : newItem.venue
    });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* 29. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#D4AF64]/15">
        <div>
          <h1 className="admin-font-serif text-2xl md:text-3xl font-bold tracking-wide text-[#F0E8D8]">
            SCHEDULE MANAGEMENT
          </h1>
          <p className="text-xs text-dim mt-0.5">
            Organize time slots, venues, and festival program itineraries.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="admin-btn admin-btn-primary py-2.5 text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          + ADD SCHEDULE ITEM
        </button>
      </div>

      {/* Date Filter Bar */}
      <div className="admin-card p-4 flex items-center gap-2 overflow-x-auto scrollbar-none">
        <span className="text-xs text-muted uppercase font-medium flex items-center gap-1.5 mr-2">
          <Filter className="w-3.5 h-3.5 text-[#D4AF64]" />
          Filter Date:
        </span>
        {['all', 'Feb 14, 2026', 'Feb 15, 2026', 'Feb 16, 2026'].map((d) => (
          <button
            key={d}
            onClick={() => setDateFilter(d)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              dateFilter === d
                ? 'bg-[#D4AF64] text-[#080807] font-semibold'
                : 'bg-[#080807] text-dim hover:text-[#F0E8D8] border border-white/5'
            }`}
          >
            {d === 'all' ? 'All Days' : d}
          </button>
        ))}
      </div>

      {/* Schedule Items List (Refined High Contrast Layout) */}
      <div className="space-y-3">
        {filteredSchedule.map((item) => (
          <div
            key={item.id}
            className="admin-card p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-l-4 border-l-[#D4AF64] bg-[#14110D] hover:bg-[#1C1813] transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#D4AF64]/15 border border-[#D4AF64]/40 flex items-center justify-center text-[#E8C97A] flex-shrink-0">
                <CalendarDays className="w-5 h-5" />
              </div>

              <div>
                <span className="text-[10px] font-mono text-[#D4AF64] uppercase font-bold tracking-widest">
                  {item.category || 'EVENT'}
                </span>
                <h3 className="font-bold text-[#F0E8D8] text-base leading-tight mt-0.5">{item.eventName}</h3>
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#F0E8D8]/80 mt-1">
                  <span className="flex items-center gap-1.5 text-[#E8C97A]">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF64]" />
                    {item.date} • {item.startTime} - {item.endTime}
                  </span>
                  <span className="flex items-center gap-1.5 text-muted">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF64]" />
                    {item.venue}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end md:self-center">
              <button
                onClick={() => setDeleteId(item.id)}
                className="admin-btn-icon hover:text-red-400"
                title="Delete Schedule Item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Schedule Modal */}
      {isModalOpen && (
        <div className="admin-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div
            className="admin-modal-content p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="admin-title text-xl font-bold">ADD SCHEDULE ITEM</h3>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-muted uppercase font-medium mb-1">Select Event</label>
                <select
                  value={newItem.eventId}
                  onChange={(e) => setNewItem({ ...newItem, eventId: e.target.value })}
                  className="admin-select"
                >
                  {events.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-muted uppercase font-medium mb-1">Date</label>
                  <input
                    type="text"
                    value={newItem.date}
                    onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
                    className="admin-input"
                  />
                </div>

                <div>
                  <label className="block text-muted uppercase font-medium mb-1">Venue</label>
                  <input
                    type="text"
                    value={newItem.venue}
                    onChange={(e) => setNewItem({ ...newItem, venue: e.target.value })}
                    className="admin-input"
                  />
                </div>

                <div>
                  <label className="block text-muted uppercase font-medium mb-1">Start Time</label>
                  <input
                    type="text"
                    value={newItem.startTime}
                    onChange={(e) => setNewItem({ ...newItem, startTime: e.target.value })}
                    className="admin-input"
                  />
                </div>

                <div>
                  <label className="block text-muted uppercase font-medium mb-1">End Time</label>
                  <input
                    type="text"
                    value={newItem.endTime}
                    onChange={(e) => setNewItem({ ...newItem, endTime: e.target.value })}
                    className="admin-input"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="admin-btn admin-btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary">
                  Add Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && deleteScheduleItem(deleteId)}
        title="DELETE SCHEDULE ITEM?"
        message="Are you sure you want to remove this item from the festival schedule?"
        confirmText="Remove"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
};

export default AdminSchedule;
