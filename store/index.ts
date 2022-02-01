import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { showsApi } from 'store/queries/shows';
import playerSlice from 'store/slices/playerSlice';
import sidebarSlice from 'store/slices/sidebarSlice';

export const store = configureStore({
  reducer: {
    [showsApi.reducerPath]: showsApi.reducer,
    player: playerSlice,
    sidebar: sidebarSlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(showsApi.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch