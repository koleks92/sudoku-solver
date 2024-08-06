'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {

      // const puzzle = req.body.puzzle;
      // const coordinate = req.body.puzzle;
      // const value = req.body.value;

      // const coordinateRegex = '^[A-I][1-9]$';
      // const valuesCorrect = '123456789';

      // if (!coordinateRegex.test(coordinate)) {
      //   res.json({ error: 'Invalid coordinate' })
      // };

      // if (!valuesCorrect.includes(value)) {
      //   res.json({ error: 'Invalid value' })
      // };
 
      // if (!solver.validate(puzzle)) {
      //   res.json({ error: 'Invalid characters in puzzle' })
      // };

      // if (puzzle.length !== 81) {
      //   res.json({ error: 'Expected puzzle to be 81 characters long' });
      // };

      // if (!puzzle || !coordinate || !value) {
      //   res.json({ error: 'Required field(s) missing' })
      // }

      // const columnCheck = solver.checkColPlacement(puzzle, coordinate[0], coordinate[1], value);
      // const rowCheck = solver.checkRowPlacement(puzzle, coordinate[0], coordinate[1], value);
      // const regionCheck = solver.checkRegionPlacement(puzzle, coordinate[0], coordinate[1], value);

      // if (columnCheck && rowCheck && regionCheck) {
      //   res.json({ valid: true });
      // } else {
      //   let conflict = [];
      //   if (!columnCheck) {
      //     conflict.push("column");
      //   }
      //   if (!rowCheck) {
      //     conflict.push("row");
      //   }
      //   if (!regionCheck) {
      //     conflict.push("region");
      //   }

      //   console.log(conflict);

      //   res.json({ 
      //     valid: false,
      //     conflict
      //    })
      // }

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

      // TODO
      const solution = solver.solve(puzzle);
      if (!solution) {
        res.json({ error: 'Puzzle cannot be solved' })
      } else {
        res.json({ solution })
      }
    });
};
