import * as XLSX from 'xlsx';
import JSZip from 'jszip';

const triggerDownload = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 200);
};

/**
 * Builds a beautifully structured Excel workbook for an individual event
 * Configured with A4 Landscape Print Setup and custom column widths
 */
export const buildEventWorkbook = (event, eventRegistrations, filterOptions = {}) => {
  const { statusFilter = 'all' } = filterOptions;

  let filtered = [...eventRegistrations];
  if (statusFilter === 'checked-in') {
    filtered = filtered.filter((r) => r.checkInStatus === 'checked-in');
  } else if (statusFilter === 'pending') {
    filtered = filtered.filter((r) => r.checkInStatus !== 'checked-in');
  }

  const isTeamEvent =
    event.participation_type === 'team' || filtered.some((r) => r.participationType === 'team');

  let maxMembersCount = 0;
  if (isTeamEvent) {
    filtered.forEach((r) => {
      if (r.members && r.members.length > 1) {
        maxMembersCount = Math.max(maxMembersCount, r.members.length - 1);
      }
    });
  }

  const checkedInCount = filtered.filter((r) => r.checkInStatus === 'checked-in').length;
  const pendingCount = filtered.length - checkedInCount;
  const checkInRate = filtered.length ? ((checkedInCount / filtered.length) * 100).toFixed(1) : '0.0';

  const exportDateStr = new Date().toLocaleString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Calculate unique colleges
  const uniqueColleges = new Set(filtered.map((r) => r.college).filter(Boolean));

  // --- SHEET 1: PARTICIPANT REGISTRATIONS ---
  const sheet1Data = [];

  // 1. Header Banner
  sheet1Data.push(['★ EUPHORIA 2026 — NATIONAL ANNUAL CULTURAL FESTIVAL ★']);
  sheet1Data.push(['HOST INSTITUTION / ORGANIZER: EUPHORIA CENTRAL STEERING COMMITTEE & STUDENT AFFAIRS']);
  sheet1Data.push([
    `EVENT: ${(event.title || 'EVENT').toUpperCase()}  |  CATEGORY: ${(event.categoryLabel || event.category || 'GENERAL').toUpperCase()}  |  FORMAT: ${(event.participation_type || 'SOLO').toUpperCase()}`
  ]);
  sheet1Data.push([
    `EXPORT TIMEDATE: ${exportDateStr}  |  STATUS FILTER: ${statusFilter.toUpperCase()}  |  TOTAL ENTRIES: ${filtered.length}  |  CHECKED IN: ${checkedInCount} (${checkInRate}%)`
  ]);
  sheet1Data.push([]); // Empty spacer row

  // 2. Table Column Headers
  const baseHeaders = [
    'S.NO',
    'REGISTRATION ID',
    'PARTICIPANT / LEADER NAME',
    'COLLEGE NAME',
    'DEPARTMENT',
    'YEAR OF STUDY',
    'EMAIL ADDRESS',
    'PHONE NUMBER'
  ];

  if (isTeamEvent) {
    baseHeaders.push('TEAM NAME', 'TEAM SIZE');
  }

  baseHeaders.push('CHECK-IN STATUS', 'CHECK-IN TIME');

  if (isTeamEvent && maxMembersCount > 0) {
    for (let i = 0; i < maxMembersCount; i++) {
      const num = i + 2;
      baseHeaders.push(`MEMBER ${num} NAME`, `MEMBER ${num} EMAIL`, `MEMBER ${num} PHONE`);
    }
  }

  sheet1Data.push(baseHeaders);

  // 3. Data Rows
  if (filtered.length > 0) {
    filtered.forEach((r, idx) => {
      const row = [
        idx + 1,
        String(r.id || ''),
        String(r.participantName || ''),
        String(r.college || 'N/A'),
        String(r.department || 'N/A'),
        String(r.year || 'N/A'),
        String(r.email || ''),
        String(r.phone || '')
      ];

      if (isTeamEvent) {
        row.push(
          String(r.teamName || 'N/A'),
          Number(r.teamSize || (r.members ? r.members.length : 1))
        );
      }

      row.push(
        r.checkInStatus === 'checked-in' ? '✓ CHECKED IN' : '⏳ PENDING',
        String(r.checkInTime || '—')
      );

      if (isTeamEvent && maxMembersCount > 0) {
        const additional = r.members ? r.members.slice(1) : [];
        for (let i = 0; i < maxMembersCount; i++) {
          const m = additional[i];
          row.push(
            m ? String(m.name || '') : '—',
            m ? String(m.email || '') : '—',
            m ? String(m.phone || '') : '—'
          );
        }
      }

      sheet1Data.push(row);
    });
  } else {
    sheet1Data.push([
      '—',
      'NO REGISTRATIONS FOUND',
      'No data matching current filter',
      '—',
      '—',
      '—',
      '—',
      '—',
      '—',
      '—'
    ]);
  }

  // 4. Summary metrics footer block
  sheet1Data.push([]);
  sheet1Data.push(['══════ SUMMARY REPORT METRICS ══════']);
  sheet1Data.push(['Total Registrations Recorded', filtered.length]);
  sheet1Data.push(['Verified Checked-In Attendees', checkedInCount]);
  sheet1Data.push(['Pending Check-In Attendees', pendingCount]);
  sheet1Data.push(['Attendance Check-In Rate', `${checkInRate}%`]);
  sheet1Data.push(['Total Participating Colleges', uniqueColleges.size]);
  sheet1Data.push(['Venue Location', event.venue || 'Main Campus Stage']);
  sheet1Data.push(['Event Date & Time', `${event.date || 'TBA'} at ${event.time || 'TBA'}`]);

  const ws1 = XLSX.utils.aoa_to_sheet(sheet1Data);

  // Define column widths for Sheet 1
  const colWidths = [
    { wch: 8 },  // S.NO
    { wch: 22 }, // REG ID
    { wch: 28 }, // PARTICIPANT NAME
    { wch: 34 }, // COLLEGE NAME
    { wch: 22 }, // DEPARTMENT
    { wch: 14 }, // YEAR
    { wch: 30 }, // EMAIL
    { wch: 18 }  // PHONE
  ];

  if (isTeamEvent) {
    colWidths.push({ wch: 24 }, { wch: 12 });
  }

  colWidths.push({ wch: 18 }, { wch: 22 });

  if (isTeamEvent && maxMembersCount > 0) {
    for (let i = 0; i < maxMembersCount; i++) {
      colWidths.push({ wch: 24 }, { wch: 28 }, { wch: 18 });
    }
  }

  ws1['!cols'] = colWidths;

  // Set merges for header rows
  const headerColsCount = baseHeaders.length - 1;
  ws1['!merges'] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: Math.max(headerColsCount, 7) } },
    { s: { r: 1, c: 0 }, e: { r: 1, c: Math.max(headerColsCount, 7) } },
    { s: { r: 2, c: 0 }, e: { r: 2, c: Math.max(headerColsCount, 7) } },
    { s: { r: 3, c: 0 }, e: { r: 3, c: Math.max(headerColsCount, 7) } }
  ];

  // Set row heights
  ws1['!rows'] = [
    { hpt: 28 }, // Title
    { hpt: 22 }, // College Header
    { hpt: 24 }, // Event Subhead
    { hpt: 22 }, // Metadata
    { hpt: 12 }, // Spacer
    { hpt: 26 }  // Table Headers
  ];

  // Configure A4 Print Page Setup
  ws1['!pageSetup'] = {
    paperSize: 9, // 9 = A4 standard
    orientation: 'landscape',
    fitToWidth: 1,
    fitToHeight: 0,
    scale: 85
  };
  ws1['!margins'] = {
    left: 0.35,
    right: 0.35,
    top: 0.5,
    bottom: 0.5,
    header: 0.2,
    footer: 0.2
  };

  // --- SHEET 2: COLLEGE PARTICIPATION BREAKDOWN ---
  const collegeCounts = {};
  filtered.forEach((r) => {
    const colName = r.college ? r.college.trim() : 'Unknown / Independent';
    if (!collegeCounts[colName]) {
      collegeCounts[colName] = { total: 0, checkedIn: 0, pending: 0, participants: [] };
    }
    collegeCounts[colName].total += 1;
    if (r.checkInStatus === 'checked-in') {
      collegeCounts[colName].checkedIn += 1;
    } else {
      collegeCounts[colName].pending += 1;
    }
    collegeCounts[colName].participants.push(r.participantName);
  });

  const sortedColleges = Object.entries(collegeCounts).sort((a, b) => b[1].total - a[1].total);

  const sheet2Data = [
    ['★ EUPHORIA 2026 — COLLEGE PARTICIPATION BREAKDOWN ★'],
    [`EVENT: ${(event.title || 'EVENT').toUpperCase()}  |  TOTAL REPRESENTED COLLEGES: ${sortedColleges.length}`],
    [],
    ['RANK', 'COLLEGE / INSTITUTION NAME', 'TOTAL REGISTRATIONS', 'CHECKED IN', 'PENDING', 'CHECK-IN RATE %', 'REGISTERED PARTICIPANTS']
  ];

  sortedColleges.forEach(([cName, data], idx) => {
    const rate = data.total ? ((data.checkedIn / data.total) * 100).toFixed(1) : '0.0';
    sheet2Data.push([
      idx + 1,
      cName,
      data.total,
      data.checkedIn,
      data.pending,
      `${rate}%`,
      data.participants.slice(0, 5).join(', ') + (data.participants.length > 5 ? ` +${data.participants.length - 5} more` : '')
    ]);
  });

  const ws2 = XLSX.utils.aoa_to_sheet(sheet2Data);
  ws2['!cols'] = [
    { wch: 8 },
    { wch: 38 },
    { wch: 22 },
    { wch: 16 },
    { wch: 16 },
    { wch: 18 },
    { wch: 45 }
  ];
  ws2['!merges'] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 6 } },
    { s: { r: 1, c: 0 }, e: { r: 1, c: 6 } }
  ];
  ws2['!pageSetup'] = {
    paperSize: 9,
    orientation: 'landscape',
    fitToWidth: 1,
    fitToHeight: 0
  };

  // --- SHEET 3: EVENT SPECIFICATIONS & GUIDELINES ---
  const sheet3Data = [
    ['★ EUPHORIA 2026 — EVENT DOSSIER & SPECIFICATIONS ★'],
    [`EVENT: ${(event.title || 'EVENT').toUpperCase()}`],
    [],
    ['PROPERTY', 'DETAILS'],
    ['Event Title', event.title || 'N/A'],
    ['Category', event.categoryLabel || event.category || 'N/A'],
    ['Participation Type', (event.participation_type || 'solo').toUpperCase()],
    ['Event Date', event.date || 'TBA'],
    ['Event Time', event.time || 'TBA'],
    ['Assigned Venue', event.venue || 'TBA'],
    ['Prize Pool / Trophy', event.prize || event.prizePool || 'Certificate & Trophy'],
    ['Registration Fee', event.fee || event.registrationFee || 'Free Entry'],
    ['Event Coordinator', event.coordinator || event.contactPerson || 'Festival Admin'],
    ['Coordinator Contact', event.coordinatorContact || event.contactPhone || '+91 98765 43210'],
    ['Description', event.description || 'N/A'],
    ['Rules & Guidelines', event.rules || event.guidelines || 'Standard Euphoria 2026 Festival Guidelines apply.']
  ];

  const ws3 = XLSX.utils.aoa_to_sheet(sheet3Data);
  ws3['!cols'] = [{ wch: 24 }, { wch: 60 }];
  ws3['!merges'] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 1 } },
    { s: { r: 1, c: 0 }, e: { r: 1, c: 1 } }
  ];
  ws3['!pageSetup'] = {
    paperSize: 9,
    orientation: 'portrait',
    fitToWidth: 1,
    fitToHeight: 0
  };

  // Assemble Workbook
  const workbook = XLSX.utils.book_new();
  const safeSheetName = (event.title || 'Registrations').replace(/[^a-zA-Z0-9 ]/g, '').slice(0, 28);
  XLSX.utils.book_append_sheet(workbook, ws1, `${safeSheetName}`);
  XLSX.utils.book_append_sheet(workbook, ws2, 'Colleges Breakdown');
  XLSX.utils.book_append_sheet(workbook, ws3, 'Event Specifications');

  const sanitizedTitle = (event.title || 'Event')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  const filename = `EUPHORIA-2026-${sanitizedTitle}-Registrations.xlsx`;

  return { workbook, filename };
};

