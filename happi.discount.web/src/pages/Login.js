import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  adminlogin,
  OtpRequest,
  verifyOTP,
  changePassword,
  loginVerifyOTP
} from "../redux/reducers/authReducer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { InputGroup } from "react-bootstrap";
import {
  AiOutlineArrowLeft,
  AiFillEye,
  AiFillEyeInvisible,
} from "react-icons/ai";
import rajsthanlogo from "../assets/rajasthanlogo.jpg";
import happilogo1 from "../assets/happilogo1.png";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.user_id);
  const [username, setUsername] = useState("");
  const [mobileNum, setMobileNum] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordType, setPasswordType] = useState(true);
  const [forgot, setForgot] = useState(false);
  const [passwordOtp, setPasswordOtp] = useState("");
  const [otpSuccess, setOtpSuccess] = useState(false);
  const [passwordChange, setPasswordChange] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resent, setResent] = useState(false);
  const [newPasswordType, setNewPasswordType] = useState(true);
  const [confirmPasswordType, setConfirmPasswordType] = useState(true);
  const [otpType, setOtpType] = useState(true);
  const [loginOTPResend, setLoginOTPResend] = useState(false);
  const [loginOTP, setLoginOTP] = useState(false);

  //Login Function
  const userLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    // console.log("username", username);
    // console.log("password", password);
    let payload = {
      emp_id: username,
      mobile: mobileNum,
    };
    dispatch(adminlogin(payload)).then((res) => {
      setLoading(false);
      if(res.payload.success){
        setLoginOTP(true);
      }
    });
  };

  //LOGIN OTP VERIFY
  const userLoginOTPVerify = async (event) => {
    event.preventDefault();
    setLoading(true);
    // console.log("username", username);
    // console.log("password", password);
    // console.log("password", passwordOtp);
    let payload = {
      mobile: mobileNum,
      otp: passwordOtp
    };
    dispatch(loginVerifyOTP(payload)).then((res) => {
      setLoading(false);
    });
  };

  // Resend Login OTP
  useEffect(() => {
    if (loginOTPResend == true) {
      setLoading(true);
      let payload = {
        emp_id: username,
        mobile: mobileNum,
      };
      dispatch(adminlogin(payload)).then((res) => {
        setLoading(false);
      });
    }
  }, [loginOTPResend]);

  //OTP request for Forgot Password
  const OTPRequest = async (event) => {
    event.preventDefault();
    setLoading(true);
    let payload = {};
    if (!otpSuccess) {
      payload = {
        mobile: mobileNum,
      };
      dispatch(OtpRequest(payload)).then((res) => {
        if (res.payload.status) {
          setLoading(false);
          setOtpSuccess(true);
        } else {
          setLoading(false);
        }
      });
    } else {
      payload = {
        mobile: mobileNum,
        otp: passwordOtp,
      };
      dispatch(verifyOTP(payload)).then((res) => {
        if (res.payload.status) {
          setLoading(false);
          setPasswordChange(true);
        } else {
          setLoading(false);
        }
      });
    }
  };
  //Change Password
  const updatePassword = async (event) => {
    event.preventDefault();
    setLoading(true);
    let payload = {
      id: userId,
      newpassword: newPassword,
      confirmpassword: confirmPassword,
    };
    dispatch(changePassword(payload)).then((res) => {
      if (res.payload.status) {
        setLoading(false);
        setForgot(false);
        setPasswordChange(false);
        setPassword("");
        setPasswordOtp("");
        setNewPassword("");
        setConfirmPassword("");
        setUsername("");
        setMobileNum("");
        setResent(false);
        setOtpSuccess(false);
      } else {
        setLoading(false);
      }
    });
  };
  //Resend OTP
  const resendOTP = (e) => {
    setLoading(true);
    let payload = {
      mobile: mobileNum,
    };
    dispatch(OtpRequest(payload)).then((res) => {
      if (res.payload.status) {
        setLoading(false);
        setResent(true);
      } else {
        setLoading(false);
      }
    });
  };
  //Go back to login
  const goBack = (e) => {
    e.preventDefault();
    window.location.reload();
  };

  return (
    <div
      className="login-page login-page2 d-flex align-item-center justify-content-center "
      style={{ display: "none" }}
    >
      <div className="container-fluid">
        <Row className="login-row d-flex align-item-center justify-content-center">
          <Col lg={4} className="login-col">
            <div className="login-form">
              <div className="login-card border-0 mt-5 mr-3 ml-3">
                {!forgot && (
                  <center>
                    <img src={happilogo1} className="home-logo-image" />
                    {/* <img src='https://s3.ap-south-1.amazonaws.com/happimobiles/retool-upload/045db0e5-67ee-40e2-a7f4-fddbce95468e.png' className="home-logo-image" /> */}
                  </center>
                )}
              </div>
              <div className="loginform-card border-0">
                {(forgot || passwordChange) && (
                  <button className="goback rounded p-2 mt-3" onClick={goBack}>
                    Go back to login
                  </button>
                )}
                <center className="mt-5 mb-5">
                  <h1 style={{ fontSize: "28px" }}>
                    {!forgot
                      ? "Login"
                      : !passwordChange
                      ? "Forgot Password"
                      : "Change Password"}
                  </h1>
                  <h5 className="mt-3 mb-5">
                    {!forgot && "Welcome to Happi Mobiles !!"}
                  </h5>
                </center>
                {!forgot ? (
                  !loginOTP ? <>
                    <Form
                      className="mt-4"
                      onSubmit={userLogin}
                      autocomplete="off"
                    >
                      <Form.Group
                        className="formGroup mb-3"
                        controlId="empId"
                        style={{ textAlign: "left" }}
                      >
                        <Form.Control
                          type="text"
                          value={username}
                          onChange={(e) => {
                            setUsername(e.target.value.toUpperCase());
                          }}
                          placeholder="Employee Id*"
                          required
                          autoFocus
                        />
                      </Form.Group>

                      <Form.Group
                        className="formGroup mb-3"
                        controlId="mobileNum"
                        style={{ textAlign: "left" }}
                      >
                        <Form.Control
                          type="number"
                          value={mobileNum}
                          onChange={(e) => {
                            setMobileNum(e.target.value);
                          }}
                          placeholder="Mobile Number*"
                          required
                          autoFocus
                          maxLength={10}
                        />
                      </Form.Group>
                      {/* <Form.Group
                        className="formGroup"
                        controlId="password"
                        style={{ textAlign: "left" }}
                      >
                        <InputGroup>
                          <Form.Control
                            type={passwordType ? "password" : "text"}
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                            required
                            placeholder="Password*"
                          />
                          <InputGroup.Text
                            id="inputGroupPrepend"
                            onClick={() => setPasswordType(!passwordType)}
                          >
                            {passwordType ? (
                              <AiFillEyeInvisible />
                            ) : (
                              <AiFillEye />
                            )}
                          </InputGroup.Text>
                        </InputGroup>
                      </Form.Group> */}
                      <Form.Group className="formGroup mt-4">
                        <Row className="row d-flex align-item-center justify-content-end">
                          <Col className="col-12 mb-4 mt-2">
                            <Button
                              // variant="primary"
                              type="submit"
                              disabled={loading}
                              style={{ padding: "5px 15px !important" }}
                              className="login-button"
                            >
                              {loading ? (
                                <Spinner
                                  as="span"
                                  animation="border"
                                  size="md"
                                  role="status"
                                  aria-hidden="true"
                                />
                              ) : (
                                <span style={{ textTransform: "uppercase" }}>
                                  {" "}
                                  Sign in{" "}
                                </span>
                              )}
                            </Button>
                          </Col>
                        </Row>
                      </Form.Group>
                    </Form>
                    <a className="forgot" onClick={() => setForgot(true)}>
                      Forgot Password ?
                    </a>
                  </> : <>
                  <Form
                      className="mt-4"
                      onSubmit={userLoginOTPVerify}
                      autocomplete="off"
                    >
                  <Form.Group
                          className="formGroup"
                          controlId="passwordOtp"
                          style={{ textAlign: "left" }}
                        >
                          <InputGroup>
                            <Form.Control
                              type={otpType ? "password" : "number"}
                              onChange={(e) => {
                                setPasswordOtp(e.target.value);
                              }}
                              required
                              placeholder="OTP*"
                              maxLength={6}
                            />
                            <InputGroup.Text
                              id="inputGroupPrepend"
                              onClick={() => setOtpType(!otpType)}
                            >
                              {passwordType ? (
                                <AiFillEyeInvisible />
                              ) : (
                                <AiFillEye />
                              )}
                            </InputGroup.Text>
                          </InputGroup>
                        </Form.Group>
                        <Form.Group className="formGroup mt-4">
                        <Row className="row d-flex align-item-center justify-content-end">
                          <Col className="col-12 mb-4 mt-2">
                            <Button
                              // variant="primary"
                              type="submit"
                              disabled={loading}
                              style={{ padding: "5px 15px !important" }}
                              className="login-button"
                            >
                              {loading ? (
                                <Spinner
                                  as="span"
                                  animation="border"
                                  size="md"
                                  role="status"
                                  aria-hidden="true"
                                />
                              ) : (
                                <span style={{ textTransform: "uppercase" }}>
                                  {" "}
                                  Submit{" "}
                                </span>
                              )}
                            </Button>
                          </Col>
                        </Row>
                      </Form.Group>
                        </Form>
                        <a className="forgot" onClick={() => setLoginOTPResend(true)}>
                      {loginOTPResend ? "OTP Resent Successfully" : "Resend OTP"}
                    </a>
                        </>
                ) : !passwordChange ? (
                  <>
                    <Form
                      className="mt-4"
                      onSubmit={OTPRequest}
                      autocomplete="off"
                    >
                      <Form.Group
                        className="formGroup mb-3"
                        controlId="mobile"
                        style={{ textAlign: "left" }}
                      >
                        <Form.Control
                          type="number"
                          value={mobileNum}
                          onChange={(e) => {
                            setMobileNum(e.target.value);
                          }}
                          required
                          autoFocus
                          placeholder="Enter Mobile Number*"
                        />
                      </Form.Group>

                      {otpSuccess && (
                        <Form.Group
                          className="formGroup"
                          controlId="passwordOtp"
                          style={{ textAlign: "left" }}
                        >
                          <InputGroup>
                            <Form.Control
                              type={otpType ? "password" : "text"}
                              onChange={(e) => {
                                setPasswordOtp(e.target.value);
                              }}
                              required
                              placeholder="OTP*"
                            />
                            <InputGroup.Text
                              id="inputGroupPrepend"
                              onClick={() => setOtpType(!otpType)}
                            >
                              {passwordType ? (
                                <AiFillEyeInvisible />
                              ) : (
                                <AiFillEye />
                              )}
                            </InputGroup.Text>
                          </InputGroup>
                        </Form.Group>
                      )}
                      <Form.Group className="formGroup mt-4">
                        <Row className="row d-flex align-item-center justify-content-end">
                          <Col className="col-12 mb-4 mt-2">
                            <Button
                              // variant="primary"
                              type="submit"
                              disabled={loading}
                              style={{ padding: "5px 15px !important" }}
                              className="login-button"
                            >
                              {loading ? (
                                <Spinner
                                  as="span"
                                  animation="border"
                                  size="md"
                                  role="status"
                                  aria-hidden="true"
                                />
                              ) : (
                                <span>
                                  {" "}
                                  {otpSuccess ? "Verify OTP" : "Request OTP"}
                                </span>
                              )}
                            </Button>
                          </Col>
                        </Row>
                      </Form.Group>
                    </Form>
                    {otpSuccess && (
                      <a
                        className="forgot"
                        onClick={!resent ? resendOTP : null}
                      >
                        {resent ? "OTP resent successfully" : "Resend OTP"}
                      </a>
                    )}
                  </>
                ) : (
                  <Form className="mt-4" onSubmit={updatePassword}>
                    <Form.Group
                      className="formGroup"
                      controlId="newpassword"
                      style={{ textAlign: "left" }}
                    >
                      <InputGroup>
                        <Form.Control
                          type={newPasswordType ? "password" : "text"}
                          onChange={(e) => {
                            setNewPassword(e.target.value);
                          }}
                          value={newPassword}
                          required
                          autoFocus
                          placeholder="New Password*"
                        />
                        <InputGroup.Text
                          id="inputGroupPrepend"
                          onClick={() => setNewPasswordType(!newPasswordType)}
                        >
                          {passwordType ? (
                            <AiFillEyeInvisible />
                          ) : (
                            <AiFillEye />
                          )}
                        </InputGroup.Text>
                      </InputGroup>
                    </Form.Group>

                    <Form.Group
                      className="formGroup mt-2"
                      controlId="confirmpassword"
                      style={{ textAlign: "left" }}
                    >
                      <InputGroup>
                        <Form.Control
                          type={confirmPasswordType ? "password" : "text"}
                          onChange={(e) => {
                            setConfirmPassword(e.target.value);
                          }}
                          value={confirmPassword}
                          required
                          placeholder="Confirm Password*"
                        />
                        <InputGroup.Text
                          id="inputGroupPrepend"
                          onClick={() =>
                            setConfirmPasswordType(!confirmPasswordType)
                          }
                        >
                          {passwordType ? (
                            <AiFillEyeInvisible />
                          ) : (
                            <AiFillEye />
                          )}
                        </InputGroup.Text>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group className="formGroup mt-4">
                      <Row className="row d-flex align-item-center justify-content-end">
                        <Col className="col-12 mb-4 mt-2">
                          <Button
                            // variant="primary"
                            type="submit"
                            disabled={loading}
                            style={{ padding: "5px 15px !important" }}
                            className="login-button"
                          >
                            {loading ? (
                              <Spinner
                                as="span"
                                animation="border"
                                size="md"
                                role="status"
                                aria-hidden="true"
                              />
                            ) : (
                              <span> Update Password </span>
                            )}
                          </Button>
                        </Col>
                      </Row>
                    </Form.Group>
                  </Form>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
