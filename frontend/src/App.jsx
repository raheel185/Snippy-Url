import React, { useState, useEffect } from "react";
import ShortenForm from "./components/ShortenForm";

export default function App() {
  const [links, setLinks] = useState(() => {
    try {
      const raw = localStorage.getItem("short_links");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("short_links", JSON.stringify(links));
  }, [links]);

  const addLink = (link) => setLinks((prev) => [link, ...prev]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold mb-4">URL Shortener</h1>
        <p className="text-sm text-gray-600 mb-6">
          Paste a long URL and get a short link.
        </p>

        <ShortenForm onCreated={addLink} />

        <hr className="my-6" />

        <h2 className="text-lg font-medium mb-3">Your recent short links</h2>
        <div className="space-y-3">
          {links.length === 0 && (
            <p className="text-sm text-gray-500">
              No links yet — create one above.
            </p>
          )}
          {links.map((l) => (
            <div
              key={l.code}
              className="p-3 border rounded-md flex items-center justify-between"
            >
              <div>
                <div className="font-medium">{l.shortUrl}</div>
                <div className="text-sm text-gray-500">→ {l.originalUrl}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm text-gray-600">
                  {typeof l.clicks === "number" ? l.clicks + " clicks" : ""}
                </div>
                <button
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(l.shortUrl);
                      alert("Copied!");
                    } catch (e) {
                      console.error(e);
                    }
                  }}
                  className="px-3 py-1 text-sm border rounded"
                >
                  Copy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
