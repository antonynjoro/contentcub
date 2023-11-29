// mixpanelUtils.js
import mixpanel from 'mixpanel-browser';

// Initialize Mixpanel once when the module is evaluated
const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
if (typeof window !== 'undefined' && MIXPANEL_TOKEN) {
  mixpanel.init(MIXPANEL_TOKEN, {
    debug: process.env.NODE_ENV !== 'production',
    track_pageview: true,
  });
}

// A utility function to track events
export function trackEvent(event, properties = {}) {
  if (typeof window !== 'undefined' && MIXPANEL_TOKEN) {
    mixpanel.track(event, properties);
  }
}

// Export the initialized Mixpanel instance if needed elsewhere
export default mixpanel;
