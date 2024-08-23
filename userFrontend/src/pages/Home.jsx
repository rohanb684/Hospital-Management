import React from 'react'

import Hero from '../components/Hero'
import AboutUsContent from '../components/AboutUsContent'
import Departments from '../components/Departments'
import MessageForm from '../components/MessageForm'

const Home = () => {
  return (
    <>
     <Hero
        title={
          "Welcome to HealthCare Medical Institute | Your Trusted Healthcare Provider"
        }
        imageUrl={"/hero.png"}
      />
      <AboutUsContent imageUrl={"/about.png"}/>
      <Departments/>
      <MessageForm/>
    </>
  )
}

export default Home
