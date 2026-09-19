import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { Search, Bell, Settings, LogOut, Menu, ChevronDown, X, ShieldCheck } from 'lucide-react';

export const AdminHeader = ({ onMobileNavToggle }) => {
  const { logout, events, registrations, venues } = useAdmin();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const profileRef = useRef(null);
  const notificationsRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        document.getElementById('admin-global-search')?.focus();
      }
      if (e.key === 'Escape') {
        setIsSearchFocused(false);
        setIsProfileMenuOpen(false);
        setIsNotificationsOpen(false);
      }
    };

    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileMenuOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(e.target)) {
        setIsNotificationsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const searchResults = searchQuery.trim()
    ? [
        ...events
          .filter(
            (e) =>
              e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              e.category.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((e) => ({ type: 'Event', title: e.title, path: `/credential/events/${e.id}` })),
        ...registrations
          .filter(
            (r) =>
              r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
              r.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
              r.college.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((r) => ({ type: 'Registration', title: `${r.id} — ${r.participantName}`, path: `/credential/registrations/${r.id}` })),
        ...venues
          .filter((v) => v.name.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((v) => ({ type: 'Venue', title: v.name, path: `/credential/venues` }))
      ].slice(0, 6)
    : [];

  const handleSearchSelect = (path) => {
    navigate(path);
    setSearchQuery('');
    setIsSearchFocused(false);
  };

  return (
    <header className="h-16 bg-[#0F0D0A]/95 backdrop-blur-md border-b border-[#D4AF64]/18 px-4 sm:px-6 md:px-8 flex items-center justify-between gap-4 sticky top-0 z-40">
      {/* Left: Hamburger (mobile) + Global Search */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Hamburger — mobile only */}
        <button
          onClick={onMobileNavToggle}
          className="md:hidden w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-lg text-[#D4AF64] hover:bg-white/8 transition-colors border border-white/5"
          aria-label="Open Mobile Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-lg min-w-0">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-[#D4AF64]/70 absolute left-3.5 pointer-events-none z-10 flex-shrink-0" />
            <input
              id="admin-global-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              placeholder="Search events, registrations, venues..."
              className="w-full h-9 bg-[#080807] border border-[#D4AF64]/25 rounded-lg pl-10 pr-14 text-xs text-[#F0E8D8] placeholder:text-[#F0E8D8]/40 focus:outline-none focus:border-[#D4AF64] focus:ring-1 focus:ring-[#D4AF64]/30 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-10 text-dim hover:text-white p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <kbd className="hidden sm:inline-flex items-center gap-0.5 absolute right-2.5 px-1.5 py-0.5 text-[10px] font-mono text-[#D4AF64]/70 bg-[#D4AF64]/10 border border-[#D4AF64]/20 rounded pointer-events-none">
              ⌘K
            </kbd>
          </div>

          {/* Search Dropdown */}
          {isSearchFocused && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[#14110D] border border-[#D4AF64]/30 rounded-xl shadow-2xl overflow-hidden z-50 animate-fadeIn">
              {searchResults.map((res, idx) => (
                <div
                  key={idx}
                  onMouseDown={() => handleSearchSelect(res.path)}
                  className="px-4 py-3 hover:bg-[#D4AF64]/10 cursor-pointer flex items-center justify-between border-b border-white/5 last:border-none transition-colors"
                >
                  <span className="text-xs text-[#F0E8D8] font-medium truncate pr-2">{res.title}</span>
                  <span className="text-[9px] uppercase tracking-wider text-[#D4AF64] bg-[#D4AF64]/10 px-2 py-0.5 rounded border border-[#D4AF64]/20 flex-shrink-0 font-mono font-semibold">
                    {res.type}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right: Security Badge + Notifications + Profile */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-[10px] font-mono text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>PORTAL ACTIVE</span>
        </div>

        {/* Notification Bell */}
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => {
              setIsNotificationsOpen(!isNotificationsOpen);
              setIsProfileMenuOpen(false);
            }}
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/4 hover:bg-white/10 border border-white/8 text-[#D4AF64] transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#E8C97A] shadow-[0_0_6px_#E8C97A]" />
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-[#14110D] border border-[#D4AF64]/30 rounded-xl shadow-2xl p-4 z-50 animate-fadeIn">
              <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3">
                <span className="text-xs font-semibold text-[#F0E8D8]">System Alerts</span>
                <span className="text-[10px] text-[#D4AF64] bg-[#D4AF64]/10 px-2 py-0.5 rounded font-mono font-bold">3 Unread</span>
              </div>
              <div className="space-y-2 text-xs">
                {[
                  { title: 'New Registration', msg: 'EUP26-BAT-5848 registered for Battle of Bands' },
                  { title: 'Scanner Active', msg: 'Scanner node initialized at Main Auditorium' },
                  { title: 'Gallery Upload', msg: '3 new photos added to Motion Memory' }
                ].map((n, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-white/4 border border-white/6 hover:border-[#D4AF64]/30 transition-colors">
                    <p className="text-[#E8C97A] font-semibold text-[11px]">{n.title}</p>
                    <p className="text-[#F0E8D8]/60 text-[10px] mt-0.5">{n.msg}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Button */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => {
              setIsProfileMenuOpen(!isProfileMenuOpen);
              setIsNotificationsOpen(false);
            }}
            className="flex items-center gap-2 h-9 pl-1.5 pr-3 rounded-lg bg-white/4 hover:bg-white/10 border border-white/8 transition-all"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#D4AF64] to-[#99732B] text-[#080807] flex items-center justify-center font-bold text-xs shadow-sm flex-shrink-0">
              A
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-[11px] font-semibold text-[#F0E8D8] leading-tight">Admin</span>
              <span className="text-[9px] text-[#D4AF64] font-mono leading-none">Super User</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#F0E8D8]/50 ml-0.5" />
          </button>

          {isProfileMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-52 bg-[#14110D] border border-[#D4AF64]/30 rounded-xl shadow-2xl py-1.5 z-50 animate-fadeIn">
              <div className="px-4 py-3 border-b border-white/10 mb-1">
                <p className="text-xs font-bold text-[#F0E8D8]">Administrator</p>
                <p className="text-[10px] text-emerald-400 font-mono mt-0.5">euphoria-admin</p>
              </div>
              <button
                onClick={() => {
                  setIsProfileMenuOpen(false);
                  navigate('/credential/settings');
                }}
                className="w-full text-left px-4 py-2.5 text-xs text-[#F0E8D8]/80 hover:text-[#F0E8D8] hover:bg-[#D4AF64]/10 flex items-center gap-2.5 transition-colors"
              >
                <Settings className="w-4 h-4 text-[#D4AF64]" />
                System Settings
              </button>
              <button
                onClick={() => {
                  setIsProfileMenuOpen(false);
                  logout();
                }}
                className="w-full text-left px-4 py-2.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 flex items-center gap-2.5 border-t border-white/10 transition-colors mt-1"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
