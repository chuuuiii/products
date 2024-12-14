import React from "react";

const Login = () => {
  return (
    <div
      className="flex flex-col items-center
     min-h-screen
     py-10 font-poppins"
    >
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl text-center mb-6">Log in</h1>
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
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