/**
 * Builds a Consolidated Master Workbook with all events & all registrations
 * Configured with A4 Landscape Print Setup
 */
export const buildMasterWorkbook = (events, registrations, filterOptions = {}) => {
  const { statusFilter = 'all' } = filterOptions;

  let filtered = [...registrations];
  if (statusFilter === 'checked-in') {
    filtered = filtered.filter((r) => r.checkInStatus === 'checked-in');
  } else if (statusFilter === 'pending') {
    filtered = filtered.filter((r) => r.checkInStatus !== 'checked-in');
  }

  const exportDateStr = new Date().toLocaleString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const checkedInCount = filtered.filter((r) => r.checkInStatus === 'checked-in').length;
  const checkInRate = filtered.length ? ((checkedInCount / filtered.length) * 100).toFixed(1) : '0.0';

  // --- SHEET 1: ALL REGISTRATIONS MASTER ---
  const sheet1Data = [
    ['★ EUPHORIA 2026 — MASTER CONSOLIDATED REGISTRATIONS LEDGER ★'],
    ['HOST INSTITUTION / ORGANIZER: EUPHORIA CENTRAL STEERING COMMITTEE & STUDENT AFFAIRS'],
    [
      `EXPORT TIMEDATE: ${exportDateStr}  |  TOTAL EVENTS: ${events.length}  |  TOTAL REGISTRATIONS: ${filtered.length}  |  CHECKED IN: ${checkedInCount} (${checkInRate}%)`
    ],
    [],
    [
      'S.NO',
      'REGISTRATION ID',
      'EVENT NAME',
      'CATEGORY',
      'PARTICIPANT NAME',
      'COLLEGE NAME',
      'DEPARTMENT',
      'YEAR',
      'EMAIL ADDRESS',
      'PHONE NUMBER',
      'TYPE',
      'TEAM NAME',
      'TEAM SIZE',
      'CHECK-IN STATUS',
      'CHECK-IN TIME'
    ]
  ];

  filtered.forEach((r, idx) => {
    const matchedEvent = events.find((e) => e.id === r.eventId);
    sheet1Data.push([
      idx + 1,
      String(r.id || ''),
      String(r.eventName || (matchedEvent ? matchedEvent.title : 'Event')),
      String(matchedEvent ? matchedEvent.categoryLabel || matchedEvent.category : 'General'),
      String(r.participantName || ''),
      String(r.college || 'N/A'),
      String(r.department || 'N/A'),
      String(r.year || 'N/A'),
      String(r.email || ''),
      String(r.phone || ''),
      String(r.participationType || (matchedEvent ? matchedEvent.participation_type : 'solo')).toUpperCase(),
      String(r.teamName || 'Solo Entry'),
      Number(r.teamSize || (r.members ? r.members.length : 1)),
      r.checkInStatus === 'checked-in' ? '✓ CHECKED IN' : '⏳ PENDING',
      String(r.checkInTime || '—')
    ]);
  });

  const ws1 = XLSX.utils.aoa_to_sheet(sheet1Data);
  ws1['!cols'] = [
    { wch: 8 },  // S.NO
    { wch: 22 }, // REG ID
    { wch: 26 }, // EVENT NAME
    { wch: 18 }, // CATEGORY
    { wch: 26 }, // PARTICIPANT NAME
    { wch: 34 }, // COLLEGE NAME
    { wch: 20 }, // DEPARTMENT
    { wch: 12 }, // YEAR
    { wch: 30 }, // EMAIL
    { wch: 18 }, // PHONE
    { wch: 12 }, // TYPE
    { wch: 22 }, // TEAM NAME
    { wch: 12 }, // TEAM SIZE
    { wch: 18 }, // CHECK-IN STATUS
    { wch: 22 }  // CHECK-IN TIME
  ];
  ws1['!merges'] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 14 } },
    { s: { r: 1, c: 0 }, e: { r: 1, c: 14 } },
    { s: { r: 2, c: 0 }, e: { r: 2, c: 14 } }
  ];
  ws1['!pageSetup'] = {
    paperSize: 9,
    orientation: 'landscape',
    fitToWidth: 1,
    fitToHeight: 0
  };

  // --- SHEET 2: EVENTS SUMMARY OVERVIEW ---
  const sheet2Data = [
    ['★ EUPHORIA 2026 — EVENTS OVERVIEW & CAPACITY AUDIT ★'],
    [`GENERATED ON: ${exportDateStr}`],
    [],
    [
      'S.NO',
      'EVENT ID',
      'EVENT TITLE',
      'CATEGORY',
      'FORMAT',
      'VENUE',
      'EVENT DATE',
      'TIME',
      'TOTAL REGISTRATIONS',
      'CHECKED IN',
      'PENDING',
      'CHECK-IN RATE %',
      'STATUS'
    ]
  ];

  events.forEach((evt, idx) => {
    const evtRegs = filtered.filter((r) => r.eventId === evt.id);
    const evtCheckedIn = evtRegs.filter((r) => r.checkInStatus === 'checked-in').length;
    const evtPending = evtRegs.length - evtCheckedIn;
    const evtRate = evtRegs.length ? ((evtCheckedIn / evtRegs.length) * 100).toFixed(1) : '0.0';

    sheet2Data.push([
      idx + 1,
      evt.id,
      evt.title,
      evt.categoryLabel || evt.category,
      (evt.participation_type || 'solo').toUpperCase(),
      evt.venue || 'TBA',
      evt.date || 'TBA',
      evt.time || 'TBA',
      evtRegs.length,
      evtCheckedIn,
      evtPending,
      `${evtRate}%`,
      (evt.status || 'published').toUpperCase()
    ]);
  });

  const ws2 = XLSX.utils.aoa_to_sheet(sheet2Data);
  ws2['!cols'] = [
    { wch: 8 },
    { wch: 20 },
    { wch: 28 },
    { wch: 18 },
    { wch: 14 },
    { wch: 24 },
    { wch: 16 },
    { wch: 14 },
    { wch: 22 },
    { wch: 16 },
    { wch: 16 },
    { wch: 18 },
    { wch: 14 }
  ];
  ws2['!merges'] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 12 } },
    { s: { r: 1, c: 0 }, e: { r: 1, c: 12 } }
  ];
  ws2['!pageSetup'] = {
    paperSize: 9,
    orientation: 'landscape',
    fitToWidth: 1,
    fitToHeight: 0
  };

  // --- SHEET 3: INSTITUTIONS & COLLEGES LEADERBOARD ---
  const collegeMap = {};
  filtered.forEach((r) => {
    const colName = r.college ? r.college.trim() : 'Unknown / Independent';
    if (!collegeMap[colName]) {
      collegeMap[colName] = { total: 0, checkedIn: 0, pending: 0, events: new Set() };
    }
    collegeMap[colName].total += 1;
    if (r.checkInStatus === 'checked-in') collegeMap[colName].checkedIn += 1;
    else collegeMap[colName].pending += 1;
    if (r.eventName) collegeMap[colName].events.add(r.eventName);
  });

  const sortedColleges = Object.entries(collegeMap).sort((a, b) => b[1].total - a[1].total);

  const sheet3Data = [
    ['★ EUPHORIA 2026 — INSTITUTION & COLLEGE PARTICIPATION LEADERBOARD ★'],
    [`TOTAL REGISTERED COLLEGES: ${sortedColleges.length}  |  TOTAL PARTICIPANTS: ${filtered.length}`],
    [],
    [
      'RANK',
      'COLLEGE / UNIVERSITY NAME',
      'TOTAL PARTICIPANTS',
      'CHECKED IN',
      'PENDING',
      'CHECK-IN RATE %',
      'EVENTS ENTERED COUNT',
      'REGISTERED EVENTS'
    ]
  ];

  sortedColleges.forEach(([cName, stats], idx) => {
    const rate = stats.total ? ((stats.checkedIn / stats.total) * 100).toFixed(1) : '0.0';
    sheet3Data.push([
      idx + 1,
      cName,
      stats.total,
      stats.checkedIn,
      stats.pending,
      `${rate}%`,
      stats.events.size,
      Array.from(stats.events).slice(0, 4).join(', ') + (stats.events.size > 4 ? ` +${stats.events.size - 4} more` : '')
    ]);
  });

  const ws3 = XLSX.utils.aoa_to_sheet(sheet3Data);
  ws3['!cols'] = [
    { wch: 8 },
    { wch: 38 },
    { wch: 22 },
    { wch: 16 },
    { wch: 16 },
    { wch: 18 },
    { wch: 22 },
    { wch: 45 }
  ];
  ws3['!merges'] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 7 } },
    { s: { r: 1, c: 0 }, e: { r: 1, c: 7 } }
  ];
  ws3['!pageSetup'] = {
    paperSize: 9,
    orientation: 'landscape',
    fitToWidth: 1,
    fitToHeight: 0
  };

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, ws1, 'Master Registrations');
  XLSX.utils.book_append_sheet(workbook, ws2, 'Events Summary');
  XLSX.utils.book_append_sheet(workbook, ws3, 'College Leaderboard');

  const filename = 'EUPHORIA-2026-MASTER-CONSOLIDATED-LEDGER.xlsx';
  return { workbook, filename };
};

