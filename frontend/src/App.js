import { useState, useEffect } from "react"; // import useEffect
import "./App.css";

function App() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // Fetch contacts when the component mounts
    fetch("http://localhost:5001/api/contacts/")
      .then((response) => response.json())
      .then((data) => setContacts(data))
      .catch((error) => {
        console.error("There was an error fetching contacts:", error);
      });
  }, []);

  const createContact = () => {
    if (!name.trim()) {
      // Checks if name is empty or just whitespace
      setIsError(true);
      return;
    }
    setIsError(false);

    fetch("http://localhost:5001/api/contacts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    })
      .then((response) => response.json())
      .then((newContact) => {
        setContacts([...contacts, newContact]);
        setName("");
      })
      .catch((error) => {
        console.error("There was an error creating the contact:", error);
      });
  };

  const deleteContact = (id) => {
    fetch(`http://localhost:5001/api/contacts/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedContacts = contacts.filter((contact) => contact.id !== id);
        setContacts(updatedContacts);
      })
      .catch((err) => {
        console.error("There was an error deleting the contact:", err);
      });
  };

  return (
    <div className="container">
      <h1>Contactor</h1>
      <div className="main-card">
        <h2>Contacts</h2>
        {isError && <p style={{ color: "red" }}>Name cannot be empty!</p>}
        <input
          className="name-input"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="add-btn"
          onClick={(name) => {
            createContact();
          }}
        >
          Create Contact
        </button>
        {contacts.map((contact) => (
          <div key={contact.id} className="contact-card">
            <div className="phone-card">
              <div className="input-container" id="contact-input">
                <h3 className="name">{contact.name}</h3>
                <button
                  className="del-btn"
                  onClick={() => {
                    deleteContact(contact.id);
                  }}
                >
                  Delete
                </button>
              </div>
              <div className="input-container">
                <input className="type-input" type="text" placeholder="Type" />
                <input
                  className="number-input"
                  type="text"
                  placeholder="Phone Number"
                />
                <button className="add-btn">Add</button>
              </div>
              <div className="contact-table">
                <h4>Type</h4>
                <h4>Contact Number</h4>
                <div></div>
                <p>Type</p>
                <p>Phone number</p>
                <button className="delete-btn">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
