import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Approutes from './approutes/Approutes'

import Button from 'react-bootstrap/Button';
import { FaPlus } from "react-icons/fa";
import { useDispatch} from 'react-redux';

import { ToastContainer } from 'react-toastify';

function App() {
  //console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ App Loading')
 
  const dispatch = useDispatch()

  // const accessToken = localStorage.getItem('token')
  //console.log('login', accessToken)
  return (
    <BrowserRouter>
          <ToastContainer />
        <div>
          <Approutes />
          {/* {
            showAddform && <CreateTaskComponent />
          }
          {
            showTemplateAddform && <CreateTemplateTask />
          } */}
          {/* {accessToken &&
            <Button variant="primary" className="fab-btn"  onClick={() => dispatch(setTaskAddform(!showAddform))} ><FaPlus/></Button>
          } */}
        </div>
    </BrowserRouter>


  );
}

export default App;
