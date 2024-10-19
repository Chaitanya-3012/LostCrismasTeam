import React, { useState } from "react";
import ContentArea from "./ContentArea";

function App() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); 
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

  return <ContentArea />;
}

export default App;
