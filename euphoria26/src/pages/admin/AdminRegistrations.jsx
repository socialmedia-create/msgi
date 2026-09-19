import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import {
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Eye,
  UserCheck,
  UserX,
  Users,
  Download
} from 'lucide-react';

export const AdminRegistrations = () => {
  const { registrations, events, toggleCheckInStatus } = useAdmin();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const eventParam = searchParams.get('event');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(eventParam || 'all');
  const [selectedStatus, setSelectedStatus] = useState('all'); // all, checked-in, pending

  const filtered = registrations.filter((reg) => {
    const matchesEvent = selectedEvent === 'all' || reg.eventId === selectedEvent;
    const matchesStatus = selectedStatus === 'all' || reg.checkInStatus === selectedStatus;
    const matchesSearch =
      reg.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.eventName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesEvent && matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* 24. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#D4AF64]/15">
        <div>
          <h1 className="admin-font-serif text-2xl md:text-3xl font-bold tracking-wide text-[#F0E8D8]">
            REGISTRATION MANAGEMENT
          </h1>
          <p className="text-xs text-dim mt-0.5">
            View, search, filter, and manually check-in participant registrations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted font-mono bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
            Total Shown: <strong className="text-[#E8C97A]">{filtered.length}</strong>
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="admin-card p-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ID, participant, college..."
            className="admin-input pl-9 py-2 text-xs"
          />
        </div>

        <select
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
          className="admin-select py-2 text-xs"
        >
          <option value="all">All Events</option>
          {events.map((e) => (
            <option key={e.id} value={e.id}>
              {e.title}
            </option>
          ))}
        </select>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="admin-select py-2 text-xs"
        >
          <option value="all">All Check-in Statuses</option>
          <option value="checked-in">Checked In Only</option>
          <option value="pending">Pending Check-in Only</option>
        </select>
      </div>

      {/* Registrations Table */}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Reg ID</th>
              <th>Participant</th>
              <th>Event</th>
              <th>College</th>
              <th>Type</th>
              <th>Reg Date</th>
              <th>Check-in Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-10 text-muted text-xs">
                  No registrations found matching search parameters.
                </td>
              </tr>
            ) : (
              filtered.map((reg) => {
                const isCheckedIn = reg.checkInStatus === 'checked-in';
                return (
                  <tr
                    key={reg.id}
                    className="cursor-pointer"
                    onClick={() => navigate(`/credential/registrations/${reg.id}`)}
                  >
                    <td>
                      <span className="font-mono text-xs font-bold text-[#E8C97A]">{reg.id}</span>
                    </td>
                    <td>
                      <div>
                        <p className="font-semibold text-[#F0E8D8] text-xs">{reg.participantName}</p>
                        <p className="text-[10px] text-muted">{reg.email}</p>
                      </div>
                    </td>
                    <td>
                      <span className="text-xs text-dim">{reg.eventName}</span>
                    </td>
                    <td>
                      <span className="text-xs text-muted truncate max-w-[150px] inline-block">{reg.college}</span>
                    </td>
                    <td>
                      <span className="text-xs font-mono text-dim uppercase">{reg.participationType}</span>
                    </td>
                    <td className="text-xs text-muted whitespace-nowrap">{reg.registrationDate}</td>
                    <td>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCheckInStatus(reg.id);
                        }}
                        className={`admin-badge cursor-pointer ${
                          isCheckedIn ? 'admin-badge-success' : 'admin-badge-warning'
                        }`}
                        title="Click to toggle check-in state"
                      >
                        {isCheckedIn ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {isCheckedIn ? 'CHECKED IN' : 'PENDING'}
                      </button>
                    </td>
                    <td className="text-right">
                      <div className="inline-flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => navigate(`/credential/registrations/${reg.id}`)}
                          className="admin-btn-icon"
                          title="View Registration Detail"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => toggleCheckInStatus(reg.id)}
                          className={`admin-btn-icon ${
                            isCheckedIn ? 'hover:text-amber-400' : 'hover:text-emerald-400'
                          }`}
                          title={isCheckedIn ? 'Mark Not Checked In' : 'Mark Checked In'}
                        >
                          {isCheckedIn ? <UserX className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRegistrations;