/**
 * Export single event XLSX
 */
export const exportEventRegistrationsXLSX = (event, eventRegistrations, filterOptions = {}) => {
  const { workbook, filename } = buildEventWorkbook(event, eventRegistrations, filterOptions);
  const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
  });
  triggerDownload(blob, filename);
};

/**
 * Export Master Consolidated XLSX
 */
export const exportMasterRegistrationsXLSX = (events, registrations, filterOptions = {}) => {
  const { workbook, filename } = buildMasterWorkbook(events, registrations, filterOptions);
  const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
  });
  triggerDownload(blob, filename);
};

/**
 * Generates an ultra-crisp, colorful, exact A4 printable ledger document (Landscape)
 * with College Name header, Event Name subhead, high-contrast badges, zebra styling,
 * metrics summary, and official verification signature blocks.
 */
export const printEventA4Dossier = (event, eventRegistrations, filterOptions = {}) => {
  const { statusFilter = 'all' } = filterOptions;

  let filtered = [...eventRegistrations];
  if (statusFilter === 'checked-in') {
    filtered = filtered.filter((r) => r.checkInStatus === 'checked-in');
  } else if (statusFilter === 'pending') {
    filtered = filtered.filter((r) => r.checkInStatus !== 'checked-in');
  }

  const checkedInCount = filtered.filter((r) => r.checkInStatus === 'checked-in').length;
  const pendingCount = filtered.length - checkedInCount;
  const checkInRate = filtered.length ? ((checkedInCount / filtered.length) * 100).toFixed(1) : '0.0';
  const isTeam = event.participation_type === 'team';

  const exportDateStr = new Date().toLocaleString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const printWindow = window.open('', '_blank', 'width=1200,height=850');
  if (!printWindow) {
    alert('Please allow pop-ups in your browser to print the A4 Dossier.');
    return;
  }

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>EUPHORIA 2026 - ${event.title} - A4 Official Dossier</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Cinzel:wght@700&family=JetBrains+Mono:wght@500;700&display=swap');
    
    @page {
      size: A4 landscape;
      margin: 8mm 8mm 10mm 8mm;
    }
    
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      margin: 0;
      padding: 12px;
      color: #0f172a;
      background: #ffffff;
      font-size: 11px;
      line-height: 1.35;
    }

    /* Print Control Bar (Hidden when printing) */
    .no-print-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #0f172a;
      color: #f8fafc;
      padding: 10px 18px;
      border-radius: 8px;
      margin-bottom: 16px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    .print-btn {
      background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
      color: #ffffff;
      border: none;
      padding: 8px 18px;
      font-weight: 700;
      font-size: 12px;
      border-radius: 6px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      box-shadow: 0 2px 6px rgba(180,83,9,0.3);
    }
    .print-btn:hover {
      background: #b45309;
    }

    @media print {
      .no-print-bar {
        display: none !important;
      }
      body {
        padding: 0;
      }
      .page-break {
        page-break-after: always;
      }
    }

    /* OFFICIAL COLORFUL HEADER */
    .dossier-header {
      border: 2px solid #b45309;
      border-radius: 8px;
      background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
      padding: 12px 16px;
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-left: 8px solid #b45309;
    }
    .header-main {
      flex: 1;
    }
    .fest-title {
      font-family: 'Cinzel', serif;
      font-size: 18px;
      font-weight: 700;
      letter-spacing: 1px;
      color: #78350f;
      margin: 0;
      text-transform: uppercase;
    }
    .college-subhead {
      font-size: 11px;
      font-weight: 700;
      color: #92400e;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-top: 2px;
    }
    .event-banner {
      display: inline-block;
      margin-top: 5px;
      background: #78350f;
      color: #fef3c7;
      padding: 3px 10px;
      border-radius: 4px;
      font-weight: 700;
      font-size: 12px;
      letter-spacing: 0.5px;
    }

    /* KPI STATS BAR */
    .kpi-container {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      margin-bottom: 12px;
    }
    .kpi-card {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 6px 10px;
      text-align: center;
    }
    .kpi-label {
      font-size: 9px;
      font-weight: 700;
      text-transform: uppercase;
      color: #64748b;
      letter-spacing: 0.5px;
    }
    .kpi-val {
      font-size: 16px;
      font-weight: 800;
      font-family: 'JetBrains Mono', monospace;
      color: #0f172a;
      margin-top: 1px;
    }
    .kpi-val.green { color: #16a34a; }
    .kpi-val.gold { color: #b45309; }

    /* COLORFUL STRUCTURED TABLE */
    table.a4-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 10px;
      margin-bottom: 14px;
    }
    table.a4-table th {
      background: #78350f !important;
      color: #ffffff !important;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 9px;
      letter-spacing: 0.5px;
      padding: 6px 7px;
      text-align: left;
      border: 1px solid #78350f;
    }
    table.a4-table td {
      padding: 5.5px 7px;
      border: 1px solid #e2e8f0;
      vertical-align: middle;
    }
    table.a4-table tbody tr:nth-child(even) {
      background-color: #f8fafc;
    }
    table.a4-table tbody tr:hover {
      background-color: #fef3c7;
    }

    /* BADGES */
    .badge {
      display: inline-block;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.3px;
      text-transform: uppercase;
      font-family: 'JetBrains Mono', monospace;
    }
    .badge-checked {
      background: #dcfce7 !important;
      color: #15803d !important;
      border: 1px solid #86efac;
    }
    .badge-pending {
      background: #fef3c7 !important;
      color: #b45309 !important;
      border: 1px solid #fde68a;
    }
    .badge-gold {
      background: #eff6ff !important;
      color: #1d4ed8 !important;
      border: 1px solid #bfdbfe;
    }

    .reg-id {
      font-family: 'JetBrains Mono', monospace;
      font-weight: 700;
      color: #b45309;
    }
    .college-col {
      font-weight: 600;
      color: #1e293b;
    }

    /* SIGNATURE BLOCK */
    .sign-container {
      margin-top: 14px;
      border-top: 1.5px dashed #cbd5e1;
      padding-top: 10px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      font-size: 10px;
    }
    .sign-box {
      border: 1px solid #e2e8f0;
      background: #f8fafc;
      border-radius: 6px;
      padding: 10px 8px 6px 8px;
      text-align: center;
    }
    .sign-line {
      border-bottom: 1px solid #94a3b8;
      height: 24px;
      margin-bottom: 4px;
    }
    .sign-label {
      font-weight: 700;
      color: #475569;
      font-size: 9px;
      text-transform: uppercase;
    }
  </style>
</head>
<body>

  <!-- Top Bar for Browser Actions -->
  <div class="no-print-bar">
    <div>
      <strong style="font-size: 14px;">🖨️ A4 Print & PDF Preview</strong>
      <span style="opacity: 0.7; font-size: 12px; margin-left: 8px;">— Set destination to "Save as PDF" or select your printer</span>
    </div>
    <div style="display: flex; gap: 8px;">
      <button class="print-btn" onclick="window.print()">Print Document (Ctrl+P)</button>
    </div>
  </div>

  <!-- Header Banner -->
  <div class="dossier-header">
    <div class="header-main">
      <h1 class="fest-title">★ EUPHORIA 2026 — NATIONAL CULTURAL FESTIVAL ★</h1>
      <div class="college-subhead">CENTRAL STEERING COMMITTEE & STUDENT AFFAIRS • OFFICIAL EVENT DOSSIER</div>
      <div class="event-banner">
        EVENT: ${(event.title || 'EVENT').toUpperCase()} [${(event.categoryLabel || event.category || 'GENERAL').toUpperCase()} | ${(event.participation_type || 'SOLO').toUpperCase()}]
      </div>
    </div>
    <div style="text-align: right; font-size: 10px; color: #78350f;">
      <div><strong>Venue:</strong> ${event.venue || 'Main Auditorium'}</div>
      <div><strong>Date:</strong> ${event.date || 'TBA'} | ${event.time || 'TBA'}</div>
      <div><strong>Generated:</strong> ${exportDateStr}</div>
    </div>
  </div>

  <!-- Key Metrics Summary -->
  <div class="kpi-container">
    <div class="kpi-card">
      <div class="kpi-label">Total Registrations</div>
      <div class="kpi-val gold">${filtered.length}</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Checked In</div>
      <div class="kpi-val green">${checkedInCount}</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Pending Check-In</div>
      <div class="kpi-val">${pendingCount}</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Attendance Rate</div>
      <div class="kpi-val green">${checkInRate}%</div>
    </div>
  </div>

  <!-- Main Structured Table -->
  <table class="a4-table">
    <thead>
      <tr>
        <th style="width: 28px; text-align: center;">#</th>
        <th style="width: 95px;">Reg ID</th>
        <th>Participant / Leader</th>
        <th>College / Institution</th>
        <th>Department & Year</th>
        <th>Contact (Email & Phone)</th>
        ${isTeam ? '<th>Team Name (Size)</th>' : ''}
        <th style="width: 85px; text-align: center;">Status</th>
        <th style="width: 85px;">Check-in Time</th>
        <th style="width: 75px; text-align: center;">Signature</th>
      </tr>
    </thead>
    <tbody>
      ${
        filtered.length > 0
          ? filtered
              .map(
                (r, idx) => `
        <tr>
          <td style="text-align: center; font-weight: 700; color: #64748b;">${idx + 1}</td>
          <td class="reg-id">${r.id}</td>
          <td><strong>${r.participantName}</strong></td>
          <td class="college-col">${r.college || 'N/A'}</td>
          <td>${r.department || '—'} <span style="color:#64748b;">(${r.year || '—'})</span></td>
          <td>
            <div>${r.email}</div>
            <div style="color: #64748b; font-family: 'JetBrains Mono', monospace; font-size: 9px;">${r.phone}</div>
          </td>
          ${
            isTeam
              ? `<td><strong>${r.teamName || 'Team'}</strong> <span style="color:#64748b;">(Qty: ${r.teamSize || 1})</span></td>`
              : ''
          }
          <td style="text-align: center;">
            <span class="badge ${r.checkInStatus === 'checked-in' ? 'badge-checked' : 'badge-pending'}">
              ${r.checkInStatus === 'checked-in' ? '✓ Checked' : '⏳ Pending'}
            </span>
          </td>
          <td style="font-size: 9px; color: #475569;">${r.checkInTime || '—'}</td>
          <td style="border-bottom: 1px dotted #94a3b8;"></td>
        </tr>
      `
              )
              .join('')
          : `<tr><td colspan="${isTeam ? 10 : 9}" style="text-align:center; padding: 20px; color:#94a3b8;">No registrations recorded under current filter.</td></tr>`
      }
    </tbody>
  </table>

  <!-- Official Sign-off Block -->
  <div class="sign-container">
    <div class="sign-box">
      <div class="sign-line"></div>
      <div class="sign-label">Event Student Coordinator</div>
    </div>
    <div class="sign-box">
      <div class="sign-line"></div>
      <div class="sign-label">Faculty In-Charge</div>
    </div>
    <div class="sign-box">
      <div class="sign-line"></div>
      <div class="sign-label">Desk Verification Officer</div>
    </div>
    <div class="sign-box">
      <div class="sign-line"></div>
      <div class="sign-label">Official Fest Seal & Date</div>
    </div>
  </div>

  <script>
    window.addEventListener('load', () => {
      // Auto open print dialog after styles render
      setTimeout(() => {
        window.print();
      }, 500);
    });
  </script>
</body>
</html>
  `;

  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
};

/**
 * Generates an ultra-crisp, colorful, exact A4 printable Master Ledger document (Landscape)
 */
export const printMasterA4Dossier = (events, registrations, filterOptions = {}) => {
  const { statusFilter = 'all' } = filterOptions;

  let filtered = [...registrations];
  if (statusFilter === 'checked-in') {
    filtered = filtered.filter((r) => r.checkInStatus === 'checked-in');
  } else if (statusFilter === 'pending') {
    filtered = filtered.filter((r) => r.checkInStatus !== 'checked-in');
  }

  const checkedInCount = filtered.filter((r) => r.checkInStatus === 'checked-in').length;
  const pendingCount = filtered.length - checkedInCount;
  const checkInRate = filtered.length ? ((checkedInCount / filtered.length) * 100).toFixed(1) : '0.0';

  const exportDateStr = new Date().toLocaleString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const printWindow = window.open('', '_blank', 'width=1200,height=850');
  if (!printWindow) {
    alert('Please allow pop-ups in your browser to print the A4 Dossier.');
    return;
  }

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>EUPHORIA 2026 - Master Consolidated Ledger - A4 Print</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Cinzel:wght@700&family=JetBrains+Mono:wght@500;700&display=swap');
    
    @page {
      size: A4 landscape;
      margin: 8mm 8mm 10mm 8mm;
    }
    
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      margin: 0;
      padding: 12px;
      color: #0f172a;
      background: #ffffff;
      font-size: 11px;
      line-height: 1.35;
    }

    .no-print-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #0f172a;
      color: #f8fafc;
      padding: 10px 18px;
      border-radius: 8px;
      margin-bottom: 16px;
    }
    .print-btn {
      background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
      color: #ffffff;
      border: none;
      padding: 8px 18px;
      font-weight: 700;
      font-size: 12px;
      border-radius: 6px;
      cursor: pointer;
    }

    @media print {
      .no-print-bar { display: none !important; }
      body { padding: 0; }
    }

    .dossier-header {
      border: 2px solid #b45309;
      border-radius: 8px;
      background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
      padding: 12px 16px;
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-left: 8px solid #b45309;
    }
    .fest-title {
      font-family: 'Cinzel', serif;
      font-size: 18px;
      font-weight: 700;
      color: #78350f;
      margin: 0;
    }
    .college-subhead {
      font-size: 11px;
      font-weight: 700;
      color: #92400e;
      text-transform: uppercase;
      margin-top: 2px;
    }

    .kpi-container {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      margin-bottom: 12px;
    }
    .kpi-card {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 6px 10px;
      text-align: center;
    }
    .kpi-label {
      font-size: 9px;
      font-weight: 700;
      text-transform: uppercase;
      color: #64748b;
    }
    .kpi-val {
      font-size: 16px;
      font-weight: 800;
      font-family: 'JetBrains Mono', monospace;
    }

    table.a4-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 10px;
      margin-bottom: 14px;
    }
    table.a4-table th {
      background: #78350f !important;
      color: #ffffff !important;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 9px;
      padding: 6px 7px;
      text-align: left;
      border: 1px solid #78350f;
    }
    table.a4-table td {
      padding: 5px 7px;
      border: 1px solid #e2e8f0;
      vertical-align: middle;
    }
    table.a4-table tbody tr:nth-child(even) {
      background-color: #f8fafc;
    }

    .badge {
      display: inline-block;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 9px;
      font-weight: 700;
      font-family: 'JetBrains Mono', monospace;
    }
    .badge-checked { background: #dcfce7 !important; color: #15803d !important; }
    .badge-pending { background: #fef3c7 !important; color: #b45309 !important; }

    .reg-id { font-family: 'JetBrains Mono', monospace; font-weight: 700; color: #b45309; }
    .college-col { font-weight: 600; color: #1e293b; }
  </style>
</head>
<body>
  <div class="no-print-bar">
    <div>
      <strong style="font-size: 14px;">🖨️ Master Dossier A4 Print & PDF Preview</strong>
      <span style="opacity: 0.7; font-size: 12px; margin-left: 8px;">— Consolidated Festival Ledger</span>
    </div>
    <button class="print-btn" onclick="window.print()">Print Master Ledger (Ctrl+P)</button>
  </div>

  <div class="dossier-header">
    <div>
      <h1 class="fest-title">★ EUPHORIA 2026 — MASTER CONSOLIDATED LEDGER ★</h1>
      <div class="college-subhead">CENTRAL STEERING COMMITTEE & STUDENT AFFAIRS • ALL EVENTS AUDIT</div>
    </div>
    <div style="text-align: right; font-size: 10px; color: #78350f;">
      <div><strong>Total Events:</strong> ${events.length}</div>
      <div><strong>Generated:</strong> ${exportDateStr}</div>
    </div>
  </div>

  <div class="kpi-container">
    <div class="kpi-card">
      <div class="kpi-label">Total Entries</div>
      <div class="kpi-val" style="color:#b45309;">${filtered.length}</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Total Checked In</div>
      <div class="kpi-val" style="color:#16a34a;">${checkedInCount}</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Pending Verification</div>
      <div class="kpi-val">${pendingCount}</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Overall Turnout Rate</div>
      <div class="kpi-val" style="color:#16a34a;">${checkInRate}%</div>
    </div>
  </div>

  <table class="a4-table">
    <thead>
      <tr>
        <th style="width: 25px; text-align: center;">#</th>
        <th style="width: 95px;">Reg ID</th>
        <th>Event Title</th>
        <th>Participant Name</th>
        <th>College / Institution</th>
        <th>Dept & Year</th>
        <th>Contact Email</th>
        <th>Phone</th>
        <th style="width: 75px; text-align: center;">Status</th>
      </tr>
    </thead>
    <tbody>
      ${filtered
        .map(
          (r, idx) => `
        <tr>
          <td style="text-align: center; color: #64748b;">${idx + 1}</td>
          <td class="reg-id">${r.id}</td>
          <td><strong>${r.eventName || 'Event'}</strong></td>
          <td><strong>${r.participantName}</strong></td>
          <td class="college-col">${r.college || 'N/A'}</td>
          <td>${r.department || '—'} (${r.year || '—'})</td>
          <td>${r.email}</td>
          <td style="font-family: 'JetBrains Mono', monospace; font-size: 9px;">${r.phone}</td>
          <td style="text-align: center;">
            <span class="badge ${r.checkInStatus === 'checked-in' ? 'badge-checked' : 'badge-pending'}">
              ${r.checkInStatus === 'checked-in' ? '✓ Checked' : '⏳ Pending'}
            </span>
          </td>
        </tr>
      `
        )
        .join('')}
    </tbody>
  </table>

  <script>
    window.addEventListener('load', () => {
      setTimeout(() => { window.print(); }, 500);
    });
  </script>
</body>
</html>
  `;

  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
};

