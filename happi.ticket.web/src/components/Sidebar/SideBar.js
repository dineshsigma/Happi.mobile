import { NavLink } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from '../../redux/reducers/authReducer';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import { changeCurrentOrg, setToggleMenu } from '../../redux/reducers/authReducer'
import { FaTicketAlt } from "react-icons/fa";
import { FaNetworkWired, FaMapMarkerAlt, FaUserAlt, FaUnlock, FaUsers, FaUserTie, FaRegBuilding, FaRegIdBadge, FaRegUser, FaBuilding } from "react-icons/fa";
import HappiLogo from "../../assets/HappiLogo.png";

const routes = [
  
  {
    path: "/helptickets",
    name: "Help Tickets",
    icon: <FaTicketAlt />
   
  },
  {
    path: "/organizationbilling",
    name: "Organization Billing",
    icon: <FaRegBuilding />
   
  },
  {
    path: "/customermanagement",
    name: "Customer Management",
    icon: <FaRegBuilding />
   
  },
]
const SideBar = ({ children }) => {
  const isOpen = useSelector((state) => state.auth.toggleSideMenu)
  const toggle = () => dispatch(setToggleMenu(!isOpen))
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const userLogout = (event) => {
    event.preventDefault()
    dispatch(logOut())
    navigate('/')
  }
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


 
  
  const current_organization = useSelector((state) => state.auth.current_organization)
 
  const accessFor = useSelector((state) => state.auth.accessFor);
  useEffect(() => {
    // dispatch(getOrganizations(available_organizations))
    // dispatch(getUserNotificatinos(userDetails.id))
  }, [])


  const changeOrganization = (id) => {
    // console.log('changeOrganization', id)
    dispatch(changeCurrentOrg(id)).then((res) => {
      window.location.reload()
      
    })

  }

  function isAccess(name) {
    if (accessFor.includes(name)) {
      return true
    }
  }

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "400px" : "64px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}

        >

          <div className="top_section">

            {/* Changing the LOGO */}

            {isOpen ?
              <div><img src={HappiLogo} width='42px' onClick={() => navigate('/')} /></div> :
              <div className="logo_img"><img className="" src={HappiLogo} onClick={() => navigate('/')} /></div>}

            {/* {isOpen ? 
            <div><img src="https://cyepro.com/wp-content/uploads/2022/05/Cyepro-Logo-Web-Version-svg.svg" width='167px' onClick={() => navigate('/')} /></div> : 
            <div className="logo_img"><img className="" src={logo} onClick={() => navigate('/')} /></div>} */}
          </div>

          <section className="routes">
            {routes.map((route, index) => {
              //if (isAccess(route.name)) {
                if (route.subRoutes) {
                  return (
                    <SidebarMenu
                      key={index}
                      setIsOpen={() => dispatch(setToggleMenu(!isOpen))}
                      route={route}
                      showAnimation={showAnimation}
                      isOpen={isOpen}
                    />
                  );
                }

                return (
                  <NavLink
                    to={route.path}
                    key={index}
                    className="link"
                    activeclassname="side-active"
                  >
                    <div className="icon_svg">{route.icon}</div>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          variants={showAnimation}
                          initial="hidden"
                          animate="show"
                          exit="hidden"
                          className="link_text"
                        >
                          {route.name}
                        </motion.div>
                      )}
                    </AnimatePresence>


                  </NavLink>
                );
              //}
            })}
            <div class="bottom-nav link" onClick={(e) => userLogout(e)}>
              <div className="icon_svg"><TbLogout /> </div>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="link_text"
                  >
                    Logout
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>
        </motion.div>

        <main>

          {/* <Navbar className="nav-fix">
            <Container fluid>
              <Navbar.Brand><div className="bars">
                <FaBars onClick={toggle} />
              </div> </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
              </Navbar.Collapse>
              <Navbar.Collapse className="justify-content-end">
              <a variant="light" className="navbar-btn" onClick={() => setNotifications(!showNotification)}><MdOutlineNotificationsNone />
              <span class="notifi-indicator pulsate"></span>

</a>
              <a variant="light" className="navbar-btn" onClick={() => setAnnouncements(!showAnnouncements)}>
                <HiOutlineSpeakerphone />
                <span class="notifi-indicator pulsate"></span>
</a>

                <a onClick={() => setSwapOrg(!showSwapOrg)}>{
                    orgDetails && <Avatar className='nav-avatar' color='--br-danger' initials={orgDetails.name.substring(0, 2).toUpperCase()} />
                  }</a>
              </Navbar.Collapse>
            </Container>
          </Navbar> */}
          {children}

        </main>
        {/* 
        <Offcanvas show={showAnnouncements} onHide={() => setAnnouncements(!showAnnouncements)} placement='end'>
          <Offcanvas.Header closeButton >
            <Offcanvas.Title>Announcements</Offcanvas.Title>
          </Offcanvas.Header>
          <hr />
          <Offcanvas.Body>
         <Card className=" announcemnts-cards mt-3">
         <Card.Img  className="announcemnt-image text-center p-2" variant="top" src={announcemnetsimg}  />
      <Card.Body>
      <Card.Title className="an-card-title"> Announcements Title </Card.Title>
        <Card.Text className="an-card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
          
         </Card>
         <Card className=" announcemnts-cards mt-3">
      <Card.Body>
        <Card.Title className="an-card-title"> Announcements Title 2</Card.Title>
        <Card.Text className="an-card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
          
         </Card>
         
         
          </Offcanvas.Body>
        </Offcanvas> */}

        
      </div>
    </>
  );
};

export default SideBar;
