import { lazy } from 'react'

const Library = lazy(() => import('../pages/Library'))
const LatestShows = lazy(() => import('../pages/LatestShows'))
const Shows = lazy(() => import('../pages/Shows'))
const Show = lazy(() => import('../pages/Show'))

export const routes = [
    {
        path: '/',
        component: LatestShows
    },
    {
        path: '/shows',
        component: Shows
    },
    {
        path: '/library',
        component: Library
    },
    {
        path: '/shows/:id',
        component: Show
    }
]
