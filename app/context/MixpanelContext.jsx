"use client";

import mixpanel from "mixpanel-browser";
import { useEffect } from "react";

const MixpanelContext = () => {
  useEffect(() => {
    const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
    const isDev = process.env.NODE_ENV !== "production";
    if (typeof window !== "undefined") {
      mixpanel.init(MIXPANEL_TOKEN, { debug: isDev, track_pageview: true });
    }
  }, []);

  return null; // Since we don't need to render anything
};

export default MixpanelContext;
