import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_BASE_URL = process.env.REACT_APP_API_BACKEND_BASEURL;

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    if (err) setErr("");
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    if (err) setErr("");

    setPassword(e.target.value);
  };

  const handleNameChanges = (e) => {
    if (err) setErr("");

    setName(e.target.value);
  };

  const handleSubmit = async () => {
    if (!name) {
      alert("User Name is required");
      return;
    }
    if (!email) {
      alert("Email is required");
      return;
    }
    if (!password) {
      alert("Password is required");
      return;
    }

    const payload = {
      name,
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
        `${API_BASE_URL}/api/auth/signup`,
        payload,
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
    } catch (error) {
      if (error.response?.data) {
        setErr(error.response.data.error);
        return;
      }
      console.error(error);
      setErr(error.message);
    }
  };

  return (
    <>
      <div className="d-flex  flex-row justify-content-center">
        <div
          className="card w-40"
          style={{
            marginTop: "10rem",
          }}
        >
          <div className="card-body">
            <h5 className="card-title">Signup</h5>

            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={handleNameChanges}
                placeholder="User Name"
              />
            </div>

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
                placeholder="********"
              />
            </div>
            {err && (
              <div className="alert alert-danger" role="alert">
                {err}
              </div>
            )}
            <button
              onClick={handleSubmit}
              className="btn btn-primary me-5 mt-4"
            >
              Submit
            </button>
            <a className="btn btn-primary ms-5 mt-4" href="/signin">
              SignIn
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
export default SignUp;
