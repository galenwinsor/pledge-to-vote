
// enabling buttons based on form contents
$('document').ready(function() {

  $('#container').addClass('fade');

  $('input[id="other-reason"]').change(function() {
    if ($('input[id="other-reason"]:checked').val()) {
      $('#other-input').removeAttr('disabled');
    } else {
      $('#other-input').attr('disabled', 'true');
    }
  })

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

  $('label[name="reason-label"]').click(function() {
    checkedReason($(this));
  })

  $('label[name="how-label"]').click(function() {
    checkedHow($(this));
  })
});

function next(next, checkbox) {
  $(next).show();
  $(checkbox).css('display','block');
  $('html,body').delay(500).animate({
    scrollTop: $(next).offset().top
  }, 1400);
}

function checkedReason(label) {
  $('label[name="reason-label"]').removeClass('chosen');
  label.addClass('chosen');
}

function checkedHow(label) {
  $('label[name="how-label"]').removeClass('chosen');
  label.addClass('chosen');
}
