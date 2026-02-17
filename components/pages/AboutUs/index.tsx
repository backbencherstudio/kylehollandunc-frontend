import React from 'react'
import AboutHeroSection from './AboutUsHeroSection'
import WhatWeDo from './WhatWeDo'
import HowWeWork from './HowWeWork'
import WhoWeServe from './WhoWeServe'
import OurServices from '../Homepage/OurServices'
import ContactSection from '../Homepage/ContactSection'

export default function AboutUsContent () {
  return (
    <div>
        <AboutHeroSection />
        <WhatWeDo />
        <HowWeWork />
        <WhoWeServe />
        <OurServices />
        <ContactSection />
    </div>
  )
}
