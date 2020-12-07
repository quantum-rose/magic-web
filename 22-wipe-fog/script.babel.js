"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}(function(){var getQueryString=function getQueryString(key){var result=window.location.search.substring(1).match(new RegExp("(^|&)"+key+"=([^&]*)(&|$)","i"));return result!==null?decodeURI(result[2]):null};var initialSlide=getQueryString("index");new Swiper(".swiper-container",{initialSlide:isNaN(initialSlide)?0:initialSlide,direction:"vertical",mousewheel:true,pagination:{el:".swiper-pagination"},resistance:true,resistanceRatio:0,noSwiping:true})})();var cvs_1=document.querySelector("#cvs-1");cvs_1.width=cvs_1.offsetWidth*window.devicePixelRatio;cvs_1.height=cvs_1.offsetHeight*window.devicePixelRatio;var cvs_2=document.querySelector("#cvs-2");cvs_2.width=cvs_2.offsetWidth*window.devicePixelRatio;cvs_2.height=cvs_2.offsetHeight*window.devicePixelRatio;var Snowflake=function(){_createClass(Snowflake,[{key:"destroyed",get:function get(){return this.p===1}}]);function Snowflake(_ref){var cvsCtx=_ref.cvsCtx,radius=_ref.radius,duration=_ref.duration,startX=_ref.startX,startY=_ref.startY,endX=_ref.endX,endY=_ref.endY;_classCallCheck(this,Snowflake);_defineProperty(this,"cvsCtx",null);_defineProperty(this,"radius",0);_defineProperty(this,"duration",5000);_defineProperty(this,"startTime",0);_defineProperty(this,"startX",0);_defineProperty(this,"startY",0);_defineProperty(this,"endX",0);_defineProperty(this,"endY",0);this.cvsCtx=cvsCtx;this.radius=radius;this.duration=duration;this.startX=startX;this.startY=startY;this.endX=endX;this.endY=endY;this.startTime=Date.now()}_createClass(Snowflake,[{key:"render",value:function render(){var cvsCtx=this.cvsCtx,radius=this.radius,duration=this.duration,startTime=this.startTime,startX=this.startX,startY=this.startY,endX=this.endX,endY=this.endY;var p=this.p=Math.max(Math.min((Date.now()-startTime)/duration,1),0);var x=startX+(endX-startX)*p;var y=startY+(endY-startY)*p;var f=cvsCtx.createRadialGradient(x,y,0,x,y,radius);f.addColorStop(0,"rgba(255,255,255,1)");f.addColorStop(0.25,"rgba(255,255,255,1)");f.addColorStop(1,"rgba(255,255,255,0)");cvsCtx.beginPath();cvsCtx.arc(x,y,radius,0,Math.PI*2,false);cvsCtx.fillStyle=f;cvsCtx.fill();cvsCtx.closePath()}}]);return Snowflake}();var Snowing=function(){function Snowing(cvs){var _this=this;_classCallCheck(this,Snowing);_defineProperty(this,"cvs",null);_defineProperty(this,"cvsCtx",null);_defineProperty(this,"width",0);_defineProperty(this,"height",0);_defineProperty(this,"snowflake",[]);_defineProperty(this,"_onEnterFrame",function(){var cvsCtx=_this.cvsCtx,width=_this.width,height=_this.height;cvsCtx.clearRect(0,0,width,height);_this._addSnowflake();_this.snowflake=_this.snowflake.filter(function(item){return!item.destroyed&&item.render(),!item.destroyed});requestAnimationFrame(_this._onEnterFrame)});this.cvs=cvs;this.cvsCtx=cvs.getContext("2d");this.width=cvs.width;this.height=cvs.height;this._onEnterFrame()}_createClass(Snowing,[{key:"_addSnowflake",value:function _addSnowflake(){var cvsCtx=this.cvsCtx,width=this.width,height=this.height;var radius=5+Math.random()*10;var duration=2000+Math.random()*2000;var startX=Math.random()*width;var endX=startX;var startY=-2*radius;var endY=height+2*radius;this.snowflake.push(new Snowflake({cvsCtx:cvsCtx,radius:radius,duration:duration,startX:startX,startY:startY,endX:endX,endY:endY}))}}]);return Snowing}();var Footpring=function(){_createClass(Footpring,[{key:"destroyed",get:function get(){return this.p===1}}]);function Footpring(_ref2){var cvsCtx=_ref2.cvsCtx,startX=_ref2.startX,startY=_ref2.startY,endX=_ref2.endX,endY=_ref2.endY;_classCallCheck(this,Footpring);_defineProperty(this,"cvsCtx",null);_defineProperty(this,"duration",5000);_defineProperty(this,"startTime",0);_defineProperty(this,"startX",0);_defineProperty(this,"startY",0);_defineProperty(this,"endX",0);_defineProperty(this,"endY",0);_defineProperty(this,"p",0);this.cvsCtx=cvsCtx;this.startX=startX;this.startY=startY;this.endX=endX;this.endY=endY;this.startTime=Date.now()}_createClass(Footpring,[{key:"render",value:function render(){var cvsCtx=this.cvsCtx,duration=this.duration,startTime=this.startTime,startX=this.startX,startY=this.startY,endX=this.endX,endY=this.endY;this.p=this._easeInQuad(Math.max(Math.min((Date.now()-startTime)/duration,1),0));cvsCtx.beginPath();cvsCtx.strokeStyle="#000000";cvsCtx.lineWidth=100*(1-this.p)+1;cvsCtx.lineCap="round";cvsCtx.moveTo(startX,startY);cvsCtx.lineTo(endX,endY);cvsCtx.stroke();cvsCtx.closePath()}},{key:"_easeInQuad",value:function _easeInQuad(x){return x*x}}]);return Footpring}();var FogWindow=function FogWindow(cvs){var _this2=this;_classCallCheck(this,FogWindow);_defineProperty(this,"cvs",null);_defineProperty(this,"cvsCtx",null);_defineProperty(this,"width",0);_defineProperty(this,"height",0);_defineProperty(this,"lastPoint",{x:0,y:0});_defineProperty(this,"path",[]);_defineProperty(this,"snow",[]);_defineProperty(this,"wipe",function(e){var cvsCtx=_this2.cvsCtx,_this2$lastPoint=_this2.lastPoint,startX=_this2$lastPoint.x,startY=_this2$lastPoint.y;var endX=e.offsetX,endY=e.offsetY;_this2.lastPoint.x=endX;_this2.lastPoint.y=endY;_this2.path.push(new Footpring({cvsCtx:cvsCtx,startX:startX,startY:startY,endX:endX,endY:endY}))});_defineProperty(this,"_onEnterFrame",function(){var cvsCtx=_this2.cvsCtx,width=_this2.width,height=_this2.height;cvsCtx.clearRect(0,0,width,height);cvsCtx.fillStyle="rgba(255,255,255,0.9)";cvsCtx.fillRect(0,0,width,height);cvsCtx.fillStyle="#000000";cvsCtx.textAlign="center";cvsCtx.textBaseline="middle";cvsCtx.font="700 400px Helvetica";cvsCtx.fillText("winter",width/2,200);_this2.path=_this2.path.filter(function(item){return!item.destroyed&&item.render(),!item.destroyed});requestAnimationFrame(_this2._onEnterFrame)});this.cvs=cvs;this.cvsCtx=cvs.getContext("2d");this.width=cvs.width;this.height=cvs.height;cvs.addEventListener("mousedown",function(e){var x=e.offsetX,y=e.offsetY;_this2.lastPoint.x=x;_this2.lastPoint.y=y;cvs.addEventListener("mousemove",_this2.wipe)});cvs.addEventListener("mouseup",function(e){cvs.removeEventListener("mousemove",_this2.wipe)});this._onEnterFrame()};new Snowing(cvs_1);new FogWindow(cvs_2);var cvs_3=document.querySelector("#cvs-3");cvs_3.width=cvs_3.offsetWidth*window.devicePixelRatio;cvs_3.height=cvs_3.offsetHeight*window.devicePixelRatio;var ScratchCard=function ScratchCard(_cvs,img){var _this3=this;_classCallCheck(this,ScratchCard);_defineProperty(this,"cvs",null);_defineProperty(this,"cvsCtx",null);_defineProperty(this,"width",0);_defineProperty(this,"height",0);_defineProperty(this,"lastPoint",{x:0,y:0});_defineProperty(this,"path",[]);_defineProperty(this,"$img",null);_defineProperty(this,"_onLoad",function(){var cvs=_this3.cvs,$img=_this3.$img,width=_this3.width,height=_this3.height,_this3$$img=_this3.$img,w=_this3$$img.naturalWidth,h=_this3$$img.naturalHeight;var offCvs=_this3.offCvs=document.createElement("canvas");offCvs.width=width;offCvs.height=height;var offCvsCtx=offCvs.getContext("2d");var sWidth,sHeight,sx,sy;if(w/h>width/height){sWidth=h*(width/height);sHeight=h;sx=(w-sWidth)/2;sy=0}else{sWidth=w;sHeight=w*(height/width);sx=0;sy=h-sHeight}offCvsCtx.drawImage($img,sx,sy,sWidth,sHeight,0,0,width,height);cvs.addEventListener("mousedown",function(e){var x=e.offsetX,y=e.offsetY;_this3.lastPoint.x=x;_this3.lastPoint.y=y;cvs.addEventListener("mousemove",_this3.wipe)});cvs.addEventListener("mouseup",function(e){cvs.removeEventListener("mousemove",_this3.wipe)});_this3._onEnterFrame()});_defineProperty(this,"wipe",function(e){var cvsCtx=_this3.cvsCtx,_this3$lastPoint=_this3.lastPoint,startX=_this3$lastPoint.x,startY=_this3$lastPoint.y;var endX=e.offsetX,endY=e.offsetY;_this3.lastPoint.x=endX;_this3.lastPoint.y=endY;_this3.path.push(new Footpring({cvsCtx:cvsCtx,startX:startX,startY:startY,endX:endX,endY:endY}))});_defineProperty(this,"_onEnterFrame",function(){var cvsCtx=_this3.cvsCtx,width=_this3.width,height=_this3.height,offCvs=_this3.offCvs;cvsCtx.clearRect(0,0,width,height);cvsCtx.fillStyle="#000000";cvsCtx.textAlign="center";cvsCtx.textBaseline="middle";cvsCtx.font="700 400px Helvetica";cvsCtx.fillText("coming",width/2,200);_this3.path=_this3.path.filter(function(item){return!item.destroyed&&item.render(),!item.destroyed});cvsCtx.save();cvsCtx.globalCompositeOperation="source-in";cvsCtx.drawImage(offCvs,0,0,width,height);cvsCtx.restore();requestAnimationFrame(_this3._onEnterFrame)});this.cvs=_cvs;this.cvsCtx=_cvs.getContext("2d");this.width=_cvs.width;this.height=_cvs.height;this.$img=document.createElement("img");this.$img.src=img;this.$img.addEventListener("load",this._onLoad)};new ScratchCard(cvs_3,"./bg-2.jpg");