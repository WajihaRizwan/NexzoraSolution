const iconPaths: Record<string, React.ReactNode> = {
  design: <><rect x="3" y="4" width="18" height="16" rx="3" /><path d="M8 9h8M8 13h4M17 16l2 2" /></>,
  web: <><rect x="3" y="4" width="18" height="16" rx="3" /><path d="M3 9h18M8 14l-2 2 2 2M12 18h4" /></>,
  mobile: <><rect x="7" y="2.5" width="10" height="19" rx="2.5" /><path d="M11 18.5h2" /></>,
  software: <><path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" /></>,
  graphic: <><path d="M12 3a9 9 0 1 0 0 18h1.2a2.1 2.1 0 0 0 1.5-3.6 1.8 1.8 0 0 1 1.3-3.1H18a3 3 0 0 0 3-3c0-4.6-4-8.3-9-8.3Z" /><path d="M7.5 11h.01M10 7.5h.01M15 8h.01" /></>,
  marketing: <><path d="m3 11 18-6-6 18-3.5-8.5L3 11Z" /><path d="m11.5 14.5 4-4" /></>,
  ai: <><path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1m0-12.8-2.1 2.1m-8.6 8.6-2.1 2.1" /><circle cx="12" cy="12" r="4" /><path d="M10.5 12h3m-1.5-1.5v3" /></>,
  machine: <><path d="M5 4h14v16H5zM9 8h6m-6 4h6m-6 4h3" /><path d="M3 8h2m14 0h2M3 16h2m14 0h2" /></>,
  iot: <><rect x="8" y="8" width="8" height="8" rx="2" /><path d="M12 3v3m0 12v3M3 12h3m12 0h3M6.3 6.3l2.1 2.1m7.2 7.2 2.1 2.1m0-11.4-2.1 2.1m-7.2 7.2-2.1 2.1" /></>,
  video: <><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m10 9 5 3-5 3V9Z" /></>,
  shoot: <><path d="M4 7h3l1.5-2h7L17 7h3v12H4z" /><circle cx="12" cy="13" r="4" /><circle cx="12" cy="13" r="1.5" /></>,
  consulting: <><path d="M4 19V9l8-5 8 5v10M8 19v-5h8v5" /><path d="M9 9h.01M15 9h.01M12 10.5v1" /></>,
};

export function ServiceIcon({ name }: { name: string }) {
  return (
    <span className="service-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        {iconPaths[name] ?? iconPaths.web}
      </svg>
    </span>
  );
}
