import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Authorize() {
  function startOAuth(provider) {
    // Placeholder for real OAuth flow
    // Typically: window.location.href = `/api/auth/oauth/${provider}`
    alert(`OAuth with ${provider} not yet wired to backend`);
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Authorize with</h2>
      <div className="space-y-3">
        <button
          className="w-full inline-flex items-center justify-center gap-2 rounded px-4 py-2 bg-white text-slate-900 dark:bg-slate-800 dark:text-slate-100 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 hover:dark:bg-slate-700"
          onClick={() => startOAuth("google")}
        >
          <GoogleIcon /> Google
        </button>
        <button
          className="w-full inline-flex items-center justify-center gap-2 rounded px-4 py-2 bg-[#0a66c2] text-white hover:opacity-90"
          onClick={() => startOAuth("linkedin")}
        >
          <LinkedInIcon /> LinkedIn
        </button>
        <button
          className="w-full inline-flex items-center justify-center gap-2 rounded px-4 py-2 bg-black text-white hover:opacity-90"
          onClick={() => startOAuth("github")}
        >
          <GitHubIcon /> GitHub
        </button>
      </div>
    </div>
  );
}
