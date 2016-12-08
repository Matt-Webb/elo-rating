'use strict';


class RatingService {

    constructor() { }

    /**
     * This function calculates the change and new rating of a result between two elo rated players.
     * @return {object}
     * @param {number} playerRating
     * @param {number} opponentRating
     * @param {number} kFactor
     * @param {number} result
     */
    elo(playerRating, opponentRating, kFactor, result) {

        const pR = parseInt(playerRating, 10);
        const oR = parseInt(opponentRating, 10);
        const k = parseInt(kFactor, 10);
        const r = parseFloat(result, 10);

        const transformPR = Math.pow(10, (pR / 400));
        const transformOR = Math.pow(10, (oR / 400));

        const expectation = transformPR / (transformPR + transformOR);

        const outcome = pR + k * (r - expectation);

        const data = {
            current: pR,
            opponent: oR,
            result: r,
            change: (outcome - pR).toFixed(2),
            newRating: Math.round(outcome),
            accum: null
        };

        return data;
    }

    /**
     * This function calculates the change and new grade of a result between two ecf graded players.
     * @return {number}
     * @param {number} playerRating
     * @param {number} opponentRating
     * @param {number} result
     */
    ecf(playerGrade, opponentGrade, result) {

        const cutoff = 40;
        const diff = (playerGrade - opponentGrade);

        if(diff > cutoff) {
            opponentGrade = (playerGrade + cutoff);
        }
        if(diff < -Math.abs(cutoff)) {
            opponentGrade = (playerGrade - cutoff);
        }

        if(result === 1) {
            return opponentGrade + 50;
        }

        if(result === 0.5) {
            return opponentGrade;
        }

        if(result === 0) {
            return opponentGrade - 50;
        }
    }

    /**
     * Takes an ecf grade and returns the conversion to elo rating.
     * @return {number}
     * @param {number} ecf
     */
    convertToElo(ecf = errorHandler()) {

        if(typeof ecf !== 'number') return new Error('Parameter of wrong type.');
        const elo = (7.5 * ecf) + 700;
        return elo;
    }

    /**
     * Takes an elo rating and returns the conversion to an ecf grade.
     * @return {number}
     * @param {number} elo
     */
    convertToEcf(elo = errorHandler()) {

        if(typeof elo !== 'number') return new Error('Parameter of wrong type');
        const ecf = (elo - 700) / 7.5;
        return ecf;
    }

    errorHandler() {
      throw new Error('Parameter missing')
    }

}

module.exports = RatingService;
