import { useState } from "react";
import axios from "axios";

export default function ShortenForm() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");
    setCopied(false);

    try {
      const res = await axios.post("http://localhost:5000/api/shorten", {
        longUrl: url,
      });
      setShortUrl(res.data.shortUrl);
    } catch (err) {
      console.error(err);
      setError("Failed to shorten URL. Try again.");
    }
  };

  const handleCopy = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // reset message after 2s
    }
  };

  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 w-full max-w-lg md:min-w-[600px]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter your long URL..."
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Shorten URL
        </button>
      </form>

      {shortUrl && (
        <div className="mt-4 text-center">
          <p className="text-gray-600">Your shortened link:</p>
          <div className="flex items-center justify-center gap-2">
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 font-semibold hover:underline break-all"
            >
              {shortUrl}
            </a>
            <button
              onClick={handleCopy}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-lg text-sm"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
