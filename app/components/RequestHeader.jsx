"use client";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import Button from "./Button";
import { useEffect, useState } from "react";
import { HiOutlineChatBubbleLeftEllipsis } from "react-icons/hi2";
import Chip from "../components/Chip.tsx";
import SendRequestModal from "./SendRequestModal.jsx";
import { usePathname } from "next/navigation";

export default function RequestHeader({ title, status, requestId }) {
  const [showActionButton, setShowActionButton] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("Send to Client");
  const [showSendRequestModal, setShowSendRequestModal] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      const pathSegments = pathname.split("/");
      if (
        pathSegments.length === 3 &&
        pathSegments[1] === "requests" &&
        pathSegments[2] === requestId
      ) {
        setShowActionButton(true);
      }
    }
  }, [pathname, requestId]);

  return (
    <div className="flex gap-4 border-b border-b-gray-200 px-4 py-2">
      <div className="flex flex-grow items-center gap-2">
        <Link
          className="flex items-center text-gray-600 hover:text-gray-900"
          href="/requests"
          title="Back to Requests"
        >
          <HiOutlineArrowSmLeft className="text-2xl" />
          {/* <p className="text-sm ">Back to Requests</p> */}
        </Link>
        <div className="flex items-center justify-center gap-2">
          <h1 className=" text-lg  text-gray-900">{title}</h1>
          <Chip chipType="primary">{status}</Chip>
        </div>
      </div>
      {showActionButton && showSendRequestModal && (
        <SendRequestModal
          requestId={requestId}
          handleModalClose={setShowSendRequestModal}
        />
      )}

      {showActionButton && (
        <Button isSecondary handleClick={() => setShowSendRequestModal(true)}>
          {buttonLabel}
        </Button>
      )}
      <Link
        href={`/chat/${requestId}`}
        className="group relative flex items-center gap-2"
      >
        <HiOutlineChatBubbleLeftEllipsis
          className="text-3xl group-hover:text-gray-800 "
          title="Questions from the client"
        />
        <div className="absolute left-0 top-1 h-2.5 w-2.5 rounded-full bg-pink-600 outline outline-2 outline-white group-hover:bg-pink-500 " />
      </Link>
      <UserButton afterSignOutAllUrl="/signin" />
    </div>
  );
}
