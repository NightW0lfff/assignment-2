import { useState, useEffect } from "react"; // import useEffect
import "./App.css";

function App() {
  return (
    <div className="maincard">
      <h1>Contactor</h1>
      <input type="text" />
      <button className="add-contact-btn"></button>
      <div className="contact-card">
        <div></div>
      </div>
    </div>
  );
}

export default App;
