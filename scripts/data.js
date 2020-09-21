function createData() {
  var first = $('#first-name').val();
  var last = $('#last-name').val();
  var zip = $('#zip').val();
  var email = $('#email').val();
  var phone = $('#phone').val();
  var reason = $('input[name="reason"]').val();
  var method = $('input[name="vote-method"]').val();

  var body = 'email=' + email + '&firstname=' + first + '&lastname=' + last + '&zip=' + zip + '&phone=' + phone + '&custom-3694=' + reason + '&custom-3695=' + method;
  return body
}

function sendData() {
  console.log(createData());
}