/**
 * Export all events in a single, high-speed, well-structured ZIP archive with Master Ledger
 */
export const exportAllEventsZIP = async (events, registrations, filterOptions = {}, onProgress = null) => {
  const zip = new JSZip();
  const folder = zip.folder('EUPHORIA_2026_EVENT_SPREADSHEETS');

  const totalSteps = events.length + 1;
  let currentStep = 0;

  // 1. Add Master Consolidated Sheet
  if (onProgress) {
    onProgress({
      current: 1,
      total: totalSteps,
      status: 'Building Master Consolidated Ledger...',
      percent: Math.round((1 / totalSteps) * 100)
    });
  }

  const { workbook: masterWb, filename: masterFilename } = buildMasterWorkbook(
    events,
    registrations,
    filterOptions
  );
  const masterBuffer = XLSX.write(masterWb, { bookType: 'xlsx', type: 'array' });
  zip.file(`00-MASTER-${masterFilename}`, new Uint8Array(masterBuffer), { binary: true });
  currentStep++;

  // 2. Add Individual Event Workbooks
  for (let i = 0; i < events.length; i++) {
    const evt = events[i];
    currentStep++;

    if (onProgress) {
      onProgress({
        current: currentStep,
        total: totalSteps,
        status: `Packaging ${evt.title || 'Event'} (${i + 1}/${events.length})...`,
        percent: Math.round((currentStep / totalSteps) * 100)
      });
    }

    const eventRegs = registrations.filter((r) => r.eventId === evt.id);
    const { workbook, filename } = buildEventWorkbook(evt, eventRegs, filterOptions);
    const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    const prefixNum = String(i + 1).padStart(2, '0');
    const categoryPrefix = (evt.category || 'EVENT').toUpperCase();
    const cleanFilename = `${prefixNum}_${categoryPrefix}_${filename}`;

    folder.file(cleanFilename, new Uint8Array(buffer), { binary: true });
  }

  if (onProgress) {
    onProgress({
      current: totalSteps,
      total: totalSteps,
      status: 'Compressing and finalizing ZIP archive...',
      percent: 98
    });
  }

  const content = await zip.generateAsync(
    {
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 }
    },
    (metadata) => {
      if (onProgress) {
        onProgress({
          current: totalSteps,
          total: totalSteps,
          status: `Compressing files (${Math.round(metadata.percent)}%)...`,
          percent: Math.min(99, Math.round(metadata.percent))
        });
      }
    }
  );

  const timestamp = new Date().toISOString().slice(0, 10);
  triggerDownload(content, `EUPHORIA-2026-ALL-EVENT-SPREADSHEETS-${timestamp}.zip`);

  if (onProgress) {
    onProgress({
      current: totalSteps,
      total: totalSteps,
      status: 'Export Complete!',
      percent: 100
    });
  }
};
