import React, { useState } from "react";
import { authenticate, isAuthenticated, signin } from "../helper/auth";
import { Link, Redirect } from "react-router-dom";
const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    didRedirect: false,
  });

  const { email, password, didRedirect } = values;

  const [Msg, setMsg] = useState(false);
  const [noti, setNoti] = useState("");
  const handelChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const performRedirect = () => {
    window.location.reload(false);
    // console.log("isAuthen", isAuthenticated());
    if (isAuthenticated()) {
      window.location.replace("https://sss-frontend-007.vercel.app/");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    signin({ email, password })
      .then((data) => {
        if (data.err) {
          setNoti("Incorrect email or password");
          setValues({ ...values, email: "", password: "" });
        } else {
          authenticate(data, () => setMsg(true));
          // setMsg(true);
          // setValues({ ...values, didRedirect: true });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="">
      <div className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card bg-dark text-white"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-5 text-center">
                  <div className=" mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                    <p className="text-white-50 mb-5">
                      Please enter your login and password!
                    </p>

                    <div className="form-outline text-start form-white mb-4">
                      <label className="form-label ">Email</label>
                      <input
                        type="email"
                        id="typeEmailX"
                        onChange={handelChange("email")}
                        value={email}
                        className="form-control form-control-lg"
                      />
                    </div>

                    <div className="form-outline text-start form-white mb-4">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        id="typePasswordX"
                        onChange={handelChange("password")}
                        value={password}
                        className="form-control form-control-lg"
                      />
                    </div>

                    {/* <p className="small mb-5 pb-lg-2">
                      <a className="text-white-50" href="#!">
                        Forgot password?
                      </a>
                    </p> */}

                    <button
                      className="btn btn-outline-light btn-lg px-5"
                      type="submit"
                      onClick={onSubmit}
                    >
                      Login
                    </button>
                  </div>
                  <div className="h5 mb-4 text-capitalize text-danger">
                    {noti}{" "}
                  </div>
                  <div>
                    <p className="mb-0">
                      Don't have an account?{" "}
                      <Link to="/signup" className="text-white-50 fw-bold">
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>{Msg ? <div>{performRedirect()}</div> : ""}</div>
    </div>
  );
};

export default Signin;
