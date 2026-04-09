import type { ApiResponse, Job } from "@/@types/api.type";
import { apiSlice } from "../slices/apiSlice";

export const jobsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query<Job[], any>({
      query: (params) => ({
        url: "/job/get",
        params,
      }),
      transformResponse: (response: ApiResponse<Job[]>) => response.data,
      providesTags: ["Job"],
    }),
  }),
});

export const { useGetJobsQuery } = jobsApi;
