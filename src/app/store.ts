import { configureStore } from "@reduxjs/toolkit"
import ticTacToeReducer from "../features/tictactoe/ticTacToeSlice"
import historyReducer from "../features/history/historySlice"
import undoMiddleware from "./undoMiddleware"
import loggerMiddleware from "./loggerMiddleware"

export const store = configureStore({
  reducer: {
    ticTacToe: ticTacToeReducer,
    history: historyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware).concat(undoMiddleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
