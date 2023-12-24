"use client"
import { Fragment, useState } from 'react'
import {
    HiFaceFrown,
    HiFaceSmile,
    HiFire,
    HiHandThumbUp,
    HiHeart,
    HiPaperClip,
    HiXMark

} from 'react-icons/hi2'
import { Listbox, Transition } from '@headlessui/react'

const moods = [
  { name: 'Excited', value: 'excited', icon: HiFire, iconColor: 'text-white', bgColor: 'bg-red-500' },
  { name: 'Loved', value: 'loved', icon: HiHeart, iconColor: 'text-white', bgColor: 'bg-pink-400' },
  { name: 'Happy', value: 'happy', icon: HiFaceSmile, iconColor: 'text-white', bgColor: 'bg-green-400' },
  { name: 'Sad', value: 'sad', icon: HiFaceFrown, iconColor: 'text-white', bgColor: 'bg-yellow-400' },
  { name: 'Thumbsy', value: 'thumbsy', icon: HiHandThumbUp, iconColor: 'text-white', bgColor: 'bg-blue-500' },
  { name: 'I feel nothing', value: null, icon: HiXMark , iconColor: 'text-gray-400', bgColor: 'bg-transparent' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}



export default function PostCommentField({
  placeholder= "Add your comment...",
  buttonLabel= "Post",
  commentText,
  setCommentText,
  handlePostComment,
  isDisabled = false,
}) {
  const [selected, setSelected] = useState(moods[5])

  const handleKeyDown = (e) => {
    if (isDisabled) return;

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handlePostComment();
    }
  }

  return (
    <div className="flex items-start space-x-4">
      <div className="min-w-0 flex-1">
        <form action="#" className="relative">
          <div className="overflow-hidden rounded shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-gray-900">
            <label htmlFor="comment" className="sr-only">
              {placeholder}
            </label>
            <textarea
              rows={3}
              name="comment"
              id="comment"
              className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder={placeholder}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            {/* Spacer element to match the height of the toolbar */}
            <div className="py-2" aria-hidden="true">
              {/* Matches height of button in toolbar (1px border + 36px content height) */}
              <div className="py-px">
                <div className="h-9" />
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 flex justify-end py-2 pl-3 pr-2">
            <div className="flex-shrink-0">
              <button
                type="submit"
                className="inline-flex items-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={(e) => {
                  e.preventDefault();

                  if (isDisabled) return;

                  handlePostComment();
                }}
              >
                {buttonLabel}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
