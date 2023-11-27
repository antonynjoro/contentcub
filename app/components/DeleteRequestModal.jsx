import ModalContainer from "./ModalContainer";
import Button from "./Button";


export default function DeleteRequestModal({requestId, handleModalClose, handleAddButtonClicked, handleDeleteRequest}) {
  return (
    <ModalContainer handleModalClose={handleModalClose}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold">Delete Checklist</h2>
          <p className="text-sm text-gray-500">
            Are you sure you want to delete this checklist?
          </p>
        </div>
        <div className="flex flex-row justify-end gap-4">
          <Button handleClick={handleModalClose} isSecondary={true}>
            Cancel
          </Button>
          <Button handleClick={() => handleDeleteRequest(requestId)} isDestructive >
            Delete Checklist
          </Button>
        </div>
      </div>
    </ModalContainer>
  );
}
