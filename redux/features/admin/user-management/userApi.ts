import { baseApi } from "../../api/baseApi";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      


        getUsers: builder.query<any, { page: number }>({
            query: ({ page }) => ({
              url: `/users?page=${page}`,
              method: "GET",
            }),
            providesTags: ["Users_Management"],
            transformResponse: (response: any) => {
              if (!response.success) {
                throw new Error(response.errors || "Failed to get users");
              }
              return response.data; 
              // assuming Laravel-style pagination:
              // {
              //   data: [],
              //   current_page,
              //   last_page,
              //   total
              // }
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