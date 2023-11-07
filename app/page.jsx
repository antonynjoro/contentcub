"use client";

import { useUser } from "@clerk/nextjs";
import { useClerk } from "@clerk/nextjs";
import Header from "./components/Header";
import NavBar from "./components/NavBar";


export default function HomePage() {
  const { isSignedIn, user, isLoaded } = useUser();
  const { signOut } = useClerk();

  return (
    <>
      <NavBar />

      <div className="min-h-full">
        <div className="py-10">
          <Header headerText={"Home"} />
          <main>
            <div className="mx-auto px-4 max-w-7xl sm:px-6 lg:px-8">
              {/* Your content */}
              <p className="">
               hello
              </p>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
