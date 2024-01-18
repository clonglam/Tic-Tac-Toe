/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Middleware } from "@reduxjs/toolkit"
import { HistoryState } from "../features/history/historySlice"
import { GameState } from "../features/tictactoe/ticTacToeSlice"

// Define a type for the history
// type HistoryState = {
//   past: RootState[]
//   future: RootState[]
// }

// // Initialize your history state
// const initialHistoryState: HistoryState = {
//   past: [],
//   future: [],
// }

// Create the undo middleware
const undoMiddleware: Middleware = (store) => (next) => (action: any) => {
  // const currentState = store.getState()
  const ticTacToeState: GameState = store.getState().ticTacToe
  // const historyState: HistoryState = store.getState().history // Assuming 'history' is a part of your root state

  // console.log("action,type", action)
  if (action.type === "ticTacToe/placeMark") {
    console.log("placeMark")
    console.log(ticTacToeState.currentRound)
    console.log(ticTacToeState.board)
    store.dispatch({
      type: "history/updateHistory",
      payload: {
        round: ticTacToeState.currentRound,
        board: ticTacToeState.board,
      },
    })
    return next(action)

    // console.log("placed mark", action.payload)
  }

  // if (action.type === "ticTacToe.placeMark") {
  // }
  // if (action.type === "UNDO_ACTION") {
  //   if (historyState.past.length === 0) return next(action)

  //   const previousState = historyState.past[historyState.past.length - 1]
  //   const newPast = historyState.past.slice(0, -1)
  //   const newFuture = [currentState, ...historyState.future]

  //   // Dispatch an action to update your state to the previous state
  //   // and update your history state
  //   store.dispatch({ type: "SET_STATE", payload: previousState })
  //   store.dispatch({
  //     type: "UPDATE_HISTORY",
  //     payload: { past: newPast, future: newFuture },
  //   })
  //   console.log("THis is hum.", currentState.past)
  // } else {
  //   // For all other actions, add the current state to the past
  //   const newPast = [...historyState.past, currentState]
  //   if (newPast.length > 10) newPast.shift() // Limit the history size

  //   store.dispatch({
  //     type: "UPDATE_HISTORY",
  //     payload: { past: newPast, future: [] },
  //   })
  //   return next(action)
  // }
  return next(action)
}

export default undoMiddleware

// You will also need to update your reducers to handle 'SET_STATE' and 'UPDATE_HISTORY' actions
