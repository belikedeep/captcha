import Captcha from "../components/Captcha";
import { useState } from "react";
import { withIronSessionSsr } from "iron-session/next";
import { newCaptchaImages } from "./api/captcha-image";

export default function Home({ defaultCaptchaKey }) {
  const [message, setMessage] = useState("");
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [captchaKey, setCaptchaKey] = useState(defaultCaptchaKey);
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
    }).then((response) => {
      response.json().then((json) => {
        if (json.sent) {
          setCaptchaKey(new Date().getTime());
          alert("message sent");
          setMessage("");
        }
        if (!json.captchaIsOk) {
          setCaptchaKey(new Date().getTime());
          alert("wrong captcha. try again");
        }
      });
    });
  }
  return (
    <main>
      <h1>Send a Message</h1>
      <p style={{ color: "#64748b", marginBottom: 18, fontSize: "1.08rem" }}>
        Enter your message and solve the captcha to continue.
      </p>
      <input
        type="text"
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here..."
        value={message}
        style={{ marginBottom: 18 }}
      />
      <div
        style={{
          width: "100%",
          marginBottom: 18,
          background: "#f1f5f9",
          borderRadius: 12,
          boxShadow: "0 1px 4px rgba(99,102,241,0.04)",
          padding: 12,
        }}
      >
        <Captcha captchaKey={captchaKey} onChange={setSelectedIndexes} />
      </div>
      <button onClick={send}>Send</button>
    </main>
  );
}

export const getServerSideProps = withIronSessionSsr(
  async ({ req }) => {
    {
      if (!req.session.captchaImages) {
        req.session.captchaImages = newCaptchaImages();
        await req.session.save();
      }
      return {
        props: {
          defaultCaptchaKey: new Date().getTime(),
        },
      };
    }
  },
  {
    cookieName: "session",
    password: process.env.SESSION_SECRET,
  }
);
