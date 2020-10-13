const frame = {
  height: 1200,
  width: 1200
}

const name_params = {
  left: 254.86,
  top: 87.9,
  width: 800,
  height: 254.86,
  textAlign: 'center',
  fontFamily: 'Shadows Into Light',
  fontSize: 100,
  fill:'white',
  fontWeight: 'bold'
}

const reason_params = {
  top:699.81,
  left: 63.43,
  height: 240,
  width: 1060,
  textAlign: 'center',
  fontFamily: 'Shadows Into Light',
  fontSize:100,
  fill: 'white',
  fontWeight: 'bold'
}

const how_params = {
  top: 441.47,
  left: 218.15,
  width: 760.52,
  height: 129.93,
  textAlign: 'center',
  fontFamily: 'Shadows Into Light',
  fontSize: 100,
  fill: 'white',
  fontWeight: 'bold'
}

var canvas = null;
var fabric_frame = null;
var name = null;
var name_text = null;
var reason = null;
var reason_text = null;
var how = null;
var how_text = null;
var voted = null;

window.onload = async function() {

  name = sessionStorage.getItem('name');
  reason = sessionStorage.getItem('reason');
  how = sessionStorage.getItem('how');
  voted = sessionStorage.getItem('voted');

  if (name == null || reason == null || how == null) {
    alert("You haven't filled out the proper fields in the form. You will be redirected to the main page.");
    $(location).attr('href','index.html');
  } else {
    canvas = new fabric.StaticCanvas('c');

    var frame = document.getElementById('frame');

    if (voted == 'true') {
      frame.src = 'images/IVoted.png';

      name_params.left = 271.69;
      name_params.top = 54.29;
      name_params.width = 763.41;
      name_params.height = 123.82;

      document.getElementById('test-name').style.width = "763.41 px";

      reason_params.left = 47.58;
      reason_params.top = 700.82;
      reason_params.width = 1105.44;
      reason_params.height = 242.84;

      document.getElementById('test-reason').style.width = "1105.44 px";
    }

    fabric_frame = new fabric.Image(frame);
    canvas.sendToBack(fabric_frame);

    document.fonts.load('100pt Shadows Into Light').then(async function() {
      if (voted == 'true') {
        frame.onload = function() {
          insertText();

          generateGraphic();
        }
      } else {
        insertText();

        generateGraphic();
      }
    })
    .catch(error => console.log('Font error:', error));
  }
}

function insertText() {

  var testReason = document.getElementById('test-reason');
  testReason.innerHTML = reason;
  var testHeight = (testReason.clientHeight + 1);

  var testName = document.getElementById('test-name');
  testName.innerHTML = name;
  var testHeight2 = (testName.clientHeight + 1);

  var currentReasonHeight = reason_params.height;
  var currentNameHeight = name_params.height;
  if (testHeight > reason_params.height) {
    reason_params.fontSize = (100 / testHeight) * currentReasonHeight;
  }
  if (testHeight2 > name_params.height) {
    name_params.fontSize = (100 / testHeight2) * currentNameHeight;
  }

  name_text = new fabric.Textbox(name, name_params);

  reason_text = new fabric.Textbox(reason, reason_params);

  if (voted == 'true') {
    how_text = new fabric.Textbox(how, how_params);

    canvas.add(how_text);
  }

  canvas.add(name_text);
  canvas.add(reason_text);
}

function generateGraphic() {

  let imgURL = canvas.toDataURL();

  $('#pledge-graphic').attr('src',imgURL);
  $('#download').attr('href', imgURL);
}
