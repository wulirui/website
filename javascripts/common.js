// JavaScript Document
window.onload = function(){
//轮播
	;(function(){
		var oBox=document.getElementById('banner');
		var oMb = document.getElementById('ban_con');
		var oOl=oBox.getElementsByTagName('ol')[0];
		var aLi=oOl.children;
		var oUl=oBox.getElementsByTagName('ul')[0];
		var aBtn=oUl.children;
		var timer = null;
		
		//复制一份
		oOl.innerHTML+=oOl.innerHTML;
		oOl.style.width=aLi.length*aLi[0].offsetWidth+'px';
		
		var W=oOl.offsetWidth/2;
		
		var iNow=0;
		for(var i=0; i<aBtn.length; i++){
			(function(index){
				aBtn[i].onclick=function(){
					iNow=index;
					tab();
				}
			})(i);
		}
		
		timer = setInterval(function(){
			iNow++;
			tab();
		},4000);
		
		oMb.onmouseover = function(){
			clearInterval(timer);
		};

		oMb.onmouseout = function(){
			timer = setInterval(function(){
				iNow++;
				tab();
			},4000);
		};		
		function tab(){
			for(var i=0; i<aBtn.length; i++){
				aBtn[i].className='';
			}
			if(iNow>0){
				aBtn[iNow%aBtn.length].className='active';
			}else{
				aBtn[(iNow%aBtn.length+aBtn.length)%aBtn.length].className='active';	
			}
			//oUl.style.left=-iNow*aLi[0].offsetWidth+'px';	
			startMove(oOl,-iNow*aLi[0].offsetWidth);
		}	
		
		var left=0;
		function startMove(obj,iTarget){
			var count=Math.floor(1000/30);
			var start=left;
			var dis=iTarget-start;
			var n=0;
			clearInterval(obj.timer);
			obj.timer=setInterval(function(){
				n++;
				
				var a=1-n/count;
				left=start+dis*(1-Math.pow(a,3));
				
				if(left<0){
					obj.style.left=left%W+'px';	
				}else{
					obj.style.left=(left%W-W)%W+'px';		
				}
				
				if(n==count){
					clearInterval(obj.timer);	
				}
			},30);
		}
	})();
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
//锚点

(function(){
	function scroll2(index){
		var oBd = document.getElementById('bd');
		var aMain = oBd.children;
		var timer = null;
		iNow=index;
		clearInterval(timer);
		var n=0;
		var count=Math.floor(1000/30);
		var start=document.documentElement.scrollTop||document.body.scrollTop;
		var iTarget=aMain[index].offsetTop;
		var dis=iTarget-start;
		timer=setInterval(function(){
			bScroll=false;
			n++;
			var a=1-n/count;
			var top=start+dis*(1-Math.pow(a,3));
			document.documentElement.scrollTop=document.body.scrollTop=top;
			if(n==count){
				clearInterval(timer);
			}	
		},30);	
	}
	var oH = document.getElementById('header');
	var oTs = document.getElementById('ts');
	var oUl = document.getElementById('list');
	var aLi = oUl.children;
	for(var i = 0; i<aLi.length;i++){
		(function(index){
			aLi[i].onclick = function(){
				oTs.style.display = 'block';
				oH.style.position='fixed';
				scroll2(index)
			};
		})(i);
	}
})();
}