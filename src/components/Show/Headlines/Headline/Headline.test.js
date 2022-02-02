import renderWithProviders from '../../../../utils/test'
import Headline from '.'

const headline = {
    title: 'Headline element test title',
    description: 'Headline 1',
    image: 'https://image1.com'
}

describe('Headline', () => {
    it('should render all elements', () => {
        const { getByTestId, getByText } = renderWithProviders(<Headline headline={headline} />)

        const title = getByText(headline.title)
        const description = getByText(headline.description)
        const banner = getByTestId('banner')
        const shareIcon = getByTestId('share-icon')
        const posterImage = getByTestId('poster-image')

        expect(title).toBeVisible()
        expect(description).toBeVisible()
        expect(banner).toBeVisible()
        expect(shareIcon).toBeVisible()
        expect(posterImage).toHaveAttribute('src', headline.image)
    })
})
