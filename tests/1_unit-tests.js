const chai = require('chai');
const assert = chai.assert;

const SudokuSolver = require('../controllers/sudoku-solver.js');
const { puzzlesAndSolutions } = require('../controllers/puzzle-strings.js');
let solver = new SudokuSolver;

const validSudoku = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
const invalidSudoku = '...9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
const invalidSudoku2 = 'ad9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';

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
            assert.equal(solver.checkRowPlacement(validSudoku, 'A', 1, 2 ), true);
            assert.equal(solver.checkRowPlacement(validSudoku, 'I', 9, 2 ), true);

        });
        test('Logic handles an invalid row placement', function() {
            assert.equal(solver.checkRowPlacement(validSudoku, 'A', 1, 1), false);
            assert.equal(solver.checkRowPlacement(validSudoku, 'I', 9, 6), false);

        });
        test('Logic handles a valid column placement', function() {
            assert.equal(solver.checkColPlacement(validSudoku, 'A', 1, 2 ), true);
            assert.equal(solver.checkColPlacement(validSudoku, 'I', 9, 5 ), true);

        });
        test('Logic handles an invalid column placement', function() {
            assert.equal(solver.checkColPlacement(validSudoku, 'A', 1, 8 ), false);
            assert.equal(solver.checkColPlacement(validSudoku, 'I', 9, 9 ), false);

        });
        test('Logic handles a valid region (3x3 grid) placement', function() {
            assert.equal(solver.checkRegionPlacement(validSudoku, 'A', 1, 7), true);
            assert.equal(solver.checkRegionPlacement(validSudoku, 'E', 9, 7), true);
            
        });
        test('Logic handles an invalid valid region (3x3 grid) placement', function() {
            assert.equal(solver.checkRegionPlacement(validSudoku, 'A', 1, 9), false);
            assert.equal(solver.checkRegionPlacement(validSudoku, 'E', 9, 8), false);
            
        });
        test('Valid puzzle strings pass the solver', function() {
            assert.equal(typeof solver.solve(puzzlesAndSolutions[0][0]), 'string')
            assert.equal(typeof solver.solve(puzzlesAndSolutions[1][0]), 'string')
            assert.equal(typeof solver.solve(puzzlesAndSolutions[2][0]), 'string')
            assert.equal(typeof solver.solve(puzzlesAndSolutions[3][0]), 'string')
        })
        test('Invalid puzzle strings fail the solver', function() {
            assert.equal(solver.solve(invalidSudoku), false);
            assert.equal(solver.solve(invalidSudoku2), false);
        });
        test('Solver returns the expected solution for an incomplete puzzle', function() {
            assert.equal(solver.solve(puzzlesAndSolutions[0][0]), puzzlesAndSolutions[0][1])
            assert.equal(solver.solve(puzzlesAndSolutions[1][0]), puzzlesAndSolutions[1][1])
            assert.equal(solver.solve(puzzlesAndSolutions[2][0]), puzzlesAndSolutions[2][1])
            assert.equal(solver.solve(puzzlesAndSolutions[3][0]), puzzlesAndSolutions[3][1])
        });
    })
});
