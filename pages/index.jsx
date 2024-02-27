import Captcha from "@/components/Captcha";
import React, { useState } from "react";

const Home = () => {
  const [message, setMessage] = useState("");
  const [selectedIndexes, setSelectedIndexes] = useState([]);

  function send() {
    if (!message) {
      alert("The message is required");
      return;
    }
    fetch("/api/send", {
      method: "POST",
      body: JSON.stringify({
        message,
        selectedIndexes,
      }),
      headers: { "Content-Type": "application/json" },
    });
  }

  return (
    <main>
      <input
        type="text"
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message"
        value={message}
      />
      <div>
        <Captcha onChange={setSelectedIndexes} />
      </div>
      <button onClick={send}>Send</button>
    </main>
  );
};

export default Home;
