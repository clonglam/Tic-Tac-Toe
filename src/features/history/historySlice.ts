import { createSlice } from "@reduxjs/toolkit"

import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../../app/store"
import { Cell, Marks } from "../tictactoe/ticTacToeSlice"

type History = {
  board: Cell[]
  currentRound: Marks
}

export interface HistoryState {
  past: History[]
  future: History[]
}

// Define the initial state using that type
const initialState: HistoryState = {
  past: [],
  future: [],
}

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    initialHistory: (state) => {
      state.past = []
    },
    updateHistory: (state, { payload }: PayloadAction<History>) => {
      state.past.push(payload)
    },
    undo: (state, { payload }: PayloadAction<History>) => {
      console.log("undo")
      //   state.gameMode = payload
      //   state.board = initialState.board
      //   state.currentRound = initialState.currentRound
      //   state.result = initialState.result

      //   // Empty the Score
      //   Object.keys(state.players).forEach((key) => {
      //     let newPlayerType
      //     if (state.gameMode === GameMode.PVP) {
      //       newPlayerType = PlayerType["HUMAN"]
      //     } else {
      //       newPlayerType =
      //         key === state.humanMark ? PlayerType["HUMAN"] : PlayerType["AI"]
      //     }

      //     state.players[key as Marks] = {
      //       score: 0,
      //       playerType: newPlayerType,
      //     }
      //   })
    },
  },
})

export const { undo, initialHistory } = historySlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectHistories = (state: RootState) => state.history.past

export default historySlice.reducer
