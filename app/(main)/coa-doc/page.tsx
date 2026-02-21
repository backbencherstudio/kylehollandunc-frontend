import CoaDocHero from '@/components/pages/CoaDoc/CoaDocHero'
import SimpleCOA from '@/components/pages/CoaDoc/SimpleCOA'
import ContactSection from '@/components/pages/Homepage/ContactSection'



export default function page() {
  return (
    <div className='mt-[80px] sm:mt-[96px] mb-[40px]'>
      <CoaDocHero />
      <SimpleCOA />

      this is simple coa doc page
      <ContactSection />
    </div>
  )
}
