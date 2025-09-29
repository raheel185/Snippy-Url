import React, { useState } from "react";
import axios from "axios";

const API_BASE = "";

export default function ShortenForm({ onCreated }) {
  const [url, setUrl] = useState("");
  const [custom, setCustom] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function validateUrl(value) {
    try {
      const u = new URL(value);
      return u.protocol === "http:" || u.protocol === "https:";
    } catch (e) {
      return false;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!validateUrl(url)) {
      setError("Please enter a valid http/https URL");
      return;
    }

    setLoading(true);
    try {
      const payload = { url: url.trim() };
      if (custom.trim()) payload.customCode = custom.trim();

      const res = await axios.post(`${API_BASE}/api/shorten`, payload);
      const data = res.data;

      const created = {
        code: data.code,
        originalUrl: url.trim(),
        shortUrl: data.shortUrl || `${window.location.origin}/${data.code}`,
        clicks: data.clicks ?? 0,
      };

      onCreated?.(created);
      setUrl("");
      setCustom("");
    } catch (err) {
      console.error(err);
      if (err?.response?.data?.message) setError(err.response.data.message);
      else setError("Failed to create short link — try again");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Long URL
        </label>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/very/long/path"
          className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Custom alias (optional)
        </label>
        <input
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          placeholder="my-alias"
          className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2"
        />
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-60"
        >
          {loading ? "Creating…" : "Create Short Link"}
        </button>
        <button
          type="button"
          onClick={() => {
            setUrl("");
            setCustom("");
            setError("");
          }}
          className="px-3 py-2 border rounded-md"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
