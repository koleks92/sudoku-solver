
// Check if row/value is correct
function columnValueCheck(number) {
  const valid = '123456789';
  if (valid.includes(number)) {
    return true;
  } else {
    return false;
  }
};

// Check if column is correct
function rowCheck(row) {
  const valid = 'ABCDEFGHI';
  if (valid.includes(row)) {
    return true;
  } else {
    return false;
  }
};

// Check if everything is correct(row, column, value)
function checkCorrect(row, column, value) {
  if (columnValueCheck(column) && rowCheck(row) && columnValueCheck(value)){
    return true;
  } else {
    console.log("check")
    return false;
  }
}



class SudokuSolver {

  validate(puzzleString) {
    if (puzzleString.length != 81) {
      return false;
    } else {
      const regex = /^[1-9.]+$/;
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
      // Get substring for row
      let substring;
      switch(row) {
        case 'A': 
          substring = puzzleString.substring(0,9)
          break;
        case 'B': 
          substring = puzzleString.substring(9,18)
          break;
        case 'C': 
          substring = puzzleString.substring(18,27)
          break;
        case 'D':
          substring = puzzleString.substring(27,36)
          break;
        case 'E': 
          substring = puzzleString.substring(36,45)
          break;
        case 'F': 
          substring = puzzleString.substring(45,54)
          break;
        case 'G': 
          substring = puzzleString.substring(54,63)
          break;
        case 'H': 
          substring = puzzleString.substring(63,72)
          break;
        case 'I': 
          substring = puzzleString.substring(72,81)
          break;
      };

      // Check if possible to place
      if (substring[column] != "." || substring.includes(value)) {
        return false;
      } else {
        return true;
      }
    } else{
      return false;
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

 