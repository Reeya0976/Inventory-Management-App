import React from 'react'
import useRedirectLoggedOutUser from '../../custumHook/useRedirectLoggedOutUser'

const Dashboard = () => {
  useRedirectLoggedOutUser("/login");
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  )
}

export default Dashboard
