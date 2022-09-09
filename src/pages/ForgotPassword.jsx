import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets//svg/keyboardArrowRightIcon.svg";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Email Sent - Check Your Inbox");
      navigate("/sign-in");
    } catch (error) {
      toast.error("Failed sending reset email...");
    }
  };

  return (
    <div className="m-3 m-lg-5">
      <header>
        <p className="pageHeader mb-4">Forgot Password</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <input
            className="emailInput"
            type="email"
            placeholder="Email"
            id="email"
            value={email}
            onChange={onChange}
          />
          <Link className="forgotPasswordLink mt-3 me-2" to="/sign-in">
            Sign In
          </Link>

          <div className="signInBar mt-4">
            <div className="signInText">Send Reset Link</div>
            <button className="signInButton mx-3">
              <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default ForgotPassword;
