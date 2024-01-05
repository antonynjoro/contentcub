import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { HiEllipsisVertical } from "react-icons/hi2";
import statusStyles from "../configs/statusStyles";
import { formatLongDate, formatRelativeDate } from "../utils/dateUtils";
import Link from "next/link";
import DeleteRequestModal from "./DeleteRequestModal";
import { useState } from "react";
import { MdMoreVert } from "react-icons/md";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function RequestListItem({
  request,
  handleDeleteRequest,
  currentUser,
}) {
  const longDate = formatLongDate(request.createdAt);
  const relativeDate = formatRelativeDate(request.createdAt);
  const singleRequestPage = `/checklists/${request.id}`;
  const firstName = request?.clients?.[0]?.firstName;
  const lastName = request?.clients?.[0]?.lastName;
  const fullName = (firstName || lastName) && firstName + " " + lastName;
  const clientName =
    fullName || request?.clients?.[0]?.email || "No Client Assigned";
  const clientCount = request?.clients?.length;
  const clientCountText = clientCount > 1 ? `+${clientCount - 1}` : "";
  const otherClientEmails =
    request?.clients?.map((client) => client.email) || [];
  const [showDeleteRequestModal, setShowDeleteRequestModal] = useState(false);

  return (
    <>
      <li
        key={request.id}
        className="flex   gap-x-6 max-w-full   border-b border-gray-200 px-6 first:border-b-0 odd:bg-gray-50 hover:bg-gray-100"
      >
        <Link href={singleRequestPage} className=" flex-grow py-5 max-w-full">
          <div className="min-w-0">
            <div className="flex items-start gap-x-3">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {request.title}
              </p>
              <p
                className={classNames(
                  statusStyles[request.status],
                  "mt-0.5 whitespace-nowrap rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset",
                )}
              >
                {request.status}
              </p>
            </div>
            <div className="mt-1 flex-grow overflow-hidden flex-col items-center gap-x-2  text-xs leading-5 text-gray-500 md:flex">
              <p className="whitespace-nowrap">
                Created{" "}
                <time dateTime={longDate} title={`${longDate}`}>
                  {relativeDate}
                </time>
              </p>
              <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                <circle cx={1} cy={1} r={1} />
              </svg>
              <p
                className="md:max-w-full"
                title={
                  otherClientEmails.length > 0 && otherClientEmails.join(", ")
                }
              >
                Client:{" "}
                <span className="font-medium">
                  {clientName + " " + clientCountText}
                </span>
              </p>
            </div>
          </div>
        </Link>
        <div className="flex shrink items-center gap-x-4">
          <a
            href={singleRequestPage}
            className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
          >
            View<span className="sr-only">, {request.title}</span>
          </a>
          <Menu as="div" className="relative flex-grow ">
            <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
              <span className="sr-only">Open options</span>
              <MdMoreVert className="h-5 w-5" aria-hidden="true" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                {currentUser?.type === "user" && (
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href={singleRequestPage}
                        className={classNames(
                          active ? "bg-gray-50" : "",
                          "block px-3 py-1 text-sm leading-6 text-gray-900",
                        )}
                      >
                        Edit<span className="sr-only">, {request.title}</span>
                      </a>
                    )}
                  </Menu.Item>
                )}
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href={singleRequestPage + "/submit"}
                      className={classNames(
                        active ? "bg-gray-50" : "",
                        "block px-3 py-1 text-sm leading-6 text-gray-900",
                      )}
                    >
                      Submit Answers{" "}
                      <span className="sr-only">, {request.title}</span>
                    </a>
                  )}
                </Menu.Item>
                {currentUser?.type === "user" && (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={classNames(
                          active ? "bg-gray-50" : "",
                          "block w-full px-3 py-1 text-left text-sm leading-6 text-gray-900",
                        )}
                        onClick={() => setShowDeleteRequestModal(true)}
                      >
                        Delete<span className="sr-only">, {request.title}</span>
                      </button>
                    )}
                  </Menu.Item>
                )}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </li>
      {showDeleteRequestModal && (
        <DeleteRequestModal
          requestId={request.id}
          handleModalClose={setShowDeleteRequestModal}
          handleDeleteRequest={handleDeleteRequest}
        />
      )}
    </>
  );
}
