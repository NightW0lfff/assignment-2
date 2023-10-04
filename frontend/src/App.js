import { useState, useEffect } from "react"; // import useEffect
import "./App.css";

function App() {
  return (
    <div className="container">
      <h1>Contactor</h1>
      <div className="main-card">
        <h2>Contacts</h2>
        <input className="contact-name input" type="text" placeholder="Name" />
        <button className="contact add-btn">Create Contact</button>
        <div className="contact-card">
          <div className="contact input-container">
            <h3 className="contact-name">Name</h3>
            <button className="contact del-btn">Delete</button>
          </div>
          <div className="phone-card">
            <div className="phone input-container">
              <input
                className="phone-type input"
                type="text"
                placeholder="Type"
              />
              <input
                className="phone-number input"
                type="text"
                placeholder="Phone Number"
              />
              <button className="phone add-btn">Add</button>
              <div className="contact-table">
                <h4>Type</h4>
                <h4>Contact Number</h4>
                <button className="phone delete-btn">Delete</button>
                {/* Type input from database using API */}
                {/* Contact number get from database using API */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
