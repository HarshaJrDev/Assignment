import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

const SudokuSolver = () => {
  const [grid, setGrid] = useState([
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
  ]);

  const [error, setError] = useState(null);

  const validateGrid = () => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const value = grid[i][j];
        if (value !== '' && !isValidValue(i, j, value)) {
          setError(`Invalid value at row ${i + 1}, column ${j + 1}`);
          return false;
        }
      }
    }
    return true;
  };

  const isValidValue = (row, col, value) => {
    // Check row and column
    for (let i = 0; i < 9; i++) {
      if (grid[row][i] === value || grid[i][col] === value) {
        return false;
      }
    }
    // Check 3x3 sub-grid
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[startRow + i][startCol + j] === value) {
          return false;
        }
      }
    }
    return true;
  };

  const solveGrid = () => {
    if (!validateGrid()) {
      return;
    }
    const solvedGrid = solveSudoku(grid);
    if (solvedGrid) {
      setGrid(solvedGrid);
    } else {
      setError('No solution found');
    }
  };

  const solveSudoku = (grid) => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (grid[i][j] === '') {
          for (let num = 1; num <= 9; num++) {
            if (isValidValue(i, j, num)) {
              grid[i][j] = num;
              if (solveSudoku(grid)) {
                return grid;
              }
              grid[i][j] = '';
            }
          }
          return null;
        }
      }
    }
    return grid;
  };

  return (
    <View>
      <Text>Sudoku Solver</Text>
      <View>
        {grid.map((row, i) => (
          <View key={i}>
            {row.map((cell, j) => (
              <TextInput
                key={j}
                value={cell}
                onChangeText={(text) => {
                  const newGrid = [...grid];
                  newGrid[i][j] = text;
                  setGrid(newGrid);
                }}
                keyboardType="numeric"
              />
            ))}
          </View>
        ))}
      </View>
      <Button title="Validate" onPress={validateGrid} />
      <Button title="Solve" onPress={solveGrid} />
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
    </View>
  );
};

export default SudokuSolver;