import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type PlayerProps = {
    id: string | null
    isPlaying: boolean
    title: string
    audioSrc?: string
    imageSrc?: string
    duration?: Number
    currentTime?: Number
}

const initialState: PlayerProps = {
    id: null,
    isPlaying: false,
    title: '',
    audioSrc: '',
    imageSrc: '',
    duration: 0,
    currentTime: 0
}

export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setPlayerInfo: (state, action: PayloadAction<PlayerProps>) => {
            const { id, isPlaying, audioSrc, imageSrc, title } = action.payload

            state.id = id
            state.isPlaying = isPlaying
            state.audioSrc = audioSrc
            state.title = title
            state.imageSrc = imageSrc
        },
        setIsPlaying: (state, action: PayloadAction<boolean>) => {
            state.isPlaying = action.payload
        },
        setDuration: (state, action: PayloadAction<number>) => {
            state.duration = action.payload
        },
        setCurrentTime: (state, action: PayloadAction<number>) => {
            state.currentTime = action.payload
        }
    }
})

export const { setPlayerInfo, setIsPlaying, setDuration, setCurrentTime } = playerSlice.actions

export default playerSlice.reducer
