import { useSelector, useDispatch } from 'react-redux'
import dayjs from 'dayjs'
import { fireEvent } from '@testing-library/react'
import renderWithProviders from '../../../../utils/test'
import Episode from '.'

const episode = {
    id: '1',
    date: '2022-01-25T14:23:11.716Z',
    description: 'Episode description',
    extendedDescription: 'Extended description',
    title: 'Test podcast',
    image: 'https://image.com',
    source: 'https://source.com'
}

describe('Episode', () => {
    const state = {
        player: {
            id: '1',
            isPlaying: false
        }
    }

    const formattedDate = dayjs(new Date(episode.date)).format('MMM D, YYYY')

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
        const { findByTestId, getByText } = renderWithProviders(<Episode episode={episode} />)

        const title = getByText(episode.title)
        const description = getByText(episode.description)
        const expandMoreButton = await findByTestId('expand-more')
        const date = getByText(formattedDate)

        expect(title).toBeVisible()
        expect(description).toBeVisible()
        expect(expandMoreButton).toBeInTheDocument()
        expect(date).toBeVisible()
    })

    it('should show extended description when click to "Expand More" button', async () => {
        const { findByTestId, getByText, queryByText } = renderWithProviders(<Episode episode={episode} />)

        const expandMoreButton = await findByTestId('expand-more')
        const extendedDescription = queryByText(episode.extendedDescription)

        expect(extendedDescription).toHaveClass('collapsed-description')
        fireEvent.click(expandMoreButton)

        expect(extendedDescription).toHaveClass('expanded-description')
    })

    it('should play the episode and set params when Play button is clicked', async () => {
        const { findByTestId } = renderWithProviders(<Episode episode={episode} />)

        const params = {
            id: episode.id,
            isPlaying: true,
            audioSrc: episode.source,
            imageSrc: episode.image,
            title: episode.title
        }

        const dispatchData = {
            payload: params,
            type: 'player/setPlayerInfo'
        }

        const playButton = await findByTestId('PlayCircleOutlinedIcon')

        fireEvent.click(playButton)

        expect(mockedDispatch).toHaveBeenCalledWith(dispatchData)
    })
})
