import React from "react";

const Signup = () => {
  return (
    <div className="flex flex-col items-center min-h-screen py-10 font-poppins">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl text-center mb-6">Create Account</h1>
        <form className="space-y-4">
          <div className="form-control">
            <label>Username</label>
            <input
              type="text"
              placeholder="Username"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
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
