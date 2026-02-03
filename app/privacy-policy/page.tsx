import React from "react"

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-6">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-10 text-center">

        {/* Icon */}
        <div className="mx-auto mb-6 w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 11c.38 0 .7-.32.7-.7S12.38 9.6 12 9.6s-.7.32-.7.7.32.7.7.7zm0 1.5c-.5 0-.9.4-.9.9v3.5c0 .5.4.9.9.9s.9-.4.9-.9V13.4c0-.5-.4-.9-.9-.9z"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-slate-800 mb-3">
          Privacy Policy Update
        </h1>

        {/* Description */}
        <p className="text-slate-600 text-lg mb-6">
          We’re currently updating our privacy policy to make it more transparent,
          secure, and compliant with the latest regulations.
        </p>

        {/* Status Box */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-8">
          <p className="text-blue-700 font-medium">
            This update is being rolled out and will be live shortly.
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/"
            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Go back to Home
          </a>
        </div>

        {/* Footer note */}
        <p className="mt-8 text-sm text-slate-400">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  )
}
