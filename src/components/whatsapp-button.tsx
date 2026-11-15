const message = "Hello Nexzora Solution! I would like to discuss a project with your team.";

export function WhatsAppButton() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");
  if (!number) return null;

  return (
    <a
      className="whatsapp-button"
      href={`https://wa.me/${number}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Nexzora Solution on WhatsApp"
    >
      <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
        <path d="M16.02 3.2A12.55 12.55 0 0 0 5.25 22.2L3.5 28.8l6.76-1.77A12.55 12.55 0 1 0 16.02 3.2Zm0 22.98c-1.93 0-3.82-.52-5.47-1.51l-.39-.23-4.01 1.05 1.07-3.91-.25-.4a10.4 10.4 0 1 1 9.05 5Zm5.72-7.8c-.31-.16-1.83-.9-2.11-1-.28-.1-.49-.16-.7.16-.2.31-.8 1-.98 1.2-.18.21-.36.24-.67.08-.31-.16-1.3-.48-2.47-1.52-.91-.81-1.52-1.82-1.7-2.13-.18-.31-.02-.48.14-.64.14-.14.31-.36.47-.54.16-.18.21-.31.31-.52.1-.2.05-.39-.03-.55-.08-.16-.7-1.68-.96-2.3-.25-.6-.5-.52-.7-.53h-.6c-.2 0-.54.08-.82.39-.28.31-1.08 1.05-1.08 2.57s1.1 2.98 1.25 3.19c.16.2 2.17 3.31 5.26 4.64.73.31 1.3.5 1.75.64.74.23 1.4.2 1.93.12.59-.09 1.83-.75 2.08-1.47.26-.72.26-1.34.18-1.47-.07-.13-.28-.21-.59-.36Z" />
      </svg>
    </a>
  );
}
