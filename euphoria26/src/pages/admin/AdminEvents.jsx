import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import RegistrationToggle from '../../components/admin/RegistrationToggle';
import Modal from '../../components/admin/Modal';
import {
  Plus,
  Search,
  Edit,
  Image as ImageIcon,
  Copy,
  Trash2,
  Eye
} from 'lucide-react';

export const AdminEvents = () => {
  const { events, duplicateEvent, deleteEvent } = useAdmin();
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState('all'); // all, published, draft, open, closed, archived
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [deleteModalEvent, setDeleteModalEvent] = useState(null);

  const filteredEvents = events.filter((evt) => {
    let matchesFilter = true;
    if (activeFilter === 'published') matchesFilter = evt.status === 'published';
    else if (activeFilter === 'draft') matchesFilter = evt.status === 'draft';
    else if (activeFilter === 'archived') matchesFilter = evt.status === 'archived';
    else if (activeFilter === 'open') matchesFilter = evt.registration_status === 'open';
    else if (activeFilter === 'closed') matchesFilter = evt.registration_status === 'closed';

    const matchesSearch =
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.venue.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || evt.category === selectedCategory;

    return matchesFilter && matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* 14. Event Management Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#D4AF64]/15">
        <div>
          <h1 className="admin-font-serif text-2xl md:text-3xl font-bold tracking-wide text-[#F0E8D8]">
            EVENT MANAGEMENT
          </h1>
          <p className="text-xs text-dim mt-0.5">
            Create, edit and control every EUPHORIA event.
          </p>
        </div>

        <button
          onClick={() => navigate('/credential/events/new')}
          className="admin-btn admin-btn-primary py-2.5 text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          + ADD NEW EVENT
        </button>
      </div>

      {/* Controls & Filters */}
      <div className="admin-card p-4 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search events by title, code, venue..."
              className="admin-input pl-9 py-2 text-xs"
            />
          </div>

          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="admin-select py-2 text-xs md:w-56"
          >
            <option value="all">All Categories</option>
            <option value="music">Music</option>
            <option value="dance">Dance</option>
            <option value="dramatics">Dramatics</option>
            <option value="fine-arts">Fine Arts</option>
            <option value="literary">Literary</option>
            <option value="photography">Photography</option>
            <option value="performing-arts">Performing Arts</option>
            <option value="fun-games">Fun & Games</option>
          </select>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pt-1">
          {[
            { id: 'all', label: 'All Events', count: events.length },
            { id: 'published', label: 'Published', count: events.filter((e) => e.status === 'published').length },
            { id: 'draft', label: 'Draft', count: events.filter((e) => e.status === 'draft').length },
            { id: 'open', label: 'Registration Open', count: events.filter((e) => e.registration_status === 'open').length },
            { id: 'closed', label: 'Registration Closed', count: events.filter((e) => e.registration_status === 'closed').length },
            { id: 'archived', label: 'Archived', count: events.filter((e) => e.status === 'archived').length }
          ].map((flt) => (
            <button
              key={flt.id}
              onClick={() => setActiveFilter(flt.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeFilter === flt.id
                  ? 'bg-[#D4AF64] text-[#080807] font-semibold'
                  : 'bg-[#080807] text-dim hover:text-[#F0E8D8] border border-white/5'
              }`}
            >
              {flt.label} <span className="opacity-75 font-mono text-[10px]">({flt.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* 15. Compact Event Table (Fixed thumbnails) */}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Event</th>
              <th>Category</th>
              <th>Date</th>
              <th>Venue</th>
              <th>Type</th>
              <th>Registrations</th>
              <th>Status</th>
              <th>Registration</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-10 text-muted text-xs">
                  No events found matching your filter criteria.
                </td>
              </tr>
            ) : (
              filteredEvents.map((evt) => (
                <tr
                  key={evt.id}
                  className="cursor-pointer"
                  onClick={() => navigate(`/credential/events/${evt.id}`)}
                >
                  <td>
                    <div className="flex items-center gap-3">
                      <img
                        src={evt.thumbnail || evt.image}
                        alt={evt.title}
                        className="w-10 h-10 rounded-lg object-cover border border-white/10 flex-shrink-0"
                      />
                      <div>
                        <p className="font-semibold text-[#F0E8D8] text-xs leading-tight">{evt.title}</p>
                        <p className="text-[10px] font-mono text-muted">{evt.code}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="capitalize text-xs text-dim">{evt.categoryLabel || evt.category}</span>
                  </td>
                  <td className="text-xs text-muted whitespace-nowrap">{evt.date}</td>
                  <td className="text-xs text-dim whitespace-nowrap">{evt.venue}</td>
                  <td>
                    <span className="capitalize text-xs text-dim font-mono">{evt.participation_type}</span>
                  </td>
                  <td>
                    <span className="font-mono text-xs font-bold text-[#E8C97A]">{evt.registrationsCount}</span>
                  </td>
                  <td>
                    <span
                      className={`admin-badge ${
                        evt.status === 'published'
                          ? 'admin-badge-success'
                          : evt.status === 'draft'
                          ? 'admin-badge-warning'
                          : 'admin-badge-danger'
                      }`}
                    >
                      {evt.status}
                    </span>
                  </td>
                  <td>
                    <RegistrationToggle
                      eventId={evt.id}
                      currentStatus={evt.registration_status}
                      eventTitle={evt.title}
                    />
                  </td>
                  <td className="text-right">
                    <div className="inline-flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => navigate(`/credential/events/${evt.id}`)}
                        className="admin-btn-icon"
                        title="Edit Event"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => navigate(`/credential/events/${evt.id}`)}
                        className="admin-btn-icon"
                        title="Event Media"
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => duplicateEvent(evt.id)}
                        className="admin-btn-icon"
                        title="Duplicate"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteModalEvent(evt)}
                        className="admin-btn-icon hover:text-red-400"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={Boolean(deleteModalEvent)}
        onClose={() => setDeleteModalEvent(null)}
        onConfirm={() => deleteModalEvent && deleteEvent(deleteModalEvent.id)}
        title="DELETE EVENT?"
        message={`Are you sure you want to delete "${deleteModalEvent?.title}"? All associated registrations and data will be removed.`}
        confirmText="Delete Event"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
};

export default AdminEvents;
