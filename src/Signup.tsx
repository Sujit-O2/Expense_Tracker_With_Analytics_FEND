import React, { useState } from 'react';
import { User, Mail, Lock, Phone, UserPlus, ArrowRight } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    MobNo: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Account created successfully!");
        window.location.href = "/login";
      } else {
        alert("Signup failed. Email might already exist.");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-white">
        
        {/* Decorative Header */}
        <div className="bg-indigo-600 p-10 text-center relative">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <UserPlus size={100} />
          </div>
          <h2 className="text-4xl font-black text-white tracking-tight">Join Us</h2>
          <p className="text-indigo-100 mt-2 font-medium">Start tracking your expenses like a pro</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-5">
          
          {/* Username Field */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 group-focus-within:text-indigo-500 transition-colors">
                  <User size={18} />
                </div>
                <input
                  name="userName"
                  type="text"
                  required
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border-2 border-gray-100 rounded-2xl bg-gray-50 focus:outline-none focus:ring-0 focus:border-indigo-500 focus:bg-white transition-all"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Mobile Number Field */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Mobile No</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 group-focus-within:text-indigo-500 transition-colors">
                  <Phone size={18} />
                </div>
                <input
                  name="MobNo"
                  type="text"
                  required
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border-2 border-gray-100 rounded-2xl bg-gray-50 focus:outline-none focus:ring-0 focus:border-indigo-500 focus:bg-white transition-all"
                  placeholder="+1 234..."
                />
              </div>
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 group-focus-within:text-indigo-500 transition-colors">
                <Mail size={18} />
              </div>
              <input
                name="email"
                type="email"
                required
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-3 border-2 border-gray-100 rounded-2xl bg-gray-50 focus:outline-none focus:ring-0 focus:border-indigo-500 focus:bg-white transition-all"
                placeholder="name@example.com"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Create Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 group-focus-within:text-indigo-500 transition-colors">
                <Lock size={18} />
              </div>
              <input
                name="password"
                type="password"
                required
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-3 border-2 border-gray-100 rounded-2xl bg-gray-50 focus:outline-none focus:ring-0 focus:border-indigo-500 focus:bg-white transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center py-4 px-4 rounded-2xl shadow-lg text-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-200 transition-all transform active:scale-[0.98] mt-4"
          >
            {loading ? 'Creating Account...' : 'Get Started'}
            {!loading && <ArrowRight className="ml-2" size={20} />}
          </button>
        </form>

        <div className="px-8 pb-10 text-center">
          <p className="text-gray-500 font-medium">
            Already have an account? 
            <a href="/login" className="ml-2 text-indigo-600 hover:text-indigo-800 font-bold underline underline-offset-4">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;