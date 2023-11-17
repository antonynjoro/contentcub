"use client";
import { useState, useEffect, Suspense } from "react";
import NavBar from "../../components/NavBar";
import { fetchRequests, createRequest } from "./actions";
import Button from "../../components/Button";
import { HiPlus } from "react-icons/hi";
import AddRequestModal from "../../components/AddRequestModal";
import { useUser } from "@clerk/nextjs";
import RequestListItem from "../../components/RequestListItem.jsx";

export default function Request() {
  const [requests, setRequests] = useState([]);
  const [addRequestModalOpen, setAddRequestModalOpen] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    fetchRequests().then((data) => {
      setRequests(data);
    });
  }, []);

  async function handleAddRequest(title) {
    setAddRequestModalOpen((prevstate) => !prevstate);

    createRequest(user.id, title).then((data) => {
      setRequests((prevstate) => [...prevstate, data]);
    });
  }

  return (
    <div>
      <NavBar />
      <div className=" mx-auto flex max-w-7xl flex-col gap-4 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between pt-6">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Checklists
            </h2>
          </div>
          <div className="mt-4 flex md:ml-4 md:mt-0">
          <Button handleClick={() => setAddRequestModalOpen(true)}>
            <HiPlus className=" mr-1 inline-block" />
            Create Checklist
          </Button>
          </div>
        </div>
        <ul role="list" className="divide-y divide-gray-100">
          <Suspense fallback={<div>Loading...</div>}>
            {requests.map((request) => {
              return <RequestListItem request={request} key={request.id} />;
            })}
          </Suspense>
        </ul>
      </div>
      {addRequestModalOpen && (
        <AddRequestModal
          handleModalClose={() =>
            setAddRequestModalOpen((prevstate) => !prevstate)
          }
          handleAddRequestName={(requestName) => handleAddRequest(requestName)}
        />
      )}
    </div>
  );
}
