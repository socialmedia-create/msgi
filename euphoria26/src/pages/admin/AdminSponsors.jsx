import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import Modal from '../../components/admin/Modal';
import {
  Award,
  Plus,
  ExternalLink,
  Trash2,
  Eye,
  EyeOff,
  X
} from 'lucide-react';

export const AdminSponsors = () => {
  const { sponsors, addSponsor, deleteSponsor, toggleSponsorStatus } = useAdmin();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteSponsorId, setDeleteSponsorId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    logo: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=300&auto=format&fit=crop',
    website: 'https://sponsor.example.com',
    level: 'Title Sponsor'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addSponsor(formData);
    setIsModalOpen(false);
    setFormData({
      name: '',
      logo: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=300&auto=format&fit=crop',
      website: 'https://sponsor.example.com',
      level: 'Title Sponsor'
    });
  };

  return (
    <div className="space-y-6">
      {/* 34. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#D4AF64]/15">
        <div>
          <h1 className="admin-font-serif text-2xl md:text-3xl font-bold tracking-wide text-[#F0E8D8]">
            SPONSOR MANAGEMENT
          </h1>
          <p className="text-xs text-dim mt-0.5">
            Manage partner logos, tiers, links, and visibility on the public site.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="admin-btn admin-btn-primary py-2.5 text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          + ADD SPONSOR
        </button>
      </div>

      {/* Sponsors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sponsors.map((s) => {
          const isPublished = s.status === 'published';
          return (
            <div key={s.id} className="admin-card p-5 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="admin-badge admin-badge-gold">{s.level}</span>
                  <span className={`admin-badge ${isPublished ? 'admin-badge-success' : 'admin-badge-warning'}`}>
                    {s.status}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <img
                    src={s.logo}
                    alt={s.name}
                    className="w-16 h-16 rounded-lg object-cover border border-white/10"
                  />
                  <div>
                    <h3 className="font-semibold text-[#F0E8D8] text-base">{s.name}</h3>
                    <a
                      href={s.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#D4AF64] hover:underline flex items-center gap-1 mt-0.5"
                    >
                      <span>Visit Website</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
                <button
                  onClick={() => toggleSponsorStatus(s.id)}
                  className="admin-btn-icon"
                  title={isPublished ? 'Unpublish Sponsor' : 'Publish Sponsor'}
                >
                  {isPublished ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => setDeleteSponsorId(s.id)}
                  className="admin-btn-icon hover:text-red-400"
                  title="Delete Sponsor"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Sponsor Modal */}
      {isModalOpen && (
        <div className="admin-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div
            className="admin-modal-content p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h3 className="admin-title text-xl font-bold">ADD NEW SPONSOR</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-dim hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-muted uppercase font-medium mb-1">Sponsor Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Apex Energy Drink"
                  className="admin-input"
                />
              </div>

              <div>
                <label className="block text-muted uppercase font-medium mb-1">Sponsor Level *</label>
                <select
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  className="admin-select"
                >
                  <option value="Title Sponsor">Title Sponsor</option>
                  <option value="Gold Sponsor">Gold Sponsor</option>
                  <option value="Silver Sponsor">Silver Sponsor</option>
                  <option value="Partner">Partner</option>
                </select>
              </div>

              <div>
                <label className="block text-muted uppercase font-medium mb-1">Logo Image URL</label>
                <input
                  type="text"
                  value={formData.logo}
                  onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                  className="admin-input font-mono"
                />
              </div>

              <div>
                <label className="block text-muted uppercase font-medium mb-1">Website URL</label>
                <input
                  type="text"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="admin-input font-mono"
                />
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
                  Add Sponsor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Sponsor Modal */}
      <Modal
        isOpen={Boolean(deleteSponsorId)}
        onClose={() => setDeleteSponsorId(null)}
        onConfirm={() => deleteSponsorId && deleteSponsor(deleteSponsorId)}
        title="DELETE SPONSOR?"
        message="Are you sure you want to remove this sponsor partner?"
        confirmText="Delete Sponsor"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
};

export default AdminSponsors;
