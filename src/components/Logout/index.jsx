import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gapi, loadAuth2 } from "gapi-script";

const Logout = () => {
  const retour = useNavigate();
  const clientId =
    "921844704692-a5d8lqqg00nf3lqtls6mo1frkfi5jm02.apps.googleusercontent.com";
  useEffect(() => {
    const setAuth2 = async () => {
      const auth2 = await loadAuth2(
        gapi,
        clientId,
        "https://www.googleapis.com/auth/youtube.force-ssl"
      );
      if (auth2.isSignedIn.get()) {
        console.log(auth2.currentUser.get());
      }
    };
    setAuth2();
  }, []);

  return <></>;
};
export default Logout;
