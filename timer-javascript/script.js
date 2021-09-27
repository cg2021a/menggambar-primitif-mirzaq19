/**
 * @type {HTMLCanvasElement} canvas
 */
var canvas = document.getElementById("mycanvas");
/**
 * @type {WebGLRenderingContext} gl
 */
var gl = canvas.getContext("webgl");

// Definisi Titik
let vertices = [
  -0.5,
  0.5,
  0.0,
  0.83,
  1.0, //titik A
  0.5,
  0.5,
  0.0,
  0.81,
  0.73, //titik B
  0.5,
  -0.5,
  0.0,
  0.01,
  0.26, //titik C
  -0.5,
  -0.5,
  0.0,
  0.0,
  1.0, //titik D
];

// Membuat linkedlist untuk simpan data vertex
let buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

// Membuat Vertex Shader
let vertexShaderCode = `
  attribute vec2 aPosition;
  attribute vec3 aColor;
  varying vec3 vColor;
  uniform float uChange;
  void main(){
    gl_Position = vec4(aPosition + uChange, 0.0, 1.0);
    vColor = aColor;
  }
`;
let vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexShaderCode);
gl.compileShader(vertexShader);

// Membuat Fragment Shader
let fragmentShaderCode = `
  precision mediump float;
  varying vec3 vColor;
  void main(){
    gl_FragColor = vec4(vColor, 1.0);
  }
`;

let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderCode);
gl.compileShader(fragmentShader);

// Menautkan titik dan warna dalam program -> Compile shader ke program -> file.exe
let shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertexShader);
gl.attachShader(shaderProgram, fragmentShader);
gl.linkProgram(shaderProgram);
gl.useProgram(shaderProgram);

let aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
let aColor = gl.getAttribLocation(shaderProgram, "aColor");
gl.vertexAttribPointer(
  aPosition,
  2,
  gl.FLOAT,
  false,
  5 * Float32Array.BYTES_PER_ELEMENT,
  0
);
gl.vertexAttribPointer(
  aColor,
  3,
  gl.FLOAT,
  false,
  5 * Float32Array.BYTES_PER_ELEMENT,
  2 * Float32Array.BYTES_PER_ELEMENT
);
gl.enableVertexAttribArray(aPosition);
gl.enableVertexAttribArray(aColor);

//Elemen interasktif
let freeze = false;
function onMouseClick(e) {
  freeze = !freeze;
}
document.addEventListener("click", onMouseClick, false);

function onKeyDown(e) {
  if (e.keyCode == 32) freeze = true;
}
function onKeyUp(e) {
  if (e.keyCode == 32) freeze = false;
}

document.addEventListener("keydown", onKeyDown, false);
document.addEventListener("keyup", onKeyUp, false);

// Kecepatan animasi
let speed = 0.005;
let change = 0;
let uChange = gl.getUniformLocation(shaderProgram, "uChange");

// =============== Cara 1: menggunakan setInterval(function,fps) ==================
// function render() {
//   if (change >= 0.5 || change < -0.5) speed = -speed;
//   change += speed;
//   gl.uniform1f(uChange, change);

//   gl.clearColor(0.0, 0.1, 0.15, 1.0);
//   gl.clear(gl.COLOR_BUFFER_BIT);
//   gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
// }

// setInterval(render, 1000 / 60);

// ============== Cara 2: menggunakan setTimeOut(function,fps) ===================
function render() {
  setTimeout(function () {
    if (change < -0.5 || change >= 0.5) speed = -speed;

    if (!freeze) change += speed;

    gl.uniform1f(uChange, change);

    gl.clearColor(0.0, 0.1, 0.15, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    render();
  }, 1000 / 60);
}
render();
