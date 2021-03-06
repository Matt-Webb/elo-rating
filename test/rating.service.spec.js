'use strict';
const assert = require('chai').assert;
const RatingService = require('../src/rating.service');

describe('Rating Service', function() {

    let Rating;

    beforeEach(function() {
      Rating = new RatingService();
    });

    describe('ELO Calculation', function() {
        it('should return the change +15.2 when passed the parameters: 2200, 2400, 20, 1 {win}', function() {
            assert.equal(15.19, Rating.elo(2200,2400, 20, 1).change);
        });
        it('should return the change -4.81 when passed the parameters: 2200, 2400, 20, 0 {loss}', function() {
            assert.equal(-4.81, Rating.elo(2200,2400, 20, 0).change);
        });
        it('should return the change +5.2 when passed the parameters: 2200, 2400, 20, 0.5 {draw}', function() {
            assert.equal(5.19, Rating.elo(2200,2400, 20, 0.5).change);
        });
    });

    describe('ECF Calculation', function() {
        it('should return the grade 250 when passed the parameters: 180, 200, 1 {win}', function() {
            assert.equal(250, Rating.ecf(180,200, 1));
        });
        it('should return the grade 150 when passed the parameters: 180, 200, 0 {loss}', function() {
            assert.equal(150, Rating.ecf(180,200, 0));
        });
        it('should return the grade 200 when passed the parameters: 180, 200, 0.5 {draw}', function() {
            assert.equal(200, Rating.ecf(180,200, 0.5));
        });

        it('should throw an error when passed incorrect type parameters', function() {
           //assert.equal()
        })

    });

    describe('Convert ECF Grade to ELO Rating', function() {
        it('should return the elo rating 2200 when given the ecf grade 200', function() {
            assert.equal(2200, Rating.convertToElo(200));
        });
    });

    describe('Convert ELO Rating to ECF Grade', function() {
        it('should return the ecf grade 200 when give the elo rating 2200', function() {
            assert.equal(200, Rating.convertToEcf(2200));
        });
    });

});
