import { baseApi } from "../../api/baseApi";

export const requestApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // create request by user
        createRequestByUser: builder.mutation<any, any>({
            query: (body) => ({
                url: "/requests",
                method: "POST",
                body: body,
            }),
            invalidatesTags: ["Requests"],
            transformResponse: (response: any) => {
                if (!response.success) {
                    throw new Error(response.errors || "Failed to create request");
                }
                return response.data;
            },
        }),

        // get all requests by admin
        getRequests: builder.query<any, void>({
            query: () => ({
                url: "/requests",
                method: "GET",
            }),
            providesTags: ["Requests"],
            transformResponse: (response: any) => {
                if (!response.success) {
                    throw new Error(response.errors || "Failed to get requests");
                }
                return response.data;
            },
        }),

        // delete request by admin
        deleteRequest: builder.mutation<any, { id: string }>({  // delete request by user
            query: ({ id }) => ({
                url: `/requests/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Requests"],
            transformResponse: (response: any) => {
                if (!response.success) {
                    throw new Error(response.errors || "Failed to delete request");
                }
                return response.data;
            },

        }),


        // request reply by admin
        requestReply: builder.mutation<any, { id: string, body: { email: string, subject: string , description: string | null } }>({  // request reply by admin
            query: ({ id, body }) => ({
                url: `/requests/${id}/reply`,
                method: "POST",
                body: body,
            }),
            invalidatesTags: ["Requests"],
            transformResponse: (response: any) => {
                if (!response.success) {
                    throw new Error(response.errors || "Failed to reply to request");
                }
                return response.data;
            },
        }),
    }),
});

export const { useGetRequestsQuery,   useCreateRequestByUserMutation, useDeleteRequestMutation, useRequestReplyMutation } = requestApi;