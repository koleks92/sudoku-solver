'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.post('/api/check', (req, res) => {
    const puzzle = req.body.puzzle;
    const coordinate = req.body.coordinate;
    const value = req.body.value;
    
    const coordinateRegex = /^[A-I][1-9]$/;
    const valuesCorrect = '123456789';
  
    // Check if all required fields are present
    if (!puzzle || !coordinate || !value) {
      return res.json({ error: 'Required field(s) missing' });
    }
  
    // Check if the coordinate is valid
    if (!coordinateRegex.test(coordinate)) {
      return res.json({ error: 'Invalid coordinate' });
    }
  
    // Check if the value is valid
    if (!valuesCorrect.includes(value)) {
      return res.json({ error: 'Invalid value' });
    }
    
    // Check puzzle length
    if (puzzle.length !== 81) {
      return res.json({ error: 'Expected puzzle to be 81 characters long' });
    }

    // Validate the puzzle
    if (!solver.validate(puzzle)) {
      return res.json({ error: 'Invalid characters in puzzle' });
    }

    // Convert coordinate to row and column
    const row = coordinate[0];
    const column = parseInt(coordinate[1]);

    // Not sure why it works, but it does ,)
    // Check if the value is already placed at the coordinate
    const index = (row.charCodeAt(0) - 65) * 9 + (column - 1);
    if (puzzle[index] == value) {
      return res.json({ valid: true });
    }

    // Check the placements
    const columnCheck = solver.checkColPlacement(puzzle, row, column, value);
    const rowCheck = solver.checkRowPlacement(puzzle, row, column, value);
    const regionCheck = solver.checkRegionPlacement(puzzle, row, column, value);

  
    // Determine the response
    if (columnCheck && rowCheck && regionCheck) {
      return res.json({ valid: true });
    } else {
      let conflict = [];
      if (!columnCheck) {
        conflict.push("column");
      }
      if (!rowCheck) {
        conflict.push("row");
      }
      if (!regionCheck) {
        conflict.push("region");
      }
      
      return res.json({ 
        valid: false,
        conflict
      });
    }
  });
    
  app.route('/api/solve')
    .post((req, res) => {
      const puzzle = req.body.puzzle;
      
      
      if (!puzzle) {
        res.json({ error: 'Required field missing' });
      };
      
      if (puzzle.length !== 81) {
        res.json({ error: 'Expected puzzle to be 81 characters long' });
      };

      if (!solver.validate(puzzle)) {
        res.json({ error: 'Invalid characters in puzzle' });
      };

      const solution = solver.solve(puzzle);
      if (!solution) {
        res.json({ error: 'Puzzle cannot be solved' })
      } else {
        res.json({ solution })
      }
    });
};
