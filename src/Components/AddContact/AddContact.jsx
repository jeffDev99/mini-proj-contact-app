import React, { useEffect, useState } from "react";
import styles from "./AddContact.module.css";
import inputes from "../../constants/inputes";

export default function AddContact({ addHandler, contact, setContact, updateHandler, isEditing, setIsEditing }) {
  useEffect(() => {
    if (isEditing) {
      setContact(contact);
    }
  }, [isEditing, contact, setContact]);

  const handleSaveChanges = () => {
    updateHandler(contact);
    setContact({
      id: "",
      fullname: "",
      email: "",
      phone: "",
    });
    setIsEditing(false);
  };
  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setContact((contact) => ({ ...contact, [name]: value }));
  };
  const handleCancel = () => {
    setContact({
      id: "",
      fullname: "",
      email: "",
      phone: "",
    });
    setIsEditing(false);
  };
  return (
    <>
      <h2>{isEditing ? "Edit Contacts" : "Add Contacts"}</h2>
      <div className="input-wrapper">
        {inputes.map((item) => (
          <input key={item.id} type={item.type} name={item.name} className="input" placeholder={item.placeholder} id={item.id} value={contact[item.name]} onChange={changeHandler} />
        ))}
        {isEditing ? (
          <>
            <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>
              Save Changes
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          </>
        ) : (
          <input type="button" value="Add Contact" className="inputBtn" onClick={addHandler} />
        )}
      </div>
    </>
  );
}
