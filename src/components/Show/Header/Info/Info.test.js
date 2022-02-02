import renderWithProviders from '../../../../utils/test'
import Info from '.'
import verifiedEn from '../../../../translations/en/verified.json'
import commonEn from '../../../../translations/en/common.json'

const props = {
    verified: true,
    title: 'Info element test title',
    imageSrc: 'https://image.com'
}

describe('Info', () => {
    it('should render main ui elements', () => {
        const { getByText, getByTestId } = renderWithProviders(<Info {...props} />)

        const title = getByText(props.title)
        const verified = getByText(verifiedEn.verified)
        const followBtn = getByText(commonEn.follow)
        const addPlaylistBtn = getByText(commonEn.addPlaylist)
        const podcastImage = getByTestId('podcast-image')

        expect(title).toBeVisible()
        expect(verified).toBeVisible()
        expect(followBtn).toBeVisible()
        expect(addPlaylistBtn).toBeVisible()
        expect(podcastImage).toHaveAttribute('src', props.imageSrc)
    })
})
