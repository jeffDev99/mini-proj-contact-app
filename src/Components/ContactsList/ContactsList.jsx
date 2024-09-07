import React, { useState } from "react";
import ContactRow from "../ContactRow/ContactRow.jsx";
import styles from "./ContactsList.module.css";

export default function ContactsList({ contacts, setContacts, selectedContact, setSelectedContact, setContact, deleteHandler, setIsEditing }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContacts = contacts.filter((contact) => contact.fullname.toLowerCase().includes(searchQuery.toLowerCase()) || contact.email.toLowerCase().includes(searchQuery.toLowerCase()));
  return (
    <>
      <h4 className={styles.subtitle}>{contacts.length} TOTAL</h4>
      <h2 className={styles.title}>Contacts</h2>
      <input type="text" placeholder="Search by name or email" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className={styles.formSearch} style={{ marginBottom: "1rem" }} />
      <div style={{overflowX:'auto'}}>
        <table className={`${styles.table}`}>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th style={{ width: "120px", alignItems: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.length ? (
              filteredContacts.map((item) => (
                <ContactRow
                  setIsEditing={setIsEditing}
                  deleteHandler={deleteHandler}
                  setSelectedContact={setSelectedContact}
                  selectedContact={selectedContact}
                  setContact={setContact}
                  key={item.id}
                  contact={item}
                />
              ))
            ) : (
              <tr>
                <td colSpan={6}>
                  <p className="alert alert-primary">No contact yet</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
