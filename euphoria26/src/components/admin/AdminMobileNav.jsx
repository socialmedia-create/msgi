import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { NAV_ITEMS } from './AdminSidebar';
import { X, Sparkles, LogOut } from 'lucide-react';

export const AdminMobileNav = ({ isOpen, onClose }) => {
  const { logout } = useAdmin();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden flex">
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer content */}
      <div className="relative w-4/5 max-w-xs bg-[#0F0D0A] border-r border-[#D4AF64]/30 flex flex-col h-full z-10 shadow-2xl animate-fadeIn">
        {/* Top Header */}
        <div className="p-4 border-b border-[#D4AF64]/15 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-[#D4AF64]/10 border border-[#D4AF64]/30 flex items-center justify-center text-[#D4AF64]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="admin-font-serif text-base font-bold tracking-wider text-[#F0E8D8]">
                EUPHORIA
              </h2>
              <p className="text-[9px] tracking-widest text-[#D4AF64]">CONTROL CENTER</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-dim hover:text-white hover:bg-white/10"
            aria-label="Close mobile menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#D4AF64]/15 text-[#E8C97A] border border-[#D4AF64]/30'
                      : 'text-dim hover:text-[#F0E8D8] hover:bg-white/5'
                  }`
                }
              >
                <Icon className="w-5 h-5 text-[#D4AF64]" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Profile */}
        <div className="p-4 border-t border-[#D4AF64]/15 bg-[#080807]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#D4AF64]/20 border border-[#D4AF64]/40 flex items-center justify-center font-bold text-[#E8C97A] text-xs">
                A
              </div>
              <div>
                <p className="text-xs font-semibold text-[#F0E8D8]">Administrator</p>
                <p className="text-[10px] text-emerald-400 font-mono">Super Admin</p>
              </div>
            </div>
            <button
              onClick={() => {
                onClose();
                logout();
              }}
              className="p-2 text-dim hover:text-red-400"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMobileNav;
