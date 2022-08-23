/*
Tititle: COMP3820 Project
File: GamePage.html
Description:Javascript file 
Author: ZiCheng Ren 
Student ID:T00548429
Date: 04/14/2021
*/

"use strict";
/*global variable defined*/
var canvas;
var gl;
var program;
var numPositions  = 36;
var lastX = -1, lastY = -1;
var cube_positionsArray = new Float32Array([
   -0.5, -0.5,  -0.5,
   -0.5,  0.5,  -0.5,
    0.5, -0.5,  -0.5,
   -0.5,  0.5,  -0.5,
    0.5,  0.5,  -0.5,
    0.5, -0.5,  -0.5,

   -0.5, -0.5,   0.5,
    0.5, -0.5,   0.5,
   -0.5,  0.5,   0.5,
   -0.5,  0.5,   0.5,
    0.5, -0.5,   0.5,
    0.5,  0.5,   0.5,

   -0.5,   0.5, -0.5,
   -0.5,   0.5,  0.5,
    0.5,   0.5, -0.5,
   -0.5,   0.5,  0.5,
    0.5,   0.5,  0.5,
    0.5,   0.5, -0.5,

   -0.5,  -0.5, -0.5,
    0.5,  -0.5, -0.5,
   -0.5,  -0.5,  0.5,
   -0.5,  -0.5,  0.5,
    0.5,  -0.5, -0.5,
    0.5,  -0.5,  0.5,

   -0.5,  -0.5, -0.5,
   -0.5,  -0.5,  0.5,
   -0.5,   0.5, -0.5,
   -0.5,  -0.5,  0.5,
   -0.5,   0.5,  0.5,
   -0.5,   0.5, -0.5,

    0.5,  -0.5, -0.5,
    0.5,   0.5, -0.5,
    0.5,  -0.5,  0.5,
    0.5,  -0.5,  0.5,
    0.5,   0.5, -0.5,
    0.5,   0.5,  0.5,
]);
var colorsArray = [];
var framebuffer;
var flag = false;
var color = new Uint8Array(4);
var cube_texCoordsArray = new Float32Array([
   // select the top left image
   0   , 0  ,
   0   , 0.5,
   0.25, 0  ,
   0   , 0.5,
   0.25, 0.5,
   0.25, 0  ,
   // select the top middle image
   0.25, 0  ,
   0.5 , 0  ,
   0.25, 0.5,
   0.25, 0.5,
   0.5 , 0  ,
   0.5 , 0.5,
   // select to top right image
   0.5 , 0  ,
   0.5 , 0.5,
   0.75, 0  ,
   0.5 , 0.5,
   0.75, 0.5,
   0.75, 0  ,
   // select the bottom left image
   0   , 0.5,
   0.25, 0.5,
   0   , 1  ,
   0   , 1  ,
   0.25, 0.5,
   0.25, 1  ,
   // select the bottom middle image
   0.25, 0.5,
   0.25, 1  ,
   0.5 , 0.5,
   0.25, 1  ,
   0.5 , 1  ,
   0.5 , 0.5,
   // select the bottom right image
   0.5 , 0.5,
   0.75, 0.5,
   0.5 , 1  ,
   0.5 , 1  ,
   0.75, 0.5,
   0.75, 1  ,
]);
var normalsArray = [
   //front
   vec3(0.0, 0.0, 1.0),
   vec3(0.0, 0.0, 1.0),
   vec3(0.0, 0.0, 1.0),
   vec3(0.0, 0.0, 1.0),
   vec3(0.0, 0.0, 1.0),
   vec3(0.0, 0.0, 1.0),
   //back
   vec3(0.0, 0.0, -1),
   vec3(0.0, 0.0, -1),
   vec3(0.0, 0.0, -1),
   vec3(0.0, 0.0, -1),
   vec3(0.0, 0.0, -1),
   vec3(0.0, 0.0, -1),
   //top
   vec3(0.0, 1, 0.0),
   vec3(0.0, 1, 0.0),
   vec3(0.0, 1, 0.0),
   vec3(0.0, 1, 0.0),
   vec3(0.0, 1, 0.0),
   vec3(0.0, 1, 0.0),
   // Bottom
   vec3(0.0, -1, 0.0),
   vec3(0.0, -1, 0.0),
   vec3(0.0, -1, 0.0),
   vec3(0.0, -1, 0.0),
   vec3(0.0, -1, 0.0),
   vec3(0.0, -1, 0.0),
   //right
   vec3(1.0, 0.0, 0.0),
   vec3(1.0, 0.0, 0.0),
   vec3(1.0, 0.0, 0.0),
   vec3(1.0, 0.0, 0.0),
   vec3(1.0, 0.0, 0.0),
   vec3(1.0, 0.0, 0.0),
   //left
   vec3(-1.0, 0.0, 0.0),
   vec3(-1.0, 0.0, 0.0),
   vec3(-1.0, 0.0, 0.0),
   vec3(-1.0, 0.0, 0.0),
   vec3(-1.0, 0.0, 0.0),
   vec3(-1.0, 0.0, 0.0),
];
//cube vertices
var cube_vertices = [
   vec4(-0.5, -0.5,  0.5, 1.0),
   vec4(-0.5,  0.5,  0.5, 1.0),
   vec4(0.5,  0.5,  0.5, 1.0),
   vec4(0.5, -0.5,  0.5, 1.0),
   vec4(-0.5, -0.5, -0.5, 1.0),
   vec4(-0.5,  0.5, -0.5, 1.0),
   vec4(0.5,  0.5, -0.5, 1.0),
   vec4(0.5, -0.5, -0.5, 1.0),
];
//Octahedron vertices
var octahedron_vertices = [
  vec4(-0.3,0,0.3,1),
  vec4( 0,0.5,0,1),
  vec4( 0.3,0,0.3,1),
  vec4( 0.3,0,-0.3,1),
  vec4( -0.3,0,-0.3,1),
  vec4( 0,-0.5,0,1),  
];
var vertexColors = [
        vec4(0.0, 0.0, 0.0, 1.0),  // black
        vec4(1.0, 0.0, 0.0, 1.0),  // red
        vec4(1.0, 1.0, 0.0, 1.0),  // yellow
        vec4(0.0, 1.0, 0.0, 1.0),  // green
        vec4(0.0, 0.0, 1.0, 1.0),  // blue
        vec4(1.0, 0.0, 1.0, 1.0),  // magenta
        vec4(0.0, 1.0, 1.0, 1.0),  // cyan
        vec4(1.0, 1.0, 1.0, 1.0),   // white
];
var lightPosition = vec4(0.0, 2.0, 0.0, 1.0);
var lightAmbient = vec4(0.2, 0.2, 0.2, 1.0);
var lightDiffuse = vec4(1.0, 1.0, 1.0, 1.0);
var lightSpecular = vec4( 1.0, 1.0, 1.0, 1.0);
var materialAmbient = vec4(1.0, 1.0, 1.0, 1.0 );
var materialDiffuse = vec4(0.8, 0.8, 0.8, 1.0);
var materialSpecular = vec4(1.0, 1.0, 1.0, 1.0 );
var materialShininess = 100;
var ambientColor, diffuseColor, specularColor;
var modelViewMatrix, projectionMatrix;
var viewerPos;
var program;
var xAxis = 0;
var yAxis = 1;
var zAxis = 2;
var axis = xAxis;
var theta = vec3(0, 0, 0);
var thetaLoc;
var Index = 0;
var display_canvas = false;
var textureMap1;
var textureMap2;
var textureMap3;
var timeleft;
var last_picked_index = 0;
var audio;
var check_click_start = false;
var click_time = 1;
var myTimer;
var check_user_has_clicked_face = false;
var img_position = [0,0,0,0,0,0];
var change_img = 1;
var hasStarted = true;
var drag = 0;
var xRotate;
var yRotate;
var fieldOfView;
var cameraPosition;
var up;
var target;
var modelViewMatrix;
var aspect;
var zNear;
var zFar;
/****************************Cube color***************************************/
//function for Specifying the color of each vertex
function quad(a, b, c, d) {
     colorsArray.push(vertexColors[a]);
     colorsArray.push(vertexColors[a]);
     colorsArray.push(vertexColors[a]);
     colorsArray.push(vertexColors[a]);
     colorsArray.push(vertexColors[a]);
     colorsArray.push(vertexColors[a]);
}

