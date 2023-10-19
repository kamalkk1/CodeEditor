
import './App.css';


import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [code, setCode] = useState("Your code goes here");
  const [isLocked, setLocked] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  const handleCopy = () => {
    const codeEditor = document.getElementById("code-editor");
    codeEditor.select();
    document.execCommand("copy");
    window.getSelection().removeAllRanges();

    // Display a confirmation message
    setConfirmation("Code copied to clipboard!");

    // Clear the confirmation message after 2 seconds
    setTimeout(() => {
      setConfirmation("Code copied to clipboard!");
      setTimeout(() => {
        setConfirmation(null); // Hide the message
      }, 2000);
    }, 200);
  };

  const handleSave = () => {
    const snippetId = uuidv4();
    const snippet = {
      id: snippetId,
      code
    };

    const savedSnippets = JSON.parse(localStorage.getItem("savedSnippets")) || [];
    savedSnippets.push(snippet);
    localStorage.setItem("savedSnippets", JSON.stringify(savedSnippets));

    // Display a confirmation message
    setConfirmation("Code saved successfully!");

    // Clear the confirmation message after 2 seconds
    setTimeout(() => {
      setConfirmation("Code saved successfully!");
      setTimeout(() => {
        setConfirmation(null); // Hide the message
      }, 2000);
    }, 200);
  };

  const toggleLock = () => {
    setLocked(!isLocked);
  };

  return (
    <div className="App">
      <div className='container'>
      <textarea
        id="code-editor"
        className={`code-editor ${isLocked ? "locked" : ""}`}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        readOnly={isLocked}
      ></textarea>
      <br />
      <button className="button" onClick={handleCopy}>
        Copy
      </button>
      <button className="button" onClick={handleSave}>
        Save
      </button>
      <button
        className={`button ${isLocked ? "locked" : ""}`}
        onClick={toggleLock}
      >
        {isLocked ? "Unlock" : "Lock"}
      </button>
      {confirmation && <p className="confirmation-message">{confirmation}</p>}
    </div>
    </div>
  );
}

export default App;
