import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FallbackErrorProps {
  error?: Error;
  resetErrorBoundary?: () => void;
}

export function FallbackError({ error, resetErrorBoundary }: FallbackErrorProps) {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl max-w-md w-full">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-red-900/30 p-3 rounded-full">
            <AlertTriangle className="h-8 w-8 text-red-400" />
          </div>
        </div>
        
        <h2 className="text-xl font-bold text-white text-center mb-4">
          Something went wrong
        </h2>
        
        {error && (
          <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50 mb-6 max-h-32 overflow-auto">
            <p className="text-sm text-red-300 font-mono">
              {error.toString()}
            </p>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          {resetErrorBoundary && (
            <button
              onClick={resetErrorBoundary}
              className="flex-1 flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Try Again</span>
            </button>
          )}
          
          <Link
            to="/"
            className="flex-1 flex items-center justify-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors"
            onClick={resetErrorBoundary}
          >
            <Home className="h-4 w-4" />
            <span>Go Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}