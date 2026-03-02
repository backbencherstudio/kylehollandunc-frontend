import { baseApi } from "../../api/baseApi";


interface ProfileType {
    name: string;
    email: string;
    phone: string;
    country: string;
    state: string;
    profile_img?: File; // optional because image may not change
  }

interface passwordType {
    password: string;
    new_password: string;
    confirm_password: string;
}


const settingsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getGeneralProfile: builder.query<any, void>({
            query: () => ({
                url: "/user",
                method: "GET",
            }),
            providesTags: ["Settings"],
            transformResponse: (response: any) => {
                return response.data;
            },
        }),


        // update profile
        updateGeneralProfile: builder.mutation<any, FormData>({
            query: (formData) => ({
              url: "/profile-settings", // match Postman
              method: "POST",
              body: formData,
            }),
            invalidatesTags: ["Settings"],
          }),


        // update password
        updatePassword: builder.mutation<any, { passwordBody: passwordType }>({
            query: ({ passwordBody }) => ({
                url: "/admin-reset-password",
                method: "POST",
                body: passwordBody,
            }),
            invalidatesTags: ["Settings"],
            transformResponse: (response: any) => {
                if (!response.success) {
                    throw new Error(response.errors || "Failed to update password");
                }
                return response.data;
            },
        }),
    }),
}); 


export const { useGetGeneralProfileQuery, useUpdateGeneralProfileMutation, useUpdatePasswordMutation } = settingsApi;