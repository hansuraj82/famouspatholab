import React from "react";

/**
 * An industry-grade Error Boundary for React apps.
 * - Captures component tree crashes
 * - Logs error + stack trace
 * - Allows manual reset
 * - Prevents white screens in production
 * - Supports custom error reporting services (Sentry, LogRocket, etc.)
 */

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so fallback UI will render
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log to console (dev)
    console.error("🔥 Error Boundary Caught:", error, errorInfo);

    // Store error for UI
    this.setState({ errorInfo });

    // OPTIONAL: send to error logging service
    // sendErrorToServer({ error, errorInfo });
  }

  handleReset = () => {
    // Reset boundary to normal state
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
          <div className="bg-white shadow-lg rounded-xl p-8 max-w-xl w-full text-center border">
            <h2 className="text-2xl font-bold text-red-600 mb-3">
              Something went wrong
            </h2>

            <p className="text-gray-700 mb-4">
              The application encountered an unexpected error.  
              Try reloading the page.
            </p>

            {/* Error message */}
            <pre className="bg-gray-100 text-left p-3 rounded border text-sm max-h-40 overflow-auto mb-4">
              {String(this.state.error)}
            </pre>

            {/* Stack Trace */}
            {this.state.errorInfo && (
              <details className="text-left text-sm bg-gray-100 p-3 rounded border max-h-48 overflow-auto mb-4">
                <summary className="cursor-pointer font-semibold">
                  Technical Details
                </summary>
                <pre className="whitespace-pre-wrap mt-2">
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}

            <div className="flex justify-center gap-4">
              <button
                onClick={this.handleReset}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg"
              >
                Reset
              </button>

              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
              >
                Reload App
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
