export const DASHBOARD_STATS = {
  totalEvents: 24,
  eventsTrend: '+2 this week',
  totalRegistrations: 1248,
  registrationsTrend: '+186 today',
  checkedIn: 742,
  checkedInPct: '59.4%',
  pendingCheckIn: 506,
  pendingPct: '40.6%'
};

export const CHART_REGISTRATIONS_OVER_TIME = {
  '7d': [
    { date: 'Sep 09', count: 980 },
    { date: 'Sep 10', count: 1020 },
    { date: 'Sep 11', count: 1062 },
    { date: 'Sep 12', count: 1110 },
    { date: 'Sep 13', count: 1154 },
    { date: 'Sep 14', count: 1202 },
    { date: 'Sep 15', count: 1248 }
  ],
  '30d': [
    { date: 'Aug 17', count: 120 },
    { date: 'Aug 21', count: 240 },
    { date: 'Aug 25', count: 410 },
    { date: 'Aug 29', count: 580 },
    { date: 'Sep 02', count: 760 },
    { date: 'Sep 06', count: 910 },
    { date: 'Sep 10', count: 1020 },
    { date: 'Sep 15', count: 1248 }
  ],
  '3m': [
    { date: 'Jul 2026', count: 45 },
    { date: 'Aug 2026', count: 620 },
    { date: 'Sep 2026', count: 1248 }
  ]
};

export const CHART_CATEGORY_DISTRIBUTION = [
  { name: 'Music', count: 350, percentage: 28, color: '#D4AF64' },
  { name: 'Dance', count: 225, percentage: 18, color: '#E8C97A' },
  { name: 'Dramatics', count: 150, percentage: 12, color: '#C8A96E' },
  { name: 'Fine Arts', count: 125, percentage: 10, color: '#A8894E' },
  { name: 'Literary', count: 125, percentage: 10, color: '#88692E' },
  { name: 'Photography', count: 100, percentage: 8, color: '#68490E' },
  { name: 'Fun & Games', count: 100, percentage: 8, color: '#482900' },
  { name: 'Others', count: 73, percentage: 6, color: '#381900' }
];

export const CHART_CHECKIN_ACTIVITY = [
  { time: '08:00 AM', checkins: 42 },
  { time: '10:00 AM', checkins: 135 },
  { time: '12:00 PM', checkins: 240 },
  { time: '02:00 PM', checkins: 180 },
  { time: '04:00 PM', checkins: 105 },
  { time: '06:00 PM', checkins: 40 }
];
