function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor}var Vector2D=function(){function Vector2D(){var x=arguments.length>0&&arguments[0]!==undefined?arguments[0]:1;var y=arguments.length>1&&arguments[1]!==undefined?arguments[1]:0;_classCallCheck(this,Vector2D);this.x=x;this.y=y}_createClass(Vector2D,[{key:"norm",get:function get(){return Math.hypot(this.x,this.y)},set:function set(val){}},{key:"dir",get:function get(){return Math.atan2(this.y,this.x)},set:function set(val){}},{key:"copy",value:function copy(){return new Vector2D(this.x,this.y)}},{key:"add",value:function add(vec){this.x+=vec.x;this.y+=vec.y;return this}},{key:"sub",value:function sub(vec){this.x-=vec.x;this.y-=vec.y;return this}},{key:"dot",value:function dot(vec){return this.x*vec.x+this.y*vec.y}},{key:"cross",value:function cross(vec){return this.x*vec.y-this.y*vec.x}},{key:"scale",value:function scale(s){this.x*=s;this.y*=s;return this}},{key:"rotate",value:function rotate(rad){var cos=Math.cos(rad);var sin=Math.sin(rad);var x=this.x,y=this.y;this.x=cos*x+sin*y;this.y=-sin*x+cos*y;return this}},{key:"normalize",value:function normalize(){return this.scale(1/this.norm)}}]);return Vector2D}();var cvs=document.querySelector("#tree"),cvsCtx=cvs.getContext("2d");cvs.width=cvs.offsetWidth*window.devicePixelRatio;cvs.height=cvs.offsetHeight*window.devicePixelRatio;cvs.style.width=cvs.offsetWidth+"px";cvs.style.height=cvs.offsetHeight+"px";cvsCtx.transform(1,0,0,-1,cvs.width/2,cvs.height);function drawBranch(cvsCtx,totalLength,start,end,lineWidth,strokeStyle,callback){var deltaX=end.x-start.x;var deltaY=end.y-start.y;var length=0;var lastTime=0;requestAnimationFrame(function draw(){if(Date.now()-lastTime>16){lastTime=Date.now();length+=10;length>totalLength&&(length=totalLength);var progress=length/totalLength;cvsCtx.beginPath();cvsCtx.strokeStyle=strokeStyle;cvsCtx.lineWidth=lineWidth;cvsCtx.lineCap="round";cvsCtx.moveTo(start.x,start.y);cvsCtx.lineTo(start.x+deltaX*progress,start.y+deltaY*progress);cvsCtx.stroke()}if(length!==totalLength){requestAnimationFrame(draw)}else{callback()}})}function drawTree(cvsCtx,start,length,width,dir,bias){var end=new Vector2D().scale(length).rotate(dir).add(start);drawBranch(cvsCtx,length,start,end,width,"#000",function(){if(width>=1){drawTree(cvsCtx,end,length*0.8,width*0.8,dir+Math.PI*0.125+bias*(0.5-Math.random()),bias*0.9);drawTree(cvsCtx,end,length*0.8,width*0.8,dir-Math.PI*0.125+bias*(0.5-Math.random()),bias*0.9)}if(width<5&&Math.random()<0.2){cvsCtx.save();cvsCtx.strokeStyle="#c72c35";cvsCtx.lineWidth=Math.random()*10+3;cvsCtx.lineCap="round";cvsCtx.beginPath();cvsCtx.moveTo(end.x,end.y-1);cvsCtx.lineTo(end.x,end.y+1);cvsCtx.stroke();cvsCtx.restore()}})}drawTree(cvsCtx,new Vector2D(0,0),Math.min(cvs.width,cvs.height)*0.2,Math.min(cvs.width,cvs.height)*0.02,Math.PI*-0.5+(0.5-Math.random()),Math.PI/3);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdC5qcyJdLCJuYW1lcyI6WyJWZWN0b3IyRCIsIngiLCJ5IiwiTWF0aCIsImh5cG90IiwidmFsIiwiYXRhbjIiLCJ2ZWMiLCJzIiwicmFkIiwiY29zIiwic2luIiwic2NhbGUiLCJub3JtIiwiY3ZzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY3ZzQ3R4IiwiZ2V0Q29udGV4dCIsIndpZHRoIiwib2Zmc2V0V2lkdGgiLCJ3aW5kb3ciLCJkZXZpY2VQaXhlbFJhdGlvIiwiaGVpZ2h0Iiwib2Zmc2V0SGVpZ2h0Iiwic3R5bGUiLCJ0cmFuc2Zvcm0iLCJkcmF3QnJhbmNoIiwidG90YWxMZW5ndGgiLCJzdGFydCIsImVuZCIsImxpbmVXaWR0aCIsInN0cm9rZVN0eWxlIiwiY2FsbGJhY2siLCJkZWx0YVgiLCJkZWx0YVkiLCJsZW5ndGgiLCJsYXN0VGltZSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImRyYXciLCJEYXRlIiwibm93IiwicHJvZ3Jlc3MiLCJiZWdpblBhdGgiLCJsaW5lQ2FwIiwibW92ZVRvIiwibGluZVRvIiwic3Ryb2tlIiwiZHJhd1RyZWUiLCJkaXIiLCJiaWFzIiwicm90YXRlIiwiYWRkIiwiUEkiLCJyYW5kb20iLCJzYXZlIiwicmVzdG9yZSIsIm1pbiJdLCJtYXBwaW5ncyI6InVuQkFBTUEsQ0FBQUEsUSxZQUNGLG1CQUEwQixJQUFkQyxDQUFBQSxDQUFjLDJEQUFWLENBQVUsSUFBUEMsQ0FBQUEsQ0FBTywyREFBSCxDQUFHLGdDQUN0QixLQUFLRCxDQUFMLENBQVNBLENBQVQsQ0FDQSxLQUFLQyxDQUFMLENBQVNBLENBQ1osQyx1Q0FLRCxjQUFXLENBQ1AsTUFBT0MsQ0FBQUEsSUFBSSxDQUFDQyxLQUFMLENBQVcsS0FBS0gsQ0FBaEIsQ0FBbUIsS0FBS0MsQ0FBeEIsQ0FDVixDLEtBSEQsYUFBU0csR0FBVCxDQUFjLENBQUUsQyxpQkFRaEIsY0FBVSxDQUNOLE1BQU9GLENBQUFBLElBQUksQ0FBQ0csS0FBTCxDQUFX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Q21ELE1BQUwsR0FBZ0IsRUFBaEIsQ0FBcUIsQ0FBeEMsQ0FDQXJDLE1BQU0sQ0FBQzJCLE9BQVAsQ0FBaUIsT0FBakIsQ0FDQTNCLE1BQU0sQ0FBQzBCLFNBQVAsR0FDQTFCLE1BQU0sQ0FBQzRCLE1BQVAsQ0FBY2YsR0FBRyxDQUFDN0IsQ0FBbEIsQ0FBcUI2QixHQUFHLENBQUM1QixDQUFKLENBQVEsQ0FBN0IsRUFDQWUsTUFBTSxDQUFDNkIsTUFBUCxDQUFjaEIsR0FBRyxDQUFDN0IsQ0FBbEIsQ0FBcUI2QixHQUFHLENBQUM1QixDQUFKLENBQVEsQ0FBN0IsRUFDQWUsTUFBTSxDQUFDOEIsTUFBUCxHQUNBOUIsTUFBTSxDQUFDdUMsT0FBUCxFQUNILENBQ0osQ0EvQlMsQ0FnQ2IsQ0FFRFIsUUFBUSxDQUNKL0IsTUFESSxDQUVKLEdBQUlqQixDQUFBQSxRQUFKLENBQWEsQ0FBYixDQUFnQixDQUFoQixDQUZJLENBR0pHLElBQUksQ0FBQ3NELEdBQUwsQ0FBUzNDLEdBQUcsQ0FBQ0ssS0FBYixDQUFvQkwsR0FBRyxDQUFDUyxNQUF4QixFQUFrQyxHQUg5QixDQUlKcEIsSUFBSSxDQUFDc0QsR0FBTCxDQUFTM0MsR0FBRyxDQUFDSyxLQUFiLENBQW9CTCxHQUFHLENBQUNTLE1BQXhCLEVBQWtDLElBSjlCLENBS0pwQixJQUFJLENBQUNrRCxFQUFMLENBQVUsQ0FBQyxHQUFYLEVBQWtCLElBQU1sRCxJQUFJLENBQUNtRCxNQUFMLEVBQXhCLENBTEksQ0FNSm5ELElBQUksQ0FBQ2tELEVBQUwsQ0FBVSxDQU5OLENBQVIiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBWZWN0b3IyRCB7XHJcbiAgICBjb25zdHJ1Y3Rvcih4ID0gMSwgeSA9IDApIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWQkemHj+eahOaooe+8jOWQkemHj+eahOmVv+W6puWAvFxyXG4gICAgICovXHJcbiAgICBzZXQgbm9ybSh2YWwpIHt9XHJcbiAgICBnZXQgbm9ybSgpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5oeXBvdCh0aGlzLngsIHRoaXMueSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOaWueWQke+8jOW8p+W6puWAvO+8jOWQkemHj+WIsCB4IOi9tOato+aWueWQkeeahOinkuW6pu+8jHkg6L205q2j5pa55ZCR5Li6OTDluqZcclxuICAgICAqL1xyXG4gICAgc2V0IGRpcih2YWwpIHt9XHJcbiAgICBnZXQgZGlyKCkge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmF0YW4yKHRoaXMueSwgdGhpcy54KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5aSN5Yi25ZCR6YePXHJcbiAgICAgKi9cclxuICAgIGNvcHkoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyRCh0aGlzLngsIHRoaXMueSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWQkemHj+WKoOazlVxyXG4gICAgICogQHBhcmFtIHtWZWN0b3IyRH0gdmVjIOWQkemHj1xyXG4gICAgICovXHJcbiAgICBhZGQodmVjKSB7XHJcbiAgICAgICAgdGhpcy54ICs9IHZlYy54O1xyXG4gICAgICAgIHRoaXMueSArPSB2ZWMueTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5ZCR6YeP5YeP5rOVXHJcbiAgICAgKiBAcGFyYW0ge1ZlY3RvcjJEfSB2ZWMg5ZCR6YePXHJcbiAgICAgKi9cclxuICAgIHN1Yih2ZWMpIHtcclxuICAgICAgICB0aGlzLnggLT0gdmVjLng7XHJcbiAgICAgICAgdGhpcy55IC09IHZlYy55O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDngrnnp69cclxuICAgICAqIEBwYXJhbSB7VmVjdG9yMkR9IHZlYyDlkJHph49cclxuICAgICAqL1xyXG4gICAgZG90KHZlYykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnggKiB2ZWMueCArIHRoaXMueSAqIHZlYy55O1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlj4nnp69cclxuICAgICAqIEBwYXJhbSB7VmVjdG9yMkR9IHZlYyDlkJHph49cclxuICAgICAqL1xyXG4gICAgY3Jvc3ModmVjKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueCAqIHZlYy55IC0gdGhpcy55ICogdmVjLng7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWQkemHj+e8qeaUvlxyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHMg57yp5pS+5YCN5pWwXHJcbiAgICAgKi9cclxuICAgIHNjYWxlKHMpIHtcclxuICAgICAgICB0aGlzLnggKj0gcztcclxuICAgICAgICB0aGlzLnkgKj0gcztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5ZCR6YeP5peL6L2s77yM5LuOIHgg6L205q2j5pa55ZCR5YiwIHkg6L205q2j5pa55ZCR55qE5peL6L2s5Li65q2j5YC8XHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcmFkIOW8p+W6plxyXG4gICAgICovXHJcbiAgICByb3RhdGUocmFkKSB7XHJcbiAgICAgICAgY29uc3QgY29zID0gTWF0aC5jb3MocmFkKTtcclxuICAgICAgICBjb25zdCBzaW4gPSBNYXRoLnNpbihyYWQpO1xyXG4gICAgICAgIGNvbnN0IHsgeCwgeSB9ID0gdGhpcztcclxuICAgICAgICB0aGlzLnggPSBjb3MgKiB4ICsgc2luICogeTtcclxuICAgICAgICB0aGlzLnkgPSAtc2luICogeCArIGNvcyAqIHk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWMluS4uuWNleS9jeWQkemHj1xyXG4gICAgICovXHJcbiAgICBub3JtYWxpemUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NhbGUoMSAvIHRoaXMubm9ybSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IGN2cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0cmVlJyksXHJcbiAgICBjdnNDdHggPSBjdnMuZ2V0Q29udGV4dCgnMmQnKTtcclxuXHJcbmN2cy53aWR0aCA9IGN2cy5vZmZzZXRXaWR0aCAqIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvO1xyXG5jdnMuaGVpZ2h0ID0gY3ZzLm9mZnNldEhlaWdodCAqIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvO1xyXG5jdnMuc3R5bGUud2lkdGggPSBjdnMub2Zmc2V0V2lkdGggKyAncHgnO1xyXG5jdnMuc3R5bGUuaGVpZ2h0ID0gY3ZzLm9mZnNldEhlaWdodCArICdweCc7XHJcblxyXG5jdnNDdHgudHJhbnNmb3JtKDEsIDAsIDAsIC0xLCBjdnMud2lkdGggLyAyLCBjdnMuaGVpZ2h0KTtcclxuXHJcbmZ1bmN0aW9uIGRyYXdCcmFuY2goY3ZzQ3R4LCB0b3RhbExlbmd0aCwgc3RhcnQsIGVuZCwgbGluZVdpZHRoLCBzdHJva2VTdHlsZSwgY2FsbGJhY2spIHtcclxuICAgIGNvbnN0IGRlbHRhWCA9IGVuZC54IC0gc3RhcnQueDtcclxuICAgIGNvbnN0IGRlbHRhWSA9IGVuZC55IC0gc3RhcnQueTtcclxuICAgIGxldCBsZW5ndGggPSAwO1xyXG4gICAgbGV0IGxhc3RUaW1lID0gMDtcclxuXHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gZHJhdygpIHtcclxuICAgICAgICBpZiAoRGF0ZS5ub3coKSAtIGxhc3RUaW1lID4gMTYpIHtcclxuICAgICAgICAgICAgbGFzdFRpbWUgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgICAgICBsZW5ndGggKz0gMTA7XHJcbiAgICAgICAgICAgIGxlbmd0aCA+IHRvdGFsTGVuZ3RoICYmIChsZW5ndGggPSB0b3RhbExlbmd0aCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb2dyZXNzID0gbGVuZ3RoIC8gdG90YWxMZW5ndGg7XHJcblxyXG4gICAgICAgICAgICBjdnNDdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgIGN2c0N0eC5zdHJva2VTdHlsZSA9IHN0cm9rZVN0eWxlO1xyXG4gICAgICAgICAgICBjdnNDdHgubGluZVdpZHRoID0gbGluZVdpZHRoO1xyXG4gICAgICAgICAgICBjdnNDdHgubGluZUNhcCA9ICdyb3VuZCc7XHJcbiAgICAgICAgICAgIGN2c0N0eC5tb3ZlVG8oc3RhcnQueCwgc3RhcnQueSk7XHJcbiAgICAgICAgICAgIGN2c0N0eC5saW5lVG8oc3RhcnQueCArIGRlbHRhWCAqIHByb2dyZXNzLCBzdGFydC55ICsgZGVsdGFZICogcHJvZ3Jlc3MpO1xyXG4gICAgICAgICAgICBjdnNDdHguc3Ryb2tlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChsZW5ndGggIT09IHRvdGFsTGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkcmF3VHJlZShjdnNDdHgsIHN0YXJ0LCBsZW5ndGgsIHdpZHRoLCBkaXIsIGJpYXMpIHtcclxuICAgIGNvbnN0IGVuZCA9IG5ldyBWZWN0b3IyRCgpLnNjYWxlKGxlbmd0aCkucm90YXRlKGRpcikuYWRkKHN0YXJ0KTtcclxuXHJcbiAgICBkcmF3QnJhbmNoKGN2c0N0eCwgbGVuZ3RoLCBzdGFydCwgZW5kLCB3aWR0aCwgJyMwMDAnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHdpZHRoID49IDEpIHtcclxuICAgICAgICAgICAgZHJhd1RyZWUoXHJcbiAgICAgICAgICAgICAgICBjdnNDdHgsXHJcbiAgICAgICAgICAgICAgICBlbmQsXHJcbiAgICAgICAgICAgICAgICBsZW5ndGggKiAwLjgsXHJcbiAgICAgICAgICAgICAgICB3aWR0aCAqIDAuOCxcclxuICAgICAgICAgICAgICAgIGRpciArIE1hdGguUEkgKiAwLjEyNSArIGJpYXMgKiAoMC41IC0gTWF0aC5yYW5kb20oKSksXHJcbiAgICAgICAgICAgICAgICBiaWFzICogMC45XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGRyYXdUcmVlKFxyXG4gICAgICAgICAgICAgICAgY3ZzQ3R4LFxyXG4gICAgICAgICAgICAgICAgZW5kLFxyXG4gICAgICAgICAgICAgICAgbGVuZ3RoICogMC44LFxyXG4gICAgICAgICAgICAgICAgd2lkdGggKiAwLjgsXHJcbiAgICAgICAgICAgICAgICBkaXIgLSBNYXRoLlBJICogMC4xMjUgKyBiaWFzICogKDAuNSAtIE1hdGgucmFuZG9tKCkpLFxyXG4gICAgICAgICAgICAgICAgYmlhcyAqIDAuOVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHdpZHRoIDwgNSAmJiBNYXRoLnJhbmRvbSgpIDwgMC4yKSB7XHJcbiAgICAgICAgICAgIGN2c0N0eC5zYXZlKCk7XHJcbiAgICAgICAgICAgIGN2c0N0eC5zdHJva2VTdHlsZSA9ICcjYzcyYzM1JztcclxuICAgICAgICAgICAgY3ZzQ3R4LmxpbmVXaWR0aCA9IE1hdGgucmFuZG9tKCkgKiAxMCArIDM7XHJcbiAgICAgICAgICAgIGN2c0N0eC5saW5lQ2FwID0gJ3JvdW5kJztcclxuICAgICAgICAgICAgY3ZzQ3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgICAgICBjdnNDdHgubW92ZVRvKGVuZC54LCBlbmQueSAtIDEpO1xyXG4gICAgICAgICAgICBjdnNDdHgubGluZVRvKGVuZC54LCBlbmQueSArIDEpO1xyXG4gICAgICAgICAgICBjdnNDdHguc3Ryb2tlKCk7XHJcbiAgICAgICAgICAgIGN2c0N0eC5yZXN0b3JlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmRyYXdUcmVlKFxyXG4gICAgY3ZzQ3R4LFxyXG4gICAgbmV3IFZlY3RvcjJEKDAsIDApLFxyXG4gICAgTWF0aC5taW4oY3ZzLndpZHRoLCBjdnMuaGVpZ2h0KSAqIDAuMixcclxuICAgIE1hdGgubWluKGN2cy53aWR0aCwgY3ZzLmhlaWdodCkgKiAwLjAyLFxyXG4gICAgTWF0aC5QSSAqIC0wLjUgKyAoMC41IC0gTWF0aC5yYW5kb20oKSksXHJcbiAgICBNYXRoLlBJIC8gM1xyXG4pO1xyXG4iXX0=