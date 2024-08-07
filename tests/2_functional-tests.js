const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

const { puzzlesAndSolutions } = require('../controllers/puzzle-strings.js');
const invalidSudokuLength = '...9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
const invalidSudokuChar = 'ad9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
const invalidSudokuUnsolvable = '...........................1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';



chai.use(chaiHttp);

suite('Functional Tests', () => {
    suite('Tests to /api/solve', function () {
        test('Solve a puzzle with valid puzzle string" ', function (done) {
            chai
              .request(server)
              .keepOpen()
              .post('/api/solve')
              .send({ puzzle: puzzlesAndSolutions[0][0]})
              .end(function (err, res) {
                  assert.equal(res.status, 200);
                  assert.equal(res.body.solution, puzzlesAndSolutions[0][1]);
                done();
              });
          });
          test('Solve a puzzle with missing puzzle string" ', function (done) {
            chai
              .request(server)
              .keepOpen()
              .post('/api/solve')
              .end(function (err, res) {
                  assert.equal(res.status, 200);
                  assert.equal(res.body.error, "Required field missing");
                done();
              });
          });
          test('Solve a puzzle with invalid characters" ', function (done) {
            chai
              .request(server)
              .keepOpen()
              .post('/api/solve')
              .send({ puzzle: invalidSudokuChar})
              .end(function (err, res) {
                  assert.equal(res.status, 200);
                  assert.equal(res.body.error, "Invalid characters in puzzle");
                done();
              });
          });
          test('Solve a puzzle with incorrect length" ', function (done) {
            chai
              .request(server)
              .keepOpen()
              .post('/api/solve')
              .send({ puzzle: invalidSudokuLength})
              .end(function (err, res) {
                  assert.equal(res.status, 200);
                  assert.equal(res.body.error, "Expected puzzle to be 81 characters long");
                done();
              });
          });
          test('Solve a puzzle that cannot be solved" ', function (done) {
            chai
              .request(server)
              .keepOpen()
              .post('/api/solve')
              .send({ puzzle: invalidSudokuUnsolvable})
              .end(function (err, res) {
                  assert.equal(res.status, 200);
                  assert.equal(res.body.error, "Puzzle cannot be solved");
                done();
              });
          });
    });
    suite('Tests to /api/check', function () {
        test('Check a puzzle placement with all fields', function (done) {
            chai
              .request(server)
              .keepOpen()
              .post('/api/check')
              .send({ puzzle: puzzlesAndSolutions[0][0], coordinate: 'A2', value: 3})
              .end(function (err, res) {
                  assert.equal(res.status, 200);
                  assert.equal(res.body.valid, true)
                done();
              });
        });
        test('Check a puzzle placement with single placement conflict', function (done) {
            chai
              .request(server)
              .keepOpen()
              .post('/api/check')
              .send({ puzzle: puzzlesAndSolutions[0][0], coordinate: 'A2', value: 8})
              .end(function (err, res) {
                  assert.equal(res.status, 200);
                  assert.equal(res.body.valid, false);
                  assert.deepEqual(res.body.conflict, ['row'])
                done();
              });
        });
        test('Check a puzzle placement with multiple placement conflicts', function (done) {
            chai
              .request(server)
              .keepOpen()
              .post('/api/check')
              .send({ puzzle: puzzlesAndSolutions[0][0], coordinate: 'A2', value: 5})
              .end(function (err, res) {
                  assert.equal(res.status, 200);
                  assert.equal(res.body.valid, false);
                  assert.deepEqual(res.body.conflict, ['row', 'region'])
                done();
              });
        });
        test('Check a puzzle placement with all placement conflicts', function (done) {
            chai
              .request(server)
              .keepOpen()
              .post('/api/check')
              .send({ puzzle: puzzlesAndSolutions[0][0], coordinate: 'A2', value: 2})
              .end(function (err, res) {
                  assert.equal(res.status, 200);
                  assert.equal(res.body.valid, false);
                  assert.deepEqual(res.body.conflict, ['column', 'row', 'region'])
                done();
              });
        });
        test('Check a puzzle placement with missing required fields', function (done) {
            chai
              .request(server)
              .keepOpen()
              .post('/api/check')
              .send({ puzzle: puzzlesAndSolutions[0][0], value: 2})
              .end(function (err, res) {
                  assert.equal(res.status, 200);
                  assert.equal(res.body.error, 'Required field(s) missing');
                done();
              });
        });
        test('Check a puzzle placement with invalid characters', function (done) {
            chai
              .request(server)
              .keepOpen()
              .post('/api/check')
              .send({ puzzle: invalidSudokuChar, coordinate: 'A2', value: 2})
              .end(function (err, res) {
                  assert.equal(res.status, 200);
                  assert.equal(res.body.error, 'Invalid characters in puzzle');
                done();
              });
        });
        test('Check a puzzle placement with incorrect length', function (done) {
            chai
            .request(server)
            .keepOpen()
            .post('/api/check')
            .send({ puzzle: invalidSudokuLength, coordinate: 'A2', value: 2})
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
                done();
          });
        });
        test('Check a puzzle placement with invalid placement coordinate', function (done) {
            chai
            .request(server)
            .keepOpen()
            .post('/api/check')
            .send({ puzzle: puzzlesAndSolutions[0][0], coordinate: 'J2', value: 2})
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Invalid coordinate');
                done();
            });
        });
        test('Check a puzzle placement with invalid placement value', function (done) {
            chai
            .request(server)
            .keepOpen()
            .post('/api/check')
            .send({ puzzle: puzzlesAndSolutions[0][0], coordinate: 'A2', value: 11})
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'Invalid value');
                done();
            });
        });
    });
        
    });
    
    