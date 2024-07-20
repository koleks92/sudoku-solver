
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
      // Check if already placed
      let substring;
      switch(row) {
        case 1: substring = puzzleString.substring(0,9);
        case 2: substring = puzzleString.substring(9,18);
        case 3: substring = puzzleString.substring(18,27);
        case 4: substring = puzzleString.substring(27,36);
        case 5: substring = puzzleString.substring(36,45);
        case 6: substring = puzzleString.substring(45,54);
        case 7: substring = puzzleString.substring(54,63);
        case 8: substring = puzzleString.substring(63,72);
        case 9: substring = puzzleString.substring(72,81);
      };

      if (substring[column] != ".") {
        return true;
      } else {
        return false;
      }
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

 