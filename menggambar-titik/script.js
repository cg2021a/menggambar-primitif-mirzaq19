function main() {
  /**
   * @type {HTMLCanvasElement} canvas
   */
  const canvas = document.getElementById("mycanvas");
  /**
   * @type {WebGLRenderingContext} gl
   */
  const gl = canvas.getContext("webgl");

  // Konfigurasi Titik yang akan digambar
  let vertexShaderCode = `
    void main(){
      gl_Position = vec4(0, 0, 0, 1);
      gl_PointSize = 8.0;
    }
  `;

  let vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderCode);
  gl.compileShader(vertexShader);

  // Konfigurasi warna titik yang digambar
  let fragmentShaderCode = `
    void main(){
      gl_FragColor = vec4(1,0,0,1);
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

  gl.clearColor(0.0, 0.5, 0.9, 0.6);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.POINTS, 0, 1);
}

main();
