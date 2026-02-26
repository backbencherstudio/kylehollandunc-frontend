
import { baseApi } from "../api/baseApi";
import { AddToCartRequest, CreateCartResponse, UpdateShippingDetailsRequest } from "./orderType";





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


        updateShippingDetails: builder.mutation<any, UpdateShippingDetailsRequest>({
            query: (data: UpdateShippingDetailsRequest) => ({
                url: "/carts/shipping",
                method: "PUT",
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
    }),
})  



export const { useAddToCartMutation, useUpdateShippingDetailsMutation, useGetCartQuery } = orderApi;