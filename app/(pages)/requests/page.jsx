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
        <Button handleClick={() => setAddRequestModalOpen(true)}>
          <HiPlus className="mb-1 mr-2 inline-block" />
          Add Request
        </Button>

        <h1 className="text-2xl font-semibold">Requests</h1>
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
