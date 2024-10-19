import React, { useState } from "react";
import "./ContentArea.css";
function ContentArea() {
  /* const [snippets, setSnippets] = useState([
    "Welcome to the snippet box!",
    "You will see your generated snippets here.",
  ]);
  const [prompt, setPrompt] = useState(""); */
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  /* const generateSnippetFromPrompt = () => {
    if (!prompt.trim()) return;

    const nlpResponse = `Generated snippet for: "${prompt}"`;
    setSnippets((prevSnippets) => [...prevSnippets, nlpResponse]);
    setPrompt("");
  }; */

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh
    try {
      const res = await fetch("http://localhost:5000/api/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      if (data.response) {
        setResponse(data.response); // Set the response in state
      } else {
        setResponse("Error: " + data.error);
      }
    } catch (error) {
      setResponse("Error: Unable to connect to the server");
    }
  };
  return (
    <div className="content-wrapper">
      <div className="menu">
        <span>Pandora</span>
        <ul>
          <li>
            <a href="/home">Home</a>
          </li>
          <li className="Login">
            <a href="/login">Login In</a>
          </li>
        </ul>
      </div>

      <div className="content-area">
        <h1>AI Chat Helper</h1>

        <div className="snippet-box">
          <div
            style={{
              maxHeight: "400px", 
              overflowY: "auto", 
              whiteSpace: "pre-wrap", 
              padding: "1rem",
              border: "1px solid #ccc",
              borderRadius: "8px",
              color: "black"
            }}
          >
            <p>{response}</p>
          </div>
        </div>

        <textarea
          className="prompt-input"
          placeholder="Enter your prompt here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="buttons">
          <button onClick={handleSubmit}>Generate Snippet</button>
        </div>
      </div>
    </div>
  );
}

export default ContentArea;
