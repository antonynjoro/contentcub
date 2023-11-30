"use client";

import mixpanel from "mixpanel-browser";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

const MixpanelContext = () => {
  useEffect(() => {
    const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
    const isDev = process.env.NODE_ENV !== "production";
    if (typeof window !== "undefined") {
      mixpanel.init(MIXPANEL_TOKEN, { debug: isDev, track_pageview: true });
    }
  }, []);

  const { user } = useUser();

  useEffect(() => {
    if (user) {
      mixpanel.identify(user.id);
      mixpanel.people.set({
        $email: user.emailAddresses[0].emailAddress,
        $name: user.fullName,
        $created: user.createdAt,
        $last_login: user.lastSignInAt,
        $username: user.username,
      });
    }
    mixpanel.track("Page Viewed", {
      page: window.location.pathname,
      user: user?.id,
      pageTitle: document.title,

    });
  }, [user]);

  return null; // Since we don't need to render anything
};

export default MixpanelContext;
