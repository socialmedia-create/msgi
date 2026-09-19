import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import {
  QrCode,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Camera,
  Shield
} from 'lucide-react';

export const AdminScanner = () => {
  const { events, registrations, toggleCheckInStatus } = useAdmin();
  const [searchParams] = useSearchParams();
  const initialEventId = searchParams.get('event') || events[0]?.id || 'escape-exe';

  const [selectedEventId, setSelectedEventId] = useState(initialEventId);
  const [scanState, setScanState] = useState('scanning');
  const [lastScannedResult, setLastScannedResult] = useState(null);

  const selectedEvent = events.find((e) => e.id === selectedEventId) || events[0];

  const handleDemoScan = (simulationType = 'success') => {
    if (simulationType === 'invalid') {
      setScanState('invalid');
      return;
    }

    if (simulationType === 'wrong-event') {
      const wrongEvtReg = registrations.find((r) => r.eventId !== selectedEventId) || registrations[0];
      setLastScannedResult({
        regId: wrongEvtReg.id,
        participant: wrongEvtReg.participantName,
        targetEvent: wrongEvtReg.eventName
      });
      setScanState('wrong-event');
      return;
    }

    const eventRegs = registrations.filter((r) => r.eventId === selectedEventId);
    if (!eventRegs.length) {
      setScanState('invalid');
      return;
    }

    const reg = eventRegs[0];
    if (reg.checkInStatus === 'checked-in' && simulationType !== 'already') {
      setLastScannedResult({
        regId: reg.id,
        participant: reg.participantName,
        event: selectedEvent.title,
        college: reg.college,
        checkInTime: reg.checkInTime || 'Just now'
      });
      setScanState('already-checked-in');
      return;
    }

    if (simulationType === 'already') {
      setLastScannedResult({
        regId: reg.id,
        participant: reg.participantName,
        event: selectedEvent.title,
        college: reg.college,
        checkInTime: reg.checkInTime || '10:42 AM'
      });
      setScanState('already-checked-in');
      return;
    }

    toggleCheckInStatus(reg.id, 'checked-in');
    setLastScannedResult({
      regId: reg.id,
      participant: reg.participantName,
      event: selectedEvent.title,
      college: reg.college,
      checkInTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    });
    setScanState('success');
  };

  const handleScanNext = () => {
    setScanState('scanning');
    setLastScannedResult(null);
  };

  return (
    <div className="w-full max-w-lg mx-auto space-y-5 px-0">
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF64]/10 border border-[#D4AF64]/30 text-xs text-[#D4AF64] font-mono uppercase font-bold">
          <Shield className="w-3.5 h-3.5" />
          SECURE SCANNER NODE
        </div>
        <h1 className="admin-font-serif text-2xl md:text-3xl font-bold tracking-wide text-[#F0E8D8]">
          EUPHORIA EVENT CHECK-IN
        </h1>
        <p className="text-xs text-dim">
          Point device camera at participant registration QR code
        </p>
      </div>

      {/* Event Selector */}
      <div className="admin-card p-4">
        <label className="block text-xs uppercase tracking-wider text-muted font-medium mb-2">
          Select Event Gate *
        </label>
        <select
          value={selectedEventId}
          onChange={(e) => {
            setSelectedEventId(e.target.value);
            setScanState('scanning');
          }}
          className="admin-select py-2.5 text-sm font-semibold"
        >
          {events.map((e) => (
            <option key={e.id} value={e.id}>
              {e.title} — {e.venue}
            </option>
          ))}
        </select>
      </div>

      {/* Scanner Viewport */}
      <div className="admin-card border border-[#D4AF64]/25 relative overflow-hidden">
        <div className="p-5 flex flex-col items-center justify-center min-h-72 w-full">

          {/* STATE: SCANNING */}
          {scanState === 'scanning' && (
            <div className="w-full flex flex-col items-center space-y-5">
              {/* Viewfinder */}
              <div className="relative w-52 h-52 border-2 border-[#D4AF64]/40 rounded-2xl flex items-center justify-center bg-black/60 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                <div className="absolute -top-0.5 -left-0.5 w-5 h-5 border-t-2 border-l-2 border-[#E8C97A]" />
                <div className="absolute -top-0.5 -right-0.5 w-5 h-5 border-t-2 border-r-2 border-[#E8C97A]" />
                <div className="absolute -bottom-0.5 -left-0.5 w-5 h-5 border-b-2 border-l-2 border-[#E8C97A]" />
                <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 border-b-2 border-r-2 border-[#E8C97A]" />
                <div className="absolute inset-x-4 h-0.5 bg-gradient-to-r from-transparent via-[#E8C97A] to-transparent shadow-[0_0_12px_#E8C97A] admin-scanner-line top-1/2" />
                <Camera className="w-10 h-10 text-[#D4AF64]/40 animate-pulse" />
              </div>

              <div className="text-center space-y-1">
                <h3 className="text-sm font-semibold tracking-wider text-[#F0E8D8] uppercase">SCAN REGISTRATION QR</h3>
                <p className="text-xs text-muted">Point the camera at the registration QR code</p>
              </div>

              {/* Demo Buttons */}
              <div className="w-full pt-4 border-t border-white/10 space-y-3">
                <p className="text-[10px] text-center text-muted uppercase font-mono tracking-wider">
                  UI Demo Trigger Options
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleDemoScan('success')}
                    className="admin-btn admin-btn-primary py-2.5 text-[11px] uppercase font-semibold"
                  >
                    ✓ SUCCESS SCAN
                  </button>
                  <button
                    onClick={() => handleDemoScan('already')}
                    className="admin-btn admin-btn-secondary py-2.5 text-[11px] uppercase"
                    style={{ color: '#F59E0B' }}
                  >
                    ⚠ DUPLICATE SCAN
                  </button>
                  <button
                    onClick={() => handleDemoScan('wrong-event')}
                    className="admin-btn admin-btn-secondary py-2.5 text-[11px] uppercase"
                    style={{ color: '#F87171' }}
                  >
                    ✕ WRONG EVENT
                  </button>
                  <button
                    onClick={() => handleDemoScan('invalid')}
                    className="admin-btn admin-btn-secondary py-2.5 text-[11px] uppercase"
                    style={{ color: '#F87171' }}
                  >
                    ✕ INVALID QR
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STATE: SUCCESS */}
          {scanState === 'success' && lastScannedResult && (
            <div className="w-full text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto shadow-[0_0_24px_rgba(52,211,153,0.3)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <span className="text-[11px] font-mono tracking-widest text-emerald-400 font-bold uppercase">
                  ✓ CHECK-IN SUCCESSFUL
                </span>
                <h3 className="admin-font-serif text-xl font-bold text-[#F0E8D8] mt-1">
                  {lastScannedResult.participant}
                </h3>
              </div>
              <div className="admin-card p-3.5 text-xs space-y-2 text-left bg-[#080807] border-emerald-500/20 w-full">
                <div className="flex justify-between gap-2">
                  <span className="text-muted flex-shrink-0">Reg ID:</span>
                  <span className="font-mono font-bold text-[#E8C97A] text-right">{lastScannedResult.regId}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-muted flex-shrink-0">Event:</span>
                  <span className="text-dim font-medium text-right truncate">{lastScannedResult.event}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-muted flex-shrink-0">College:</span>
                  <span className="text-dim text-right truncate">{lastScannedResult.college}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-muted flex-shrink-0">Checked In At:</span>
                  <span className="font-mono text-emerald-400 font-bold">{lastScannedResult.checkInTime}</span>
                </div>
              </div>
              <button
                onClick={handleScanNext}
                className="w-full admin-btn admin-btn-primary py-3 text-sm font-semibold uppercase tracking-wider"
              >
                SCAN NEXT PARTICIPANT →
              </button>
            </div>
          )}

          {/* STATE: ALREADY CHECKED IN */}
          {scanState === 'already-checked-in' && lastScannedResult && (
            <div className="w-full text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-amber-500/20 border-2 border-amber-500 flex items-center justify-center text-amber-400 mx-auto">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <div>
                <span className="text-[11px] font-mono tracking-widest text-amber-400 font-bold uppercase">
                  ⚠ ALREADY CHECKED IN
                </span>
                <h3 className="admin-font-serif text-xl font-bold text-[#F0E8D8] mt-1">
                  {lastScannedResult.participant}
                </h3>
                <p className="text-xs text-muted mt-1">
                  This pass was previously scanned at {lastScannedResult.checkInTime}
                </p>
              </div>
              <button
                onClick={handleScanNext}
                className="w-full admin-btn admin-btn-secondary py-2.5 text-xs uppercase"
              >
                SCAN NEXT
              </button>
            </div>
          )}

          {/* STATE: WRONG EVENT */}
          {scanState === 'wrong-event' && (
            <div className="w-full text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center text-red-400 mx-auto">
                <XCircle className="w-8 h-8" />
              </div>
              <div>
                <span className="text-[11px] font-mono tracking-widest text-red-400 font-bold uppercase">
                  ✕ WRONG EVENT GATE
                </span>
                <p className="text-xs text-muted mt-2 px-2">
                  This registration is for{' '}
                  <strong className="text-[#F0E8D8]">{lastScannedResult?.targetEvent}</strong>, not{' '}
                  <strong className="text-[#F0E8D8]">{selectedEvent?.title}</strong>.
                </p>
              </div>
              <button
                onClick={handleScanNext}
                className="w-full admin-btn admin-btn-secondary py-2.5 text-xs uppercase"
              >
                SCAN NEXT
              </button>
            </div>
          )}

          {/* STATE: INVALID */}
          {scanState === 'invalid' && (
            <div className="w-full text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center text-red-400 mx-auto">
                <XCircle className="w-8 h-8" />
              </div>
              <div>
                <span className="text-[11px] font-mono tracking-widest text-red-400 font-bold uppercase">
                  ✕ INVALID REGISTRATION QR
                </span>
                <p className="text-xs text-muted mt-2">QR Code not recognized in EUPHORIA system.</p>
              </div>
              <button
                onClick={handleScanNext}
                className="w-full admin-btn admin-btn-secondary py-2.5 text-xs uppercase"
              >
                SCAN NEXT
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminScanner;
