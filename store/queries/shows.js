import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const showsApi = createApi({
    reducerPath: 'shows',
    refetchOnReconnect: true,
    tagTypes: ['Shows'],
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_SHOWS_BACKEND_URL }),
    endpoints: (builder) => ({
        getShows: builder.query({
            query: (args) => {
                const { search } = args
                return {
                    url: `shows`,
                    params: { search }
                }
            },
            providedTags: ['Shows'], // helps to refetch data if shows were changed by mutation (currently not useful here)
            transformResponse: (response, meta, arg) => {
                return response
            }
        }),
        getPopularShows: builder.query({
            query: () => ({ url: `shows/popular` }),
            transformResponse: (response, meta, arg) => response
        }),
        getLibrary: builder.query({
            query: (args) => {
                const { category } = args
                return {
                    url: `shows/library`,
                    params: { category }
                }
            },
            transformResponse: (response, meta, arg) => {
                return response
            }
        }),
        getShowsById: builder.query({
            query: (args) => {
                const { id, search } = args || {}

                return {
                    url: `shows/${id}`,
                    params: { search }
                }
            },
            transformResponse: (response, meta, arg) => response
        })
    })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetShowsQuery, useGetLibraryQuery, useGetPopularShowsQuery, useGetShowsByIdQuery } = showsApi
