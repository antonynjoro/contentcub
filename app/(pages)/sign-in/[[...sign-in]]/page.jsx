"use client";
import { SignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  if (isSignedIn) {
    router.push("/checklists");
    return <div>Redirecting...</div>;
  } else return <SignIn afterSignInUrl="/checklists" />;
}