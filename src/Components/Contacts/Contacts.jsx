import React, { useState, useEffect } from "react";
import AddContact from "../AddContact/AddContact";
import ContactsList from "../ContactsList/ContactsList";
import { v4 } from "uuid";
import styles from "./Contacts.module.css";
export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [alert, setAlert] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [contact, setContact] = useState({
    id: "",
    fullname: "",
    email: "",
    phone: "",
  });
  
  useEffect(() => {
    const storedContacts = localStorage.getItem("contacts");
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }
  }, [contacts]);

  const saveContactsToLocalStorage = (contacts) => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  };

  useEffect(() => {
    if (alert) {
      const timeoutId = setTimeout(() => {
        setAlert("");
      }, 2500);
      return () => clearTimeout(timeoutId);
    }
  }, [alert]);
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  };
  const addHandler = () => {
    if (!contact.fullname || !contact.email || !validateEmail(contact.email) || !contact.phone) {
      setAlert(`please enter valid data `);
      return;
    }
    setAlert("");
    const newContact = { ...contact, id: v4() };
    setContacts((contacts) => [...contacts, newContact]);
    saveContactsToLocalStorage(contacts);
    setContact({
      id: "",
      fullname: "",
      email: "",
      phone: "",
    });
  };
  const deleteHandler = (id) => {
    const newContacts = contacts.filter((item) => item.id !== id);
    setContacts(newContacts);
    saveContactsToLocalStorage(newContacts);
  };
  const updateHandler = (updatedContact) => {
    const updatedContacts = contacts.map((contact) => (contact.id === updatedContact.id ? updatedContact : contact));
    setContacts(updatedContacts);
    saveContactsToLocalStorage(updatedContacts);
  };
  return (
    <div className={styles.contacts}>
      <div className={styles.leftCol}>
        <ContactsList
          selectedContact={selectedContact}
          setSelectedContact={setSelectedContact}
          contacts={contacts}
          setContacts={setContacts}
          setContact={setContact}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          deleteHandler={deleteHandler}
          updateHandler={updateHandler}
          saveContactsToLocalStorage={saveContactsToLocalStorage}
        />
      </div>
      <div className={styles.rightCol}>
        <AddContact contacts={contacts} setContact={setContact} addHandler={addHandler} isEditing={isEditing} contact={contact} updateHandler={updateHandler} setIsEditing={setIsEditing} />
        {alert && <p className="alert alert-danger">{alert}</p>}
      </div>
    </div>
  );
}
