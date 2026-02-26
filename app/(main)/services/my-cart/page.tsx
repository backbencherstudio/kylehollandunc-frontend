import MyCartPageContent from '@/components/pages/AllServices/MyCartPageContent'
import PrivateRoute from '@/components/pages/AuthPages/PrivateRoute'

export default function page() {
  return (
    <PrivateRoute>
      <div className='mt-[80px] sm:mt-[96px] mb-[40px]'>
        <MyCartPageContent />
      </div>
    </PrivateRoute>
  )
}
