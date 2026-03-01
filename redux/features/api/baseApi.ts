import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../store";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
    
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      }
    
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ["Order", "AdminOrder", "Dashboard", "Users_Management", "Reports", "Contacts"],
});