"use client";
import { useState, useEffect, Suspense } from "react";
import NavBar from "../../components/NavBar";
import { fetchRequests, createRequest } from "./actions";
import Button from "../../components/Button";
import { HiPlus } from "react-icons/hi";
import AddRequestModal from "../../components/AddRequestModal";
import { useUser } from "@clerk/nextjs"; 
import RequestListItem from "../../components/RequestListItem.jsx";
import deleteRequest from "../../actions/deleteRequest";
import { toast } from "react-hot-toast";

export default function Request() {
  const [requests, setRequests] = useState([]);
  const [addRequestModalOpen, setAddRequestModalOpen] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();
  const [isLoadingRequest, setIsLoadingRequest] = useState(true);

  useEffect(() => {
    setIsLoadingRequest(true);
    fetchRequests()
      .then((data) => {
        setRequests(data);
      })
      .then(() => {
        setIsLoadingRequest(false);
      });
  }, []);

  async function handleAddRequest(title) {
    setAddRequestModalOpen((prevstate) => !prevstate);

    createRequest(user.id, title).then((data) => {
      setRequests((prevstate) => [...prevstate, data]);
    });
  }

  async function handleDeleteRequest(requestId) {
    deleteRequest(requestId)
      .then(() => {
      setRequests((prevstate) => prevstate.filter((request) => request.id !== requestId));
    })
    .then(() => {
      toast.success("Checklist deleted!");
    })
    .catch((err) => {
      console.log(err);
      toast.error("Something went wrong!");
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
        {requests.length === 0 && !isLoadingRequest && (
          <div className="flex flex-col items-center justify-center">
            <p className="text-gray-500 text-sm">
              You do not have any checklists yet.
            </p>
            <Button
              handleClick={() => setAddRequestModalOpen(true)}
              isSecondary={true}
            >
              Create Checklist
            </Button>
          </div>
        )
        }
        <ul role="list" className="divide-y divide-gray-100">
          <Suspense fallback={<div>Loading...</div>}>
            {requests.map((request) => {
              return (
              <RequestListItem 
                request={request} 
                key={request.id}
                handleDeleteRequest={handleDeleteRequest}
              />
              )
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
