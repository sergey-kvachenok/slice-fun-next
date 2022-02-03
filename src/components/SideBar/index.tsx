// libraries
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import PodcastsIcon from '@mui/icons-material/Podcasts'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
// components
import RuFlag from 'src/assets/icons/RuFlag'
import UsFlag from 'src/assets/icons/UsFlag'
import { StyledLink } from 'src/components/shared/containers'
// constants
import { sideBarButtons } from 'src/constants/sideBar'

const styles = {
    sideBarText: {
        '& .MuiTypography-root': {
            fontFamily: 'Montserrat-Bold'
        }
    }
}

const SideBar = () => {
    const router = useRouter()
    const { asPath, pathname } = router || {}
    const { t } = useTranslation(['sideBar'])

    const changeLanguage = (language: string) => {
        router.push(asPath, asPath, { locale: language })
    }

    return (
        <List sx={{ borderRight: 1, borderColor: 'grey.200' }}>
            <StyledLink href="/">
                <ListItem>
                    <ListItemIcon>
                        <PodcastsIcon sx={{ fontSize: 40 }} />
                    </ListItemIcon>

                    <ListItemText sx={styles.sideBarText}>
                        <Typography variant="h4">Slice</Typography>
                    </ListItemText>
                </ListItem>
            </StyledLink>

            {sideBarButtons.map((button) => (
                <StyledLink href={button.link} key={button.name}>
                    <ListItem disabled={button.link === pathname} button>
                        <ListItemIcon>{button.icon}</ListItemIcon>
                        <ListItemText sx={styles.sideBarText} primary={t(button.name)} />
                    </ListItem>
                </StyledLink>
            ))}

            <StyledLink href="/account">
                <ListItem sx={{ mt: 5 }} button>
                    <ListItemIcon>
                        <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText sx={styles.sideBarText} primary={t('yourAccount')} />
                </ListItem>
            </StyledLink>
            <Divider />

            <ListItem sx={{ mt: 1 }}>
                <IconButton
                    data-testid="rus-flag-button"
                    sx={{ backgroundColor: 'grey.200', mr: 3 }}
                    onClick={() => changeLanguage('ru')}
                >
                    <RuFlag />
                </IconButton>
                <IconButton
                    data-testid="en-flag-button"
                    sx={{ backgroundColor: 'grey.200' }}
                    onClick={() => changeLanguage('en')}
                >
                    <UsFlag />
                </IconButton>
            </ListItem>
        </List>
    )
}

export default SideBar
