/**
 * EmailGenerator. Generates <a> tags pre-filled with email information.
 */
var EmailGenerator = function() {

}

/**
 * Generates an <a> tag with prefilled email content.
 * @param  {Object} options The options for the created link. Valid options
 *                          are "to", "cc", "bcc", "subject", "body", and
 *                          "linkText".
 *
 * @return {Object}         jQuery object for link.
 */
EmailGenerator.prototype.generateEmailLink = function (options) {
  if(!options || !options.to) { return false; }

  var link = $("<a></a>");

  var hrefString = "mailto:";

  if(options.to.constructor === Array) {
    for (var i = 0; i < options.to.length; i++) {
      hrefString += options.to[i] + ";";
    }
  } else {
    hrefString += options.to;
  }

  if(options.cc || options.bcc || options.subject || options.body) { hrefString += "?"; }

  var opts = [];

  if(options.cc && options.cc.length) {
    var optsString = "cc=";
    if(options.cc.constructor === Array) {
      for (var i = 0; i < options.cc.length; i++) {
        optsString += options.cc[i] + ";";
      }
    } else {
      optsString += options.cc;
    }
    opts.push(optsString);
  }

  if(options.bcc && options.bcc.length) {
    var optsString = "bcc=";
    if(options.bcc.constructor === Array) {
      for (var i = 0; i < options.bcc.length; i++) {
        optsString += options.bcc[i] + ";";
      }
    } else {
      optsString += options.bcc;
    }
    opts.push(optsString);
  }

  if(options.subject && options.subject.length) { opts.push("subject=" + encodeURIComponent(options.subject)); }

  if(options.body && options.body.length) { opts.push("body=" + encodeURIComponent(options.body)); }

  for (var i = 0; i < opts.length; i++) {
    hrefString += ((i == 0) ? "" : "&" ) + opts[i];
  }

  link.attr("href", hrefString);

  if(options.linkText) { link.html(this.encodeEntities(options.linkText)); }

  return link;
};

/**
 * Just encodes some problem entities.
 * @param  {String} str The string to encode.
 * @return {String}     The encoded string.
 */
EmailGenerator.prototype.encodeEntities = function (str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
};
