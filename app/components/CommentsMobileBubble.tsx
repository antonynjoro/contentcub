import React from "react";
import { HiMiniChatBubbleLeftRight } from "react-icons/hi2";
import { useState } from "react";

export default function CommentsMobileBubble({
  commentCount,
  setCommentsActive,
  isSecondary,
  size,
}: {
  commentCount: number;
  setCommentsActive: (active: boolean) => void;
  isSecondary?: boolean;
  size?: "sm" | "md";
}) {



  return (
    <div
      className={`relative flex cursor-pointer items-center justify-center rounded-md  p-2 
      ${isSecondary ? "bg-gray-100 text-gray-900" : "bg-gray-900 text-white"}
      ${size === "sm" ? "h-10 w-10" : "h-12 w-12"}
      `}
      onClick={() => setCommentsActive(true)}
      title="View Comments"
    >
      <HiMiniChatBubbleLeftRight className="h-8 w-8" />
      <span className="sr-only">View Comments</span>
      {commentCount > 0 && (
        <div className={` absolute -right-1 -top-1 flex  items-center justify-center self-start rounded-full  font-semibold  shadow-sm text-white
        ${size === "sm" ? "text-xs h-4 w-4" : "h-5 w-5"}
        ${isSecondary ? "bg-fuchsia-700 " : "bg-fuchsia-200 text-gray-950 "}
        `}>
          <span className="">{commentCount}</span>
          <span className="sr-only">Comments</span>
        </div>
      )}
    </div>
  );
}
