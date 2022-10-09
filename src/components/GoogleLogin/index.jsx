import React, { useEffect } from "react";
import { gapi, loadAuth2 } from "gapi-script";
import { useNavigate } from "react-router-dom";

import "./style.css";

const SignIn = () => {
  const clientId =
    "921844704692-a5d8lqqg00nf3lqtls6mo1frkfi5jm02.apps.googleusercontent.com";

  const Navigate = useNavigate();

  useEffect(() => {
    const setAuth2 = async () => {
      const auth2 = await loadAuth2(
        gapi,
        clientId,
        "https://www.googleapis.com/auth/youtube.force-ssl"
      );
      if (auth2.isSignedIn.get()) {
        //auth2.signOut();
        updateUser(auth2.currentUser.get());
      } else {
        attachSignin(document.getElementById("started"), auth2);
      }
    };
    setAuth2();
  }, []);
  const attachSignin = (element, auth2) => {
    auth2.attachClickHandler(
      element,
      {},
      (googleUser) => {
        updateUser(googleUser);
      },
      (error) => {
        console.log(JSON.stringify(error));
      }
    );
  };
  const updateUser = (user) => {
    console.log(user.xc.access_token);
    localStorage.setItem("token", user.xc.access_token);
    Navigate("/userAuth");
  };
  return (
    <div className="all">
      <div class="container">
        <div class="row">
          <div class="col-lg-10 col-xl-9 mx-auto">
            <div class="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
              <div class="card-img-left d-none d-md-flex"></div>
              <div class="card-body p-4 p-sm-5">
                <h5 class="card-title text-center mb-5 fw-light fs-5">
                  The Victory
                </h5>
                <form>
                  <div class="form-floating mb-3">
                    <input
                      type="email"
                      class="form-control"
                      id="floatingInputEmail"
                      placeholder="name@example.com"
                    />
                    <label for="floatingInputEmail">Email address</label>
                  </div>

                  <hr />

                  <div class="form-floating mb-3">
                    <input
                      type="password"
                      class="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                    />
                    <label for="floatingPassword">Password</label>
                  </div>

                  <a class="d-block text-center mt-2 small" href="#">
                    Have an account? Sign In
                  </a>

                  <hr class="my-4" />

                  <div
                    id="started"
                    className="btn btn-danger d-block text-center"
                  >
                    Sign in with Google
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
