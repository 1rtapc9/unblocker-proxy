export default async function handler(req, res) {
  const target = req.query.url;
  if (!target) return res.status(400).send("Missing ?url=");

  const r = await fetch(target);
  const buf = await r.arrayBuffer();

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", r.headers.get("content-type") || "text/html");

  res.send(Buffer.from(buf));
}
