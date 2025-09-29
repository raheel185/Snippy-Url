import { nanoid } from "nanoid";
import Url from "../models/Urls.js";

// POST /api/shorten
export const createShortUrl = async (req, res) => {
  const { longUrl } = req.body;
  if (!longUrl) return res.status(400).json({ error: "URL is required" });

  try {
    const code = nanoid(6);
    const newUrl = await Url.create({ code, longUrl });
    res.json({ shortUrl: `${process.env.BASE_URL}/${code}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// GET /:code
export const redirectUrl = async (req, res) => {
  try {
    const url = await Url.findOne({ code: req.params.code });
    if (url) {
      url.clicks++;
      await url.save();
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json({ error: "Not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const urlStats = async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const url = await Url.findOne({ shortUrl: shortId });

    if (!url)
      return res.status(404).json({ message: "URL not found", Ido: shortId });

    res.json({
      longUrl: url.longUrl,
      shortUrl: url.shortUrl,
      clicks: url.clicks,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
