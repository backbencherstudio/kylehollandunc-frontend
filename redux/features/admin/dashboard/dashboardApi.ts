import { baseApi } from "../../api/baseApi";


const dashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardData: builder.query<any, void>({
            query: () => ({
                url: "/dashboard",
                method: "GET",
            }),
            providesTags: ["Dashboard"],
            transformResponse: (response: any) => {
                if (!response.success) {
                    throw new Error(response.errors || "Failed to get dashboard data");
                }
                return response.data;
            },
        }),
    }),
});

export const { useGetDashboardDataQuery } = dashboardApi;