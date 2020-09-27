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
  left: 123.81,
  height: 302.18,
  width: 969.62,
  textAlign: 'center',
  fontFamily: 'Shadows Into Light',
  fontSize:100,
  fill: 'white',
  fontWeight: 'bold'
}

var canvas = null;
var fabric_frame = null;
var name = null;
var name_text = null;
var reason = null;
var reason_text = null;

window.onload = function() {
  canvas = new fabric.StaticCanvas('c');

  fabric_frame = new fabric.Image(document.getElementById('frame'));
  canvas.sendToBack(fabric_frame);

  name = sessionStorage.getItem('name');
  reason = sessionStorage.getItem('reason');

  insertText();

  generateGraphic();
}

function insertText() {
  var testReason = document.getElementById('test-reason');
  testReason.innerHTML = reason;
  var testHeight = (testReason.clientHeight + 1) * 0.9;

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

  console.log(name);
  console.log(reason);

  canvas.add(name_text);
  canvas.add(reason_text);
}

function generateGraphic() {
  let imgURL = canvas.toDataURL();

  $('#pledge-graphic').attr('src',imgURL);
  $('#download').attr('href', imgURL);
}
