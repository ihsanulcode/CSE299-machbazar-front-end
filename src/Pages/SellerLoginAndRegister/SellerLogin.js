import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import google from "../../assets/google.png";
import "../Login/Login.css";
import { GoogleAuthProvider } from "firebase/auth";
import FormInput from "../../components/FormInput";
import AllModal from "../../components/AllModal";

function SellerLogin() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [modalText, setModalText] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const { signIn, googleLogin, setSeller, resetPass } = useContext(AuthContext);
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathName || "/sellerHome";

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "text",
      placeholder: "Email",
      errorMessage: "Please enter a valid email address!",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "",
      required: true,
    },
  ];

  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;

    signIn(values.email, values.password)
      .then((res) => {
        const user = res.user;
        form.reset();
        setSeller(true);
        navigate(from, { replace: true });
        console.log(user);
      })
      .catch((e) => {
        console.error(e);
        setError("Wrong Email or Password. Please Try again!");
      });
  };

  const handleGoogleSignIn = () => {
    googleLogin(googleProvider)
      .then((res) => {
        const user = res.user;
        navigate("/sellerHome");
      })
      .catch((e) => console.log(e));
  };

  const handleForgotPass = () => {
    if (values.email === "") {
      setModalText("please enter your email");
      setModalShow(true);
      return;
    } else {
      resetPass(values.email)
        .then(() => {
          setModalText(
            "Password reset mail has been sent, please check your email."
          );
          setModalShow(true);
        })
        .catch((e) => console.log(e.message));
    }
  };

  return (
    <div className="form login my-4">
      <AllModal
        modalText={modalText}
        modalShow={modalShow}
        setModalShow={setModalShow}
      ></AllModal>
      <span className="title">Seller</span>
      <span className="title">Welcome Back!</span>
      <div className="log">
        <h5>Login to continue</h5>
      </div>

      <form onSubmit={handleLogin}>
        <div>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              handleOnChange={handleOnChange}
            />
          ))}
        </div>
        <a className="fs-6 m-0">
          {error ? (
            <p className="text-danger">
              {error}{" "}
              <button
                className="forgotbtn text-primary d-block"
                onClick={handleForgotPass}
              >
                forgot password?
              </button>
            </p>
          ) : (
            <button
              className=" forgotbtn text-primary "
              onClick={handleForgotPass}
            >
              forgot password?
            </button>
          )}
        </a>

        <div className="input-field">
          <button type="submit" className="button w-100 p-2 mt-0">
            log in
          </button>
        </div>
      </form>

      <div className="login-signup">
        <p className="text">
          Don't have an account?
          <Link to={"/register"} className="text signup-link ms-1">
            Signup Now!
          </Link>
          <h5>or login with</h5>
          <button
            className="btn btn-light border-primary w-100"
            onClick={handleGoogleSignIn}
          >
            <img src={google} style={{ width: "20px" }} className="me-2" />{" "}
            Google
          </button>
        </p>
      </div>
      <div className="text-center">
        <p>
          <Link to={"/login"}>or Login as Customer</Link>
        </p>
      </div>
    </div>
  );
}

export default SellerLogin;