//function for drawing order
function cube()
{
   quad(1, 0, 3, 2);
   quad(2, 3, 7, 6);
   quad(3, 0, 4, 7);
   quad(6, 5, 1, 2);
   quad(4, 5, 6, 7);
   quad(5, 4, 0, 1);
}
/******************************************************************************************/

window.onload = function init(){
  
   //Initialize the canvas by document.getElementById method
   canvas = document.getElementById("gl-canvas");
   gl = canvas.getContext('webgl2');
   if (!gl) {
      alert("WebGL 2.0 isn't available");
   }
   //set the viewport and canvas background color
   gl.viewport(0, 0, canvas.width, canvas.height);
   gl.clearColor(0.0, 0.0, 0.0, 0.0);

   gl.enable(gl.DEPTH_TEST);
   gl.enable(gl.CULL_FACE);

   //creat texture 
   var texture = gl.createTexture();
   gl.bindTexture( gl.TEXTURE_2D, texture );
   gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 700, 700, 0,
      gl.RGBA, gl.UNSIGNED_BYTE, null);
   gl.generateMipmap(gl.TEXTURE_2D);

   // Allocate a frame buffer object
   framebuffer = gl.createFramebuffer();
   gl.bindFramebuffer( gl.FRAMEBUFFER, framebuffer);
   // Attach color buffer
   gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
   // check for completeness
   gl.bindFramebuffer(gl.FRAMEBUFFER, null);

   //Load shaders and initialize attribute buffers
   program = initShaders(gl, "vertex-shader", "fragment-shader");
   gl.useProgram(program);

   //call cube function
   cube();

   //Create buffer for color
   var cBuffer = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
   gl.bufferData(gl.ARRAY_BUFFER, flatten(colorsArray), gl.STATIC_DRAW);
   var colorLoc = gl.getAttribLocation( program, "aColor");
   gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);
   gl.enableVertexAttribArray(colorLoc);

   //Create buffer for normals
   var nBuffer = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer);
   gl.bufferData(gl.ARRAY_BUFFER, flatten(normalsArray), gl.STATIC_DRAW);
   var normalLoc = gl.getAttribLocation( program, "aNormal");
   gl.vertexAttribPointer(normalLoc, 3, gl.FLOAT, false, 0, 0);
   gl.enableVertexAttribArray(normalLoc);

   //Create buffer for vectice
   var vBuffer = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
   gl.bufferData(gl.ARRAY_BUFFER, cube_positionsArray, gl.STATIC_DRAW);
   var positionLoc = gl.getAttribLocation(program, "aPosition");
   gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0);
   gl.enableVertexAttribArray(positionLoc);

   //Create buffer for texture coordinate
   var tBuffer = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer);
   gl.bufferData(gl.ARRAY_BUFFER, cube_texCoordsArray, gl.STATIC_DRAW);
   var texCoordLoc = gl.getAttribLocation(program, "aTexCoord");
   gl.vertexAttribPointer(texCoordLoc, 2, gl.FLOAT, false, 0, 0);
   gl.enableVertexAttribArray(texCoordLoc);

   var ambientProduct = mult(lightAmbient, materialAmbient);
   var diffuseProduct = mult(lightDiffuse, materialDiffuse);
   var specularProduct = mult(lightSpecular, materialSpecular);

   //add onclick event to buttonX
   document.getElementById("ButtonX").onclick = function(){
      axis = xAxis;
      audio = document.getElementById('click_sound'); 
      if(audio.paused){                 
         audio.play();
      }   
   };

   //add onclick event to buttonY
   document.getElementById("ButtonY").onclick = function(){
      axis = yAxis;
      audio = document.getElementById('click_sound'); 
      if(audio.paused){                 
         audio.play();
      }
   };

   //add onclick event to buttonZ
   document.getElementById("ButtonZ").onclick = function(){
      axis = zAxis;
      audio = document.getElementById('click_sound'); 
      if(audio.paused){                 
         audio.play();
      }
      
   };

   //add onclick event to buttonT
   document.getElementById("ButtonT").onclick = function(){
      audio = document.getElementById('click_sound'); 
      if(audio.paused){                 
         audio.play();
      }
      flag = !flag
   };

   gl.uniform4fv(gl.getUniformLocation(program, "uAmbientProduct"), ambientProduct);
   gl.uniform4fv(gl.getUniformLocation(program, "uDiffuseProduct"), diffuseProduct );
   gl.uniform4fv(gl.getUniformLocation(program, "uSpecularProduct"), specularProduct );
   gl.uniform4fv(gl.getUniformLocation(program, "uLightPosition"), lightPosition );
   gl.uniform1f(gl.getUniformLocation(program, "uShininess"), materialShininess);
   gl.uniform1i(gl.getUniformLocation(program, "uColorIndex"), 0);
   gl.uniform1i(gl.getUniformLocation(program, "texture_face"), 1);

   configureTexture();

   //add on click event to button start_timer
   document.getElementById("start_timer").onclick = function(){
      audio = document.getElementById('click_sound'); 
      if(audio.paused){                 
         audio.play();
      }
      if(hasStarted == true){
         theta = vec3(45, 45, 45);
         //remove the dragging
         document.getElementById("gl-canvas").removeEventListener("mousedown",md);
         document.getElementById("gl-canvas").removeEventListener("mouseup",mu);
         document.getElementById("gl-canvas").removeEventListener("mousemove",mm);
         flag = true;
         hasStarted = false;
         gl.uniform1i(gl.getUniformLocation(program, "texture_face"), 0);
         check_click_start = true;
         timeleft = 120;
         //set timer countdown
         myTimer = setInterval(function(){
         //if time up
         if(timeleft < 0){
            clearInterval(myTimer);
            alert("Time's up");
            gl.uniform1i(gl.getUniformLocation(program, "texture_face"), 1);
            check_click_start = false;
            click_time = 1;
            //check whether user is win or not
            if(change_img == 1){
               if(check_user_picked_dog() == true){
                  audio = document.getElementById('win_sound'); 
                  if(audio.paused){                 
                     audio.play();
                  }
                  alert("You win!");
               }else{
                  audio = document.getElementById('fail_sound'); 
                  if(audio.paused){                 
                     audio.play();
                  }
                  alert("Sorry, you can do better next time!");
                  hasStarted = true;
               }
            }else if(change_img == 2){
               if(check_user_picked_panda_cat() == true){
                  audio = document.getElementById('win_sound'); 
                  if(audio.paused){                 
                     audio.play();
                  }
                  alert("You win!");
               }else{
                  audio = document.getElementById('fail_sound'); 
                  if(audio.paused){                 
                     audio.play();
                  }
                  alert("Sorry, you can do better next time!");
               }
               hasStarted = true;        
            }else if(change_img == 3){
               if(check_user_picked_panda_cat() == true){
                  audio = document.getElementById('win_sound'); 
                  if(audio.paused){                 
                     audio.play();
                  }
                  alert("You win!");
               }else{
                  audio = document.getElementById('fail_sound'); 
                  if(audio.paused){                 
                     audio.play();
                  }
                  alert("Sorry, you can do better next time!");
               }
               hasStarted = true;
            }
            document.getElementById("countdown").innerHTML = "";
            img_position = [0,0,0,0,0,0];
            remove_user_picked();
            document.getElementById("gl-canvas").addEventListener('mousedown', md);
            document.getElementById("gl-canvas").addEventListener('mouseup', mu);
            document.getElementById("gl-canvas").addEventListener('mousemove', mm);
            theta = vec3(0, 0, 0);
            flag = false;
         }else {
            //display time remaining
            document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";           
         }
         timeleft -= 1;     
         }, 1000);
      }     
   };

   //this mousedown event is for clicking face of cube display the texture
   canvas.addEventListener("mousedown", function(event){
      audio = document.getElementById('cube_sound'); 
      if(audio.paused){                 
         audio.play();
      }
      //not reach to six image
      if(click_time<=6){ 
         if(check_click_start == true){
            gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            gl.uniform3fv(thetaLoc, theta);
            for(var i=0; i<6; i++) {
               gl.uniform1i(gl.getUniformLocation(program, "uColorIndex"), i+1);
               gl.drawArrays( gl.TRIANGLES, 6*i, 6 );
            }
            var x = event.clientX;
            var y = canvas.height-event.clientY;       
            gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, color);
            
            if(change_img == 1){
               show_img_dog();
            }else if(change_img == 2){
               show_img_panda();
            }else if(change_img == 3){
               show_img_cat();
            }      
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.uniform1i(gl.getUniformLocation(program, "uColorIndex"), 0);
            gl.clear( gl.COLOR_BUFFER_BIT );
            gl.drawArrays(gl.TRIANGLES, 0, numPositions);  
         }
      }    
      check_user_has_clicked_face = true;   
   });

   //this onclick event is for clearing all images that user picked
   document.getElementById("clearAll").onclick = function(){
      audio = document.getElementById('click_sound'); 
      if(audio.paused){                 
         audio.play();
      }
      click_time = 1;
      remove_user_picked();
   };

   //this onclick event is for clear last images that user picked
   document.getElementById("clearLast").onclick = function(){
      audio = document.getElementById('click_sound'); 
      if(audio.paused){                 
         audio.play();
      }
      if(check_user_has_clicked_face == true){
         click_time -= 1;
         if(last_picked_index == 1){
            document.getElementById("img1").src = "blank.png";
         }else if(last_picked_index == 2){
            document.getElementById("img2").src = "blank.png";
         }else if(last_picked_index == 3){
            document.getElementById("img3").src = "blank.png";
         }else if(last_picked_index == 4){
            document.getElementById("img4").src = "blank.png";
         }else if(last_picked_index == 5){
            document.getElementById("img5").src = "blank.png";
         }else if(last_picked_index == 6){
            document.getElementById("img6").src = "blank.png";
         }
         check_user_has_clicked_face = false;
      }   
   };

   //this onclick event is for checking whether user is win or not
   document.getElementById("submit").onclick = function(){
      click_time = 1;
      clearInterval(myTimer);
      check_click_start = false;
      hasStarted = true;
      document.getElementById("countdown").innerHTML = "";
      if(change_img == 1){
         if(check_user_picked_dog() == true){
            audio = document.getElementById('win_sound'); 
            if(audio.paused){                 
               audio.play();
            }
            alert("You win!");
         }else{
            audio = document.getElementById('fail_sound'); 
            if(audio.paused){                 
               audio.play();
            }
            alert("Sorry, you can do better next time!");
         }
      }else if(change_img == 2){
         if(check_user_picked_panda_cat() == true){
            audio = document.getElementById('win_sound'); 
            if(audio.paused){                 
               audio.play();
            }
            alert("You win!");
         }else{
            audio = document.getElementById('fail_sound'); 
            if(audio.paused){                 
               audio.play();
            }
            alert("Sorry, you can do better next time!");
         }          
      }else if(change_img == 3){
         if(check_user_picked_panda_cat() == true){
            audio = document.getElementById('win_sound'); 
            if(audio.paused){                 
               audio.play();
            }
            alert("You win!");
         }else{
            audio = document.getElementById('fail_sound'); 
            if(audio.paused){                 
               audio.play();
            }
            alert("Sorry, you can do better next time!");
         } 
      }
      //reset data
      gl.uniform1i(gl.getUniformLocation(program, "texture_face"), 1);
      remove_user_picked();
      img_position = [0,0,0,0,0,0];
      document.getElementById("gl-canvas").addEventListener('mousedown', md);
      document.getElementById("gl-canvas").addEventListener('mouseup', mu);
      document.getElementById("gl-canvas").addEventListener('mousemove', mm);
      flag = false;
      theta = vec3(0, 0, 0);
   };

   //this onclick event is for change the texture to dog
   document.getElementById("dog_img").onclick = function(){
      audio = document.getElementById('click_sound'); 
      if(audio.paused){                 
         audio.play();
      }
      if(check_click_start == false)
      {
         change_img = 1;
         document.getElementById("target").src = "dog1.jpg";
      }
   };

   //this onclick event is for change the texture to panda
   document.getElementById("panda_img").onclick = function(){
      audio = document.getElementById('click_sound'); 
      if(audio.paused){                 
         audio.play();
      }
      if(check_click_start == false)
      {
         change_img = 2;
         document.getElementById("target").src = "panda1.png";
      }
   };

   //this onclick event is for change the texture to cat
   document.getElementById("cat_img").onclick = function(){
      audio = document.getElementById('click_sound'); 
      if(audio.paused){                 
         audio.play();
      }
      if(check_click_start == false)
      {
         change_img = 3;
         document.getElementById("target").src = "cat1.jpg";
      }
   }; 
   draggingEvent();
   render();
};

