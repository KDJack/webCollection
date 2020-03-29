var c = document.getElementById('canv');
var $ = c.getContext('2d');

var w = c.width = window.innerWidth;
var h = c.height = window.innerHeight;

var draw = function(t) {
  $.lineWidth = 0.8;
  $.fillStyle = 'rgb(255, 255, 255)';
  $.fillRect(0, 0, w, h);
  for (var i = -20; i < 20; i += 1) {
    $.strokeStyle = 'rgba(255, 100, 25, .15)';
    $.beginPath();
    $.moveTo(0, h / 2);
    for (var j = 0; j < w; j += 10) {
      $.lineTo(10 * Math.sin(i / 10) + j + 0.008 * j * j, Math.floor(h / 2 + j / 2 * Math.sin(j / 50 - t / 50 - i / 118) + (i * 0.9) * Math.sin(j / 25 - (i + t) / 65)));
    };
    $.stroke();
  }
}
var t = 0;

window.addEventListener('resize', function() {
  c.width = w = window.innerWidth;
  c.height = h = window.innerHeight;
  $.fillStyle = '';
}, false);

var run = function() {
  window.requestAnimationFrame(run);
  t += 1;
  draw(t);
};
run();