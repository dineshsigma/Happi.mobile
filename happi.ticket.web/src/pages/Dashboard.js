import { useSelector } from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import { logOut, loginCount } from "../redux/reducers/authReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { FaBars, FaBell } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //console.log('++++++++++++++++++++++++++++++++ This is Dashboard Page ++++++++++++++++++++++++')
  const accessToken = useSelector((state) => state.auth.accessToken);
  const user_id = useSelector((state) => state.auth.user_id);
  // const emp_id = useSelector((state) => state.auth.emp_id);
  // //Emplyee Login Count
  // useEffect(() =>{
  //   let countPayload = {
  //       emp_id: emp_id,
  //       module: "happi-ticket-management",
  //     };
  //     dispatch(loginCount(countPayload));
  // }, [])
  // console.log("user=========", user_id);
  const userLogout = (event) => {
    event.preventDefault();
    dispatch(logOut());
    navigate("/");
  };
  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };
  return (
    <>
      {/* <div className="title">dashboard</div> */}
      {/* <div>
        <Navbar className="nav-fix">
          <Container fluid>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
              <p className="link_text logout-btn" onClick={(e) => userLogout(e)}>
                Logout
              </p>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div> */}
      {/* <p style={{"text-align":"end","margin":0}} onClick={(e) => userLogout(e)}>
        Logout
      </p> */}

      <iframe
        src={`https://iipl.retool.com/embedded/public/e1ac9e18-d759-4146-b004-0f19dec4b8c6?user_id=${user_id}`}
        className="iframe-style"
      ></iframe>
      <div
        style={{
          position: "relative",
          bottom: "80px",
          left: "19px",
          color: "white",
          cursor: "pointer",
          width:"16%",
          display:"inline-block"
        }}
        onClick={userLogout}
      >
        <AnimatePresence>
          {true && (
            <motion.div
              variants={showAnimation}
              initial="hidden"
              animate="show"
              exit="hidden"
            >
              <span style={{ "margin-right": "5px" }}>
                <TbLogout />
              </span>
              Logout
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Dashboard;
