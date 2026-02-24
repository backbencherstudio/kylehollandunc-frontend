import { Switch } from '@/components/ui/switch'
import React from 'react'

export default function NotificationSettings() {
    return (
        <section className=' bg-[#FFF] p-6 rounded-xl'>
            <p className='text-[#1D1F2C] text-lg font-medium leading-[160%] mb-4.5'>Notification Settings</p>

            <div className="space-y-3">


                <div className="flex items-center justify-between gap-2 border border-[#DFE1E7] pl-4 pr-3 py-4 rounded-lg">
                    {/* label */}
                    <div>
                        <h5 className='text-[#1D1F2C] text-sm font-medium leading-[140%] tracking-[0.07px]'>New User Registration</h5>
                        <p className='text-[#777980] text-sm font-normal leading-[140%] tracking-[0.07px]'>Receive alerts when a new user registers on the platform.</p>
                    </div>
                    {/* <SwitchDemo /> */}

                    <Switch
                        className="h-[24px] w-[48px] md:h-[32px] md:w-[58px] data-[state=checked]:bg-[#0479F5] cursor-pointer"
                    />
                </div>
                <div className="flex items-center justify-between gap-2 border border-[#DFE1E7] pl-4 pr-3 py-4 rounded-lg">
                    {/* label */}
                    <div>
                        <h5 className='text-[#1D1F2C] text-sm font-medium leading-[140%] tracking-[0.07px]'>New User Registration</h5>
                        <p className='text-[#777980] text-sm font-normal leading-[140%] tracking-[0.07px]'>Receive alerts when a new user registers on the platform.</p>
                    </div>
                    {/* <SwitchDemo /> */}

                    <Switch
                        className="h-[24px] w-[48px] md:h-[32px] md:w-[58px] data-[state=checked]:bg-[#0479F5] cursor-pointer
  "
                    />
                </div>
                <div className="flex items-center justify-between gap-2 border border-[#DFE1E7] pl-4 pr-3 py-4 rounded-lg">
                    {/* label */}
                    <div>
                        <h5 className='text-[#1D1F2C] text-sm font-medium leading-[140%] tracking-[0.07px]'>New User Registration</h5>
                        <p className='text-[#777980] text-sm font-normal leading-[140%] tracking-[0.07px]'>Receive alerts when a new user registers on the platform.</p>
                    </div>
                    {/* <SwitchDemo /> */}

                    <Switch
                        className="h-[24px] w-[48px] md:h-[32px] md:w-[58px] data-[state=checked]:bg-[#0479F5] cursor-pointer
  "
                    />
                </div>

            </div>
        </section>
    )
}
