import { useState } from "react";
import Modal from "../Modal/Modal";
import styles from "./ContactRow.module.css";

function ContactRow({ contact, setContact, setIsEditing, setSelectedContact , selectedContact,deleteHandler }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isShowBtns, setIsShowBtns] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };
  const startEditing = (contact) => {
    setSelectedContact(contact);
    setContact(contact);
    setIsEditing(true);
    setIsShowBtns(false);
  };
  
  const handleDelete = () => {
    if (selectedContact) {
      deleteHandler(selectedContact.id);
    }
    closeModal();
  };
  const openModal = (contact) => {
    setSelectedContact(contact);
    setModalOpen(true);
    setIsShowBtns(false);
  };
  return (
    <>
    
    <Modal isOpen={isModalOpen} onClose={closeModal} title="Delete Contact">
        <p>Are you sure you want to delete {selectedContact?.name}?</p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <button onClick={handleDelete} className="btn btn-primary" style={{ marginRight: ".5rem" }}>
            Yes, delete
          </button>
          <button onClick={closeModal} className="btn btn-light">
            Cancel
          </button>
        </div>
      </Modal>
      <tr>
        <td>{contact.fullname}</td>
        <td>{contact.email}</td>
        <td>{contact.phone}</td>
        <td style={{ display: "flex", flexDirection: "column", alignItems: `${isShowBtns ? "normal" : "center"}` }}>
          {isShowBtns ? (
            <>
              <button className="btn btn-danger" style={{ marginBottom: ".5rem" }} onClick={() => openModal(contact)}>
                Delete 🗑️
              </button>
              <button className="btn btn-primary" onClick={() => startEditing(contact)}>
                Edit ✏️
              </button>
            </>
          ) : (
            <img src="/images/more.png" className={styles.contactIcon} onClick={() => setIsShowBtns(true)} />
          )}
        </td>
      </tr>

    </>
  );
}
export default ContactRow;
