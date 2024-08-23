import React from 'react'
import AboutUsContent from '../components/AboutUsContent'
import Hero from '../components/Hero'

const About = () => {
  return (
  <>
    <Hero
        title={"Learn More About Us | ZeeCare Medical Institute"}
        imageUrl={"/about.png"}
      />
    <AboutUsContent imageUrl={"/whoweare.png"}/>
  </>
  )
}

export default About
