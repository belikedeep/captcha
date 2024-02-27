import * as fs from "fs";
export default function handler(req, res) {
  res.setHeader("Content-Type", "image/png");
  const imageBuffer = fs.readFileSync("./public/dogs-and-muffins/dog1.png");
  res.send(imageBuffer);
}
