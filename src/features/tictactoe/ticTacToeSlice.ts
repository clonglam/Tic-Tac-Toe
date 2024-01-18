import { createSlice } from "@reduxjs/toolkit"
import _ from "lodash"

import type { PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../../app/store"

export type LineType = "horizontal" | "vertical" | "diagonal"

export enum PlayerType {
  HUMAN = "H",
  AI = "A",
}

export enum GameMode {
  EASY = "0",
  MEDIUM = "1",
  IMPOSSIBLE = "2",
  PVP = "3",
}

export type Cell = Marks | null

export type Marks = "X" | "O"

export type Player = {
  playerType: PlayerType
  score: number
}

export type PlayerState = { [key in Marks]: Player }

const playerState: PlayerState = {
  O: {
    score: 0,
    playerType: PlayerType["AI"],
  },
  X: {
    playerType: PlayerType["HUMAN"],
    score: 0,
  },
}

export type GameResult =
  | { winner: Marks; lineType: LineType; linePosition: number }
  | "TIE"
  | null

export interface GameState {
  board: Cell[]
  currentRound: Marks
  players: PlayerState
  result: GameResult
  gameMode: GameMode
  humanMark: Marks
}

// Define the initial state using that type
const initialState: GameState = {
  board: Array(9).fill(null),
  players: playerState,
  gameMode: GameMode["MEDIUM"],
  currentRound: "X",
  result: null,
  humanMark: "X",
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
    setGameMode: (state, { payload }: PayloadAction<GameMode>) => {
      state.gameMode = payload
      state.board = initialState.board
      state.currentRound = initialState.currentRound
      state.result = initialState.result

      // Empty the Score
      Object.keys(state.players).forEach((key) => {
        let newPlayerType
        if (state.gameMode === GameMode.PVP) {
          newPlayerType = PlayerType["HUMAN"]
        } else {
          newPlayerType =
            key === state.humanMark ? PlayerType["HUMAN"] : PlayerType["AI"]
        }

        state.players[key as Marks] = {
          score: 0,
          playerType: newPlayerType,
        }
      })
    },
    switchMark: (state) => {
      state.humanMark = state.humanMark === "X" ? "O" : "X"

      Object.entries(state.players).forEach(([key, value]) => {
        state.players[key as Marks] = {
          score: 0,
          playerType:
            value.playerType == PlayerType["AI"]
              ? PlayerType["HUMAN"]
              : PlayerType["AI"],
        }
      })
    },
    placeMark: (state, { payload }: PayloadAction<number>) => {
      if (state.board[payload] !== null) return

      state.board = state.board.map((cell, index) =>
        index === payload ? state.currentRound : cell
      )
    },
    nextPlayer: (state) => {
      state.currentRound = state.currentRound === "X" ? "O" : "X"
    },
    checkWinner: (state) => {
      state.result = checkForWinner(state.board)
      if (state.result !== "TIE" && state.result !== null) {
        state.players[state.result.winner].score += 1
      }
    },
    aiMove: (state) => {
      if (state.players[state.currentRound].playerType !== PlayerType["AI"])
        return

      let move: number

      switch (state.gameMode) {
        case GameMode["EASY"]:
          move = pickRandomEmptySpace(state.board)!
          break
        case GameMode["MEDIUM"]:
          move = pickRandomEmptySpace(state.board)!
          break
        case GameMode["IMPOSSIBLE"]:
          if (state.board.every((cell) => cell === null)) {
            move = 0
            break
          }
          move = findBestMove(state.board, state.humanMark === "X" ? "O" : "X")!
          break
      }

      state.board = state.board.map((cell, index) =>
        index === move ? state.currentRound : cell
      )
    },
  },
})

export const {
  placeMark,
  nextPlayer,
  checkWinner,
  newGame,
  switchMark,
  setGameMode,
  aiMove,
} = ticTacToeSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const slectCurrentPlayer = (state: RootState) =>
  state.ticTacToe.players[state.ticTacToe.currentRound]
export const selectPlayers = (state: RootState) => state.ticTacToe.players
export const selectGameMode = (state: RootState) => state.ticTacToe.gameMode
export const selectResult = (state: RootState) => state.ticTacToe.result
export const selectBoard = (state: RootState) => state.ticTacToe.board
export const selectHumanMark = (state: RootState) => state.ticTacToe.humanMark
export const selectCurrentRound = (state: RootState) =>
  state.ticTacToe.currentRound

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

function pickRandomEmptySpace(board: Cell[]) {
  const emptyIndices = _.compact(
    board.map((cell, index) => (cell === null ? index : null))
  )

  return _.sample(emptyIndices)
}

function minimax(
  board: Cell[],
  depth: number,
  isMaximizingPlayer: boolean,
  aiPlayerMark: Marks
) {
  const result = checkForWinner(board)

  if (result !== null) {
    return result === "TIE" ? 0 : result.winner === aiPlayerMark ? 10 : -10
  }

  if (isMaximizingPlayer) {
    let bestScore = -Infinity
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = aiPlayerMark // AI's move
        const score = minimax(board, depth + 1, false, aiPlayerMark)
        board[i] = null
        bestScore = Math.max(score, bestScore)
      }
    }
    return bestScore
  } else {
    let bestScore = Infinity
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = aiPlayerMark === "X" ? "O" : "X" // Human's move
        const score = minimax(board, depth + 1, true, aiPlayerMark)
        board[i] = null
        bestScore = Math.min(score, bestScore)
      }
    }
    return bestScore
  }
}

function findBestMove(board: Cell[], aiPlayerMark: Marks) {
  let bestScore = -Infinity
  let move
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      board[i] = aiPlayerMark // AI's move
      const score = minimax(board, 0, false, aiPlayerMark)
      board[i] = null // Reset it
      if (score > bestScore) {
        bestScore = score
        move = i
      }
    }
  }
  return move
}

export default ticTacToeSlice.reducer
