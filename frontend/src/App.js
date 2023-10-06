import { useState, useEffect } from "react"; // import useEffect
import "./App.css";

function App() {
  const [contacts, setContacts] = useState([]);
  const [phones, setPhones] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState({});
  const [number, setNumber] = useState({});
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5001/api/contacts/")
      .then((response) => response.json())
      .then((data) => {
        setContacts(data);

        const phonePromises = data.map((contact) =>
          fetch(`http://localhost:5001/api/contacts/${contact.id}/phones`)
            .then((response) => response.json())
            .catch((error) => {
              console.error(
                "There was an error fetching phones for contact:",
                contact.id,
                error
              );
              return [];
            })
        );

        return Promise.all(phonePromises);
      })
      .then((allPhonesForContacts) => {
        const allPhones = [].concat(...allPhonesForContacts);
        setPhones(allPhones);
      })
      .catch((error) => {
        console.error("There was an error fetching contacts:", error);
      });
  }, []);

  const createContact = () => {
    if (!name.trim()) {
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
        console.error("There was an error deleting the contact.", err);
      });
  };

  const createPhone = (contactID) => {
    if (!type[contactID] && !number[contactID]) return;
    fetch(`http://localhost:5001/api/contacts/${contactID}/phones`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: type[contactID],
        phone: number[contactID],
        // contactId: contactID,
      }),
    })
      .then((response) => response.json())
      .then((newPhone) => {
        setPhones([...phones, newPhone]);
        handleInputChange(contactID, "", "number");
        handleInputChange(contactID, "", "type");
      })
      .catch((error) => {
        console.error("There was an error creating the phone", error);
      });
  };

  const handleInputChange = (contactID, inputValue, inputType) => {
    if (inputType === "type") {
      setType((prevValues) => ({
        ...prevValues,
        [contactID]: inputValue,
      }));
    } else {
      setNumber((prevValues) => ({
        ...prevValues,
        [contactID]: inputValue,
      }));
    }
  };

  const deletePhone = (contactID, id) => {
    fetch(`http://localhost:5001/api/contacts/${contactID}/phones/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedPhones = phones.filter((phone) => phone.id !== id);
        setPhones(updatedPhones);
      })
      .catch((err) => {
        console.error("There was an error deleting the phone.", err);
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
              <div className="input-container" id="contact-title">
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
              <div className="input-container" id="contact-input">
                <input
                  className="type-input"
                  type="text"
                  placeholder="Type"
                  value={type[contact.id] || ""}
                  onChange={(e) =>
                    handleInputChange(contact.id, e.target.value, "type")
                  }
                />
                <input
                  className="number-input"
                  type="text"
                  placeholder="Phone Number"
                  value={number[contact.id]}
                  onChange={(e) =>
                    handleInputChange(contact.id, e.target.value, "number")
                  }
                />
                <button
                  className="add-btn"
                  onClick={() => {
                    createPhone(contact.id);
                  }}
                >
                  Add
                </button>
              </div>
              <div className="contact-table">
                <h4>Type</h4>
                <h4>Contact Number</h4>
                <div></div>
              </div>
              {phones
                .filter((phone) => phone.contactId === contact.id)
                .map((phone) => (
                  <div
                    key={phone.id}
                    className="contact-table"
                    id="contact-phone"
                  >
                    <p className="phone-type">{phone.type}</p>
                    <p className="phone-num">{phone.phone}</p>
                    <button
                      className="delete-btn"
                      onClick={() => {
                        deletePhone(contact.id, phone.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
