window.onload=function(){

	var teArr=[0,0,0,0,0,0];	
	var rows=15,col=15;
	var level=2;
	var i,j,k;
	var current;
	var tetrisHis=new Array();
	var teXArray=new Array(col);
	var pixHis=new Array(col);
	var disrow=new Array(rows);        
	
	
	
	var inputInf=window.prompt("输入游戏行数列数和关卡数：如15 15 1");
	var inputNum=inputInf.split(" ");
	rows=inputNum[0];col=inputNum[1];level=inputNum[2];
	
	if(col==null){
		rows=15;
		col=15;
		level=1;
	}
	//alert(rows);
	
	for(var inr =0;inr<rows;inr++){
		pixHis[inr]=new Array();
		disrow[inr]=0;
		for(var ini =0; ini<col;ini++){
			 pixHis[inr][ini]=0;
		}
	}
	
	for(var ini=0;ini<col;ini++){
		teXArray[ini]=rows-1;
		
	}
	var updateTemp;
	
	
	var mytable=document.getElementById("mytable");
	for(i=0;i<rows;i++){
		mytable.insertRow(i);
		for(j=0;j<col;j++){
			mytable.rows[i].insertCell(j);
		}
	};
	
	var butlef=document.getElementById("butlef");
	var butrig=document.getElementById("butrig");
	var butdow=document.getElementById("butdow");
	var butcha=document.getElementById("butcha");
	butlef.onclick=function(){turnLeft.apply(current,arguments);}
	butrig.onclick=function(){turnRight.apply(current,arguments);}
	butdow.onclick=function(){turnDown.apply(current,arguments);}
	butcha.onclick=function(){change.apply(current,arguments);}
	
	
	
	/*var tetris={
		p1:{x1:0,y1:0},
		p2:{x2:0,y2:0},
		p3:{x3:0,y3:0},
		p4:{x4:0,y4:0},
		
		
		setTetris: function(){
			k=0;
			for(var vari in tetris){
				if (vari== "changeTetris"){
					continue;
				}
				for(var vari_pos in this[vari]){
					this[vari][vari_pos]=arguments[k];	
					k++;
				}
			}
			return this;
		}
	};*/
	function Tetris(){
		this.p1={x:0,y:0};
		this.p2={x:0,y:0};
		this.p3={x:0,y:0};
		this.p4={x:0,y:0};
		
		this.setTetris=function(){
			k=0;
			for(var vari in this){
				if (vari== "changeTetris"){
					continue;
				}
				for(var vari_pos in this[vari]){
					this[vari][vari_pos]=arguments[k];	
					k++;
				}
			}
		};
	}
	
	var x=0,y=Math.round(rows/2);
	
	/*teArr[0]=new Tetris().setTetris(x,y,x,(y+1),(x+1),(y+1),(x+1),(y+2));
	teArr[1]=new Tetris().setTetris((x+1),y,(x+1),(y+1),(x+1),(y),(x+2),(y));
	teArr[2]=new Tetris().setTetris(x,y,(x+1),y,(x),(y+1),(x+1),(y+1));
	teArr[3]=new Tetris().setTetris(x,y,(x),(y+1),(x),(y+2),(x),(y+3));
	teArr[4]=new Tetris().setTetris(x,y,(x),(y+1),(x),(y+2),(x-1),(y+2));
	teArr[5]=new Tetris().setTetris(x,y,(x),(y+1),(x),(y+2),(x+1),(y+2));*/
	
	function displayTetris(tetris){
		mytable.rows[tetris.p1.x].cells[tetris.p1.y].bgColor="black";
		mytable.rows[tetris.p2.x].cells[tetris.p2.y].bgColor="black";
		mytable.rows[tetris.p3.x].cells[tetris.p3.y].bgColor="black";
		mytable.rows[tetris.p4.x].cells[tetris.p4.y].bgColor="black";
	}
	function eraseTetris(tetris){
		mytable.rows[tetris.p1.x].cells[tetris.p1.y].bgColor="white";
		mytable.rows[tetris.p2.x].cells[tetris.p2.y].bgColor="white";
		mytable.rows[tetris.p3.x].cells[tetris.p3.y].bgColor="white";
		mytable.rows[tetris.p4.x].cells[tetris.p4.y].bgColor="white";
	}
	current=getNewCurrent();
	fallAndStop(current,level);
	
	function fallAndStop(tetris,level){
		fallStart=setInterval(function(){
			eraseTetris(tetris);
			takeTurnAdd.apply(tetris,arguments);
			displayTetris(tetris);
			stop(tetris);
		},(1000/level));
	}
	
	function takeTurnAdd(){
		for(var vari in this){
			if (vari== "setTetris"){
				continue;
			}
			for(var vari_pos in this[vari]){
				if(vari_pos[0]=="y")
					continue;
				this[vari][vari_pos]=this[vari][vari_pos]+1;	
			}
		}
	}
	
	function stop(tetris){
		//alert(tetrisHis);
		//if(tetrisHis!=""){
			if(takeTurnCheck.apply(tetris,arguments)==true){
				clearInterval(fallStart);
				tetrisHis.push(current);
				disappearRow();
				updateTeMap.apply(tetris,arguments);
				current=getNewCurrent();
				fallAndStop(current,level);
			}
		//}
		/*var fWC=fallWallCheck.apply(tetris,arguments);
		if(fWC){
				clearInterval(fallStart);
				//alert("done");
				tetrisHis.push(current);
				current=getNewCurrent();
				fallAndStop(current,level);
				updateTeMap.apply(tetris,arguments);
		}
		*/
	}
	
	function fallWallCheck(tetris){
		for(var vari in tetris){
			if (vari== "setTetris"){
				continue;
			}//�ų�����
			
			for(var vari_pos in this[vari]){
				if(vari_pos[0]=="y")
					continue;
				if((this[vari][vari_pos]+2)>rows){
					return true;
				}
				
			}
		}
		return false;
	}
	
	function takeTurnCheck(tetris){
		var temp;
		for(var vari in this){
			if (vari== "setTetris"){
				continue;
			}//�ų�����
			for(var vari_pos in this[vari]){
				if(vari_pos[0]=="x"){
					temp=this[vari][vari_pos];
				}
				else{
					if((temp)>=teXArray[(this[vari][vari_pos])]){
						//alert((this[vari][vari_pos]));
						return  true;
					}
				}							
			}
		}	
		return false ;
	}
	
	function getNewCurrent(){
		var Num=Math.floor(Math.random()*6);
		var teobj=new Tetris();
		switch(Num){
			case 0:teobj.setTetris(x,y,x,(y+1),(x+1),(y+1),(x+1),(y+2)); break;
			case 1:teobj.setTetris((x+1),y,(x+1),(y+1),(x),(y+1),(x),(y+2));break;
			case 2:teobj.setTetris(x,y,(x+1),y,(x),(y+1),(x+1),(y+1));break;
			case 3:teobj.setTetris(x,y,(x),(y+1),(x),(y+2),(x),(y+3));break;
			case 4:teobj.setTetris((x+1),y,(x+1),(y+1),(x+1),(y+2),(x),(y+2));break;
			case 5:teobj.setTetris(x,y,(x),(y+1),(x),(y+2),(x+1),(y+2));break;
			default:teobj.setTetris(x,y,(x),(y+1),(x),(y+2),(x+1),(y+2));break;
		}
		return teobj;	
	}
	
	function updateTeMap(){
		var endTe=tetrisHis[(tetrisHis.length-1)];
		for(var el in endTe){
			for(var el2 in endTe[el]){
				if(el2[0]=="x"){
					updateTemp=endTe[el][el2];
				}
				else{
					if((updateTemp-1)<teXArray[(endTe[el][el2])]){
						teXArray[(endTe[el][el2])]=(updateTemp-1);
					}
				}
				
			}
		}
	//alert(teXArray);
	
	}
	
	function change(){
		var chang=true;
		var abx1=this.p2.x;
		var aby1=this.p2.y;
			
		for(var vari in this){
			if (vari== "setTetris"){
				continue;
			}
			//alert(this[vari].x);	
			var b1=(this[vari].x-abx1)<=(-aby1);
			var b2=(this[vari].x-abx1)>=(col-1-aby1);
			var b3=(this[vari].y-aby1)>=(rows-1-abx1);
			var b4=(this[vari].y-aby1)<=(-abx1);
			//alert(this[vari].x);
			if(b1||b2||b3||b4){
				chang=false;
			}
		}	
		if(chang==true){
			eraseTetris(this);
			var temp;
			var abx=this.p2.x;
			var aby=this.p2.y;
			
			for(var vari in this){
				if (vari== "setTetris"){
					continue;
				}
				//alert(this[vari][y]);
				this[vari].x-=abx;
				this[vari].y-=aby;
				
				temp=this[vari].x;
				this[vari].x=this[vari].y;
				this[vari].y=-temp;
				
				this[vari].x+=abx;
				this[vari].y+=aby;
			}
			
			displayTetris(this);
		}
	}
	
	function turnLeft(){
		var flag=true;
		eraseTetris(this);
		for(var vari in this){
			if (vari== "setTetris"){
				continue;
			}
			for(var vari_pos in this[vari]){
				if(vari_pos[0]=="x")
					continue;
				if((this[vari][vari_pos]-1)<0){
					flag=false;	
				}
			}
		}
		if(flag){	
			for(var vari in this){
				if (vari== "setTetris"){
					continue;
				}
				for(var vari_pos in this[vari]){
					if(vari_pos[0]=="x")
						continue;
					this[vari][vari_pos]-=1;
				}
			}
		}
		displayTetris(this);
		//alert(this);
	}
	function turnRight(){
		var flag=true;
		eraseTetris(this);
		for(var vari in this){
			if (vari== "setTetris"){
				continue;
			}
			for(var vari_pos in this[vari]){
				if(vari_pos[0]=="x")
					continue;
				if((this[vari][vari_pos]+1)>(col-1)){
					flag=false;	
				}
			}
		}
		if(flag){	
			for(var vari in this){
				if (vari== "setTetris"){
					continue;
				}
				for(var vari_pos in this[vari]){
					if(vari_pos[0]=="x")
						continue;
					this[vari][vari_pos]+=1;
				}
			}
		}
		displayTetris(this);
	}
	function turnDown(){
		clearInterval(fallStart);
		fallAndStop(current,9);
	}
	
	function disappearRow(){
		updateIma();
		var sum=0;
		for(var inr =0;inr<rows;inr++){
			for(var ini =0; ini<col;ini++){
				sum+=pixHis[inr][ini];
			}
			if(sum==col){
				disrow[inr]=1;
				var temp4=pixHis[inr];
				for(var indis=inr;indis>0;indis--){
					pixHis[indis]=pixHis[indis-1];
				}
				pixHis[0]=temp4;
				for(var indis=inr;indis>0;indis--){
					pixHis[0]=0;
				}
				for(var ini=0;ini<col;ini++){
				teXArray[ini]+=1;
				}
			}
			
			sum=0;
		}
		displacePixHis();
	}
	
	function  displacePixHis(){
		for(var inr =0;inr<rows;inr++){
			for(var ini =0; ini<col;ini++){
				mytable.rows[inr].cells[ini].bgColor="white";
			};//ˢ��
		}
		for(var inr =0;inr<rows;inr++){
			for(var ini =0; ini<col;ini++){
				if(pixHis[inr][ini]==1){
					mytable.rows[inr].cells[ini].bgColor="black";
				}
			}
		}
	}
	
	function updateIma(){
		var endTe=tetrisHis[(tetrisHis.length-1)];
		for(var el in endTe){
			for(var el2 in endTe[el]){	
				if(el2[0]=="x"){
					var pixX=endTe[el][el2];
				}
				else{
					var pixY=endTe[el][el2];
				}
			}
		pixHis[pixX][pixY]=1;
		}
		//alert(pixHis);
	}
	
}
	function goal(){
		
	}
