# Tic Tac Toe - Arcade Project

## Overview

This project is part of the [Arcade Projects series](https://hugo-coding.com/projects?category=game). It's a classic Tic Tac Toe game built using React.js (Vite), Redux, and styled-components. The game features multiple modes, including Player vs. Player (PvP) and different levels of AI difficulty.

### Live Demo

Try out the game: [Play Tic Tac Toe](https://arcade-tic-tac-toe.vercel.app/)

## Game Modes

### Easy Mode

- **AI Behavior**: The AI randomly places its mark in any available space.
- **Suitable For**: Beginners or those looking for casual gameplay.

### Medium & Impossible Modes

- **Algorithm**: Utilizes the Minimax algorithm with recursion.
- **Depth of Search**:
  - **Medium Mode**: Searches 2 levels deep.
  - **Impossible Mode**: Examines all possible game outcomes.

## Algorithm

The core of the Medium and Impossible game modes is the Minimax algorithm. This is a recursive algorithm used in decision-making and game theory to determine the optimal move for a player, assuming the opponent also plays optimally.

### Minimax Algorithm

- **Functionality**: At each step, the algorithm simulates all possible moves, evaluates the resulting board state, and selects the move that maximizes the AI's chances of winning.
- **Optimizations**: To enhance performance, the algorithm implements several optimizations, especially in the Impossible mode.
- **Space Complexity in Impossible Mode**: O(n!), which translates to 9! (362880) computations if the AI plays as "X". To address potential performance concerns:
  - The AI's first move is pre-determined to the center square, reducing complexity to 8! (40320) and improving response time.

## Technologies Used

- **Frontend**: React.js (Vite)
- **State Management**: Redux
- **Styling**: Styled-Components

## Contributions

Contributions to the project are welcome! If you have suggestions or improvements, feel free to fork the repository and submit a pull request.
