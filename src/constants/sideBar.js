import FiberNewIcon from '@mui/icons-material/FiberNew'
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'

export const sideBarButtons = [
    {
        name: 'latest',
        icon: <FiberNewIcon />,
        link: '/'
    },
    {
        name: 'shows',
        icon: <LibraryMusicIcon />,
        link: '/shows'
    },
    {
        name: 'library',
        icon: <VideoLibraryIcon />,
        link: '/library'
    }
]
