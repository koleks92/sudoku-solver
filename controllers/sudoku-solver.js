
// Check if row/value is correct
function rowValueCheck(row) {
  const valid = '123456789';
  if (valid.includes(row)) {
    return true;
  } else {
    return false;
  }
};

// Check if column is correct
function columnCheck(column) {
  const valid = 'ABCDEFGHI';
  if (valid.includes) {
    return true;
  } else {
    return false;
  }
};

// Check if everything is correct(row, column, value)
function checkCorrect(row, column, value) {
  if (rowValueCheck(row) && columnCheck(column) && rowValueCheck(value)){
    return true;
  } else {
    return false;
  }
}



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
    // Check if data is correct
    if (checkCorrect(row, column, value)) {
      // TODO
      return true;
    }
  }

  checkColPlacement(puzzleString, row, column, value) {
    // Check if data is correct
    if (checkCorrect(row, column, value)) {
      // TODO
      return true;
    }
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    // Check if data is correct
    if (checkCorrect(row, column, value)) {
      // TODO
      return true;
    }
  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

 