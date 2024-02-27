import Captcha from "@/components/Captcha";
import React from "react";

const Home = () => {
  return (
    <main>
      <input type="text" placeholder="Message" />
      <div>
        <Captcha />
      </div>
      <button>Send</button>
    </main>
  );
};

export default Home;
