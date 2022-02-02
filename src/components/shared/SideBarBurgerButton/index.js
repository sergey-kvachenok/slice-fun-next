// libraries
import { useDispatch } from 'react-redux'
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'
// utils
import { colors } from 'src/utils/theme'
// store
import { toggleIsMobileSidebarActive } from 'store/slices/sidebarSlice'

const SideBarBurgerButton = () => {
    const dispatch = useDispatch()

    const handleMobileSidebarToggle = () => {
        dispatch(toggleIsMobileSidebarActive())
    }

    return (
        <IconButton
            edge="start"
            size="small"
            onClick={handleMobileSidebarToggle}
            sx={{
                display: { sm: 'none' },
                backgroundColor: `${colors.coralRed}`,
                position: 'fixed',
                bottom: 50,
                left: 20,
                zIndex: 100
            }}
        >
            <MenuIcon sx={{ fontSize: 30, color: colors.darkBlue1 }} />
        </IconButton>
    )
}

export default SideBarBurgerButton
