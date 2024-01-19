import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { FaBars, FaBell } from "react-icons/fa";
import { changeCurrentOrg, setToggleMenu } from '../redux/reducers/authReducer'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from '../redux/reducers/authReducer';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const isOpen = useSelector((state) => state.auth.toggleSideMenu)
  const toggle = () => dispatch(setToggleMenu(!isOpen))
  useEffect(() => {
  }, [])
  const userLogout = (event) => {
    event.preventDefault()
    dispatch(logOut())
    navigate('/')
  }
  return (
    <div>
      <Navbar className="nav-fix">
        <Container fluid>
          <Navbar.Brand>
            <div className="bars">
              <FaBars onClick={toggle} />
            </div>{" "}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <p className="link_text logout-btn" onClick={(e) => userLogout(e)}>
              Logout
            </p>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <p className="link_text logout-btn" onClick={(e) => userLogout(e)}>
        Logout
      </p> */}
    </div>
  );
}

export default Header