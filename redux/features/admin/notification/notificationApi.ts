import { baseApi } from "../../api/baseApi";



type notificationType = {
    user_registration?: boolean;
    test_request?: boolean;
    contact_message?: boolean;
}
const notificationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getNotifications: builder.query<any, void>({
            query: () => ({
                url: "/settings",
                method: "GET",
            }),
            providesTags: ["Settings"],
            transformResponse: (response: any) => {
                return response.data;
            },
        }),

        updateNotification: builder.mutation<
            any,
            { notificationBody: notificationType }
        >({
            query: ({ notificationBody }) => ({
                url: `/settings/notifications`,
                method: "POST",
                body: notificationBody,
            }),
            invalidatesTags: ["Settings"],
            transformResponse: (response: any) => {
                if (!response.success) {
                    throw new Error(response.errors || "Failed to update notifications");
                }
                return response.data;
            },
        }),
    })
})


export const { useGetNotificationsQuery, useUpdateNotificationMutation } = notificationApi;