//function for add mosedown, mouse up, mousemove event to the canavas
//let user can drag the object by mouse
function draggingEvent(){
   document.getElementById("gl-canvas").addEventListener('mousedown', md);
   document.getElementById("gl-canvas").addEventListener('mouseup', mu);
   document.getElementById("gl-canvas").addEventListener('mousemove', mm);
}

//function for get the current coordinate
function md(event){
   drag = 1;
   xRotate = event.clientX;
   yRotate = event.clientY;
}

//Mouse up then stop drag
function mu(event){
   drag = 0;
}

//function for set rotating parameters
function mm(ev){
   var x = ev.clientX, y = ev.clientY;
   if (drag==1) {
   var factor = 100/canvas.height; 
   var dx = factor * (x - lastX);
   var dy = factor * (y - lastY);
   // Limit x-axis rotation angle to -720 to 720 degrees
   theta[0] = Math.max(Math.min(theta[0] + dy, 720), -720);
   theta[1] = Math.max(Math.min(theta[1] + dx, 720), -720);
   }
   lastX = x, lastY = y;
}

//function for reset the user picked image to blank image
function remove_user_picked(){
      document.getElementById("img1").src = "blank.png";
      document.getElementById("img2").src = "blank.png";
      document.getElementById("img3").src = "blank.png";
      document.getElementById("img4").src = "blank.png";
      document.getElementById("img5").src = "blank.png";
      document.getElementById("img6").src = "blank.png";
}

