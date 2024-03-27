import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const path = "http://localhost:3000/auth/login";
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const login = async () => {
    console.log("Request received");
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    if (username !== "" && password !== "") {
      try {
        console.log("Sending request");
        let response = await axios.post(path, {
          username: username,
          password: password,
        });
        let data = await response.json();
        if (data.status === 200) {
          console.log("Login successful");
        }
      } catch (error) {
        console.log("An error occurred");
      }
      navigate("/");
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
          ref={usernameRef}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          className="rounded-lg p-2 mb-12"
          required
          ref={passwordRef}
        />
        <button
          type="button"
          className="btn btn-success text-2xl p-2"
          onClick={login}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
