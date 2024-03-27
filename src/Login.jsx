import axios from "axios";
import { useState } from "react";

const Login = () => {
  const path = "http://localhost:3000/auth/login";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    console.log("Request received");
    if (username !== "" && password !== "") {
      e.preventDefault();
      try {
        let response = await axios.post(path, {
          username: username,
          password: password,
        });
        let data = await response.json();
        if (data.status === 200) {
          console.log("Login successful");
          alert("Login successful");
        }
      } catch (error) {
        console.log("An error occurred");
        alert("Login failed");
      }
    }
  };
  return (
    <div className="h-screen w-full p-8 flex flex-col justify-center items-center bg-neutral-600 text-white">
      <h1 className="text-6xl">Login</h1>
      <form
        className="flex flex-col w-4/5 max-w-[40rem] text-2xl"
        method="post"
        action={path}
      >
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          className="rounded-lg p-2 mb-4"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          className="rounded-lg p-2 mb-12"
          required
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          type="submit"
          className="btn btn-success text-2xl p-2"
          onSubmit={(e) => {
            login(e);
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