//check whether user is win or lose (panda texture or cat texture)
function check_user_picked_panda_cat(){
   if(img_position[0] == 1 && img_position[1] == 2
      && img_position[2] == 3 && img_position[3] == 4
      && img_position[4] == 5 && img_position[5] == 6){
         return true;
   }
}

//check whether user is win or lose (dog texture)
function check_user_picked_dog(){
   if(img_position[0] == 4 && img_position[1] == 5
      && img_position[2] == 6 && img_position[3] == 2
      && img_position[4] == 3 && img_position[5] == 1){
         return true;
   }
}

//function for setting the texture
function configureTexture(){
   var image1 = document.getElementById("textureImage1");
   var image2 = document.getElementById("textureImage2");
   var image3 = document.getElementById("textureImage3");

   //first texture setting
   gl.activeTexture(gl.TEXTURE0);
   textureMap1 = gl.createTexture();
   gl.bindTexture(gl.TEXTURE_2D, textureMap1);
   gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image1);
   gl.generateMipmap(gl.TEXTURE_2D);       
   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

   //second texture setting
   gl.activeTexture(gl.TEXTURE1);
   textureMap2 = gl.createTexture();
   gl.bindTexture(gl.TEXTURE_2D, textureMap2);
   gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image2);
   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

   //third texture setting
   gl.activeTexture(gl.TEXTURE2);
   textureMap3 = gl.createTexture();
   gl.bindTexture(gl.TEXTURE_2D, textureMap3);
   gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image3);
   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);  
}

