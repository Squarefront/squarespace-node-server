/*!
 *
 * Formatter: htmlattr
 * Returns an html tag escaped string
 *
 * @usage: {@|htmlattr}
 *
 */
module.exports = function ( val, args, ctx ) {
    return require( "../jsontemplate" ).HtmlTagEscape( val );
};