import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import { toast } from "react-toastify";

function SignUp() {
  const [showPassword, SetShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const naviagte = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      updateProfile(auth.currentUser, { displayName: name });

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);

      naviagte("/");
    } catch (error) {
      toast.error("Registration Error");
    }
  };
  return (
    <>
      <div className="m-3 m-lg-5">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>
        <main>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              className="nameInput shadow-sm border-0 rounded-pill mb-3"
              placeholder="Name"
              id="name"
              value={name}
              onChange={onChange}
            />

            <input
              type="email"
              // className="emailInput"
              className="emailInput shadow-sm border-0 rounded-pill mb-3"
              placeholder="Email"
              id="email"
              value={email}
              onChange={onChange}
            />
            <div className="passwordInputDiv">
              <input
                className="passwordInput shadow-sm border-0 rounded-pill mb-4"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={onChange}
              />
              <img
                src={visibilityIcon}
                alt="show password"
                className="showPassword"
                onClick={() => SetShowPassword(!showPassword)}
              />
            </div>
            <Link to="/forgot-password" className="forgotPasswordLink">
              Forgot Password
            </Link>
            <div className="signUpBar">
              <p className="signUpText">Sign Up</p>
              <button className="signUpButton mb-2 mx-3">
                <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
              </button>
            </div>
          </form>
          {/* google oauth */}
          <Link to="/sign-in" className="registerLink">
            Sign In Instead
          </Link>
        </main>
      </div>
    </>
  );
}

export default SignUp;
