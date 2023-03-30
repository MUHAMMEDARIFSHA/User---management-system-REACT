
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
 import SignUp from './components/Signup/SignUp';
import SignIn from './components/SignIn/SignIn';
import Home from './components/Home/Home';
import AdminHome from './components/Admin/AdminHome';
import AdminUserEdit from './components/Admin/AdminUserEdit';
import AdminSignIn from './components/Admin/AdminSignIn'
import { Provider, useSelector } from 'react-redux';

import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoutes from './routes/PublicRoute';
import AdminProtectedRoute from './routes/AdminProtectedRoute'
import AdminPublicRoute from './routes/AdminPublicRoute';

function App() {
 
  return (
    <div className="App">
      <Router>
        <Routes>
           
        <Route element={ <PublicRoutes/> }>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/signin' element={<SignIn/>}/> 
        </Route>


              <Route element={ <ProtectedRoute/> }>
                <Route path='/' element={ <Home/> }/>
              </Route>

{/* 
        <Route path='/' element={<Home />} /> 
         <Route path='/signin' element={<SignIn/>}/> 
         
         
          <Route path='/signup' element={<SignUp/>}/> */}

          <Route element={<AdminProtectedRoute/>}>
          <Route path='/admin' element={<AdminHome/>}/>
        <Route path='/admin/edit/:id' element={<AdminUserEdit/>}/>
          </Route>
          
       <Route element={<AdminPublicRoute/>}>
       <Route path='/admin/signin' element={<AdminSignIn/>}/>
       </Route>
        
        </Routes>
      </Router>

     
    </div>
  );
}

export default App;
