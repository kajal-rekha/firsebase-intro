import { Route, Routes } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "./firebase/firebase.init";
import About from "./components/About";
import Home from "./components/Home";
import RequireAuth from "./components/RequireAuth";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import Profile from "./components/Profile";
import Register from "./components/Register";
import { useEffect, useState } from "react";
import RequireAuth2 from "./components/RequireAuth2";

const auth = getAuth(app);

const App = () => {
  const [user, setUser] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      if (data) {
        setUser(data);
      } else {
        //console.log("no user found");
      }
    });
  }, []);
  return (
    <div className="app">
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/profile"
          element={
            <RequireAuth user={user}>
              <Profile user={user} setUser={setUser} />
            </RequireAuth>
          }
        />
        <Route
          path="/login"
          element={
            <RequireAuth2 user={user}>
              <Login />
            </RequireAuth2>
          }
        />
        <Route
          path="/register"
          element={
            <RequireAuth2 user={user}>
              <Register />
            </RequireAuth2>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
