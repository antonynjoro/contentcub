"use client";

import mixpanel from 'mixpanel-browser';
import { useUser } from '@clerk/nextjs';


export default function Button({
  handleClick,
  children,
  isSecondary = false,
  isOutlined = false,
  isDestructive = false,
  tooltipText = "",
}) {
  const { user } = useUser();

  let buttonClass = 'flex justify-center items-center gap-1 rounded-md px-4 py-2 font-medium'+" ";

  if (isDestructive) {
    buttonClass += 'border border-transparent bg-red-50 text-red-900 hover:border-red-300 hover:bg-red-100';
  } else if (isOutlined) {
    buttonClass += 'border border-gray-600 bg-white text-gray-900 hover:bg-gray-100';
  } else if (isSecondary) {
    buttonClass += 'bg-gray-200 text-gray-900 hover:bg-gray-300';
  } else {
    buttonClass += 'bg-gray-900 text-white hover:bg-gray-800';
  }
  
  const trackClick = (e) => {
    // Track the event with Mixpanel
    mixpanel.track('Button Clicked', {
      buttonText: children,
      buttonType: isDestructive ? 'Destructive' : isOutlined ? 'Outlined' : isSecondary ? 'Secondary' : 'Primary',
      user: user.id,
    });

    // Call the passed in handleClick function
    if (handleClick) {
      handleClick(e);
    }
  };

  return (
    <button
      className={buttonClass}
      onClick={trackClick}
      aria-label={children}
      title={tooltipText}
    >
      {children}
    </button>
  );
}
