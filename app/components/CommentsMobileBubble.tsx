import React from 'react'
import { HiChat } from 'react-icons/hi'

export default function CommentsMobileBubble({
    commentCount,
    setCommentsActive,
}) {
  return (
    <div
      className="relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-md bg-gray-900 text-white"
      onClick={() => setCommentsActive(true)}
      title="View Comments"
    >
      <HiChat className="h-8 w-8" />
      <span className="sr-only">View Comments</span>
      {commentCount > 0 && (
      <div className=" text-sm font-semibold absolute -right-1 -top-1 flex w-5 shadow-sm h-5 items-center justify-center self-start rounded-full bg-fuchsia-100 text-gray-900">
        <span className="">{commentCount}</span>
        <span className="sr-only">Comments</span>
      </div>
        )}
    </div>
  );
}
