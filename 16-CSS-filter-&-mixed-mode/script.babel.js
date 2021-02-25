var getQueryString=function getQueryString(key){var result=window.location.search.substring(1).match(new RegExp("(^|&)"+key+"=([^&]*)(&|$)","i"));return result!==null?decodeURI(result[2]):null};var initialSlide=getQueryString("index");Vue.use(window.VueAwesomeSwiper);new Vue({el:"#app",data:{swiperOptions:{initialSlide:isNaN(initialSlide)?0:initialSlide,direction:"vertical",mousewheel:true,pagination:{el:".swiper-pagination"},resistance:true,resistanceRatio:0,noSwiping:true},filterRange:[{label:"\u9AD8\u65AF\u6A21\u7CCA",value:0,mix:0,max:20,step:1,code:"blur",unit:"px"},{label:"\u4EAE\u5EA6",value:1,mix:0,max:2,step:0.01,code:"brightness",unit:""},{label:"\u5BF9\u6BD4\u5EA6",value:1,mix:0,max:6,step:0.01,code:"contrast",unit:""},{label:"\u7070\u5EA6",value:0,mix:0,max:1,step:0.01,code:"grayscale",unit:""},{label:"\u8272\u76F8\u65CB\u8F6C",value:0,mix:0,max:360,step:1,code:"hue-rotate",unit:"deg"},{label:"\u53CD\u8272",value:0,mix:0,max:1,step:0.01,code:"invert",unit:""},{label:"\u900F\u660E\u5EA6",value:1,mix:0,max:1,step:0.01,code:"opacity",unit:""},{label:"\u9971\u548C\u5EA6",value:1,mix:0,max:20,step:0.01,code:"saturate",unit:""},{label:"\u6CDB\u9EC4",value:0,mix:0,max:1,step:0.01,code:"sepia",unit:""}],dropShadow:{x:0,y:0,blur:0,color:"#ffffff"},blendModeRadio:[{label:"\u6B63\u5E38",value:"normal"},{label:"\u6B63\u7247\u53E0\u5E95",value:"multiply"},{label:"\u6EE4\u8272",value:"screen"},{label:"\u53E0\u52A0",value:"overlay"},{label:"\u53D8\u6697",value:"darken"},{label:"\u53D8\u4EAE",value:"lighten"},{label:"\u989C\u8272\u51CF\u6DE1",value:"color-dodge"},{label:"\u989C\u8272\u52A0\u6DF1",value:"color-burn"},{label:"\u5F3A\u5149",value:"hard-light"},{label:"\u67D4\u5149",value:"soft-light"},{label:"\u5DEE\u503C",value:"difference"},{label:"\u6392\u9664",value:"exclusion"},{label:"\u8272\u76F8",value:"hue"},{label:"\u9971\u548C\u5EA6",value:"saturation"},{label:"\u989C\u8272",value:"color"},{label:"\u660E\u5EA6",value:"luminosity"}],blendMode:"normal"},computed:{filterCode:function filterCode(){return this.filterRange.map(function(item){return item.code+"("+item.value+item.unit+")"})},filterStyle:function filterStyle(){var _this$dropShadow=this.dropShadow,x=_this$dropShadow.x,y=_this$dropShadow.y,blur=_this$dropShadow.blur,color=_this$dropShadow.color;return this.filterCode.join(" ")+" drop-shadow(".concat(x,"px ").concat(y,"px ").concat(blur,"px ").concat(color,")")}},methods:{}});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdC5qcyJdLCJuYW1lcyI6WyJnZXRRdWVyeVN0cmluZyIsImtleSIsInJlc3VsdCIsIndpbmRvdyIsImxvY2F0aW9uIiwic2VhcmNoIiwic3Vic3RyaW5nIiwibWF0Y2giLCJSZWdFeHAiLCJkZWNvZGVVUkkiLCJpbml0aWFsU2xpZGUiLCJWdWUiLCJ1c2UiLCJWdWVBd2Vzb21lU3dpcGVyIiwiZWwiLCJkYXRhIiwic3dpcGVyT3B0aW9ucyIsImlzTmFOIiwiZGlyZWN0aW9uIiwibW91c2V3aGVlbCIsInBhZ2luYXRpb24iLCJyZXNpc3RhbmNlIiwicmVzaXN0YW5jZVJhdGlvIiwibm9Td2lwaW5nIiwiZmlsdGVyUmFuZ2UiLCJsYWJlbCIsInZhbHVlIiwibWl4IiwibWF4Iiwic3RlcCIsImNvZGUiLCJ1bml0IiwiZHJvcFNoYWRvdyIsIngiLCJ5IiwiYmx1ciIsImNvbG9yIiwiYmxlbmRNb2RlUmFkaW8iLCJibGVuZE1vZGUiLCJjb21wdXRlZCIsImZpbHRlckNvZGUiLCJtYXAiLCJpdGVtIiwiZmlsdGVyU3R5bGUiLCJqb2luIiwibWV0aG9kcyJdLCJtYXBwaW5ncyI6IkFBQUEsR0FBTUEsQ0FBQUEsY0FBYyxDQUFHLFFBQWpCQSxDQUFBQSxjQUFpQixDQUFVQyxHQUFWLENBQWUsQ0FDbEMsR0FBTUMsQ0FBQUEsTUFBTSxDQUFHQyxNQUFNLENBQUNDLFFBQVAsQ0FBZ0JDLE1BQWhCLENBQXVCQyxTQUF2QixDQUFpQyxDQUFqQyxFQUFvQ0MsS0FBcEMsQ0FBMEMsR0FBSUMsQ0FBQUEsTUFBSixDQUFXLFFBQVVQLEdBQVYsQ0FBZ0IsZUFBM0IsQ0FBNEMsR0FBNUMsQ0FBMUMsQ0FBZixDQUNBLE1BQU9DLENBQUFBLE1BQU0sR0FBSyxJQUFYLENBQWtCTyxTQUFTLENBQUNQLE1BQU0sQ0FBQyxDQUFELENBQVAsQ0FBM0IsQ0FBeUMsSUFDbkQsQ0FIRCxDQUlBLEdBQU1RLENBQUFBLFlBQVksQ0FBR1YsY0FBYyxDQUFDLE9BQUQsQ0FBbkMsQ0FFQVcs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S0FBSyxDQUFFLE9BRlgsQ0F6RFksQ0E2RFosQ0FDSUQsS0FBSyxDQUFFLGNBRFgsQ0FFSUMsS0FBSyxDQUFFLFlBRlgsQ0E3RFksQ0FoR2QsQ0FrS0ZZLFNBQVMsQ0FBRSxRQWxLVCxDQUZGLENBc0tKQyxRQUFRLENBQUUsQ0FDTkMsVUFETSxzQkFDTyxDQUNULE1BQU8sTUFBS2hCLFdBQUwsQ0FBaUJpQixHQUFqQixDQUFxQixTQUFBQyxJQUFJLFFBQUlBLENBQUFBLElBQUksQ0FBQ1osSUFBTCxDQUFZLEdBQVosQ0FBa0JZLElBQUksQ0FBQ2hCLEtBQXZCLENBQStCZ0IsSUFBSSxDQUFDWCxJQUFwQyxDQUEyQyxHQUEvQyxDQUF6QixDQUNWLENBSEssQ0FJTlksV0FKTSx1QkFJUSxzQkFDb0IsS0FBS1gsVUFEekIsQ0FDRkMsQ0FERSxrQkFDRkEsQ0FERSxDQUNDQyxDQURELGtCQUNDQSxDQURELENBQ0lDLElBREosa0JBQ0lBLElBREosQ0FDVUMsS0FEVixrQkFDVUEsS0FEVixDQUVWLE1BQU8sTUFBS0ksVUFBTCxDQUFnQkksSUFBaEIsQ0FBcUIsR0FBckIseUJBQTRDWCxDQUE1QyxlQUFtREMsQ0FBbkQsZUFBMERDLElBQTFELGVBQW9FQyxLQUFwRSxLQUNWLENBUEssQ0F0S04sQ0ErS0pTLE9BQU8sQ0FBRSxFQS9LTCxDQUFSIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZ2V0UXVlcnlTdHJpbmcgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICBjb25zdCByZXN1bHQgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cmluZygxKS5tYXRjaChuZXcgUmVnRXhwKCcoXnwmKScgKyBrZXkgKyAnPShbXiZdKikoJnwkKScsICdpJykpO1xyXG4gICAgcmV0dXJuIHJlc3VsdCAhPT0gbnVsbCA/IGRlY29kZVVSSShyZXN1bHRbMl0pIDogbnVsbDtcclxufTtcclxuY29uc3QgaW5pdGlhbFNsaWRlID0gZ2V0UXVlcnlTdHJpbmcoJ2luZGV4Jyk7XHJcblxyXG5WdWUudXNlKHdpbmRvdy5WdWVBd2Vzb21lU3dpcGVyKTtcclxuXHJcbm5ldyBWdWUoe1xyXG4gICAgZWw6ICcjYXBwJyxcclxuICAgIGRhdGE6IHtcclxuICAgICAgICBzd2lwZXJPcHRpb25zOiB7XHJcbiAgICAgICAgICAgIGluaXRpYWxTbGlkZTogaXNOYU4oaW5pdGlhbFNsaWRlKSA/IDAgOiBpbml0aWFsU2xpZGUsXHJcbiAgICAgICAgICAgIGRpcmVjdGlvbjogJ3ZlcnRpY2FsJyxcclxuICAgICAgICAgICAgbW91c2V3aGVlbDogdHJ1ZSxcclxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgZWw6ICcuc3dpcGVyLXBhZ2luYXRpb24nLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZXNpc3RhbmNlOiB0cnVlLFxyXG4gICAgICAgICAgICByZXNpc3RhbmNlUmF0aW86IDAsXHJcbiAgICAgICAgICAgIG5vU3dpcGluZzogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZpbHRlclJhbmdlOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxhYmVsOiAn6auY5pav5qih57OKJyxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiAwLFxyXG4gICAgICAgICAgICAgICAgbWl4OiAwLFxyXG4gICAgICAgICAgICAgICAgbWF4OiAyMCxcclxuICAgICAgICAgICAgICAgIHN0ZXA6IDEsXHJcbiAgICAgICAgICAgICAgICBjb2RlOiAnYmx1cicsXHJcbiAgICAgICAgICAgICAgICB1bml0OiAncHgnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsYWJlbDogJ+S6ruW6picsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogMSxcclxuICAgICAgICAgICAgICAgIG1peDogMCxcclxuICAgICAgICAgICAgICAgIG1heDogMixcclxuICAgICAgICAgICAgICAgIHN0ZXA6IDAuMDEsXHJcbiAgICAgICAgICAgICAgICBjb2RlOiAnYnJpZ2h0bmVzcycsXHJcbiAgICAgICAgICAgICAgICB1bml0OiAnJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGFiZWw6ICflr7nmr5TluqYnLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IDEsXHJcbiAgICAgICAgICAgICAgICBtaXg6IDAsXHJcbiAgICAgICAgICAgICAgICBtYXg6IDYsXHJcbiAgICAgICAgICAgICAgICBzdGVwOiAwLjAxLFxyXG4gICAgICAgICAgICAgICAgY29kZTogJ2NvbnRyYXN0JyxcclxuICAgICAgICAgICAgICAgIHVuaXQ6ICcnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsYWJlbDogJ+eBsOW6picsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogMCxcclxuICAgICAgICAgICAgICAgIG1peDogMCxcclxuICAgICAgICAgICAgICAgIG1heDogMSxcclxuICAgICAgICAgICAgICAgIHN0ZXA6IDAuMDEsXHJcbiAgICAgICAgICAgICAgICBjb2RlOiAnZ3JheXNjYWxlJyxcclxuICAgICAgICAgICAgICAgIHVuaXQ6ICcnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsYWJlbDogJ+iJsuebuOaXi+i9rCcsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogMCxcclxuICAgICAgICAgICAgICAgIG1peDogMCxcclxuICAgICAgICAgICAgICAgIG1heDogMzYwLFxyXG4gICAgICAgICAgICAgICAgc3RlcDogMSxcclxuICAgICAgICAgICAgICAgIGNvZGU6ICdodWUtcm90YXRlJyxcclxuICAgICAgICAgICAgICAgIHVuaXQ6ICdkZWcnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsYWJlbDogJ+WPjeiJsicsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogMCxcclxuICAgICAgICAgICAgICAgIG1peDogMCxcclxuICAgICAgICAgICAgICAgIG1heDogMSxcclxuICAgICAgICAgICAgICAgIHN0ZXA6IDAuMDEsXHJcbiAgICAgICAgICAgICAgICBjb2RlOiAnaW52ZXJ0JyxcclxuICAgICAgICAgICAgICAgIHVuaXQ6ICcnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsYWJlbDogJ+mAj+aYjuW6picsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogMSxcclxuICAgICAgICAgICAgICAgIG1peDogMCxcclxuICAgICAgICAgICAgICAgIG1heDogMSxcclxuICAgICAgICAgICAgICAgIHN0ZXA6IDAuMDEsXHJcbiAgICAgICAgICAgICAgICBjb2RlOiAnb3BhY2l0eScsXHJcbiAgICAgICAgICAgICAgICB1bml0OiAnJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGFiZWw6ICfppbHlkozluqYnLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IDEsXHJcbiAgICAgICAgICAgICAgICBtaXg6IDAsXHJcbiAgICAgICAgICAgICAgICBtYXg6IDIwLFxyXG4gICAgICAgICAgICAgICAgc3RlcDogMC4wMSxcclxuICAgICAgICAgICAgICAgIGNvZGU6ICdzYXR1cmF0ZScsXHJcbiAgICAgICAgICAgICAgICB1bml0OiAnJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGFiZWw6ICfms5vpu4QnLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IDAsXHJcbiAgICAgICAgICAgICAgICBtaXg6IDAsXHJcbiAgICAgICAgICAgICAgICBtYXg6IDEsXHJcbiAgICAgICAgICAgICAgICBzdGVwOiAwLjAxLFxyXG4gICAgICAgICAgICAgICAgY29kZTogJ3NlcGlhJyxcclxuICAgICAgICAgICAgICAgIHVuaXQ6ICcnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgZHJvcFNoYWRvdzogeyB4OiAwLCB5OiAwLCBibHVyOiAwLCBjb2xvcjogJyNmZmZmZmYnIH0sXHJcbiAgICAgICAgYmxlbmRNb2RlUmFkaW86IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGFiZWw6ICfmraPluLgnLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6ICdub3JtYWwnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsYWJlbDogJ+ato+eJh+WPoOW6lScsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogJ211bHRpcGx5JyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGFiZWw6ICfmu6ToibInLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6ICdzY3JlZW4nLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsYWJlbDogJ+WPoOWKoCcsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogJ292ZXJsYXknLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsYWJlbDogJ+WPmOaalycsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogJ2RhcmtlbicsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxhYmVsOiAn5Y+Y5LquJyxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiAnbGlnaHRlbicsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxhYmVsOiAn6aKc6Imy5YeP5rehJyxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiAnY29sb3ItZG9kZ2UnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsYWJlbDogJ+minOiJsuWKoOa3sScsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogJ2NvbG9yLWJ1cm4nLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsYWJlbDogJ+W8uuWFiScsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogJ2hhcmQtbGlnaHQnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsYWJlbDogJ+aflOWFiScsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogJ3NvZnQtbGlnaHQnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsYWJlbDogJ+W3ruWAvCcsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogJ2RpZmZlcmVuY2UnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsYWJlbDogJ+aOkumZpCcsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogJ2V4Y2x1c2lvbicsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxhYmVsOiAn6Imy55u4JyxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiAnaHVlJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGFiZWw6ICfppbHlkozluqYnLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6ICdzYXR1cmF0aW9uJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGFiZWw6ICfpopzoibInLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6ICdjb2xvcicsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxhYmVsOiAn5piO5bqmJyxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiAnbHVtaW5vc2l0eScsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgICBibGVuZE1vZGU6ICdub3JtYWwnLFxyXG4gICAgfSxcclxuICAgIGNvbXB1dGVkOiB7XHJcbiAgICAgICAgZmlsdGVyQ29kZSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyUmFuZ2UubWFwKGl0ZW0gPT4gaXRlbS5jb2RlICsgJygnICsgaXRlbS52YWx1ZSArIGl0ZW0udW5pdCArICcpJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBmaWx0ZXJTdHlsZSgpIHtcclxuICAgICAgICAgICAgY29uc3QgeyB4LCB5LCBibHVyLCBjb2xvciB9ID0gdGhpcy5kcm9wU2hhZG93O1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXJDb2RlLmpvaW4oJyAnKSArIGAgZHJvcC1zaGFkb3coJHt4fXB4ICR7eX1weCAke2JsdXJ9cHggJHtjb2xvcn0pYDtcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIG1ldGhvZHM6IHt9LFxyXG59KTtcclxuIl19