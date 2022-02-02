import { fireEvent } from '@testing-library/react'
import renderWithProviders from '../../utils/test'
import sidebarEn from '../../translations/en/sideBar.json'
import sidebarRu from '../../translations/ru/sideBar.json'
import { sideBarButtons } from '../../constants/sideBar'
import SideBar from '.'

describe('SideBar', () => {
    it('should render all routes', async () => {
        const { getByText } = renderWithProviders(<SideBar />)

        sideBarButtons.forEach(({ name }) => {
            const label = getByText(sidebarEn[name])
            expect(label).toBeVisible()
        })
    })

    it('should allow to change the language', async () => {
        const { findByTestId, getByText, queryByText } = renderWithProviders(<SideBar />)

        const latestLinkLabel = getByText(sidebarEn.latest)
        const invisibleRuLabel = queryByText(sidebarRu.latest)

        expect(latestLinkLabel).toBeVisible()
        expect(invisibleRuLabel).not.toBeInTheDocument()

        const ruButton = await findByTestId('rus-flag-button')
        fireEvent.click(ruButton)

        const visibleRuLabel = getByText(sidebarRu.latest)

        expect(visibleRuLabel).toBeVisible()
    })
})
