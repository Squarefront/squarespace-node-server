/*!
 *
 * Predicate: equal
 * Evaluates 2 values as equal
 *
 * @usage: {.equal? foo "bar"}
 *
 */
var util = require( "../util" );


module.exports = function ( data, ctx, args ) {
    args = util.getArgsProcessed( args, ctx );

    return ( args[ 0 ] == args[ 1 ] );
};