import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  UserCheck,
  UserX,
  Calendar,
  MapPin,
  Mail,
  Phone,
  GraduationCap,
  Users,
  ShieldCheck,
  QrCode
} from 'lucide-react';

export const AdminRegistrationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { registrations, toggleCheckInStatus } = useAdmin();

  const reg = registrations.find((r) => r.id === id) || registrations[0];
  const isCheckedIn = reg.checkInStatus === 'checked-in';

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D4AF64]/15">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/credential/registrations')}
            className="admin-btn-icon"
            title="Back to Registrations"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <span className="text-[10px] font-mono text-[#D4AF64] uppercase font-bold">
              REGISTRATION DOSSIER
            </span>
            <h1 className="admin-font-serif text-2xl font-bold tracking-wide text-[#F0E8D8] font-mono">
              {reg.id}
            </h1>
          </div>
        </div>

        {/* 25. Actions: MARK CHECKED IN / MARK NOT CHECKED IN */}
        <div className="flex items-center gap-2">
          {isCheckedIn ? (
            <button
              onClick={() => toggleCheckInStatus(reg.id, 'pending')}
              className="admin-btn admin-btn-secondary text-xs uppercase text-amber-400 border-amber-500/30"
            >
              <UserX className="w-4 h-4" />
              MARK NOT CHECKED IN
            </button>
          ) : (
            <button
              onClick={() => toggleCheckInStatus(reg.id, 'checked-in')}
              className="admin-btn admin-btn-primary text-xs uppercase"
            >
              <UserCheck className="w-4 h-4" />
              MARK CHECKED IN
            </button>
          )}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Participant & Team info */}
        <div className="md:col-span-2 space-y-6">
          {/* Participant Details Card */}
          <div className="admin-card p-6 space-y-4">
            <h3 className="admin-title text-base font-semibold border-b border-white/10 pb-2 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#D4AF64]" />
              PARTICIPANT INFORMATION
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-muted uppercase text-[10px]">Full Name</p>
                <p className="font-semibold text-[#F0E8D8] text-sm mt-0.5">{reg.participantName}</p>
              </div>

              <div>
                <p className="text-muted uppercase text-[10px]">College / Institution</p>
                <p className="font-semibold text-[#F0E8D8] text-sm mt-0.5">{reg.college}</p>
              </div>

              <div>
                <p className="text-muted uppercase text-[10px]">Department</p>
                <p className="text-dim text-xs mt-0.5">{reg.department || 'N/A'}</p>
              </div>

              <div>
                <p className="text-muted uppercase text-[10px]">Academic Year</p>
                <p className="text-dim text-xs mt-0.5">{reg.year || 'N/A'}</p>
              </div>

              <div>
                <p className="text-muted uppercase text-[10px]">Email Address</p>
                <p className="text-dim text-xs font-mono mt-0.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#D4AF64]" />
                  {reg.email}
                </p>
              </div>

              <div>
                <p className="text-muted uppercase text-[10px]">Phone Number</p>
                <p className="text-dim text-xs font-mono mt-0.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#D4AF64]" />
                  {reg.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Team Details Card (If team event) */}
          {reg.participationType === 'team' && (
            <div className="admin-card p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <h3 className="admin-title text-base font-semibold flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#D4AF64]" />
                  TEAM MEMBERS ({reg.members?.length || reg.teamSize || 1})
                </h3>
                <span className="text-xs font-mono text-[#E8C97A] font-semibold">{reg.teamName}</span>
              </div>

              <div className="space-y-2">
                {reg.members?.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-[#080807] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                  >
                    <div>
                      <span className="font-semibold text-[#F0E8D8]">{m.name}</span>
                      {m.role && <span className="text-[10px] text-muted ml-2">({m.role})</span>}
                    </div>
                    <div className="flex items-center gap-4 text-muted font-mono text-[11px]">
                      <span>{m.email}</span>
                      <span>{m.phone}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Event Info & Check-in Badge */}
        <div className="space-y-6">
          {/* Check-in Status Card */}
          <div className="admin-card p-5 space-y-4">
            <h4 className="admin-title text-xs uppercase tracking-wider text-muted font-semibold">
              CHECK-IN STATUS
            </h4>
            <div
              className={`p-4 rounded-xl border flex items-center gap-3 ${
                isCheckedIn
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
              }`}
            >
              {isCheckedIn ? <CheckCircle2 className="w-8 h-8 flex-shrink-0" /> : <Clock className="w-8 h-8 flex-shrink-0" />}
              <div>
                <p className="font-bold text-sm uppercase tracking-wider">
                  {isCheckedIn ? 'CHECKED IN' : 'PENDING CHECK-IN'}
                </p>
                <p className="text-[11px] opacity-80 mt-0.5">
                  {isCheckedIn ? `Checked in: ${reg.checkInTime}` : 'Not scanned at venue gate yet.'}
                </p>
              </div>
            </div>
          </div>

          {/* Event Details Card */}
          <div className="admin-card p-5 space-y-3 text-xs">
            <h4 className="admin-title text-xs uppercase tracking-wider text-[#D4AF64] font-semibold border-b border-white/10 pb-2">
              EVENT METADATA
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted">Event:</span>
                <span className="font-semibold text-[#F0E8D8]">{reg.eventName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Category:</span>
                <span className="capitalize text-dim">{reg.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Venue:</span>
                <span className="text-dim">{reg.venue || 'Main Auditorium'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Registered On:</span>
                <span className="font-mono text-dim">{reg.registrationDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRegistrationDetail;
