$(document).ready(function(){
  var emailGenerator = new EmailGenerator();
  $(".product").each(function(){
    var title = $(this).find(".title").text();
    var options = {
      to: ["nobody@localhost"],
      cc: [],
      bcc: [],
      subject: "Quote Request",
      body: "This is some text.\r\n" +
            "It has multiple lines.\r\n" +
            "Yadda yadda yadda.",
      linkText: "Request a Quote!"
    };
    $(this).find(".email").html(emailGenerator.generateEmailLink(options));
  });
});
