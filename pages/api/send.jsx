import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
  async function handler(req, res) {
    const { message, selectedIndexes } = req.body;
    const dogsIndexes = req.session.captchaImages
      .map((path, index) => {
        return path.includes("/dogs-and-muffins/dog") ? index : -1;
      })
      .filter((index) => index !== -1);

    const captchaIsOk =
      JSON.stringify(dogsIndexes) === JSON.stringify(selectedIndexes.sort());

    // send
    const sent = captchaIsOk;
    // send for real

    res.json({
      captchaIsOk,
      sent,
    });
  },
  {
    cookieName: "session",
    password: process.env.SESSION_SECRET,
  }
);
