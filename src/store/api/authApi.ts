import { apiSlice } from "../slices/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/job_seeker/login",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: {
        status: boolean;
        data?: any;
        error?: any;
        message?: string;
      }) => response,
      invalidatesTags: ["User"],
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: "/job_seeker/register",
        method: "POST",
        body: userData,
      }),
      transformResponse: (response: {
        status: boolean;
        data?: any;
        error?: any;
        message?: string;
      }) => response,
    }),
    verifyOtp: builder.mutation({
      query: (otpData) => ({
        url: "/job_seeker/phone_verify",
        method: "POST",
        body: otpData,
      }),
      transformResponse: (response: {
        status: boolean;
        data?: any;
        error?: any;
        message?: string;
      }) => response,
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useVerifyOtpMutation } =
  authApi;
