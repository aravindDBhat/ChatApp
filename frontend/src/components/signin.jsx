import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_BACKEND_BASEURL;
function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    if (error) setError("");
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    if (error) setError("");
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    if (!email) {
      alert("Email is required!");
      return;
    }
    if (!password) {
      alert("Password is required!");
      return;
    }
    const signInData = {
      email,
      password,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data: response } = await axios.post(
        `${API_BASE_URL}/api/auth/signin`,
        signInData,
        config
      );
      if (!response) {
        alert("Something went wrong. Please try again");
        return;
      }

      const token = response.data.jwt;
      const user = response.data.user;
      window.localStorage.setItem("token", token);
      window.localStorage.setItem("user", JSON.stringify(user));
      navigate("/text");
    } catch (err) {
      if (err.response?.data) {
        setError(err.response.data.msg);
        console.error(err.response.data);
        return;
      }
      console.error(err);
      setError(err.message);
    }
  };
  return (
    <>
      <div className="bg-info d-flex  flex-row justify-content-center">
        <div
          className="card"
          style={{
            marginTop: "10rem",
          }}
        >
          <div className="bg-info-subtle card-body">
            <h5 className="card-title">Signin</h5>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="form-control"
                placeholder="name@example.com"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Password"
              />
            </div>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <button
              onClick={handleSubmit}
              className="btn btn-primary  me-5 mt-4"
            >
              Submit
            </button>
            <a href="/signup">
              <button className="btn btn-primary  ms-5 mt-4">SignUp</button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
export default SignIn;
