import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { TbLogout, TbHome } from "react-icons/tb";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { logOut } from "../redux/reducers/authReducer";
import { useNavigate } from "react-router-dom";

const Iframelinks = () => {
  const user_id = useSelector((state) => state.auth.user_id);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [customLink, setCustomLink] = useState();
  const [showlogout, setShowLogout] = useState(false);
  const [showloader, setShowLoader] = useState(false);
  useEffect(() => {
    if (
      location?.state?.customProp?.name == "Cash Discount" ||
      location?.state?.customProp?.name == "myProfile"
    ) {
      setCustomLink(location?.state?.customProp?.iframelink + `?id=${user_id}`);
    } else {
      setCustomLink(location?.state?.customProp?.iframelink);
    }
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setShowLoader(!showloader);
    }, 2000);
    setTimeout(() => {
      setShowLogout(!showlogout);
    }, 7000);
  }, []);
  // console.log("Custom Prop:", customLink);
  return (
    <>
      {showlogout && (
        <>
          <button className="home-button" onClick={() => navigate("/")}>
            <TbHome className="home-icon" />
          </button>
          <button
            className="logout-button"
            onClick={() => dispatch(logOut()).then(navigate("/"))}
          >
            <TbLogout />
            <span>Logout</span>
          </button>
        </>
      )}
      {!showloader ? (
        <div className="d-flex justify-content-center align-items-center">
          <span class="spinner">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
          </span>
        </div>
      ) : (
        <iframe
          title="Report Section"
          src={customLink}
          allowFullScreen={true}
        ></iframe>
      )}
    </>
  );
};

export default Iframelinks;
