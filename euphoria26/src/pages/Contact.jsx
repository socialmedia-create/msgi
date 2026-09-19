import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Phone, MapPin, Compass, Calendar, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react'
import { InstagramIcon, YoutubeIcon, LinkedinIcon } from '../components/SocialIcons'
import './Contact.css'

export default function Contact() {
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <section id="contact" className="contact-page pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h4 className="text-gold tracking-[0.3em] font-mono text-xs uppercase mb-2">
            CONNECT WITH US
          </h4>
          <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            CONTACT <span className="text-gold">HELP DESK</span>
          </h2>
          <p className="text-dim text-xs md:text-sm tracking-[0.15em] font-mono mt-3 uppercase">
            MEENAKSHI SUNDARARAJAN ENGINEERING COLLEGE · EUPHORIA 2026
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Main Info Card */}
          <div className="contact-info-card p-8 md:p-10 rounded-3xl border border-white/10 bg-[#09090f]/80 backdrop-blur-xl relative overflow-hidden shadow-2xl flex flex-col justify-between">
            <div className="contact-glow"></div>
            
            <div>
              <div className="flex items-center gap-2 text-gold text-xs font-mono uppercase tracking-widest mb-3">
                <ShieldCheck size={16} />
                <span>OFFICIAL FEST CONVENERS</span>
              </div>
              
              <h3 className="font-display text-2xl md:text-3xl text-white font-bold mb-8">
                Get in Touch with the Organizing Team
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-gold/30 transition-colors">
                  <div className="info-icon-box p-3 rounded-xl bg-gold/15 text-gold border border-gold/30 shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className="info-label text-xs font-mono uppercase text-dim block mb-1">Official Email</span>
                    <a href="mailto:euphoria@msec.edu.in" className="info-val text-white font-medium hover:text-gold transition-colors text-sm md:text-base">
                      euphoria@msec.edu.in
                    </a>
                    <span className="text-[11px] text-dim block mt-0.5 font-mono">For registrations, events, or inquiries</span>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-gold/30 transition-colors">
                  <div className="info-icon-box p-3 rounded-xl bg-gold/15 text-gold border border-gold/30 shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <span className="info-label text-xs font-mono uppercase text-dim block mb-1">Helpline Desk</span>
                    <a href="tel:+917358620251" className="info-val text-white font-medium hover:text-gold transition-colors text-sm md:text-base font-mono">
                      +91 7358620251 / +91 6379359381
                    </a>
                    <span className="text-[11px] text-dim block mt-0.5 font-mono">Mon - Sat: 9:00 AM - 6:00 PM</span>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-gold/30 transition-colors">
                  <div className="info-icon-box p-3 rounded-xl bg-gold/15 text-gold border border-gold/30 shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="info-label text-xs font-mono uppercase text-dim block mb-1">College Address</span>
                    <p className="info-val text-white/90 text-xs md:text-sm leading-relaxed">
                      Meenakshi Sundararajan Engineering College (Autonomous),<br />
                      363, Arcot Road, Kodambakkam,<br />
                      Chennai, Tamil Nadu 600024
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <div className="pt-8 mt-8 border-t border-white/10">
              <span className="info-label text-xs font-mono uppercase text-dim block mb-3">
                Follow Euphoria Updates
              </span>
              <div className="flex items-center gap-3">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="contact-social-btn p-3 rounded-xl bg-white/5 border border-white/10 hover:border-gold hover:text-gold text-white transition-all flex items-center gap-2 text-xs font-mono"
                  aria-label="Instagram"
                >
                  <InstagramIcon size={18} />
                  <span>Instagram</span>
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="contact-social-btn p-3 rounded-xl bg-white/5 border border-white/10 hover:border-gold hover:text-gold text-white transition-all flex items-center gap-2 text-xs font-mono"
                  aria-label="YouTube"
                >
                  <YoutubeIcon size={18} />
                  <span>YouTube</span>
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="contact-social-btn p-3 rounded-xl bg-white/5 border border-white/10 hover:border-gold hover:text-gold text-white transition-all flex items-center gap-2 text-xs font-mono"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon size={18} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Access & Info Desk Card */}
          <div className="contact-action-card p-8 md:p-10 rounded-3xl border border-white/10 bg-[#09090f]/80 backdrop-blur-xl relative overflow-hidden shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-gold text-xs font-mono uppercase tracking-widest mb-3">
                <HelpCircle size={16} />
                <span>PARTICIPANT GUIDELINES</span>
              </div>
              
              <h3 className="font-display text-2xl md:text-3xl text-white font-bold mb-6">
                Fast Quick Actions
              </h3>

              <div className="space-y-4 mb-8">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <h4 className="text-gold font-display text-sm font-bold mb-1">
                    Event Date & Reporting Time
                  </h4>
                  <p className="text-dim text-xs leading-relaxed">
                    All 10 events will take place on <strong className="text-white">Friday, September 25, 2026</strong>. Participants are requested to report by <strong className="text-white">8:30 AM</strong> at the Main Registration Desk.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <h4 className="text-gold font-display text-sm font-bold mb-1">
                    College ID Card Mandatory
                  </h4>
                  <p className="text-dim text-xs leading-relaxed">
                    All external participants must carry a valid physical College ID card or an official Bonafide Certificate from their institution.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <h4 className="text-gold font-display text-sm font-bold mb-1">
                    Direct Google Form Registration
                  </h4>
                  <p className="text-dim text-xs leading-relaxed">
                    All registrations are processed through official Google Form links. Visit the Registration Hub to view posters and submit your entry.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Link Buttons */}
            <div className="space-y-3 pt-4">
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="w-full py-3.5 px-6 bg-gradient-to-r from-[#f5d77f] via-[#d4af64] to-[#b8860b] text-black font-display font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-gold/20 hover:scale-[1.02] transition-transform cursor-pointer"
              >
                <span>Register for Events</span>
                <ArrowRight size={14} />
              </button>

              <a
                href="https://maps.app.goo.gl/tTDs6GUBkiPaabb9A"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-6 bg-white/5 hover:bg-white/10 text-white font-display font-bold text-xs uppercase tracking-wider border border-white/15 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer text-center"
              >
                <Compass size={14} className="text-gold" />
                <span>Get Campus Directions</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
