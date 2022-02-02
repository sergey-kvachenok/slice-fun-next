import { fireEvent } from '@testing-library/react'
import renderWithProviders from '../../../utils/test'
import Search from '.'

describe('Search', () => {
    const handleSearchChange = jest.fn()

    it('should trigger handleSearchChange event after changes', async () => {
        const { findByTestId } = renderWithProviders(<Search handleSearchChange={handleSearchChange} />)

        const searchInput = await findByTestId('search-input')

        fireEvent.change(searchInput, { target: { value: 'abc' } })

        expect(handleSearchChange).toHaveBeenCalledWith('abc')
    })
})
