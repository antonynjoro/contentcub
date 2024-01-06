"use client";
import Image from "next/image";
import { formatLongDate, formatRelativeDate } from "../utils/dateUtils";
import { fetchClientData, fetchUserData } from "../actions/fetchUserDataById";
import { useState, useEffect } from "react";

export default function ChatBubble({
  commentText,
  senderId,
  fullName,
  imageUrl,
  createdAt,
  senderType,
}) {
  createdAt = new Date(createdAt);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-row md:flex-col sm:flex-row lg:flex-row gap-2">
        <Image
          src={imageUrl ? imageUrl : "/profile-placeholder-image.png"}
          alt="avatar"
          width={40}
          height={40}
          className="aspect-square rounded-full h-10 w-10"
        />

        <div className="flex flex-col">
          <h4 className="text-sm font-bold text-gray-800">{fullName}</h4>
          <p
            className="text-sm text-gray-600"
            title={formatLongDate(createdAt)}
          >
            {formatRelativeDate(createdAt)}
          </p>
        </div>
      </div>
      <p className="text-sm leading-tight text-gray-800">{commentText}</p>
    </div>
  );
}
