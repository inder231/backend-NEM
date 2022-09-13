import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
const App = () => {
  const [fullname, setFullname] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const registered = {
      fullname,
      username,
      email,
      password,
    };
    console.log(registered);
    axios
      .post("http://localhost:8000/app/signup", registered)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    setFullname("");
    setUserName("");
    setEmail("");
    setPassword("");
  };
  return (
    <div>
      <div className="container">
        <div className="form-div">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="form-control form-group"
            />
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="form-control form-group"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control form-group"
            />
            <input
              type="text"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control form-group"
            />
            <input
              type="submit"
              className="btn btn-danger btn-block"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
