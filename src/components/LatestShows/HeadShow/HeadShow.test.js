import { useSelector, useDispatch } from 'react-redux'
import { fireEvent } from '@testing-library/react'
import renderWithProviders from '../../../utils/test'
import HeadShow from '.'
import { mockedUsedNavigate } from '../../../utils/test/mocks'

const showData = {
    id: '1',
    verified: true,
    title: 'Test podcast',
    image: 'https://image.com',
    mainImage: 'https://main-image.com',
    source: 'https://source.com'
}

describe('HeadShow', () => {
    const state = {
        player: {
            id: '1',
            isPlaying: false
        }
    }

    const mockedDispatch = jest.fn()

    beforeEach(() => {
        useDispatch.mockReturnValue(mockedDispatch)
        useSelector.mockImplementation((callback) => {
            return callback(state)
        })
    })

    afterEach(() => {
        useDispatch.mockClear()
        useSelector.mockClear()
    })

    it('should render main ui elements', async () => {
        const { findByTestId, getByText } = renderWithProviders(<HeadShow showData={showData} />)

        const title = getByText(showData.title)
        expect(title).toBeVisible()

        const playButton = await findByTestId('head-show-play-icon')
        expect(playButton).toBeInTheDocument()

        const redirectToCurrentShowLink = await findByTestId('head-show-go-to-show-button')
        expect(redirectToCurrentShowLink).toBeInTheDocument()
    })

    it('should allow to toggle play/pause', async () => {
        const { findByTestId } = renderWithProviders(<HeadShow showData={showData} />)

        const dispatchData = {
            payload: true,
            type: 'player/setIsPlaying'
        }

        const playButton = await findByTestId('head-show-play-icon')
        expect(playButton).toBeInTheDocument()

        fireEvent.click(playButton)

        expect(mockedDispatch).toHaveBeenCalledWith(dispatchData)
    })

    it('should render the Pause icon if isPlaying equals true', async () => {
        const currentState = { ...state }
        currentState.player.isPlaying = true

        useSelector.mockImplementationOnce((callback) => {
            return callback(state)
        })

        const { findByTestId } = renderWithProviders(<HeadShow showData={showData} />)

        const pauseButton = await findByTestId('head-show-pause-icon')
        expect(pauseButton).toBeInTheDocument()
    })

    it('should redirect to a show page when "Go to Show" button was clicked', async () => {
        const { findByTestId } = renderWithProviders(<HeadShow showData={showData} />)

        const redirectToCurrentShowLink = await findByTestId('head-show-go-to-show-button')
        fireEvent.click(redirectToCurrentShowLink)

        expect(mockedUsedNavigate).toHaveBeenCalledWith('/shows/1')
    })

    it('should render images', async () => {
        const { findByTestId } = renderWithProviders(<HeadShow showData={showData} />)

        const mainImage = await findByTestId('background-image')
        expect(mainImage).toHaveAttribute('src', showData.mainImage)

        const posterImage = await findByTestId('head-show-image')
        expect(posterImage).toHaveAttribute('src', showData.image)
    })
})
