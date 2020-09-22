const frame = {
  height: 1080,
  width: 1080
}

const name_params = {
  top: 200,
  left: 200,
  fontFamily: 'Shadows Into Light',
  fontSize: 100,
  fill:'black'
}

const reason_params = {
  top:600,
  left: 200,
  fontFamily: 'Shadows Into Light',
  fontSize:50,
  fill: 'black'
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
  name_text = new fabric.Text(name, name_params);

  reason_text = new fabric.Textbox(reason, reason_params);
  reason_text.set('width',700)

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
