// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import type { RootState } from "../../store";

// export const baseApi = createApi({
//   reducerPath: "baseApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: process.env.NEXT_PUBLIC_API_URL,
//     prepareHeaders: (headers) => {
//       if (typeof window !== "undefined") {
//         const token = localStorage.getItem("token");
    
//         if (token) {
//           headers.set("Authorization", `Bearer ${token}`);
//         }
//       }
    
//       return headers;
//     },
//   }),
//   endpoints: () => ({}),
//   tagTypes: ["Order", "AdminOrder", "Dashboard", "Users_Management", "Reports", "Contacts"],
// });


import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../auth/authSlice";
import { getLoginPathByRole, getUserRole } from "@/utils/auth";


const baseQuery = fetchBaseQuery({
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
});

const baseQueryWithAuth = async (args: any, api: any, extraOptions: any) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const role = getUserRole(); // get role before logout

    api.dispatch(logout());

    if (typeof window !== "undefined") {
      const loginPath = getLoginPathByRole(role);
      window.location.href = loginPath;
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithAuth,
  endpoints: () => ({}),
  tagTypes: ["Order", "AdminOrder", "Dashboard", "Users_Management", "Reports", "Contacts"],
});