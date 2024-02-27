import * as fs from "fs";
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
  function handler(req, res) {
    const index = req.query.index;
    if (!req.session.captchaImages) {
      req.session.captchaImages = [];
    }
    res.setHeader("Content-Type", "image/png");
    const imageBuffer = fs.readFileSync("./public/dogs-and-muffins");
    res.send(imageBuffer);
  },
  {
    cookieName: "session",
    password: process.env.SESSION_SECRET,
  }
);
