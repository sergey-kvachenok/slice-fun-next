import renderWithProviders from '../../../utils/test'
import Headlines from '.'

const headlines = [
    {
        title: 'Headline element test title',
        description: 'Headline 1',
        image: 'https://image1.com'
    },
    {
        title: 'Headline element test title',
        description: 'Headline 2',
        image: 'https://image2.com'
    }
]

describe('Headlines', () => {
    it('should render all headline elements', () => {
        const { getByTestId } = renderWithProviders(<Headlines headlines={headlines} />)

        const headlinesWrapper = getByTestId('headlines')
        expect(headlinesWrapper.children.length).toBe(2)
    })
})
