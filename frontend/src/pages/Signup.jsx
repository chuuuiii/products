import React from "react";
import useAuthStore from "../store/useAuthStore";

const Signup = () => {
  const { username, email, password, updateField, signup } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup();
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-10 font-poppins">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl text-center mb-6">Create Account</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label>Username</label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => updateField("username", e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => updateField("email", e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => updateField("password", e.target.value)}
              className="input input-bordered
              w-full"
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Sign up
          </button>
        </form>
        <p className="text-sm text-center text-gray-500 mt-4">
          Already have an account?
          <a href="/login" className="text-primary font-medium ml-2">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
