import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import app from "../firebase/firebase.init";

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const auth = getAuth(app);

const Register = ({ user, setUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    //sign up a new user
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        if (result.user) {
          //update username
          updateUserProfile();
          console.log("will update");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });

    // reset inputs
    setName("");
    setEmail("");
    setPassword("");
  };

  const updateUserProfile = () => {
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL:
        "https://shotkit.com/wp-content/uploads/2021/06/cool-profile-pic-matheus-ferrero.jpeg",
    })
      .then(() => {
        console.log("profile update");
        setUser({ ...user, displayName: name });
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="register flex justify-center mt-10">
      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-3 items-start mt-5"
      >
        <div className="form-control flex flex-col gap-2">
          <label htmlFor="full-name">Full name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="full-name"
            placeholder="Enter your full name"
            required
            className="border py-3 px-5 rounded-md w-[20rem]"
          />
        </div>
        <div className="form-control flex flex-col gap-2">
          <label htmlFor="email">Email address</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            id="email"
            placeholder="Enter your email"
            required
            className="border py-3 px-5 rounded-md w-[20rem]"
          />
        </div>
        <div className="form-control flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            placeholder="Enter your password"
            required
            className="border py-3 px-5 rounded-md w-[20rem]"
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="bg-sky-500 w-[20rem] py-3 text-white font-medium rounded-md hover:bg-sky-600 duration-300 cursor-pointer mt-3"
        />{" "}
        <p>
          Already have an account?{" "}
          <Link to="/login" className="text-sky-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
