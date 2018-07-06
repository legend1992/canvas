
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var erasering = false;
  autoSetCanvasSize(canvas);
  drawimg();
  toolsInit();
  function drawimg() {
    var penDown = false;
    var lastPoint = {
      x: undefined,
      y: undefined
    }
    //特性检测，是否支持touch事件
    if(document.body.ontouchstart!==undefined) {
      canvas.ontouchstart = function(event) {
        penDown = true;
        var x = event.touches[0].clientX;
        var y = event.touches[0].clientY;
        if(erasering){
          showEraser(x,y);
          context.clearRect(x-10,y-10,20,20);
        }else{
          lastPoint = {
            x: x,
            y: y
          }
          // drawCircle(x,y,1);
        }
      }
      canvas.ontouchmove = function(event) {
        if(penDown) {
          var x = event.touches[0].clientX;
          var y = event.touches[0].clientY;
          if(erasering){
            showEraser(x,y);
            context.clearRect(x-10,y-10,20,20);
          }else{
            var newPoint = {
              x: x,
              y: y
            }
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
            lastPoint = newPoint;
          }
        }
      }
      // var tool = document.getElementById('tool');
      // tool.onmouseup = function(event) {
      //   penDown = false;
      //   hiddenEraser();
      // }
      canvas.ontouchend = function(event) {
        penDown = false;
      }
    }else{
      canvas.onmousedown = function(event) {
        penDown = true;
        var x = event.clientX;
        var y = event.clientY;
        if(erasering){
          showEraser(x,y);
          context.clearRect(x-10,y-10,20,20);
        }else{
          lastPoint = {
            x: x,
            y: y
          }
          // drawCircle(x,y,1);
        }
      }
      canvas.onmousemove = function(event) {
        event.preventDefault();
        if(penDown) {
          var x = event.clientX;
          var y = event.clientY;
          if(erasering){
            showEraser(x,y);
            context.clearRect(x-10,y-10,20,20);
          }else{
            var newPoint = {
              x: x,
              y: y
            }
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
            lastPoint = newPoint;
          }
        }
      }
      var tool = document.getElementById('tool');
      tool.onmouseup = function(event) {
        penDown = false;
        hiddenEraser();
      }
      canvas.onmouseup = function(event) {
        penDown = false;
      }
    }
  }

  // function drawCircle(x,y,radius) {
  //   context.beginPath();
  //   context.fillStyle = '#fff';
  //   context.arc(x,y,radius,0,Math.PI*2);
  //   context.fill();
  // }
  function drawLine(sx,sy,ex,ey) {
    context.beginPath();
    context.strokeStyle = '#fff';
    context.moveTo(sx,sy);
    context.lineWidth = 5;
    context.lineTo(ex,ey);
    context.stroke();
    context.closePath();
  }
  function autoSetCanvasSize(canvas) {
    setCanvasSize();
    window.onresize = function() {
      setCanvasSize();
    }
    function setCanvasSize() {
      var pageWidth = document.documentElement.clientWidth;
      var pageHeight = document.documentElement.clientHeight;
      canvas.width = pageWidth;
      canvas.height = pageHeight;
    }
  }
  function toolsInit() {
    var eraser = document.getElementById('eraser');
    var pen = document.getElementById('pen');
    clickEraser();
    clickPen();
    function clickEraser() {
      eraser.onclick = function(event) {
        event.stopPropagation();
        erasering = !erasering;
        if(eraser.className !== 'active'){
          eraser.className = 'active';
        }else{
          eraser.className = '';
          hiddenEraser();
        }
        pen.className = '';
      }
    }
    function clickPen() {
      pen.onclick = function(event) {
        event.stopPropagation();
        erasering = false;
        if(pen.className !== 'active'){
          pen.className = 'active';
        }
        eraser.className = '';
        hiddenEraser();
      }
    }
  }
  function showEraser(x,y) {
    var tool = document.getElementById('tool');
    tool.style.left = x-10+'px';
    tool.style.top = y-10+'px';
    tool.style.display = 'block';
  }
  function hiddenEraser() {
    var tool = document.getElementById('tool');
    tool.style.display = 'none';
  }