import { Route, Routes } from "react-router-dom";
import SideBar from "../components/Sidebar/SideBar";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import { useSelector } from "react-redux";
import Header from '../components/Header'

// Happi Admin new file imports 
//cyecom  Admin Ui

const Approutes = () => {
    const accessToken = useSelector((state) => state.auth.accessToken);
    console.log("accessToken",accessToken);
    return (<div>
            {accessToken ?
                <>
                    {/* <SideBar> */}
                        <section>
                        {/* <Header/> */}
                            <Routes>
                                <Route path="/" element={< Dashboard />}/>
                            </Routes>
                        </section>

                    {/* </SideBar> */}
                </> : <>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="*" element={<> not found</>} />
                    </Routes>
                </>
            }


    </div>)
}

export default Approutes;