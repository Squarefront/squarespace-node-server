/*!
 *
 * Squarespace logger.
 *
 */
var isQuiet = false;
var colors = require( "colors" );
var formats = {
    template: function ( msg ) {
        return colors.cyan( msg );
    },

    server: function ( msg ) {
        return colors.magenta( msg );
    },

    cache: function ( msg ) {
        return colors.green( msg );
    },

    error: function ( msg ) {
        return colors.red( msg );
    },

    warn: function ( msg ) {
        return colors.yellow( msg );
    },

    info: function ( msg ) {
        return colors.white( msg );
    }
};



module.exports = {
    log: function ( context, message ) {
        if ( isQuiet ) {
            return;
        }

        var format = formats[ context ];
        var name = colors.grey( "> sqs-log" );

        if ( typeof format === "function" ) {
            message = format( message );

        } else {
            message = format.info( message );
        }

        console.log( name, message );
    },

    silence: function () {
        isQuiet = true;
    }
};