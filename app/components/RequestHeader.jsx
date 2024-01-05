"use client";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import Button from "./Button";
import { useEffect, useState } from "react";
import Chip from "../components/Chip.tsx";
import SendRequestModal from "./SendRequestModal.jsx";
import { usePathname } from "next/navigation";
import fetchRequestStatus from "../actions/fetchRequestStatus";
import { TbUserShare } from "react-icons/tb";
import statusStyles from "../configs/statusStyles";
import IconButton from "./IconButton";

export default function RequestHeader({ title, status, requestId, isLoading }) {
  const [showActionButton, setShowActionButton] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("Share with Client");
  const [showSendRequestModal, setShowSendRequestModal] = useState(false);
  const pathname = usePathname();
  const [ currentStatus, setCurrentStatus ] = useState("");
  const [ chipType, setChipType ] = useState("primary");
  

  useEffect(() => {
    fetchRequestStatus(requestId)
      .then((status) => {
        setCurrentStatus(status);
        console.log("currentStatus ", status);
        if (status === "sent") {
          setChipType("warning");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [requestId, currentStatus, showSendRequestModal]);

  useEffect(() => {
    if (pathname) {
      const pathSegments = pathname.split("/");
      if (
        pathSegments.length === 3 &&
        pathSegments[1] === "checklists" &&
        pathSegments[2] === requestId
      ) {
        setShowActionButton(true);
      }
    }
  }, [pathname, requestId]);

  return (
    <div className="flex items-center gap-4 md:border-b border-b-gray-200 px-4 py-2  bg-gray-200  md:bg-white ">
      <div className="flex flex-grow items-center gap-2">
        <Link
          className="flex items-center text-gray-600 hover:text-gray-900"
          href="/checklists"
          title="Back to Checklists"
        >
          <HiOutlineArrowSmLeft className="text-2xl" />
          {/* <p className="text-sm ">Back to Requests</p> */}
        </Link>
        <div className="flex justify-center gap-2  items-center">
          <h1 className=" text-base text-gray-600  md:text-lg  md:text-gray-900">{title}</h1>
          <Chip chipType={chipType}>{status}</Chip>
        </div>
      </div>
      {!isLoading && showActionButton && showSendRequestModal && (
        <SendRequestModal
          requestId={requestId}
          handleModalClose={setShowSendRequestModal}
        />
      )}
      <div className="hidden md:block">
        {!isLoading && showActionButton && (
          <Button isOutlined handleClick={() => setShowSendRequestModal(true)}>
            {buttonLabel}
          </Button>
        )}
      </div>
      <div className="block md:hidden">
        <IconButton
          handleClick={() => setShowSendRequestModal(true)}
          IconComponent= {TbUserShare}
          title="Share with Client"
        />
      </div>
      {/* <Link
        href={`/chat/${requestId}`}
        className="group relative flex items-center gap-2"
      >
        <HiOutlineChatBubbleLeftEllipsis
          className="text-3xl group-hover:text-gray-800 "
          title="Questions from the client"
        />
        <div className="absolute left-0 top-1 h-2.5 w-2.5 rounded-full bg-pink-600 outline outline-2 outline-white group-hover:bg-pink-500 " />
      </Link> */}
      <div className="hidden md:block">
        <UserButton afterSignOutAllUrl="/signin" />
      </div>
    </div>
  );
}
