export const list = [
  {
    id: 1,
    title: "箭头射击小游戏",
    code: `<!DOCTYPE html>
      <html lang="en" >
      <head>
      <meta charset="UTF-8">
      <title>箭头射击小游戏HTML5源码 - 站长素材</title>
      
      <style>
      *{margin:0;padding:0;}
      
      body {background:#000000;overflow:hidden;}
      
      canvas {background:#ecf0f1;}
      </style>
      
      </head>
      <body>
      
      <canvas id='canvas' width="80%" height="80%"></canvas>
      
      <script>
      "use strict"
          var stage = {
            w:1280,
            h:720
          }
      
          var _pexcanvas = document.getElementById("canvas");
          _pexcanvas.width = stage.w;
          _pexcanvas.height = stage.h;
          var ctx = _pexcanvas.getContext("2d");
      
      
      
      
          var pointer = {
            x:0,
            y:0
          }
      
          var scale = 1;
          var portrait = true;
          var loffset = 0;
          var toffset = 0;
          var mxpos = 0;
          var mypos = 0;
      
      
      // ------------------------------------------------------------------------------- Gamy
      function drawArrow(fromx, fromy, tox, toy,lw,hlen,color) {
        var dx = tox - fromx;
        var dy = toy - fromy;
        var angle = Math.atan2(dy, dx);
        ctx.fillStyle=color;
        ctx.strokeStyle=color;
        ctx.lineCap = "round";
        ctx.lineWidth = lw;
        ctx.beginPath();
        ctx.moveTo(fromx, fromy);
        ctx.lineTo(tox, toy);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(tox, toy);
        ctx.lineTo(tox - hlen * Math.cos(angle - Math.PI / 6), toy - hlen * Math.sin(angle - Math.PI / 6));
        ctx.lineTo(tox - hlen * Math.cos(angle)/2, toy - hlen * Math.sin(angle)/2);
        ctx.lineTo(tox - hlen * Math.cos(angle + Math.PI / 6), toy - hlen * Math.sin(angle + Math.PI / 6));
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
      }
      
      
      
      
      var colors = ['#1abc9c','#1abc9c','#3498db','#9b59b6','#34495e','#16a085','#27ae60','#2980b9','#8e44ad','#2c3e50','#f1c40f','#e67e22','#e74c3c','#95a5a6','#f39c12','#d35400','#c0392b','#bdc3c7','#7f8c8d'];
      
      
      ctx.clearRect(0,0,stage.w,stage.h);
      for (var i =0;i<200;i++) {
        var angle = Math.random()*Math.PI*2;
        var length = Math.random()*250+50;
        var myx=360+Math.sin(angle)*length;
        var myy=360-Math.cos(angle)*length;
        drawArrow(myx,myy,myx+length/6*Math.sin(angle),myy-length/6*Math.cos(angle),length/30,length/30,'#c0392b');
      }
      var explode = new Image();
      explode.src = canvas.toDataURL("image/png");
      
      ctx.clearRect(0,0,stage.w,stage.h);
      for (var i =0;i<200;i++) {
        var angle = Math.random()*Math.PI-Math.PI/2;
        var length = Math.random()*480+50;
        var myx=stage.w/2+Math.sin(angle)*length;
        var myy=stage.h-Math.cos(angle)*length;
        drawArrow(myx,myy,myx+length/6*Math.sin(angle),myy-length/6*Math.cos(angle),length/30,length/30,'#2c3e50');
      }
      var explodeb = new Image();
      explodeb.src = canvas.toDataURL("image/png");
      
      
      ctx.clearRect(0,0,stage.w,stage.h);
      ctx.fillStyle = "rgba(236,240,241,1)";
      ctx.fillRect(0,0,stage.w,stage.h);
      for (var i =0;i<200;i++) {
        var angle = Math.random()*Math.PI/Math.PI*180;
        var length = Math.random()*250+50;
        var myx=Math.random()*stage.w;
        var myy=Math.random()*stage.h;
        drawArrow(myx,myy,myx+length/6*Math.sin(angle),myy-length/6*Math.cos(angle),length/30,length/30,colors[Math.floor(Math.random()*colors.length)]);
      }
      
      ctx.fillStyle = "rgba(236,240,241,0.9)";
      ctx.fillRect(0,0,stage.w,stage.h);
      var back = new Image();
      back.src = canvas.toDataURL("image/png");
      
      var angle=0;
      var ai = true;
      var ait = 0;
      var btm=0;
      var bullets = [];
      
      function Bullet() {
        this.x=stage.w/2-Math.sin(angle)*150;
        this.y=stage.h-Math.cos(angle)*150;
        this.r=angle;
      }
      
      var enemies = [];
      function Enemy() {
        this.r = Math.random()*Math.PI/(2.5/2)-Math.PI/2.5;
        this.dis = Math.random()*1280+720;
        this.x=stage.w/2-Math.sin(this.r)*this.dis;
        this.y=stage.h-Math.cos(this.r)*this.dis;
      }
      for(var i=0;i<10;i++) {
        enemies.push(new Enemy());
        
        enemies[i].x += Math.sin(enemies[i].r)*300;
        enemies[i].y += Math.cos(enemies[i].r)*300;
      }
      
      
      
      var explosions = [];
      function Explosion(x,y,ty) {
        this.x=x;
        this.y=y;
        this.t=30;
        this.ty=ty;
      }
      
      var eturn = 0;
      var cold = [];
      function enginestep() {
      
        ctx.drawImage(back,0,0);
        if (!ai&&ait<Date.now()-3000) {
          ai = true;
        }
        btm++;
        if(btm>8){
          btm=0;
          bullets.push(new Bullet());
        }
        
        for (var i=0;i<bullets.length;i++) {
          bullets[i].x -= Math.sin(bullets[i].r)*20;
          bullets[i].y -= Math.cos(bullets[i].r)*20;
          drawArrow(bullets[i].x+Math.sin(bullets[i].r)*50,bullets[i].y+Math.cos(bullets[i].r)*50,bullets[i].x,bullets[i].y,8,8,'#2980b9');
          if(bullets[i].x<-100||bullets[i].x>stage.w+100){
            bullets.splice(i,1);
          }
          if(bullets[i].y<-100||bullets[i].y>stage.h+100){
            bullets.splice(i,1);
          }
          
        }
        
        
        for(var i=0;i<enemies.length;i++) {
          enemies[i].x += Math.sin(enemies[i].r)*3;
          enemies[i].y += Math.cos(enemies[i].r)*3;
          drawArrow(enemies[i].x-Math.sin(enemies[i].r)*100,enemies[i].y-Math.cos(enemies[i].r)*100,enemies[i].x,enemies[i].y,15,15,"#c0392b");
          if (enemies[i].y>stage.h) {
            enemies[i] = new Enemy();
            explosions.push(new Explosion(stage.w/2,stage.h,2));
              shake = true;
              shaket=0;
          }
          for (var b=0;b<bullets.length;b++) {
            var dx = enemies[i].x-bullets[b].x;
            var dy = enemies[i].y-bullets[b].y;
            var dis = dx*dx+dy*dy;
            if (dis<20*20) {
              explosions.push(new Explosion(enemies[i].x,enemies[i].y,1));
              enemies[i] = new Enemy();
              bullets.splice(b,1);
            }
          }
        }
        
        if (ai) {
          for(var l=0;l<enemies.length;l++) {
            var dx = enemies[l].x-stage.w/2;
            var dy = enemies[l].y-stage.h;
            var dis = Math.floor(Math.sqrt(dx*dx+dy*dy));
            var val1 = 100000+dis;
            var val2 = 1000+l;
            cold[l]=val1+'x'+val2;
          }
      
      
      
          cold.sort();
          eturn = parseInt(cold[0].slice(8,11));
          if (parseInt(cold[0].slice(1,6))<800) {
            angle += (enemies[eturn].r-angle)/8;
          }
        } else {
      
          var dx = pointer.x-stage.w/2;
          var dy = pointer.y-stage.h;
          angle = Math.atan(dx/dy);
        }
        
        drawArrow(stage.w/2,stage.h,stage.w/2-Math.sin(angle)*150,stage.h-Math.cos(angle)*150,30,20,'#2c3e50');
      
      
      
        for(var e=0;e<explosions.length;e++) {
          
          if (explosions[e].ty==1) {
            var myimg = explode;
            ctx.globalAlpha=1-(explosions[e].t/stage.h);
            ctx.drawImage(myimg,explosions[e].x-explosions[e].t/2,explosions[e].y-explosions[e].t/2,explosions[e].t*stage.w/stage.h,explosions[e].t);
            ctx.globalAlpha=1;
          } else {
            var myimg = explodeb;
            ctx.globalAlpha=1-(explosions[e].t/stage.h);
            ctx.drawImage(myimg,explosions[e].x-explosions[e].t*stage.w/stage.h/2,stage.h-explosions[e].t,explosions[e].t*stage.w/stage.h,explosions[e].t);
            ctx.globalAlpha=1;
          }
      
        }
      
      
        for(var e=0;e<explosions.length;e++) {
          explosions[e].t += 20;
          if (explosions[e].t>stage.h) {
            explosions.splice(e,1);
          }
        }
      }
      
      
      // ------------------------------------------------------------------------------- events
      // ------------------------------------------------------------------------------- events
      // ------------------------------------------------------------------------------- events
      // ------------------------------------------------------------------------------- events
      
      function toggleFullScreen() {
        var doc = window.document;
        var docEl = doc.documentElement;
      
        var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
      
        if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
          requestFullScreen.call(docEl);
      
        }
        else {
          cancelFullScreen.call(doc);
      
        }
      }
      
      
      function motchstart(e) {
        mxpos = (e.pageX-loffset)*scale;
        mypos = (e.pageY-toffset)*scale;
      
      
      
      
      }
      
      function motchmove(e) {
        mxpos = (e.pageX-loffset)*scale;
        mypos = (e.pageY-toffset)*scale;
        pointer.x = mxpos;
        pointer.y = mypos;
        ai = false;
        ait = Date.now();
      }
      
      function motchend(e) {
      
      }
      
      
      
      
      
      
      window.addEventListener('mousedown', function(e) {
        motchstart(e);
      }, false);
      window.addEventListener('mousemove', function(e) {
        motchmove(e);
      }, false);
      window.addEventListener('mouseup', function(e) {
        motchend(e);
      }, false);
      window.addEventListener('touchstart', function(e) {
        e.preventDefault();
        motchstart(e.touches[0]);
      }, false);
      window.addEventListener('touchmove', function(e) {
        e.preventDefault();
        motchmove(e.touches[0]);
      }, false);
      window.addEventListener('touchend', function(e) {
        e.preventDefault();
        motchend(e.touches[0]);
      }, false);
      
      
      
      // ------------------------------------------------------------------------ stager
      // ------------------------------------------------------------------------ stager
      // ------------------------------------------------------------------------ stager
      // ------------------------------------------------------------------------ stager
      function _pexresize() {
        var cw = window.innerWidth;
        var ch = window.innerHeight;
        if (cw<=ch*stage.w/stage.h) {
          portrait = true;
          scale = stage.w/cw;
          loffset = 0;
          toffset = Math.floor(ch-(cw*stage.h/stage.w))/2;
          _pexcanvas.style.width = cw + "px";
          _pexcanvas.style.height = Math.floor(cw*stage.h/stage.w) + "px";
          _pexcanvas.style.marginLeft = loffset +"px";
          _pexcanvas.style.marginTop = toffset +"px";
        } else {
          scale = stage.h/ch;
          portrait = false;
          loffset = Math.floor(cw-(ch*stage.w/stage.h))/2;
          toffset = 0;
          _pexcanvas.style.height = ch + "px";
          _pexcanvas.style.width = Math.floor(ch*stage.w/stage.h) + "px";
          _pexcanvas.style.marginLeft = loffset +"px";
          _pexcanvas.style.marginTop = toffset +"px";
        }
      }
      
      
      window.requestAnimFrame = (function(){
        return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function( callback ){
          window.setTimeout(callback, 1000 / 60);
        };})();
      
      
      
        function sfps(iny) {
          return(Math.floor(smoothfps)/60*iny);
        }
      
      
      
        var timebomb=0;
        var lastCalledTime;
        var fpcount = 0;
        var fpall = 0;
        var smoothfps = 60;
        var thisfps = 60;
        function fpscounter() {
          timebomb ++;
          if (!lastCalledTime) {
            lastCalledTime = Date.now();
            return;
          }
          var delta = (Date.now()-lastCalledTime)/1000;
          lastCalledTime = Date.now();
          var fps = 1/delta;
          fpcount ++;
          fpall += fps;
          if (timebomb>30) {
            thisfps = parseInt(fpall/fpcount*10)/10;
            fpcount = 0;
            fpall = 0;
            timebomb = 0;
          }
        }
      
        var shake = false;
        var shaket = 0;
        function animated() {
          requestAnimFrame(animated);
          if (shake) {
            var trax = Math.random()*60-30;
            var tray = Math.random()*60-30;
            ctx.translate(trax,tray);
          }
          // fpscounter();
          //ctx.clearRect(0,0,_pexcanvas.width,_pexcanvas.height);
          enginestep()
          // ctx.fillStyle='#8e44ad';
          // ctx.font = "24px arial";
      
          // ctx.textAlign = "left"; 
          // ctx.fillText(thisfps,20,50);
          // smoothfps += (thisfps-smoothfps)/100;
          // ctx.fillText(cold[0].slice(1,6),20,80);
         //  ctx.beginPath();
         //  ctx.arc(pointer.x, pointer.y, 50, 0, Math.PI*2,false);
         // ctx.closePath();
         // ctx.fill();
         if (shake) {
           ctx.translate(-trax,-tray);
           shaket ++;
           if (shaket>20) {
             shaket=0;
             shake=false;
           }
         }
      }
      
      _pexresize();
      animated();
      </script>
      
      </body>
      </html>`,
  },
  {
    id: 2,
    title: "3D彩色纸片",
    code: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
          <style>
            * {
              box-sizing: border-box;
              margin: 0;
              padding: 0;
            }
            html,
            body {
              height: 100%;
            }
            body {
              display: grid;
              place-items: center;
              background-color: black;
              overflow: hidden;
            }
            .container {
              perspective: 1000px;
            }
            .inner {
              --x-deg: -45deg;
              --y-deg: 3deg;
              transform-style: preserve-3d;
              position: relative;
              display: grid;
              place-items: center;
              transform: rotateX(var(--x-deg)) rotateY(var(--y-deg));
            }
            .element {
              width: 200px;
              height: 150px;
              background-color: hsl(40, 80%, 50%);
              position: absolute;
              box-shadow: inset 0 0 50px hsl(0, 0%, 0%);
              transform-origin: center;
              transition: 350ms ease;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="inner">
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
              <div class="element"></div>
            </div>
          </div>
        </body>
        <script>
          console.clear();
          const elements = document.querySelectorAll(".element");
          const inner = document.querySelector(".inner");
      
          let deg = 0;
          let col = 0;
          elements.forEach((element, index) => {
            element.style.transform = "rotateY("+deg+"deg) translateX(220px)";
      
            element.style.backgroundColor = "hsl("+deg+", 70%, 50%)";
            deg += 5;
          });
      
          onmousemove = (e) => {
            let midPoint = window.innerWidth / 2;
            let midTopPoint = window.innerHeight / 2;
      
            inner.style.transform = "rotateY("+
              (e.clientX / midPoint - 1) * 50
            +"deg) rotateX("+(e.clientY / midTopPoint - 1) * 50+"deg)";
          };
        </script>
      </html>
      `,
  },
  {
    id: 3,
    title: "会动的大嘴鸟",
    code: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
          <style>
            /* 大嘴鸟*/
            .dong {
              z-index: 9999;
              position: fixed;
              top: -40px;
              right: -80px;
              transform: scale(0.24);
              -webkit-transform: scale(0.24);
              -moz-transform: scale(0.24);
            }
            .monster {
              transform: rotate(-50deg);
              -ms-transform: rotate(-50deg);
              /* IE 9 */
              -moz-transform: rotate(-50deg);
              /* Firefox */
              -webkit-transform: rotate(-50deg);
              /* Safari 和 Chrome */
              -o-transform: rotate(-50deg);
              /* Opera */
              display: flex;
              justify-content: center;
              position: relative;
              width: 170px;
              height: 400px;
              border-top-left-radius: 200px;
              border-top-right-radius: 200px;
              background-color: #3c47d7;
              box-shadow: 20px 20px 60px #4650e5;
            }
            .monster__face {
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              position: absolute;
              top: 14%;
              width: 75%;
              height: 160px;
            }
            .monster__noses {
              top: 50%;
              display: flex;
              justify-content: space-between;
              width: 28%;
              height: auto;
              margin-bottom: 10px;
            }
            .monster__nose {
              width: 8px;
              height: 12px;
              border-radius: 20px;
              background: rgba(0, 0, 0, 0.5);
              box-shadow: 4px 8px 5px rgba(0, 0, 0, 0.1);
            }
            .monster__mouth {
              display: flex;
              justify-content: center;
              align-items: center;
              position: relative;
              width: 100%;
              height: 0%;
              overflow: hidden;
              border: 25px solid #ffc333;
              border-radius: 100px;
              background-color: #810332;
              animation: mouth 1.75s infinite;
              box-shadow: 4px 8px 5px rgba(0, 0, 0, 0.2);
              box-sizing: border-box;
            }
            .monster__mouth::before {
              content: "";
              position: absolute;
              width: 150px;
              height: 80px;
              border-radius: 100px;
              background-color: #400018;
            }
            .monster__mouth::after {
              content: "";
              position: absolute;
              bottom: -80px;
              width: 160px;
              height: 80px;
              border-top-left-radius: 50%;
              border-top-right-radius: 50%;
              background-color: #dc1b50;
              animation: tongue 1.75s infinite;
            }
            .monster__top {
              position: absolute;
              top: -30px;
              width: 170px;
              height: 30px;
              border-bottom-left-radius: 10px;
              border-bottom-right-radius: 10px;
              background-color: #ffffff;
              z-index: 100;
              animation: t 1.75s infinite;
            }
            .monster__bottom {
              position: absolute;
              bottom: 0;
              width: 100px;
              height: 30px;
              border-top-left-radius: 10px;
              border-top-right-radius: 10px;
              background-color: #ffffff;
              z-index: 100;
              animation: b 1.75s infinite;
            }
            .avatar-eye {
              position: absolute;
              top: -10%;
              width: 65px;
              height: 65px;
              background: linear-gradient(105deg, white, #cb87f4);
              border-radius: 100%;
              box-shadow: 4px 8px 5px rgba(0, 0, 0, 0.2);
              margin: 3px;
              -webkit-transform: translateX(-50%);
              transform: translateX(-50%);
            }
            .avatar-eye--green {
              background: linear-gradient(to bottom, #fdfdfd, #c3efea);
            }
            .avatar-eye--violet {
              background: linear-gradient(to bottom, #fdfdfd, #e6d6f6);
            }
            .eye--left {
              left: 10%;
            }
            .eye--right {
              left: 85%;
            }
            .eye--center {
              left: 45%;
              top: 10%;
            }
            .avatar-eye-pupil {
              position: absolute;
              width: 55%;
              height: 55%;
              left: 50%;
              top: 25%;
              -webkit-transform: translate(-50%);
              transform: translate(-50%);
              z-index: 100;
              border-radius: 100%;
            }
            .pupil--green {
              background: linear-gradient(
                135deg,
                rgba(188, 248, 177, 0.7),
                #2fa38c 75%
              );
            }
            .pupil--pink {
              background: linear-gradient(135deg, #f1a183, #8535cd);
            }
            .avatar-eye-pupil-blackThing {
              position: absolute;
              width: 55%;
              height: 55%;
              left: 50%;
              top: 25%;
              background: #2c2f32;
              -webkit-transform: translate(-50%);
              transform: translate(-50%);
              border-radius: 100%;
              box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
            }
            .avatar-eye-pupil-lightReflection {
              position: absolute;
              width: 7px;
              height: 7px;
              left: 25%;
              top: 10%;
              background: #ebebeb;
              -webkit-transform: translate(-50%);
              transform: translate(-50%);
              border-radius: 100%;
              box-shadow: 10px 10px 10px rgba(255, 255, 255, 0.2);
            }
            /*大嘴动起来*/
            @keyframes t {
              0%,
              10%,
              80%,
              100% {
                top: -30px;
              }
              20% {
                top: 0px;
              }
              30% {
                top: -20px;
              }
              40% {
                top: -0px;
              }
              50% {
                top: -25px;
              }
              70% {
                top: 0px;
              }
            }
            @keyframes b {
              0%,
              10%,
              80%,
              100% {
                bottom: -30px;
              }
              20% {
                bottom: 0px;
              }
              30% {
                bottom: -20px;
              }
              40% {
                bottom: -0px;
              }
              50% {
                bottom: -25px;
              }
              70% {
                bottom: 0px;
              }
            }
            @keyframes mouth {
              0%,
              10%,
              100% {
                width: 100%;
                height: 0%;
              }
              15% {
                width: 90%;
                height: 30%;
              }
              20% {
                width: 50%;
                height: 70%;
              }
              25% {
                width: 70%;
                height: 70%;
              }
              30% {
                width: 80%;
                height: 60%;
              }
              35% {
                width: 60%;
                height: 70%;
              }
              40% {
                width: 55%;
                height: 75%;
              }
              45% {
                width: 50%;
                height: 90%;
              }
              50% {
                width: 40%;
                height: 70%;
              }
              55% {
                width: 70%;
                height: 95%;
              }
              60% {
                width: 40%;
                height: 50%;
              }
              65% {
                width: 100%;
                height: 60%;
              }
              70% {
                width: 100%;
                height: 70%;
              }
              75% {
                width: 90%;
                height: 70%;
              }
              80% {
                width: 50%;
                height: 70%;
              }
              85% {
                width: 90%;
                height: 50%;
              }
              85% {
                width: 40%;
                height: 70%;
              }
              90% {
                width: 90%;
                height: 30%;
              }
              95% {
                width: 100%;
                height: 10%;
              }
            }
            @keyframes tongue {
              0%,
              20%,
              100% {
                bottom: -80px;
              }
              30%,
              90% {
                bottom: -40px;
              }
              40% {
                bottom: -45px;
              }
              50% {
                bottom: -50px;
              }
              70% {
                bottom: -80px;
              }
              90% {
                bottom: -40px;
              }
            }
          </style>
        </head>
        <body>
          <div class="dong">
            <div class="monster">
              <div class="monster__face">
                <div class="monster__eye avatar-eye avatar-eye--green eye--left">
                  <div class="avatar-eye-pupil pupil--green">
                    <span class="avatar-eye-pupil-blackThing"
                      ><span class="avatar-eye-pupil-lightReflection"></span
                    ></span>
                  </div>
                </div>
                <div class="monster__eye avatar-eye avatar-eye--violet eye--right">
                  <div class="avatar-eye-pupil pupil--pink">
                    <span class="avatar-eye-pupil-blackThing"
                      ><span class="avatar-eye-pupil-lightReflection"></span
                    ></span>
                  </div>
                </div>
                <div class="monster__noses">
                  <div class="monster__nose"></div>
                  <div class="monster__nose"></div>
                </div>
                <div class="monster__mouth">
                  <div class="monster__top"></div>
                  <div class="monster__bottom"></div>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
      `,
  },
  {
    id: 4,
    title: "有趣的文字跳动",
    code: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
          <style>
            * {
              box-sizing: border-box;
            }
            body {
              --hue: 60;
              font-family: Montserrat, sans-serif;
              margin: 0;
              padding: 1rem;
              min-height: 100vh;
              display: grid;
              place-items: center;
              background: hsl(var(--hue) 100% 75%);
            }
            h1 {
              margin: 0;
              font-size: clamp(2rem, 3vw, 5rem);
              display: flex;
            }
            span {
              --stagger: -200ms;
              --delay: calc(var(--i) * var(--stagger, 200ms));
            }
            span > span {
              display: block;
              animation: bounce 2000ms var(--delay, 0ms) infinite;
              transform-origin: center bottom;
              z-index: 1;
            }
            span:not(span > span)::after {
              content: "";
              display: block;
              width: 100%;
              aspect-ratio: 1;
              background: hsl(var(--hue) 50% 45% / 0.1);
              transform: translate3d(0, 3.8em, 0) scaleY(0.3) scaleX(0.8);
              transform-origin: center top;
              border-radius: 100%;
              filter: blur(0.08em);
              animation: shadow 2000ms var(--delay, 0ms) infinite;
            }
            @keyframes bounce {
              0% {
                transform: translate3d(0, 0, 0) rotateY(0deg) scaleY(1);
                animation-timing-function: ease-in;
              }
              45% {
                transform: translate3d(0, 4em, 0) rotateY(180deg) scaleY(1);
                animation-timing-function: ease-in;
              }
              50% {
                transform: translate3d(0, 4em, 0) rotateY(180deg) scaleY(0.2);
                animation-timing-function: ease-out, ease-out, linear;
              }
              100% {
                transform: translate3d(0, 0, 0) rotateY(0) scaleY(1);
                animation-timing-function: ease-out;
              }
            }
            @keyframes shadow {
              0% {
                transform: translate3d(0, 3.8em, 0) scale3d(1.5, 0.3, 1);
                opacity: 0;
                animation-timing-function: ease-in;
              }
              45% {
                transform: translate3d(0, 3.8em, 0) scale3d(0.8, 0.2, 1);
                opacity: 1;
                animation-timing-function: ease-in;
              }
              50% {
                transform: translate3d(0, 3.8em, 0) scale3d(0.8, 0.2, 1);
                opacity: 1;
                animation-timing-function: linear;
              }
              100% {
                transform: translate3d(0, 3.8em, 0) scale3d(1.5, 0.3, 1);
                opacity: 0;
                animation-timing-function: ease-out;
              }
            }
          </style>
        </head>
        <body>
          <h1 aria-label="bouncing">
            <span style="--i: 0" aria-hidden="true"><span>T</span></span>
            <span style="--i: 1" aria-hidden="true"><span>W</span></span>
            <span style="--i: 2" aria-hidden="true"><span>K</span></span>
            <span style="--i: 3" aria-hidden="true"
              ><span style="color: red">💖 </span></span
            >
            <span style="--i: 3" aria-hidden="true"
              ><span style="color: red">💖 </span></span
            >
            <span style="--i: 0" aria-hidden="true"><span>L</span></span>
            <span style="--i: 1" aria-hidden="true"><span>J</span></span>
            <span style="--i: 2" aria-hidden="true"><span>R</span></span>
          </h1>
        </body>
        <script>
          function clickEffect() {
            let balls = [];
            let longPressed = false;
            let longPress;
            let multiplier = 0;
            let width, height;
            let origin;
            let normal;
            let ctx;
            const colours = ["#F73859", "#14FFEC", "#00E0FF", "#FF99FE", "#FAF15D"];
            const canvas = document.createElement("canvas");
            document.body.appendChild(canvas);
            canvas.setAttribute(
              "style",
              "width: 100%; height: 100%; top: 0; left: 0; z-index: 99999; position: fixed; pointer-events: none;"
            );
            const pointer = document.createElement("span");
            pointer.classList.add("pointer");
            document.body.appendChild(pointer);
      
            if (canvas.getContext && window.addEventListener) {
              ctx = canvas.getContext("2d");
              updateSize();
              window.addEventListener("resize", updateSize, false);
              loop();
              window.addEventListener(
                "mousedown",
                function (e) {
                  pushBalls(randBetween(10, 20), e.clientX, e.clientY);
                  document.body.classList.add("is-pressed");
                  longPress = setTimeout(function () {
                    document.body.classList.add("is-longpress");
                    longPressed = true;
                  }, 500);
                },
                false
              );
              window.addEventListener(
                "mouseup",
                function (e) {
                  clearInterval(longPress);
                  if (longPressed == true) {
                    document.body.classList.remove("is-longpress");
                    pushBalls(
                      randBetween(
                        50 + Math.ceil(multiplier),
                        100 + Math.ceil(multiplier)
                      ),
                      e.clientX,
                      e.clientY
                    );
                    longPressed = false;
                  }
                  document.body.classList.remove("is-pressed");
                },
                false
              );
              window.addEventListener(
                "mousemove",
                function (e) {
                  let x = e.clientX;
                  let y = e.clientY;
                  pointer.style.top = y + "px";
                  pointer.style.left = x + "px";
                },
                false
              );
            } else {
              console.log("canvas or addEventListener is unsupported!");
            }
      
            function updateSize() {
              canvas.width = window.innerWidth * 2;
              canvas.height = window.innerHeight * 2;
              canvas.style.width = window.innerWidth + "px";
              canvas.style.height = window.innerHeight + "px";
              ctx.scale(2, 2);
              width = canvas.width = window.innerWidth;
              height = canvas.height = window.innerHeight;
              origin = {
                x: width / 2,
                y: height / 2,
              };
              normal = {
                x: width / 2,
                y: height / 2,
              };
            }
            class Ball {
              constructor(x = origin.x, y = origin.y) {
                this.x = x;
                this.y = y;
                this.angle = Math.PI * 2 * Math.random();
                if (longPressed == true) {
                  this.multiplier = randBetween(14 + multiplier, 15 + multiplier);
                } else {
                  this.multiplier = randBetween(6, 12);
                }
                this.vx =
                  (this.multiplier + Math.random() * 0.5) * Math.cos(this.angle);
                this.vy =
                  (this.multiplier + Math.random() * 0.5) * Math.sin(this.angle);
                this.r = randBetween(8, 12) + 3 * Math.random();
                this.color = colours[Math.floor(Math.random() * colours.length)];
              }
              update() {
                this.x += this.vx - normal.x;
                this.y += this.vy - normal.y;
                normal.x = (-2 / window.innerWidth) * Math.sin(this.angle);
                normal.y = (-2 / window.innerHeight) * Math.cos(this.angle);
                this.r -= 0.3;
                this.vx *= 0.9;
                this.vy *= 0.9;
              }
            }
      
            function pushBalls(count = 1, x = origin.x, y = origin.y) {
              for (let i = 0; i < count; i++) {
                balls.push(new Ball(x, y));
              }
            }
      
            function randBetween(min, max) {
              return Math.floor(Math.random() * max) + min;
            }
      
            function loop() {
              ctx.fillStyle = "rgba(255, 255, 255, 0)";
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              for (let i = 0; i < balls.length; i++) {
                let b = balls[i];
                if (b.r < 0) continue;
                ctx.fillStyle = b.color;
                ctx.beginPath();
                ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2, false);
                ctx.fill();
                b.update();
              }
              if (longPressed == true) {
                multiplier += 0.2;
              } else if (!longPressed && multiplier >= 0) {
                multiplier -= 0.4;
              }
              removeBall();
              requestAnimationFrame(loop);
            }
      
            function removeBall() {
              for (let i = 0; i < balls.length; i++) {
                let b = balls[i];
                if (
                  b.x + b.r < 0 ||
                  b.x - b.r > width ||
                  b.y + b.r < 0 ||
                  b.y - b.r > height ||
                  b.r < 0
                ) {
                  balls.splice(i, 1);
                }
              }
            }
          }
          clickEffect(); //调用
        </script>
      </html>
      `,
  },
  {
    id: 5,
    title: "圣诞老人过悬崖小游戏",
    code: `<!DOCTYPE html>
      <html lang="en" >
      <head>
      <meta charset="UTF-8">
      <title>HTML5圣诞老人过悬崖游戏</title>
      <style>
      html,
      body {
        height: 100%;
        margin: 0;
      }

      body {
        font-family: Arial, Verdana, sans-serif;
        cursor: grab;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        background-color: #1e1a33;
      }

      div,
      i {
        user-select: none;
        pointer-events: none;
      }

      i {
        position: fixed;
        color: white;
        top: -10%;
        z-index: 9999;
        animation-name: snowflakes-fall, snowflakes-shake;
        animation-duration: 10s, 3s;
        animation-timing-function: linear, ease-in-out;
        animation-iteration-count: infinite, infinite;
        animation-play-state: running, running;
      }

      @keyframes snowflakes-fall {
        0% {
          top: -10%;
        }
        100% {
          top: 100%;
        }
      }

      @keyframes snowflakes-shake {
        0% {
          transform: translateX(0px);
        }
        50% {
          transform: translateX(80px);
        }
        100% {
          transform: translateX(0px);
        }
      }
      </style>
      </head>
      <body>
      <script>
        let status = "waiting";
        let lastTimestamp;
        let santaX;
        let santaY;
        let sceneOffset;
        let score = 0;
        let platforms = [];
        let sticks = [];
        let trees = [];
        let clouds = [];
        
        const config = {
          canvasWidth: 375,
          canvasHeight: 375,
          platformHeight: 100,
          santaDistanceFromEdge: 10,
          paddingX: 100,
          perfectAreaSize: 10,
          backgroundSpeedMultiplier: 0.2,
          speed: 4,
          santaWidth: 17,
          santaHeight: 30
        };
        
        const colours = {
          lightBg: "#62AFB9",
          medBg: "#182757",
          darkBg: "#0D5B66",
          lightHill: "#E9E9E9",
          medHill: "#34A65F",
          darkHill: "#07133A",
          platform: "#9B4546",
          platformTop: "#620E0E",
          em: "#CC231E",
          skin: "#CF6D60"
        };
        
        const hills = [
          {
            baseHeight: 120,
            amplitude: 20,
            stretch: 0.5,
            colour: colours.lightHill
          },
          {
            baseHeight: 100,
            amplitude: 10,
            stretch: 1,
            colour: colours.medHill
          },
          {
            baseHeight: 70,
            amplitude: 20,
            stretch: 0.5,
            colour: colours.darkHill
          }
        ];
        
        const scoreElement = createElementStyle(
          "div",
          "position:absolute;top:1.5em;font-size:5em;font-weight:900;text-shadow:"+addShadow(
            colours.darkHill,
            7
          )
        );
        const canvas = createElementStyle("canvas");
        const introductionElement = createElementStyle(
          "div",
          "font-size:1.2em;position:absolute;text-align:center;transition:opacity 2s;width:250px",
          "Press and hold anywhere to stretch out a sugar cane, it has to be the exact length or Santa will fall down"
        );
        const perfectElement = createElementStyle(
          "div",
          "position:absolute;opacity:0;transition:opacity 2s",
          "Double Score"
        );
        const restartButton = createElementStyle(
          "button",
          "width:120px;height:120px;position:absolute;border-radius:50%;color:white;background-color:"+colours.em+";border:none;font-weight:700;font-size:1.2em;display:none;cursor:pointer",
          "RESTART"
        );
        
        for (let i = 0; i <= 30; i++) {
          createElementStyle(
            "i",
            "font-size: "+3 * Math.random()+"em;left: "+
              100 * Math.random()
            +"%; animation-delay: "+10 * Math.random()+"s, "+2 * Math.random()+"s",
            "."
          );
        }
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const ctx = canvas.getContext("2d");
        
        Array.prototype.last = function () {
          return this[this.length - 1];
        };
        
        Math.sinus = function (degree) {
          return Math.sin((degree / 180) * Math.PI);
        };
        
        window.addEventListener("keydown", function (event) {
          if (event.key == " ") {
            event.preventDefault();
            resetGame();
            return;
          }
        });
        
        ["mousedown", "touchstart"].forEach(function (evt) {
          window.addEventListener(evt, function (event) {
            if (status == "waiting") {
              lastTimestamp = undefined;
              introductionElement.style.opacity = 0;
              status = "stretching";
              window.requestAnimationFrame(animate);
            }
          });
        });
        
        ["mouseup", "touchend"].forEach(function (evt) {
          window.addEventListener(evt, function (event) {
            if (status == "stretching") {
              status = "turning";
            }
          });
        });
        
        window.addEventListener("resize", function (event) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          draw();
        });
        
        restartButton.addEventListener("click", function (event) {
          event.preventDefault();
          resetGame();
          restartButton.style.display = "none";
        });
        
        window.requestAnimationFrame(animate);
        
        resetGame();
        
        function resetGame() {
          status = "waiting";
          lastTimestamp = undefined;
          sceneOffset = 0;
          score = 0;
          introductionElement.style.opacity = 1;
          perfectElement.style.opacity = 0;
          restartButton.style.display = "none";
          scoreElement.innerText = score;
          platforms = [{ x: 50, w: 50 }];
          santaX = platforms[0].x + platforms[0].w - config.santaDistanceFromEdge;
          santaY = 0;
          sticks = [{ x: platforms[0].x + platforms[0].w, length: 0, rotation: 0 }];
          trees = [];
          clouds = [];
        
          for (let i = 0; i <= 20; i++) {
            if (i <= 3) generatePlatform();
            generateTree();
            generateCloud();
          }
        
          draw();
        }
        
        function generateCloud() {
          const minimumGap = 60;
          const maximumGap = 300;
        
          const lastCloud = clouds[clouds.length - 1];
          let furthestX = lastCloud ? lastCloud.x : 0;
        
          const x =
            furthestX +
            minimumGap +
            Math.floor(Math.random() * (maximumGap - minimumGap));
        
          const y =
            minimumGap +
            Math.floor(Math.random() * (maximumGap - minimumGap)) -
            window.innerHeight / 1.2;
        
          const w = Math.floor(Math.random() * 15 + 15);
          clouds.push({ x, y, w });
        }
        
        function generateTree() {
          const minimumGap = 30;
          const maximumGap = 150;
        
          const lastTree = trees[trees.length - 1];
          let furthestX = lastTree ? lastTree.x : 0;
        
          const x =
            furthestX +
            minimumGap +
            Math.floor(Math.random() * (maximumGap - minimumGap));
        
          const treeColors = [colours.lightHill, colours.medBg, colours.medHill];
          const color = treeColors[Math.floor(Math.random() * 3)];
        
          trees.push({ x, color });
        }
        
        function generatePlatform() {
          const minimumGap = 40;
          const maximumGap = 200;
          const minimumWidth = 20;
          const maximumWidth = 100;
        
          const lastPlatform = platforms[platforms.length - 1];
          let furthestX = lastPlatform.x + lastPlatform.w;
        
          const x =
            furthestX +
            minimumGap +
            Math.floor(Math.random() * (maximumGap - minimumGap));
          const w =
            minimumWidth + Math.floor(Math.random() * (maximumWidth - minimumWidth));
        
          platforms.push({ x, w });
        }
        
        function animate(timestamp) {
          if (!lastTimestamp) {
            lastTimestamp = timestamp;
            window.requestAnimationFrame(animate);
            return;
          }
        
          switch (status) {
            case "waiting":
              return;
            case "stretching": {
              sticks.last().length += (timestamp - lastTimestamp) / config.speed;
              break;
            }
            case "turning": {
              sticks.last().rotation += (timestamp - lastTimestamp) / config.speed;
        
              if (sticks.last().rotation > 90) {
                sticks.last().rotation = 90;
        
                const [nextPlatform, perfectHit] = thePlatformTheStickHits();
                if (nextPlatform) {
                  score += perfectHit ? 2 : 1;
                  scoreElement.innerText = score;
        
                  if (perfectHit) {
                    perfectElement.style.opacity = 1;
                    setTimeout(() => (perfectElement.style.opacity = 0), 1000);
                  }
        
                  generatePlatform();
                  generateTree();
                  generateTree();
        
                  generateCloud();
                  generateCloud();
                }
        
                status = "walking";
              }
              break;
            }
            case "walking": {
              santaX += (timestamp - lastTimestamp) / config.speed;
        
              const [nextPlatform] = thePlatformTheStickHits();
              if (nextPlatform) {
                const maxSantaX =
                  nextPlatform.x + nextPlatform.w - config.santaDistanceFromEdge;
                if (santaX > maxSantaX) {
                  santaX = maxSantaX;
                  status = "transitioning";
                }
              } else {
                const maxSantaX =
                  sticks.last().x + sticks.last().length + config.santaWidth;
                if (santaX > maxSantaX) {
                  santaX = maxSantaX;
                  status = "falling";
                }
              }
              break;
            }
            case "transitioning": {
              sceneOffset += (timestamp - lastTimestamp) / (config.speed / 2);
        
              const [nextPlatform] = thePlatformTheStickHits();
              if (sceneOffset > nextPlatform.x + nextPlatform.w - config.paddingX) {
                sticks.push({
                  x: nextPlatform.x + nextPlatform.w,
                  length: 0,
                  rotation: 0
                });
                status = "waiting";
              }
              break;
            }
            case "falling": {
              if (sticks.last().rotation < 180)
                sticks.last().rotation += (timestamp - lastTimestamp) / config.speed;
        
              santaY += (timestamp - lastTimestamp) / (config.speed / 2);
              const maxSantaY =
                config.platformHeight +
                100 +
                (window.innerHeight - config.canvasHeight) / 2;
              if (santaY > maxSantaY) {
                restartButton.style.display = "block";
                return;
              }
              break;
            }
            default:
              throw Error("Wrong status");
          }
        
          draw();
          window.requestAnimationFrame(animate);
        
          lastTimestamp = timestamp;
        }
        
        function thePlatformTheStickHits() {
          if (sticks.last().rotation != 90)
            throw Error("Stick is "+sticks.last().rotation+"°");
          const stickFarX = sticks.last().x + sticks.last().length;
        
          const platformTheStickHits = platforms.find(
            (platform) => platform.x < stickFarX && stickFarX < platform.x + platform.w
          );
        
          if (
            platformTheStickHits &&
            platformTheStickHits.x +
              platformTheStickHits.w / 2 -
              config.perfectAreaSize / 2 <
              stickFarX &&
            stickFarX <
              platformTheStickHits.x +
                platformTheStickHits.w / 2 +
                config.perfectAreaSize / 2
          )
            return [platformTheStickHits, true];
        
          return [platformTheStickHits, false];
        }
        
        function draw() {
          ctx.save();
          ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
          drawBackground();
          ctx.translate(
            (window.innerWidth - config.canvasWidth) / 2 - sceneOffset,
            (window.innerHeight - config.canvasHeight) / 2
          );
        
          drawPlatforms();
          drawSanta();
          drawSticks();
        
          ctx.restore();
        }
        
        function drawPlatforms() {
          platforms.forEach(({ x, w }) => {
            let newX = x + 3;
            let newW = w - 6;
            let platformHeight =
              config.platformHeight + (window.innerHeight - config.canvasHeight) / 2;
            ctx.fillStyle = colours.platform;
            ctx.fillRect(
              newX,
              config.canvasHeight - config.platformHeight,
              newW,
              platformHeight
            );
        
            for (let i = 1; i <= platformHeight / 10; ++i) {
              let yGap = config.canvasHeight - config.platformHeight + i * 10;
              ctx.moveTo(newX, yGap);
              ctx.lineTo(newX + newW, yGap);
              let xGap = i % 2 ? 0 : 10;
              for (let j = 1; j < newW / 30; ++j) {
                let x = j * 20 + xGap;
                ctx.moveTo(newX + x, yGap);
                ctx.lineTo(newX + x, yGap + 10);
              }
              ctx.strokeStyle = colours.platformTop;
              ctx.stroke();
            }
        
            ctx.fillStyle = colours.platformTop;
            ctx.fillRect(x, config.canvasHeight - config.platformHeight, w, 10);
        
            if (sticks.last().x < x) {
              ctx.fillStyle = "white";
              ctx.fillRect(
                x + w / 2 - config.perfectAreaSize / 2,
                config.canvasHeight - config.platformHeight,
                config.perfectAreaSize,
                config.perfectAreaSize
              );
            }
          });
        }
        
        function drawSanta() {
          ctx.save();
          ctx.fillStyle = "red";
          ctx.translate(
            santaX - config.santaWidth / 2,
            santaY +
              config.canvasHeight -
              config.platformHeight -
              config.santaHeight / 2
          );
        
          ctx.fillRect(
            -config.santaWidth / 2,
            -config.santaHeight / 2,
            config.santaWidth,
            config.santaHeight - 4
          );
        
          const legDistance = 5;
          ctx.beginPath();
          ctx.arc(legDistance, 11.5, 3, 0, Math.PI * 2, false);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(-legDistance, 11.5, 3, 0, Math.PI * 2, false);
          ctx.fill();
        
          ctx.beginPath();
          ctx.fillStyle = colours.skin;
          ctx.arc(5, -7, 3, 0, Math.PI * 2, false);
          ctx.fill();
          
          ctx.beginPath();
          ctx.fillStyle = "white";
          ctx.arc(7, -2, 3, 0, Math.PI * 2, false);
          ctx.fill();
        
          ctx.beginPath();
          ctx.fillStyle = "red";
          ctx.moveTo(-8, -13.5);
          ctx.lineTo(-15, -3.5);
          ctx.lineTo(-5, -7);
          ctx.fill();
        
          ctx.fillStyle = "white";
          ctx.fillRect(-config.santaWidth / 2, -12, config.santaWidth, 3);
        
          ctx.fillStyle = "black";
          ctx.fillRect(-config.santaWidth / 2, 2, config.santaWidth, 2);
          ctx.fillStyle = "white";
          ctx.fillRect(-config.santaWidth / 2, 4, config.santaWidth, 4.5);
        
          ctx.beginPath();
          ctx.fillStyle = "white";
          ctx.arc(-17, -2, 3, 0, Math.PI * 2, false);
          ctx.fill();
        
          ctx.restore();
        }
        
        function drawSticks() {
          sticks.forEach((stick) => {
            ctx.save();
        
            ctx.translate(stick.x, config.canvasHeight - config.platformHeight);
            ctx.rotate((Math.PI / 180) * stick.rotation);
        
            ctx.beginPath();
            ctx.lineWidth = 4;
            ctx.moveTo(0, 0);
            ctx.lineTo(0, -stick.length);
        
            ctx.strokeStyle = ctx.createPattern(createCandyPattern(), "repeat");
            ctx.stroke();
        
            ctx.restore();
          });
        }
        
        function drawBackground() {
          var gradient = ctx.createRadialGradient(
            window.innerWidth / 2,
            window.innerHeight / 2,
            0,
            window.innerHeight / 2,
            window.innerWidth / 2,
            window.innerWidth
          );
          gradient.addColorStop(0, colours.lightBg);
          gradient.addColorStop(1, colours.darkBg);
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        
          hills.forEach((hill) =>
            drawHill(hill.baseHeight, hill.amplitude, hill.stretch, hill.colour)
          );
          trees.forEach((tree) => drawTree(tree.x, tree.color));
          clouds.forEach((cloud) => drawCloud(cloud.x, cloud.y, cloud.w));
        }
        
        function drawHill(baseHeight, amplitude, stretch, color) {
          ctx.beginPath();
          ctx.moveTo(0, window.innerHeight);
          ctx.lineTo(0, getHillY(0, baseHeight, amplitude, stretch));
          for (let i = 0; i < window.innerWidth; i++) {
            ctx.lineTo(i, getHillY(i, baseHeight, amplitude, stretch));
          }
          ctx.lineTo(window.innerWidth, window.innerHeight);
          ctx.fillStyle = color;
          ctx.fill();
        }
        
        function drawTree(x, color) {
          ctx.save();
          ctx.translate(
            (-sceneOffset * config.backgroundSpeedMultiplier + x) * hills[1].stretch,
            getTreeY(x, hills[1].baseHeight, hills[1].amplitude)
          );
        
          const treeTrunkHeight = 15;
          const treeTrunkWidth = 10;
          const treeCrownHeight = 60;
          const treeCrownWidth = 30;
        
          // Draw trunk
          ctx.fillStyle = colours.darkHill;
          ctx.fillRect(
            -treeTrunkWidth / 2,
            -treeTrunkHeight,
            treeTrunkWidth,
            treeTrunkHeight
          );
        
          // Draw crown
          ctx.beginPath();
        
          ctx.moveTo(-treeCrownWidth / 2, -treeTrunkHeight * 3);
          ctx.lineTo(0, -(treeTrunkHeight + treeCrownHeight));
          ctx.lineTo(treeCrownWidth / 2, -treeTrunkHeight * 3);
        
          ctx.moveTo(-treeCrownWidth / 2, -treeTrunkHeight * 2);
          ctx.lineTo(0, -(treeTrunkHeight / 2 + treeCrownHeight));
          ctx.lineTo(treeCrownWidth / 2, -treeTrunkHeight * 2);
        
          ctx.moveTo(-treeCrownWidth / 2, -treeTrunkHeight);
          ctx.lineTo(0, -(treeTrunkHeight + treeCrownHeight / 2));
          ctx.lineTo(treeCrownWidth / 2, -treeTrunkHeight);
        
          ctx.fillStyle = color;
          ctx.fill();
        
          ctx.restore();
        }
        
        function drawCloud(x, y, width) {
          ctx.save();
          ctx.translate(
            (-sceneOffset * config.backgroundSpeedMultiplier + x) * hills[1].stretch,
            getTreeY(x, hills[1].baseHeight, hills[1].amplitude)
          );
        
          height = width * 1.5;
          ctx.beginPath();
          ctx.arc(x, y, width, Math.PI * 0.5, Math.PI * 1.5);
          ctx.arc(x + height, y - width, height, Math.PI * 1, Math.PI * 2);
          ctx.arc(x + height * 2, y - width, height, Math.PI * 1.2, Math.PI);
          ctx.arc(x + width * 3, y, width, Math.PI * 1.5, Math.PI * 0.5);
          ctx.moveTo(x + width * 3, y + width);
          ctx.lineTo(x, y + width);
          ctx.fillStyle = "rgba(255, 255, 255, .3)";
          ctx.fill();
        
          ctx.restore();
        }
        
        function createCandyPattern() {
          const patternCanvas = document.createElement("canvas");
          const pctx = patternCanvas.getContext("2d");
        
          const max = 15;
          let i = 0;
          let x = 0;
          let z = 90;
        
          while (i < max) {
            pctx.beginPath();
            pctx.moveTo(0, x);
            pctx.lineTo(0, z);
            pctx.lineWidth = 24;
            pctx.strokeStyle = "red";
            pctx.stroke();
        
            pctx.beginPath();
            pctx.moveTo(0, x + 24);
            pctx.lineTo(0, z + 24);
            pctx.lineWidth = 24;
            pctx.strokeStyle = "white";
            pctx.stroke();
        
            x += 48;
            z += 48;
            i++;
          }
        
          return patternCanvas;
        }
        
        function getHillY(windowX, baseHeight, amplitude, stretch) {
          const sineBaseY = window.innerHeight - baseHeight;
          return (
            Math.sinus(
              (sceneOffset * config.backgroundSpeedMultiplier + windowX) * stretch
            ) *
              amplitude +
            sineBaseY
          );
        }
        
        function getTreeY(x, baseHeight, amplitude) {
          const sineBaseY = window.innerHeight - baseHeight;
          return Math.sinus(x) * amplitude + sineBaseY;
        }
        
        function createElementStyle(element, cssStyles = null, inner = null) {
          const g = document.createElement(element);
          if (cssStyles) g.style.cssText = cssStyles;
          if (inner) g.innerHTML = inner;
          document.body.appendChild(g);
          return g;
        }
        
        function addShadow(colour, depth) {
          let shadow = "";
          for (let i = 0; i <= depth; i++) {
            shadow += i+"px "+i+"px 0 "+"colour";
            shadow += i < depth ? ", " : "";
          }
          return shadow;
        }
      </script>
      </body>
      </html>
      `,
  },
  {
    id: 6,
    title: "卡通人物奔跑控制",
    code: `<!DOCTYPE html>
      <html>
        <head>
          <title>js控制人物各个方向奔跑动画</title>
          <meta charset="utf-8" />
          <style type="text/css">
            table {
              position: absolute;
              top: 100px;
              left: 100px;
              width: 150px;
              height: 150px;
            }
            input {
              width: 40px;
              height: 30px;
              background: orange;
              color: white;
              font-weight: bold;
              border: none;
              border-radius: 5px;
            }
            img {
              position: absolute;
              top: 300px;
              left: 500px;
            }
          </style>
        </head>
        <body>
          <img id="im" src="http://152.136.42.252:8571/static/media/down-0.png" />
          <table>
            <tr>
              <td><input id="leftUp" type="button" value="左上" /></td>
              <td><input id="goUp" type="button" value="向上" /></td>
              <td><input id="rightUp" type="button" value="右上" /></td>
            </tr>
            <tr>
              <td><input id="goLeft" type="button" value="左" /></td>
              <td><input id="stop" type="button" value="停止" /></td>
              <td><input id="goRight" type="button" value="右" /></td>
            </tr>
            <tr>
              <td><input id="leftDown" type="button" value="左下" /></td>
              <td><input id="goDown" type="button" value="向下" /></td>
              <td><input id="rightDown" type="button" value="右下" /></td>
            </tr>
          </table>
          <script type="text/javascript">
            var i = 0,
              clc = null,
              flage;
            var images = document.getElementById("im");
      
            var oGoUp = document.getElementById("goUp");
            var oGoDown = document.getElementById("goDown");
            var oGoLeft = document.getElementById("goLeft");
            var oGoRight = document.getElementById("goRight");
            var oLeftUp = document.getElementById("leftUp");
            var oLeftDown = document.getElementById("leftDown");
            var oRightUp = document.getElementById("rightUp");
            var oRightDown = document.getElementById("rightDown");
            var oStop = document.getElementById("stop");
      
            images.style.top = "300px";
            images.style.left = "500px";
      
            //停止
            oStop.onclick = function () {
              switch (flage) {
                case 1:
                  images.src = "http://152.136.42.252:8571/static/media/up-0.png";
                  break;
                case 2:
                  images.src = "http://152.136.42.252:8571/static/media/down-0.png";
                  break;
                case 3:
                  images.src = "http://152.136.42.252:8571/static/media/left-0.png";
                  break;
                case 4:
                  images.src = "http://152.136.42.252:8571/static/media/right-0.png";
                  break;
                case 5:
                  images.src = "http://152.136.42.252:8571/static/media/rightUp-0.png";
                  break;
                case 6:
                  images.src = "http://152.136.42.252:8571/static/media/rd-0.png";
                  break;
                case 7:
                  images.src = "http://152.136.42.252:8571/static/media/ld-0.png";
                  break;
                case 8:
                  images.src = "http://152.136.42.252:8571/static/media/lu-0.png";
                  break;
              }
              clearInterval(clc);
            };
            //向上
            oGoUp.onclick = function () {
              i = 0;
              clearInterval(clc);
              clc = setInterval("goUp(i++);", 100);
            };
            function goUp() {
              i = i % 4;
              var name = "http://152.136.42.252:8571/static/media/up-" + i + "." + "png";
              images.src = name;
              images.style.top = parseInt(images.style.top) - 10 + "px";
              flage = 1;
            }
            //向下
            oGoDown.onclick = function () {
              i = 0;
              clearInterval(clc);
              clc = setInterval("goDown(i++);", 100);
            };
            function goDown() {
              i = i % 4;
              var name = "http://152.136.42.252:8571/static/media/down-" + i + "." + "png";
              images.src = name;
              images.style.top = parseInt(images.style.top) + 10 + "px";
              flage = 2;
            }
            //向左
            oGoLeft.onclick = function () {
              i = 0;
              clearInterval(clc);
              clc = setInterval("goLeft(i++);", 100);
            };
            function goLeft() {
              i = i % 4;
              var name = "http://152.136.42.252:8571/static/media/left-" + i + "." + "png";
              images.src = name;
              images.style.left = parseInt(images.style.left) - 10 + "px";
              flage = 3;
            }
            //向右
            oGoRight.onclick = function () {
              i = 0;
              clearInterval(clc);
              clc = setInterval("goRight(i++);", 100);
            };
            function goRight() {
              i = i % 4;
              var name = "http://152.136.42.252:8571/static/media/right-" + i + "." + "png";
              images.src = name;
              images.style.left = parseInt(images.style.left) + 10 + "px";
              flage = 4;
            }
            //向右上
            oRightUp.onclick = function () {
              i = 0;
              clearInterval(clc);
              clc = setInterval("goRightUp(i++);", 100);
            };
            function goRightUp() {
              i = i % 4;
              var name = "http://152.136.42.252:8571/static/media/rightUp-" + i + "." + "png";
              images.src = name;
              images.style.left = parseInt(images.style.left) + 10 + "px";
              images.style.top = parseInt(images.style.top) - 10 + "px";
              flage = 5;
            }
            //向右下
            oRightDown.onclick = function () {
              i = 0;
              clearInterval(clc);
              clc = setInterval("goRightDown(i++);", 100);
            };
            function goRightDown() {
              i = i % 4;
              var name = "http://152.136.42.252:8571/static/media/rd-" + i + "." + "png";
              images.src = name;
              images.style.left = parseInt(images.style.left) + 10 + "px";
              images.style.top = parseInt(images.style.top) + 10 + "px";
              flage = 6;
            }
            //向左下
            oLeftDown.onclick = function () {
              i = 0;
              clearInterval(clc);
              clc = setInterval("goLeftDown(i++);", 100);
            };
            function goLeftDown() {
              i = i % 4;
              var name = "http://152.136.42.252:8571/static/media/ld-" + i + "." + "png";
              images.src = name;
              images.style.left = parseInt(images.style.left) - 10 + "px";
              images.style.top = parseInt(images.style.top) + 10 + "px";
              flage = 7;
            }
            //向左上
            oLeftUp.onclick = function () {
              i = 0;
              clearInterval(clc);
              clc = setInterval("goLeftUp(i++);", 100);
            };
            function goLeftUp() {
              i = i % 4;
              var name = "http://152.136.42.252:8571/static/media/lu-" + i + "." + "png";
              images.src = name;
              images.style.left = parseInt(images.style.left) - 10 + "px";
              images.style.top = parseInt(images.style.top) - 10 + "px";
              flage = 8;
            }
          </script>
        </body>
      </html>
      `,
  },
  {
    id: 7,
    title: "宇宙星空",
    code: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
          <style>
            body {
              margin: 0;
              padding: 0;
            }
            .bg-gray-dark-mktg {
              background-image: radial-gradient(#04255b, #020a1d);
            }
            .d-flex {
              display: flex !important;
            }
            .overflow-hidden {
              overflow: hidden !important;
            }
            .position-relative {
              position: relative !important;
            }
            .flex-auto {
              flex: auto !important;
            }
            .flex-column {
              flex-direction: column !important;
            }
            .sky-space-bg {
              position: absolute;
              top: 36vh;
              left: 42vw;
              height: 16vw;
              width: 16vw;
            }
            .sky-bg-stars {
              position: absolute;
              top: 0;
              right: 0;
              bottom: 0;
              left: 0;
              overflow: hidden;
              background-image: radial-gradient(
                  1px 2px at 50px 50px,
                  #eee,
                  rgba(0, 0, 0, 0)
                ),
                radial-gradient(2px 3px at 20px 35px, #fff, rgba(0, 0, 0, 0)),
                radial-gradient(3px 3px at 60px 20px, #ddd, rgba(0, 0, 0, 0));
              background-repeat: repeat;
              background-size: 200px 200px;
              opacity: 0.2;
              animation: opacity 8s infinite;
            }
            .sky-bg-stars:nth-child(1) {
              background-position: 0% 90%;
              animation-delay: 0s;
            }
            .sky-bg-stars:nth-child(2) {
              background-position: 50% 10%;
              animation-delay: 0.6s;
            }
            .sky-bg-stars:nth-child(3) {
              background-position: 40% -80%;
              background-size: 120px 200px;
              animation-delay: 1.8s;
            }
            .sky-bg-stars:nth-child(4) {
              background-position: 150% -80%;
              background-size: 220px 100px;
              animation-delay: 3.2s;
            }
            .sky-space,
            .sky-stars {
              position: absolute;
              top: 0;
              right: 5vw;
              bottom: 0;
              left: 5vw;
              overflow: hidden;
            }
            .sky-stars {
              background-image: radial-gradient(
                  2px 2px at 50px 200px,
                  #eee,
                  rgba(0, 0, 0, 0)
                ),
                radial-gradient(3px 3px at 40px 60px, #fff, rgba(0, 0, 0, 0)),
                radial-gradient(4px 5px at 100px 30px, #ddd, rgba(0, 0, 0, 0));
              background-repeat: repeat;
              background-size: 380px 380px;
              opacity: 0;
              animation-name: zoom;
              animation-delay: 0s;
              animation-duration: 10s;
              animation-timing-function: ease-out;
              animation-iteration-count: infinite;
            }
            .sky-stars:nth-child(1) {
              top: 20vh;
              bottom: 20vh;
              left: 10vw;
              right: 10vw;
              background-size: 120px 120px;
              background-position: 10% 90%;
            }
            .sky-stars:nth-child(2) {
              background-position: 20% 50%;
              animation-delay: 0.3s;
            }
            .sky-stars:nth-child(3) {
              background-position: 40% 20%;
              animation-delay: 1.3s;
            }
            .sky-stars:nth-child(4) {
              background-position: 50% 10%;
              background-size: 200px 200px;
              transform: rotate(60deg);
              animation-delay: 2.1s;
            }
            .sky-stars:nth-child(5) {
              background-position: 30% 30%;
              background-size: 120px 270px;
              animation-delay: 3s;
            }
            .sky-stars:nth-child(6) {
              background-position: 50% 20%;
              animation-delay: 5.5s;
            }
            @keyframes opacity {
              0% {
                opacity: 0.2;
                transform: rotate(-5deg);
                animation-timing-function: ease-in;
              }
              50% {
                opacity: 0.8;
                transform: rotate(-13deg);
                animation-timing-function: ease-in;
              }
              100% {
                opacity: 0.1;
                transform: rotate(-20deg);
                animation-timing-function: ease-in;
              }
            }
            @keyframes zoom {
              0% {
                opacity: 0.02;
                transform: scale(0.1);
                transform: rotate(-20deg);
                animation-timing-function: ease-in;
              }
              5% {
                opacity: 0.05;
              }
              50% {
                opacity: 0.6;
              }
              75% {
                opacity: 0.3;
                transform: scale(1.8);
              }
              100% {
                opacity: 0.1;
                transform: scale(2.2);
              }
            }
          </style>
        </head>
        <body>
          <div
            class="js-warp-hide bg-gray-dark-mktg d-flex flex-auto flex-column overflow-hidden position-relative"
            style="width: 100vw; height: 100vh"
          >
            <div class="sky-space">
              <div class="sky-stars"></div>
              <div class="sky-stars"></div>
              <div class="sky-stars"></div>
              <div class="sky-stars"></div>
              <div class="sky-stars"></div>
              <div class="sky-stars"></div>
            </div>
            <div class="sky-space-bg">
              <div class="sky-bg-stars"></div>
              <div class="sky-bg-stars"></div>
              <div class="sky-bg-stars"></div>
              <div class="sky-bg-stars"></div>
            </div>
          </div>
        </body>
        <script>
          function clickEffect() {
            let balls = [];
            let longPressed = false;
            let longPress;
            let multiplier = 0;
            let width, height;
            let origin;
            let normal;
            let ctx;
            const colours = ["#F73859", "#14FFEC", "#00E0FF", "#FF99FE", "#FAF15D"];
            const canvas = document.createElement("canvas");
            document.body.appendChild(canvas);
            canvas.setAttribute(
              "style",
              "width: 100%; height: 100%; top: 0; left: 0; z-index: 99999; position: fixed; pointer-events: none;"
            );
            const pointer = document.createElement("span");
            pointer.classList.add("pointer");
            document.body.appendChild(pointer);
      
            if (canvas.getContext && window.addEventListener) {
              ctx = canvas.getContext("2d");
              updateSize();
              window.addEventListener("resize", updateSize, false);
              loop();
              window.addEventListener(
                "mousedown",
                function (e) {
                  pushBalls(randBetween(10, 20), e.clientX, e.clientY);
                  document.body.classList.add("is-pressed");
                  longPress = setTimeout(function () {
                    document.body.classList.add("is-longpress");
                    longPressed = true;
                  }, 500);
                },
                false
              );
              window.addEventListener(
                "mouseup",
                function (e) {
                  clearInterval(longPress);
                  if (longPressed == true) {
                    document.body.classList.remove("is-longpress");
                    pushBalls(
                      randBetween(
                        50 + Math.ceil(multiplier),
                        100 + Math.ceil(multiplier)
                      ),
                      e.clientX,
                      e.clientY
                    );
                    longPressed = false;
                  }
                  document.body.classList.remove("is-pressed");
                },
                false
              );
              window.addEventListener(
                "mousemove",
                function (e) {
                  let x = e.clientX;
                  let y = e.clientY;
                  pointer.style.top = y + "px";
                  pointer.style.left = x + "px";
                },
                false
              );
            } else {
              console.log("canvas or addEventListener is unsupported!");
            }
      
            function updateSize() {
              canvas.width = window.innerWidth * 2;
              canvas.height = window.innerHeight * 2;
              canvas.style.width = window.innerWidth + "px";
              canvas.style.height = window.innerHeight + "px";
              ctx.scale(2, 2);
              width = canvas.width = window.innerWidth;
              height = canvas.height = window.innerHeight;
              origin = {
                x: width / 2,
                y: height / 2,
              };
              normal = {
                x: width / 2,
                y: height / 2,
              };
            }
            class Ball {
              constructor(x = origin.x, y = origin.y) {
                this.x = x;
                this.y = y;
                this.angle = Math.PI * 2 * Math.random();
                if (longPressed == true) {
                  this.multiplier = randBetween(14 + multiplier, 15 + multiplier);
                } else {
                  this.multiplier = randBetween(6, 12);
                }
                this.vx =
                  (this.multiplier + Math.random() * 0.5) * Math.cos(this.angle);
                this.vy =
                  (this.multiplier + Math.random() * 0.5) * Math.sin(this.angle);
                this.r = randBetween(8, 12) + 3 * Math.random();
                this.color = colours[Math.floor(Math.random() * colours.length)];
              }
              update() {
                this.x += this.vx - normal.x;
                this.y += this.vy - normal.y;
                normal.x = (-2 / window.innerWidth) * Math.sin(this.angle);
                normal.y = (-2 / window.innerHeight) * Math.cos(this.angle);
                this.r -= 0.3;
                this.vx *= 0.9;
                this.vy *= 0.9;
              }
            }
      
            function pushBalls(count = 1, x = origin.x, y = origin.y) {
              for (let i = 0; i < count; i++) {
                balls.push(new Ball(x, y));
              }
            }
      
            function randBetween(min, max) {
              return Math.floor(Math.random() * max) + min;
            }
      
            function loop() {
              ctx.fillStyle = "rgba(255, 255, 255, 0)";
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              for (let i = 0; i < balls.length; i++) {
                let b = balls[i];
                if (b.r < 0) continue;
                ctx.fillStyle = b.color;
                ctx.beginPath();
                ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2, false);
                ctx.fill();
                b.update();
              }
              if (longPressed == true) {
                multiplier += 0.2;
              } else if (!longPressed && multiplier >= 0) {
                multiplier -= 0.4;
              }
              removeBall();
              requestAnimationFrame(loop);
            }
      
            function removeBall() {
              for (let i = 0; i < balls.length; i++) {
                let b = balls[i];
                if (
                  b.x + b.r < 0 ||
                  b.x - b.r > width ||
                  b.y + b.r < 0 ||
                  b.y - b.r > height ||
                  b.r < 0
                ) {
                  balls.splice(i, 1);
                }
              }
            }
          }
          clickEffect(); //调用
        </script>
      </html>
      `,
  },
  {
    id: 8,
    title: "canvas画板",
    code: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
          <style>
            html,
            body {
              margin: 0;
              padding: 0;
            }
            .saveimg {
              text-align: center;
            }
            .saveimgs span {
              display: inline-block;
              margin-top: 5px;
            }
          </style>
        </head>
        <body>
          <div align="center">
            <canvas
              id="myCanvas"
              width="500"
              height="300"
              style="border: 1px solid #6699cc"
            ></canvas>
            <div class="control-ops control">
              <button
                type="button"
                class="btn btn-primary"
                onclick="javascript:clearArea();return false;"
              >
                清空画板
              </button>
              Line width :
              <select id="selWidth" onchange="aaa()">
                <option value="1">1</option>
                <option value="3" selected="selected">3</option>
                <option value="5">5</option>
                <option value="7">7</option>
                <option value="9">9</option>
                <option value="11">11</option>
              </select>
              Color :
              <select id="selColor" onchange="aaa2()">
                <option value="black" selected="selected">black</option>
                <option value="blue">blue</option>
                <option value="red">red</option>
                <option value="green">green</option>
                <option value="yellow">yellow</option>
                <option value="gray">gray</option>
              </select>
              <button
                type="button"
                class="saveimg"
                onclick="javascript:saveImageInfo();return false;"
              >
                保存
              </button>
            </div>
            <div class="saveimgs"></div>
          </div>
        </body>
        <script>
          var mousePressed = false;
          var lastX, lastY;
          var ctx = document.getElementById("myCanvas").getContext("2d");
          var c = document.getElementById("myCanvas");
          var control = document.getElementsByClassName("control")[0];
          var saveimgs = document.getElementsByClassName("saveimgs")[0];
      
          window.onload = function () {
            InitThis();
          };
      
          function saveImageInfo() {
            var image = c.toDataURL("image/png");
            var ctximg = document.createElement("span");
            ctximg.innerHTML = "<img src='" + image + "' alt='from canvas'/>";
            if (saveimgs.getElementsByTagName("span").length >= 1) {
              var span_old = saveimgs.getElementsByTagName("span")[0];
              saveimgs.replaceChild(ctximg, span_old);
            } else {
              saveimgs.appendChild(ctximg);
            }
          }
      
          var selected1, selected2;
      
          function aaa() {
            var sel = document.getElementById("selWidth");
            var value = sel.selectedIndex;
            return (selected1 = sel[value].value);
          }
      
          function aaa2() {
            var sel2 = document.getElementById("selColor");
            var value = sel2.selectedIndex;
            return (selected2 = sel2[value].value);
          }
      
          function InitThis() {
            //          触摸屏
            c.addEventListener(
              "touchstart",
              function (event) {
                console.log(1);
                if (event.targetTouches.length == 1) {
                  event.preventDefault(); // 阻止浏览器默认事件，重要
                  var touch = event.targetTouches[0];
                  mousePressed = true;
                  Draw(
                    touch.pageX - this.offsetLeft,
                    touch.pageY - this.offsetTop,
                    false
                  );
                }
              },
              false
            );
      
            c.addEventListener(
              "touchmove",
              function (event) {
                console.log(2);
                if (event.targetTouches.length == 1) {
                  event.preventDefault(); // 阻止浏览器默认事件，重要
                  var touch = event.targetTouches[0];
                  if (mousePressed) {
                    Draw(
                      touch.pageX - this.offsetLeft,
                      touch.pageY - this.offsetTop,
                      true
                    );
                  }
                }
              },
              false
            );
      
            c.addEventListener(
              "touchend",
              function (event) {
                console.log(3);
                if (event.targetTouches.length == 1) {
                  event.preventDefault(); // 阻止浏览器默认事件，防止手写的时候拖动屏幕，重要
                  //                  var touch = event.targetTouches[0];
                  mousePressed = false;
                }
              },
              false
            );
      
            //         鼠标
            c.onmousedown = function (event) {
              mousePressed = true;
              Draw(
                event.pageX - this.offsetLeft,
                event.pageY - this.offsetTop,
                false
              );
            };
      
            c.onmousemove = function (event) {
              if (mousePressed) {
                Draw(
                  event.pageX - this.offsetLeft,
                  event.pageY - this.offsetTop,
                  true
                );
              }
            };
      
            c.onmouseup = function (event) {
              mousePressed = false;
            };
          }
      
          function Draw(x, y, isDown) {
            if (isDown) {
              ctx.beginPath();
              ctx.strokeStyle = selected2;
              ctx.lineWidth = selected1;
              ctx.lineJoin = "round";
              ctx.moveTo(lastX, lastY);
              ctx.lineTo(x, y);
              ctx.closePath();
              ctx.stroke();
            }
            lastX = x;
            lastY = y;
          }
      
          function clearArea() {
            // Use the identity matrix while clearing the canvas
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      
            // 清除签名图片
            if (saveimgs.getElementsByTagName("span").length >= 1) {
              var clearImg = saveimgs.getElementsByTagName("span")[0];
              saveimgs.removeChild(clearImg);
            }
          }
        </script>
      </html>
      `,
  },
  {
    id: 9,
    title: "canvas画饼图",
    code: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
        </head>
        <body>
          <canvas id="canvas"></canvas>
        </body>
        <script>
          var canvas = document.getElementById("canvas");
          canvas.width = "600";
          canvas.height = "400";
          var ctx = canvas.getContext("2d");
          var sum = 0; // 总和
          var arr = []; //存储每一个扇形的值
          var colors = []; //存储每一个扇形的颜色
          var start = 0; //每一个扇形的开始π值
          var end = 0; //每一个扇形的结束数π值
          var r = 150; //半径
          var lineX = (lineY = 0);
          ctx.translate(300, 200);
      
          
          function init() {
            for (var i = 0; i < 6; i++) {
              var color = "#" + Math.random().toString(16).substr(2, 6).toUpperCase(); //随机颜色
              colors.push(color);
      
              var value = Math.round(Math.random() * 100 + 20); //在一定范围内随机数值
              arr.push(value);
      
              sum += value; //累加总和
            }
          }
          init();
          function draw() {
            for (var i = 0; i < arr.length; i++) {
              ctx.beginPath();
              ctx.moveTo(0, 0);
              //计算画圆的结束位置
              end = start + (arr[i] / sum) * 2 * Math.PI;
              console.log('end',end)
              //画圆
              ctx.arc(0, 0, r, start, end);
              ctx.fillStyle = colors[i]; //设置填充颜色
              ctx.fill();
              //画边 白色，用来隔开
              ctx.strokeStyle = "white";
              ctx.stroke();
              ctx.closePath();
      
              //画指示线和显示比例
              var dis = 0;
              ctx.beginPath();
              ctx.strokeStyle = "black";
              //计算每个圆弧的中间位置的坐标
              lineX = Math.cos(start + (end - start) / 2) * r;
              lineY = Math.sin(start + (end - start) / 2) * r;
      
              ctx.moveTo(lineX, lineY);
              //坐标的正负来确定线绘制的方向
              if (lineX > 0 && lineY > 0) {
                dis = 70;
              } else if (lineX < 0 && lineY < 0) {
                dis = -70;
              } else if (lineX < 0) {
                dis = -70;
              } else if (lineY < 0) {
                dis = 70;
              }
      
              ctx.lineTo(lineX + dis, lineY);
              ctx.stroke();
              //绘制百分比
              var text = Math.round((arr[i] / sum) * 100) + "%";
              ctx.fillText(text, lineX + dis, lineY);
              ctx.closePath();
              start = end;
            }
          }
          draw();
        </script>
      </html>
      `,
  },
  {
    id: 10,
    title: "js原生实现录屏",
    code: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
        </head>
        <body></body>
        <script>
          const streamPromise = navigator.mediaDevices.getDisplayMedia(); // 请求屏幕捕获
          streamPromise.then((stream) => {
            var recordedChunks = []; // 录制的视频数据
            console.log(stream);
            var options = { mimeType: "video/webm; codecs=vp9" }; // 设置编码格式
            var mediaRecorder = new MediaRecorder(stream, options); // 初始化MediaRecorder实例
            mediaRecorder.ondataavailable = handleDataAvailable; // 设置数据可用（录屏结束）时的回调
            mediaRecorder.start();
      
            function handleDataAvailable(event) {
              console.log("data-available");
              if (event.data.size > 0) {
                recordedChunks.push(event.data); // 添加数据，event.data是一个BLOB对象
                console.log(recordedChunks);
                download(); // 封装成BLOB对象并下载
              } else {
                // ...
              }
            }
      
            function download() {
              var blob = new Blob(recordedChunks, {
                type: "video/webm",
              });
              var url = URL.createObjectURL(blob);
              var a = document.createElement("a");
              document.body.appendChild(a);
              a.style = "display: none";
              a.href = url;
              a.download = "test.webm";
              a.click();
              window.URL.revokeObjectURL(url);
            }
          });
        </script>
      </html>
      `,
  },
  {
    id: 11,
    title: "卡片翻转功能",
    code: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              background-image: radial-gradient(
                circle 588px at 31.7% 40.2%,
                rgba(225, 200, 239, 1) 21.4%,
                rgba(163, 225, 233, 1) 57.1%
              );
              padding: 25px;
            }
            .container {
              width: 150px;
              height: 200px;
              position: relative;
              perspective: 1000px;
            }
            .just,
            .back {
              width: 100%;
              height: 100%;
              position: absolute;
              backface-visibility: hidden;
              transition: transform 0.25s ease-in-out;
              display: flex;
              justify-content: center;
              align-items: center;
              color: #fff;
            }
            .just {
              transform: rotateY(0deg);
              background-image: linear-gradient(
                109.6deg,
                rgba(245, 56, 56, 1) 11.2%,
                rgba(234, 192, 117, 1) 78%
              );
            }
            .container:hover .just {
              transform: rotateY(180deg);
            }
            .back {
              transform: rotateY(-180deg);
              background-image: linear-gradient(
                117deg,
                rgba(123, 216, 96, 1) 39.2%,
                rgba(255, 255, 255, 1) 156.2%
              );
            }
            .container:hover .back {
              transform: rotateY(0deg);
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="just">我在前</div>
            <div class="back">我在后</div>
          </div>
        </body>
      </html>
      `,
  },
  {
    id: 12,
    title: "高德地图轨迹回放",
    code: `<!doctype html>
      <html>
      <head>
          <meta charset="utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="initial-scale=1.0, user-scalable=no, width=device-width">
          <title>轨迹回放</title>
          <link rel="stylesheet" href="https://a.amap.com/jsapi_demos/static/demo-center/css/demo-center.css"/>
          <style>
              html, body, #container {
                  height: 100%;
                  width: 100%;
              }
      
              .input-card .btn{
                  margin-right: 1.2rem;
                  width: 9rem;
              }
      
              .input-card .btn:last-child{
                  margin-right: 0;
              }
          </style>
      </head>
      <body>
      <div id="container"></div>
      <div class="input-card">
          <h4>轨迹回放控制</h4>
          <div class="input-item">
              <input type="button" class="btn" value="开始动画" id="start" onclick="startAnimation()"/>
              <input type="button" class="btn" value="暂停动画" id="pause" onclick="pauseAnimation()"/>
          </div>
          <div class="input-item">
              <input type="button" class="btn" value="继续动画" id="resume" onclick="resumeAnimation()"/>
              <input type="button" class="btn" value="停止动画" id="stop" onclick="stopAnimation()"/>
          </div>
      </div>
      <!-- <script type="text/javascript" src="https://webapi.amap.com/maps?v=2.0&key=您申请的key值"></script> -->
      <script type="text/javascript" src="https://webapi.amap.com/maps?v=2.0&key=b3fdfdfa194f0e9259fe6403aceff876&plugin=AMap.MouseTool"></script> 
      <script>
          // JSAPI2.0 使用覆盖物动画必须先加载动画插件
          AMap.plugin('AMap.MoveAnimation', function(){
              var marker, lineArr = [[116.478935,39.997761],[116.478939,39.997825],[116.478912,39.998549],[116.478912,39.998549],[116.478998,39.998555],[116.478998,39.998555],[116.479282,39.99856],[116.479658,39.998528],[116.480151,39.998453],[116.480784,39.998302],[116.480784,39.998302],[116.481149,39.998184],[116.481573,39.997997],[116.481863,39.997846],[116.482072,39.997718],[116.482362,39.997718],[116.483633,39.998935],[116.48367,39.998968],[116.484648,39.999861]];
      
              var map = new AMap.Map("container", {
                  resizeEnable: true,
                  center: [116.397428, 39.90923],
                  zoom: 17
              });
      
              marker = new AMap.Marker({
                  map: map,
                  position: [116.478935,39.997761],
                  icon: "https://a.amap.com/jsapi_demos/static/demo-center-v2/car.png",
                  offset: new AMap.Pixel(-13, -26),
              });
      
              // 绘制轨迹
              var polyline = new AMap.Polyline({
                  map: map,
                  path: lineArr,
                  showDir:true,
                  strokeColor: "#28F",  //线颜色
                  // strokeOpacity: 1,     //线透明度
                  strokeWeight: 6,      //线宽
                  // strokeStyle: "solid"  //线样式
              });
      
              var passedPolyline = new AMap.Polyline({
                  map: map,
                  strokeColor: "#AF5",  //线颜色
                  strokeWeight: 6,      //线宽
              });
      
      
              marker.on('moving', function (e) {
                  passedPolyline.setPath(e.passedPath);
                  map.setCenter(e.target.getPosition(),true)
              });
      
              map.setFitView();
      
              window.startAnimation = function startAnimation () {
                  marker.moveAlong(lineArr, {
                      // 每一段的时长
                      duration: 500,//可根据实际采集时间间隔设置
                      // JSAPI2.0 是否延道路自动设置角度在 moveAlong 里设置
                      autoRotation: true,
                  });
              };
      
              window.pauseAnimation = function () {
                  marker.pauseMove();
              };
      
              window.resumeAnimation = function () {
                  marker.resumeMove();
              };
      
              window.stopAnimation = function () {
                  marker.stopMove();
              };
          });
      </script>
      </body>
      </html>`,
  },
  {
    id: 13,
    title: "css实现整屏滑动",
    code: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>H5 整屏滑动</title>
          <style>
              *{
                  padding: 0;
                  margin: 0;
              }
              .container{
                  height: 100vh;
                  overflow-y: auto;
                  scroll-snap-type: y mandatory;
              }
              .box1{
                  height: 100vh;
                  background-color: paleturquoise;
                  scroll-snap-align: start;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 30px;
              }
              .box2{
                  height: 100vh;
                  background-color: aqua;
                  scroll-snap-align: start;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 30px;
              }
              .box3{
                  height: 100vh;
                  background-color: aquamarine;
                  scroll-snap-align: start;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 30px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="box1">box1</div>
              <div class="box2">box2</div>
              <div class="box3">box3</div>
          </div>
      </body>
      </html>`,
  },
  {
    id: 14,
    title: "飞机大战",
    code: `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>简易飞机大战</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              font-family: "Microsoft yahei", serif;
            }
            li {
              list-style-type: none;
            }
            body {
              overflow: hidden;
              user-select: none;
              -moz-user-select: -moz-none;
              -ms-user-select: none;
            }
            #box {
              position: relative;
              width: 512px;
              height: 768px;
              margin: 20px auto;
            }
            #map {
              overflow: hidden;
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: url("http://152.136.42.252:8571/static/media/bg_1.png");
              background-size: 100% 100%;
            }
            #level {
              position: absolute;
              top: 0;
              left: 0;
              z-index: 1;
              width: 100%;
              height: 100%;
            }
            #level h1 {
              font-size: 40px;
              padding-top: 60px;
              padding-bottom: 150px;
              line-height: 60px;
              text-align: center;
              color: #fff;
            }
            #level p {
              margin: 130px auto;
              width: 200px;
              height: 50px;
              line-height: 50px;
              text-align: center;
              background: #fff;
              font-weight: bolder;
              cursor: pointer;
            }
            #level p:hover {
              background: #ffa80c;
              color: #fff;
            }
            #map .plane,
            #map .biu,
            #map .enemy,
            #map .boom,
            #map .boom2 {
              position: absolute;
            }
            #map .plane {
              z-index: 8;
            }
            #map .biu {
              z-index: 10;
            }
            #map .boom2 {
              z-index: 11;
              animation: bling 2s 1;
              animation-fill-mode: forwards;
            }
            #map .enemy {
              z-index: 9;
            }
            #map .boom {
              z-index: 7;
              animation: fade 0.8s 1;
              animation-fill-mode: forwards;
            }
            @keyframes fade {
              from {
                opacity: 1;
              }
              to {
                opacity: 0;
              }
            }
            @keyframes bling {
              0% {
                opacity: 1;
              }
              20% {
                opacity: 0;
              }
              40% {
                opacity: 1;
              }
              60% {
                opacity: 0;
              }
              80% {
                opacity: 1;
              }
              100% {
                opacity: 0;
              }
            }
            #score {
              display: none;
              position: absolute;
              top: 10px;
              left: 10px;
              color: #fff;
              line-height: 20px;
              font-size: 14px;
              font-weight: bold;
              z-index: 20;
            }
            #restart {
              display: none;
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              z-index: 30;
            }
            #restart p {
              width: 300px;
              height: 40px;
              line-height: 20px;
              margin: 140px auto;
              color: #fff;
              text-align: center;
            }
            #restart p span {
              font-weight: bolder;
              font-size: 22px;
              text-align: center;
            }
            #restart .p1 span {
              color: red;
              font-size: 30px;
            }
            #restart .p2 span {
              color: #ffa80c;
            }
            #restart .p3 {
              font-size: 20px;
              width: 100px;
              height: 35px;
              background: rgb(255, 255, 255);
              background: rgba(255, 255, 255, 0.8);
              color: #000;
              font-weight: bolder;
              line-height: 35px;
              text-align: center;
              border-radius: 3px;
              cursor: pointer;
            }
            #restart .p3:hover {
              background: white;
            }
          </style>
        </head>
        <body>
          <div id="box">
            <div id="level">
              <h1>星空飞机大战</h1>
              <p>开始</p>
            </div>
            <div id="map">
              <div id="BiuAll"></div>
            </div>
            <div id="score">0</div>
            <div id="restart">
              <p class="p1">得分：<span>0</span></p>
              <p class="p3">再来一局</p>
            </div>
          </div>
          <script>
            //全局变量
            var oBox = document.getElementById("box"),
              oScore = document.getElementById("score"),
              oRe = document.getElementById("restart"),
              oLevel = document.getElementById("level"),
              oMap = document.getElementById("map"),
              oBiuAll = document.getElementById("BiuAll"),
              allBiu = oBiuAll.children,
              allReChild = oRe.children,
              boxOffsetTop = oBox.offsetTop,
              boxOffsetLeft = oBox.offsetLeft;
            //启动
            exe();
            //初始选择难度界面的点击事件
            function exe() {
              //难度选择
              var aP = oLevel.getElementsByTagName("p");
              for (var i = 0, length = aP.length; i < length; i++) {
                (function (i) {
                  aP[i].onclick = function (e) {
                    e = e || window.event;
                    startGame(i, {
                      x: e.clientX - boxOffsetLeft,
                      y: e.clientY - boxOffsetTop,
                    }); //第一个实参为序号 ，第二个实参为存储着鼠标距离map边缘距离的json
                  };
                })(i);
              }
      
              //restart按钮
              console.log(allReChild);
              allReChild[1].onclick = function (ev) {
                cancelAnimationFrame(oMap.bgTimer); //停止背景滚动
                oRe.style.display = "none";
                oLevel.style.display = "block";
                oScore.innerHTML = 0;
                oMap.innerHTML = "<div id='BiuAll'></div>";
                oBiuAll = document.getElementById("BiuAll");
                allBiu = oBiuAll.children;
              };
            }
      
            //开始游戏
            function startGame(level, pos) {
              clearMap(); //执行 隐藏和清理
              MapBg(level); //执行 Map背景相关操作
              var p = plane(level, pos); //执行 创建我军
              enemy(level, p); //执行 创建敌军
              //enemy(level , plane(level , pos));
              oBox.score = 0; //得分清零
            }
      
            //隐藏和清理
            function clearMap() {
              oScore.style.display = "block";
              oLevel.style.display = "none"; //隐藏关卡选择框
            }
      
            //Map背景选择与运动
            function MapBg(level) {
              oMap.style.backgroundImage = "url('http://152.136.42.252:8571/static/media/bg_" + (level + 1) + ".png')";
      
              (function m() {
                oMap.bgPosY = oMap.bgPosY || 0;
                oMap.bgPosY++;
                oMap.style.backgroundPositionY = oMap.bgPosY + "px";
                oMap.bgTimer = requestAnimationFrame(m);
              })();
            }
      
            //创建我军
            function plane(level, pos) {
              //创建我军图片
              var oImg = new Image(); //document.createElement("img");
              oImg.src = "http://152.136.42.252:8571/static/media/myplane.png";
              oImg.width = 70;
              oImg.height = 70;
              oImg.className = "plane";
              oImg.style.left = pos.x - oImg.width / 2 + "px";
              oImg.style.top = pos.y - oImg.height / 2 + "px";
              oMap.appendChild(oImg);
      
              //边界值
              var leftMin = -oImg.width / 2,
                leftMax = oMap.clientWidth - oImg.width / 2,
                topMin = 0,
                topMax = oMap.clientHeight - oImg.height / 2;
      
              //加入mousemove事件
              document.onmousemove = function (ev) {
                ev = ev || window.event;
                //获取飞机实时坐标，并限制边界值
                var left = ev.clientX - boxOffsetLeft - oImg.width / 2;
                var top = ev.clientY - boxOffsetTop - oImg.height / 2;
                left = Math.max(leftMin, left);
                left = Math.min(leftMax, left);
                top = Math.max(topMin, top);
                top = Math.min(topMax, top);
                //赋值
                oImg.style.left = left + "px";
                oImg.style.top = top + "px";
              };
      
              //调用子弹函数
              fire(oImg, level);
      
              return oImg;
            }
      
            //我军子弹
            function fire(oImg, level) {
              oBox.biuInterval = setInterval(function () {
                if (oBox.score >= 500) {
                  createBiu(true, -1);
                  createBiu(true, 1);
                } else {
                  createBiu();
                }
              }, [100, 200, 200, 15][level]);
      
              function createBiu(index, d) {
                //创建子弹
                var oBiu = new Image();
                oBiu.src = "http://152.136.42.252:8571/static/media/fire.png";
                oBiu.width = 30;
                oBiu.height = 30;
                oBiu.className = "biu";
      
                var left = oImg.offsetLeft + oImg.width / 2 - oBiu.width / 2;
                var top = oImg.offsetTop - oBiu.height + 5;
      
                if (index) {
                  left += oBiu.width * d;
                }
      
                oBiu.style.left = left + "px";
                oBiu.style.top = top + "px";
      
                oBiuAll.appendChild(oBiu);
      
                //子弹运动
                function m() {
                  if (oBiu.parentNode) {
                    var top = oBiu.offsetTop - 20;
                    if (top < -oBiu.height) {
                      oBiuAll.removeChild(oBiu);
                    } else {
                      oBiu.style.top = top + "px";
                      requestAnimationFrame(m);
                    }
                  }
                }
                //将运动执行队列放后面，不然子弹会直接初始就在 top-50 的位置
                setTimeout(function () {
                  requestAnimationFrame(m);
                }, 50);
              }
            }
      
            //创建敌军
            function enemy(level, oPlane) {
              var w = oMap.clientWidth,
                h = oMap.clientHeight;
      
              var speed = [5, 6, 8, 8][level]; //敌军下落速度
      
              var num = 1;
              oBox.enemyIntetval = setInterval(function () {
                var index = num % 30 ? 1 : 0;
      
                //生成敌军
                var oEnemy = new Image();
                oEnemy.index = index;
                oEnemy.HP = [20, 1][index];
                oEnemy.speed = speed + (Math.random() * 0.6 - 0.3) * speed;
                oEnemy.speed *= index ? 1 : 0.5;
                oEnemy.src = "http://152.136.42.252:8571/static/media/enemy_" + ["big", "small"][index] + ".png";
                oEnemy.className = "enemy";
                oEnemy.width = [104, 54][index];
                oEnemy.height = [80, 40][index];
                oEnemy.style.left = Math.random() * w - oEnemy.width / 2 + "px";
                oEnemy.style.top = -oEnemy.height + "px";
                oMap.appendChild(oEnemy);
                num++;
      
                //敌军运动
                function m() {
                  if (oEnemy.parentNode) {
                    var top = oEnemy.offsetTop;
                    top += oEnemy.speed;
                    if (top >= h) {
                      oBox.score--; //漏掉飞机减分
                      oScore.innerHTML = oBox.score;
                      oMap.removeChild(oEnemy);
                    } else {
                      oEnemy.style.top = top + "px";
                      //子弹碰撞检测
                      for (var i = allBiu.length - 1; i >= 0; i--) {
                        var objBiu = allBiu[i];
                        if (coll(oEnemy, objBiu)) {
                          oBiuAll.removeChild(objBiu); //移除子弹
                          oEnemy.HP--;
                          if (!oEnemy.HP) {
                            oBox.score += oEnemy.index ? 2 : 20; //打掉飞机加分
                            oScore.innerHTML = oBox.score;
                            boom(
                              oEnemy.offsetLeft,
                              oEnemy.offsetTop,
                              oEnemy.width,
                              oEnemy.height,
                              index ? 0 : 2
                            ); //敌军爆炸图
                            oMap.removeChild(oEnemy); //移除敌军
                            return;
                          }
                        }
                      }
                      //我军碰撞检测
                      if (oPlane.parentNode && coll(oEnemy, oPlane)) {
                        boom(
                          oEnemy.offsetLeft,
                          oEnemy.offsetTop,
                          oEnemy.width,
                          oEnemy.height,
                          index ? 0 : 2
                        ); //敌军爆炸图
                        boom(
                          oPlane.offsetLeft,
                          oPlane.offsetTop,
                          oPlane.width,
                          oPlane.height,
                          1
                        ); //我军爆炸图
                        oMap.removeChild(oEnemy); //移除敌军
                        oMap.removeChild(oPlane); //移除我军
                        GameOver();
                        return;
                      }
                      requestAnimationFrame(m);
                    }
                  }
                }
                requestAnimationFrame(m);
              }, [350, 150, 120, 40][level]);
            }
      
            //爆炸函数
            function boom(l, t, w, h, i) {
              var oBoom = new Image();
              oBoom.src = "http://152.136.42.252:8571/static/media/" + ["boom_small", "myplane", "boom_big"][i] + ".png";
              oBoom.className = "boom" + ["", "2", ""][i];
              oBoom.width = w;
              oBoom.height = h;
              oBoom.style.left = l + "px";
              oBoom.style.top = t + "px";
              oMap.appendChild(oBoom);
              setTimeout(function () {
                oBoom.parentNode && oMap.removeChild(oBoom);
              }, [1200, 2500, 1200][i]);
            }
      
            //两个物体 碰撞检测
            function coll(obj1, obj2) {
              var T1 = obj1.offsetTop,
                B1 = T1 + obj1.clientHeight,
                L1 = obj1.offsetLeft,
                R1 = L1 + obj1.clientWidth;
      
              var T2 = obj2.offsetTop,
                B2 = T2 + obj2.clientHeight,
                L2 = obj2.offsetLeft,
                R2 = L2 + obj2.clientWidth;
      
              return !(B1 < T2 || R1 < L2 || T1 > B2 || L1 > R2);
            }
      
            //游戏结束
            function GameOver() {
              document.onmousemove = null; //清除移动事件
              clearInterval(oBox.biuInterval); //不再产生新子弹
              clearInterval(oBox.enemyIntetval); //不再产生新敌军
              restart();
            }
      
            //结算+重新开始
            function restart() {
              oScore.style.display = "none";
              var s = oBox.score;
              oRe.style.display = "block";
              allReChild[0].children[0].innerHTML = s;
            }
          </script>
        </body>
      </html>
      `,
  },
  {
    id: 15,
    title: "立体文字",
    code: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>让文字立起来</title>
          <style>
            * {
              padding: 0;
              margin: 0;
            }
            .container {
              height: 100vh;
              width: 100vw;
              background-color: gray;
              display: flex;
              padding: 100px 0px;
              box-sizing: border-box;
              justify-content: center;
              z-index: -1;
            }
            .container h1 {
              font-size: 100px;
              font-weight: 700;
              color: #f5f5f5;
              position: relative;
              z-index: 1;
            }
            .container h1::before {
              content: "DARKNESS";
              position: absolute;
              color: #000000;
              transform: translate(-57px, 24px) scaleY(0.5) skew(50deg);
              z-index: -1;
              filter: blur(7px);
              -webkit-mask-image: linear-gradient(transparent, #000, #000);
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>DARKNESS</h1>
          </div>
        </body>
      </html>
      `,
  },
  {
    id: 16,
    title: "磨砂玻璃效果",
    code: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>磨砂玻璃效果</title>
          <style>
              *{
                  padding: 0;
                  margin: 0;
              }
              .wrap{
                  height: 100vh;
                  width: 100vw;
                  background: linear-gradient(to right,purple, orangered, yellow);
                  padding: 100px 0px;
                  box-sizing: border-box;
                  display: flex;
                  justify-content: center;
              }
              .wrap h1{
                  color: #f5f5f5;
                  font-size: 50px;
                  letter-spacing: 3px;
              }
              .modal{
                  width: 180px;
                  height: 120px;
                  background: rgba(225, 225, 225, 0.4);
                  position: absolute;
                  transform: translate(0%,-20%);
                  border-radius: 5px;
                  /* 核心代码  加背景模糊滤镜 */
                  backdrop-filter: blur(5px);
              }
          </style>
      </head>
      <body>
          <div class="wrap">
              <h1>磨砂玻璃效果</h1>
              <div class="modal" draggable="true"></div>
          </div>
      </body>
      </html>`,
  },
  {
    id: 17,
    title: "给图片加滤镜",
    code: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>给图片加滤镜</title>
          <style>
              *{
                  padding: 0;
                  margin: 0;
              }
              .wrap{
                  width: 100vw;
                  height: 100vh;
              }
              .wrap img{
                  width: 100%;
                  height: 100%;
                  
              }
              .wrap .modal{
                  position: fixed;
                  width: 100%;
                  height: 100%;
                  top: 0;
                  right: 0;
                  border-left: 5px solid #333;
                  transition: 2s;
                  backdrop-filter: grayscale(1);
              }
              body:hover .modal{
                  width: 0;
              }
          </style>
      </head>
      <body>
          <div class="wrap">
              <img src="https://img2.baidu.com/it/u=924375860,277152498&fm=253&fmt=auto&app=138&f=JPEG?w=862&h=500" alt="图片">
              <div class="modal"></div>
          </div>
      </body>
      </html>`,
  },
  {
    id: 18,
    title: "动画线实现滚动条",
    code: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <title>Scroll-driven animation</title>
          <style>
            .warning {
              box-sizing: border-box;
              padding: 1em;
              margin: 1em 0;
              border: 1px solid #ccc;
              background: rgba(255 255 205 / 0.8);
            }
      
            @supports (animation-timeline: scroll()) {
              .warning {
                display: none;
              }
            }
      
            .container {
              position: relative;
              margin: 20px auto;
              width: 500px;
              border: 1px dashed #999;
              padding-top: 4px;
            }
      
            .pics {
              display: flex;
              overflow-x: scroll;
              flex-direction: row;
            }
      
            .progress {
              position: absolute;
              top: 0;
              left: 0;
              height: 8px;
              background: linear-gradient(
                to right,
                rgb(18, 194, 233),
                rgb(196, 113, 237),
                rgb(246, 79, 89)
              );
              width: 100%;
              transform: scaleX(calc(1 / var(--num-images)));
              transform-origin: 0 50%;
            }
      
            .pic {
              height: 200px;
              width: 500px;
              flex-shrink: 0;
              display: flex;
              align-items: center;
              justify-content: center;
            }
      
            @supports (animation-timeline: scroll()) {
              @keyframes progress-grow {
                to {
                  transform: scaleX(1);
                }
              }
      
              .pics {
                scroll-timeline-name: --pics-scroll;
                scroll-timeline-axis: x;
              }
      
              .progress {
                animation: auto progress-grow linear forwards;
                animation-timeline: --pics-scroll;
              }
            }
          </style>
        </head>
        <body>
          <div class="warning">
            <p>
              ⚠️ Your browser does not support Scroll-driven Animations. Please use
              Chrome 115 or newer.
            </p>
          </div>
          <div class="container" style="--num-images: 5;">
            <div class="pics">
              <div class="progress"></div>
              <div class="pic">Pic-1</div>
              <div class="pic">Pic-2</div>
              <div class="pic">Pic-3</div>
              <div class="pic">Pic-4</div>
              <div class="pic">Pic-5</div>
            </div>
          </div>
        </body>
      </html>`,
  },
  {
    id: 19,
    title: "银河系",
    code: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>银河系</title>
          <style>
            * {
              margin: 0;
              padding: 0;
            }
      
            html,
            body {
              overflow: hidden;
            }
      
            /* 面板设置 */
            .lil-gui.autoPlace {
              width: 220px;
              right: 0 !important;
            }
      
            .back-home {
              width: 80px;
              height: 75px;
              position: fixed;
              left: 0;
              bottom: 1px;
              z-index: 1;
              cursor: pointer;
            }
            .back-home a {
              display: inline-block;
              width: 80px;
              height: 75px;
              text-align: center;
              text-decoration: none;
            }
      
            .back-home a img {
              width: 100%;
              height: 50px;
            }
            .back-home a span {
              width: 100%;
              height: 25px;
              line-height: 25px;
            }
            .back-home:hover {
              background-color: #6f73ef;
              border: 1px solid #fff;
            }
      
            .webgl {
              position: fixed;
              top: 0;
              left: 0;
              outline: none;
            }
            main {
              display: block;
            }
            h1 {
              font-size: 2em;
              margin: 0.67em 0;
            }
            hr {
              box-sizing: content-box;
              height: 0;
              overflow: visible;
            }
            pre {
              font-family: monospace, monospace;
              font-size: 1em;
            }
            a {
              background-color: transparent;
              text-decoration: none;
              color: rgb(23, 174, 234);
            }
            a:hover {
              color: rgb(236, 75, 236);
            }
            abbr[title] {
              border-bottom: none;
              text-decoration: underline;
              text-decoration: underline dotted;
            }
            b,
            strong {
              font-weight: bolder;
            }
            code,
            kbd,
            samp {
              font-family: monospace, monospace;
              font-size: 1em;
            }
            small {
              font-size: 80%;
            }
            sub,
            sup {
              font-size: 75%;
              line-height: 0;
              position: relative;
              vertical-align: baseline;
            }
            sub {
              bottom: -0.25em;
            }
      
            sup {
              top: -0.5em;
            }
            img {
              border-style: none;
            }
            button,
            input,
            optgroup,
            select,
            textarea {
              font-family: inherit;
              font-size: 100%;
              line-height: 1.15;
              margin: 0;
            }
            button,
            input {
              overflow: visible;
            }
            button,
            select {
              text-transform: none;
            }
            button,
            [type="button"],
            [type="reset"],
            [type="submit"] {
              -webkit-appearance: button;
            }
            button::-moz-focus-inner,
            [type="button"]::-moz-focus-inner,
            [type="reset"]::-moz-focus-inner,
            [type="submit"]::-moz-focus-inner {
              border-style: none;
              padding: 0;
            }
            button:-moz-focusring,
            [type="button"]:-moz-focusring,
            [type="reset"]:-moz-focusring,
            [type="submit"]:-moz-focusring {
              outline: 1px dotted ButtonText;
            }
            fieldset {
              padding: 0.35em 0.75em 0.625em;
            }
            legend {
              box-sizing: border-box;
              color: inherit;
              display: table;
              max-width: 100%;
              padding: 0;
              white-space: normal;
            }
            progress {
              vertical-align: baseline;
            }
            textarea {
              overflow: auto;
            }
            [type="checkbox"],
            [type="radio"] {
              box-sizing: border-box;
              padding: 0;
            }
            [type="number"]::-webkit-inner-spin-button,
            [type="number"]::-webkit-outer-spin-button {
              height: auto;
            }
            [type="search"] {
              -webkit-appearance: textfield;
              outline-offset: -2px;
            }
            [type="search"]::-webkit-search-decoration {
              -webkit-appearance: none;
            }
            ::-webkit-file-upload-button {
              -webkit-appearance: button;
              font: inherit;
            }
            details {
              display: block;
            }
            summary {
              display: list-item;
            }
            template {
              display: none;
            }
            [hidden] {
              display: none;
            }
          </style>
        </head>
      
        <body>
          <canvas class="webgl"></canvas>
          <div class="back-home">
            <a href="http://101.132.190.14/" target="_blank">
              <img
                src="https://product.vrteam.top/examples/assets/img/backhome/home.svg"
                alt=""
              />
              <span>回到主页</span>
            </a>
          </div>
        </body>
        <script type="importmap">
          {
          "imports": {
            "three": "https://unpkg.com/three@0.148.0/build/three.module.js",
            "three/addons/": "https://unpkg.com/three@0.148.0/examples/jsm/"
          }
          }
        </script>
        <script type="module">
          import * as THREE from "three";
          import { OrbitControls } from "three/addons/controls/OrbitControls.js";
          import Stats from "three/addons/libs/stats.module.js";
          import { GUI } from "three/addons/libs/lil-gui.module.min.js";
      
          let canvas;
          let scene, camera, renderer;
          let stats, controls, gui;
      
          //像素比
          const sizes = {
            width: window.innerWidth,
            height: window.innerHeight,
          };
      
          //初始化操作
          let init = () => {
            // 获取dom元素
            canvas = document.querySelector(".webgl");
      
            // 场景初始化
            scene = new THREE.Scene();
      
            // 添加环境光
            const light = new THREE.AmbientLight(0xdeedff, 1.5);
            scene.add(light);
      
            let pointLight = new THREE.PointLight(0xffffff);
            pointLight.position.set(0, 2, 0);
            scene.add(pointLight);
      
            pointLight = new THREE.PointLight(0xffffff);
            pointLight.position.set(2, 0, 0);
            scene.add(pointLight);
      
            pointLight = new THREE.PointLight(0xffffff);
            pointLight.position.set(0, 0, -2);
            scene.add(pointLight);
      
            //相机
            camera = new THREE.PerspectiveCamera(
              45,
              sizes.width / sizes.height,
              1,
              1000
            );
            camera.position.set(6, 5, 6);
            camera.lookAt(scene.position);
      
            //渲染器
            renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
            renderer.setSize(sizes.width, sizes.height);
            // renderer.setClearColor('lightsalmon', 0.5)
            renderer.setPixelRatio(window.devicePixelRatio);
      
            //控制器
            controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.autoRotate = true;
            controls.autoRotateSpeed = 10;
      
            //帧率检测
            stats = new Stats();
            document.body.appendChild(stats.domElement);
          };
          // 自适应屏幕
          let onWindowsResize = () => {
            sizes.width = window.innerWidth;
            sizes.height = window.innerHeight;
            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();
            renderer.setSize(sizes.width, sizes.height);
            renderer.setPixelRatio(window.devicePixelRatio);
          };
      
          //双击全屏
          let onWindowsScreen = () => {
            let isFullScreen = document.fullscreenElement;
            if (!isFullScreen) {
              renderer.domElement.requestFullscreen();
            } else {
              document.exitFullscreen();
            }
          };
      
          let expandFunction = () => {
            window.addEventListener("resize", onWindowsResize);
            window.addEventListener("dblclick", onWindowsScreen);
          };
      
          // 创建粒子
          let params = {
            count: 50000,
            size: 0.01,
            radius: 5,
            branches: 3,
            spin: 1,
            randomness: 0.2,
            randomnessPower: 3,
            insideColor: "#ff6030",
            outsideColor: "#1b3984",
          };
          let geometry = null;
          let material = null;
          let particles = null;
      
          let createGalaxy = () => {
            // 清空之前的粒子
            if (particles !== null) {
              geometry.dispose();
              material.dispose();
              scene.remove(particles);
            }
      
            geometry = new THREE.BufferGeometry();
            material = new THREE.PointsMaterial({
              size: params.size,
              sizeAttenuation: true,
              blending: THREE.AdditiveBlending,
              vertexColors: true,
            });
            const vertexPoints = [];
            const vertexColors = [];
      
            const colorInside = new THREE.Color(params.insideColor);
            const colorOutside = new THREE.Color(params.outsideColor);
      
            for (let i = 0; i < params.count; i++) {
              const i3 = i * 3;
              const radius = Math.random() * params.radius;
              const branchAngle =
                ((i % params.branches) / params.branches) * Math.PI * 2;
              const spinAngle = radius * params.spin;
      
              // 不能凸显内部距离
              /*         const randomX = (Math.random() - 0.5) * params.randomness
                      const randomY = (Math.random() - 0.5) * params.randomness
                      const randomZ = (Math.random() - 0.5) * params.randomness */
      
              const randomX =
                Math.pow(Math.random(), params.randomnessPower) *
                (Math.random() < 0.5 ? 1 : -1) *
                params.randomness *
                radius;
              const randomY =
                Math.pow(Math.random(), params.randomnessPower) *
                (Math.random() < 0.5 ? 1 : -1) *
                params.randomness *
                radius;
              const randomZ =
                Math.pow(Math.random(), params.randomnessPower) *
                (Math.random() < 0.5 ? 1 : -1) *
                params.randomness *
                radius;
      
              vertexPoints[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
              vertexPoints[i3 + 1] = randomY;
              vertexPoints[i3 + 2] =
                Math.sin(branchAngle + spinAngle) * radius + randomZ;
              // console.log(vertexPoints[i3],vertexPoints[i3 + 2]);
      
              const mixedColor = colorInside.clone();
              mixedColor.lerp(colorOutside, radius);
              vertexColors[i3] = mixedColor.r;
              vertexColors[i3 + 1] = mixedColor.g;
              vertexColors[i3 + 2] = mixedColor.b;
            }
      
            const points = new THREE.Float32BufferAttribute(vertexPoints, 3);
            const colors = new THREE.Float32BufferAttribute(vertexColors, 3);
            geometry.attributes.position = points;
            geometry.attributes.color = colors;
      
            particles = new THREE.Points(geometry, material);
            particles.name = "galaxy";
            scene.add(particles);
          };
      
          // 添加gui
          let createGui = () => {
            gui = new GUI();
            gui.add(params, "count", 1000, 100000, 1).onFinishChange(createGalaxy);
            gui.add(params, "size", 0.01, 0.03, 0.001).onFinishChange(createGalaxy);
            gui.add(params, "radius", 5, 10, 1).onFinishChange(createGalaxy);
            gui.add(params, "branches", 3, 10, 1).onFinishChange(createGalaxy);
            gui.add(params, "spin", -5, 5, 0.001).onFinishChange(createGalaxy);
            gui.add(params, "randomness", 0, 2, 0.001).onFinishChange(createGalaxy);
            gui
              .add(params, "randomnessPower", 1, 10, 0.001)
              .onFinishChange(createGalaxy);
            gui.addColor(params, "insideColor").onFinishChange(createGalaxy);
            gui.addColor(params, "outsideColor").onFinishChange(createGalaxy);
          };
      
          const clock = new THREE.Clock();
          let animate = () => {
            const elapsedTime = clock.getElapsedTime();
      
            // for (let i = 0; i < params.count * 3; i++){
            //     const i3 = i * 3
            //     const x = particles.geometry.attributes.position.array[i3]
            //     particles.geometry.attributes.position.array[i3 + 2] = Math.sin(x + 2 * elapsedTime)
            // }
            // particles.geometry.attributes.position.needsUpdate=true
            controls.update();
            stats.update();
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
          };
      
          init();
          createGalaxy();
          createGui();
          animate();
          expandFunction();
        </script>
      </html>
      `,
  },
  {
    id: 20,
    title: "一起来看流星",
    code: `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>一起来看流星雨</title>
          <meta name="keywords" content="" />
          <meta name="description" content="" />
          <style>
            * {
              margin: 0;
              padding: 0;
            }
            html,
            body {
              height: 100%;
            }
            .chest {
              width: 500px;
              height: 500px;
              position: relative;
            }
            .heart {
              position: absolute;
              z-index: 2;
              background: linear-gradient(-90deg, #f50a45 0%, #d5093c 40%);
              animation: beat 0.7s ease 0s infinite;
            }
            .heart.center {
              background: linear-gradient(-45deg, #b80734 0%, #d5093c 40%);
            }
            .heart.top {
              z-index: 3;
            }
            .side {
              /* top: 100px; */
              width: 220px;
              height: 220px;
              border-radius: 110px;
            }
            .center {
              width: 210px;
              height: 210px;
              bottom: 110px;
              left: 145px;
              top: 90px;
              transform: rotate(45deg);
            }
            .left {
              left: 62px;
            }
            .right {
              right: 62px;
            }
            @keyframes beat {
              0% {
                transform: scale(1) rotate(225deg);
                box-shadow: 0 0 40px #d5093c;
              }
              50% {
                transform: scale(1.1) rotate(225deg);
                box-shadow: 0 0 70px #d5093c;
              }
              100% {
                transform: scale(1) rotate(225deg);
                box-shadow: 0 0 40px #d5093c;
              }
            }
            #canvas {
              background: #000;
              display: block;
            }
          </style>
        </head>
        <body>
          <div class="chest">
            <div class="heart left side top"></div>
            <div class="heart center"></div>
            <div class="heart right side"></div>
            <canvas id="canvas">您的浏览器版本过低，请更换浏览器！</canvas>
          </div>
      
          <script>
            var can = document.getElementById("canvas");
            var ctx = can.getContext("2d");
            var w = (can.width = window.innerWidth);
            var h = (can.height = window.innerHeight);
      
            var count = 30;
            var drops = [];
            window.onresize = function () {
              w = can.width = window.innerWidth;
              h = can.height = window.innerHeight;
            };
            function Drop() {}
            Drop.prototype = {
              init: function () {
                this.x = random(0, w);
                this.y = 0;
                this.r = 1;
                this.color = "#0ff";
                this.vy = random(4, 5);
                this.vr = 1;
                this.a = 1;
                this.va = 0.96;
                this.l = random(h * 0.8, h * 0.9);
              },
              draw: function () {
                if (this.y > this.l) {
                  ctx.beginPath();
                  ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
                  ctx.strokeStyle = "rgba(0,255,255," + this.a + ")";
                  ctx.stroke();
                } else {
                  ctx.fillStyle = color(this.a);
                  ctx.fillRect(this.x, this.y, 2, 10);
                }
                this.update();
              },
              update: function () {
                if (this.y < this.l) {
                  this.y += this.vy;
                } else {
                  if (this.a > 0.03) {
                    this.r += this.vr;
                    if (this.r > 50) {
                      this.a *= this.va;
                    }
                  } else {
                    this.init();
                  }
                }
              },
            };
            function move() {
              ctx.fillStyle = "rgba(0,0,0,.1)";
              ctx.fillRect(0, 0, w, h);
              for (var i = 0; i < drops.length; i++) {
                drops[i].draw();
              }
              requestAnimationFrame(move); //调用经动画，递归,请求动画帧
            }
            function setup() {
              for (var i = 0; i < count; i++) {
                (function (j) {
                  setTimeout(function () {
                    var drop = new Drop();
                    drop.init();
                    drops.push(drop);
                  }, j * 200);
                })(i);
              }
            }
            function random(min, max) {
              return Math.random() * (max - min) + min;
            }
            function color(a) {
              var r = Math.floor(Math.random() * 255);
              var g = Math.floor(Math.random() * 255);
              var b = Math.floor(Math.random() * 255);
              return "rgba(" + r + "," + g + "," + b + "," + a + ")";
            }
            setup();
            move();
          </script>
        </body>
      </html>
      `,
  },
  {
    id: 21,
    title: "旋转通道",
    code: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>旋转通道</title>
          <!-- <link rel="stylesheet" href="index.css" /> -->
          <style>
            body {
              /* background-color:rgb(60,60,70); */
              /* background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%); */
              background-image: linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%);
              overflow: hidden; /*隐藏超出页面元素*/
            }
            .content {
              /*大盒子整体布局*/
              width: 100%;
              height: 100%;
              position: relative;
              display: flex;
              justify-content: center;
              align-items: center;
              top: 300px;
              perspective: 100px;
            }
      
            .rotate {
              /*旋转体样式*/
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 180px;
              height: 180px;
            }
            .rotate span {
              position: absolute;
              display: flex;
              justify-content: center;
              align-items: center;
              overflow: hidden;
              /* background-color: rgb(100,100,90); */
              background-image: linear-gradient(to top, #9890e3 0%, #b1f4cf 100%);
              border-radius: 50%;
              /* 这里设置span的大小 */
              top: calc(var(--i) * 16px);
              left: calc(var(--i) * 16px);
              right: calc(var(--i) * 16px);
              bottom: calc(var(--i) * 16px);
              /* 设置阴影 */
              /* box-shadow: inset 0 0 3px rgba(0,0,0,.5),inset 0 0 3px #000; */
              animation: rotation 3s infinite cubic-bezier(0.7, -0.3, 0.3, 1.4);
              animation-delay: calc(var(--i) * 0.07s);
            }
            @keyframes rotation {
              0% {
                transform: rotateZ(0deg);
              }
              100% {
                transform: rotateZ(360deg);
              }
            }
            .rotate span::after {
              content: "BY/CXY";
              font: 700 20px "";
              color: blanchedalmond;
            }
      
            .time_tunnel {
              /*穿行通道样式*/
              width: 1000px;
              height: 500px;
              position: absolute;
              border-radius: 50px;
              border: 35px #495feb solid;
              box-shadow: inset 0 0 10px rgb(150, 20, 100);
              animation: animate 10s ease-in-out infinite both;
              animation-delay: calc(var(--num) * 0.5s);
            }
            @keyframes animate {
              0% {
                opacity: 0;
                transform: translateZ(-100px) scale(0.6);
              }
              100% {
                opacity: 1;
                transform: translateZ(200px) scale(1);
              }
            }
          </style>
        </head>
      
        <body>
          <div class="content">
            <div class="rotate">
              <span style="--i: 1"></span>
              <span style="--i: 2"></span>
              <span style="--i: 3"></span>
              <span style="--i: 4"></span>
              <span style="--i: 5"></span>
            </div>
            <div class="time_tunnel" style="--num: 1"></div>
            <div class="time_tunnel" style="--num: 2"></div>
            <div class="time_tunnel" style="--num: 3"></div>
            <div class="time_tunnel" style="--num: 4"></div>
            <div class="time_tunnel" style="--num: 5"></div>
            <div class="time_tunnel" style="--num: 6"></div>
            <div class="time_tunnel" style="--num: 7"></div>
            <div class="time_tunnel" style="--num: 8"></div>
            <div class="time_tunnel" style="--num: 9"></div>
            <div class="time_tunnel" style="--num: 10"></div>
            <div class="time_tunnel" style="--num: 11"></div>
            <div class="time_tunnel" style="--num: 12"></div>
            <div class="time_tunnel" style="--num: 13"></div>
            <div class="time_tunnel" style="--num: 14"></div>
            <div class="time_tunnel" style="--num: 15"></div>
            <div class="time_tunnel" style="--num: 16"></div>
            <div class="time_tunnel" style="--num: 17"></div>
            <div class="time_tunnel" style="--num: 18"></div>
            <div class="time_tunnel" style="--num: 19"></div>
            <div class="time_tunnel" style="--num: 20"></div>
          </div>
      
          <!-- <audio autoplay>
            <source
              src="http://rq7epaebg.hn-bkt.clouddn.com/byte%20dance%20resource/a7i-tomorrow.mp3"
              type="audio/mp3"
            />
          </audio> -->
        </body>
      </html>
      `,
  },
  {
    id: 22,
    title: "旋转礼盒",
    code: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>旋转礼盒</title>
          <style>
            body,
            p {
              margin: 0;
              padding: 0;
              background-color: #000;
              overflow: hidden;
            }
            .skeleton {
              width: 300px;
              height: 300px;
              margin: 88px auto;
              perspective: 1200px;
              transform: translateZ(0px);
            }
            /*外部立方体核心 */
            .cube {
              position: relative;
              width: 100%;
              height: 100%;
              transform-style: preserve-3d;
              animation-name: cube;
              animation-duration: 3s;
              animation-iteration-count: infinite;
              transition-timing-function: linear;
            }
            .common {
              position: absolute;
              width: 100%;
              height: 100%;
              background-image: url("https://s1.ax1x.com/2023/02/12/pS5gd78.jpg");
              background-size: cover;
              border: 2px solid #e66d50;
              transition-duration: 3s;
              transition-delay: 1s;
            }
            .top {
              top: -150px;
              left: 0;
              transform: rotateX(90deg);
            }
            .bottom {
              top: 150px;
              left: 0;
              transform: rotateX(-90deg);
            }
            .left {
              top: 0;
              left: -150px;
              transform: rotateY(-90deg);
            }
            .right {
              top: 0;
              left: 150px;
              transform: rotateY(90deg);
            }
            .front {
              transform: translateZ(150px);
            }
            .behind {
              transform: translateZ(-150px);
            }
            /*外部立方体鼠标hover开始  */
            .skeleton:hover .cube {
              cursor: pointer;
              animation-play-state: paused;
            }
            .skeleton:hover .common {
              box-shadow: 0 0 500px #e66d50;
            }
            .skeleton:hover .con {
              box-shadow: 0 0 500px #0abab5;
            }
            .skeleton:hover .cube > .top {
              transform: translateY(-500px) translateX(200px) rotateX(90deg);
            }
            .skeleton:hover .cube > .front {
              transform-origin: bottom;
              transform: translateZ(150px) rotateX(-90deg);
            }
            .skeleton:hover .cube > .behind {
              transform-origin: bottom;
              transform: translateZ(-150px) rotateX(90deg);
            }
            .skeleton:hover .cube > .left {
              transform-origin: bottom;
              transform: rotateY(-90deg) rotateX(-90deg);
            }
            .skeleton:hover .cube > .right {
              transform-origin: bottom;
              transform: rotateY(90deg) rotateX(-90deg);
            }
            /*外部立方体动画帧  */
            @keyframes cube {
              0% {
                transform: rotateY(0deg);
              }
              100% {
                transform: rotateY(360deg);
              }
            }
            /* 内部立方体 */
            .skeleton .smallcube {
              position: relative;
              width: 200px;
              height: 200px;
              z-index: -1;
              transition-duration: 2s;
              transform-style: preserve-3d;
              animation-name: smallcube;
              animation-duration: 6s;
              animation-iteration-count: infinite;
              transition-timing-function: linear;
              transform: translateX(50px) translateY(-200px) translateZ(-600px)
                rotateY(0deg);
            }
            .con {
              position: absolute;
              width: 100%;
              height: 100%;
              border: 1px solid #1b8cb6;
              box-shadow: 0 0 50px #fff inset;
              transform-style: preserve-3d;
              background-image: url("https://s1.ax1x.com/2023/02/12/pS5IgT1.jpg");
            }
            .smallbottom {
              top: 100px;
              left: 0;
              transform: rotateX(-90deg);
            }
            .smallleft {
              top: 0px;
              left: -100px;
              transform: rotateY(-90deg);
            }
            .smallright {
              top: 0px;
              left: 100px;
              transform: rotateY(90deg);
            }
            .smallfront {
              transform: translateZ(100px);
            }
            .smallbehind {
              transform: translateZ(-100px);
            }
            /* 内部立方体动画帧开始*/
            @keyframes smallcube {
              0% {
                transform: translateX(50px) translateY(-220px) translateZ(-600px)
                  rotateY(0deg);
              }
              100% {
                transform: translateX(50px) translateY(-220px) translateZ(-600px)
                  rotateY(-360deg);
              }
            }
            .word {
              position: absolute;
              width: 100px;
              margin-left: 50px;
              color: pink;
              text-align: center;
              line-height: 200px;
              font-size: 52px;
              font-family: "楷体";
              border-radius: 10px;
              text-shadow: 0 0 50px #fff;
              transition-duration: 6s;
              opacity: 0;
              animation-delay: 1s;
            }
            .word p {
              width: 100px;
              line-height: 50px;
              text-align: center;
            }
            .skeleton:hover .word {
              opacity: 1;
              transform: translateY(-400px);
            }
          </style>
        </head>
        <body>
          <!-- 一个旋转礼盒，外面的大正方体包着里面的小正方体。
      当鼠标移动到大正方体时，大正方体就会将各个面展开，
      里面的小正方体可以开始慢慢旋转，并且将小正方体里的文字慢慢地弹出来。
      由于两个正方体的各个面是用图片作为背景，所以第一次打开的时候图片可能会延迟展示。 -->
          <div class="skeleton">
            <div class="cube">
              <div class="common top"></div>
              <div class="common bottom"></div>
              <div class="common left"></div>
              <div class="common right"></div>
              <div class="common front"></div>
              <div class="common behind"></div>
            </div>
            <div class="smallcube">
              <div class="con smallbottom"></div>
              <div class="con smallleft"></div>
              <div class="con smallright"></div>
              <div class="con smallfront"></div>
              <div class="con smallbehind"></div>
              <div class="word">
                <p>程</p>
                <p>序</p>
                <p>员</p>
                <p>的</p>
                <p>浪</p>
                <p>漫</p>
              </div>
            </div>
          </div>
        </body>
      </html>
      `,
  },
  {
    id: 23,
    title: "满屏爱意",
    code: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
          <style>
            body {
              background-color: #1e1e1e;
              overflow: hidden;
            }
          </style>
        </head>
        <body>
          <canvas id="drawHeart"></canvas>
        </body>
        <script>
          const canvas = document.getElementById("drawHeart");
          const ctx = canvas.getContext("2d");
          let wW = window.innerWidth;
          let wH = window.innerHeight;
          const num = 100;
          const hearts = [];
          const heartImage = new Image();
          heartImage.src =
            'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path id="heart" d="M10,30 A20,20,0,0,1,50,30 A20,20,0,0,1,90,30 Q90,60,50,90 Q10,60,10,30 Z" fill="red"/></svg>';
          class Heart {
            constructor(type) {
              this.type = type;
              // 初始化生成范围
              this.x = Math.random() * wW;
              this.y = Math.random() * wH;
              this.opacity = Math.random() * 0.5 + 0.5;
              // 偏移量
              this.vel = {
                x: (Math.random() - 0.5) * 5,
                y: (Math.random() - 0.5) * 5,
              };
              this.initialW = wW * 0.5;
              this.initialH = wH * 0.5;
              // 缩放比例
              this.targetScale = Math.random() * 0.15 + 0.02; // 最小0.02
              this.scale = Math.random() * this.targetScale;
              // 文字位置
              this.fx = Math.random() * wW;
              this.fy = Math.random() * wH;
              this.fs = Math.random() * 10;
              this.text = getText();
              this.fvel = {
                x: (Math.random() - 0.5) * 5,
                y: (Math.random() - 0.5) * 5,
                f: (Math.random() - 0.5) * 2,
              };
            }
            draw() {
              ctx.save();
              ctx.globalAlpha = this.opacity;
              ctx.drawImage(heartImage, this.x, this.y, this.width, this.height);
              // ctx.scale(this.scale + 1, this.scale + 1);
              if (!this.type) {
                // 设置文字属性
                ctx.fillStyle = getColor();
                ctx.font = "italic " + this.fs + "px sans-serif";
                // 填充字符串
                ctx.fillText(this.text, this.fx, this.fy);
              }
              ctx.restore();
            }
            update() {
              this.x += this.vel.x;
              this.y += this.vel.y;
              if (this.x - this.width > wW || this.x + this.width < 0) {
                // 重新初始化位置
                this.scale = 0;
                this.x = Math.random() * wW;
                this.y = Math.random() * wH;
              }
              if (this.y - this.height > wH || this.y + this.height < 0) {
                // 重新初始化位置
                this.scale = 0;
                this.x = Math.random() * wW;
                this.y = Math.random() * wH;
              }
              // 放大
              this.scale += (this.targetScale - this.scale) * 0.1;
              this.height = this.scale * this.initialH;
              this.width = this.height * 1.4;
              // -----文字-----
              this.fx += this.fvel.x;
              this.fy += this.fvel.y;
              this.fs += this.fvel.f;
              if (this.fs > 50) {
                this.fs = 2;
              }
              if (this.fx - this.fs > wW || this.fx + this.fs < 0) {
                // 重新初始化位置
                this.fx = Math.random() * wW;
                this.fy = Math.random() * wH;
              }
              if (this.fy - this.fs > wH || this.fy + this.fs < 0) {
                // 重新初始化位置
                this.fx = Math.random() * wW;
                this.fy = Math.random() * wH;
              }
            }
          }
      
          function getText() {
            const val = Math.random() * 10;
            if (val > 1 && val <= 3) {
              return "always";
            } else if (val > 3 && val <= 5) {
              return "love";
            } else if (val > 5 && val <= 8) {
              return "taylor swift";
            } else {
              return "I Love You";
            }
          }
      
          function getColor() {
            const val = Math.random() * 10;
            if (val > 0 && val <= 1) {
              return "#00f";
            } else if (val > 1 && val <= 2) {
              return "#f00";
            } else if (val > 2 && val <= 3) {
              return "#0f0";
            } else if (val > 3 && val <= 4) {
              return "#368";
            } else if (val > 4 && val <= 5) {
              return "#666";
            } else if (val > 5 && val <= 6) {
              return "#333";
            } else if (val > 6 && val <= 7) {
              return "#f50";
            } else if (val > 7 && val <= 8) {
              return "#e96d5b";
            } else if (val > 8 && val <= 9) {
              return "#5be9e9";
            } else {
              return "#d41d50";
            }
          }
      
          function init() {
            canvas.width = wW;
            canvas.height = wH;
            for (let i = 0; i < num; i++) {
              hearts.push(new Heart(i % 8));
            }
            render();
          }
      
          function render() {
            ctx.clearRect(0, 0, wW, wH);
            for (let i = 0; i < hearts.length; i++) {
              hearts[i].draw();
              hearts[i].update();
            }
            setTimeout(render, 60);
          }
          init();
          window.addEventListener("resize", function () {
            canvas.width = wW = window.innerWidth;
            canvas.height = wH = window.innerHeight;
          });
        </script>
      </html>
      `,
  },
  {
    id: 24,
    title: "爱心",
    code: `<!DOCTYPE html>
      <html>
        <head>
          <title></title>
          <script src="js/jquery.min.js"></script>
        </head>
        <style>
          * {
            padding: 0;
            margin: 0;
          }
          html,
          body {
            height: 100%;
            padding: 0;
            margin: 0;
            background: #000;
          }
      
          .aa {
            position: fixed;
            left: 50%;
            bottom: 10px;
            color: #ccc;
          }
      
          .container {
            width: 100%;
            height: 100%;
          }
          canvas {
            z-index: 99;
            position: absolute;
            width: 100%;
            height: 100%;
          }
        </style>
        <body>
          <!-- 樱花 -->
          <div id="jsi-cherry-container" class="container">
            <audio autoplay="autopaly">
              <source src="renxi.mp3" type="audio/mp3" />
            </audio>
            <img class="img" src="./123.png" alt="" />
            <!-- 爱心 -->
            <canvas id="pinkboard" class="container"> </canvas>
          </div>
      
        </body>
        <script>
          /*
           * Settings
           */
          var settings = {
            particles: {
              length: 500, // maximum amount of particles
              duration: 2, // particle duration in sec
              velocity: 100, // particle velocity in pixels/sec
              effect: -0.75, // play with this for a nice effect
              size: 30, // particle size in pixels
            },
          };
      
          (function () {
            var b = 0;
            var c = ["ms", "moz", "webkit", "o"];
            for (var a = 0; a < c.length && !window.requestAnimationFrame; ++a) {
              window.requestAnimationFrame = window[c[a] + "RequestAnimationFrame"];
              window.cancelAnimationFrame =
                window[c[a] + "CancelAnimationFrame"] ||
                window[c[a] + "CancelRequestAnimationFrame"];
            }
            if (!window.requestAnimationFrame) {
              window.requestAnimationFrame = function (h, e) {
                var d = new Date().getTime();
                var f = Math.max(0, 16 - (d - b));
                var g = window.setTimeout(function () {
                  h(d + f);
                }, f);
                b = d + f;
                return g;
              };
            }
            if (!window.cancelAnimationFrame) {
              window.cancelAnimationFrame = function (d) {
                clearTimeout(d);
              };
            }
          })();
      
          /*
           * Point class
           */
          var Point = (function () {
            function Point(x, y) {
              this.x = typeof x !== "undefined" ? x : 0;
              this.y = typeof y !== "undefined" ? y : 0;
            }
            Point.prototype.clone = function () {
              return new Point(this.x, this.y);
            };
            Point.prototype.length = function (length) {
              if (typeof length == "undefined")
                return Math.sqrt(this.x * this.x + this.y * this.y);
              this.normalize();
              this.x *= length;
              this.y *= length;
              return this;
            };
            Point.prototype.normalize = function () {
              var length = this.length();
              this.x /= length;
              this.y /= length;
              return this;
            };
            return Point;
          })();
      
          /*
           * Particle class
           */
          var Particle = (function () {
            function Particle() {
              this.position = new Point();
              this.velocity = new Point();
              this.acceleration = new Point();
              this.age = 0;
            }
            Particle.prototype.initialize = function (x, y, dx, dy) {
              this.position.x = x;
              this.position.y = y;
              this.velocity.x = dx;
              this.velocity.y = dy;
              this.acceleration.x = dx * settings.particles.effect;
              this.acceleration.y = dy * settings.particles.effect;
              this.age = 0;
            };
            Particle.prototype.update = function (deltaTime) {
              this.position.x += this.velocity.x * deltaTime;
              this.position.y += this.velocity.y * deltaTime;
              this.velocity.x += this.acceleration.x * deltaTime;
              this.velocity.y += this.acceleration.y * deltaTime;
              this.age += deltaTime;
            };
            Particle.prototype.draw = function (context, image) {
              function ease(t) {
                return --t * t * t + 1;
              }
              var size = image.width * ease(this.age / settings.particles.duration);
              context.globalAlpha = 1 - this.age / settings.particles.duration;
              context.drawImage(
                image,
                this.position.x - size / 2,
                this.position.y - size / 2,
                size,
                size
              );
            };
            return Particle;
          })();
      
          /*
           * ParticlePool class
           */
          var ParticlePool = (function () {
            var particles,
              firstActive = 0,
              firstFree = 0,
              duration = settings.particles.duration;
      
            function ParticlePool(length) {
              // create and populate particle pool
              particles = new Array(length);
              for (var i = 0; i < particles.length; i++)
                particles[i] = new Particle();
            }
            ParticlePool.prototype.add = function (x, y, dx, dy) {
              particles[firstFree].initialize(x, y, dx, dy);
      
              // handle circular queue
              firstFree++;
              if (firstFree == particles.length) firstFree = 0;
              if (firstActive == firstFree) firstActive++;
              if (firstActive == particles.length) firstActive = 0;
            };
            ParticlePool.prototype.update = function (deltaTime) {
              var i;
      
              // update active particles
              if (firstActive < firstFree) {
                for (i = firstActive; i < firstFree; i++)
                  particles[i].update(deltaTime);
              }
              if (firstFree < firstActive) {
                for (i = firstActive; i < particles.length; i++)
                  particles[i].update(deltaTime);
                for (i = 0; i < firstFree; i++) particles[i].update(deltaTime);
              }
      
              // remove inactive particles
              while (
                particles[firstActive].age >= duration &&
                firstActive != firstFree
              ) {
                firstActive++;
                if (firstActive == particles.length) firstActive = 0;
              }
            };
            ParticlePool.prototype.draw = function (context, image) {
              // draw active particles
              if (firstActive < firstFree) {
                for (i = firstActive; i < firstFree; i++)
                  particles[i].draw(context, image);
              }
              if (firstFree < firstActive) {
                for (i = firstActive; i < particles.length; i++)
                  particles[i].draw(context, image);
                for (i = 0; i < firstFree; i++) particles[i].draw(context, image);
              }
            };
            return ParticlePool;
          })();
      
          /*
           * Putting it all together
           */
          (function (canvas) {
            var context = canvas.getContext("2d"),
              particles = new ParticlePool(settings.particles.length),
              particleRate =
                settings.particles.length / settings.particles.duration, // particles/sec
              time;
      
            // get point on heart with -PI <= t <= PI
            function pointOnHeart(t) {
              return new Point(
                160 * Math.pow(Math.sin(t), 3),
                130 * Math.cos(t) -
                  50 * Math.cos(2 * t) -
                  20 * Math.cos(3 * t) -
                  10 * Math.cos(4 * t) +
                  25
              );
            }
      
            // creating the particle image using a dummy canvas
            var image = (function () {
              var canvas = document.createElement("canvas"),
                context = canvas.getContext("2d");
              canvas.width = settings.particles.size;
              canvas.height = settings.particles.size;
              // helper function to create the path
              function to(t) {
                var point = pointOnHeart(t);
                point.x =
                  settings.particles.size / 2 +
                  (point.x * settings.particles.size) / 350;
                point.y =
                  settings.particles.size / 2 -
                  (point.y * settings.particles.size) / 350;
                return point;
              }
              // create the path
              context.beginPath();
              var t = -Math.PI;
              var point = to(t);
              context.moveTo(point.x, point.y);
              while (t < Math.PI) {
                t += 0.01; // baby steps!
                point = to(t);
                context.lineTo(point.x, point.y);
              }
              context.closePath();
              // create the fill
              context.fillStyle = "#ea80b0";
              context.fill();
              // create the image
              var image = new Image();
              image.src = canvas.toDataURL();
              return image;
            })();
      
            // render that thing!
            function render() {
              // next animation frame
              requestAnimationFrame(render);
      
              // update time
              var newTime = new Date().getTime() / 1000,
                deltaTime = newTime - (time || newTime);
              time = newTime;
      
              // clear canvas
              context.clearRect(0, 0, canvas.width, canvas.height);
      
              // create new particles
              var amount = particleRate * deltaTime;
              for (var i = 0; i < amount; i++) {
                var pos = pointOnHeart(Math.PI - 2 * Math.PI * Math.random());
                var dir = pos.clone().length(settings.particles.velocity);
                particles.add(
                  canvas.width / 2 + pos.x,
                  canvas.height / 2 - pos.y,
                  dir.x,
                  -dir.y
                );
              }
      
              // update and draw particles
              particles.update(deltaTime);
              particles.draw(context, image);
            }
      
            // handle (re-)sizing of the canvas
            function onResize() {
              canvas.width = canvas.clientWidth;
              canvas.height = canvas.clientHeight;
            }
            window.onresize = onResize;
      
            // delay rendering bootstrap
            setTimeout(function () {
              onResize();
              render();
            }, 10);
          })(document.getElementById("pinkboard"));
        </script>
      </html>
      
      
        <script>
          // var RENDERER = {
          //   INIT_CHERRY_BLOSSOM_COUNT: 30,
          //   MAX_ADDING_INTERVAL: 10,
      
          //   init: function () {
          //     this.setParameters();
          //     this.reconstructMethods();
          //     this.createCherries();
          //     this.render();
          //     if (
          //       navigator.userAgent.match(
          //         /(phone|pod|iPhone|iPod|ios|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
          //       )
          //     ) {
          //       // var box = document.querySelectorAll(".box")[0];
          //       // console.log(box, "移动端");
          //       // box.style.marginTop = "65%";
          //     }
          //   },
          //   setParameters: function () {
          //     this.$container = $("#jsi-cherry-container");
          //     this.width = this.$container.width();
          //     this.height = this.$container.height();
          //     this.context = $("<canvas />")
          //       .attr({ width: this.width, height: this.height })
          //       .appendTo(this.$container)
          //       .get(0)
          //     var rate = this.FOCUS_POSITION / (this.z + this.FOCUS_POSITION),
          //       x = this.renderer.width / 2 + this.x * rate,
          //       y = this.renderer.height / 2 - this.y * rate;
          //     return { rate: rate, x: x, y: y };
          //   },
          //   re
          //       }
          //     } else {
          //       this.phi += Math.PI / (axis.y == this.thresholdY ? 200 : 500);
          //       this.phi %= Math.PI;
          //     }
          //     if (this.y <= -this.renderer.height * this.SURFACE_RATE) {
          //       this.x += 2;
          //       this.y = -this.renderer.height * this.SURFACE_RATE;
          //     } else {
          //       this.x += this.vx;
          //       this.y += this.vy;
          //     }
          //     return (
          //       this.z > -this.FOCUS_POSITION &&
          //       this.z < this.FAR_LIMIT &&
          //       this.x < this.renderer.width * 1.5
          //     );
          //   },
          // };
          // $(function () {
          //   RENDERER.init();
          // });
        </script>
      `,
  },
  {
    id: 25,
    title: "64种语言的爱",
    code: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>64种语言的爱</title>
          <style>
            body {
              display: flex;
              height: 100vh;
              background-color: black;
              overflow: hidden;
            }
            .love {
              width: 450px;
              height: 450px;
              margin: auto;
              position: relative;
            }
            .love span {
              position: absolute;
              left: 0;
              color: goldenrod;
              font-size: 20px;
              font-family: sans-serif;
              text-shadow: 0 0 1em white;
              animation: x-move 10s ease-in-out infinite alternate,
                y-move 20s linear infinite;
              animation-delay: calc(20s / var(--particles) * var(--n) * -1);
              user-select: none;
              word-break: keep-all;
            }
            .love span:hover {
              color: orangered;
              font-size: 25px;
              font-weight: bold;
              text-shadow: 0 0 0.1em black, 0 0 1em white;
            }
            @keyframes x-move {
              to {
                left: 450px;
              }
            }
            @keyframes y-move {
              0% {
                transform: translateY(180px);
              }
              10% {
                transform: translateY(45px);
              }
              15% {
                transform: translateY(5px);
              }
              18% {
                transform: translateY(0);
              }
              20% {
                transform: translateY(5px);
              }
              22% {
                transform: translateY(35px);
              }
              24% {
                transform: translateY(65px);
              }
              25% {
                transform: translateY(110px);
              }
              26% {
                transform: translateY(65px);
              }
              28% {
                transform: translateY(35px);
              }
              30% {
                transform: translateY(5px);
              }
              32% {
                transform: translateY(0);
              }
              35% {
                transform: translateY(5px);
              }
              40% {
                transform: translateY(45px);
              }
              50% {
                transform: translateY(180px);
              }
              71% {
                transform: translateY(430px);
              }
              72.5% {
                transform: translateY(440px);
              }
              75% {
                transform: translateY(450px);
              }
              77.5% {
                transform: translateY(440px);
              }
              79% {
                transform: translateY(430px);
              }
              100% {
                transform: translateY(180px);
              }
            }
          </style>
        </head>
        <body>
          <div class="love"></div>
        </body>
        <script src="https://cdn.bootcdn.net/ajax/libs/d3/7.8.5/d3.min.js"></script>
        <script>
          const words = [
            "愛",
            "Love",
            "Amour",
            "Liebe",
            "Amore",
            "Amor",
            "Любовь",
            "الحب",
            "प्यार",
            "Cinta",
            "Αγάπη",
            "사랑",
            "Liefde",
            "Dashuri",
            "Каханне",
            "Ljubav",
            "Láska",
            "Armastus",
            "Mahal",
            "אהבה",
            "Szerelem",
            "Grá",
            "Mīlestība",
            "Meilė",
            "Любов",
            "Љубовта",
            "Cinta",
            "عشق",
            "Dragoste",
            "Láska",
            "Renmen",
            "ፍቅር",
            "munaña",
            "Sevgi",
            "Љубав",
            "karout",
            "amà",
            "amôr",
            "kærleiki",
            "mborayhu",
            "Upendo",
            "sòòyayyàà",
            "ljubav",
            "Սեր",
            "сүю",
            "сүйүү",
            "tia",
            "aroha",
            "KHAIR",
            "प्रेम",
            "kjærlighet",
            "munay",
            "jecel",
            "Kärlek",
            "soymek",
            "Mahal",
            "ярату",
            "محبت",
            "sopp",
            "uthando",
            "ความรัก",
            "Aşk",
            "Tình yêu",
            "ליבע",
          ];
          d3.select(".love")
            .style("--particles", words.length)
            .selectAll("span")
            .data(words)
            .enter()
            .append("span")
            .style("--n", (d, i) => i + 1)
            .text((d) => d);
        </script>
      </html>
      `,
  },
  {
    id: 26,
    title: "逃穷小游戏",
    code: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>逃穷小游戏</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
      
            html,
            body {
              height: 100%;
              overflow: hidden;
            }
      
            .info span {
              color: red;
              margin: 0 0.5vw;
            }
      
            .base-el {
              position: absolute;
              border: 1px solid #000;
              color: #fff;
              background-color: #000;
              width: 40px;
              height: 40px;
              text-align: center;
              line-height: 40px;
              font-size: 30px;
              border-radius: 8%;
              cursor: none;
              user-select: none;
            }
      
            .hero {
              border-color: red;
              color: #fff;
              background-color: red;
            }
      
            .qiong {
              position: absolute;
              width: 100%;
              left: 0;
              top: 200px;
              display: none;
              font-size: 10vw;
              font-weight: bold;
              color: red;
              text-align: center;
              background-color: #fff;
              border: 1px solid #000;
            }
      
            .info {
              position: fixed;
              left: 0;
              top: 0;
              z-index: 998;
            }
      
            .full {
              position: fixed;
              left: 0;
              top: 0;
              width: 100vw;
              height: 100vh;
              /* border: 2px solid red; */
              background-color: #fff;
              z-index: 999;
              display: none;
            }
      
            .fan {
              background-color: #000;
              color: #eee;
              font-size: 4vw;
            }
      
            .start-page {
              padding: 10vw;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }
      
            .start-page > div {
              margin-bottom: 10vh;
            }
      
            .mt--9 {
              /* margin-top: -9vh; */
            }
      
            .start-btn {
              width: 80vmin;
              padding: 3vh;
              border: 1px solid #fff;
              border-radius: 2vw;
              text-align: center;
              font-size: 5vmin;
              color: red;
              cursor: pointer;
              display: flex;
              justify-content: center;
              align-items: center;
              position: relative;
            }
      
            .qs,
            .ying {
              padding: 10vw;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }
      
            .re-btn {
              width: 50vmin;
              padding: 3vh;
              border: 1px solid #fff;
              border-radius: 2vw;
              text-align: center;
              font-size: 5vmin;
              color: #fff;
              cursor: pointer;
              margin-top: 8vh;
            }
      
            .box {
              position: relative;
              width: 100vw;
              height: 100vh;
              background: #f1f1f1;
            }
      
            .mt-10 {
              margin-top: 10vh;
            }
      
            .red {
              color: red;
              margin-top: 4vh;
            }
      
            @media screen and (max-width: 750px) {
              .fan {
                font-size: 5vmin;
              }
      
              .fz-2vh {
                font-size: 3vmin;
              }
            }
      
            @media screen and (min-width: 750px) and (max-width: 1024px) {
              .fan {
                font-size: 3vmin;
              }
      
              .fz-2vh {
                font-size: 3vmin;
              }
            }
      
            @media screen and (min-width: 1024px) {
              .fan {
                font-size: 5vmin;
              }
            }
      
            .zan {
              color: red;
              position: absolute;
              left: 0;
              top: 5px;
              font-size: 16px;
              font-weight: bold;
      
              animation: colorChange 1s infinite steps(1), qh 0.5s infinite;
            }
      
            @keyframes colorChange {
              50% {
                color: yellow;
              }
            }
      
            @keyframes qh {
              50% {
                transform: translate(20px);
              }
            }
          </style>
        </head>
        <body>
          <!--   
        点击 + 收藏！ 
        游戏设计：
              1、游戏角色：
              2、游戏关卡：
              3、游戏玩法：
              4、游戏文案：
          
          1. 游戏角色：
              1.1  角色基类： Role (position, update, move)
              1.2  英雄子类   Hero (重写move)
              1.3  敌人子类   Enemy(重写move)
              1.4  游戏管理类  Contorl (场控，开始游戏，结束游戏， 关卡升级、场景切换， 碰撞检测、三角函数转换，测距)
          2. 游戏关卡：
              2.1 关卡升级后，每秒出现的敌人数+1, 无限模式 
              如： 第1关， 美秒出现1个敌人
              如： 第2关， 美秒出现2个敌人
              ....
          3. 游戏玩法：
              3.1 点击页面空白出现，让英雄移动，躲避敌人，被敌人追上即为游戏失败
              3.2 成功坚持30s,即可进入下一个关
          4. 游戏文案：
              4.1 游戏背景介绍：
                  2023以来,伴随的大厂的裁员潮、工作难找， 年终奖2折起， 作为程序员的我们真的快穷死了！
                  但你我皆清楚，程序员无所不能！上能顶天立地，下能苟且偷生，快来一起战斗, 躲避穷鬼， 坚持30秒，走上高富帅，取下白富美！
              4.2 游戏失败文案：
                  哎呀，你穷死了!!!（注意这里一定是三个感叹号，有挑衅的意思，激发玩家的胜负欲，涉及游戏心理学）
              4.3 游戏通关文案：
                  通关后，给玩家吟诗一首： 《有钱》
                      财大气粗、不当土狗
                      青春永驻、朱门绣户
                      头发多多、一路高歌
                      要啥都有、 永垂不朽
      
          已用尽了作者必胜的才华！ 
          -->
      
          <div class="info">
            关卡：<span class="level">1</span> 敌人：<span class="e-num">1</span>
            时间：<span class="time-span">60s</span>
          </div>
      
          <div class="ying full fan">
            <div class="zan">&lt;-我不停的动，点个赞呗！</div>
            <div>恭喜！赢了！</div>
            <div>2023愿你：</div>
            <div class="mt-10 red">财大气粗、不当土狗</div>
            <div class="mt-10 red">青春永驻、朱门绣户</div>
            <div class="mt-10 red">头发多多、一路高歌</div>
            <div class="mt-10 red">要啥都有、 永垂不朽</div>
            <div class="rebtn1 re-btn">挑战下一关</div>
          </div>
          <div class="start-page full fan">
            <div class="zan">&lt;-我不停的动，点个赞呗！</div>
            <div>
              2023以来,伴随的大厂的裁员潮、工作难找， 年终奖2折起，
              作为程序员的我们真的快穷死了！
            </div>
            <div>
              但你我皆清楚，程序员无所不能！上能顶天立地，下能苟且偷生，快来一起战斗,
              躲避穷鬼， 坚持30秒，走上高富帅，取下白富美！
            </div>
            <div class="start-btn">开始游戏</div>
            <div class="mt--9 fz-2vh">
              操作方式：点击空白处，即可躲避 【挑战<span style="color: red">999</span
              >关】
            </div>
          </div>
          <div class="qiong full fan qs">
            <div class="zan">&lt;-我不停的动，点个赞呗！</div>
            <div>哎呀，你穷死了!!!!</div>
            <div class="rebtn2 re-btn">再次挑战！</div>
          </div>
          <div class="box"></div>
        </body>
        <script>
          /**
            点击 + 收藏！ 
            游戏设计：
              1、游戏角色：
              2、游戏关卡：
              3、游戏玩法：
              4、游戏文案：
          
          1. 游戏角色：
              1.1  角色基类： Role (position, update, move)
              1.2  英雄子类   Hero (重写move)
              1.3  敌人子类   Enemy(重写move)
              1.4  游戏管理类  Contorl (场控，开始游戏，结束游戏， 关卡升级、场景切换， 碰撞检测、三角函数转换，测距)
          2. 游戏关卡：
              2.1 关卡升级后，每秒出现的敌人数+1 
              如： 第1关， 美秒出现1个敌人
              如： 第2关， 美秒出现2个敌人
              ....
          3. 游戏玩法：
              3.1 点击页面空白出现，让英雄移动，躲避敌人，被敌人追上即为游戏失败
              3.2 成功坚持30s,即可进入下一个关
          4. 游戏文案：
              4.1 游戏背景介绍：
                  2023以来,伴随的大厂的裁员潮、工作难找， 年终奖2折起， 作为程序员的我们真的快穷死了！
                  但你我皆清楚，程序员无所不能！上能顶天立地，下能苟且偷生，快来一起战斗, 躲避穷鬼， 坚持30秒，走上高富帅，取下白富美！
              4.2 游戏失败文案：
                  哎呀，你穷死了!!!（注意这里一定是三个感叹号，有挑衅的意思，激发玩家的胜负欲，涉及游戏心理学）
              4.3 游戏通关文案：
                  通关后，给玩家吟诗一首： 《有钱》
                      财大气粗、不当土狗
                      青春永驻、朱门绣户
                      头发多多、一路高歌
                      要啥都有、 永垂不朽
      
          已用尽了作者必胜的才华！
        */
      
          let qiong = document.querySelector(".qiong");
          let eNum = document.querySelector(".e-num");
          let timeSpan = document.querySelector(".time-span");
          let startPage = document.querySelector(".start-page");
          let ying = document.querySelector(".ying");
          let startBtn = document.querySelector(".start-btn");
          let reBtn1 = document.querySelector(".rebtn1");
          let reBtn2 = document.querySelector(".rebtn2");
          let box = document.querySelector(".box");
          let levelDiv = document.querySelector(".level");
      
          let endTime = 30;
          let level = 1;
      
          const W = document.body.clientWidth;
          const H = document.body.clientHeight;
          const divW = 40;
      
          class Role {
            constructor(x, y) {
              this.x = x || 0;
              this.y = y || 0;
            }
      
            // div
            div = null;
      
            updateStyle() {
              this.div.style.left = this.x + "px";
              this.div.style.top = this.y + "px";
            }
          }
      
          class Enemy extends Role {
            constructor(x, y) {
              super(x, y);
              this.div = getDiv("穷");
              this.updateStyle();
            }
      
            // target
            targetPosition = {};
      
            // 角度（弧度)
            radian = null;
      
            // 每次移动的距离
            moveDis = 3;
      
            isMove = true;
      
            move(hero) {
              if (!this.isMove) return;
              // 记录角度
              if (
                this.targetPosition.x != hero.x ||
                this.targetPosition.y != hero.y ||
                this.radian === null
              ) {
                // 英雄移动过
                this.radian = getRadian(this.x, this.y, hero.x, hero.y);
                // this.radian = getRadian( hero.x, hero.y, this.x, this.y);
      
                this.targetPosition.x = hero.x;
                this.targetPosition.y = hero.y;
              }
              // 当前距离
              let currentDis = getDistance(this.x, this.y, hero.x, hero.y);
              // 减去每次移动距离 - moveDis
              // 计算新位置
              // 计算出新的位置
              this.x = Math.cos(this.radian) * (currentDis - this.moveDis);
              this.y = Math.sin(this.radian) * (currentDis - this.moveDis);
      
              this.x = hero.x - this.x;
              this.y = hero.y - this.y;
      
              this.updateStyle();
            }
          }
      
          class Hero extends Role {
            constructor(x, y) {
              super(x, y);
              this.div = getDiv("我", "hero");
              this.updateStyle();
            }
      
            move(x, y) {
              this.x = x;
              this.y = y;
              this.updateStyle();
            }
          }
      
          let hero = null;
          let emenys = [];
          let num = 0;
          let timer = null;
          let time = 0;
      
          function start() {
            let isM = false;
            hero = new Hero(W / 2, H / 2);
            heroMove(hero, isM);
            let initTime = Date.now();
            time = 0;
            eNum.innerHTML = 1;
            timeSpan.innerHTML = 0;
            timer = setInterval(() => {
              let time = Date.now() - initTime;
              time = (time / 1000).toFixed(2);
              console.log("time:", time);
              if (time > endTime) {
                stop();
                showYing();
              }
              timeSpan.innerHTML = time;
      
              num += 30;
              if (num % 400 === 0 && emenys.length < 500) {
                for (let i = 0; i < level; i++) {
                  emenys.push(createEnemy());
                }
                eNum.innerHTML = emenys.length;
              }
              emenys.forEach((e) => {
                e.move(hero);
                if (collision(hero, e)) {
                  stop();
                  showQiong();
                }
              });
            }, 30);
          }
      
          function stop() {
            clearInterval(timer);
            timer = null;
            emenys = [];
            time = 0;
            box.innerHTML = "";
          }
      
          function createEnemy() {
            let p = getPosition(hero);
            return new Enemy(p.x, p.y);
          }
      
          function getPosition(hero) {
            if (!W) {
              W = document.body.clientWidth;
            }
            if (!H) {
              H = document.body.clientHeight;
            }
            let x = getRand(W);
            let y = getRand(H);
            let dis = getDistance(hero.x, hero.y, x, y);
            if (dis > 500 || dis <= 80) {
              return getPosition(hero);
            }
            return {
              x,
              y,
            };
          }
      
          function getDiv(text, className) {
            let div = document.createElement("div");
            div.classList.add("base-el");
            div.innerText = text;
            className && div.classList.add(className);
            box.appendChild(div);
            return div;
          }
      
          function getRand(max, min = 0) {
            return min + parseInt(Math.random() * (max - min));
          }
      
          // 用到的函数 Math.atan2(y, x); 这里是先写入y的坐标, 在写入x的坐标, 不要写反了
      
          // 获取两点之的弧度
          function getRadian(x2, y2, x1, y1) {
            return Math.atan2(y1 - y2, x1 - x2); // 返回来的是弧度
            // let radian =  Math.atan2(y1 - y2, x1 - x2);
            // return  180 / Math.PI * radian;
          }
      
          // 获取两点之间的距离
          function getDistance(x1, y1, x2, y2) {
            let dx = Math.abs(x1 - x2);
            let dy = Math.abs(y1 - y2);
            return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
          }
      
          window.onclick = function (e) {
            console.log(e);
            hero.move(e.pageX - divW / 2, e.pageY - divW / 2);
          };
      
          // 碰撞检测
          function collision(o1, o2) {
            let dtop = o1.y - divW;
            let dbottom = o1.y + divW;
            let dleft = o1.x - divW;
            let dright = o1.x + divW;
      
            if (o2.x >= dleft && o2.x <= dright && o2.y >= dtop && o2.y <= dbottom) {
              return true;
            } else {
              return false;
            }
          }
      
          function show(el) {
            el.style.display = "flex";
          }
      
          function hide(el) {
            el.style.display = "none";
          }
      
          function showStart() {
            show(startPage);
            hide(qiong);
            hide(ying);
          }
      
          function showQiong() {
            hide(startPage);
            show(qiong);
            hide(ying);
          }
      
          function showYing() {
            hide(startPage);
            hide(qiong);
            show(ying);
          }
      
          function heroMove(hero, isM) {
            box.onmousedown = function () {
              isM = true;
            };
            box.onmouseup = function () {
              isM = false;
            };
            box.onmousemove = function (e) {
              if (isM) {
                console.log(e);
                hero.move(e.pageX, e.pageY);
              }
            };
          }
      
          startBtn.onclick = function (e) {
            e.stopPropagation();
            hide(startPage);
            start();
          };
      
          function reStart(e) {
            console.log("e", e);
            e.stopPropagation();
            hide(startPage);
            hide(qiong);
            hide(ying);
            start();
          }
          reBtn1.onclick = function (e) {
            ++level;
            reStart(e);
            setLevel();
          };
          reBtn2.onclick = reStart;
      
          function setLevel() {
            levelDiv.innerHTML = level;
          }
      
          showStart();
        </script>
      </html>
      `,
  },
  {
    id: 27,
    title: "冬天的浪漫",
    code: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>冬天的浪漫</title>
          <style>
            /*google-fonts*/
            @import url("https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700,800,900&display=swap");
      
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
      
            :root {
              --body-color: #181c1f;
              --primary-color: #ffffff;
            }
      
            body {
              font-family: "Poppins", sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              background-color: var(--body-color);
            }
      
            .container {
              width: 100%;
              height: 400px;
              display: flex;
              justify-content: center;
              border-bottom: 1px solid rgba(255, 255, 255, 0.1);
              -webkit-box-reflect: below 1px
                linear-gradient(
                  transparent,
                  transparent,
                  transparent,
                  transparent,
                  #0005
                );
            }
      
            .cloud {
              position: relative;
              top: 50px;
              z-index: 100;
      
              /* 横向云朵 */
              width: 320px;
              height: 100px;
              background-color: var(--primary-color);
              border-radius: 100px;
      
              /* drop-shadow函数将阴影效果应用于投影图像 */
              filter: drop-shadow(0 0 30px var(--primary-color));
            }
            .cloud::before {
              content: "";
              /* 左侧小云朵 */
              width: 110px;
              height: 110px;
              background-color: var(--primary-color);
              border-radius: 50%;
              position: absolute;
              top: -50px;
              left: 40px;
      
              /* 右侧大云朵 */
              box-shadow: 90px 0 0 30px var(--primary-color);
            }
      
            .cloud .text {
              position: absolute;
              top: 40px;
              height: 20px;
              line-height: 20px;
      
              text-transform: uppercase;
              color: var(--primary-color);
              /* 为文字添加阴影，看上去发光，增加视觉效果 */
              text-shadow: 0 0 5px var(--primary-color), 0 0 15px var(--primary-color),
                0 0 30px var(--primary-color);
              transform-origin: bottom;
              animation: animate 2s linear forwards;
            }
      
            @keyframes animate {
              0% {
                transform: translateX(0);
              }
      
              70% {
                transform: translateY(290px);
              }
      
              100% {
                transform: translateY(290px);
                /* transform: translate(var(--random-x, 2px), var(--random-y, 290px)); */
              }
            }
          </style>
        </head>
      
        <body>
          <div class="container">
            <div class="cloud"></div>
          </div>
        </body>
        <script>
          function generateText() {
            return ["❉", "¥", "$"];
          }
      
          function randomText() {
            const texts = generateText();
            const text = texts[Math.floor(Math.random() * texts.length)];
      
            return text;
          }
      
          function rainEffect() {
            const cloudEle = document.querySelector(".cloud");
            const textEle = document.createElement("div");
            let color;
            // const MAX_NUM = 10;
      
            textEle.innerText = randomText();
            textEle.classList.add("text");
            switch (textEle.innerText) {
              case "❉":
                color = "#07befc";
                break;
              case "¥":
                color = "#f7f30b";
                break;
              case "$":
                color = "#f7f30b";
                break;
              default:
                color = "white";
                break;
            }
            const left = Math.floor(Math.random() * 310);
            const size = Math.random() * 1.5;
            const duration = Math.random();
            const styleSheets = {
              left: left + "px",
              fontSize: 0.5 + size + "em",
              animationDuration: 1 + duration + "s",
              color,
              textShadow: "0 0 5px " + color + ", 0 0 15px " + color + ", 0 0 30px " + color,
            };
            Object.assign(textEle.style, styleSheets);
      
            cloudEle.appendChild(textEle);
            setTimeout(() => {
              cloudEle.removeChild(textEle);
            }, 2000);
          }
      
          setInterval(() => rainEffect(), 20);
        </script>
      </html>
      `,
  },
  {
    id: 28,
    title: "",
    code: ``,
  },
  {
    id: 29,
    title: "",
    code: ``,
  },
];
