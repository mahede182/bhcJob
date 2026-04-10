import type { ApiResponse, Industry } from "@/@types/api";
import { apiSlice } from "../slices/apiSlice";

export const industriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getIndustries: builder.query<Industry[], any>({
      query: (params) => ({
        url: "/industry/get",
        params,
      }),
      transformResponse: (response: ApiResponse<Industry[]>) => response.data,
      providesTags: ["Industry"],
    }),
  }),
});

export const { useGetIndustriesQuery } = industriesApi;
