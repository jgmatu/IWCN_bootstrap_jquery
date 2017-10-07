const data = {
      "Pepe" : "pepe@gmail.com",
      "Nacho" : "nacho@gmail.com",
      "Alejandro" : "alejando@gmail.com",
      "Javi" : "javi@gmail.com",
      "Eva" : "eva@gmail.com",
      "Lorena" : "lorena@gmail.com",
      "Felix" : "felix@gmail.com",
      "Ruben" : "ruben@gmail.com",
      "Gonzalo" : "gonzalo@gmail.com",
      "Jonathan" : "jonathan@gmail.com"
}

const MAXDELAY = 2000;
const DELAY = 350;
const INCREMENT = (DELAY / MAXDELAY) * 100;
const WAIT = 500;

function progressEmail() {
      var total = 0;
      var progress = 0;

      setProgressEmail();
      var interval = setInterval(function() {
            total += DELAY;
            progress += INCREMENT;

            if (total >= MAXDELAY) {
                  clearInterval(interval);
            }
            $('.progress-bar').css('width', progress+'%').attr('aria-valuenow', progress);
      }, DELAY);
}

function setProgressEmail() {
      $("#contact").hide();
      $("#progress-email").show();
      $('.progress-bar').css('width', 0+'%').attr('aria-valuenow', 0);
}

function endEmailSend() {
      setTimeout(function() {
            setContactsUI();
            setDialogSendEmail();
      }, MAXDELAY + WAIT);
}

function setContactsUI() {
      $("#progress-email").hide();
      $("#email-send").hide();
      $("#contact").show();
      $("#email-send").text("");
      $('.progress-bar').css('width', 0+'%').attr('aria-valuenow', 0);
}

function setDialogSendEmail() {
      var day = new Date().toDateString();
      var time = new Date().toLocaleTimeString();

      var email = "<p> Email send to: " + $("#email").text() + '</p>';
      $("#email-send").append(email);

      var date = '<br/>' + day + " " + time;
      $("#email-send").append(date);

      $("#email-send").dialog("open");
}

function addUsers() {
      for (k in data) {
            if (k == "Pepe") {
                  $("#sel-user optgroup").append('<option selected="" value="'+k+'">'+k+'</option>');
                  continue;
            }
            $("#sel-user optgroup").append('<option value="'+k+'">'+k+'</option>');
      }
}

$(document).ready(function(){
      addUsers();
      setContactsUI();

      $("#email-send").dialog({
            autoOpen : false,
            width : "30%",
            buttons: {
                  Confirm : function() {
                        $( this ).dialog( "close" );
                  }
            }
      });

      $("#dialog-email").dialog({
            autoOpen : false,
            width : "30%",
            buttons: {
                  Confirm : function() {
                        progressEmail();
                        endEmailSend();
                        $( this ).dialog( "close" );
                  },
                  Cancel: function() {
                        $( this ).dialog( "close" );
                  }
            }
      });

      $("#send-email").click(function() {
            $("#email-payload").text($("#description").val());

            $("#email-payload").text($("#email-payload").text().split(' ').join(""));
            $("#email-payload").text($("#email-payload").text().split("\n").join(""));

            if ($("#email-payload").text()) {
                  $("#dialog-email").dialog( "open" );
            }
      });

      $('#sel-user').change(function() {
            $("#email").text(data[$(this).val()]);
      });
});
