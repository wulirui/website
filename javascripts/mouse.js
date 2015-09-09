// JavaScript Document
	function enter(obj){
		obj.onmouseenter = function(ev){
			var oEvent = ev||event;
			var oSpan = this.getElementsByTagName('span')[0];
			var w = obj.offsetWidth;
			var h = obj.offsetHeight;
			var n = getN(obj,oEvent);
			switch(n){
				case 0: // right
					oSpan.style.top=0;
					oSpan.style.left=w+'px';
					move(oSpan, {left:0});
					break;
					
				case 1: // bottom
					oSpan.style.left=0;
					oSpan.style.top=h+'px';
					move(oSpan, {top:0});
					break;
					
				case 2: // left
					oSpan.style.left=-w+'px';
					oSpan.style.top=0;
					move(oSpan, {left:0});
					break;
					
				case 3: // top
					oSpan.style.left=0;
					oSpan.style.top=-h+'px';
					move(oSpan, {top:0});
					break;		
			}
		}
	}
	function leave(obj){
		obj.onmouseleave = function(ev){
			var oEvent = ev||event;
			var oSpan = this.getElementsByTagName('span')[0];
			var w = obj.offsetWidth;
			var h = obj.offsetHeight;
			var n = getN(obj,oEvent);
			switch(n){
				case 0: // right
					move(oSpan, {left:w});
					break;
					
				case 1: // bottom
					move(oSpan, {top:h});
					break;
					
				case 2: // left
					move(oSpan, {left:-w});
					break;
					
				case 3: // top
					move(oSpan, {top:-h});
					break;		
			}
		}
	}
	function getN(obj,ev){
		var l = getPos(obj).left;
		var t = getPos(obj).top
		var y = t+obj.offsetHeight/2-ev.clientY;
		var x = l+obj.offsetWidth/2-ev.clientX;
		var a = Math.round((a2d(Math.atan2(y,x))+180)/90)%4
		
		return a;
		
	}
	function a2d(n){
		return n*180/Math.PI;
	}
	function getPos(obj){
		var l=0;

		var t=0;

		while(obj){

			l+=obj.offsetLeft;

			t+=obj.offsetTop;

			obj=obj.offsetParent;

		}

		return {left:l,top:t}

	}
