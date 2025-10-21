import React, { useState } from 'react'
import { Link, useRouter } from '@tanstack/react-router'

const ErrorPage = ({ error, info, reset }) => {
  const isDevelopment = import.meta.env.VITE_NODE_ENV === "development"
  const [showError, setShowError] = useState(false)
  const router = useRouter()

  const handleReset = () => {
    if (reset) {
      reset()
    } else {
      router.navigate({ to: '/' })
    }
  }

  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="p-6 rounded-lg text-center">
          <div className='w-full text-center flex justify-center'>
            {/* Error Icon */}
            <svg width="150" height="150" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="80" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2"/>
              <path d="M70 70L130 130M130 70L70 130" stroke="#EF4444" strokeWidth="4" strokeLinecap="round"/>
            </svg>
          </div>

          <h1 className="text-4xl sm:text-5xl font-semibold text-center mb-2 mt-5 text-gray-800">
            Something went wrong
          </h1>
          
          <p className="text-center text-gray-600 lg:w-2/3 mx-auto text-sm mb-6">
            We encountered an unexpected error. Don't worry, our team has been notified.
          </p>

          {/* Error Details Toggle - Only show in development */}
          {isDevelopment && (
            <div className="mb-6">
              <button
                onClick={() => setShowError(!showError)}
                className="text-blue-600 hover:text-blue-800 underline text-sm"
              >
                {showError ? 'Hide Error Details' : 'Show Error Details'}
              </button>
            </div>
          )}

          {/* Error Details - Only show in development */}
          {isDevelopment && showError && error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold text-red-800 mb-2">Error Details:</h3>
              <div className="text-sm text-red-700 font-mono bg-red-100 p-3 rounded overflow-auto max-h-40">
                <div className="mb-2">
                  <strong>Message:</strong> {error.message || 'Unknown error'}
                </div>
                {error.stack && (
                  <div>
                    <strong>Stack Trace:</strong>
                    <pre className="whitespace-pre-wrap text-xs mt-1">{error.stack}</pre>
                  </div>
                )}
                {info?.componentStack && (
                  <div className="mt-2">
                    <strong>Component Stack:</strong>
                    <pre className="whitespace-pre-wrap text-xs mt-1">{info.componentStack}</pre>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <button
              onClick={handleReset}
              className="btn-primary px-6 py-3 rounded-md text-white text-sm hover:opacity-90 transition-opacity"
            >
              Try Again
            </button>
            
            <button
              onClick={handleRefresh}
              className="px-6 py-3 rounded-md border border-gray-300 text-gray-700 text-sm hover:bg-gray-50 transition-colors"
            >
              Refresh Page
            </button>
            
            <Link 
              to="/" 
              className="px-6 py-3 rounded-md text-blue-600 text-sm hover:text-blue-800 transition-colors"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage