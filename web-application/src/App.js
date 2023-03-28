
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
 import SignUp from './components/Signup/SignUp';
import SignIn from './components/SignIn/SignIn';
import Home from './components/Home/Home';
import AdminHome from './components/Admin/AdminHome';
import AdminUserEdit from './components/Admin/AdminUserEdit';
import AdminSignIn from './components/Admin/AdminSignIn'
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/signin' element={<SignIn/>}/>
        <Route path='/admin' element={<AdminHome/>}/>
        <Route path='/admin/edit/:id' element={<AdminUserEdit/>}/>
        <Route path='/admin/signin' element={<AdminSignIn/>}/>
        </Routes>
      </Router>

     
    </div>
  );
}

export default App;
