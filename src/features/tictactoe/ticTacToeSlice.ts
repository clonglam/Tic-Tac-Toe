import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../../app/store"

export type LineType = "horizontal" | "vertical" | "diagonal"

export enum GameMode {
  Easy,
  Medium,
  Impossible,
  PVP,
}
interface GameState {
  board: number[]
  currentPlayer: number
  winner: number | null
  lineType: LineType | null
  linePosition: number | null
  gameMode: GameMode
}
// Define the initial state using that type
const initialState: GameState = {
  board: Array(9).fill(0),
  currentPlayer: 1,
  winner: null,
  lineType: null,
  linePosition: null,
  gameMode: GameMode["Impossible"],
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

export const ticTacToeSlice = createSlice({
  name: "ticTacToe",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    initialGame: (state) => {
      state.board = initialState.board
      state.currentPlayer = initialState.currentPlayer
      state.winner = initialState.winner
    },
    newGame: (state) => {
      state.board = initialState.board
      state.currentPlayer = initialState.currentPlayer
      state.winner = initialState.winner
    },

    setGameMode: (state, { payload }: PayloadAction<GameMode>) => {
      state.gameMode = payload
    },

    setWinner: (state, { payload }: PayloadAction<number>) => {
      state.winner = payload
    },
    placeMark: (state, { payload }: PayloadAction<number>) => {
      if (state.board[payload] !== 0) return

      state.board = state.board.map((cell, index) =>
        index === payload ? state.currentPlayer : cell
      )
    },
    nextPlayer: (state) => {
      state.currentPlayer *= -1
    },
    checkWinner: (state) => {
      const board = state.board
      // No winner or draw yet
      state.winner = null

      if (!board.includes(0)) {
        state.winner = 0 // 0 indicates a draw
      }

      for (let i = 0; i < winCombination.length; i++) {
        const [a, b, c] = winCombination[i]
        if (board[a] !== 0 && board[a] === board[b] && board[a] === board[c]) {
          state.winner = board[a]
          const { lineType, linePosition } = caclDrawingPosition(
            i,
            winCombination[i]
          )
          state.lineType = lineType
          state.linePosition = linePosition
        }
      }
    },
  },
})

export const {
  placeMark,
  nextPlayer,
  checkWinner,
  newGame,
  setWinner,
  setGameMode,
} = ticTacToeSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const slectCurrentPlayer = (state: RootState) =>
  state.ticTacToe.currentPlayer
export const selectGameMode = (state: RootState) => state.ticTacToe.gameMode
export const selectWinner = (state: RootState) => state.ticTacToe.winner
export const selectBoard = (state: RootState) => state.ticTacToe.board
export const selectLineType = (state: RootState) => state.ticTacToe.lineType
export const selectLinePosition = (state: RootState) =>
  state.ticTacToe.linePosition

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

export default ticTacToeSlice.reducer
