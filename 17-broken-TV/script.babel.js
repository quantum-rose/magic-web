var $cvs=document.querySelector("#cvs");var cvsCtx=$cvs.getContext("2d");function intRandom(start,end){if(Object.prototype.toString.call(start)!=="[object Number]")throw new TypeError("".concat(start," is not a number"));if(Object.prototype.toString.call(end)!=="[object Number]")throw new TypeError("".concat(end," is not a number"));start=Math.floor(start);end=Math.floor(end)+1;return Math.round(Math.random()*(end-start)+start)}var w=$cvs.width=$cvs.offsetWidth*window.devicePixelRatio;var h=$cvs.height=$cvs.offsetHeight*window.devicePixelRatio;var fontSize=w/4;var textOffset=w/100;var stripeOffset=0;var cutLine;window.addEventListener("resize",function(){w=$cvs.width=$cvs.offsetWidth*window.devicePixelRatio;h=$cvs.height=$cvs.offsetHeight*window.devicePixelRatio;fontSize=w/4;textOffset=w/100});function createCutLine(){cutLine=[0,h];for(var i=0;i<6;i++){cutLine.push(intRandom(cutLine[0],cutLine[cutLine.length-1]))}cutLine.sort(function(a,b){return a-b})}function drawNoise(){var imageData=cvsCtx.createImageData(w,h);var data=imageData.data;for(var i=0;i<data.length;i+=4){data[i]=data[i+1]=data[i+2]=intRandom(0,255);data[i+3]=255}cvsCtx.putImageData(imageData,0,0)}function drawText(){cvsCtx.fillStyle="#000000";cvsCtx.fillRect(0,0,w,h);cvsCtx.fillStyle="#ffffff";cvsCtx.font="bold ".concat(fontSize,"px Helvetica");cvsCtx.textAlign="center";cvsCtx.textBaseline="middle";createCutLine();for(var i=0;i<cutLine.length-1;i++){cvsCtx.save();cvsCtx.beginPath();cvsCtx.rect(0,cutLine[i],w,cutLine[i+1]-cutLine[i]);cvsCtx.clip();cvsCtx.fillText("NOISE",w/2+intRandom(-textOffset,textOffset),h/2);cvsCtx.restore()}}function drawStripe(){cvsCtx.beginPath();var f=cvsCtx.createLinearGradient(0,-stripeOffset,0,2*h-stripeOffset);for(var i=0;i<128;i+=2){f.addColorStop(i/128,"rgba(255, 255, 255, 0.1)");f.addColorStop((i+1)/128,"rgba(255, 255, 255, 0)")}cvsCtx.fillStyle=f;cvsCtx.fillRect(0,0,w,h);stripeOffset=(stripeOffset+h/128)%h}var lastTime=0;var r=intRandom(1,3);requestAnimationFrame(function draw(){if(Date.now()-lastTime>40){lastTime=Date.now();cvsCtx.clearRect(0,0,w,h);if(Math.floor(lastTime/r/1000)%2===0){r=intRandom(1,3);drawNoise()}else{drawText()}drawStripe()}requestAnimationFrame(draw)});