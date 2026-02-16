import React from 'react'
import AboutSection from './AboutSection'
import HeroSection2 from '@/components/HeroSection2';
import OurServices from './OurServices';
import HowItWorks from './HowItWorks';
import OurOfferSection from './OurOfferSection';
import WhyChooseSection from './WhyChooseSection';
import OurPriceSection from './OurPriceSection';

const Homepage = () => {
    return (
        <div>
            <HeroSection2 />
            <AboutSection />
            <OurServices />
            <HowItWorks />
            <OurOfferSection />
            <WhyChooseSection />
            <OurPriceSection />
        </div>
    )
}

export default Homepage;
