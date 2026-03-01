import { baseApi } from "../../api/baseApi";

export const reportApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // get all reports
        getReports: builder.query<any, void>({
            query: () => ({
                url: "/reports",
                method: "GET",
            }),
            providesTags: ["Reports"],
            transformResponse: (response: any) => {
                if (!response.success) {
                    throw new Error(response.errors || "Failed to get reports");
                }
                return response.data;
            },
        }),
        // get report by id
        getReportById: builder.query<any, { id: string }>({
            query: ({ id }) => ({
                url: `/reports/${id}`,
                method: "GET",
            }),
            providesTags: ["Reports"],
            transformResponse: (response: any) => {
                if (!response.success) {
                    throw new Error(response.errors || "Failed to get report by id");
                }
                return response.data;
            },
        }),
        // update report
        updateReport: builder.mutation<any, { id: string; report: any }>({
            query: ({ id, report }) => {
              const formData = new FormData();
              formData.append("date", report.date);
              formData.append("lot", report.lot);
              formData.append("result_status", report.result_status);
              formData.append(
                "result_summary",
                JSON.stringify(report.result_summary)
              );
          
              if (report.report_file) {
                formData.append("report_file", report.report_file);
              }
          
              return {
                url: `/reports/${id}`,
                method: "POST",
                body: formData,
              };
            },
          }),
        // delete report
        deleteReport: builder.mutation<any, { id: string }>({
            query: ({ id }) => ({
                url: `/reports/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Reports"],
            transformResponse: (response: any) => {
                if (!response.success) {
                    throw new Error(response.errors || "Failed to delete report");
                }
                return response.data;
            },
        }),
        // 
        
    }),
});

export const { useGetReportsQuery, useGetReportByIdQuery, useUpdateReportMutation, useDeleteReportMutation } = reportApi;