	//funkcija koja se injecta na body onload
						function injectIntoHtml() {	
						
						// var deltaVectorX=0;
						// var deltaVectorY=0;
						// var deltaVectorXY=0;
						var vectorMaxAbsolute;
						// var deltaVectorStariX=0;
						// var deltaVectorStariY=0;
						var vectorBoolean=0;
						var dubina;
						var	duzina;
						var	 brojBoxova;
						
						var koefGrida;
						
						var	vectorXMax=-50000000;
						var vectorXMin=50000000000;
						var	vectorYMax=-50000000;
						var vectorYMin=50000000000;
						var	vectorXYMax=-50000000;
						var vectorXYMin=50000000000;
						
						
						
						//broj redova/stupaca dobiven od korisnika
						var widthG; 
						var heightG;
						//najveci
						var largest=0;					
						var sX, sY;	
						var delta = 0;
						var oldValueOfBox = 0.0;
						var valueOfBox = new Array();						//broj u kvadraticu (2d array)
						var typeOfBox = new Array();						//tip boxa (d=dirichlet,n=neuman, ili h=potencijal )
						gridSize();
						var boxSize = 30; // broj boxova(rezolucija(h/w)/boxSize) 
						var width=widthG*boxSize;  //sirina canvasa (sluzi za funkciju crtanja i odredjivanja broja boxova)
						var height=heightG*boxSize; //visina
						
						//smallest, biggest za grayscale
						var smallest;
						var biggest=0;
						var deltaExtrema=0;
						var valueMSmallest=0;
						var grayscale;
						var grayscaleIntensity;
						var grayscaleString;
						var broj;//potencijal
						
						// var canvas = document.createElement('canvas'),ctx = canvas.getContext("2d");
						
						var canvas = document.getElementById("ctx"); ctx = canvas.getContext("2d");
						var canvas2 = document.getElementById("ctx2"); ctx2 = canvas2.getContext("2d");
						
						// canvas.id ="ctx";
						canvas.width=width;
						canvas.height=height;
						canvas2.width=width+60;
						canvas2.height=height+60;
						 // document.body.appendChild(canvas);
						 // document.body.appendChild(canvas2);
						
						canvas.addEventListener('mousedown', clickDown);
						canvas.addEventListener('mouseup', clickUp);
						canvas.addEventListener('touchstart', clickDown);
						canvas.addEventListener('touchend', clickUp);

						
						
						
						

						
						
						function clickDown(){								
							
							
							

						canvas.addEventListener('mousemove', handleClick);
						canvas.addEventListener('touchmove', handleClick);
																							
						}

						function clickUp(){																				
								
						canvas.removeEventListener("mousemove", handleClick);
						canvas.removeEventListener("touchmove", handleClick);

																				
						}
						
						

						//broj redova/stupaca
						var rowNumber = parseInt(width / boxSize); 
						var columnNumber = parseInt(height / boxSize);

						//popup za velicinu grida

						function gridSize() {
							 dubina = prompt("Dubina profila", "5");
							duzina = prompt("dužina profila", "8");
							 brojBoxova = prompt("Broj boxova po jedinici dubine/dužine", "5");
			
			 
			 heightG = dubina*brojBoxova+1;
			 widthG = duzina*brojBoxova+1;
			 koefGrida=1/brojBoxova;
			 
			 	document.getElementById("koefGrid").innerHTML = "Koeficijent grida: "+koefGrida;
    
		 if(dubina % 1 === 0 && duzina % 1 === 0 && brojBoxova % 1 === 0  ) {
				
}	
				else {
					window.alert("Upisite broj, a ne slova!");
					gridSize();
       
				}
    
   }
						
						//TEST ZA CANVAS 2 (fiz. koord i borders)
						function ruler() {
							var brojTrenutnoX=0-koefGrida;
							var brojTrenutnoY=0-koefGrida;
							
							var brojTrenutnoXC;
							var brojTrenutnoYC;
							ctx2.beginPath();
						ctx2.lineWidth=3;
						ctx2.moveTo(60,0);
						ctx2.lineTo(60,heightG*boxSize);
						
						ctx2.moveTo(58+widthG*boxSize,0);
						ctx2.lineTo(58+widthG*boxSize,heightG*boxSize);
						
						ctx2.moveTo(60,heightG*boxSize); 
						ctx2.lineTo(widthG*boxSize+60,heightG*boxSize); 
						
							ctx2.moveTo(60,2); 
						ctx2.lineTo(widthG*boxSize+60,2); 
						
						
						
						 ctx2.stroke();
						for (var i=0;i<widthG;i++){
						 //x os
							brojTrenutnoX=(brojTrenutnoX+koefGrida)
							brojTrenutnoXC=+brojTrenutnoX.toFixed(2);
							
							
							// console.log(brojTrenutnoX+"capcap");
							// console.log(koefGrida);
							
							ctx2.lineWidth=1;
							ctx2.moveTo(60+((1/2)*boxSize+boxSize*i),heightG*boxSize-7);
						ctx2.lineTo(60+((1/2)*boxSize+boxSize*i),heightG*boxSize+7);
						if (brojTrenutnoXC==Math.floor(brojTrenutnoXC)){
							
							
								ctx2.font = "bold 15px Arial";
						ctx2.fillText(brojTrenutnoXC,55+((1/2)*boxSize+boxSize*i),heightG*boxSize+28)
							
						}
						
						
						else{
						ctx2.font = "11px Arial";
						ctx2.fillText(brojTrenutnoXC,50+((1/2)*boxSize+boxSize*i),heightG*boxSize+26)
						ctx2.fillText(brojTrenutnoXC,50+((1/2)*boxSize+boxSize*i),heightG*boxSize+26)
						}
						
						
							
							
						}
						//y os 
						
						for (var i=0;i<heightG;i++){
							
							var capCap = heightG-i-3
						
						ctx2.moveTo(60-7,((1/2)*boxSize+boxSize*i));
						ctx2.lineTo(60+7,((1/2)*boxSize+boxSize*i));
						
						brojTrenutnoY=(brojTrenutnoY+koefGrida);
						brojTrenutnoYC=+brojTrenutnoY.toFixed(2);
						
								if (brojTrenutnoYC==Math.floor(brojTrenutnoYC)){
							
							
								ctx2.font = "bold 15px Arial";
						ctx2.fillText(brojTrenutnoYC, 60-34,((1/2)*boxSize+boxSize*capCap+2*boxSize+5))
							
						}
						
						
						else{
						ctx2.font = "11px Arial";
						ctx2.fillText(brojTrenutnoYC, 60-38,((1/2)*boxSize+boxSize*capCap+2*boxSize+5))
						}
						
						
						
						
						}
						
						ctx2.stroke();
						}
						
						ruler();
						
						 
					
						// ctx2.fillRect(0, 10, heightG, boxSize);
						
						
						
						
						
						//gotovo

						//izrada matrice za valueOfBox i typeOfBox

						function matrix() {

						
						
							for (var i = 0; i < rowNumber; i++) {
									 																								 
								valueOfBox[i] = new Array();
								typeOfBox[i]= new Array();

								
								for (var j = 0; j < columnNumber; j++) {

									
									
									
									typeOfBox[i][j]="h"
									valueOfBox[i][j] = 0.0;
									
									 typeOfBox[0][j] = "n";
									 valueOfBox[0][j] = 0.0;
									
									 typeOfBox[i][0] = "n";
									 valueOfBox[i][0] = 0.0;
									
									 typeOfBox[i][parseInt(heightG-1)] = "n";
									 valueOfBox[i][parseInt(heightG-1)] = 0.0;
																																								

								}

							}

						
						 for (var j = 0; j < columnNumber; j++) {

									
									 typeOfBox[parseInt(widthG-1)][j] = "n";
									 valueOfBox[parseInt(widthG-1)][j] = 0.0;
																
																																		

								 }
						

						



							
						}
						
						
						//dirichlet za potencijale
						
						function showNumbersDirichlet() {
									var krug = '\u25C9';
									
									ctx.font = "bold 9px Arial";
							for (var i = 0; i < rowNumber; i++) {

								


								for (var j = 0; j < columnNumber; j++) {

								
									var gridNumberShifti=boxSize*i+1;
									var gridNumberShiftj=boxSize*j+(0.9*boxSize);
									var gridNumberShiftiKrug=boxSize*i+(0.4*boxSize);
									var gridNumberShiftjKrug=boxSize*j+(0.6*boxSize); 
									
									
								
									
									
									if (typeOfBox[i][j]=="d"){
										
										ctx.fillStyle = "white";  
										
										ctx.fillRect(i * boxSize, j * boxSize, boxSize, boxSize);
										
										
										 ctx.fillStyle = "rgba(104, 180, 247, 0.5)";  
										
										ctx.fillRect(i * boxSize, j * boxSize, boxSize, boxSize);
										
										
										
										ctx.fillStyle = "black";  
										 ctx.font = "15px Arial";
										
										ctx.fillText(valueOfBox[i][j],gridNumberShifti,gridNumberShiftj);
										
										ctx.font = "bold 9px Arial";
										
						}}}}
						
						
						//dirichlet gotov
						
						
						

						//funkcija za ispis brojeva u grid i boje rubova

						function showNumbers() {
									var krug = '\u25C9';
									
									ctx.font = "bold 9px Arial";
							for (var i = 0; i < rowNumber; i++) {

								


								for (var j = 0; j < columnNumber; j++) {

								
									var gridNumberShifti=boxSize*i+1;
									var gridNumberShiftj=boxSize*j+(0.9*boxSize);
									var gridNumberShiftiKrug=boxSize*i+(0.4*boxSize);
									var gridNumberShiftjKrug=boxSize*j+(0.6*boxSize); 
									
									
										if ( typeOfBox[i][j]=="n"){}
									
									
								else	if (typeOfBox[i][j]=="d"){
										ctx.fillStyle = "black";  
										 ctx.font = "15px Arial";
										
										ctx.fillText(valueOfBox[i][j],gridNumberShifti,gridNumberShiftj);
										
										ctx.font = "bold 9px Arial";
										
									}
									
									
									else {
									
									if ( document.getElementById("checkNN").checked==true){
										
										if ( document.getElementById("checkC").checked==true){
										
 ctx.font = "bold 9px Arial";
										// ctx.fillStyle = "rgb(5, 147, 59)";
										
										// var cap =+valueOfBox[i][j].toFixed(2);
										
										// ctx.fillText(cap,gridNumberShifti,gridNumberShiftj);
										
										}
										
										else {
										
										ctx.fillStyle = "black";
										
										var cap =+valueOfBox[i][j].toFixed(2);
										
										ctx.fillText(cap,gridNumberShifti,gridNumberShiftj);
										ctx.font = "8px Arial";
											if ( document.getElementById("checkN").checked==false)
									{
										 ctx.fillText(krug,gridNumberShiftiKrug,gridNumberShiftjKrug);	
								}
									
										 ctx.font = "bold 9px Arial";
										}
										
									}
									
									else {

									if ( document.getElementById("checkC").checked==true){
										ctx.fillStyle = "black";//modro plavo
										ctx.fillText(valueOfBox[i][j],gridNumberShifti,gridNumberShiftj);
										// ctx.fillText(krug,gridNumberShiftiKrug,gridNumberShiftjKrug);
									}
									
									else {
									ctx.fillStyle = "black";
									ctx.fillText(valueOfBox[i][j],gridNumberShifti,gridNumberShiftj);
									// ctx.fillText(krug,gridNumberShiftiKrug,gridNumberShiftjKrug);
									}
									}
									}
									
									
									

								}

							}

							
						}

						
						
						//funkcija za boje rubova neumana i dirichleta
						
						
							function showEdges() {
								
								

							for (var i = 0; i < rowNumber; i++) {

								


								for (var j = 0; j < columnNumber; j++) {

								
								
									
									
									if (typeOfBox[i][j]=="d"){
										
										 
										
										
										 ctx.fillStyle = "rgba(104, 180, 247, 0.5)";  
										
										ctx.fillRect(i * boxSize, j * boxSize, boxSize, boxSize);
										
									}

									if (typeOfBox[i][j]=="n"){
										
										 	ctx.fillStyle = "rgba(167, 30, 6, 0.5)";
										
										ctx.fillRect(i * boxSize, j * boxSize, boxSize, boxSize);
										
									}

									
									

								}

							}

							
						}
						
						//pokusaj ekvipotencijala take 3 
						
						function ekvipotencijale(meta){
							
						
							var minimalnaUdaljenost=2000;
							
							 var meta;
							
								var spojilaSe= new Array();
					var spajaloSeUNju= new Array();
					var xMeta = new Array();
					var yMeta= new Array();
							
							
								for (var i = 0; i < rowNumber; i++) {

								


								for (var j = 0; j < columnNumber; j++) {

									
								
							var interpolationCenteri=boxSize*i+(0.5*boxSize-2);
							var interpolationCenterj=boxSize*j+(0.5*boxSize); 
							var intezitet=valueOfBox[i][j];
							
							
						
							
							var razlikaPolja;
							var  razlikaMeteIPolja;
							var omjer;
							var udaljenost;
							
									
									
										function weFoundHim(smjer){
											
											razlikaPolja=Math.abs(smjer-intezitet);
											razlikaMeteIPolja=meta-intezitet;
											omjer=razlikaMeteIPolja/razlikaPolja;
											udaljenost=boxSize*omjer;
											
											console.log("smjer:"+smjer);
											console.log("intezitet:"+intezitet);
											console.log("bla");
										}
									
									function crtaj(){
									
											ctx.beginPath();
										
										var prviBroj=1;
										 for (var i = 0; i < xMeta.length; i++) {
										
												
										
											
												// ctx.font = "bold 8px Arial";
											 // ctx.fillText(i,xMeta[i],yMeta[i]);
											for (var ii = 0; ii < xMeta.length; ii++) {
												
												
												var xUdaljenostSuseda=Math.abs(xMeta[i]-xMeta[ii])
												var yUdaljenostSuseda=Math.abs(yMeta[i]-yMeta[ii]);
										

											//za bolju verziju nekad

											
											 var udaljenostSolver=Math.abs(Math.sqrt(Math.pow(xMeta[i]-xMeta[ii],2)+Math.pow(yMeta[i]-yMeta[ii],2)));
											
											//
											
												if ( spojilaSe[i]=="da" && spajaloSeUNju=="da"){}
												
											else {
											
											if (xUdaljenostSuseda<(boxSize+(1)) && yUdaljenostSuseda<(boxSize+1)  ){
												
											
												
									
								  		
								
										
										
											ctx.beginPath();
								ctx.lineWidth = 2;
							ctx.fillStyle="black"
							spojilaSe[i]="da"
							  spajaloSeUNju[ii]="da";
								ctx.moveTo(xMeta[i], yMeta[i]);
								ctx.lineTo(xMeta[ii], yMeta[ii]);
										ctx.stroke();
												
								
									if (prviBroj==1){
											// ctx.fillStyle="red"
											 // ctx.font = "bold 14px Arial";
											// ctx.fillText(meta,xMeta[i+3],yMeta[i+3]);
											// prviBroj=0;
											
											
											
										}	
										
										
										
											}
												
											 }
												
												
												
												
												
											}
											
											
											
											}

										
										
										 				
										
									}
									
									
									
									if (typeOfBox[i][j]=="d"){
										
										
										
									}

									if (typeOfBox[i][j]=="n"){
										
										
										
									}

									
									
									if (typeOfBox[i][j]=="h"){
											
										if(valueOfBox[i][j]<=meta){
											
											// ctx.fillText(".",interpolationCenteri,interpolationCenterj)
											
											
											if(valueOfBox[i+1][j]>=meta){
												var intezitetR=valueOfBox[i+1][j];
												
												console.log("desno")
												console.log(interpolationCenteri+"desno x");
												console.log(interpolationCenterj+"desno y");
												
					
								
								
												weFoundHim(intezitetR);
												
												xMeta.push(interpolationCenteri+udaljenost);
												yMeta.push(interpolationCenterj);
												
												
												console.log(xMeta);
												console.log(yMeta);
												console.log(udaljenost+"udaljenost");
												console.log(omjer+"omjer");
												console.log("desno")
												console.log();
												
												
											}
											if(valueOfBox[i-1][j]>=meta){
											
											
											 var intezitetL=valueOfBox[i-1][j];
											console.log("LEVO")
											 weFoundHim(intezitetL);
											 xMeta.push(interpolationCenteri-udaljenost);
												 yMeta.push(interpolationCenterj);
												 
												 console.log(interpolationCenteri+" x");
												console.log(interpolationCenterj+" y");
												 console.log(xMeta);
												console.log(yMeta);
												console.log("LEVO GOTOVO")
											
										}
											if(valueOfBox[i][j+1]>=meta){
											
											
												 var intezitetD=valueOfBox[i][j+1];
											
											console.log("dole")
											weFoundHim(intezitetD);
											xMeta.push(interpolationCenteri);
												 yMeta.push(interpolationCenterj+udaljenost);
												 
												
												 console.log(interpolationCenteri+" x");
												console.log(interpolationCenterj+" y");
												 console.log(xMeta);
												console.log(yMeta);
												console.log("DOLE GOTOVO")
												 
											
										 }
											 if (valueOfBox[i][j-1]>=meta){
												var intezitetU=valueOfBox[i][j-1];
												 console.log("Gore")
												 weFoundHim(intezitetU);
											 xMeta.push(interpolationCenteri);
												yMeta.push(interpolationCenterj-udaljenost);
												
												
												console.log(interpolationCenteri+" x");
												console.log(interpolationCenterj+" y");
												 console.log(xMeta);
												console.log(yMeta);
												console.log("Gore GOTOVO")
												
												 }
											
											
											
											
										}
										
										
										
										
									}

									

								}

								
								
								
							}

							
							
						crtaj();

							
						}
						
						
						
						
						
						
						
							
						
						
						
						
						
						
						
						
						
						
						// vizualizacija svakog potencijala grayscale-om
						
						
							function showValuesInColor() {
								
								
								
								ctx.clearRect(0, 0, canvas.width, canvas.height);
								showEdges();
								gridBorders();

							for (var i = 0; i < rowNumber; i++) {

								


								for (var j = 0; j < columnNumber; j++) {

								
								
									if (typeOfBox[i][j]=="h"){
										
									 										 								
										
										
										 // if (biggest < valueOfBox[i][j]){
											 
											 // biggest=valueOfBox[i][j];
										 // }
										 
										 // if (valueOfBox[i][j]==0){}
										 
										 // else{
										
										// if (smallest > valueOfBox[i][j]){
											 
											 // smallest=valueOfBox[i][j];
										 // }
										 
										 
										 // }
										
										
										 	
										
									}

									
									

								}

								
								
								}
								
								deltaExtrema=biggest-smallest;
								
								

							for (var i = 0; i < rowNumber; i++) {

								


								for (var j = 0; j < columnNumber; j++) {

								var gridNumberShifti=boxSize*i+1;
								var gridNumberShiftj=boxSize*j+(0.9*boxSize);	
								
									if (typeOfBox[i][j]=="h"){
								
								
								valueMSmallest=valueOfBox[i][j]-smallest;
								
								grayscale=valueMSmallest/deltaExtrema;
								grayscaleIntensity=Math.round(grayscale*255);
							var grayscaleIntensityOpposite=255-grayscaleIntensity;
							var cap =+valueOfBox[i][j].toFixed(2);
								
							grayscaleString="rgba(" + grayscaleIntensity + "," + grayscaleIntensity + "," + grayscaleIntensity + ")";	
				var	grayscaleStringOpposite="rgba(" + Math.round(grayscaleIntensity*1) + "," + (Math.round(grayscaleIntensityOpposite*0.5)) + "," + Math.round(grayscaleIntensityOpposite*1) + ")";
					
								
								
								
								ctx.fillStyle = grayscaleStringOpposite;
								
								
								
										
									
								ctx.fillRect(i * boxSize, j * boxSize, boxSize, boxSize);
								
								if ( document.getElementById("checkNN").checked==true) {
									
									// if (100 < grayscaleIntensityOpposite && 160> grayscaleIntensityOpposite) {
										
										// ctx.fillStyle = "white";
									// ctx.fillText(cap,gridNumberShifti,gridNumberShiftj);
										
									// }
									// else {
									ctx.fillStyle = "black";
									ctx.fillText(cap,gridNumberShifti,gridNumberShiftj);
									
									// }
									
								}
								
									}
								
								if (typeOfBox [i][j]=="d"){
									ctx.fillStyle ="black";
								ctx.font = "15px Arial";
										
										ctx.fillText(valueOfBox[i][j],gridNumberShifti,gridNumberShiftj);
								ctx.font = "bold 9px Arial";	
								}
								
								
							}
							
							
							
							
								}
							
							
							
							
							
							
						}


						//GLAVNO!
						function finiteDifferenceIteration() {
							
							
							biggest=0;
							smallest=50000000000000;
							//largest delta
							 largest=0;
						
						
							for (var i = 0; i < rowNumber; i++) {

								

								

								for (var j = 0; j < columnNumber; j++) {
									
									
									

								
								//deklaranje varijabli koje koristimo u glavnoj jednadzbi
								//deklaranje varijabli koje koristimo u glavnoj jednadzbi
								
								
			
								
									if (i==0|| j==0 || i==widthG-1 || j==heightG-1){
								
									
									}
								else {
									
									var desno = valueOfBox[i+1][j];
									var dole = valueOfBox[i][j+1];
									var levo = valueOfBox[i-1][j];
									var gore = valueOfBox[i][j-1];
									
								}
						
								
								//pregled dal se nalazimo na "d" ili "n", ako ne idemo s iteracijom	
									
									
									if (typeOfBox[i][j]==="d" || typeOfBox[i][j]==="n" ) {
						
											}
											
											
									else
				
										//prvo dal smo na rubu, i onda jednadzba
									
									{
										
										if (typeOfBox[i+1][j]==="n" )
											
											{
												
												desno = valueOfBox[i][j];
												
											}
										
										
											if (typeOfBox[i-1][j]==="n" )
											
											{
												
												levo = valueOfBox[i][j];
												
											}
									
										
										
										
										
											if (typeOfBox[i][j+1]==="n" )
											
											{
												
												dole = valueOfBox[i][j];
												
											}
											
											
											
												if (typeOfBox[i][j-1]==="n" )
											
											{
												
												gore = valueOfBox[i][j];
												
											}
										
										
										
										//jednadzba s deltom i biggest smallest
									
										 oldValueOfBox =valueOfBox[i][j];
										 
										
										
										 
										 valueOfBox[i][j] = 0.25*(gore+dole+levo+desno);
										 delta=valueOfBox[i][j]-oldValueOfBox;
										 
									 if (biggest < valueOfBox[i][j]){
											 
											 biggest=valueOfBox[i][j];
										 }
										 
										 if (valueOfBox[i][j]==0){}
										 
										 else{
										
										if (smallest > valueOfBox[i][j]){
											 
											 smallest=valueOfBox[i][j];
										 }
										 
										 
										 }
										
										
										 if (largest < Math.abs(delta)){
											 
											 largest=Math.abs(delta);
										 }
										 
										
										
										
										
									}
									
									
									
								
																																								

								}
		
							}
							
						
							
						}
						
						
						
						//iscrtavanje grida
							
						function gridBorders() 
							
						{
							

							for (var i = 0; i <= height; i += boxSize) {
							 
								ctx.beginPath();
								ctx.lineWidth = 0.4;
								ctx.moveTo(0, i);
								ctx.lineTo(width, i);
								ctx.stroke();
					
							}

							for (var j = 0; j <= width; j += boxSize) {
								 
								ctx.beginPath();
								ctx.lineWidth = 0.4;
								ctx.moveTo(j, 0);
								ctx.lineTo(j, height);
								ctx.stroke();
							}



							
							}
// za odabir n ili d ili ocisti
							
							function promjena(sX,sY){
								
								
								
								var choose = document.getElementById("odaberi");
							var border = choose.options[choose.selectedIndex].value;
							if (border == "1") {
								 broj = document.getElementById("broj").value;
								var gridNumberShifti=boxSize*sX+1;
								var gridNumberShiftj=boxSize*sY+(0.9*boxSize);
								
								typeOfBox[sX][sY] = "d";
								valueOfBox[sX][sY] = parseFloat(broj);
								
								
								ctx.fillStyle = "rgba(104, 180, 247, 1)";  
								ctx.fillRect((sX * boxSize)+1.5, (sY * boxSize)+1.5, boxSize-3, boxSize-3);
								ctx.fillStyle ="black";
								ctx.font = "15px Arial";
										
										ctx.fillText(valueOfBox[sX][sY],gridNumberShifti,gridNumberShiftj);
										
										ctx.font = "bold 9px Arial";
								
							} else if (border == "2") {
								typeOfBox[sX][sY] = "n";
								valueOfBox[sX][sY] = 0.0;
								ctx.fillStyle = "rgba(167, 30, 6, 1)";
								
									ctx.fillRect((sX * boxSize)+1.5, (sY * boxSize)+1.5, boxSize-3, boxSize-3);
							
																
							}
							
							
							else if (border=="3"){
								ctx.fillStyle = "white";
								typeOfBox[sX][sY] = "h";
								
								valueOfBox[sX][sY] = 0.00;
								ctx.fillRect((sX * boxSize)+1.5, (sY * boxSize)+1.5, boxSize-3, boxSize-3);
								
								
							}
							
							
							
							// console.log(sX+"obicni sx");
								// console.log(sY+"obicni sy");
								
								// console.log(valueOfBox [sX][sY]+"VAZNO value");
								// console.log(typeOfBox [sX][sY]+"VAZNO type");
								// console.log(sY+"obicni sy");
								
							}
							
							
							
							// za crtanje (hadnleClick)
							function handleClick(e) {
							var i = parseInt(Math.floor(e.offsetX / boxSize));
							var j = parseInt(Math.floor(e.offsetY / boxSize));
							
							sX = i;
							sY = j;

							promjena(sX,sY);
							
							
							
							
							
							

						}
						
						
						//funkcija za strelicu
						
							function canvas_arrow(context, fromx, fromy, tox, toy){
		var headlen = 4;	// duzina glave u pixelima
		var dx = tox-fromx;
		var dy = toy-fromy;
		var angle = Math.atan2(dy,dx);
		context.lineWidth=1;
		context.moveTo(fromx, fromy);
		context.lineTo(tox, toy);
		context.lineTo(tox-headlen*Math.cos(angle-Math.PI/6),toy-headlen*Math.sin(angle-Math.PI/6));
		context.moveTo(tox, toy);
		context.lineTo(tox-headlen*Math.cos(angle+Math.PI/6),toy-headlen*Math.sin(angle+Math.PI/6));
	}
						
						//funkcija za glavu vektora
						
						
						function showVectors() {
							// ctx.clearRect(0, 0, canvas.width, canvas.height);
									// vectorXMax=0;
									// vectorXMin=50000000000;
								var	 vectorXPercentage;
								var	 vectorYPercentage;
								// var vectorXBiggerThanMin;
								// var vectorYBiggerThanMin;
									ctx.fillStyle="black";
									ctx.font = "8px Arial";
									var krug = '\u25C9';
							for (var i = 0; i < rowNumber; i++) {

								


								for (var j = 0; j < columnNumber; j++) {

								
									var gridNumberShifti=boxSize*i+(0.4*boxSize);
									var gridNumberShiftj=boxSize*j+(0.6*boxSize); 
									
										var gridNumberShiftiBroj=boxSize*i+1;
								var gridNumberShiftjBroj=boxSize*j+(0.9*boxSize);	
									var cap =+valueOfBox[i][j].toFixed(2);
								
								if (typeOfBox [i][j]=="d"){
									ctx.fillStyle ="black";
								ctx.font = "15px Arial";
										
										ctx.fillText(cap,gridNumberShiftiBroj,gridNumberShiftjBroj);
								
								}
								
									
									
									if (i==0|| j==0 || i==widthG-1 || j==heightG-1){
								
									
									}
								else {
									
									var desno = valueOfBox[i+1][j];
									var dole = valueOfBox[i][j+1];
									var levo = valueOfBox[i-1][j];
									var gore = valueOfBox[i][j-1];
									
								}
						
								
								//pregled dal se nalazimo na "d" ili "n", ako ne idemo s iteracijom	
									
									
									if (typeOfBox[i][j]==="d" || typeOfBox[i][j]==="n" ) {
						
											}
											
											
									else
				
										//prvo dal smo na rubu, i onda jednadzba
									
									{
										
										if (typeOfBox[i+1][j]==="n" )
											
											{
												
												desno = valueOfBox[i][j];
												
											}
										
										
											if (typeOfBox[i-1][j]==="n" )
											
											{
												
												levo = valueOfBox[i][j];
												
											}
									
										
										
										
										
											if (typeOfBox[i][j+1]==="n" )
											
											{
												
												dole = valueOfBox[i][j];
												
											}
											
											
											
												if (typeOfBox[i][j-1]==="n" )
											
											{
												
												gore = valueOfBox[i][j];
												
											}
										
										 deltaVectorX=0;
										 deltaVectorY=0;
											
										
										//jednadzba 
									
										 
										var  vectorX= -(desno-levo)/2
										var  vectorY= -(dole-gore)/2
										 
										
										 if (vectorXMax < vectorX   ){
											 
											 vectorXMax=vectorX;
											 
											 
											 
										 }
										 
										 
										  if (vectorYMax < vectorY   ){
											 
											 vectorYMax=vectorY;
											 
											 
											 
										 }
										 
										 
										 
										
										 
										 
										
										if (vectorXMin > vectorX ){
											 
											 	 vectorXMin=vectorX;
										
											 
											 
											 
											 
										 }
										 
										 	
										if (vectorYMin > vectorY ){
											 
											 	 vectorYMin=vectorY;
										
											 
								
											 
											 
										 }
										 
										 
										 if (vectorXMax>vectorYMax){
											 
											 vectorXYMax=vectorXMax;
											 
										 }
										
										else{
											
											vectorXYMax=vectorYMax;
										}
										
										
										
											 if (vectorXMin<vectorYMin){
											 
											 vectorXYMin=vectorXMin;
											 
										 }
										
										else{
											
											vectorXYMin=vectorYMin;
										}
										
										if(Math.abs(vectorXYMin)>Math.abs(vectorXYMax)){
											
											vectorMaxAbsolute=Math.abs(vectorXYMin);
											
										
										}
										
										
										else {
											
											
											vectorMaxAbsolute=Math.abs(vectorXYMax);
											
										}
										
										 // deltaVectorX = vectorXMax-vectorXMin;
										 // deltaVectorY = vectorYMax-vectorYMin;
										 
										// deltaVectorXY= vectorXYMax-vectorXYMin;
										
										 vectorXPercentage=(vectorX/vectorMaxAbsolute);
										 vectorYPercentage=(vectorY/vectorMaxAbsolute);
										 
									// if (vectorX<0){
										
										  // vectorXBiggerThanMin=(vectorX-vectorXYMin)*(-1);
										  
										
									// }
										 
									// else{
										 // vectorXBiggerThanMin=vectorX-vectorXYMin;
										
									// }
										 
										 		 
									// if (vectorY<0){
										
										  // vectorYBiggerThanMin=(vectorY-vectorXYMin)*(-1);
										
									// }
										 
									// else{
										 // vectorYBiggerThanMin=vectorY-vectorXYMin;
										
									// }

									// console.log(" polje X: "+ i +" polje Y:" +j);
									// console.log(vectorX+ " "+vectorY+ " Vector x i y vrijednosti");
	
									  // console.log(" ");
									  // console.log(vectorXMax+" "+vectorXMin +"vector x max i min");
									  // console.log(vectorYMax+" "+vectorYMin+"vector y max i min");
									    // console.log(vectorXYMax+" "+vectorXYMin+"vector xy max i min i max absolute!!" + vectorMaxAbsolute);
									  // console.log(" ");
									  // console.log( vectorXPercentage + "postotak x");
									  // console.log( vectorYPercentage+"postotak y");
									
									 
									  // console.log(" ");
									  // console.log(" ");
									
									if(vectorBoolean==1){

									
									
									ctx.beginPath();
									// ctx.moveTo(gridNumberShifti+3,gridNumberShiftj-3);
									
									 // ctx.lineTo(gridNumberShifti+3+vectorX,gridNumberShiftj-3+vectorY);
									   // ctx.lineTo(gridNumberShifti+3+vectorXPercentage*75,gridNumberShiftj-3+vectorYPercentage*75);
							
										  canvas_arrow(ctx,gridNumberShifti+3,gridNumberShiftj-3,gridNumberShifti+3+vectorXPercentage*50,gridNumberShiftj-3+vectorYPercentage*50);
										ctx.stroke();
									ctx.font = "8px Arial";	
									
								
									
									ctx.fillText(krug,gridNumberShifti,gridNumberShiftj);
									
									
									}
										 
										 
									
									}
									
		

								}

							}

							if(vectorBoolean==0){
								vectorBoolean=1;
							}
							
							else {
								
								vectorBoolean=0;
							}
							
							
						}

					
							
		// funkcija submit 
		
		function submit(){
			 ctx.font = "bold 9px Arial";
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			gridBorders() ;
			if ( document.getElementById("checkC").checked==true)
			{
				
				showValuesInColor();
				gridBorders() ;
				//showEdges();
				
				console.log("checked boja");
			}
			
			
			if (document.getElementById("checkN").checked==true){
				
				// if (document.getElementById("checkN").checked==true && document.getElementById("checkNN").checked==true) {
					
					// console.log("oba dva");
				// }
				
				// else {
				
								// if ( document.getElementById("checkC").checked==true){
									
									
										  // gridBorders() ;
										
										 // showNumbers() ;
								// }
								
								//  else {
								// ctx.clearRect(0, 0, canvas.width, canvas.height);
								 
										// showEdges();
										
										  // gridBorders() ;
										 // showNumbers() ;
				
			
				
				// }
				// }
				console.log("vektorCHECK!");
				showEdges();
				
					vectorXMax=-50000000;
						 vectorXMin=50000000000;
							vectorYMax=-50000000;
						 vectorYMin=50000000000;
							vectorXYMax=-50000000;
						 vectorXYMin=50000000000;
							showVectors();
							showVectors() ;
				
				
			}
			
			if ( document.getElementById("checkNN").checked==true)
			{
				
				
										showEdges();
										  
										 showNumbers() ;
				
								
				
			}
			
			
		
			
		}
				

//listener za ekvipotencijale

document.getElementById('submitE').addEventListener('click', function() {
					
					ekvipotencijale(document.getElementById("ekvipotencijala").value);
					showNumbersDirichlet();
		
		
					
						 }, false);	


				
							
		//listener za submit 

		
		

	 document.getElementById('submit').addEventListener('click', function() {
					
						submit();
		
					
						 }, false);		
							
//listener za ciscenje

	 // document.getElementById('clear').addEventListener('click', function() {
		// //					 ctx.clearRect(0, 0, canvas.width, canvas.height);
							
						
						// // showNumbers();
						// // gridBorders();
							// vectorXMax=-50000000;
						 // vectorXMin=50000000000;
							// vectorYMax=-50000000;
						 // vectorYMin=50000000000;
							// vectorXYMax=-50000000;
						 // vectorXYMin=50000000000;
							// showVectors();
							// showVectors() ;
						
							// console.log("bla2");
							
					
						 // }, false);
						
						
		//listener za iteriranje				
						
						document.getElementById('start').addEventListener('click', function() {
							var brojIteracija = document.getElementById("brojIteracija").value;
							if(brojIteracija % 1 === 0 && isNaN(broj)==false  ) 
							// && broj % 1 === 0
							{
				for (var i=0; i < brojIteracija; i++){
								finiteDifferenceIteration();
								console.log(brojIteracija);
							}
							
							document.getElementById("deltaHtml").innerHTML = "Najveća delta iteracije: "+largest;
							
							
							document.getElementById("maxHtml").innerHTML = "Maksimalna vrijednost: "+biggest;
							
							
							document.getElementById("minHtml").innerHTML = "Minimalna vrijednost: "+smallest;
							
						
							
							submit();
							ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
							ruler();	
							
							// ctx.clearRect(0, 0, canvas.width, canvas.height);
								// showEdges();
								 // ctx.fillStyle = "black";
										  // gridBorders() ;
										 // showNumbers() ;
							
}	
				else {
					window.alert("Upisite broj, a ne slova, i/ili, definirajte dirichleta");
				
       
				}
							
							
							
						
					
						}, false);

	  //listener 3 gumb		
						
						 // document.getElementById('changeGrid').addEventListener('click', function() {
							 
						
							// // ctx.clearRect(0, 0, canvas.width, canvas.height);
						// // width=widthG*boxSize;  
						 // // height=heightG*boxSize;
						 // // canvas = document.createElement('canvas'),ctx = canvas.getContext("2d");
						 // // canvas.width=width;
						// // canvas.height=height;
						
							// // ctx.clearRect(0, 0, canvas.width, canvas.height);
					
							// // gridSize();
							// // width=widthG*boxSize;  
						 // // height=heightG*boxSize;
							// // matrix();
						// // gridBorders();
						// // showNumbers();
					// ekvipotencijale(document.getElementById("ekvipotencijala").value);
			
					
						 // }, false);




						 
						 //rangeSlider ilitiga za scale
						 
						 
						 var rangeSlider = document.getElementById("myRange");
						var output = rangeSlider.value;


						rangeSlider.oninput = function() {

  
			output = rangeSlider.value;
			outputPercentage=output*0.01
			console.log(output);
			document.getElementById("canvasesdiv").style.transform = "scale("+outputPercentage+")";

					}
//

						matrix();
						gridBorders();
						showEdges();
						
					
					
						}