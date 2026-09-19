import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import GlobalRegistrationControl from '../../components/admin/GlobalRegistrationControl';
import {
  Settings,
  Save,
  AlertTriangle,
  Globe,
  Mail,
  Phone,
  Share2,
  ShieldAlert
} from 'lucide-react';

export const AdminSettings = () => {
  const { siteSettings, updateSettings } = useAdmin();

  const [formData, setFormData] = useState({ ...siteSettings });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings(formData);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* 38. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#D4AF64]/15">
        <div>
          <h1 className="admin-font-serif text-2xl md:text-3xl font-bold tracking-wide text-[#F0E8D8]">
            CONTROL CENTER SETTINGS
          </h1>
          <p className="text-xs text-dim mt-0.5">
            Configure global festival parameters, email contacts, and registration defaults.
          </p>
        </div>

        {/* Mock Data Notice */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span>Backend connection required for permanent changes.</span>
        </div>
      </div>

      {/* Global Registration Lock Panel */}
      <GlobalRegistrationControl />

      {/* Settings Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Festival Identity */}
        <div className="admin-card p-6 space-y-4">
          <h3 className="admin-title text-base font-semibold border-b border-white/10 pb-2 flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#D4AF64]" />
            FESTIVAL IDENTITY
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-muted uppercase font-medium mb-1">Festival Name</label>
              <input
                type="text"
                value={formData.festivalName}
                onChange={(e) => setFormData({ ...formData, festivalName: e.target.value })}
                className="admin-input font-bold text-sm"
              />
            </div>

            <div>
              <label className="block text-muted uppercase font-medium mb-1">Festival Year</label>
              <input
                type="text"
                value={formData.festivalYear}
                onChange={(e) => setFormData({ ...formData, festivalYear: e.target.value })}
                className="admin-input font-mono font-bold text-sm"
              />
            </div>
          </div>
        </div>

        {/* Contact Info & Socials */}
        <div className="admin-card p-6 space-y-4">
          <h3 className="admin-title text-base font-semibold border-b border-white/10 pb-2 flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#D4AF64]" />
            OFFICIAL CONTACT & SOCIAL CHANNELS
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-muted uppercase font-medium mb-1">Support Email</label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                className="admin-input font-mono"
              />
            </div>

            <div>
              <label className="block text-muted uppercase font-medium mb-1">Helpline Phone</label>
              <input
                type="text"
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                className="admin-input font-mono"
              />
            </div>

            <div>
              <label className="block text-muted uppercase font-medium mb-1">Instagram handle / URL</label>
              <input
                type="text"
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                className="admin-input font-mono"
              />
            </div>

            <div>
              <label className="block text-muted uppercase font-medium mb-1">YouTube Channel URL</label>
              <input
                type="text"
                value={formData.youtube}
                onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
                className="admin-input font-mono"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <button type="submit" className="admin-btn admin-btn-primary py-2.5 px-6 text-xs uppercase font-semibold">
            <Save className="w-4 h-4" />
            SAVE SITE SETTINGS
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
