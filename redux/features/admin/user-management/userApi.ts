import { baseApi } from "../../api/baseApi";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query<any, void>({
            query: () => ({
                url: "/users",
                method: "GET",
            }),
            providesTags: ["Users_Management"],
            transformResponse: (response: any) => {
                if (!response.success) {
                    throw new Error(response.errors || "Failed to get users");
                }
                return response.data;
            },
        }),

        // delete user
        deleteUser: builder.mutation<any, { id: number }>({
            query: ({ id }) => ({
                url: `/users/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Users_Management"],
            transformResponse: (response: any) => {
                return response.data;
            },
        }),
    })
})


export const { useGetUsersQuery, useDeleteUserMutation } = userApi;