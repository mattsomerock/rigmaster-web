type DataLayerEvent = Record<string, unknown> & { event: string };

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

let cachedSource: string | null = null;

/** Traffic source: ?utm_source= / ?src= first, then referrer host, else "direct". */
export function trafficSource(): string {
  if (cachedSource) return cachedSource;
  const qs = new URLSearchParams(window.location.search);
  let src = qs.get("utm_source") || qs.get("src");
  if (!src && document.referrer) {
    try {
      src = new URL(document.referrer).hostname;
    } catch {
      src = null;
    }
  }
  cachedSource = src || "direct";
  return cachedSource;
}

/** Push an event to the GTM-compatible dataLayer. Safe to call before GTM loads. */
export function track(event: string, data: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  (window.dataLayer ||= []).push({ event, src: trafficSource(), ...data });
}
