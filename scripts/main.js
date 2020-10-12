// intializing
$('document').ready(function() {

  openingAnimation();

  // responsiveness for opening headers and form sections that can become too tall
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

    if ($('#sec-reason').css('height') < $('#reason-card').css('height')) {
      $('#sec-reason').css('height', $('#reason-card').css('height'));
      $('#sec-reason').css('margin-bottom', '1em');
    } else if ($('#sec-name').css('height') < $('#name-card').css('height')) {
      $('#sec-name').css('height', $('#name-card').css('height'));
      $('#sec-name').css('padding-bottom', '1em');
    }
  })

  /* ---------------- LISTENERS FOR BUTTONS AND INPUTS ---------------------------- */

  // responsiveness for reason section, when it first appears
  $('#next-1').click(function() {
    if ($('#sec-reason').css('height') < $('#reason-card').css('height')) {
      $('#sec-reason').css('height', $('#reason-card').css('height'));
      $('#sec-reason').css('margin-bottom', '1em');
    }
  })

  // click begin
  $('#begin').click(function() {
    $('#initial-display-box').hide();
    $('.container').show();
    $('.container').animate({
      opacity:1
    }, 850);
    $('#header').css('background','var(--strong-blue)');
  })

  // enable "other" field
  $('input[id="other-reason"]').change(function() {
    if ($(this).prop('checked')) {
      $('#other-input').show();
      $('#other-input').removeAttr('disabled');
    } else {
      $('#other-input').attr('disabled', 'true');
    }
  })

  // check if name and zip fields are filled out
  $('#first-name, #last-name, #zip').keyup(function() {
    if ($('#first-name').val() != '' && $('#last-name').val() != '' && $('#zip').val() != '') {
      $('#next-1').removeAttr('disabled');
    } else {
      $('#next-1').attr('disabled','true');
    }
  });

  $('#voted').change(function() {
    if ($(this).prop('checked')) {
      $('#voted-label').addClass('chosen');
      $('#im-voting').html("I <span id='red-vote' style='color:var(--strong-red)'>voted</span> for Jaime Harrison");
      $('#because').html("I voted for Jaime because...");
      $('#i-pledge').html("I voted...");
      $('#remind').html("How can we thank you?");
    } else {
      $('#voted-label').removeClass('chosen');
      $('#im-voting').html("I'm <span id='red-vote' style='color:var(--strong-red)'>voting</span> for Jaime Harrison");
      $('#because').html("I'm voting for Jaime because...");
      $('#i-pledge').html("I pledge to vote...");
      $('#remind').html("How can we remind you?");
    }
  })

  // check if reason fields are filled out
  $("input[name='custom-3694']").change(function() {
    if ($(this).attr('id') != 'other-reason') {
      $('#other-input').hide();
      $('#other-input').prop('disabled',true);
    }
    if ($("input[name='custom-3694']:checked").val()) {
      $('#next-2').removeAttr('disabled');
    } else {
      $('#next-2').attr('disabled', 'true')
    };
  });

  // enable next for vote method buttons
  $("input[name='custom-3695']").change(function() {
    if ($("input[name='custom-3695']:checked").val()) {
      $('#next-3').removeAttr('disabled');
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

  /* ---------------- MISCELLANEOUS LISTENERS ---------------------------- */

  // preventing return button from submitting form
  $('form input').keydown(function (e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        return false;
    }
  });

  // checking if the device is mobile, choosing whether to show download help
  if ($(window).width() < 500) {
    $('#download').click(function() {
      $('#download-help').css('display','flex');
    })

    $('#download-help').click(function() {
      $(this).css('display','none');
    })
  }

  /* ---------------- HANDLING SUBMIT ---------------------------- */

  // on submit
  $('button[type="submit"]').click(async function() {
    if (!checkZip($('#zip').val())) {
      $('html,body').animate({
        scrollTop: $('#sec-name').offset().top
      }, 1400);
      return false;
    } else if (!checkEmail()) {
      alert('Please enter a valid email address.');
      return false;
    } else if (!checkPhone()) {
      alert('Please enter a valid phone number.');
      return false;
    } else if (checkFields()) {
      setStorage();
      console.log($('#voted').val());
      $('#loading').css('display','flex');
      await sendData();
      console.log('success');
      goShare();
    } else {
      alert('Please fill out all the required fields.');
    }
  })
});

/* ------------- VALIDATION FUNCTIONS ----------------- */

function checkPhone() {
  if (!$('#phone').val()) {
    return true;
  } else {
    const re = /^\d{10}$/;
    return ($('#phone').val().toLowerCase()).match(re)
  }
}

function checkEmail() {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return ($('#email-address').val().toLowerCase()).match(re);
}

function checkZip(zip) {
  if (zip < 29001 || zip > 29945 || isNaN(zip)) {
    alert("Please enter a valid South Carolina zip code");
    return false;
  } else return true;
}

function checkFields() {
  return !(!$('#email-address').val() || !$('input[name="custom-3695"]').val() || !$('input[name="custom-3694"]').val() || !$('#first-name').val() || !$('#last-name').val() || !$('#zip').val())
}

/* ----------------- DYNAMIC ELEMENT FUNCTIONS --------------------- */

function next(next, checkbox) {
  if (next == '#sec-reason') {
    if (checkZip($('#zip').val())) {
      $(next).css('display','flex');
      $(checkbox).show();
      $('html,body').animate({
        scrollTop: $(next).offset().top
      }, 1400);
    } else {
      return
    }
  }
  $(next).css('display','flex');
  $(checkbox).show();
  $('html,body').animate({
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
  }, 300, function() {
    $('#voice').animate({
      fontSize: '120%'
    }, 170, function() {
      $('#voice').animate({
        fontSize: '100%'
      }, 170, function() {
        $('#vote-header').animate({
          left: vote_left,
        }, 550, function() {
          $('#vote').animate({
            fontSize: '120%'
          }, 170, function() {
            $('#vote').animate({
              fontSize: '100%'
            }, 170, function() {
              $('#hope-header').animate({
                top:'45%',
                left: hope_left
              }, 650  , function() {
                $('#hope').animate({
                  fontSize:'120%'
                }, 170, function() {
                  $(this).animate({
                    fontSize: '100%'
                  }, 170, function() {
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

/* ------------ SUBMIT FUNCTIONS -- */

function goShare() {
  $(location).attr('href','share.html');
}

function setStorage() {
  var reason = $('input[name="custom-3694"]:checked').val();
  if (reason == 'other') {
    $('input[name="custom-3694"]:checked').val($('#other-input').val());
  }
  sessionStorage.setItem('name', $('#first-name').val() + ' ' + $('#last-name').val());
  sessionStorage.setItem('reason', $('input[name="custom-3694"]:checked').val());
  sessionStorage.setItem('how', $('input[name="custom-3695"]:checked').val());
  if ($('#voted').prop('checked')) {
    sessionStorage.setItem('voted', 'true');
  } else {
    $('#voted').val('false');
    sessionStorage.setItem('voted', 'false');
  }
}

function sendData() {

  var data = new FormData(document.getElementById('visible-form'));
  for (var pair of data.entries()) {
   console.log(pair[0] + ', ' + pair[1]);
  }

  return new Promise((resolve,reject) => {
    fetch('https://us-east1-pledge-to-vote.cloudfunctions.net/pledge-bsd-proxy', {
      method: 'POST',
      mode: 'cors',
      body: data
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      resolve(data);
    })
    .catch(error => {
      alert('Whoops! Something went wrong. Please try again.');
      $('#loading').hide();
      console.log('Error:', error);
      reject(error);
    })
  })
}
