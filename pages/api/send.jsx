import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
  async function handler(req, res) {
    const { message, selectedIndexes } = req.body;
    req.session.captchaImages;
    console.log({
      message,
      selectedIndexes,
      captchaImages: req.session.captchaImages,
    });
  },
  {
    cookieName: "session",
    password: process.env.SESSION_SECRET,
  }
);
