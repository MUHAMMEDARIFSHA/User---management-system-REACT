import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'






function AdminPublicRoute() {
    const authState = useSelector(state=>(state.AdminAuthReducer))
  return (
    !authState.auth? <Outlet/> : <Navigate to="/admin" />
  )
}

export default AdminPublicRoute

