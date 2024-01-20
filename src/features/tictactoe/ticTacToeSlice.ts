/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit"
import _ from "lodash"

import type { PayloadAction } from "@reduxjs/toolkit"
import type { AppThunk, RootState } from "../../app/store"

export type LineType = "horizontal" | "vertical" | "diagonal"

export type Cell = Marks | null

export type Marks = "X" | "O"

export type GameResult =
  | { winner: Marks; lineType: LineType; linePosition: number }
  | "TIE"
  | null

export interface GameState {
  board: Cell[]
  currentRound: Marks
  result: GameResult
}

// Define the initial state using that type
const initialState: GameState = {
  board: Array(9).fill(null),
  currentRound: "X",
  result: null,
}

export const ticTacToeSlice = createSlice({
  name: "ticTacToe",
  initialState,
  reducers: {
    initialGame: (state) => {
      state.board = initialState.board
      state.currentRound = initialState.currentRound
      state.result = initialState.result
    },
    newGame: (state) => {
      state.board = initialState.board
      state.currentRound = initialState.currentRound
      state.result = initialState.result
    },
    editBoard: (
      state,
      { payload }: PayloadAction<{ player: Marks; cellIndex: number }>
    ) => {
      if (state.board[payload.cellIndex] !== null) return

      state.board = state.board.map((cell, index) =>
        index === payload.cellIndex ? payload.player : cell
      )
    },
    nextPlayer: (state) => {
      state.currentRound = state.currentRound === "X" ? "O" : "X"
    },
    checkWinner: (state) => {
      state.result = checkForWinner(state.board)
    },
  },
})

export const { editBoard, nextPlayer, checkWinner, newGame } =
  ticTacToeSlice.actions

export const selectResult = (state: RootState) => state.ticTacToe.result
export const selectBoard = (state: RootState) => state.ticTacToe.board

export const selectCurrentRound = (state: RootState) =>
  state.ticTacToe.currentRound

export const placeMark =
  (cellIndex: number): AppThunk =>
  (dispatch, getState) => {
    const gameState = getState().ticTacToe

    dispatch(editBoard({ cellIndex, player: gameState.currentRound }))
    dispatch(checkWinner())
    dispatch(nextPlayer())
  }

const winCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const caclDrawingPosition = (
  i: number,
  combine: number[]
): { lineType: LineType; linePosition: number } => {
  const [a] = combine

  if (i < 3) {
    return {
      lineType: "horizontal",
      linePosition: Math.floor(a / 3) + 1,
    }
  } else if (i < 6) {
    return {
      lineType: "vertical",
      linePosition: (a % 3) + 1,
    }
  } else {
    return {
      lineType: "diagonal",
      linePosition: i === 6 ? 1 : 2,
    }
  }
}

function checkForWinner(board: Cell[]): GameResult {
  for (let i = 0; i < winCombination.length; i++) {
    const [a, b, c] = winCombination[i]
    if (board[a] !== null && board[a] === board[b] && board[a] === board[c]) {
      return {
        winner: board[a] as Marks,
        ...caclDrawingPosition(i, winCombination[i]),
      }
    }
  }
  if (!board.includes(null)) return "TIE" // 0 indicates a draw
  return null
}

export default ticTacToeSlice.reducer
