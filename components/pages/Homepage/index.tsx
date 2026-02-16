import React from 'react'
import AboutSection from './AboutSection'
import HeroSection2 from '@/components/HeroSection2';
import OurServices from './OurServices';
import HowItWorks from './HowItWorks';
import OurOfferSection from './OurOfferSection';
import WhyChooseSection from './WhyChooseSection';
import OurPriceSection from './OurPriceSection';
import OurServiceSection from './OurServiceSection';
import ContactSection from './ContactSection';
import RequestSection from './RequestSection';

const Homepage = () => {
    return (
        <div>
            <HeroSection2 />
            <AboutSection />
            <OurServices />
            <HowItWorks />
            <OurOfferSection />
            <WhyChooseSection />
            {/* <OurPriceSection /> */}
            <OurServiceSection />
            <ContactSection />
            <RequestSection />
        </div>
    )
}

export default Homepage;
