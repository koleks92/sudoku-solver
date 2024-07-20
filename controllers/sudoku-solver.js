class SudokuSolver {

  validate(puzzleString) {
    if (puzzleString.length != 81) {
      return false;
    } else {
      const regex = /^[0-9.]+$/;
      if (regex.test(puzzleString)) {
        return true;
      } else {
        return false;
      }
    }
  }

  checkRowPlacement(puzzleString, row, column, value) {

  }

  checkColPlacement(puzzleString, row, column, value) {

  }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