//render function
function render(){
   gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
   if(change_img == 1){
      gl.uniform1i(gl.getUniformLocation(program, "texture_img_index"), 0);
      gl.uniform1i(gl.getUniformLocation(program, "uTextureMap1"), 0);
   }else if(change_img == 2){
      gl.uniform1i(gl.getUniformLocation(program, "texture_img_index"), 1);
      gl.uniform1i(gl.getUniformLocation(program, "uTextureMap2"), 1);
   }else if(change_img == 3){
      gl.uniform1i(gl.getUniformLocation(program, "texture_img_index"), 2);
      gl.uniform1i(gl.getUniformLocation(program, "uTextureMap3"), 2);
   }

   //perspective projection
   fieldOfView = 45;
   aspect = canvas.width/canvas.height;
   zNear = 0.2;
   zFar = 200;
   projectionMatrix = perspective(fieldOfView, aspect, zNear, zFar);

   //set the model-view matrix
   cameraPosition = vec3(1, 2, 3.0);
   up = vec3(0.0, 1.0, 0.0);
   target = vec3(0.0, 0.0, 0.0);
   modelViewMatrix = lookAt(cameraPosition, target, up);

   if(flag){
      theta[axis] += 0.4;
   } 

   modelViewMatrix = mult(modelViewMatrix, rotate(theta[xAxis], vec3(1, 0, 0)));
   modelViewMatrix = mult(modelViewMatrix, rotate(theta[yAxis], vec3(0, 1, 0)));
   modelViewMatrix = mult(modelViewMatrix, rotate(theta[zAxis], vec3(0, 0, 1)));

   gl.uniformMatrix4fv( gl.getUniformLocation(program, "uModelViewMatrix"), false, flatten(modelViewMatrix));
   gl.uniformMatrix4fv( gl.getUniformLocation(program, "uProjectionMatrix"), false, flatten(projectionMatrix));
   gl.uniform1i(gl.getUniformLocation(program, "uColorIndex"),0);

   gl.drawArrays( gl.TRIANGLES, 0, numPositions );
   requestAnimationFrame(render);
}

