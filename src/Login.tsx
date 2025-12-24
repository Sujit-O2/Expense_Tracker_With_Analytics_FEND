import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, LogIn } from 'lucide-react';

const Login = () => {
  const [credentials, setCredentials] = useState({ name: '', Password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials:'include',
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        // const user = await response.json();
        // localStorage.setItem('user', JSON.stringify(user));
        window.location.href = "/dashboard";
      } else {
        alert("Invalid Credentials");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    // bg-linear is the new Tailwind 4.0 syntax for gradients
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-emerald-50 p-6">
      
      {/* Main Card */}
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-white p-8 space-y-8">
        
        {/* Logo / Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-2xl shadow-lg mb-4 transform -rotate-6">
            <LogIn className="text-white w-8 h-8" />
          </div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Welcome Back</h2>
          <p className="text-slate-500 font-medium">Please enter your details to sign in</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-600 transition-colors">
                <Mail size={18} />
              </div>
              <input
                name="name"
                type="email"
                required
                onChange={handleChange}
                className="block w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all duration-200 placeholder:text-slate-400"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-sm font-bold text-slate-700">Password</label>
              <a href="#" className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition">Forgot?</a>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-600 transition-colors">
                <Lock size={18} />
              </div>
              <input
                name="Password"
                type="password"
                required
                onChange={handleChange}
                className="block w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all duration-200 placeholder:text-slate-400"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center items-center py-4 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-bold rounded-2xl shadow-lg shadow-emerald-200 transition-all duration-200 transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Sign In <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center pt-4">
          <p className="text-slate-500 font-medium">
            Don't have an account? 
            <a href="/signup" className="ml-2 text-emerald-600 font-black hover:underline underline-offset-4 decoration-2">
              Create one
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;