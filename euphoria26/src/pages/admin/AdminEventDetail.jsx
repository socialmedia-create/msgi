import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import RegistrationToggle from '../../components/admin/RegistrationToggle';
import Modal from '../../components/admin/Modal';
import { exportEventRegistrationsXLSX } from '../../utils/xlsxExport';
import {
  ArrowLeft,
  Edit,
  Users,
  QrCode,
  Download,
  Upload,
  Trash2,
  Save,
  CheckCircle2,
  Clock,
  Calendar,
  MapPin,
  Sparkles
} from 'lucide-react';

export const AdminEventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, registrations, updateEvent } = useAdmin();

  const event = events.find((e) => e.id === id) || events[0];
  const eventRegs = registrations.filter((r) => r.eventId === event.id);
  const checkedInCount = eventRegs.filter((r) => r.checkInStatus === 'checked-in').length;
  const pendingCount = Math.max(0, eventRegs.length - checkedInCount);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...event });

  // Custom Media Photos for this event (Requirement: event image editing in event page itself)
  const [eventMedia, setEventMedia] = useState([
    { id: 1, label: 'Cover Image', url: event.image },
    { id: 2, label: 'Thumbnail Image', url: event.thumbnail || event.image },
    { id: 3, label: 'Stage Banner', url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop' }
  ]);

  const handleSave = () => {
    updateEvent(event.id, formData);
    setIsEditing(false);
  };

  const handleUploadPhoto = (file, label = 'Custom Photo') => {
    if (file) {
      const url = URL.createObjectURL(file);
      setEventMedia((prev) => [...prev, { id: Date.now(), label, url }]);
      if (label === 'Cover Image') {
        updateEvent(event.id, { image: url });
      }
    }
  };

  const removePhoto = (photoId) => {
    setEventMedia((prev) => prev.filter((m) => m.id !== photoId));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#D4AF64]/15">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/credential/events')}
            className="admin-btn-icon"
            title="Back to events"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-mono text-[#D4AF64] font-bold">
                {event.categoryLabel || event.category}
              </span>
              <span className="text-[10px] font-mono text-muted">• CODE: {event.code}</span>
            </div>
            <h1 className="admin-font-serif text-2xl md:text-3xl font-bold tracking-wide text-[#F0E8D8]">
              {event.title}
            </h1>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="admin-btn admin-btn-secondary text-xs uppercase"
          >
            <Edit className="w-3.5 h-3.5" />
            {isEditing ? 'CANCEL EDIT' : 'EDIT EVENT'}
          </button>

          <button
            onClick={() => navigate(`/credential/registrations?event=${event.id}`)}
            className="admin-btn admin-btn-secondary text-xs uppercase"
          >
            <Users className="w-3.5 h-3.5 text-[#D4AF64]" />
            VIEW REGISTRATIONS
          </button>

          <button
            onClick={() => navigate(`/credential/scanner?event=${event.id}`)}
            className="admin-btn admin-btn-secondary text-xs uppercase"
          >
            <QrCode className="w-3.5 h-3.5 text-[#D4AF64]" />
            OPEN SCANNER
          </button>

          <button
            onClick={() => exportEventRegistrationsXLSX(event, eventRegs)}
            className="admin-btn admin-btn-primary text-xs uppercase"
          >
            <Download className="w-3.5 h-3.5" />
            DOWNLOAD EXCEL
          </button>
        </div>
      </div>

      {/* Hero Banner & Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Hero Banner Card */}
        <div className="lg:col-span-2 admin-card overflow-hidden relative min-h-[220px] flex flex-col justify-end p-6 border border-[#D4AF64]/25">
          <img
            src={event.image}
            alt={event.title}
            className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14110D] via-[#14110D]/80 to-transparent pointer-events-none" />

          <div className="relative z-10 space-y-3">
            <div className="flex items-center gap-2">
              <span
                className={`admin-badge ${
                  event.status === 'published'
                    ? 'admin-badge-success'
                    : event.status === 'draft'
                    ? 'admin-badge-warning'
                    : 'admin-badge-danger'
                }`}
              >
                {event.status.toUpperCase()}
              </span>
              <RegistrationToggle
                eventId={event.id}
                currentStatus={event.registration_status}
                eventTitle={event.title}
              />
            </div>

            <p className="text-xs text-[#F0E8D8]/90 leading-relaxed max-w-2xl bg-black/40 p-3 rounded-lg border border-white/10 backdrop-blur-sm">
              {event.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted pt-1">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#D4AF64]" />
                {event.date} • {event.time}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF64]" />
                {event.venue}
              </span>
              <span className="flex items-center gap-1.5 text-[#E8C97A]">
                <Users className="w-3.5 h-3.5" />
                {event.participation_type.toUpperCase()} ({event.min_members}-{event.max_members} Members)
              </span>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Compact Stats Cards */}
        <div className="space-y-3 flex flex-col justify-between">
          <div className="admin-card p-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted font-semibold">
                TOTAL REGISTRATIONS
              </p>
              <p className="text-2xl font-bold font-mono text-[#F0E8D8] mt-0.5">{eventRegs.length}</p>
            </div>
            <div className="w-9 h-9 rounded-lg bg-[#D4AF64]/10 border border-[#D4AF64]/30 flex items-center justify-center text-[#D4AF64]">
              <Users className="w-4 h-4" />
            </div>
          </div>

          <div className="admin-card p-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted font-semibold">
                CHECKED IN
              </p>
              <p className="text-2xl font-bold font-mono text-emerald-400 mt-0.5">{checkedInCount}</p>
            </div>
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>

          <div className="admin-card p-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted font-semibold">
                NOT CHECKED IN
              </p>
              <p className="text-2xl font-bold font-mono text-amber-400 mt-0.5">{pendingCount}</p>
            </div>
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* EVENT SPECIFIC MEDIA MANAGEMENT (Upload / Replace Cover & Thumbnail for THIS event) */}
      <div className="admin-card p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <h3 className="admin-title text-base font-semibold">EVENT MEDIA MANAGEMENT</h3>
            <p className="text-xs text-muted">Upload cover image, thumbnails, and promotional media specifically for {event.title}</p>
          </div>

          <label className="admin-btn admin-btn-secondary text-xs uppercase cursor-pointer">
            <Upload className="w-3.5 h-3.5 text-[#D4AF64]" />
            UPLOAD NEW PHOTO
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && handleUploadPhoto(e.target.files[0], 'Event Media')}
              className="hidden"
            />
          </label>
        </div>

        {/* Small, neat thumbnail grid matching layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {eventMedia.map((m) => (
            <div key={m.id} className="admin-card p-3 space-y-2 relative group bg-[#080807]">
              <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10">
                <img src={m.url} alt={m.label} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 px-2 py-0.5 text-[9px] font-mono uppercase bg-black/80 text-[#E8C97A] rounded border border-white/10">
                  {m.label}
                </span>
                <button
                  onClick={() => removePhoto(m.id)}
                  className="absolute top-2 right-2 p-1.5 rounded-md bg-black/80 text-red-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove Photo"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-dim font-medium">{m.label}</span>
                <label className="text-[11px] text-[#D4AF64] hover:underline cursor-pointer">
                  Replace
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleUploadPhoto(e.target.files[0], m.label)}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editing Mode Form or Rules & Prizes View */}
      {isEditing ? (
        <div className="admin-card p-6 space-y-4">
          <h3 className="admin-title text-base font-semibold border-b border-white/10 pb-2">
            EDIT EVENT DETAILS
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-muted uppercase mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="admin-input"
              />
            </div>
            <div>
              <label className="block text-muted uppercase mb-1">Code</label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="admin-input font-mono uppercase"
              />
            </div>
            <div>
              <label className="block text-muted uppercase mb-1">Date</label>
              <input
                type="text"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="admin-input"
              />
            </div>
            <div>
              <label className="block text-muted uppercase mb-1">Venue</label>
              <input
                type="text"
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                className="admin-input"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <button onClick={() => setIsEditing(false)} className="admin-btn admin-btn-secondary">
              Cancel
            </button>
            <button onClick={handleSave} className="admin-btn admin-btn-primary">
              <Save className="w-3.5 h-3.5" />
              Save Changes
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="admin-card p-5 space-y-3">
            <h4 className="admin-title text-sm font-semibold uppercase tracking-wider text-[#D4AF64]">
              Rules & Guidelines
            </h4>
            <ul className="space-y-1.5 text-xs text-dim list-disc list-inside leading-relaxed">
              {event.rules?.map((rule, idx) => (
                <li key={idx}>{rule}</li>
              ))}
            </ul>
          </div>

          <div className="admin-card p-5 space-y-3">
            <h4 className="admin-title text-sm font-semibold uppercase tracking-wider text-[#D4AF64]">
              Prize Structure
            </h4>
            <div className="space-y-2 text-xs">
              {event.prizes?.map((pz, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-[#080807] border border-white/5">
                  <span className="font-semibold text-[#F0E8D8] flex items-center gap-2">
                    <span>{pz.icon}</span> {pz.rank}
                  </span>
                  <span className="font-mono text-[#E8C97A] font-bold">{pz.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEventDetail;
