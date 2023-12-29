"use client";
import React, { useEffect } from 'react';

export default function TawkChatSnippet() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://embed.tawk.to/658e8b280ff6374032ba43a6/1hiqcv5fg';
    script.async = true;
    script.charset = 'UTF-8';
    script.crossOrigin = '*';

    document.body.appendChild(script);

    return () => {
      // Remove the script on component unmount
      document.body.removeChild(script);
    };
  }, []);

  return null; // This component does not render anything
}
