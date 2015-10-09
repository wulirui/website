// JavaScript Document
window.onload = function(){
//轮播

//案例展示
	;(function(){
		var oUl = document.getElementById('list');
		var aLi = oUl.children;
		var oWheel = document.getElementById('wheel');
		var oSpan = oWheel.getElementsByTagName('span')[0];
		//ul的宽 
		oUl.style.width = aLi[0].offsetWidth*aLi.length+'px';
		
		//span的宽
		var scale = 1000/oUl.offsetWidth;
		oSpan.style.width = scale*1000+'px';
		
		//最大值
		var nMaxL = oWheel.offsetWidth-oSpan.offsetWidth;
		var nListL = oUl.offsetWidth-1000;
		
		var left = 0;
		oSpan.onmousedown = function(ev){
			var oEvent = ev||event;
			var disX = oEvent.clientX-oSpan.offsetLeft;
			document.onmousemove = function(ev){
				var oEvent = ev||event;
				left = oEvent.clientX-disX;
				
				setLeft(left);
			};
			document.onmouseup = function(){
				document.onmousemove = null;
				document.onmouseup = null;
			};
			return false;
		};
		
		function setLeft(left){
			if(left<0){
				left=0;
			}else if(left>nMaxL){
				left=nMaxL;
			}
			var scale = left/nMaxL*nListL;
			oUl.style.left = -scale+'px';
			//alert(scale);
			
			oSpan.style.left = left+'px';
		}
		
	})();
	

}