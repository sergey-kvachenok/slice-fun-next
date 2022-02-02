import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ISingleShow, IPopularShow, ILibraryShow } from 'src/constants/interfaces'

interface ILatestShow {
    search: string
}

interface IShow extends ILatestShow {
    id: string
}

// Define a service using a base URL and expected endpoints
export const showsApi = createApi({
    reducerPath: 'shows',
    refetchOnReconnect: true,
    tagTypes: ['Shows'],
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_SHOWS_BACKEND_URL }),
    endpoints: (builder) => ({
        getShows: builder.query<IPopularShow[], ILatestShow>({
            query: (args) => {
                const { search } = args
                return {
                    url: `shows`,
                    params: { search }
                }
            },
            // providedTags: ['Shows'], // helps to refetch data if shows were changed by mutation (currently not useful here)
            transformResponse: (response: IPopularShow[], meta, arg) => {
                return response
            }
        }),
        getPopularShows: builder.query<IPopularShow[], void>({
            query: () => ({ url: `shows/popular` }),
            transformResponse: (response: IPopularShow[], meta, arg) => response
        }),
        getLibrary: builder.query<ILibraryShow[], { category: String }>({
            query: (args) => {
                const { category } = args
                return {
                    url: `shows/library`,
                    params: { category }
                }
            },
            transformResponse: (response: ILibraryShow[], meta, arg) => {
                return response
            }
        }),
        getShowsById: builder.query<ISingleShow, IShow>({
            query: (args) => {
                const { id, search } = args || {}

                return {
                    url: `shows/${id}`,
                    params: { search }
                }
            },
            transformResponse: (response: ISingleShow, meta, arg) => response
        })
    })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetShowsQuery, useGetLibraryQuery, useGetPopularShowsQuery, useGetShowsByIdQuery } = showsApi