//show the current user picked image (cat texture)
function show_img_cat(){
   if(color[0]==255){
      if(color[1]==255){
         if(click_time == 1){
            document.getElementById("img1").src="c6.png";
            last_picked_index = 1;
            img_position[0] = 6;
         }else if(click_time == 2){
            document.getElementById("img2").src="c6.png";
            last_picked_index = 2;
            img_position[1] = 6;
         }else if(click_time == 3){
            document.getElementById("img3").src="c6.png";
            last_picked_index = 3;
            img_position[2] = 6;
         }else if(click_time == 4){
            document.getElementById("img4").src="c6.png";
            last_picked_index = 4;
            img_position[3] = 6;
         }else if(click_time == 5){
            document.getElementById("img5").src="c6.png";
            last_picked_index = 5;
            img_position[4] = 6;
         }else if(click_time == 6){
            document.getElementById("img6").src="c6.png";
            last_picked_index = 6;
            img_position[5] = 6;
         }
         click_time++;   
      }else if(color[2]==255){
         if(click_time == 1){
            document.getElementById("img1").src="c5.png";
            last_picked_index = 1;
            img_position[0] = 5;
         }else if(click_time == 2){
            document.getElementById("img2").src="c5.png";
            last_picked_index = 2;
            img_position[1] = 5;
         }else if(click_time == 3){
            document.getElementById("img3").src="c5.png";
            last_picked_index = 3;
            img_position[2] = 5;
         }else if(click_time == 4){
            document.getElementById("img4").src="c5.png";
            last_picked_index = 4;
            img_position[3] = 5;
         }else if(click_time == 5){
            document.getElementById("img5").src="c5.png";
            last_picked_index = 5;
            img_position[4] = 5;
         }else if(click_time == 6){
            document.getElementById("img6").src="c5.png";
            last_picked_index = 6;
            img_position[5] = 5;
         }
         click_time++;               
      }else{
         if(click_time == 1){
            document.getElementById("img1").src="c1.png";
            last_picked_index = 1;
            img_position[0] = 1;
         }else if(click_time == 2){
            document.getElementById("img2").src="c1.png";
            last_picked_index = 2;
            img_position[1] = 1;
         }else if(click_time == 3){
            document.getElementById("img3").src="c1.png";
            last_picked_index = 3;
            img_position[2] = 1;
         }else if(click_time == 4){
            document.getElementById("img4").src="c1.png";
            last_picked_index = 4;
            img_position[3] = 1;
         }else if(click_time == 5){
            document.getElementById("img5").src="c1.png";
            last_picked_index = 5;
            img_position[4] = 1;
         }else if(click_time == 6){
            document.getElementById("img6").src="c1.png";
            last_picked_index = 6;
            img_position[5] = 1;
         }
         click_time++;
      } 
   }else if(color[1]==255){
      if(color[2]==255){
         if(click_time == 1){
            document.getElementById("img1").src="c2.png";
            last_picked_index = 1;
            img_position[0] = 2;
         }else if(click_time == 2){
            document.getElementById("img2").src="c2.png";
            last_picked_index = 2;
            img_position[1] = 2;
         }else if(click_time == 3){
            document.getElementById("img3").src="c2.png";
            last_picked_index = 3;
            img_position[2] = 2;
         }else if(click_time == 4){
            document.getElementById("img4").src="c2.png";
            last_picked_index = 4;
            img_position[3] = 2;
         }else if(click_time == 5){
            document.getElementById("img5").src="c2.png";
            last_picked_index = 5;
            img_position[4] = 2;
         }else if(click_time == 6){
            document.getElementById("img6").src="c2.png";
            last_picked_index = 6;
            img_position[5] = 2;
         }
         click_time++;
      }else{
         if(click_time == 1){
            document.getElementById("img1").src="c3.png";
            last_picked_index = 1;
            img_position[0] = 3;
         }else if(click_time == 2){
            document.getElementById("img2").src="c3.png";
            last_picked_index = 2;
            img_position[1] = 3;
         }else if(click_time == 3){
            document.getElementById("img3").src="c3.png";
            last_picked_index = 3;
            img_position[2] = 3;
         }else if(click_time == 4){
            document.getElementById("img4").src="c3.png";
            last_picked_index = 4;
            img_position[3] = 3;
         }else if(click_time == 5){
            document.getElementById("img5").src="c3.png";
            last_picked_index = 5;
            img_position[4] = 3;
         }else if(click_time == 6){
            document.getElementById("img6").src="c3.png";
            last_picked_index = 6;
            img_position[5] = 3;
         }
         click_time++;
      }
   }else if(color[2]==255){
      if(click_time == 1){
         document.getElementById("img1").src="c4.png";
         last_picked_index = 1;
         img_position[0] = 4;
      }else if(click_time == 2){
         document.getElementById("img2").src="c4.png";
         last_picked_index = 2;
         img_position[1] = 4;
      }else if(click_time == 3){
         document.getElementById("img3").src="c4.png";
         last_picked_index = 3;
         img_position[2] = 4;
      }else if(click_time == 4){
         document.getElementById("img4").src="c4.png";
         last_picked_index = 4;
         img_position[3] = 4;
      }else if(click_time == 5){
         document.getElementById("img5").src="c4.png";
         last_picked_index = 5;
         img_position[4] = 4;
      }else if(click_time == 6){
         document.getElementById("img6").src="c4.png";
         last_picked_index = 6;
         img_position[5] = 4;
      }
      click_time++;
   }
}

