import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, } from 'react-router-dom'






function AdminProtectedRoute() {
    const authState = useSelector(state=>state.AdminAuthReducer)
  return (
   authState.auth? <Outlet/> :<Navigate to='/admin/signin'/>
  )
}

export default AdminProtectedRoute
