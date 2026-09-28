
import { useState } from "react";
import logo1 from "./assets/logo1.jpeg";


function App() {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.error("Login error:", error);
  }
};
  return (
    
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800 flex items-center justify-center px-6">

      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-12 items-center">

        {/* Branding Section */}
        <div className="hidden md:block text-white">
          <div className="mb-6">
            <span className="text-blue-400 text-lg font-semibold">
              LankaTransit
            </span>
          </div>

          <h1 className="text-5xl font-bold leading-tight mb-6">
            Smarter journeys.
            <br />
            Better connections.
          </h1>

          <p className="text-slate-300 text-lg max-w-md leading-relaxed">
            Manage your transit experience with a simple and connected
            transportation platform.
          </p>
        </div>

        {/* Login Card */}
        <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-slate-200 p-8">



          <div className="mb-8">

            <img src={logo1} alt="LankaTransit Logo" className="w-20 h-20 object-contain mb-5"/>


            <h2 className="text-3xl font-bold text-slate-900">
              Welcome back
            </h2>

            <p className="text-slate-500 mt-2">
              Sign in to continue to LankaTransit
            </p>
          </div>

        <form onSubmit={handleLogin} className="space-y-5">

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>

              <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
/>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>

             <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
/>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-200"
            >
              Sign in
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}

export default App;