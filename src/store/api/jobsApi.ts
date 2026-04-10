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
    getJobBySlug: builder.query<Job, string>({
      query: (slug) => `/single-job/get/${slug}`,
      transformResponse: (response: ApiResponse<Job>) => response.data,
      providesTags: (result, error, slug) => [{ type: "Job", id: slug }],
    }),
  }),
});

export const { useGetJobsQuery, useGetJobBySlugQuery } = jobsApi;
