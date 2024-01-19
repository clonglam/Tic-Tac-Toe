import { createSlice } from "@reduxjs/toolkit"

import type { PayloadAction } from "@reduxjs/toolkit"
import type { AppThunk, RootState } from "../../app/store"
import { Cell, Marks, rollbackGameBoard } from "../tictactoe/ticTacToeSlice"

export type History = {
  board: Cell[]
  currentRound: Marks
}

export interface HistoryState {
  past: History[]

  rollBackStep: number
}

// Define the initial state using that type
const initialState: HistoryState = {
  past: [{ board: Array(9).fill(null), currentRound: "X" }],

  rollBackStep: 0,
}

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    initialHistory: (state) => {
      state.past = initialState.past
      state.rollBackStep = initialState.rollBackStep
    },
    updateHistory: (state, { payload }: PayloadAction<History>) => {
      if (state.rollBackStep !== state.past.length - 1)
        state.past = state.past.slice(0, state.rollBackStep + 1)

      state.past.push(payload)
      state.rollBackStep += 1
    },
    moveHistoryPointer: (state, { payload }: PayloadAction<number>) => {
      state.rollBackStep = payload
    },
  },
})

export const { initialHistory, moveHistoryPointer, updateHistory } =
  historySlice.actions

export const recoverFromHistory =
  (step: number): AppThunk =>
  (dispatch, getState) => {
    const historyState = getState().history

    if (step < 0 || step >= historyState.past.length) {
      console.error("Invalid step number")
      return
    }

    const rollbackRecord = getState().history.past[step]

    dispatch(moveHistoryPointer(step))
    dispatch(rollbackGameBoard(rollbackRecord))
  }
// Other code such as selectors can use the imported `RootState` type
export const selectHistories = (state: RootState) => state.history.past
export const selectRollBackStep = (state: RootState) =>
  state.history.rollBackStep

export default historySlice.reducer
