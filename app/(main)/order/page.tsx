"use client";

import { useState, useMemo } from "react";
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui/tabs";
import PrivateRoute from "@/components/pages/AuthPages/PrivateRoute";
import { useGetUserOrdersQuery } from "@/redux/features/order/orderApi";

// Types based on your API response
interface OrderItem {
    id: number;
    order_id: number;
    type: string;
    name: string;
    quantity: number;
    price: string;
    total_price: string;
    meta: null | any;
    created_at: string;
    updated_at: string;
}

interface Order {
    id: number;
    order_number: string;
    user_id: number;
    shipping_method: string;
    subtotal: string;
    shipping_price: string;
    shipping_address: null | string;
    total: string;
    label_frame_code: null | string;
    payment_method: string;
    payment_status: string;
    order_status: string;
    created_at: string;
    updated_at: string;
    items: OrderItem[];
    report: null | any;
}

interface OrdersResponse {
    status: string;
    success: boolean;
    data: Order[];
    message: string;
}

export default function MyOrdersPage() {
    const [activeTab, setActiveTab] = useState("all");
    
    const { data, isLoading, error } = useGetUserOrdersQuery();

    // Manually filter orders based on active tab
    const filteredOrders = useMemo(() => {
        if (!data?.data) return [];
        
        const orders = data.data;
        
        switch(activeTab) {
            case "progress":
                // Filter for "In Progress" - using order_status === "pending"
                return orders.filter((order:any) => order.order_status === "pending");
            case "delivered":
                // Filter for "Delivered" - you might have a different status like "completed" or "delivered"
                // Adjust this based on your actual delivered status value
                return orders.filter((order:any) => order.order_status === "delivered");
            default:
                return orders; // "all" tab shows everything
        }
    }, [data, activeTab]);

    // Get counts for each status
    const counts = useMemo(() => {
        if (!data?.data) return { all: 0, progress: 0, delivered: 0 };
        
        const orders = data.data;
        return {
            all: orders.length,
            progress: orders.filter((o:any) => o.order_status === "pending").length,
            delivered: orders.filter((o:any) => o.order_status === "delivered").length // Adjust status as needed
        };
    }, [data]);

    // Format date function
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }).replace(',', '');
    };

    // Handle loading state
    if (isLoading) {
        return (
            <PrivateRoute>
                <div className="bg-gray-100">
                    <section className="max-w-[1000px] mx-auto px-4 py-12">
                        <h2 className="text-3xl font-syne font-semibold text-[#1D1F2C] mb-8">
                            My Orders
                        </h2>
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1D1F2C]"></div>
                        </div>
                    </section>
                </div>
            </PrivateRoute>
        );
    }

    // Handle error state
    if (error) {
        return (
            <PrivateRoute>
                <div className="bg-gray-100">
                    <section className="max-w-[1000px] mx-auto px-4 py-12">
                        <h2 className="text-3xl font-syne font-semibold text-[#1D1F2C] mb-8">
                            My Orders
                        </h2>
                        <div className="text-center text-red-600 py-8">
                            Failed to load orders. Please try again.
                        </div>
                    </section>
                </div>
            </PrivateRoute>
        );
    }

    return (
        <PrivateRoute>
            <div className="bg-gray-100">
                <section className="max-w-[1000px] mx-auto px-4 py-12">
                    {/* Title */}
                    <h2 className="text-3xl font-syne font-semibold text-[#1D1F2C] mb-8">
                        My Orders
                    </h2>

                    {/* Tabs */}
                    <Tabs 
                        defaultValue="all" 
                        className="w-full"
                        onValueChange={(value) => setActiveTab(value)}
                    >
                        <TabsList className="bg-transparent p-0 mb-8 gap-2">
                            <TabsTrigger
                                value="all"
                                className="data-[state=active]:bg-[#1D1F2C] data-[state=active]:text-white rounded-md px-4 py-2 text-sm"
                            >
                                All ({counts.all})
                            </TabsTrigger>

                            <TabsTrigger
                                value="progress"
                                className="data-[state=active]:bg-[#1D1F2C] data-[state=active]:text-white rounded-md px-4 py-2 text-sm"
                            >
                                In Progress ({counts.progress})
                            </TabsTrigger>

                            <TabsTrigger
                                value="delivered"
                                className="data-[state=active]:bg-[#1D1F2C] data-[state=active]:text-white rounded-md px-4 py-2 text-sm"
                            >
                                Delivered ({counts.delivered})
                            </TabsTrigger>
                        </TabsList>

                        {/* All Tabs Content - Using filteredOrders for each tab */}
                        <TabsContent value="all">
                            {filteredOrders.length === 0 ? (
                                <EmptyOrders />
                            ) : (
                                filteredOrders.map((order:any) => (
                                    <OrderCard key={order.id} order={order} formatDate={formatDate} />
                                ))
                            )}
                        </TabsContent>

                        <TabsContent value="progress">
                            {filteredOrders.length === 0 ? (
                                <EmptyOrders message="No in-progress orders" />
                            ) : (
                                filteredOrders.map((order:any) => (
                                    <OrderCard key={order.id} order={order} formatDate={formatDate} />
                                ))
                            )}
                        </TabsContent>

                        <TabsContent value="delivered">
                            {filteredOrders.length === 0 ? (
                                <EmptyOrders message="No delivered orders" />
                            ) : (
                                filteredOrders.map((order:any) => (
                                    <OrderCard key={order.id} order={order} formatDate={formatDate} />
                                ))
                            )}
                        </TabsContent>
                    </Tabs>
                </section>
            </div>
        </PrivateRoute>
    );
}

// Empty orders component
function EmptyOrders({ message = "No orders found" }: { message?: string }) {
    return (
        <div className="text-center py-12 text-[#777980]">
            {message}
        </div>
    );
}

// OrderCard component
interface OrderCardProps {
    order: Order;
    formatDate: (date: string) => string;
}

function OrderCard({ order, formatDate }: OrderCardProps) {
    // Determine display status
    const displayStatus = order.order_status === "pending" ? "In Progress" : 
                         order.order_status === "delivered" ? "Delivered" : 
                         order.order_status;
    
    // Calculate total from order total
    const total = parseFloat(order.total).toFixed(2);
    
    // Get shipping price
    const shipping = parseFloat(order.shipping_price).toFixed(2);

    return (
        <div className="border border-[#E5E7EB] rounded-2xl p-6 bg-white mb-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
                <div>
                    <h3 className="text-xl font-semibold text-[#1D1F2C]">
                        Order ID: #{order.order_number}
                    </h3>

                    <div className="flex items-center gap-3 text-sm text-[#777980] mt-2">
                        <span>{formatDate(order.created_at)}</span>

                        <span
                            className={`px-3 py-1 rounded-full text-xs font-medium capitalize
                                ${displayStatus === "Delivered"
                                    ? "bg-green-100 text-green-600"
                                    : "bg-yellow-100 text-yellow-600"
                                }
                            `}
                        >
                            {displayStatus}
                        </span>

                        {/* Payment status badge - optional */}
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-medium capitalize
                                ${order.payment_status === "paid"
                                    ? "bg-green-100 text-green-600"
                                    : "bg-gray-100 text-gray-600"
                                }
                            `}
                        >
                            {order.payment_status}
                        </span>
                    </div>
                </div>
            </div>

            <div className="border-t border-[#E5E7EB] my-6" />

            {/* Items */}
            <div className="flex flex-col gap-6">
                {order.items.map((item) => (
                    <div key={item.id} className="border border-[#F1F2F4] rounded-xl p-4">
                        <div className="flex justify-between text-sm text-[#777980] mb-2">
                            <span>{item.type === 'test' ? 'Test' : 'Add-on'}</span>
                            <span className="text-[#1D1F2C]">{item.name}</span>
                        </div>

                        <div className="flex justify-between text-sm text-[#777980]">
                            <span>Quantity</span>
                            <span>{item.quantity}</span>
                        </div>

                        <div className="flex justify-between text-sm text-[#777980] mt-1">
                            <span>Price</span>
                            <span>${parseFloat(item.price).toFixed(2)}</span>
                        </div>
                    </div>
                ))}

                {/* Shipping */}
                <div className="flex justify-between text-sm text-[#777980]">
                    <span>Shipping</span>
                    <span>${shipping}</span>
                </div>

                {/* Total */}
                <div className="flex justify-between text-lg font-semibold text-[#1D1F2C] border-t pt-4">
                    <span>Total</span>
                    <span>${total}</span>
                </div>
            </div>
        </div>
    );
}