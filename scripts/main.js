
// enabling buttons based on form contents
$('document').ready(function() {

  var viewWidth = window.width;
  var viewHeight = window.height;

  openingAnimation();

  $('#begin').click(function() {
    $('#initial-display-box').hide();
    $('.container').show();
    $('.container').animate({
      opacity:1
    }, 850);
    $('#header').css('backgroundColor','#022639');
  })

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

  // preventing return submitting form
  $('form input').keydown(function (e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        return false;
    }
});

  $('button[type="submit"]').click(function() {
    if (checkZip($('#zip').val())) {
      setStorage();
      goShare();
    }
  })
});

function next(next, checkbox) {
  $(next).css('display','flex');
  $(checkbox).show();
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

function checkZip(zip) {
  if (isNaN(zip)) {
    alert("Please enter a valid zip code.");
    return false;
  } else if (zip < 29001 || zip > 29945) {
    alert("Please enter a valid South Carolina zip code");
    return false;
  } else return true;
}

function goShare() {
  $(location).attr('href','share.html');
}

function setStorage() {
  sessionStorage.setItem('name', $('#first-name').val() + ' ' + $('#last-name').val());
  sessionStorage.setItem('reason', $('input[name="reason"]').val());
  sessionStorage.setItem('how', $('input[name="vote-method"]').val());
}

function openingAnimation() {
  $('#voice-header').animate({
    top:'15%',
    left: '23%'
  }, 800, function() {
    $('#voice').animate({
      fontSize: '120%'
    }, 300, function() {
      $('#voice').animate({
        fontSize: '100%'
      }, 300, function() {
        $('#vote-header').animate({
          top:'30%',
          left: '35%'
        }, 900, function() {
          $('#vote').animate({
            fontSize: '140%'
          }, 300, function() {
            $('#vote').animate({
              fontSize: '100%'
            }, 300, function() {
              $('#hope-header').animate({
                top:'45%',
                left:'47%'
              }, 1000, function() {
                $('#hope').animate({
                  fontSize:'120%'
                }, 300, function() {
                  $(this).animate({
                    fontSize: '100%'
                  }, 300, function() {
                    $('#begin').animate({
                      opacity:1
                    }, 500);
                    $('#begin').removeAttr('disabled');
                  })
                })
              })
            })
          })
        })
      })
    })
  });
}
