import React, { useState } from 'react'

const TestError = () => {
  const [shouldError, setShouldError] = useState(false)

  if (shouldError) {
    throw new Error('This is a test error for the error boundary!')
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Error Testing Page</h1>
      <p className="mb-4">Click the button below to trigger an error:</p>
      <button
        onClick={() => setShouldError(true)}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Trigger Error
      </button>
    </div>
  )
}

export default TestError