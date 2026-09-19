import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import ChartRegistrationTime from '../../components/admin/ChartRegistrationTime';
import ChartCategoryDonut from '../../components/admin/ChartCategoryDonut';
import GlobalRegistrationControl from '../../components/admin/GlobalRegistrationControl';
import RegistrationToggle from '../../components/admin/RegistrationToggle';
import Modal from '../../components/admin/Modal';
import {
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  Plus,
  QrCode,
  Image,
  Download,
  Settings,
  Edit,
  Copy,
  Trash2,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Search,
  MoreHorizontal
} from 'lucide-react';

export const AdminDashboard = () => {
  const { events, registrations, activity, duplicateEvent, deleteEvent } = useAdmin();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('all'); // all, published, draft, open, closed
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [deleteModalEvent, setDeleteModalEvent] = useState(null);

  // Compute live stats from events & registrations
  const totalEventsCount = events.length;
  const totalRegsCount = registrations.length;
  const checkedInCount = registrations.filter((r) => r.checkInStatus === 'checked-in').length;
  const pendingCount = Math.max(0, totalRegsCount - checkedInCount);
  const checkedInPct = totalRegsCount ? ((checkedInCount / totalRegsCount) * 100).toFixed(1) : 0;
  const pendingPct = totalRegsCount ? ((pendingCount / totalRegsCount) * 100).toFixed(1) : 0;

  // Filter events for the Events Overview section
  const filteredEvents = events.filter((evt) => {
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'published' && evt.status === 'published') ||
      (activeTab === 'draft' && evt.status === 'draft') ||
      (activeTab === 'open' && evt.registration_status === 'open') ||
      (activeTab === 'closed' && evt.registration_status === 'closed');

    const matchesSearch =
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.venue.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || evt.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || evt.status === selectedStatus;

    return matchesTab && matchesSearch && matchesCategory && matchesStatus;
  });

  const currentDateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  const currentTimeStr = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="space-y-6">
      {/* 8. Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#D4AF64]/15">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] tracking-widest text-muted uppercase font-mono">
              WELCOME BACK,
            </span>
            <span className="text-[10px] tracking-widest text-[#D4AF64] font-bold uppercase">
              ADMIN
            </span>
          </div>
          <h1 className="admin-font-serif text-2xl md:text-3xl font-bold tracking-wide text-[#F0E8D8]">
            EUPHORIA 2026 CONTROL CENTER
          </h1>
          <p className="text-xs text-dim mt-0.5">
            Manage events, registrations, and every moment of the festival.
          </p>
        </div>

        <div className="text-left md:text-right flex flex-col items-start md:items-end justify-center">
          <div className="flex items-center gap-2 text-xs font-mono text-muted">
            <Clock className="w-3.5 h-3.5 text-[#D4AF64]" />
            <span>{currentDateStr} • {currentTimeStr}</span>
          </div>
          <p className="admin-font-serif text-xs italic text-[#D4AF64] mt-1">
            "Same Stage. New Stories."
          </p>
        </div>
      </div>

      {/* 9. Statistic Cards (4 cards matching reference image_4.png) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* TOTAL EVENTS */}
        <div className="admin-card p-4 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-wider text-muted font-semibold">
              TOTAL EVENTS
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#D4AF64]/10 border border-[#D4AF64]/30 flex items-center justify-center text-[#D4AF64]">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono text-[#F0E8D8]">{totalEventsCount}</span>
            <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" />
              +2 this week
            </span>
          </div>
        </div>

        {/* TOTAL REGISTRATIONS */}
        <div className="admin-card p-4 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-wider text-muted font-semibold">
              TOTAL REGISTRATIONS
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#D4AF64]/10 border border-[#D4AF64]/30 flex items-center justify-center text-[#D4AF64]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono text-[#F0E8D8]">{totalRegsCount.toLocaleString()}</span>
            <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" />
              +186 today
            </span>
          </div>
        </div>

        {/* CHECKED IN */}
        <div className="admin-card p-4 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-wider text-muted font-semibold">
              CHECKED IN
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono text-[#F0E8D8]">{checkedInCount}</span>
            <span className="text-[10px] text-emerald-400 font-medium">{checkedInPct}% of total</span>
          </div>
        </div>

        {/* PENDING CHECK-IN */}
        <div className="admin-card p-4 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-wider text-muted font-semibold">
              PENDING CHECK-IN
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono text-[#F0E8D8]">{pendingCount}</span>
            <span className="text-[10px] text-amber-400 font-medium">{pendingPct}% remaining</span>
          </div>
        </div>
      </div>

      {/* 10. Dashboard Charts & Side Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Charts & Activity */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ChartRegistrationTime />
            <ChartCategoryDonut />
          </div>

          {/* Recent Activity Feed */}
          <div className="admin-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="admin-title text-base font-semibold">Recent Activity</h3>
                <p className="text-xs text-muted">Latest actions across control center</p>
              </div>
              <button
                onClick={() => navigate('/credential/registrations')}
                className="text-xs text-[#D4AF64] hover:text-[#E8C97A] font-medium flex items-center gap-1"
              >
                View All <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {activity.slice(0, 5).map((act) => (
                <div
                  key={act.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-[#080807] border border-white/5 hover:border-[#D4AF64]/20 transition-all text-xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[#D4AF64]/10 border border-[#D4AF64]/25 flex items-center justify-center text-[#D4AF64] flex-shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[#F0E8D8] font-medium truncate">{act.title}</p>
                      <p className="text-muted text-[11px] font-mono truncate">{act.code} — {act.detail}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-muted flex-shrink-0 ml-2">{act.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Column: Quick Actions, Global Registration Control, Recent Registrations */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="admin-card p-5">
            <h3 className="admin-title text-base font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button
                onClick={() => navigate('/credential/events/new')}
                className="w-full admin-btn admin-btn-primary py-2.5 justify-center text-xs uppercase tracking-wider font-semibold"
              >
                <Plus className="w-4 h-4" />
                + ADD NEW EVENT
              </button>

              <button
                onClick={() => navigate('/credential/registrations')}
                className="w-full admin-btn admin-btn-secondary py-2.5 justify-center text-xs uppercase tracking-wider"
              >
                <Users className="w-4 h-4 text-[#D4AF64]" />
                VIEW REGISTRATIONS
              </button>

              <button
                onClick={() => navigate('/credential/scanner')}
                className="w-full admin-btn admin-btn-secondary py-2.5 justify-center text-xs uppercase tracking-wider"
              >
                <QrCode className="w-4 h-4 text-[#D4AF64]" />
                OPEN SCANNER
              </button>

              <button
                onClick={() => navigate('/credential/gallery')}
                className="w-full admin-btn admin-btn-secondary py-2.5 justify-center text-xs uppercase tracking-wider"
              >
                <Image className="w-4 h-4 text-[#D4AF64]" />
                MANAGE GALLERY
              </button>

              <button
                onClick={() => navigate('/credential/exports')}
                className="w-full admin-btn admin-btn-secondary py-2.5 justify-center text-xs uppercase tracking-wider"
              >
                <Download className="w-4 h-4 text-[#D4AF64]" />
                EXPORT DATA
              </button>

              <button
                onClick={() => navigate('/credential/settings')}
                className="w-full admin-btn admin-btn-secondary py-2.5 justify-center text-xs uppercase tracking-wider"
              >
                <Settings className="w-4 h-4 text-[#D4AF64]" />
                SITE SETTINGS
              </button>
            </div>
          </div>

          {/* Global Registration Control */}
          <GlobalRegistrationControl />

          {/* Recent Registrations List (Matching image_4.png) */}
          <div className="admin-card p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h3 className="admin-title text-sm font-semibold">Recent Registrations</h3>
              <button
                onClick={() => navigate('/credential/registrations')}
                className="text-[11px] text-[#D4AF64] hover:underline"
              >
                View All
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              {registrations.slice(0, 5).map((reg) => (
                <div
                  key={reg.id}
                  onClick={() => navigate(`/credential/registrations/${reg.id}`)}
                  className="flex items-center justify-between p-2 rounded-lg bg-[#080807] border border-white/5 hover:border-[#D4AF64]/30 cursor-pointer"
                >
                  <div className="min-w-0">
                    <p className="font-mono text-[#E8C97A] font-bold text-[11px]">{reg.id}</p>
                    <p className="font-semibold text-[#F0E8D8] truncate">{reg.participantName}</p>
                    <p className="text-muted text-[10px] truncate">{reg.eventName}</p>
                  </div>
                  <span className="text-[10px] text-muted whitespace-nowrap">2 mins ago</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 39. Dashboard Events Overview Section */}
      <div className="admin-card p-5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="admin-title text-lg font-bold">Events Overview</h3>
            <p className="text-xs text-muted">Filter, search, and control individual event registration statuses</p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1 bg-[#080807] p-1 rounded-lg border border-white/10 overflow-x-auto scrollbar-none">
            {[
              { id: 'all', label: 'All Events', count: events.length },
              { id: 'published', label: 'Published', count: events.filter((e) => e.status === 'published').length },
              { id: 'draft', label: 'Drafts', count: events.filter((e) => e.status === 'draft').length },
              { id: 'open', label: 'Registration Open', count: events.filter((e) => e.registration_status === 'open').length },
              { id: 'closed', label: 'Registration Closed', count: events.filter((e) => e.registration_status === 'closed').length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#D4AF64] text-[#080807] font-semibold'
                    : 'text-dim hover:text-[#F0E8D8]'
                }`}
              >
                {tab.label} <span className="opacity-75 font-mono text-[10px]">({tab.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Search & Filters Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search events..."
              className="admin-input pl-9 py-1.5 text-xs"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="admin-select py-1.5 text-xs"
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

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="admin-select py-1.5 text-xs"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {/* 15 & 40. Compact Events Overview Table matching image_4.png */}
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th className="w-8"><input type="checkbox" className="accent-[#D4AF64]" /></th>
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
                  <td colSpan="10" className="text-center py-8 text-muted text-xs">
                    No matching events found.
                  </td>
                </tr>
              ) : (
                filteredEvents.map((evt) => (
                  <tr key={evt.id} className="cursor-pointer" onClick={() => navigate(`/credential/events/${evt.id}`)}>
                    <td onClick={(e) => e.stopPropagation()}>
                      <input type="checkbox" className="accent-[#D4AF64]" />
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <img
                          src={evt.thumbnail || evt.image}
                          alt={evt.title}
                          className="w-9 h-9 rounded-lg object-cover border border-white/10 flex-shrink-0"
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
                          title="Manage Images"
                        >
                          <Image className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => duplicateEvent(evt.id)}
                          className="admin-btn-icon"
                          title="Duplicate Event"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteModalEvent(evt)}
                          className="admin-btn-icon hover:text-red-400"
                          title="Delete Event"
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
      </div>

      {/* Delete Event Confirmation Modal */}
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

export default AdminDashboard;
