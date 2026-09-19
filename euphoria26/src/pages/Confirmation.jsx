import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CheckCircle2, Download, ArrowLeft, Sparkles, Copy, Check, Calendar, MapPin } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import './Confirmation.css'

export default function Confirmation() {
  const location = useLocation()
  const navigate = useNavigate()
  const [toastMessage, setToastMessage] = useState('')
  const [copied, setCopied] = useState(false)
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)

  const stateData = location.state

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const data = stateData || {
    registrationId: 'EUP26-BAT-5848',
    event: {
      title: 'BATTLE OF BANDS',
      categoryLabel: 'Music',
      date: 'Feb 14, 2026',
      time: '09:00 AM - 01:00 PM',
      venue: 'Open Air Stage',
      participation_type: 'team'
    },
    participant: {
      fullName: 'Fazil',
      college: 'MSEC',
      department: 'CSE',
      year: '3rd Year',
      email: 'abc@gmail.com',
      phone: '9887765432'
    },
    team: {
      teamName: 'ABC',
      teamLeader: 'Fazil',
      members: [{ name: 'Arjun', email: 'arjun@gmail.com', phone: '9123456780' }, { name: 'Karthik', email: 'karthik@gmail.com', phone: '9876543210' }]
    },
    registrationDate: 'Feb 14, 2026'
  }

  const qrValue = [
    'EUPHORIA 2026',
    `ID: ${data.registrationId}`,
    `EVENT: ${data.event?.title}`,
    `PARTICIPANT: ${data.participant?.fullName}`,
    `COLLEGE: ${data.participant?.college}`,
    `DATE: ${data.event?.date}`,
    `VENUE: ${data.event?.venue}`,
    data.team?.teamName ? `TEAM: ${data.team.teamName}` : ''
  ].filter(Boolean).join('\n')

  const handleCopyId = () => {
    navigator.clipboard.writeText(data.registrationId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownloadPassPDF = async () => {
    const element = document.getElementById('participant-pass-card')
    if (!element) return
    setIsGeneratingPdf(true)
    try {
      const canvas = await html2canvas(element, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#0c0812',
        logging: false
      })
      const imgData = canvas.toDataURL('image/png', 1.0)
      const cardW = canvas.width / 3
      const cardH = canvas.height / 3
      const pdf = new jsPDF({
        orientation: cardW > cardH ? 'landscape' : 'portrait',
        unit: 'pt',
        format: [cardW, cardH]
      })
      pdf.addImage(imgData, 'PNG', 0, 0, cardW, cardH)
      pdf.save(`EUPHORIA_Pass_${data.registrationId}.pdf`)
      setToastMessage('Pass downloaded successfully!')
      setTimeout(() => setToastMessage(''), 3000)
    } catch (err) {
      console.error('PDF error:', err)
      setToastMessage('Could not generate PDF. Try again.')
      setTimeout(() => setToastMessage(''), 3000)
    } finally {
      setIsGeneratingPdf(false)
    }
  }

  return (
    <div className="conf-page">

      {/* Toast */}
      {toastMessage && (
        <div className="conf-toast">✓ {toastMessage}</div>
      )}

      {/* ── LEFT / HERO PANEL ── */}
      <div className="conf-hero">
        <div className="conf-hero-overlay" />
        <img
          src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop"
          alt="Concert"
          className="conf-hero-bg"
        />
        <div className="conf-hero-content">
          <div className="conf-success-ring">
            <CheckCircle2 size={40} className="conf-check-icon" />
          </div>
          <h2 className="conf-hero-title">Registration<br />Successful!</h2>
          <p className="conf-hero-sub">You're all set for an amazing<br />experience at EUPHORIA 2026.</p>

          <div className="conf-regid-box">
            <div>
              <span className="conf-regid-label">Registration ID</span>
              <span className="conf-regid-value">{data.registrationId}</span>
            </div>
            <button onClick={handleCopyId} className="conf-copy-btn" title="Copy">
              {copied ? <Check size={15} /> : <Copy size={15} />}
            </button>
          </div>

          <p className="conf-hero-note">A confirmation has been sent to your email.</p>

          {/* Action buttons in hero on mobile */}
          <div className="conf-actions-hero">
            <button onClick={handleDownloadPassPDF} disabled={isGeneratingPdf} className="conf-btn-download" id="download-pass-btn">
              <Download size={16} />
              {isGeneratingPdf ? 'Generating…' : 'Download Participant Pass'}
            </button>
            <button onClick={() => navigate('/events')} className="conf-btn-back" id="back-to-events-btn">
              <ArrowLeft size={15} /> Back to Events
            </button>
          </div>

          <div className="conf-hero-slogan">"Same Stage, New Stories."</div>
        </div>
      </div>

      {/* ── RIGHT / PASS CARD PANEL ── */}
      <div className="conf-right">

        {/* Download button above card (desktop) */}
        <div className="conf-top-bar">
          <button onClick={handleDownloadPassPDF} disabled={isGeneratingPdf} className="conf-btn-download-sm">
            <Download size={14} />
            {isGeneratingPdf ? 'Generating…' : 'Download PDF'}
          </button>
        </div>

        {/* ── PASS CARD ── */}
        <div id="participant-pass-card" className="pass-card">
          {/* Decorative blobs */}
          <div className="pass-blob-1" />
          <div className="pass-blob-2" />

          {/* Pass Header */}
          <div className="pass-header">
            <div className="pass-brand">
              <Sparkles size={16} className="pass-sparkle" />
              <span className="pass-brand-name">EUPHORIA</span>
              <span className="pass-brand-year">2026</span>
            </div>
            <span className="pass-badge-text">SAME STAGE. NEW STORIES.</span>
            <div className="pass-badge">PARTICIPANT PASS</div>
          </div>

          {/* Pass Body */}
          <div className="pass-body">
            {/* Details column */}
            <div className="pass-details">
              {[
                ['EVENT', data.event?.title],
                ['PARTICIPANT', data.participant?.fullName],
                ['COLLEGE', data.participant?.college],
                ['DEPARTMENT', `${data.participant?.department} – ${data.participant?.year}`],
                ...(data.team?.teamName ? [['TEAM NAME', data.team.teamName]] : []),
                ['VENUE', data.event?.venue],
                ['DATE', data.event?.date]
              ].map(([key, val]) => (
                <div key={key} className="pass-row">
                  <span className="pass-row-key">{key}</span>
                  <span className={`pass-row-val ${key === 'EVENT' ? 'pass-row-event' : ''}`}>{val}</span>
                </div>
              ))}
            </div>

            {/* QR column */}
            <div className="pass-qr-col">
              <div className="pass-qr-frame">
                <QRCodeSVG
                  value={qrValue}
                  size={110}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="M"
                  includeMargin={false}
                />
              </div>
              <span className="pass-qr-id">{data.registrationId}</span>
            </div>
          </div>

          {/* Pass Footer */}
          <div className="pass-footer">
            <div className="pass-dots">
              {Array.from({ length: 22 }).map((_, i) => <span key={i} className="pass-dot" />)}
            </div>
            <p className="pass-footer-slogan">SAME STAGE. NEW STORIES.</p>
          </div>
        </div>

        {/* Action row below card (desktop) */}
        <div className="conf-action-row">
          <button onClick={handleDownloadPassPDF} disabled={isGeneratingPdf} className="conf-btn-download" id="download-pass-btn-2">
            <Download size={16} />
            {isGeneratingPdf ? 'Generating PDF…' : 'Download PDF'}
          </button>
          <button onClick={() => navigate('/events')} className="conf-btn-back-sm">
            <ArrowLeft size={14} /> Back to Home
          </button>
        </div>

      </div>
    </div>
  )
}
