import "./popmessage.css";

const PopUpMessage = ({ message, onCancel, onConfirm }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-message">{message}</div>
        <div className="modal-buttons">
          <button className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
          <button className="confirm-button" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
export default PopUpMessage;
