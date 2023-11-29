"use client";
import { SignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useEffect } from 'react';
import mixpanel from 'mixpanel-browser';

export default function SignInPage() {
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    // Track sign-in event with Mixpanel when user is signed in
    if (isSignedIn) {
      mixpanel.track('User Signed In', {
        userId: user.id, // anonymize ID if necessary
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses[0].emailAddress,

      });
    }
  }, [isSignedIn, user]);

  // Clerk's SignIn component handles the redirection after sign-in.
  // Users are always redirected to '/checklists' after signing in.
  return (
    <div>
      {isSignedIn ? (
        <div>Redirecting...</div> // This will show briefly before Clerk redirects the user
      ) : (
        <SignIn afterSignInUrl="/checklists" />
      )}
    </div>
  );
}
