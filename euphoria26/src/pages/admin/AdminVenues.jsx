import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import Modal from '../../components/admin/Modal';
import {
  MapPin,
  Plus,
  Users,
  Navigation,
  Trash2,
  Edit,
  X
} from 'lucide-react';

export const AdminVenues = () => {
  const { venues, addVenue, deleteVenue } = useAdmin();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteVenueId, setDeleteVenueId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    capacity: '1,000 People',
    location: 'Campus Main Quad',
    latitude: '13.0827',
    longitude: '80.2707'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addVenue(formData);
    setIsModalOpen(false);
    setFormData({
      name: '',
      description: '',
      capacity: '1,000 People',
      location: 'Campus Main Quad',
      latitude: '13.0827',
      longitude: '80.2707'
    });
  };

  return (
    <div className="space-y-6">
      {/* 33. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#D4AF64]/15">
        <div>
          <h1 className="admin-font-serif text-2xl md:text-3xl font-bold tracking-wide text-[#F0E8D8]">
            VENUE MANAGEMENT
          </h1>
          <p className="text-xs text-dim mt-0.5">
            Manage festival locations, capacity limits, and geolocation coordinates.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="admin-btn admin-btn-primary py-2.5 text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          + ADD VENUE
        </button>
      </div>

      {/* Venues Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {venues.map((v) => (
          <div key={v.id} className="admin-card p-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#D4AF64] uppercase font-bold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {v.location}
                </span>
                <span className="admin-badge admin-badge-success">{v.status || 'active'}</span>
              </div>
              <h3 className="font-semibold text-[#F0E8D8] text-base">{v.name}</h3>
              <p className="text-xs text-dim leading-relaxed">{v.description}</p>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-muted flex items-center gap-1 font-mono">
                <Users className="w-3.5 h-3.5 text-[#D4AF64]" />
                {v.capacity}
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setDeleteVenueId(v.id)}
                  className="admin-btn-icon hover:text-red-400"
                  title="Archive / Remove Venue"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Venue Modal */}
      {isModalOpen && (
        <div className="admin-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div
            className="admin-modal-content p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h3 className="admin-title text-xl font-bold">ADD NEW VENUE</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-dim hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-muted uppercase font-medium mb-1">Venue Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Amphitheatre Block B"
                  className="admin-input"
                />
              </div>

              <div>
                <label className="block text-muted uppercase font-medium mb-1">Description</label>
                <textarea
                  rows="2"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Venue acoustic features and specs..."
                  className="admin-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-muted uppercase font-medium mb-1">Capacity</label>
                  <input
                    type="text"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    placeholder="2,000 People"
                    className="admin-input"
                  />
                </div>

                <div>
                  <label className="block text-muted uppercase font-medium mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="South Quad"
                    className="admin-input"
                  />
                </div>

                <div>
                  <label className="block text-muted uppercase font-medium mb-1">Latitude</label>
                  <input
                    type="text"
                    value={formData.latitude}
                    onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                    className="admin-input font-mono"
                  />
                </div>

                <div>
                  <label className="block text-muted uppercase font-medium mb-1">Longitude</label>
                  <input
                    type="text"
                    value={formData.longitude}
                    onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                    className="admin-input font-mono"
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
                  Save Venue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Venue Modal */}
      <Modal
        isOpen={Boolean(deleteVenueId)}
        onClose={() => setDeleteVenueId(null)}
        onConfirm={() => deleteVenueId && deleteVenue(deleteVenueId)}
        title="ARCHIVE VENUE?"
        message="Are you sure you want to remove or archive this venue location?"
        confirmText="Archive Venue"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
};

export default AdminVenues;
