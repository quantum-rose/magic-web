var getQueryString=function getQueryString(key){var result=window.location.search.substring(1).match(new RegExp("(^|&)"+key+"=([^&]*)(&|$)","i"));return result!==null?decodeURI(result[2]):null};var initialSlide=getQueryString("index");Vue.use(window.VueAwesomeSwiper);new Vue({el:"#app",data:{swiperOptions:{initialSlide:isNaN(initialSlide)?0:initialSlide,direction:"vertical",mousewheel:true,pagination:{el:".swiper-pagination"},resistance:true,resistanceRatio:0,noSwiping:true},filterRange:[{label:"\u9AD8\u65AF\u6A21\u7CCA",value:0,mix:0,max:20,step:1,code:"blur",unit:"px"},{label:"\u4EAE\u5EA6",value:1,mix:0,max:2,step:0.01,code:"brightness",unit:""},{label:"\u5BF9\u6BD4\u5EA6",value:1,mix:0,max:6,step:0.01,code:"contrast",unit:""},{label:"\u7070\u5EA6",value:0,mix:0,max:1,step:0.01,code:"grayscale",unit:""},{label:"\u8272\u76F8\u65CB\u8F6C",value:0,mix:0,max:360,step:1,code:"hue-rotate",unit:"deg"},{label:"\u53CD\u8272",value:0,mix:0,max:1,step:0.01,code:"invert",unit:""},{label:"\u900F\u660E\u5EA6",value:1,mix:0,max:1,step:0.01,code:"opacity",unit:""},{label:"\u9971\u548C\u5EA6",value:1,mix:0,max:20,step:0.01,code:"saturate",unit:""},{label:"\u6CDB\u9EC4",value:0,mix:0,max:1,step:0.01,code:"sepia",unit:""}],dropShadow:{x:0,y:0,blur:0,color:"#ffffff"},blendModeRadio:[{label:"\u6B63\u5E38",value:"normal"},{label:"\u6B63\u7247\u53E0\u5E95",value:"multiply"},{label:"\u6EE4\u8272",value:"screen"},{label:"\u53E0\u52A0",value:"overlay"},{label:"\u53D8\u6697",value:"darken"},{label:"\u53D8\u4EAE",value:"lighten"},{label:"\u989C\u8272\u51CF\u6DE1",value:"color-dodge"},{label:"\u989C\u8272\u52A0\u6DF1",value:"color-burn"},{label:"\u5F3A\u5149",value:"hard-light"},{label:"\u67D4\u5149",value:"soft-light"},{label:"\u5DEE\u503C",value:"difference"},{label:"\u6392\u9664",value:"exclusion"},{label:"\u8272\u76F8",value:"hue"},{label:"\u9971\u548C\u5EA6",value:"saturation"},{label:"\u989C\u8272",value:"color"},{label:"\u660E\u5EA6",value:"luminosity"}],blendMode:"normal"},computed:{filterCode:function filterCode(){return this.filterRange.map(function(item){return item.code+"("+item.value+item.unit+")"})},filterStyle:function filterStyle(){var _this$dropShadow=this.dropShadow,x=_this$dropShadow.x,y=_this$dropShadow.y,blur=_this$dropShadow.blur,color=_this$dropShadow.color;return this.filterCode.join(" ")+" drop-shadow(".concat(x,"px ").concat(y,"px ").concat(blur,"px ").concat(color,")")}},methods:{}});