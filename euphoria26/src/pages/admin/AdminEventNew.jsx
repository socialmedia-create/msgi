import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import {
  ArrowLeft,
  Upload,
  Image as ImageIcon,
  Plus,
  Trash2,
  CheckCircle,
  Save,
  Archive,
  Eye
} from 'lucide-react';

export const AdminEventNew = () => {
  const { addEvent } = useAdmin();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    code: '',
    subtitle: '',
    category: 'music',
    categoryLabel: 'Music',
    description: '',
    full_description: '',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=400&auto=format&fit=crop',
    date: 'Feb 15, 2026',
    start_time: '10:00 AM',
    end_time: '02:00 PM',
    venue: 'Main Ground',
    participation_type: 'solo',
    min_members: 1,
    max_members: 1,
    rulesStr: 'Follow general festival guidelines.\nBring valid college ID card.\nArrive 15 minutes prior to scheduled start.',
    eligibility: 'Open to all enrolled college students.',
    prize1: '₹10,000',
    prize2: '₹5,000',
    prize3: '₹2,500',
    contact_person: 'Event Coordinator',
    contact_email: 'events@euphoria2026.com',
    contact_phone: '+91 98765 43210',
    status: 'published',
    registration_status: 'open'
  });

  const [previewImage, setPreviewImage] = useState(formData.image);
  const [dragActive, setDragActive] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (file) => {
    if (file) {
      const fakeUrl = URL.createObjectURL(file);
      setPreviewImage(fakeUrl);
      setFormData((prev) => ({ ...prev, image: fakeUrl, thumbnail: fakeUrl }));
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (targetStatus) => {
    if (!formData.title) {
      alert('Please enter an Event Name.');
      return;
    }

    const rulesArr = formData.rulesStr.split('\n').filter((line) => line.trim().length > 0);
    const prizesArr = [
      { rank: '1st Prize', amount: formData.prize1 || '₹10,000', icon: '🥇' },
      { rank: '2nd Prize', amount: formData.prize2 || '₹5,000', icon: '🥈' },
      { rank: '3rd Prize', amount: formData.prize3 || '₹2,500', icon: '🥉' }
    ];

    const categoryMap = {
      music: 'Music',
      dance: 'Dance',
      dramatics: 'Dramatics',
      'fine-arts': 'Fine Arts',
      literary: 'Literary',
      photography: 'Photography',
      'performing-arts': 'Performing Arts',
      'fun-games': 'Fun & Games'
    };

    const newEvt = addEvent({
      ...formData,
      categoryLabel: categoryMap[formData.category] || 'General',
      rules: rulesArr,
      prizes: prizesArr,
      status: targetStatus || formData.status,
      image: previewImage
    });

    navigate(`/credential/events/${newEvt.id}`);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#D4AF64]/15">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/credential/events')}
            className="admin-btn-icon"
            title="Back to events"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="admin-font-serif text-2xl font-bold tracking-wide text-[#F0E8D8]">
              CREATE NEW EVENT
            </h1>
            <p className="text-xs text-dim">Add a brand new event to EUPHORIA 2026</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSubmit('draft')}
            className="admin-btn admin-btn-secondary text-xs uppercase"
          >
            <Save className="w-3.5 h-3.5" />
            SAVE DRAFT
          </button>
          <button
            onClick={() => handleSubmit('published')}
            className="admin-btn admin-btn-primary text-xs uppercase"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            PUBLISH EVENT
          </button>
        </div>
      </div>

      {/* 17. Section 1: Basic Information */}
      <div className="admin-card p-6 space-y-4">
        <h3 className="admin-title text-base font-semibold border-b border-white/10 pb-2">
          BASIC INFORMATION
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase text-muted font-medium mb-1">
              Event Name *
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Battle Royale Dance"
              className="admin-input"
            />
          </div>

          <div>
            <label className="block text-xs uppercase text-muted font-medium mb-1">
              Event Code *
            </label>
            <input
              type="text"
              name="code"
              required
              value={formData.code}
              onChange={handleChange}
              placeholder="e.g. BRD"
              className="admin-input font-mono uppercase"
            />
          </div>

          <div>
            <label className="block text-xs uppercase text-muted font-medium mb-1">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="admin-select"
            >
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

          <div>
            <label className="block text-xs uppercase text-muted font-medium mb-1">
              Subtitle / Tagline
            </label>
            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              placeholder="e.g. Rhythm of the Street"
              className="admin-input"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs uppercase text-muted font-medium mb-1">
              Short Description
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief summary of the competition"
              className="admin-input"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs uppercase text-muted font-medium mb-1">
              Full Description
            </label>
            <textarea
              name="full_description"
              rows="3"
              value={formData.full_description}
              onChange={handleChange}
              placeholder="Detailed explanation of the event..."
              className="admin-input"
            />
          </div>
        </div>
      </div>

      {/* 17. Section 2: Event Media */}
      <div className="admin-card p-6 space-y-4">
        <h3 className="admin-title text-base font-semibold border-b border-white/10 pb-2">
          EVENT MEDIA
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <p className="text-xs text-muted mb-2 font-medium">Cover Preview</p>
            <div className="relative aspect-video rounded-lg overflow-hidden border border-white/15 bg-black/40">
              <img
                src={previewImage}
                alt="Event Preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setPreviewImage('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop')}
                className="absolute top-2 right-2 p-1 rounded bg-black/70 text-red-400 hover:text-white"
                title="Remove custom image"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="md:col-span-2">
            <p className="text-xs text-muted mb-2 font-medium">Upload Event Media</p>
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-all ${
                dragActive ? 'border-[#D4AF64] bg-[#D4AF64]/10' : 'border-[#D4AF64]/20 bg-[#080807]'
              }`}
            >
              <Upload className="w-8 h-8 text-[#D4AF64] mx-auto mb-2" />
              <p className="text-xs font-semibold text-[#F0E8D8]">DRAG & DROP IMAGE HERE</p>
              <p className="text-[11px] text-muted my-1">JPG, PNG or WEBP (Max 5MB)</p>
              <label className="admin-btn admin-btn-secondary py-1.5 px-4 text-xs mt-2 inline-flex cursor-pointer">
                <span>UPLOAD IMAGE</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* 18. Section 3: Event Details */}
      <div className="admin-card p-6 space-y-4">
        <h3 className="admin-title text-base font-semibold border-b border-white/10 pb-2">
          EVENT SCHEDULE & VENUE DETAILS
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs uppercase text-muted font-medium mb-1">Date</label>
            <input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleChange}
              placeholder="e.g. Feb 15, 2026"
              className="admin-input"
            />
          </div>

          <div>
            <label className="block text-xs uppercase text-muted font-medium mb-1">Start Time</label>
            <input
              type="text"
              name="start_time"
              value={formData.start_time}
              onChange={handleChange}
              placeholder="10:00 AM"
              className="admin-input"
            />
          </div>

          <div>
            <label className="block text-xs uppercase text-muted font-medium mb-1">End Time</label>
            <input
              type="text"
              name="end_time"
              value={formData.end_time}
              onChange={handleChange}
              placeholder="02:00 PM"
              className="admin-input"
            />
          </div>

          <div>
            <label className="block text-xs uppercase text-muted font-medium mb-1">Venue</label>
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              placeholder="Main Auditorium"
              className="admin-input"
            />
          </div>

          <div>
            <label className="block text-xs uppercase text-muted font-medium mb-1">Participation Type</label>
            <select
              name="participation_type"
              value={formData.participation_type}
              onChange={handleChange}
              className="admin-select"
            >
              <option value="solo">Solo</option>
              <option value="team">Team</option>
            </select>
          </div>

          {formData.participation_type === 'team' && (
            <>
              <div>
                <label className="block text-xs uppercase text-muted font-medium mb-1">Min Members</label>
                <input
                  type="number"
                  name="min_members"
                  value={formData.min_members}
                  onChange={handleChange}
                  min="2"
                  className="admin-input"
                />
              </div>

              <div>
                <label className="block text-xs uppercase text-muted font-medium mb-1">Max Members</label>
                <input
                  type="number"
                  name="max_members"
                  value={formData.max_members}
                  onChange={handleChange}
                  min="2"
                  className="admin-input"
                />
              </div>
            </>
          )}
        </div>

        {/* Rules & Eligibility & Prizes */}
        <div className="space-y-4 pt-2">
          <div>
            <label className="block text-xs uppercase text-muted font-medium mb-1">
              Rules (One per line)
            </label>
            <textarea
              name="rulesStr"
              rows="3"
              value={formData.rulesStr}
              onChange={handleChange}
              className="admin-input"
            />
          </div>

          <div>
            <label className="block text-xs uppercase text-muted font-medium mb-1">Eligibility</label>
            <input
              type="text"
              name="eligibility"
              value={formData.eligibility}
              onChange={handleChange}
              className="admin-input"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs uppercase text-muted font-medium mb-1">1st Prize</label>
              <input
                type="text"
                name="prize1"
                value={formData.prize1}
                onChange={handleChange}
                className="admin-input"
              />
            </div>
            <div>
              <label className="block text-xs uppercase text-muted font-medium mb-1">2nd Prize</label>
              <input
                type="text"
                name="prize2"
                value={formData.prize2}
                onChange={handleChange}
                className="admin-input"
              />
            </div>
            <div>
              <label className="block text-xs uppercase text-muted font-medium mb-1">3rd Prize</label>
              <input
                type="text"
                name="prize3"
                value={formData.prize3}
                onChange={handleChange}
                className="admin-input"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contact Person Details */}
      <div className="admin-card p-6 space-y-4">
        <h3 className="admin-title text-base font-semibold border-b border-white/10 pb-2">
          EVENT CONTACT INFORMATION
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs uppercase text-muted font-medium mb-1">Contact Person</label>
            <input
              type="text"
              name="contact_person"
              value={formData.contact_person}
              onChange={handleChange}
              className="admin-input"
            />
          </div>

          <div>
            <label className="block text-xs uppercase text-muted font-medium mb-1">Contact Email</label>
            <input
              type="email"
              name="contact_email"
              value={formData.contact_email}
              onChange={handleChange}
              className="admin-input"
            />
          </div>

          <div>
            <label className="block text-xs uppercase text-muted font-medium mb-1">Contact Phone</label>
            <input
              type="text"
              name="contact_phone"
              value={formData.contact_phone}
              onChange={handleChange}
              className="admin-input"
            />
          </div>
        </div>
      </div>

      {/* 20. Event Publishing Footer Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
        <button
          onClick={() => navigate('/credential/events')}
          className="admin-btn admin-btn-secondary"
        >
          Cancel
        </button>
        <button
          onClick={() => handleSubmit('draft')}
          className="admin-btn admin-btn-secondary text-xs uppercase"
        >
          SAVE DRAFT
        </button>
        <button
          onClick={() => handleSubmit('published')}
          className="admin-btn admin-btn-primary text-xs uppercase"
        >
          PUBLISH EVENT
        </button>
      </div>
    </div>
  );
};

export default AdminEventNew;
