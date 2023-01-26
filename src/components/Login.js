import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import app from "../firebase/firebase.init";

const auth = getAuth(app);
const providerGoogle = new GoogleAuthProvider();

const Login = () => {
  const navigate = useNavigate();
  //google log in system
  const handleGoogleLogin = () => {
    signInWithPopup(auth, providerGoogle)
      .then((data) => {
        console.log(data.user);
      })
      .catch((error) => {
        console.log(error);
        navigate("/profile");
      });
  };
  return (
    <div className="login container mx-auto py-10">
      <h2 className="section-title text-center text-4xl text-gray-500 mb-10">
        Login
      </h2>
      <div className="login-platforms flex flex-col gap-5 items-center">
        <button
          onClick={handleGoogleLogin}
          className="google-sign-in bg-gray-700 text-white h-14 w-96 rounded-md font-medium hover:bg-orange-500 duration-300"
        >
          Log in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
