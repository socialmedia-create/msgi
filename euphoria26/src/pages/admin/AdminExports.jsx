import React, { useState, useMemo } from 'react';
import { useAdmin } from '../../context/AdminContext';
import {
  exportEventRegistrationsXLSX,
  exportMasterRegistrationsXLSX,
  exportAllEventsZIP,
  printEventA4Dossier,
  printMasterA4Dossier
} from '../../utils/xlsxExport';
import {
  Download,
  FileSpreadsheet,
  Users,
  CheckCircle2,
  Filter,
  Eye,
  X,
  Archive,
  Search,
  Building2,
  FolderArchive,
  Layers,
  Loader2,
  Printer
} from 'lucide-react';

export const AdminExports = () => {
  const { events, registrations, addToast } = useAdmin();

  const [statusFilter, setStatusFilter] = useState('all'); // all, checked-in, pending
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewingDataEvent, setViewingDataEvent] = useState(null);
  const [modalSearch, setModalSearch] = useState('');

  // ZIP Generation State
  const [isZipping, setIsZipping] = useState(false);
  const [zipProgress, setZipProgress] = useState(null);

  // Compute Overall Festival Metrics
  const totalEvents = events.length;
  const totalRegistrations = registrations.length;
  const checkedInTotal = registrations.filter((r) => r.checkInStatus === 'checked-in').length;
  const pendingTotal = totalRegistrations - checkedInTotal;
  const overallRate = totalRegistrations
    ? ((checkedInTotal / totalRegistrations) * 100).toFixed(1)
    : '0.0';

  const uniqueCollegesCount = useMemo(() => {
    return new Set(registrations.map((r) => r.college).filter(Boolean)).size;
  }, [registrations]);

  // Categories list
  const categories = useMemo(() => {
    const set = new Set(events.map((e) => e.category).filter(Boolean));
    return ['all', ...Array.from(set)];
  }, [events]);

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return events.filter((evt) => {
      const matchesCategory = categoryFilter === 'all' || evt.category === categoryFilter;
      const matchesSearch =
        evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (evt.venue && evt.venue.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [events, categoryFilter, searchQuery]);

  const handleExportSingle = (evt) => {
    const eventRegs = registrations.filter((r) => r.eventId === evt.id);
    exportEventRegistrationsXLSX(evt, eventRegs, { statusFilter });
    addToast(`Exported colorful multi-sheet XLSX for ${evt.title}`, 'success');
  };

  const handlePrintSingle = (evt) => {
    const eventRegs = registrations.filter((r) => r.eventId === evt.id);
    printEventA4Dossier(evt, eventRegs, { statusFilter });
    addToast(`Opening colorful A4 printable dossier for ${evt.title}`, 'info');
  };

  const handleExportMaster = () => {
    exportMasterRegistrationsXLSX(events, registrations, { statusFilter });
    addToast('Exported Master Consolidated Workbook with all event sheets!', 'success');
  };

  const handlePrintMaster = () => {
    printMasterA4Dossier(events, registrations, { statusFilter });
    addToast('Opening Master A4 Printable Dossier', 'info');
  };

  const handleExportZip = async () => {
    setIsZipping(true);
    setZipProgress({ percent: 0, status: 'Initializing Excel generation engine...' });

    try {
      await exportAllEventsZIP(events, registrations, { statusFilter }, (progress) => {
        setZipProgress(progress);
      });
      addToast('All event spreadsheets & master ledger packaged into ZIP successfully!', 'success');
    } catch (err) {
      console.error(err);
      addToast('Failed to create ZIP export: ' + (err.message || 'Unknown error'), 'danger');
    } finally {
      setTimeout(() => {
        setIsZipping(false);
        setZipProgress(null);
      }, 700);
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. Header Banner & Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#D4AF64]/18">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF64]/15 border border-[#D4AF64]/30 text-[10px] font-mono font-bold text-[#E8C97A] uppercase tracking-wider">
              Spreadsheet & Archive Hub
            </span>
            <span className="text-xs text-muted font-mono">• Euphoria 2026</span>
          </div>
          <h1 className="admin-font-serif text-3xl md:text-4xl font-bold tracking-wide text-[#F0E8D8]">
            EVENT DATA EXPORTS
          </h1>
          <p className="text-xs text-[#F0E8D8]/60 max-w-2xl">
            Download individual multi-tab XLSX spreadsheets formatted with College Name headers & sub-headers, print colorful A4 event dossiers, or compile all events into an organized ZIP archive.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handlePrintMaster}
            className="admin-btn admin-btn-secondary py-2.5 px-3.5 text-xs font-semibold tracking-wider flex items-center gap-2 rounded-lg border border-white/10 hover:border-[#D4AF64] hover:bg-white/5 transition-all shadow-sm"
            title="Print Master Festival Dossier in A4 format"
          >
            <Printer className="w-4 h-4 text-[#D4AF64]" />
            <span>PRINT MASTER A4</span>
          </button>

          <button
            onClick={handleExportMaster}
            className="admin-btn admin-btn-secondary py-2.5 px-4 text-xs font-semibold tracking-wider flex items-center gap-2 rounded-lg border border-[#D4AF64]/30 hover:border-[#D4AF64] hover:bg-[#D4AF64]/10 transition-all shadow-sm"
          >
            <FileSpreadsheet className="w-4 h-4 text-[#D4AF64]" />
            <span>EXPORT MASTER (.XLSX)</span>
          </button>

          <button
            onClick={handleExportZip}
            disabled={isZipping}
            className="admin-btn admin-btn-primary py-2.5 px-5 text-xs uppercase font-bold tracking-wider flex items-center gap-2 rounded-lg shadow-[0_4px_16px_rgba(212,175,100,0.25)] hover:shadow-[0_6px_22px_rgba(212,175,100,0.4)] transition-all"
          >
            {isZipping ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#080807]" />
                <span>PACKAGING ZIP ({zipProgress?.percent || 0}%)...</span>
              </>
            ) : (
              <>
                <FolderArchive className="w-4 h-4" />
                <span>EXPORT ALL SHEETS (ZIP) ↓</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. Key Metrics Summary Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="admin-card p-4 rounded-xl border border-white/8 bg-[#0F0D0A]/80 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted text-xs mb-2">
            <span className="uppercase text-[10px] tracking-wider font-semibold">Total Events</span>
            <Layers className="w-4 h-4 text-[#D4AF64]" />
          </div>
          <div>
            <p className="text-2xl font-bold font-mono text-[#F0E8D8]">{totalEvents}</p>
            <p className="text-[10px] text-muted mt-1">Ready for A4 print & export</p>
          </div>
        </div>

        <div className="admin-card p-4 rounded-xl border border-white/8 bg-[#0F0D0A]/80 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted text-xs mb-2">
            <span className="uppercase text-[10px] tracking-wider font-semibold">Total Registrations</span>
            <Users className="w-4 h-4 text-[#D4AF64]" />
          </div>
          <div>
            <p className="text-2xl font-bold font-mono text-[#E8C97A]">{totalRegistrations}</p>
            <p className="text-[10px] text-muted mt-1">Across all categories</p>
          </div>
        </div>

        <div className="admin-card p-4 rounded-xl border border-white/8 bg-[#0F0D0A]/80 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted text-xs mb-2">
            <span className="uppercase text-[10px] tracking-wider font-semibold">Verified Checked-In</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold font-mono text-emerald-400">{checkedInTotal}</p>
              <span className="text-xs font-mono text-emerald-400/80">({overallRate}%)</span>
            </div>
            <p className="text-[10px] text-muted mt-1">{pendingTotal} pending check-in</p>
          </div>
        </div>

        <div className="admin-card p-4 rounded-xl border border-white/8 bg-[#0F0D0A]/80 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted text-xs mb-2">
            <span className="uppercase text-[10px] tracking-wider font-semibold">Represented Colleges</span>
            <Building2 className="w-4 h-4 text-[#D4AF64]" />
          </div>
          <div>
            <p className="text-2xl font-bold font-mono text-[#F0E8D8]">{uniqueCollegesCount}</p>
            <p className="text-[10px] text-muted mt-1">Institutions nationwide</p>
          </div>
        </div>
      </div>

      {/* 3. Search & Filter Toolbar */}
      <div className="admin-card p-4 rounded-xl border border-[#D4AF64]/20 bg-[#0F0D0A]/90 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Left: Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#D4AF64]/70 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search event title, category, venue..."
            className="w-full h-9 bg-[#080807] border border-white/10 rounded-lg pl-9 pr-8 text-xs text-[#F0E8D8] placeholder:text-[#F0E8D8]/30 focus:outline-none focus:border-[#D4AF64] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-dim hover:text-white text-xs"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right: Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Category Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-muted font-medium">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="h-9 bg-[#080807] border border-white/10 rounded-lg px-2.5 text-xs text-[#F0E8D8] focus:outline-none focus:border-[#D4AF64] capitalize cursor-pointer"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === 'all' ? 'All Categories' : c}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter Toggle */}
          <div className="flex items-center gap-1 bg-[#080807] p-1 rounded-lg border border-white/10 text-xs">
            <Filter className="w-3.5 h-3.5 text-[#D4AF64] ml-1.5 mr-0.5" />
            {['all', 'checked-in', 'pending'].map((f) => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={`px-3 py-1 rounded-md text-[11px] font-semibold capitalize transition-all ${
                  statusFilter === f
                    ? 'bg-[#D4AF64] text-[#080807] shadow-sm'
                    : 'text-[#A0988A] hover:text-[#F0E8D8]'
                }`}
              >
                {f === 'pending' ? 'Pending' : f === 'checked-in' ? 'Checked-In' : 'All Rows'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Event Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredEvents.map((evt) => {
          const eventRegs = registrations.filter((r) => r.eventId === evt.id);
          const checkedIn = eventRegs.filter((r) => r.checkInStatus === 'checked-in').length;
          const pending = eventRegs.length - checkedIn;
          const completionPct = eventRegs.length
            ? Math.round((checkedIn / eventRegs.length) * 100)
            : 0;

          const isTeam = evt.participation_type === 'team';

          return (
            <div
              key={evt.id}
              className="admin-card rounded-xl p-5 flex flex-col justify-between border border-[#D4AF64]/18 hover:border-[#D4AF64]/50 bg-[#0F0D0A]/90 hover:bg-[#14110D] transition-all duration-200 group shadow-md hover:shadow-xl relative overflow-hidden"
            >
              {/* Top Row: Thumbnail + Category + Badges */}
              <div className="space-y-3.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={evt.thumbnail || evt.image}
                      alt={evt.title}
                      className="w-12 h-12 rounded-lg object-cover border border-[#D4AF64]/30 shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono text-[#D4AF64] uppercase font-bold tracking-wider block">
                        {evt.categoryLabel || evt.category}
                      </span>
                      <h3 className="font-bold text-[#F0E8D8] text-base leading-snug truncate group-hover:text-[#E8C97A] transition-colors">
                        {evt.title}
                      </h3>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider flex-shrink-0 border ${
                      isTeam
                        ? 'bg-purple-950/40 text-purple-300 border-purple-500/30'
                        : 'bg-amber-950/40 text-amber-300 border-amber-500/30'
                    }`}
                  >
                    {evt.participation_type || 'Solo'}
                  </span>
                </div>

                {/* Stats Counter Bar */}
                <div className="grid grid-cols-2 gap-2 bg-[#080807]/90 p-3 rounded-lg border border-white/5">
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-muted font-medium">Total Registered</p>
                    <p className="font-mono text-lg font-bold text-[#F0E8D8] mt-0.5">
                      {eventRegs.length}
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-muted font-medium">Checked In</p>
                    <div className="flex items-baseline gap-1.5 mt-0.5">
                      <p className="font-mono text-lg font-bold text-emerald-400">{checkedIn}</p>
                      <span className="text-[10px] font-mono text-muted">({completionPct}%)</span>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#D4AF64] to-emerald-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${completionPct}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-muted">
                    <span>{pending} pending</span>
                    <span>{completionPct}% verified</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-4 mt-2 border-t border-white/8">
                <button
                  onClick={() => {
                    setViewingDataEvent(evt);
                    setModalSearch('');
                  }}
                  className="p-2 rounded-lg border border-white/10 hover:border-[#D4AF64]/50 bg-white/4 hover:bg-[#D4AF64]/10 text-[#F0E8D8] text-xs transition-all flex items-center justify-center"
                  title="Inspect participant table"
                >
                  <Eye className="w-3.5 h-3.5 text-[#D4AF64]" />
                </button>

                <button
                  onClick={() => handlePrintSingle(evt)}
                  className="flex-1 h-9 rounded-lg border border-white/10 hover:border-[#D4AF64]/50 bg-white/4 hover:bg-[#D4AF64]/10 text-[#F0E8D8] text-[11px] font-semibold tracking-wider flex items-center justify-center gap-1.5 transition-all"
                  title="Print colorful A4 dossier"
                >
                  <Printer className="w-3.5 h-3.5 text-[#D4AF64]" />
                  <span>PRINT A4</span>
                </button>

                <button
                  onClick={() => handleExportSingle(evt)}
                  className="flex-1 h-9 rounded-lg bg-gradient-to-r from-[#D4AF64] to-[#B89248] hover:from-[#E8C97A] hover:to-[#D4AF64] text-[#080807] text-[11px] font-bold tracking-wider flex items-center justify-center gap-1.5 shadow-sm hover:shadow-[0_2px_12px_rgba(212,175,100,0.3)] transition-all"
                  title="Download stylized XLSX spreadsheet"
                >
                  <Download className="w-3.5 h-3.5 text-[#080807]" />
                  <span>EXCEL ↓</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredEvents.length === 0 && (
        <div className="admin-card p-12 text-center space-y-3 rounded-xl border border-white/10">
          <FileSpreadsheet className="w-10 h-10 text-muted mx-auto" />
          <h4 className="text-base font-bold text-[#F0E8D8]">No events matching search filter</h4>
          <p className="text-xs text-muted max-w-sm mx-auto">
            Try adjusting your search terms or select another category from the filters above.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setCategoryFilter('all');
              setStatusFilter('all');
            }}
            className="admin-btn admin-btn-secondary text-xs mt-2"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* 5. ZIP EXPORT PROGRESS MODAL / OVERLAY */}
      {isZipping && zipProgress && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="admin-card p-6 rounded-2xl border border-[#D4AF64]/40 bg-[#14110D] max-w-md w-full shadow-2xl space-y-5 text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#D4AF64]/10 border border-[#D4AF64]/40 flex items-center justify-center mx-auto text-[#E8C97A]">
              <Archive className="w-7 h-7 animate-pulse" />
            </div>

            <div className="space-y-1.5">
              <h3 className="admin-font-serif text-2xl font-bold text-[#F0E8D8]">
                Generating ZIP Archive
              </h3>
              <p className="text-xs text-muted">
                Compiling colorful multi-sheet XLSX dossiers for all events...
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="w-full bg-[#080807] rounded-full h-3 p-0.5 border border-white/10 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#D4AF64] via-[#E8C97A] to-emerald-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${zipProgress.percent}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#D4AF64] truncate max-w-[260px] text-left">
                  {zipProgress.status}
                </span>
                <span className="font-bold text-[#F0E8D8]">{zipProgress.percent}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. VIEW DATA PREVIEW MODAL */}
      {viewingDataEvent && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setViewingDataEvent(null)}
        >
          <div
            className="admin-card rounded-2xl p-6 space-y-4 max-w-4xl w-full max-h-[90vh] flex flex-col bg-[#14110D] border border-[#D4AF64]/30 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-[#D4AF64] uppercase font-bold tracking-wider">
                    {viewingDataEvent.categoryLabel || viewingDataEvent.category} • {viewingDataEvent.participation_type}
                  </span>
                  <span className="text-[10px] bg-white/5 border border-white/10 text-muted px-2 py-0.5 rounded">
                    Venue: {viewingDataEvent.venue || 'TBA'}
                  </span>
                </div>
                <h3 className="admin-font-serif text-2xl font-bold text-[#F0E8D8]">
                  {viewingDataEvent.title}
                </h3>
              </div>

              <button
                onClick={() => setViewingDataEvent(null)}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-dim hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Search Toolbar */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 text-[#D4AF64]/60 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={modalSearch}
                  onChange={(e) => setModalSearch(e.target.value)}
                  placeholder="Filter by participant, college, email, or registration ID..."
                  className="w-full h-8 bg-[#080807] border border-white/10 rounded-lg pl-8 pr-4 text-xs text-[#F0E8D8] placeholder:text-[#F0E8D8]/30 focus:outline-none focus:border-[#D4AF64]"
                />
              </div>
            </div>

            {/* Table Container */}
            <div className="admin-table-container flex-1 overflow-y-auto max-h-[50vh] border border-white/8 rounded-xl">
              <table className="admin-table text-xs w-full">
                <thead>
                  <tr>
                    <th className="w-12">#</th>
                    <th>Reg ID</th>
                    <th>Participant Name</th>
                    <th>College Name</th>
                    <th>Department & Year</th>
                    <th>Contact</th>
                    <th>Team</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations
                    .filter((r) => r.eventId === viewingDataEvent.id)
                    .filter((r) => {
                      if (!modalSearch) return true;
                      const q = modalSearch.toLowerCase();
                      return (
                        r.id.toLowerCase().includes(q) ||
                        r.participantName.toLowerCase().includes(q) ||
                        r.college.toLowerCase().includes(q) ||
                        r.email.toLowerCase().includes(q) ||
                        (r.teamName && r.teamName.toLowerCase().includes(q))
                      );
                    })
                    .map((r, idx) => (
                      <tr key={r.id} className="hover:bg-[#D4AF64]/5">
                        <td className="text-muted font-mono">{idx + 1}</td>
                        <td className="font-mono text-[#E8C97A] font-bold whitespace-nowrap">{r.id}</td>
                        <td className="font-semibold text-[#F0E8D8] whitespace-nowrap">{r.participantName}</td>
                        <td className="text-[#F0E8D8]/80 font-medium">
                          <span className="inline-flex items-center gap-1.5">
                            <Building2 className="w-3 h-3 text-[#D4AF64]/70 flex-shrink-0" />
                            {r.college}
                          </span>
                        </td>
                        <td className="text-muted whitespace-nowrap">
                          {r.department} • {r.year}
                        </td>
                        <td className="text-muted text-[11px] whitespace-nowrap">
                          <div>{r.email}</div>
                          <div className="font-mono text-[10px] text-muted">{r.phone}</div>
                        </td>
                        <td className="font-mono text-dim whitespace-nowrap">
                          {r.teamName || 'Solo'}
                        </td>
                        <td className="whitespace-nowrap">
                          <span
                            className={`admin-badge text-[10px] ${
                              r.checkInStatus === 'checked-in'
                                ? 'admin-badge-success'
                                : 'admin-badge-warning'
                            }`}
                          >
                            {r.checkInStatus === 'checked-in' ? '✓ Checked-In' : '⏳ Pending'}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Modal Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
              <span className="text-xs text-muted font-mono">
                Total Registrations:{' '}
                <strong className="text-[#E8C97A]">
                  {registrations.filter((r) => r.eventId === viewingDataEvent.id).length}
                </strong>
              </span>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handlePrintSingle(viewingDataEvent)}
                  className="admin-btn admin-btn-secondary text-xs flex items-center gap-1.5"
                  title="Print or Save as PDF in A4 layout"
                >
                  <Printer className="w-4 h-4 text-[#D4AF64]" />
                  <span>Print A4 Dossier</span>
                </button>

                <button
                  onClick={() => {
                    handleExportSingle(viewingDataEvent);
                  }}
                  className="admin-btn admin-btn-primary text-xs font-bold"
                >
                  <Download className="w-4 h-4" />
                  Download Excel (.xlsx)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminExports;