//show the current user picked image (panda texture)
function show_img_panda(){
   if(color[0]==255){
      if(color[1]==255){
         if(click_time == 1){
            document.getElementById("img1").src="p2.png";
            last_picked_index = 1;
            img_position[0] = 2;
         }else if(click_time == 2){
            document.getElementById("img2").src="p2.png";
            last_picked_index = 2;
            img_position[1] = 2;
         }else if(click_time == 3){
            document.getElementById("img3").src="p2.png";
            last_picked_index = 3;
            img_position[2] = 2;
         }else if(click_time == 4){
            document.getElementById("img4").src="p2.png";
            last_picked_index = 4;
            img_position[3] = 2;
         }else if(click_time == 5){
            document.getElementById("img5").src="p2.png";
            last_picked_index = 5;
            img_position[4] = 2;
         }else if(click_time == 6){
            document.getElementById("img6").src="p2.png";
            last_picked_index = 6;
            img_position[5] = 2;
         }
         click_time++;   
      }else if(color[2]==255){
         if(click_time == 1){
            document.getElementById("img1").src="p6.png";
            last_picked_index = 1;
            img_position[0] = 6;
         }else if(click_time == 2){
            document.getElementById("img2").src="p6.png";
            last_picked_index = 2;
            img_position[1] = 6;
         }else if(click_time == 3){
            document.getElementById("img3").src="p6.png";
            last_picked_index = 3;
            img_position[2] = 6;
         }else if(click_time == 4){
            document.getElementById("img4").src="p6.png";
            last_picked_index = 4;
            img_position[3] = 6;
         }else if(click_time == 5){
            document.getElementById("img5").src="p6.png";
            last_picked_index = 5;
            img_position[4] = 6;
         }else if(click_time == 6){
            document.getElementById("img6").src="p6.png";
            last_picked_index = 6;
            img_position[5] = 6;
         }
         click_time++;               
      }else{
         if(click_time == 1){
            document.getElementById("img1").src="p1.png";
            last_picked_index = 1;
            img_position[0] = 1;
         }else if(click_time == 2){
            document.getElementById("img2").src="p1.png";
            last_picked_index = 2;
            img_position[1] = 1;
         }else if(click_time == 3){
            document.getElementById("img3").src="p1.png";
            last_picked_index = 3;
            img_position[2] = 1;
         }else if(click_time == 4){
            document.getElementById("img4").src="p1.png";
            last_picked_index = 4;
            img_position[3] = 1;
         }else if(click_time == 5){
            document.getElementById("img5").src="p1.png";
            last_picked_index = 5;
            img_position[4] = 1;
         }else if(click_time == 6){
            document.getElementById("img6").src="p1.png";
            last_picked_index = 6;
            img_position[5] = 1;
         }
         click_time++;
      } 
   }else if(color[1]==255){
      if(color[2]==255){
         if(click_time == 1){
            document.getElementById("img1").src="p5.png";
            last_picked_index = 1;
            img_position[0] = 5;
         }else if(click_time == 2){
            document.getElementById("img2").src="p5.png";
            last_picked_index = 2;
            img_position[1] = 5;
         }else if(click_time == 3){
            document.getElementById("img3").src="p5.png";
            last_picked_index = 3;
            img_position[2] = 5;
         }else if(click_time == 4){
            document.getElementById("img4").src="p5.png";
            last_picked_index = 4;
            img_position[3] = 5;
         }else if(click_time == 5){
            document.getElementById("img5").src="p5.png";
            last_picked_index = 5;
            img_position[4] = 5;
         }else if(click_time == 6){
            document.getElementById("img6").src="p5.png";
            last_picked_index = 6;
            img_position[5] = 5;
         }
         click_time++;
      }else{
         if(click_time == 1){
            document.getElementById("img1").src="p3.png";
            last_picked_index = 1;
            img_position[0] = 3;
         }else if(click_time == 2){
            document.getElementById("img2").src="p3.png";
            last_picked_index = 2;
            img_position[1] = 3;
         }else if(click_time == 3){
            document.getElementById("img3").src="p3.png";
            last_picked_index = 3;
            img_position[2] = 3;
         }else if(click_time == 4){
            document.getElementById("img4").src="p3.png";
            last_picked_index = 4;
            img_position[3] = 3;
         }else if(click_time == 5){
            document.getElementById("img5").src="p3.png";
            last_picked_index = 5;
            img_position[4] = 3;
         }else if(click_time == 6){
            document.getElementById("img6").src="p3.png";
            last_picked_index = 6;
            img_position[5] = 3;
         }
         click_time++;
      }
   }else if(color[2]==255){
      if(click_time == 1){
         document.getElementById("img1").src="p4.png";
         last_picked_index = 1;
         img_position[0] = 4;
      }else if(click_time == 2){
         document.getElementById("img2").src="p4.png";
         last_picked_index = 2;
         img_position[1] = 4;
      }else if(click_time == 3){
         document.getElementById("img3").src="p4.png";
         last_picked_index = 3;
         img_position[2] = 4;
      }else if(click_time == 4){
         document.getElementById("img4").src="p4.png";
         last_picked_index = 4;
         img_position[3] = 4;
      }else if(click_time == 5){
         document.getElementById("img5").src="p4.png";
         last_picked_index = 5;
         img_position[4] = 4;
      }else if(click_time == 6){
         document.getElementById("img6").src="p4.png";
         last_picked_index = 6;
         img_position[5] = 4;
      }
      click_time++;
   }
}

