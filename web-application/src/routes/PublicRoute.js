import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function PublicRoutes() {
  const authState = useSelector(state => state.authReducer)
  console.log( authState+"authstate of user");
  return (
    !authState.auth? <Outlet/> : <Navigate to='/'/>
  )
}

export default PublicRoutes
