import { useState } from "react";

export default function ShortenForm() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // For now, we’ll just simulate a short link until backend is ready
    if (url.trim() !== "") {
      const fakeCode = Math.random().toString(36).substring(2, 8);
      setShortUrl(`${window.location.origin}/${fakeCode}`);
      setUrl("");
    }
  };

  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
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
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 font-semibold hover:underline"
          >
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
}
