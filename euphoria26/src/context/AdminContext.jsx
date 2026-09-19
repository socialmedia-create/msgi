import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_ADMIN_EVENTS } from '../data/admin/events';
import { INITIAL_ADMIN_REGISTRATIONS } from '../data/admin/registrations';
import { INITIAL_ADMIN_SCHEDULE } from '../data/admin/schedule';
import { INITIAL_ADMIN_GALLERY } from '../data/admin/gallery';
import { INITIAL_ADMIN_VENUES } from '../data/admin/venues';
import { INITIAL_ADMIN_SPONSORS } from '../data/admin/sponsors';
import { INITIAL_ADMIN_ACTIVITY } from '../data/admin/activity';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  // Authentication state (Session Storage based for UI phase)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('euphoria_admin_auth') === 'true';
  });

  // Global Registration state
  const [isGlobalRegistrationOpen, setIsGlobalRegistrationOpen] = useState(() => {
    const saved = localStorage.getItem('euphoria_global_reg');
    return saved !== null ? saved === 'true' : true;
  });

  // Data Collections (initialized from mock data)
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('euphoria_admin_events');
    return saved ? JSON.parse(saved) : INITIAL_ADMIN_EVENTS;
  });

  const [registrations, setRegistrations] = useState(() => {
    const saved = localStorage.getItem('euphoria_admin_regs');
    return saved ? JSON.parse(saved) : INITIAL_ADMIN_REGISTRATIONS;
  });

  const [schedule, setSchedule] = useState(() => {
    const saved = localStorage.getItem('euphoria_admin_schedule');
    return saved ? JSON.parse(saved) : INITIAL_ADMIN_SCHEDULE;
  });

  const [gallery, setGallery] = useState(() => {
    const saved = localStorage.getItem('euphoria_admin_gallery');
    return saved ? JSON.parse(saved) : INITIAL_ADMIN_GALLERY;
  });

  const [venues, setVenues] = useState(() => {
    const saved = localStorage.getItem('euphoria_admin_venues');
    return saved ? JSON.parse(saved) : INITIAL_ADMIN_VENUES;
  });

  const [sponsors, setSponsors] = useState(() => {
    const saved = localStorage.getItem('euphoria_admin_sponsors');
    return saved ? JSON.parse(saved) : INITIAL_ADMIN_SPONSORS;
  });

  const [activity, setActivity] = useState(INITIAL_ADMIN_ACTIVITY);

  // Site Settings
  const [siteSettings, setSiteSettings] = useState({
    festivalName: 'EUPHORIA',
    festivalYear: '2026',
    contactEmail: 'contact@euphoria2026.com',
    contactPhone: '+91 98765 43210',
    instagram: 'https://instagram.com/euphoria2026',
    youtube: 'https://youtube.com/euphoria2026',
    linkedin: 'https://linkedin.com/company/euphoria2026'
  });

  // Toast Notifications State
  const [toasts, setToasts] = useState([]);

  // Sync states to LocalStorage for persistence across tab reloads during demo
  useEffect(() => {
    localStorage.setItem('euphoria_global_reg', isGlobalRegistrationOpen);
  }, [isGlobalRegistrationOpen]);

  useEffect(() => {
    localStorage.setItem('euphoria_admin_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('euphoria_admin_regs', JSON.stringify(registrations));
  }, [registrations]);

  useEffect(() => {
    localStorage.setItem('euphoria_admin_schedule', JSON.stringify(schedule));
  }, [schedule]);

  useEffect(() => {
    localStorage.setItem('euphoria_admin_gallery', JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem('euphoria_admin_venues', JSON.stringify(venues));
  }, [venues]);

  useEffect(() => {
    localStorage.setItem('euphoria_admin_sponsors', JSON.stringify(sponsors));
  }, [sponsors]);

  // Toast helper
  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Activity logger helper
  const logActivity = (type, title, code, detail, iconType = 'edit') => {
    const newEntry = {
      id: `act-${Date.now()}`,
      type,
      title,
      code,
      detail,
      time: 'Just now',
      timestamp: new Date().toISOString(),
      iconType
    };
    setActivity((prev) => [newEntry, ...prev.slice(0, 19)]);
  };

  // Authentication Handlers
  const login = (credential, password) => {
    if (credential === 'euphoria-admin' && password === 'euphoria@2026') {
      sessionStorage.setItem('euphoria_admin_auth', 'true');
      setIsAuthenticated(true);
      addToast('Welcome back, Administrator!', 'success');
      logActivity('auth', 'Admin Login', 'euphoria-admin', 'Successful control center authentication', 'user-check');
      return { success: true };
    }
    return { success: false, error: 'Invalid admin credentials or password.' };
  };

  const logout = () => {
    sessionStorage.removeItem('euphoria_admin_auth');
    setIsAuthenticated(false);
    addToast('Logged out of Control Center', 'info');
  };

  // Global Registration Handler
  const setGlobalRegistration = (isOpen) => {
    setIsGlobalRegistrationOpen(isOpen);
    if (isOpen) {
      addToast('Registration reopened for ALL events', 'success');
      logActivity('registration_control', 'Registration Reopened', 'GLOBAL', 'Reopened registration for all festival events', 'unlock');
    } else {
      addToast('All registrations closed successfully', 'warning');
      logActivity('registration_control', 'All Registrations Closed', 'GLOBAL', 'Stopped registrations across all events', 'lock');
    }
  };

  // Event Handlers
  const addEvent = (newEventData) => {
    const id = newEventData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `event-${Date.now()}`;
    const code = newEventData.code || id.slice(0, 3).toUpperCase();
    const createdEvent = {
      id,
      code,
      title: newEventData.title || 'Untitled Event',
      subtitle: newEventData.subtitle || '',
      category: newEventData.category || 'music',
      categoryLabel: newEventData.categoryLabel || newEventData.category || 'General',
      description: newEventData.description || '',
      full_description: newEventData.full_description || newEventData.description || '',
      image: newEventData.image || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop',
      thumbnail: newEventData.thumbnail || newEventData.image || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=400&auto=format&fit=crop',
      date: newEventData.date || 'TBD',
      start_time: newEventData.start_time || '09:00 AM',
      end_time: newEventData.end_time || '05:00 PM',
      time: `${newEventData.start_time || '09:00 AM'} - ${newEventData.end_time || '05:00 PM'}`,
      venue: newEventData.venue || 'Main Auditorium',
      participation_type: newEventData.participation_type || 'solo',
      min_members: Number(newEventData.min_members) || 1,
      max_members: Number(newEventData.max_members) || 1,
      fee: newEventData.fee || 'Free',
      last_date: newEventData.last_date || 'Feb 14, 2026',
      rules: newEventData.rules || ['Follow fest guidelines.'],
      eligibility: newEventData.eligibility || 'Open to all students.',
      prizes: newEventData.prizes || [{ rank: '1st Prize', amount: 'TBD', icon: '🥇' }],
      contact_person: newEventData.contact_person || 'Event Coordinator',
      contact_email: newEventData.contact_email || 'info@euphoria2026.com',
      contact_phone: newEventData.contact_phone || '+91 98765 00000',
      status: newEventData.status || 'published',
      registration_status: newEventData.registration_status || 'open',
      registrationsCount: 0,
      checkedInCount: 0
    };

    setEvents((prev) => [createdEvent, ...prev]);
    addToast(`✓ Event "${createdEvent.title}" created successfully!`, 'success');
    logActivity('event', 'Event Created', createdEvent.title, `Created new event under ${createdEvent.category}`, 'plus-circle');
    return createdEvent;
  };

  const updateEvent = (eventId, updatedFields) => {
    setEvents((prev) =>
      prev.map((evt) => (evt.id === eventId ? { ...evt, ...updatedFields } : evt))
    );
    addToast('✓ Event updated successfully', 'success');
    logActivity('event', 'Event Updated', eventId, `Updated details for ${eventId}`, 'edit');
  };

  const toggleEventRegistration = (eventId, newStatus) => {
    const targetStatus = newStatus || (events.find((e) => e.id === eventId)?.registration_status === 'open' ? 'closed' : 'open');
    setEvents((prev) =>
      prev.map((evt) => (evt.id === eventId ? { ...evt, registration_status: targetStatus } : evt))
    );
    const eventObj = events.find((e) => e.id === eventId);
    const label = eventObj ? eventObj.title : eventId;
    if (targetStatus === 'open') {
      addToast(`✓ Registration opened for ${label}`, 'success');
      logActivity('registration_control', 'Registration Opened', label, `Individual registration opened`, 'unlock');
    } else {
      addToast(`Registration closed for ${label}`, 'warning');
      logActivity('registration_control', 'Registration Closed', label, `Individual registration closed`, 'lock');
    }
  };

  const setEventStatus = (eventId, newStatus) => {
    setEvents((prev) =>
      prev.map((evt) => (evt.id === eventId ? { ...evt, status: newStatus } : evt))
    );
    addToast(`Event status updated to ${newStatus}`, 'info');
  };

  const duplicateEvent = (eventId) => {
    const source = events.find((e) => e.id === eventId);
    if (!source) return;
    const newId = `${source.id}-copy-${Date.now()}`;
    const duplicated = {
      ...source,
      id: newId,
      title: `${source.title} (Copy)`,
      code: `${source.code}C`,
      status: 'draft',
      registrationsCount: 0,
      checkedInCount: 0
    };
    setEvents((prev) => [duplicated, ...prev]);
    addToast(`✓ Duplicated "${source.title}" as Draft`, 'success');
  };

  const deleteEvent = (eventId) => {
    const evt = events.find((e) => e.id === eventId);
    const title = evt ? evt.title : eventId;
    setEvents((prev) => prev.filter((e) => e.id !== eventId));
    addToast(`Event "${title}" deleted`, 'warning');
    logActivity('event', 'Event Deleted', title, 'Event removed from control center', 'trash');
  };

  // Registration & Scanner Handlers
  const toggleCheckInStatus = (regId, forceStatus) => {
    let updatedReg = null;
    setRegistrations((prev) =>
      prev.map((reg) => {
        if (reg.id === regId) {
          const nextStatus = forceStatus || (reg.checkInStatus === 'checked-in' ? 'pending' : 'checked-in');
          const isCheckedIn = nextStatus === 'checked-in';
          updatedReg = {
            ...reg,
            checkInStatus: nextStatus,
            checkInTime: isCheckedIn ? new Date().toLocaleString() : null
          };
          return updatedReg;
        }
        return reg;
      })
    );

    if (updatedReg) {
      const isCheckedIn = updatedReg.checkInStatus === 'checked-in';
      // Update checkin stats in events
      setEvents((prev) =>
        prev.map((evt) => {
          if (evt.id === updatedReg.eventId) {
            const diff = isCheckedIn ? 1 : -1;
            return { ...evt, checkedInCount: Math.max(0, (evt.checkedInCount || 0) + diff) };
          }
          return evt;
        })
      );

      if (isCheckedIn) {
        addToast(`✓ ${updatedReg.participantName} (${updatedReg.id}) checked in!`, 'success');
        logActivity('checkin', 'Participant Checked In', updatedReg.id, `${updatedReg.participantName} checked in for ${updatedReg.eventName}`, 'check-circle');
      } else {
        addToast(`Marked ${updatedReg.participantName} as NOT checked in`, 'info');
      }
    }
  };

  // Schedule Handlers
  const addScheduleItem = (newItem) => {
    const item = {
      id: `sch-${Date.now()}`,
      ...newItem,
      status: 'scheduled'
    };
    setSchedule((prev) => [...prev, item]);
    addToast('✓ Schedule item added', 'success');
    logActivity('schedule', 'Schedule Added', newItem.eventName, `Scheduled at ${newItem.venue}`, 'calendar');
  };

  const deleteScheduleItem = (id) => {
    setSchedule((prev) => prev.filter((s) => s.id !== id));
    addToast('Schedule item removed', 'info');
  };

  // Gallery Handlers
  const addGalleryPhotos = (newPhotos) => {
    const formatted = newPhotos.map((p, idx) => ({
      id: `gal-${Date.now()}-${idx}`,
      title: p.title || 'Euphoria Moment',
      eventId: p.eventId || 'general',
      eventName: p.eventName || 'Festival Highlights',
      category: p.category || 'General',
      album: p.album || 'Cultural Highlights',
      year: '2026',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      image: p.image,
      thumbnail: p.image,
      status: 'published'
    }));
    setGallery((prev) => [...formatted, ...prev]);
    addToast(`✓ ${newPhotos.length} photo(s) added to Gallery`, 'success');
    logActivity('gallery', 'Photos Added', `${newPhotos.length} Photos`, 'Uploaded to gallery albums', 'image');
  };

  const deleteGalleryPhoto = (id) => {
    setGallery((prev) => prev.filter((g) => g.id !== id));
    addToast('Photo deleted from gallery', 'warning');
  };

  const toggleGalleryPhotoStatus = (id) => {
    setGallery((prev) =>
      prev.map((g) => (g.id === id ? { ...g, status: g.status === 'published' ? 'draft' : 'published' } : g))
    );
    addToast('Photo status updated', 'info');
  };

  // Venue Handlers
  const addVenue = (venueData) => {
    const newVenue = {
      id: `ven-${Date.now()}`,
      ...venueData,
      status: 'active'
    };
    setVenues((prev) => [...prev, newVenue]);
    addToast(`✓ Venue "${venueData.name}" added`, 'success');
  };

  const deleteVenue = (id) => {
    setVenues((prev) => prev.filter((v) => v.id !== id));
    addToast('Venue removed', 'warning');
  };

  // Sponsor Handlers
  const addSponsor = (sponsorData) => {
    const newSponsor = {
      id: `spon-${Date.now()}`,
      ...sponsorData,
      status: 'published'
    };
    setSponsors((prev) => [...prev, newSponsor]);
    addToast(`✓ Sponsor "${sponsorData.name}" added`, 'success');
  };

  const deleteSponsor = (id) => {
    setSponsors((prev) => prev.filter((s) => s.id !== id));
    addToast('Sponsor removed', 'warning');
  };

  const toggleSponsorStatus = (id) => {
    setSponsors((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: s.status === 'published' ? 'draft' : 'published' } : s))
    );
    addToast('Sponsor visibility toggled', 'info');
  };

  // Settings Handler
  const updateSettings = (newSettings) => {
    setSiteSettings((prev) => ({ ...prev, ...newSettings }));
    addToast('✓ Site settings saved (Local session)', 'success');
  };

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,

        isGlobalRegistrationOpen,
        setGlobalRegistration,

        events,
        addEvent,
        updateEvent,
        toggleEventRegistration,
        setEventStatus,
        duplicateEvent,
        deleteEvent,

        registrations,
        toggleCheckInStatus,

        schedule,
        addScheduleItem,
        deleteScheduleItem,

        gallery,
        addGalleryPhotos,
        deleteGalleryPhoto,
        toggleGalleryPhotoStatus,

        venues,
        addVenue,
        deleteVenue,

        sponsors,
        addSponsor,
        deleteSponsor,
        toggleSponsorStatus,

        activity,
        siteSettings,
        updateSettings,

        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
