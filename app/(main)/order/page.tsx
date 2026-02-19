"use client";

import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui/tabs";

export default function MyOrdersPage() {
    return (
        <div className="bg-gray-100"><section className="max-w-[1000px] mx-auto px-4 py-12">

            {/* Title */}
            <h2 className="text-3xl font-syne font-semibold text-[#1D1F2C] mb-8">
                My Orders
            </h2>

            {/* Tabs */}
            <Tabs defaultValue="all" className="w-full">

                <TabsList className="bg-transparent p-0 mb-8 gap-2">
                    <TabsTrigger
                        value="all"
                        className="data-[state=active]:bg-[#1D1F2C] data-[state=active]:text-white rounded-md px-4 py-2 text-sm"
                    >
                        All
                    </TabsTrigger>

                    <TabsTrigger
                        value="progress"
                        className="data-[state=active]:bg-[#1D1F2C] data-[state=active]:text-white rounded-md px-4 py-2 text-sm"
                    >
                        In Progress
                    </TabsTrigger>

                    <TabsTrigger
                        value="delivered"
                        className="data-[state=active]:bg-[#1D1F2C] data-[state=active]:text-white rounded-md px-4 py-2 text-sm"
                    >
                        Delivered
                    </TabsTrigger>
                </TabsList>

                {/* ================= All Orders ================= */}
                <TabsContent value="all">
                    <OrderCard />
                    <OrderCard status="Delivered" />
                </TabsContent>

                {/* ================= In Progress ================= */}
                <TabsContent value="progress">
                    <OrderCard />
                </TabsContent>

                {/* ================= Delivered ================= */}
                <TabsContent value="delivered">
                    <OrderCard status="Delivered" />
                </TabsContent>

            </Tabs>
        </section></div>
    );
}



interface OrderCardProps {
    status?: "In Progress" | "Delivered";
}

function OrderCard({ status = "In Progress" }: OrderCardProps) {
    return (
        <div className="border border-[#E5E7EB] rounded-2xl p-6 bg-white mb-6">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">

                <div>
                    <h3 className="text-xl font-semibold text-[#1D1F2C]">
                        Order ID: #73262
                    </h3>

                    <div className="flex items-center gap-3 text-sm text-[#777980] mt-2">
                        <span>13:00, Nov 10, 2023</span>

                        <span
                            className={`px-3 py-1 rounded-full text-xs font-medium
                  ${status === "Delivered"
                                    ? "bg-green-100 text-green-600"
                                    : "bg-yellow-100 text-yellow-600"
                                }
                `}
                        >
                            {status}
                        </span>
                    </div>
                </div>
            </div>

            <div className="border-t border-[#E5E7EB] my-6" />

            {/* Items */}
            <div className="flex flex-col gap-6">

                {/* Item 1 */}
                <div className="border border-[#F1F2F4] rounded-xl p-4">
                    <div className="flex justify-between text-sm text-[#777980] mb-2">
                        <span>Test 1</span>
                        <span className="text-[#1D1F2C]">Standard Panel</span>
                    </div>

                    <div className="flex justify-between text-sm text-[#777980]">
                        <span>Quantity</span>
                        <span>1</span>
                    </div>

                    <div className="flex justify-between text-sm text-[#777980] mt-1">
                        <span>Price</span>
                        <span>$199</span>
                    </div>
                </div>

                {/* Item 2 */}
                <div className="border border-[#F1F2F4] rounded-xl p-4">
                    <div className="flex justify-between text-sm text-[#777980] mb-2">
                        <span>Test 2</span>
                        <span className="text-[#1D1F2C]">
                            Variance Testing (Add On)
                        </span>
                    </div>

                    <div className="flex justify-between text-sm text-[#777980]">
                        <span>Quantity</span>
                        <span>1</span>
                    </div>

                    <div className="flex justify-between text-sm text-[#777980] mt-1">
                        <span>Price</span>
                        <span>$75</span>
                    </div>
                </div>

                {/* Shipping */}
                <div className="flex justify-between text-sm text-[#777980]">
                    <span>Shipping</span>
                    <span>$25</span>
                </div>

                {/* Total */}
                <div className="flex justify-between text-lg font-semibold text-[#1D1F2C] border-t pt-4">
                    <span>Total</span>
                    <span>$274</span>
                </div>

            </div>
        </div>
    );
}
