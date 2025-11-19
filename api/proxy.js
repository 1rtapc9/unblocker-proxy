export default async function handler(req, res) {
  try {
    const target = req.query.url;
    if (!target) return res.status(400).send("Missing ?url=");

    const response = await fetch(target);
    const buffer = await response.arrayBuffer();

    // Allow the game to load from anywhere
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", response.headers.get("content-type") || "text/html");

    res.send(Buffer.from(buffer));
  } catch (e) {
    res.status(500).send("Proxy error: " + e.message);
  }
}
