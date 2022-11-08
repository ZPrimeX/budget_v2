import GoogleLogin from "@leecheuk/react-google-login";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { googleSignup } from "../../redux/features/authSlice";
import { GOOGLE_CLOUD_ID } from "../../utils/lib";

const GoogleAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  const initGapi = async () => {
    const gapi = await import("gapi-script").then((pack) => pack.gapi);

    const initClient = () => {
      gapi.client.init({
        clientId: GOOGLE_CLOUD_ID,
      });
    };
    gapi.load("client:auth2", initClient);
    setReady(true);
  };

  useEffect(() => {
    initGapi();
  }, []);

  const onSuccess = (res) => {
    dispatch(googleSignup({ id_token: res.tokenId })).then(() => {
      router.push("/");
    });
  };

  const onFailure = (error) => {
    toast.error("Something went wrong");
  };

  return (
    <>
      {ready ? (
        <GoogleLogin
          clientId={GOOGLE_CLOUD_ID}
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          buttonText={"Google Account"}
          isSignedIn={true}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default GoogleAuth;
