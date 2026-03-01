
import { baseApi } from "../api/baseApi";
import { AddToCartRequest, CreateCartResponse, UpdateSampleDetailsRequest, UpdateShippingDetailsRequest } from "./orderType";





export const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // add to cart
        addToCart: builder.mutation<CreateCartResponse, AddToCartRequest>({
            query: (data: AddToCartRequest) => ({
                url: "/carts",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Order"],
            transformResponse: (response: any) => {
                if (!response.success) {
                    throw new Error(response.errors || "Failed to add to cart");
                }
                return response;
            },
        }),


        // get cart
        getCart: builder.query<any, void>({
            query: () => ({
                url: "/carts",
                method: "GET",
            }),
            providesTags: ["Order"],
            transformResponse: (response: any) => {
                if (!response.success) {
                    throw new Error(response.errors || "Failed to get cart");
                }
                return response;
            },
        }),


        updateShippingDetails: builder.mutation<any, { cartId: number } & UpdateShippingDetailsRequest>({
            query: ({ cartId, ...data }) => ({
                url: `/carts/${cartId}/update-shipping`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Order"],
            transformResponse: (response: any) => {
                if (!response.success) {
                    throw new Error(response.errors || "Failed to update shipping details");
                }
                return response;
            },
        }),


        updateSampleDetails: builder.mutation<any, UpdateSampleDetailsRequest>({
            query: (data: UpdateSampleDetailsRequest) => ({
                url: `/carts/sample`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Order"],
            transformResponse: (response: any) => {
                if (!response.success) {
                    throw new Error(response.errors || "Failed to update sample details");
                }
                return response;
            },
        }),


        // get orders
       getUserOrders : builder.query<any, { status?: string } | void>({
            query: (data) => ({
                url: "/user-orders",
                method: "GET",
                // body: data ?? {},   // if nothing passed → send empty object
            }),
            providesTags: ["Order"],
            transformResponse: (response: any) => {
                if (!response.success) {
                    throw new Error(response.errors || "Failed to get orders");
                }
                return response;
            },
        }),
    }),
})



export const { useAddToCartMutation, useUpdateShippingDetailsMutation, useGetCartQuery, useUpdateSampleDetailsMutation, useGetUserOrdersQuery } = orderApi;