//show the current user picked image (dog texture)
function show_img_dog(){
   if(color[0]==255){
      if(color[1]==255){
         if(click_time == 1){
            document.getElementById("img1").src="d2.png";
            last_picked_index = 1;
            img_position[0] = 2;
         }else if(click_time == 2){
            document.getElementById("img2").src="d2.png";
            last_picked_index = 2;
            img_position[1] = 2;
         }else if(click_time == 3){
            document.getElementById("img3").src="d2.png";
            last_picked_index = 3;
            img_position[2] = 2;
         }else if(click_time == 4){
            document.getElementById("img4").src="d2.png";
            last_picked_index = 4;
            img_position[3] = 2;
         }else if(click_time == 5){
            document.getElementById("img5").src="d2.png";
            last_picked_index = 5;
            img_position[4] = 2;
         }else if(click_time == 6){
            document.getElementById("img6").src="d2.png";
            last_picked_index = 6;
            img_position[5] = 2;
         }
         click_time++;   
      }else if(color[2]==255){
         if(click_time == 1){
            document.getElementById("img1").src="d4.png";
            last_picked_index = 1;
            img_position[0] = 4;
         }else if(click_time == 2){
            document.getElementById("img2").src="d4.png";
            last_picked_index = 2;
            img_position[1] = 4;
         }else if(click_time == 3){
            document.getElementById("img3").src="d4.png";
            last_picked_index = 3;
            img_position[2] = 4;
         }else if(click_time == 4){
            document.getElementById("img4").src="d4.png";
            last_picked_index = 4;
            img_position[3] = 4;
         }else if(click_time == 5){
            document.getElementById("img5").src="d4.png";
            last_picked_index = 5;
            img_position[4] = 4;
         }else if(click_time == 6){
            document.getElementById("img6").src="d4.png";
            last_picked_index = 6;
            img_position[5] = 4;
         }
         click_time++;               
      }else{
         if(click_time == 1){
            document.getElementById("img1").src="d1.png";
            last_picked_index = 1;
            img_position[0] = 1;
         }else if(click_time == 2){
            document.getElementById("img2").src="d1.png";
            last_picked_index = 2;
            img_position[1] = 1;
         }else if(click_time == 3){
            document.getElementById("img3").src="d1.png";
            last_picked_index = 3;
            img_position[2] = 1;
         }else if(click_time == 4){
            document.getElementById("img4").src="d1.png";
            last_picked_index = 4;
            img_position[3] = 1;
         }else if(click_time == 5){
            document.getElementById("img5").src="d1.png";
            last_picked_index = 5;
            img_position[4] = 1;
         }else if(click_time == 6){
            document.getElementById("img6").src="d1.png";
            last_picked_index = 6;
            img_position[5] = 1;
         }
         click_time++;
      } 
   }else if(color[1]==255){
      if(color[2]==255){
         if(click_time == 1){
            document.getElementById("img1").src="d3.png";
            last_picked_index = 1;
            img_position[0] = 3;
         }else if(click_time == 2){
            document.getElementById("img2").src="d3.png";
            last_picked_index = 2;
            img_position[1] = 3;
         }else if(click_time == 3){
            document.getElementById("img3").src="d3.png";
            last_picked_index = 3;
            img_position[2] = 3;
         }else if(click_time == 4){
            document.getElementById("img4").src="d3.png";
            last_picked_index = 4;
            img_position[3] = 3;
         }else if(click_time == 5){
            document.getElementById("img5").src="d3.png";
            last_picked_index = 5;
            img_position[4] = 3;
         }else if(click_time == 6){
            document.getElementById("img6").src="d3.png";
            last_picked_index = 6;
            img_position[5] = 3;
         }
         click_time++;
      }else{
         if(click_time == 1){
            document.getElementById("img1").src="d5.png";
            last_picked_index = 1;
            img_position[0] = 5;
         }else if(click_time == 2){
            document.getElementById("img2").src="d5.png";
            last_picked_index = 2;
            img_position[1] = 5;
         }else if(click_time == 3){
            document.getElementById("img3").src="d5.png";
            last_picked_index = 3;
            img_position[2] = 5;
         }else if(click_time == 4){
            document.getElementById("img4").src="d5.png";
            last_picked_index = 4;
            img_position[3] = 5;
         }else if(click_time == 5){
            document.getElementById("img5").src="d5.png";
            last_picked_index = 5;
            img_position[4] = 5;
         }else if(click_time == 6){
            document.getElementById("img6").src="d5.png";
            last_picked_index = 6;
            img_position[5] = 5;
         }
         click_time++;
      }
   }else if(color[2]==255){
      if(click_time == 1){
         document.getElementById("img1").src="d6.png";
         last_picked_index = 1;
         img_position[0] = 6;
      }else if(click_time == 2){
         document.getElementById("img2").src="d6.png";
         last_picked_index = 2;
         img_position[1] = 6;
      }else if(click_time == 3){
         document.getElementById("img3").src="d6.png";
         last_picked_index = 3;
         img_position[2] = 6;
      }else if(click_time == 4){
         document.getElementById("img4").src="d6.png";
         last_picked_index = 4;
         img_position[3] = 6;
      }else if(click_time == 5){
         document.getElementById("img5").src="d6.png";
         last_picked_index = 5;
         img_position[4] = 6;
      }else if(click_time == 6){
         document.getElementById("img6").src="d6.png";
         last_picked_index = 6;
         img_position[5] = 6;
      }
      click_time++;
   }
}
