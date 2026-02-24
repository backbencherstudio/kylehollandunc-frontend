"use client"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import GeneralProfile from "./GeneralProfile";
import PasswordUpdatet from "./PasswordUpdatet";
import NotificationSettings from "./NotificationSettings";


export default function SettingsPage() {

    const tabs = [
        {
            label: "General",
            value: "general",
        },
        {
            label: "Password",
            value: "password",
        },
        {
            label: "Notification",
            value: "notification",
        },
    ]

    return (
        <div>

            <Tabs defaultValue="general" className="w-full ">
                <TabsList className="bg-white rounded-xl p-2 inline-flex border gap-3 group-data-[orientation=horizontal]/tabs:h-[53px]  group-data-[orientation=horizontal]/tabs:py-4 border-none  ">

                    {
                        tabs.map((tab) => (
                            <TabsTrigger
                                key={tab.value}
                                value={tab.value}
                                className="px-3 py-2 rounded-lg data-[state=active]:bg-[#F6F8FA] data-[state=active]:border-[#DFE1E7]   text-sm font-semibold leading-[150%] data-[state=active]:text-black text-center text-[#777980] h-[37px] data-active:shadow-none"
                            >
                                {tab.label}
                            </TabsTrigger>
                        ))
                    }

                </TabsList>


                <TabsContent value="general">   
                    <GeneralProfile />
                </TabsContent>
                <TabsContent value="password">
                    <PasswordUpdatet />
                </TabsContent>
                <TabsContent value="notification">
                    <NotificationSettings />
                </TabsContent>
            </Tabs>

         

          
        </div>
    )
}




// function SettingsTabs() {
//     return (
//         <Tabs defaultValue="general" className="w-full">
//             <TabsList className="bg-white rounded-xl p-2 inline-flex border">
//                 <TabsTrigger
//                     value="general"
//                     className="px-6 py-2 rounded-lg data-[state=active]:bg-white "
//                 >
//                     General
//                 </TabsTrigger>

//                 <TabsTrigger
//                     value="password"
//                     className="px-6 py-2 rounded-lg data-[state=active]:bg-white  "
//                 >
//                     Password
//                 </TabsTrigger>

//                 <TabsTrigger
//                     value="notification"
//                     className="px-6 py-2 rounded-lg data-[state=active]:bg-white "
//                 >
//                     Notification
//                 </TabsTrigger>
//             </TabsList>

//             <TabsContent value="general">
//                 General Content
//             </TabsContent>

//             <TabsContent value="password">
//                 Password Content
//             </TabsContent>

//             <TabsContent value="notification">
//                 Notification Content
//             </TabsContent>
//         </Tabs>
//     );
// }