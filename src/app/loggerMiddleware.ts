/* eslint-disable @typescript-eslint/no-unused-vars */
import { Middleware } from "@reduxjs/toolkit"
import { RootState } from "./store" // Import your root state type

// Define a type for the history
type HistoryState = {
  past: RootState[]
  future: RootState[]
}

// Initialize your history state
const initialHistoryState: HistoryState = {
  past: [],
  future: [],
}

// Create the undo middleware
const loggerMiddleware: Middleware = (store) => (next) => (action) => {
  console.log("Logger: Logging state.")

  //   const currentState = store.getState()
  //   const historyState: HistoryState = store.getState().history // Assuming 'history' is a part of your root state

  return next(action)
}

export default loggerMiddleware

// You will also need to update your reducers to handle 'SET_STATE' and 'UPDATE_HISTORY' actions
