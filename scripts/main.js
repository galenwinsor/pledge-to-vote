
// enabling buttons based on form contents
$('document').ready(function() {


  // check if name fields are filled out
  $('#first-name, #last-name').keyup(function() {
    if ($('#first-name').val() != '' && $('#last-name').val() != '') {
      $('#next-1').removeAttr('disabled');
    } else {
      $('#next-1').attr('disabled','true');
    }
  });

  // check if reason fields are filled out
  $("input[name='reason']").change(function() {
    if ($("input[name='reason']:checked").val()) {
      $('#next-2').removeAttr('disabled');
    } else {
      $('#next-2').attr('disabled', 'true')
    };
  });

  $("input[name='vote-method']").change(function() {
    if ($("input[name='vote-method']:checked").val()) {
      $('#next-3').removeAttr('disabled');
    } else {
      $('#next-3').attr('disabled', 'true')
    };
  });
});

function displayNext(next) {
  $(next).show();
}
