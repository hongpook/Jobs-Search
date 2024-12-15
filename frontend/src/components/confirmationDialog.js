import React from "react";

const ConfirmationDialog = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-dialog">
        <h3>Confirmation</h3>
        <p>{message}</p>
        <button className="btn btn-danger" onClick={onConfirm}>
          Confirm
        </button>
        <button className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
