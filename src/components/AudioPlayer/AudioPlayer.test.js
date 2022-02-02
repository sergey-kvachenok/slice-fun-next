import { useSelector, useDispatch } from 'react-redux'
import { fireEvent } from '@testing-library/react'
import renderWithProviders from '../../utils/test'
import AudioPlayer, { shiftTime } from '.'

describe('Audio Player', () => {
    const state = {
        player: {
            id: '1',
            isPlaying: false,
            title: 'Podcast test',
            imageSrc: 'https://image.com',
            audioSrc: 'https://audio.com',
            duration: '750',
            currentTime: '240'
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
        const { getByTestId, getByText } = renderWithProviders(<AudioPlayer />)

        const durationInMinutes = '12:30'

        const title = getByText(state.player.title)
        const duration = getByText(`Duration: ${durationInMinutes}`)
        const shiftBackButton = getByTestId('shift-back-button')
        const shiftForwardButton = getByTestId('shift-forward-button')
        const playPauseButton = getByTestId('play-pause-button')
        const currentTime = getByTestId('current-time')
        const progressBar = getByTestId('progress-bar')

        expect(title).toBeVisible()
        expect(duration).toBeVisible()
        expect(shiftBackButton).toBeVisible()
        expect(shiftForwardButton).toBeVisible()
        expect(playPauseButton).toBeVisible()
        expect(currentTime).toBeVisible()
        expect(progressBar).toBeVisible()
    })

    it('should allow to toggle play/pause', () => {
        const { getByTestId } = renderWithProviders(<AudioPlayer />)

        const dispatchData = {
            payload: true,
            type: 'player/setIsPlaying'
        }

        const playPauseButton = getByTestId('play-pause-button')

        fireEvent.click(playPauseButton)

        expect(mockedDispatch).toHaveBeenCalledWith(dispatchData)
    })

    it('should allow to jump forward', () => {
        const { getByTestId } = renderWithProviders(<AudioPlayer />)

        const dispatchData = {
            payload: shiftTime,
            type: 'player/setCurrentTime'
        }

        const shiftForwardButton = getByTestId('shift-forward-button')

        fireEvent.click(shiftForwardButton)

        expect(mockedDispatch).toHaveBeenCalledWith(dispatchData)
    })

    it('should allow to jump backward', () => {
        const { getByTestId } = renderWithProviders(<AudioPlayer />)

        const shiftBackButton = getByTestId('shift-back-button')

        fireEvent.click(shiftBackButton)

        expect(mockedDispatch).toHaveBeenCalled()
    })

    it('should allow to pause the audio', () => {
        const currentState = { ...state }
        currentState.player.isPlaying = true

        useSelector.mockImplementationOnce((callback) => {
            return callback(currentState)
        })

        const dispatchData = {
            payload: false,
            type: 'player/setIsPlaying'
        }

        const { getByTestId } = renderWithProviders(<AudioPlayer />)

        const pauseButton = getByTestId('play-pause-button')
        expect(pauseButton).toBeInTheDocument()

        fireEvent.click(pauseButton)

        expect(mockedDispatch).toHaveBeenCalledWith(dispatchData)
    })
})
