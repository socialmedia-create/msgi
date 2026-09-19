import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import {
  LayoutDashboard,
  Calendar,
  Users,
  QrCode,
  CalendarDays,
  Image,
  MapPin,
  Award,
  Download,
  Settings,
  LogOut,
  Sparkles
} from 'lucide-react';

export const NAV_ITEMS = [
  { path: '/credential/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/credential/events', label: 'Events', icon: Calendar },
  { path: '/credential/registrations', label: 'Registrations', icon: Users },
  { path: '/credential/scanner', label: 'Scanner', icon: QrCode },
  { path: '/credential/schedule', label: 'Schedule', icon: CalendarDays },
  { path: '/credential/gallery', label: 'Gallery', icon: Image },
  { path: '/credential/venues', label: 'Venues', icon: MapPin },
  { path: '/credential/sponsors', label: 'Sponsors', icon: Award },
  { path: '/credential/exports', label: 'Exports', icon: Download },
  { path: '/credential/settings', label: 'Settings', icon: Settings }
];

export const AdminSidebar = () => {
  const { logout } = useAdmin();

  return (
    <aside className="w-60 bg-[#0F0D0A] border-r border-[#D4AF64]/20 flex flex-col min-h-screen flex-shrink-0 select-none admin-desktop-sidebar">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#D4AF64]/15">
        <NavLink to="/credential/dashboard" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#D4AF64]/10 border border-[#D4AF64]/30 flex items-center justify-center text-[#D4AF64]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h1 className="admin-font-serif text-base font-bold tracking-widest text-[#F0E8D8] leading-tight">
              EUPHORIA
            </h1>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] tracking-widest text-[#D4AF64] font-semibold">2026</span>
              <span className="text-[9px] tracking-widest text-muted uppercase">CONTROL CENTER</span>
            </div>
          </div>
        </NavLink>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 py-3 px-3 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#1D1912] text-[#E8C97A] border border-[#D4AF64]/40 font-semibold shadow-[0_0_12px_rgba(212,175,100,0.1)]'
                    : 'text-[#A0988A] hover:text-[#F0E8D8] hover:bg-white/5'
                }`
              }
            >
              <Icon className="w-4 h-4 text-[#D4AF64]" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}

        {/* Promo / Festival Banner Card matching reference image image_4.png */}
        <div className="mt-6 p-4 rounded-xl relative overflow-hidden border border-[#D4AF64]/20 bg-[#080807] text-center space-y-2">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none"
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=400&auto=format&fit=crop)'
            }}
          />
          <div className="relative z-10 space-y-1">
            <p className="admin-font-serif text-xs uppercase font-bold tracking-widest text-[#E8C97A]">
              CREATE <br /> MANAGE <br /> CELEBRATE
            </p>
            <p className="text-[9px] font-mono text-muted tracking-widest uppercase">
              EUPHORIA 2026
            </p>
          </div>
        </div>
      </nav>

      {/* Bottom Administrator Profile Card */}
      <div className="p-3.5 border-t border-[#D4AF64]/15 bg-[#080807]">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#D4AF64]/20 border border-[#D4AF64]/40 flex items-center justify-center font-bold text-[#E8C97A] text-xs">
              A
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-[#F0E8D8] truncate">Administrator</p>
              <p className="text-[10px] text-emerald-400 font-mono">Super Admin</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="p-1.5 rounded-lg text-dim hover:text-red-400 hover:bg-red-500/10 transition-colors"
            title="Logout of Control Center"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
