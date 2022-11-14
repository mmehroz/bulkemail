let emailReady = false;
let templateReady = false;
let emailSubject;
var emails = ["avidhaus.ahmer@gmail.com"];
let emailTemplate = "";

$(document).ready(function () {
  // dissable buttons
  disable("#send-email-button");
  disable("#show-email-template");

  // hide/show template
  $("#template").hide();
  $("#show-email-template").click(() => {
    $("#template").fadeIn();
  });

  // check emails validation
  $("#email-box").on("keyup", () => {
    var email = $("#email-box").val().replace(/\n/g, " ").replace("  ", " ");
    if (email != "") {
      emails = email.split(" ");
      $("#check").html(" ");

      emailReady = true;
      let index = 0;
      emails.forEach((email) => {
        index++;
        $("#check").append(isValidEmailAddress(index, email, emailReady));
      });
      enableButtonValidation();
    } else {
      $("#check").html("");
    }
  });
  $("#email-subject").on("keyup", () => {
    emailSubject = $("#email-subject").val();
    enableButtonValidation();
  });
});

document
  .getElementById("upload-email-template")
  .addEventListener("change", function () {
    var fr = new FileReader();
    fr.onload = function () {
      emailTemplate = fr.result;
    };

    fr.readAsText(this.files[0]);
  });

$("#upload-email-template").change(() => {
  try {
    var tmppath = URL.createObjectURL(event.target.files[0]);
    $("#template").fadeIn();
    $("#template-iframe").fadeIn("fast").attr("src", tmppath);
    enable("#show-email-template");

    templateReady = true;
    enableButtonValidation();
  } catch (err) {
    disable("#show-email-template");
    disable("#send-email-button");

    templateReady = false;
  }
});
$("#close").on("click", () => {
  $("#template").fadeOut();
});

//EmailAddressValidation
function isValidEmailAddress(index, emailAddress) {
  var pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );
  if (pattern.test(emailAddress)) {
    return `<div class="alert-success p-1 m-1">${index}) ${emailAddress}</div>`;
  } else {
    emailReady = false;
    disable("#send-email-button");
    return `<div class="alert-danger p-1 m-1">${index}) ${emailAddress}</div>`;
  }
}
// enableButton validation
function enableButtonValidation() {
  if (templateReady && emailReady && emailSubject) {
    enable("#send-email-button");
  } else {
    disable("#send-email-button");
  }
}

// enableButton
function enable(id) {
  $(id)
    .removeAttr("disabled", "disabled")
    .addClass("btn-primary")
    .removeClass("disable");
}
// diableButton
function disable(id) {
  $(id)
    .attr("disabled", "disabled")
    .removeClass("btn-primary")
    .addClass("disable");
}
//Submit
$("#send-email-button").click(() => {
  disable("#send-email-button");
  var count = 0;
  $("#progress").html("");
  emails.forEach((email) => {
    $("#progress").removeClass("d-none");
    $("#check").addClass("d-none");
    count++;
    $("#progress").append(
      `<div class="progress-message" id="progress-message-${count}">
        <div>${count}) ${email}</div>
        <div class="loading-container" id="loading-container-${count}">
          <img src="images/loading.gif" alt="loading">
        </div>
      </div>`
    );
  });

  count = 0;
  emails.forEach((email) => {
    count++;
    let url = "./sendgrid module/send-email.php";
    $.ajax({
      type: "POST",
      url: url,
      data: {
        email: email,
        count: count,
        template: emailTemplate,
        subject: emailSubject,
      },
      success: function (result) {
        var resultArray = result.split("] =>");
        var output = [];

        resultArray.map(function (i, v) {
          output.push(i);
        });

        var ahmCount = result.split("ahmer_email_count-")[1];
        var x = output[0].substring(0, 3);
        switch (x) {
          case "200":
            $(`#progress-message-${ahmCount}`).addClass("alert-danger");
            $(`#loading-container-${ahmCount}`).html("200: Not delivered");
            break;
          case "202":
            $(`#progress-message-${ahmCount}`).addClass("alert-success");
            $(`#loading-container-${ahmCount}`).html(
              "202: Email sent successfully"
            );
            break;
          case "401":
            $(`#progress-message-${ahmCount}`).addClass("alert-danger");
            $(`#loading-container-${ahmCount}`).html(
              "401: Authorization problem"
            );
            break;
          case "400":
            ahmCount = output[16].split("-")[1];
            $(`#progress-message-${ahmCount}`).addClass("alert-danger");
            $(`#loading-container-${ahmCount}`).html(
              output[16].split(":")[2].split('"')[1].split(",")[0]
            );
            break;
          case "500":
            ahmCount = output[16].split("-")[1];
            $(`#progress-message-${ahmCount}`).addClass("alert-danger");
            $(`#loading-container-${ahmCount}`).html("SendGrid server error");
            break;
          case "503":
            ahmCount = output[16].split("-")[1];
            $(`#progress-message-${ahmCount}`).addClass("alert-danger");
            $(`#loading-container-${ahmCount}`).html(
              "SendGrid v3 not available now"
            );
            break;
          default:
            $(`#progress-message-${ahmCount}`).addClass("alert-danger");
            $(`#loading-container-${ahmCount}`).html("some other error");
            break;
        }
      },
    });
  });
});
