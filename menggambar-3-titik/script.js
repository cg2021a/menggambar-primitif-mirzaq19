function main() {
  /**
   * @type {HTMLCanvasElement} canvas
   */
  const canvas = document.getElementById("mycanvas");
  /**
   * @type {WebGLRenderingContext} gl
   */
  const gl = canvas.getContext("webgl");

  // Definisi Titik
  let vertices = [
    // 0.0,
    // 0.8, //titik A
    // -0.5,
    // -0.8, //titik B
    // 0.5,
    // -0.8, //titik C
    -0.5, 0.5, -0.5, -0.5, 0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5,
  ];

  let positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  // let vertexShaderCode = document.getElementById("vertexShaderCode").innerText;
  let vertexShaderCode = `
    attribute vec2 a_Position;
    void main(){
      gl_Position = vec4(a_Position, 0.0, 1.0);
      gl_PointSize = 8.0;
    }
  `;

  let vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderCode);
  gl.compileShader(vertexShader);

  // let fragmentShaderCode = document.getElementById("fragmentShaderCode").text;
  let fragmentShaderCode = `
    void main(){
      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
  `;

  let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentShaderCode);
  gl.compileShader(fragmentShader);

  // Menautkan titik dan warna dalam program
  let shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram);

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  let aPosition = gl.getAttribLocation(shaderProgram, "a_Position");
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(aPosition);

  gl.clearColor(0.0, 0.5, 0.9, 0.6);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.TRIANGLES, 0, 6);
}

main();
