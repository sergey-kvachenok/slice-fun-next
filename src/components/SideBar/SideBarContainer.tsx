// libraries
import { useSelector, useDispatch } from 'react-redux'
import Drawer from '@mui/material/Drawer'
// components
import SideBar from '.'
// store
import { toggleIsMobileSidebarActive } from 'store/slices/sidebarSlice'

const SideBarContainer = () => {
    const dispatch = useDispatch()
    const { isMobileSidebarActive } = useSelector(({ sidebar }) => sidebar)

    const handleMobileSidebarToggle = () => {
        dispatch(toggleIsMobileSidebarActive())
    }

    return (
        <>
            <Drawer
                variant="temporary"
                open={isMobileSidebarActive}
                onClose={handleMobileSidebarToggle}
                ModalProps={{ keepMounted: true }}
                sx={{ display: { xs: 'block', sm: 'none' } }}
            >
                <SideBar />
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: {
                        xs: 'none',
                        sm: 'block',
                        '& .MuiPaper-root': { position: 'initial', borderRight: 'none' }
                    }
                }}
                open
            >
                <SideBar />
            </Drawer>
        </>
    )
}

export default SideBarContainer
