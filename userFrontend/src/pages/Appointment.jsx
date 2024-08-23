import React, { useContext } from 'react'
import AppointmentForm from '../components/AppointmentForm'
import Hero from '../components/Hero'
import { AccountContext } from '../context/AccountContext'
import { Navigate } from 'react-router-dom'

const Appointment = () => {
  const {isAuthenticated} = useContext(AccountContext);

  if(!isAuthenticated){
    return <Navigate to={'/login'}/>
  }
  return (
    <>
    <Hero
      title={"Schedule Your Appointment | HealthCare Medical Institute"}
      imageUrl={"/signin.png"}
    />
    <AppointmentForm/>
  </>
  )
}

export default Appointment
