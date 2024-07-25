import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {Button, Snackbar} from 'react-native-paper';
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  Layout,
} from 'react-native-reanimated';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const SudokuSolver = () => {
  const [grid, setGrid] = useState(
    Array(9)
      .fill('')
      .map(() => Array(9).fill('')),
  );
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);

  const validateGrid = () => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const value = grid[i][j];
        if (value !== '' && !isValidValue(i, j, value)) {
          setError(`Invalid value at row ${i + 1}, column ${j + 1}`);
          setVisible(true);
          return false;
        }
      }
    }
    setError(null);
    Alert.alert('Validation', 'The grid is valid!');
    return true;
  };

  const isValidValue = (row, col, value) => {
    for (let i = 0; i < 9; i++) {
      if (grid[row][i] === value || grid[i][col] === value) {
        return false;
      }
    }

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
      setGrid([...solvedGrid]);
      Alert.alert('Success', 'Sudoku solved!');
    } else {
      setError('No solution found');
      setVisible(true);
    }
  };

  const solveSudoku = grid => {
    const newGrid = grid.map(row => [...row]);
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (newGrid[i][j] === '') {
          for (let num = 1; num <= 9; num++) {
            if (isValidValue(i, j, num.toString())) {
              newGrid[i][j] = num.toString();
              if (solveSudoku(newGrid)) {
                return newGrid;
              }
              newGrid[i][j] = '';
            }
          }
          return null;
        }
      }
    }
    return newGrid;
  };

  return (
    <SafeAreaProvider>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Sudoku Solver</Text>
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          layout={Layout.springify()}>
          <View style={styles.grid}>
            {grid.map((row, i) => (
              <View key={i} style={styles.row}>
                {row.map((cell, j) => (
                  <TextInput
                    key={j}
                    value={cell}
                    style={[
                      styles.cell,
                      (i + 1) % 3 === 0 && i !== 8 && styles.bottomBorder,
                      (j + 1) % 3 === 0 && j !== 8 && styles.rightBorder,
                    ]}
                    onChangeText={text => {
                      const newGrid = [...grid];
                      newGrid[i][j] = text.replace(/[^1-9]/g, '');
                      setGrid(newGrid);
                    }}
                    maxLength={1}
                    keyboardType="numeric"
                    textAlign="center"
                  />
                ))}
              </View>
            ))}
          </View>
        </Animated.View>
        <View style={styles.buttonsContainer}>
          <Button mode="contained" style={styles.button} onPress={validateGrid}>
            Validate
          </Button>
          <Button mode="contained" style={styles.button} onPress={solveGrid}>
            Solve
          </Button>
        </View>
        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
          duration={Snackbar.DURATION_SHORT}
          action={{
            label: 'Close',
            onPress: () => {
              setVisible(false);
            },
          }}>
          {error}
        </Snackbar>
      </ScrollView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  grid: {
    borderWidth: 3,
    borderColor: '#333',
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    borderWidth: 1,
    borderColor: '#999',
    width: 40,
    height: 40,
    fontSize: 20,
    lineHeight: 40,
    textAlign: 'center',
    color: '#333',
  },
  bottomBorder: {
    borderBottomWidth: 3,
  },
  rightBorder: {
    borderRightWidth: 3,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    width: '60%',
  },
  button: {
    marginHorizontal: 10,
  },
});

export default SudokuSolver;
