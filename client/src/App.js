import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {Chat} from './components/Chat';
import {Register} from './components/Register';
import {Login} from './components/Login'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';



function App() {

  const notify = (error,message) => {
    if(error===true)
      toast.error(message)
    else if(error==="warn")
      toast.warn(message)
    else
      toast.success(message)
  };
  return (
    <>
    <ToastContainer/>
    <Router>
      <Routes>
        <Route exact path="/" element={<Chat/>}></Route>
        <Route exact path="/register" element={<Register notify={notify}/>}></Route>
        <Route exact path="/login" element={<Login notify={notify}/>}></Route>
      </Routes>

    </Router>
    </>
  );
}

export default App;
