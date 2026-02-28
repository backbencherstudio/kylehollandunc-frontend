import { setStorageItem } from "@/utils/storage";
import { baseApi } from "../api/baseApi";
import { setCredentials } from "./authSlice";
import type {
  LoginRequest,
  LoginResponse,
  LoginApiResponse,
  RegisterRequest,
  RegisterResponse,
  ForgotPasswordResponse,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  VerifyOtpRequest,
} from "./types";
import { setCookie } from "@/utils/cookes";
 

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // ✅ Login
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data: raw } = await queryFulfilled;
          const res = raw as unknown as LoginApiResponse;

          // API wraps user in res.data: { id, name, email, ... }
          const userData = res.data;
          const user = userData
            ? { id: userData.id, name: userData.name, email: userData.email, role: userData.role }
            : null;

          // Token may be in data, root, or not sent by API
          const token =
            res.data?.token ??
            res.token ??
            res.accessToken ??
            res.access_token ??
            null;

         setStorageItem("token", token ?? "");
         setStorageItem("user", JSON.stringify(user ?? {}));

        // //  also save to cookies
        // setCookie("token", token ?? "");
        // setCookie("user", JSON.stringify(user ?? {}));

          // Redux: token required by slice; use empty string if API doesn't send token yet
          if (user) {
            dispatch(
              setCredentials({
                user,
                token: token ?? "",
              })
            );
          }
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),

    // ✅ Register
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
    }),




     // ======================
    // Forgot Password
    // ======================
    forgotPassword: builder.mutation<ForgotPasswordResponse, ForgotPasswordRequest>({
      query: (email) => ({
        url: "/request-otp",
        method: "POST",
        body: email,
      }),
      transformResponse: (response: any) => {
        if (!response.success) {
          throw new Error(response.errors || "Invalid OTP");
        }
        return response;
      },
    }),
    verifyOtp: builder.mutation<any, VerifyOtpRequest>({
      query: ({ email, otp }: VerifyOtpRequest) => ({
        url: "/verify-otp",
        method: "POST",
        body: { email, otp },
      }),
      transformResponse: (response: any) => {
        if (!response.success) {
          throw new Error(response.errors || "Invalid OTP");
        }
        return response;
      },
    }),
    resetPassword: builder.mutation<any, ResetPasswordRequest>({
      query: ({ email, new_password, confirm_password }: ResetPasswordRequest) => ({
        url: "/reset-password", 
        method: "POST",
        body: { email, new_password, confirm_password },
      }),

      transformResponse: (response: any) => {
        if (!response.success) {
          throw new Error(response.errors || "Reset failed");
        }
        return response;
      },
    }),
    

  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
} = authApi;