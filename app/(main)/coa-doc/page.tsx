import CoaDocHero from '@/components/pages/CoaDoc/CoaDocHero'
import HowItworks from '@/components/pages/VerifyReport/HowItworks'
import ContactSection from '@/components/pages/Homepage/ContactSection'



export default function page() {
  return (
    <div className='mt-[80px] sm:mt-[96px] mb-[40px]'>
      <CoaDocHero />
      <HowItworks />
      <ContactSection />
    </div>
  )
}
