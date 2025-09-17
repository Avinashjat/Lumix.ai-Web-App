import React from 'react'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div>
      <h1>i am layout</h1>
      
      <Outlet />
    </div>
  )
}

export default Layout
