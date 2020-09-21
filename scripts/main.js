$('document').ready(function() {

  var viewWidth = window.width;
  var viewHeight = window.height;

  openingAnimation();

  $(window).resize(function() {
    if (window.innerWidth > 700) {
      $('#voice-header').css('left','23%');
      $('#vote-header').css('left','35%');
      $('#hope-header').css('left','47%');
    } else {
      $('#voice-header').css('left','19.7%');
      $('#vote-header').css('left','22.42%');
      $('#hope-header').css('left','23.7%');
    }
  })

  // click begin
  $('#begin').click(function() {
    $('#initial-display-box').hide();
    $('.container').show();
    $('.container').animate({
      opacity:1
    }, 850);
    $('#header').css('backgroundImage','linear-gradient(to bottom, var(--strong-blue), var(--light-blue))');
  })

  // enable "other" field
  $('input[id="other-reason"]').change(function() {
    if ($('input[id="other-reason"]:checked').val()) {
      $('#other-input').removeAttr('disabled');
    } else {
      $('#other-input').attr('disabled', 'true');
    }
  })

  // check if name fields are filled out
  $('#first-name, #last-name, #zip').keyup(function() {
    if ($('#first-name').val() != '' && $('#last-name').val() != '' && $('#zip').val() != '') {
      $('#check-name').show();
      $('#next-1').removeAttr('disabled');
    } else {
      $('#next-1').attr('disabled','true');
    }
  });

  $('#phone, #email').keyup(function() {
    if ($('#phone').val() != '' && $('#email').val() != '') {
      $('#check-address').show();
    }
  })

  // check if reason fields are filled out
  $("input[name='reason']").change(function() {
    if ($("input[name='reason']:checked").val()) {
      $('#next-2').removeAttr('disabled');
      $('#check-reason').show();
    } else {
      $('#next-2').attr('disabled', 'true')
    };
  });

  // enable next for vote method buttons
  $("input[name='vote-method']").change(function() {
    if ($("input[name='vote-method']:checked").val()) {
      $('#next-3').removeAttr('disabled');
      $('#check-how').show();
    } else {
      $('#next-3').attr('disabled', 'true')
    };
  });

  // handling radio button functionality for labels
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

  // on submit
  $('button[type="submit"]').click(function() {
      sendData();
      setStorage();
      // goShare();
  })
});

function next(next, checkbox) {
  if (next == '#sec-reason') {
    if (checkZip($('#zip').val())) {
      $(next).css('display','flex');
      $(checkbox).show();
      $('html,body').delay(500).animate({
        scrollTop: $(next).offset().top
      }, 1400);
    } else {
      return
    }
  }
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
  sessionStorage.setItem('reason', $('input[name="reason"]:checked').val());
  sessionStorage.setItem('how', $('input[name="vote-method"]:checked').val());
}

function openingAnimation() {
  var width = window.innerWidth;
  var height = window.innerHeight;
  var voice_left = '23%';
  var vote_left = '35%';
  var hope_left = '47%';
  if (width < 700) {
    voice_left = '19.7%';
    vote_left = '22.42%';
    hope_left = '23.7%';
  }
  $('#voice-header').animate({
    top:'15%',
    left: voice_left
  }, 500, function() {
    $('#voice').animate({
      fontSize: '120%'
    }, 200, function() {
      $('#voice').animate({
        fontSize: '100%'
      }, 200, function() {
        $('#vote-header').animate({
          left: vote_left,
        }, 600, function() {
          $('#vote').animate({
            fontSize: '120%'
          }, 200, function() {
            $('#vote').animate({
              fontSize: '100%'
            }, 200, function() {
              $('#hope-header').animate({
                top:'45%',
                left: hope_left
              }, 700, function() {
                $('#hope').animate({
                  fontSize:'120%'
                }, 200, function() {
                  $(this).animate({
                    fontSize: '100%'
                  }, 200, function() {
                    $('#state-outline').animate({
                      opacity:1
                    }, 400  , function() {
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
    })
  });
}

function createData() {
  var first = $('#first-name').val();
  var last = $('#last-name').val();
  var zip = $('#zip').val();
  var email = encodeURIComponent($('#email-address').val());
  var phone = $('#phone').val();
  var reason = encodeURIComponent($('input[name="reason"]:checked').val());
  var method = encodeURIComponent($('input[name="vote-method"]:checked').val());

  var body = 'email=' + email + '&firstname=' + first + '&lastname=' + last + '&zip=' + zip + '&phone=' + phone + '&custom-3694=' + reason + '&custom-3695=' + method;
  return body
}

function sendData() {
  var data = createData();
  console.log(data);

  fetch('https://go.jaimeharrison.com/page/sapi/pledge-to-vote', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    mode: 'cors',
    body:data
  }).then(response => response.json()).then(data => {
    console.log('Success:', data)
  })
  .catch(error => {
    console.log('Error:', error)
  })
}
