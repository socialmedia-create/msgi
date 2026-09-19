import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Lock, ArrowRight, AlertCircle, Shield } from 'lucide-react';

export const AdminLogin = () => {
  const { login } = useAdmin();
  const navigate = useNavigate();

  const [credential, setCredential] = useState('euphoria-admin');
  const [password, setPassword] = useState('euphoria@2026');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const res = login(credential, password);
      setIsLoading(false);
      if (res.success) {
        navigate('/credential/dashboard');
      } else {
        setError(res.error || 'Invalid credentials');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#080807] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4AF64]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#D4AF64]/5 rounded-full blur-[90px] pointer-events-none" />

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-[#0F0D0A] border border-[#D4AF64]/25 rounded-2xl p-8 md:p-10 shadow-2xl relative z-10 animate-fadeIn">
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#D4AF64]/10 border border-[#D4AF64]/30 text-[#D4AF64] mb-4 shadow-[0_0_20px_rgba(212,175,100,0.15)]">
            <Sparkles className="w-7 h-7" />
          </div>
          <h1 className="admin-font-serif text-2xl md:text-3xl font-bold tracking-widest text-[#F0E8D8] uppercase">
            ✦ EUPHORIA 2026
          </h1>
          <p className="text-xs tracking-widest text-[#D4AF64] font-semibold mt-1 uppercase">
            CONTROL CENTER
          </p>
          <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-muted tracking-wider uppercase">
            <Shield className="w-3 h-3 text-[#D4AF64]" />
            PRIVATE ADMIN ACCESS
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-wider text-muted font-medium mb-2">
              Credential
            </label>
            <input
              type="text"
              required
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              placeholder="Enter credential"
              className="admin-input"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-muted font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="admin-input"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full admin-btn admin-btn-primary py-3 text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2 mt-6"
          >
            {isLoading ? (
              <span className="animate-pulse">VERIFYING...</span>
            ) : (
              <>
                <span>ACCESS CONTROL CENTER</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo hints footnote */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-[11px] text-muted mb-1">UI Prototype Authentication</p>
          <p className="text-[10px] text-muted/60 font-mono">
            Demo Credential: <span className="text-[#D4AF64]">euphoria-admin</span> | Password: <span className="text-[#D4AF64]">euphoria@2026</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
