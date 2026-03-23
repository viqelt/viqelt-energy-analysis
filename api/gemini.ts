export default async function handler(req, res) {
  console.log("START");

  try {
    return res.status(200).json({
      message: "API works"
    });
  } catch (e) {
    console.log("ERROR:", e);
    return res.status(500).json({ error: "fail" });
  }
}
