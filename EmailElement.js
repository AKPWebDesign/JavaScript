/**
 * EmailElement. Allows for a new <email> tag in HTML pages.
 */
var EmailElement = function() {
  var emailElements = $("email");
  this.emailGenerator = new EmailGenerator();
  var self = this;
  emailElements.each(function() {
    var replace = self.elementToLink($(this));
    $(this).replaceWith(replace);
  });
}

/**
 * Converts an <email> element into an <a> element.
 * @param  {DOMObject} emailElement The <email> element from jQuery.
 * @return {DOMObject}              An <a> element.
 */
EmailElement.prototype.elementToLink = function (emailElement) {
  var to = emailElement.find("to");
  var cc = emailElement.find("cc");
  var bcc = emailElement.find("bcc");
  var subject = emailElement.find("subject");
  var body = emailElement.find("emailBody");
  var linkText = emailElement.find("linkText");

  var toArray = [];
  var ccArray = [];
  var bccArray = [];
  var subjectString = subject.text().replace(/\r?\n/gm, "").trim().replace(/\s{2,}/g, ' ');
  var bodyString = body.text().trim().replace(/[ \t]{2,}/g, '').replace(/\t/g, '\r\n');
  var linkTextString = linkText.text().replace(/\r?\n/gm, "").trim().replace(/\s{2,}/g, ' ');

  to.each(function(){
    toArray.push($(this).text());
  });

  cc.each(function(){
    ccArray.push($(this).text());
  });

  bcc.each(function(){
    bccArray.push($(this).text());
  });

  var opts = {to: (toArray.length ? toArray : null), cc: (ccArray.length ? ccArray : null), bcc: (bccArray.length ? bccArray : null), subject: subjectString, body: bodyString, linkText: linkTextString};

  return this.emailGenerator.generateEmailLink(opts);
};
