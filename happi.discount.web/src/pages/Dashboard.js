import { useSelector } from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import { logOut, loginCount } from "../redux/reducers/authReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { FaBars, FaBell } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { AnimatePresence, motion } from "framer-motion";
import { FaUserAlt, FaGamepad } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect, useRef } from "react";
import Spinner from "react-bootstrap/Spinner";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //console.log('++++++++++++++++++++++++++++++++ This is Dashboard Page ++++++++++++++++++++++++')
  const accessToken = useSelector((state) => state.auth.accessToken);
  const user_id = useSelector((state) => state.auth.user_id);
  const UserDetails = useSelector((state) => state.auth.UserDetails);
  const [isVisible, setIsVisible] = useState(false);
  const popupDivRef = useRef(null);
  const [loadingButton, setLoadingButton] = useState(false);
  const [profileObj, setProfile] = useState({
    "name": 'myProfile',
    "iframelink" : 'https://iipl.retool.com/embedded/public/baf8cae6-4248-4168-9f21-9f7adb71e5e1'
  })
  // console.log("user=========", user_id);
  // console.log("userData", UserDetails);
  const userLogout = () => {
    // event.preventDefault();
    setLoadingButton(true);
    setTimeout(() => {
      setLoadingButton(false);
      dispatch(logOut());
      navigate("/");
    }, 1000);
  };

  let storeArray = [
    {
      id: 1,
      icon: "https://assets.happimobiles.net/assets/media/login-icons/manager-discount.png",
      name: "Manager Discount",
    },
    {
      id: 2,
      icon: "https://assets.happimobiles.net/assets/media/login-icons/lost-sale.png",
      name: "Missed Customer",
    },
    {
      id: 3,
      icon: "https://assets.happimobiles.net/assets/media/login-icons/uniform.png",
      name: "Uniform",
    },
    {
      id: 4,
      icon: "https://assets.happimobiles.net/assets/media/login-icons/footfall.png",
      name: "Foot Fall",
    },
    {
      id: 5,
      icon: "https://assets.happimobiles.net/assets/media/login-icons/offer.png",
      name: "Cash Discount",
      iframelink:
        "https://iipl.retool.com/embedded/public/170258c5-85f6-4f18-932c-b00897943d2f",
    },
  ];

  let adminArray = [
    {
      id: 1,
      icon: "https://assets.happimobiles.net/assets/media/login-icons/manager-discount.png",
      name: "Manager Discount",
    },
    {
      id: 2,
      icon: "https://assets.happimobiles.net/assets/media/login-icons/lost-sale.png",
      name: "Missed Customer",
    },
    {
      id: 3,
      icon: "	https://assets.happimobiles.net/assets/media/login-icons/setting.png",
      name: "Settings",
      iframelink:
        "https://iipl.retool.com/embedded/public/346b264e-4c10-4c96-a5ea-1945e698293d",
    },
    {
      id: 4,
      icon: "https://assets.happimobiles.net/assets/media/login-icons/call-recording.png",
      name: "Call Record",
    },
    {
      id: 5,
      icon: "https://assets.happimobiles.net/assets/media/login-icons/uniform.png",
      name: "Uniform",
    },
    {
      id: 6,
      icon: "https://assets.happimobiles.net/assets/media/login-icons/footfall.png",
      name: "Foot Fall",
    },
    {
      id: 7,
      icon: "https://assets.happimobiles.net/assets/media/login-icons/marketing-coupon.png",
      name: "Marketing Promotor",
    },
    {
      id: 8,
      icon: "https://assets.happimobiles.net/assets/media/login-icons/report.png",
      name: "Report",
      iframelink: "https://iipl.retool.com/embedded/public/f14d7660-fb0f-4c14-834a-e552c3c51add"
    },
    {
      id: 9,
      icon: "https://assets.happimobiles.net/assets/media/login-icons/offer.png",
      name: "Cash Discount",
    },
    {
      id: 10,
      icon: "https://assets.happimobiles.net/assets/media/login-icons/eb_reading.png",
      name: "EB recording",
    },
    {
      id: 11,
      icon: "https://assets.happimobiles.net/assets/media/login-icons/report.png",
      name: "Employee Management App Logs",
      iframelink: "https://iipl.retool.com/embedded/public/60b0c128-0593-4b89-8e91-4db13f67982a"
    },
  ];

  // //Login Count API
  // useEffect(() => {
  //   let payload = {
  //     emp_id: UserDetails.emp_id,
  //     module: "happi-discount",
  //   };
  //   dispatch(loginCount(payload));
  // }, []);

  const navigateHandler = (value) => {
    if (value) {
      let customProp = value;
      navigate("/discount", { state: { customProp }, replace: true });
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        isVisible &&
        popupDivRef.current &&
        !popupDivRef.current.contains(event.target)
      ) {
        setIsVisible(false);
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener("click", handleOutsideClick);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isVisible]);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  return (
    <>
      <section className="dashboard">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-md-3">
              <div className="happi-logo">
                <a href="#">
                  <img
                    src="https://assets.happimobiles.net/assets/media/logo.png"
                    class="img-fluid"
                  />
                </a>
              </div>
            </div>
            <div className="col-md-7">
              <h1>Dashboard</h1>
            </div>
            <div className="col-md-2">
              <div className="d-flex justify-content-end align-items-center sign-out">
                <span className="d-flex align-self-center">Hi,</span>
                <span className="d-flex self-align-start justify-content-end">
                  {UserDetails?.name}
                </span>
                <div
                  className="d-flex align-items-center justify-content-center user-icon"
                  onClick={toggleVisibility}
                >
                  <FaUserAlt />
                </div>
              </div>
            </div>
          </div>
          <div className="row d-flex align-items-center justify-content-center mt-4 pt-5">
            <div className="col-11">
              <div class="dashboard-components">
                <div className="folded position-relative">
                  <h2>
                    <FaGamepad />
                    Store
                  </h2>
                </div>
                <div className="component-body">
                  <div className="row">
                    {storeArray?.map((item, index) => {
                      return (
                        <div className="col-md-2 col-sm-2 mb-5">
                          <div className="text-center component-content">
                            <div
                              className="component-body-icons"
                              onClick={() => navigateHandler(item)}
                            >
                              <img src={item.icon} />
                            </div>
                            <p>{item.name}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row d-flex align-items-center justify-content-center mt-4">
            <div className="col-11">
              <div class="dashboard-components">
                <div className="folded position-relative">
                  <h2>
                    <FaGamepad />
                    Admin
                  </h2>
                  <div className="component-body">
                    <div className="row">
                      {adminArray?.map((item, index) => {
                        return (
                          <div className="col-md-2 col-sm-2 mb-3">
                            <div className="text-center component-content">
                              <div
                                className="component-body-icons"
                                onClick={() => navigateHandler(item)}
                              >
                                <img src={item.icon} />
                              </div>
                              <p>{item.name}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {isVisible && (
        <div className="popup-div" ref={popupDivRef}>
          <div className="user-card-details">
            <div className="icon-name">
              <div className="avatar-name">
                <span>{UserDetails?.name[0]}</span>
              </div>
              <div className="name-user">{UserDetails?.name}</div>
            </div>
          </div>
          <div className="profile">
            <div className="icon-profile" onClick={() => navigateHandler(profileObj)}>
              <FaUserAlt className="icon-prof" />
              <div>
                <h6>
                  My Profile<span>Account settings and more</span>
                </h6>
              </div>
            </div>
            <div className="btn-logout">
              <button
                type="button"
                onClick={(e) => {
                  userLogout();
                  e.stopPropagation();
                }}
              >
                {loadingButton ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  <span> sign out </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;