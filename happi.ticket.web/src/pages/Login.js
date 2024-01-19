import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  validateUser,
  otpVerify,
  adminlogin,
  loginOtpVerify,
} from "../redux/reducers/authReducer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { InputGroup } from "react-bootstrap";
import {
  AiOutlineArrowLeft,
  AiFillEye,
  AiFillEyeInvisible,
} from "react-icons/ai";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordType, setPasswordType] = useState(true);
  const [otpForm, setOtpForm] = useState(false);
  const [loginOTP, setLoginOTP] = useState("");
  const [otpResent, setOtpResent] = useState(false);
  const userLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (loginOTP == "") {
      let payload = {
        mobile: username,
        // "password":password
      };
      dispatch(adminlogin(payload)).then((res) => {
        if (res.payload.status) {
          setOtpForm(true);
        }
        setLoading(false);
      });
    } else {
      let payload = {
        mobile: username,
        otp: loginOTP,
      };
      // console.log("payload",payload);
      dispatch(loginOtpVerify(payload)).then((res) => {
        // if(res.payload.status){
        //   setOtpForm(true)
        // }
        setLoading(false);
      });
    }
  };

  //Resend OTP
  const resendOtp = () => {
    if (!otpResent) {
      setLoading(true);
      let payload = {
        mobile: username,
      };
      dispatch(adminlogin(payload)).then((res) => {
        if (res.payload.status) {
          setOtpForm(true);
        }
        setLoading(false);
        setOtpResent(true);
      });
    }
  };

  return (
    <div
      className="login-page login-page2 d-flex align-item-center justify-content-center "
      style={{ display: "none" }}
    >
      <div className="container-fluid">
        <Row className="login-row d-flex align-item-center justify-content-center">
          <Col lg={5} className="login-col">
            <div className="login-form">
              <div className="login-card border-0 mt-5 mr-3 ml-3">
                <center>
                  <img
                    src="https://s3.ap-south-1.amazonaws.com/happimobiles/retool-upload/045db0e5-67ee-40e2-a7f4-fddbce95468e.png"
                    className="home-logo-image"
                  />
                </center>
              </div>
              <div className="loginform-card border-0">
                <center className="mt-4 mb-5">
                  <h1>Sign In</h1>
                </center>
                <Form className="mt-4" onSubmit={userLogin}>
                  <Form.Group className="formGroup mb-3" controlId="mobile">
                    {/* <Form.Label>EmployeeId <b>*</b></Form.Label> */}
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                      required
                      autoFocus
                      placeholder="Mobile Number*"
                    />
                  </Form.Group>

                  {/* <Form.Group className="formGroup" controlId="password">
                      <Form.Label>Password <b>*</b></Form.Label>
                      <InputGroup>
                        <Form.Control type={passwordType ? 'password' : 'text'} onChange={(e) => {setPassword(e.target.value);}} required/>
                        <InputGroup.Text id="inputGroupPrepend" onClick={() => setPasswordType(!passwordType)}>
                          {passwordType ? <AiFillEyeInvisible /> : <AiFillEye />}
                        </InputGroup.Text>
                      </InputGroup>
                    </Form.Group> */}
                  {otpForm && (
                    <Form.Group className="formGroup" controlId="otp">
                      <InputGroup>
                        <Form.Control
                          type={passwordType ? "password" : "number"}
                          onChange={(e) => {
                            setLoginOTP(e.target.value);
                          }}
                          required
                          placeholder="OTP *"
                          maxLength={6}
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
                    </Form.Group>
                  )}
                  <Form.Group className="formGroup mt-4">
                    <Row className="row d-flex align-item-center justify-content-end">
                      <Col className="col-12 mb-4">
                        <Button
                          variant="primary"
                          type="submit"
                          disabled={loading}
                          style={{ padding: "5px 15px !important" }}
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
                            <span> {otpForm ? "Login" : "Request OTP"} </span>
                          )}
                        </Button>
                      </Col>
                    </Row>
                  </Form.Group>
                  <span className="resend-text" onClick={resendOtp}>
                    {otpForm && !otpResent ? "Resend OTP" : ""}{" "}
                    {otpResent ? "OTP resent successfully" : ""}{" "}
                  </span>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
