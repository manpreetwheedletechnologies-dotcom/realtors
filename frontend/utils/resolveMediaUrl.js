// utils/resolveMediaUrl.js
//
// Single source of truth for turning a path stored in MongoDB (as returned
// by the lands/videos/hero APIs) into a URL the browser can actually load.
//
// - Uploaded files (path contains "upload", e.g. "uploads/169...jpg" or
//   "/uploads/169...jpg") are served through the backend, reached via the
//   "/pgi/..." reverse-proxy path in production — so they get the
//   NEXT_PUBLIC_API_URL prefix.
// - Everything else (bundled defaults like "/hero3.jpg", full http(s)
//   URLs, data URIs) is left untouched.
//
// Every component that renders a land/hero/video image should go through
// this function instead of re-implementing the same check — that's what
// caused this to get fixed in one place but missed in others before.

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export function resolveMediaUrl(path) {
  if (!path || typeof path !== 'string') return path;
  const trimmed = path.trim();

  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('data:')
  ) {
    return trimmed;
  }

  const withLeadingSlash = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;

  if (trimmed.includes('upload')) {
    return `${API_URL}${withLeadingSlash}`;
  }

  return withLeadingSlash;
}