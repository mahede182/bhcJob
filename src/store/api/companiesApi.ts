import type { ApiResponse, Company } from "@/@types/api";
import { apiSlice } from "../slices/apiSlice";

export const companiesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompanies: builder.query<Company[], any>({
      query: (params) => ({
        url: "/company/get",
        params,
      }),
      transformResponse: (response: ApiResponse<Company[]>) => response.data,
      providesTags: ["Company"],
    }),
  }),
});

export const { useGetCompaniesQuery } = companiesApi;
