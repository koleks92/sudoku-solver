const chai = require('chai');
const assert = chai.assert;

const SudokuSolver = require('../controllers/sudoku-solver.js');
let solver = new SudokuSolver;

const validSudoku = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'

suite('Unit Tests', () => {
    suite('Functions to check sudoku-solver.js', function() {
        test('Logic handles a valid puzzle string of 81 characters', function() {
            assert.equal(solver.validate(validSudoku), true);
        });
        test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', function() {
            assert.equal(solver.validate('ad9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'), false);
        });
        test('Logic handles a puzzle string that is not 81 characters in length', function() {
            assert.equal(solver.validate('...9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'), false);
        });
        test('Logic handles a valid row placement', function() {
            assert.equal(solver.checkRowPlacement(validSudoku, 'A', '1', '2' ), true);
        });
        test('Logic handles an invalid row placement', function() {
            assert.equal(solver.checkRowPlacement(validSudoku, 'A', '1', '9' ), false);
        });
    })
});
