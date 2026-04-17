import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface PasswordGateProps {
  children: React.ReactNode;
}

export function PasswordGate({ children }: PasswordGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    
    setIsLoading(true);
    setError(false);

    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-97ba3c86/verify-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({ password })
      });

      const data = await response.json();

      if (data.valid) {
        setIsAuthenticated(true);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error('Password verification error:', err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {!isAuthenticated && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
          >
            <div className="w-full max-w-xs px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8 text-center"
              >
                <p className="text-sm font-light tracking-widest uppercase text-gray-500">
                  Protected Content
                </p>
              </motion.div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <motion.input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError(false);
                    }}
                    placeholder="Enter password"
                    className={`w-full border-b ${
                      error ? 'border-red-500' : 'border-gray-200'
                    } py-2 text-center text-xl font-light outline-none transition-colors focus:border-black placeholder:text-gray-300`}
                    autoFocus
                    disabled={isLoading}
                    animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  />
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex justify-center pt-4"
                >
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="text-xs font-medium uppercase tracking-widest text-gray-400 transition-colors hover:text-black disabled:opacity-50"
                  >
                    {isLoading ? 'Verifying...' : 'Enter'}
                  </button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isAuthenticated && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {children}
        </motion.div>
      )}
    </>
  );
}
