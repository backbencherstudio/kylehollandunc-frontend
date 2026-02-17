import VerifyReportHero from '@/components/pages/VerifyReport/VerifyReportHero'
import HowItworks from '@/components/pages/VerifyReport/HowItworks'
import ContactSection from '@/components/pages/Homepage/ContactSection'



export default function page() {
  return (
    <div className='mt-[80px] sm:mt-[96px] mb-[40px]'>
      <VerifyReportHero />
      <HowItworks />
      <ContactSection />
    </div>
  )
}
