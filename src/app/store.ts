import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit"
import ticTacToeReducer from "../features/tictactoe/ticTacToeSlice"
import historyReducer from "../features/history/historySlice"

export const store = configureStore({
  reducer: {
    ticTacToe: ticTacToeReducer,
    history: historyReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
