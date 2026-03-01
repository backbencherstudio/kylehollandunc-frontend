

import { baseApi } from "../../api/baseApi";


export const orderApi = baseApi.injectEndpoints({

    // get all orders
    endpoints: (builder) => ({ 
        getAllOrdersByAdmin: builder.query<any, void>({
        query: () => ({
            url: "/orders",
            method: "GET",
        }),
        providesTags: ["AdminOrder"],
        transformResponse: (response: any) => {
            if (!response.success) {
                throw new Error(response.errors || "Failed to get orders");
            }
            return response;
        },
    }),

    // get order by id
    getOrderById: builder.query<any, { id: string }>({
        query: ({ id }) => ({
            url: `/orders/${id}`,
            method: "GET",
        }),
        providesTags: ["AdminOrder"],
        transformResponse: (response: any) => {
            if (!response.success) {
                throw new Error(response.errors || "Failed to get order by id");
            }
            return response;
        },
    }),
    // update order status
    updateOrderStatus: builder.mutation<any, { id: string, status: string }>({
        query: ({ id, status }) => ({
            url: `/orders/${id}/update-status`,
            method: "POST",
            body: { order_status: status },
        }),
        invalidatesTags: ["AdminOrder"],
        transformResponse: (response: any) => {
            if (!response.success) {
                throw new Error(response.errors || "Failed to update order status");
            }
            return response;
        },
    }),
    // delete order
    deleteOrder: builder.mutation<any, { id: string }>({
        query: ({ id }) => ({
            url: `/orders/${id}`,
            method: "DELETE",
        }),
        invalidatesTags: ["AdminOrder"],
        transformResponse: (response: any) => {
            if (!response.success) {
                throw new Error(response.errors || "Failed to delete order");
            }
            return response;
        },
    }),

   
})
})


export const { useGetAllOrdersByAdminQuery, useGetOrderByIdQuery, useUpdateOrderStatusMutation, useDeleteOrderMutation } = orderApi;