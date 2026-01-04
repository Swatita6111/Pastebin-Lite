import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { createPaste } from "./api";

export default function App() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [views, setViews] = useState("");
  const [url, setUrl] = useState("");

  async function submit() {
    const data = await createPaste({
      content,
      ttl_seconds: ttl ? Number(ttl) : undefined,
      max_views: views ? Number(views) : undefined
    });
    setUrl(data.url);
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{ backgroundColor: "#f4f6f8" }}
    >
      <div
        className="card shadow-lg p-4"
        style={{ width: "100%", maxWidth: "520px", borderRadius: "14px" }}
      >
        <h3 className="text-center mb-4 fw-bold text-dark">
          Create Paste
        </h3>

        <div className="mb-3">
          <label className="form-label fw-semibold">Content</label>
          <textarea
            className="form-control"
            rows={6}
            placeholder="Enter your text here..."
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">TTL (seconds)</label>
          <input
            type="number"
            className="form-control"
            placeholder="Optional"
            value={ttl}
            onChange={e => setTtl(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold">Max Views</label>
          <input
            type="number"
            className="form-control"
            placeholder="Optional"
            value={views}
            onChange={e => setViews(e.target.value)}
          />
        </div>

        <button
          className="btn btn-primary w-100 py-2 fw-semibold"
          onClick={submit}
        >
          Create Paste
        </button>

        {url && (
          <div className="mt-4 text-center">
            <small className="text-muted">Generated URL</small>
            <div className="mt-1">
              <a href={url} target="_blank" rel="noopener noreferrer">
                {url}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
