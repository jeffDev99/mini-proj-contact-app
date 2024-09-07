import { useState } from "react";
import styles from "./ContactRow.module.css";

function ContactRow({ contact, setContact, setIsEditing, setSelectedContact, deleteHandler }) {
  const [isShowBtns, setIsShowBtns] = useState(false);

  const startEditing = (contact) => {
    setSelectedContact(contact);
    setContact(contact);
    setIsEditing(true);
    setIsShowBtns(false);
  };

  return (
    <tr>
      <td>{contact.fullname}</td>
      <td>{contact.email}</td>
      <td>{contact.phone}</td>
      <td style={{ display: "flex", flexDirection: "column", alignItems: `${isShowBtns ? "normal" : "center"}` }}>
        {isShowBtns ? (
          <>
            <button className="btn btn-danger" style={{ marginBottom: ".5rem" }} onClick={() => deleteHandler(contact)}>
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
  );
}

export default ContactRow;
