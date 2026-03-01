import { baseApi } from "../../api/baseApi";

export const contactApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // get all contacts
        getContacts: builder.query<any, void>({
            query: () => ({
                url: "/contacts",
                method: "GET",
            }),
            providesTags: ["Contacts"],
            transformResponse: (response: any) => {
                if (!response.success) {
                    throw new Error(response.errors || "Failed to get contacts");
                }
                return response.data;
            },
        }),
        // delete contact
        deleteContact: builder.mutation<any, { id: number }>({
            query: ({ id }) => ({
                url: `/contacts/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Contacts"],
            transformResponse: (response: any) => {
                return response.data;
            },
        }),

        // reply to contact
        replyToContact: builder.mutation<any, { id: number, body: { email: string, subject: string, description: string } }>({
            query: ({ id, body }) => ({
                url: `/contacts/${id}/reply`,
                method: "POST",
                body: body,
            }),
            invalidatesTags: ["Contacts"],
            transformResponse: (response: any) => {
                if (!response.success) {
                    throw new Error(response.errors || "Failed to reply to contact");
                }
                return response.data;
            },
        }),



        // create contact by user
        createContactByUser: builder.mutation<any, { name: string, email: string, order_id?: number, message: string }>({
            query: ({ name, email, order_id, message }) => ({
                url: "/contacts",
                method: "POST",
                body: { name, email, order_id: order_id ? Number(order_id) : null, message }
            }),
        }), 
    }),
});

export const { useCreateContactByUserMutation, useGetContactsQuery, useDeleteContactMutation, useReplyToContactMutation } = contactApi;