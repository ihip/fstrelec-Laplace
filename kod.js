	//funkcija koja se injecta na body onload
						function ubaciUHtml() {	
						
						
						var vektorMaxAbsolutni;
						var vektorBoolean=0;
						var visinaP;
						var	sirinaP;
						var	 brojCvorova;

						var razmakCvorova;
						
						var	vektorXMax=-50000000;
						var vektorXMin=50000000000;
						var	vektorYMax=-50000000;
						var vektorYMin=50000000000;
						var	vektorXYMax=-50000000;
						var vektorXYMin=50000000000;
						
						
						
						//broj redova/stupaca dobiven od korisnika
						var sirinaR; 
						var visinaR;
						//najveciDelta
						var najveciDelta=0;					

						var delta = 0;
						var stariPotencijal = 0.0;
						var potencijal = new Array();						//broj u kvadraticu (2d array)
						var rubniUvjet = new Array();						//tip boxa (d=dirichlet,n=neuman, ili h=potencijal )
						velicinaResetke();
						var velicinaKvadrata = 30; // broj boxova(rezolucija(h/w)/velicinaKvadrata) 
						var sirina=sirinaR*velicinaKvadrata;  //sirina canvasa (sluzi za funkciju crtanja i odredjivanja broja boxova)
						var visina=visinaR*velicinaKvadrata; //visina
						
						//najmanji, najveci za rgbPostotak
						var najmanji;
						var najveci=0;
						var deltaExtrema=0;
						var iznosRazNajmanjeg=0;
						var rgbPostotak;
						var rgbPostotakIntezitet;
						var rgbPostotakString;
						var broj;//potencijal
						
					
						
						var canvas = document.getElementById("ctx"); ctx = canvas.getContext("2d");
						var canvas2 = document.getElementById("ctx2"); ctx2 = canvas2.getContext("2d");
						
					
						canvas.width=sirina;
						canvas.height=visina;
						canvas2.width=sirina+60;
						canvas2.height=visina+60;
					
						
						canvas.addEventListener('mousedown', clickDolje);
						canvas.addEventListener('mouseup', clickGore);
						canvas.addEventListener('dblclick', dvostrukiKlik);
				
						function dvostrukiKlik(e) {
							var i = parseInt(Math.floor(e.offsetX / velicinaKvadrata));
							var j = parseInt(Math.floor(e.offsetY / velicinaKvadrata));
							
							alert("Čvor: " + String(i) + " " + String(j) + " " + String(potencijal[i][j]));
						}
				
						function clickDolje(){								
							
	

						canvas.addEventListener('mousemove', lokacijaClicka);	
																							
						}

						function clickGore(){																				
								
						canvas.removeEventListener("mousemove", lokacijaClicka);
																				
						}
						
	
						//broj redova/stupaca
						var brojRedova = parseInt(sirina / velicinaKvadrata); 
						var brojStupaca = parseInt(visina / velicinaKvadrata);

						//popup za velicinu grida

						function velicinaResetke() {
							 visinaP = prompt("Visina presjeka", "3");
							sirinaP = prompt("Širina presjeka", "5");
							 brojCvorova = prompt("Broj čvorova po jedinici duljine", "5");
						
			function daLiJeBroj(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }
			 
			 visinaR = visinaP*brojCvorova+1;
			 sirinaR = sirinaP*brojCvorova+1;
			 razmakCvorova=1/brojCvorova;
			 
			 	document.getElementById("razmakC").innerHTML = "Razmak čvorova: "+razmakCvorova;
    
		 if(visinaP % 1 === 0 && sirinaP % 1 === 0 && brojCvorova % 1 === 0  ) {
				
}	
				else {
					
					
						 if(daLiJeBroj(visinaP)==false ||daLiJeBroj(sirinaP)==false ||daLiJeBroj(brojCvorova)==false ) {
				

	
						
								window.alert("Upisite broj, a ne slova!");
							
							location.reload();
						
				
					
				}
    
	
						
								window.alert("Upisite cijeli broj!");
						
							location.reload();
						
	
	
	}	
   }	
						//TEST ZA CANVAS 2 (fiz. koord.)
						function koordSustav() {
							var brojTrenutnoX=0-razmakCvorova;
							var brojTrenutnoY=0-razmakCvorova;
							var brojTrenutnoXC;
							var brojTrenutnoYC;
							ctx2.beginPath();
						ctx2.lineWidth=3;
						ctx2.moveTo(60,0);
						ctx2.lineTo(60,visinaR*velicinaKvadrata);
						
						ctx2.moveTo(58+sirinaR*velicinaKvadrata,0);
						ctx2.lineTo(58+sirinaR*velicinaKvadrata,visinaR*velicinaKvadrata);
						
						ctx2.moveTo(60,visinaR*velicinaKvadrata); 
						ctx2.lineTo(sirinaR*velicinaKvadrata+60,visinaR*velicinaKvadrata); 
						
							ctx2.moveTo(60,2); 
						ctx2.lineTo(sirinaR*velicinaKvadrata+60,2); 
						

						 ctx2.stroke();
						for (var i=0;i<sirinaR;i++){
						 //x os
							brojTrenutnoX=(brojTrenutnoX+razmakCvorova)
							brojTrenutnoXC=+brojTrenutnoX.toFixed(2);

							
							ctx2.lineWidth=1;
							ctx2.moveTo(60+((1/2)*velicinaKvadrata+velicinaKvadrata*i),visinaR*velicinaKvadrata-7);
						ctx2.lineTo(60+((1/2)*velicinaKvadrata+velicinaKvadrata*i),visinaR*velicinaKvadrata+7);
						if (brojTrenutnoXC==Math.floor(brojTrenutnoXC)){
							
							
								ctx2.font = "bold 15px Arial";
						ctx2.fillText(brojTrenutnoXC,55+((1/2)*velicinaKvadrata+velicinaKvadrata*i),visinaR*velicinaKvadrata+28)
							
						}
						
						
						else{
						ctx2.font = "11px Arial";
						ctx2.fillText(brojTrenutnoXC,50+((1/2)*velicinaKvadrata+velicinaKvadrata*i),visinaR*velicinaKvadrata+26)
						ctx2.fillText(brojTrenutnoXC,50+((1/2)*velicinaKvadrata+velicinaKvadrata*i),visinaR*velicinaKvadrata+26)
						}
						
						
							
							
						}
						//y os 
						
						for (var i=0;i<visinaR;i++){
							
							var brojZaKoord = visinaR-i-3
						
						ctx2.moveTo(60-7,((1/2)*velicinaKvadrata+velicinaKvadrata*i));
						ctx2.lineTo(60+7,((1/2)*velicinaKvadrata+velicinaKvadrata*i));
						
						brojTrenutnoY=(brojTrenutnoY+razmakCvorova);
						brojTrenutnoYC=+brojTrenutnoY.toFixed(2);
						
								if (brojTrenutnoYC==Math.floor(brojTrenutnoYC)){
							
							
								ctx2.font = "bold 15px Arial";
						ctx2.fillText(brojTrenutnoYC, 60-34,((1/2)*velicinaKvadrata+velicinaKvadrata*brojZaKoord+2*velicinaKvadrata+5))
							
						}
						
						
						else{
						ctx2.font = "11px Arial";
						ctx2.fillText(brojTrenutnoYC, 60-38,((1/2)*velicinaKvadrata+velicinaKvadrata*brojZaKoord+2*velicinaKvadrata+5))
						}
	
						}
						
						ctx2.stroke();
						}
						
						koordSustav();

						//izrada matrice za potencijal i rubniUvjet

						function inicijalizacija() {

						
						
							for (var i = 0; i < brojRedova; i++) {
									 																								 
								potencijal[i] = new Array();
								rubniUvjet[i]= new Array();

								
								for (var j = 0; j < brojStupaca; j++) {

		
									rubniUvjet[i][j]="h"
									potencijal[i][j] = 0.0;
									
									 rubniUvjet[0][j] = "n";
									 potencijal[0][j] = 0.0;
									
									 rubniUvjet[i][0] = "n";
									 potencijal[i][0] = 0.0;
									
									 rubniUvjet[i][parseInt(visinaR-1)] = "n";
									 potencijal[i][parseInt(visinaR-1)] = 0.0;
																																								

								}

							}

						
						 for (var j = 0; j < brojStupaca; j++) {

									
									 rubniUvjet[parseInt(sirinaR-1)][j] = "n";
									 potencijal[parseInt(sirinaR-1)][j] = 0.0;
																
																																		

								 }
						
	
						}
						
						
						//dirichlet za potencijale
						
						function pokaziBrojeveDrichlet() {
									var krug = '\u25C9';
									
									ctx.font = "bold 9px Arial";
							for (var i = 0; i < brojRedova; i++) {

								


								for (var j = 0; j < brojStupaca; j++) {

								
									var BrojUGriduPomaki=velicinaKvadrata*i+1;
									var BrojUGriduPomakj=velicinaKvadrata*j+(0.9*velicinaKvadrata);
									var BrojUGriduPomakiKrug=velicinaKvadrata*i+(0.4*velicinaKvadrata);
									var BrojUGriduPomakjKrug=velicinaKvadrata*j+(0.6*velicinaKvadrata); 
									
		
									
									if (rubniUvjet[i][j]=="d"){
										
										ctx.fillStyle = "white";  
										
										ctx.fillRect(i * velicinaKvadrata, j * velicinaKvadrata, velicinaKvadrata, velicinaKvadrata);
										
										
										 ctx.fillStyle = "rgba(104, 180, 247, 0.5)";  
										
										ctx.fillRect(i * velicinaKvadrata, j * velicinaKvadrata, velicinaKvadrata, velicinaKvadrata);
										
										
										
										ctx.fillStyle = "black";  
										 ctx.font = "15px Arial";
										
										ctx.fillText(potencijal[i][j],BrojUGriduPomaki,BrojUGriduPomakj);
										
										ctx.font = "bold 9px Arial";
										
						}}}}
						
						
						//dirichlet gotov

						
						//funkcija za ispis brojeva u grid i boje rubova

						function pokaziBrojeve() {
									var krug = '\u25C9';
									
									ctx.font = "bold 9px Arial";
							for (var i = 0; i < brojRedova; i++) {



								for (var j = 0; j < brojStupaca; j++) {

								
									var BrojUGriduPomaki=velicinaKvadrata*i+1;
									var BrojUGriduPomakj=velicinaKvadrata*j+(0.9*velicinaKvadrata);
									var BrojUGriduPomakiKrug=velicinaKvadrata*i+(0.4*velicinaKvadrata);
									var BrojUGriduPomakjKrug=velicinaKvadrata*j+(0.6*velicinaKvadrata); 
									
									
										if ( rubniUvjet[i][j]=="n"){}
									
									
								else	if (rubniUvjet[i][j]=="d"){
										ctx.fillStyle = "black";  
										 ctx.font = "15px Arial";
										
										ctx.fillText(potencijal[i][j],BrojUGriduPomaki,BrojUGriduPomakj);
										
										ctx.font = "bold 9px Arial";
										
									}
									
									
									else {
									
									if ( document.getElementById("provjeriN").checked==true){
										
										if ( document.getElementById("provjeriC").checked==true){
										
										ctx.font = "bold 9px Arial";
						
										}
										
										else {
										
										ctx.fillStyle = "black";
										
										var zaokruzi =+potencijal[i][j].toFixed(2);
										
										ctx.fillText(zaokruzi,BrojUGriduPomaki,BrojUGriduPomakj);
										ctx.font = "8px Arial";
											if ( document.getElementById("provjeriV").checked==false)
									{
										 ctx.fillText(krug,BrojUGriduPomakiKrug,BrojUGriduPomakjKrug);	
								}
									
										 ctx.font = "bold 9px Arial";
										}
										
									}
									
									else {

									if ( document.getElementById("provjeriC").checked==true){
										ctx.fillStyle = "black";
										ctx.fillText(potencijal[i][j],BrojUGriduPomaki,BrojUGriduPomakj);
									}
									
									else {
									ctx.fillStyle = "black";
									ctx.fillText(potencijal[i][j],BrojUGriduPomaki,BrojUGriduPomakj);			
									}
									}
									}
	

								}

							}

							
						}

						
						
						//funkcija za boje rubova neumana i dirichleta
						
						
							function pokaziRubove() {

							for (var i = 0; i < brojRedova; i++) {


								for (var j = 0; j < brojStupaca; j++) {
	
									
									if (rubniUvjet[i][j]=="d"){
										
						
										 ctx.fillStyle = "rgba(104, 180, 247, 0.5)";  
										
										ctx.fillRect(i * velicinaKvadrata, j * velicinaKvadrata, velicinaKvadrata, velicinaKvadrata);
										
									}

									if (rubniUvjet[i][j]=="n"){
										
										 	ctx.fillStyle = "rgba(167, 30, 6, 0.5)";
										
										ctx.fillRect(i * velicinaKvadrata, j * velicinaKvadrata, velicinaKvadrata, velicinaKvadrata);
										
									}

					

								}

							}

							
						}
						
						//pokusaj ekvipotencijala take 3 (i dalje beta)
						
						function ekvipotencijale(meta){
							
						
							var minimalnaUdaljenost=2000;
							
							 var meta;
							
					var spojilaSe= new Array();
					var spajaloSeUNju= new Array();
					var xMeta = new Array();
					var yMeta= new Array();
							
							
								for (var i = 0; i < brojRedova; i++) {


								for (var j = 0; j < brojStupaca; j++) {

									
								
							var centarInterpolacijei=velicinaKvadrata*i+(0.5*velicinaKvadrata-2);
							var centarInterpolacijej=velicinaKvadrata*j+(0.5*velicinaKvadrata); 
							var intezitet=potencijal[i][j];
							
							
						
							
							var razlikaPolja;
							var  razlikaMeteIPolja;
							var omjer;
							var udaljenost;
							
									
									
										function nasliSmoGa(smjer){
											
											razlikaPolja=Math.abs(smjer-intezitet);
											razlikaMeteIPolja=meta-intezitet;
											omjer=razlikaMeteIPolja/razlikaPolja;
											udaljenost=velicinaKvadrata*omjer;
											
										
										}
									
									function crtaj(){
									
											ctx.beginPath();
										
										var prviBroj=1;
										 for (var i = 0; i < xMeta.length; i++) {
										
						
											for (var ii = 0; ii < xMeta.length; ii++) {
												
												
												var xUdaljenostSuseda=Math.abs(xMeta[i]-xMeta[ii])
												var yUdaljenostSuseda=Math.abs(yMeta[i]-yMeta[ii]);
										

											//za bolju verziju nekad

											
											 var formulaUdaljenost=Math.abs(Math.sqrt(Math.pow(xMeta[i]-xMeta[ii],2)+Math.pow(yMeta[i]-yMeta[ii],2)));
											
										
											
												if ( spojilaSe[i]=="da" && spajaloSeUNju=="da"){}
												
											else {
											
											if (xUdaljenostSuseda<(velicinaKvadrata+(1)) && yUdaljenostSuseda<(velicinaKvadrata+1)  ){
												
			
										
								ctx.beginPath();
								ctx.lineWidth = 2;
							ctx.fillStyle="black"
							spojilaSe[i]="da"
							  spajaloSeUNju[ii]="da";
								ctx.moveTo(xMeta[i], yMeta[i]);
								ctx.lineTo(xMeta[ii], yMeta[ii]);
										ctx.stroke();
												
								
										
										
											}
												
											 }
								
												
											}
											
										
											}

					
										
									}
									
									
									
									if (rubniUvjet[i][j]=="d"){
										
										
										
									}

									if (rubniUvjet[i][j]=="n"){
										
										
										
									}

									
									
									if (rubniUvjet[i][j]=="h"){
											
										if(potencijal[i][j]<=meta){
	
											if(potencijal[i+1][j]>=meta){
												var intezitetR=potencijal[i+1][j];
												
	
												nasliSmoGa(intezitetR);
												
												xMeta.push(centarInterpolacijei+udaljenost);
												yMeta.push(centarInterpolacijej);
												
			
											}
											if(potencijal[i-1][j]>=meta){
											
											
											 var intezitetL=potencijal[i-1][j];
										
											 nasliSmoGa(intezitetL);
											 xMeta.push(centarInterpolacijei-udaljenost);
												 yMeta.push(centarInterpolacijej);
											
											
										}
											if(potencijal[i][j+1]>=meta){
											
											
												 var intezitetD=potencijal[i][j+1];
											
										
											nasliSmoGa(intezitetD);
											xMeta.push(centarInterpolacijei);
												 yMeta.push(centarInterpolacijej+udaljenost);
												 
		 
											
										 }
											 if (potencijal[i][j-1]>=meta){
												var intezitetU=potencijal[i][j-1];
												
												 nasliSmoGa(intezitetU);
											 xMeta.push(centarInterpolacijei);
												yMeta.push(centarInterpolacijej-udaljenost);

												
												 }
					
										}
										
																														
									}
									
								}
																								
							}

													
						crtaj();

							
						}
						
					
						// vizualizacija svakog potencijala bojom
						
						
							function prikaziVrijednostiBojom() {
								
								
								
								ctx.clearRect(0, 0, canvas.width, canvas.height);
								pokaziRubove();
								ruboviResetke();
							
								deltaExtrema=najveci-najmanji;

							for (var i = 0; i < brojRedova; i++) {


								for (var j = 0; j < brojStupaca; j++) {

								var BrojUGriduPomaki=velicinaKvadrata*i+1;
								var BrojUGriduPomakj=velicinaKvadrata*j+(0.9*velicinaKvadrata);	
								
									if (rubniUvjet[i][j]=="h"){
								
								
								iznosRazNajmanjeg=potencijal[i][j]-najmanji;
								
								rgbPostotak=iznosRazNajmanjeg/deltaExtrema;
								rgbPostotakIntezitet=Math.round(rgbPostotak*255);
							var rgbPostotakIntezitetSuprotno=255-rgbPostotakIntezitet;
							var zaokruzi =+potencijal[i][j].toFixed(2);
								
						
				var	bojaString="rgba(" + Math.round(rgbPostotakIntezitet*1) + "," + (Math.round(rgbPostotakIntezitetSuprotno*0.5)) + "," + Math.round(rgbPostotakIntezitetSuprotno*1) +"," +1+ ")";
					

								ctx.fillStyle = bojaString;
											
								ctx.fillRect(i * velicinaKvadrata, j * velicinaKvadrata, velicinaKvadrata, velicinaKvadrata);
								
								if ( document.getElementById("provjeriN").checked==true) {
									
							
									ctx.fillStyle = "black";
									ctx.fillText(zaokruzi,BrojUGriduPomaki,BrojUGriduPomakj);
									
							
									
								}
								
									}
								
								if (rubniUvjet [i][j]=="d"){
									ctx.fillStyle ="black";
								ctx.font = "15px Arial";
										
										ctx.fillText(potencijal[i][j],BrojUGriduPomaki,BrojUGriduPomakj);
								ctx.font = "bold 9px Arial";	
								}
								
								
							}
							
							
							
							
								}
	
						}

						//GLAVNO!
						function konacneRazlikeIteracija() {
	
							najveci=0;
							najmanji=50000000000000;					
							 najveciDelta=0;
						
						
							for (var i = 0; i < brojRedova; i++) {


								for (var j = 0; j < brojStupaca; j++) {
									

								//deklaranje varijabli koje koristimo u glavnoj jednadzbi

								
									if (i==0|| j==0 || i==sirinaR-1 || j==visinaR-1){
								
									
									}
								else {
									
									var desno = potencijal[i+1][j];
									var dolje = potencijal[i][j+1];
									var lijevo = potencijal[i-1][j];
									var gore = potencijal[i][j-1];
									
								}
						
								
								//pregled dal se nalazimo na "d" ili "n", ako ne idemo s iteracijom	

									if (rubniUvjet[i][j]==="d" || rubniUvjet[i][j]==="n" ) {
						
											}
			
									else
				
										//prvo dal smo na rubu, i onda jednadzba
									
									{
										
										if (rubniUvjet[i+1][j]==="n" )
											
											{
												
												desno = potencijal[i][j];
												
											}
										
										
											if (rubniUvjet[i-1][j]==="n" )
											
											{
												
												lijevo = potencijal[i][j];
												
											}
									
										
										
										
										
											if (rubniUvjet[i][j+1]==="n" )
											
											{
												
												dolje = potencijal[i][j];
												
											}
											
											
											
												if (rubniUvjet[i][j-1]==="n" )
											
											{
												
												gore = potencijal[i][j];
												
											}
										
										
										
										//jednadzba s deltom i najveci najmanji
									
										 stariPotencijal =potencijal[i][j];
 
										 potencijal[i][j] = 0.25*(gore+dolje+lijevo+desno);
										 delta=potencijal[i][j]-stariPotencijal;
										 
									 if (najveci < potencijal[i][j]){
											 
											 najveci=potencijal[i][j];
										 }
										 
										 if (potencijal[i][j]==0){}
										 
										 else{
										
										if (najmanji > potencijal[i][j]){
											 
											 najmanji=potencijal[i][j];
										 }
										 
										 
										 }
										
										
										 if (najveciDelta < Math.abs(delta)){
											 
											 najveciDelta=Math.abs(delta);
										 }
										 
	
										
									}
									
																																	

								}
		
							}
							
						
							
						}
						
						//iscrtavanje grida
							//function ruboviResetke() preuzeto i modificirano sa:
						//	http://rg.c-hip.net/2013/seminari/cvrtila/rjesenje.html  (Cvrtila 2013) 
						function ruboviResetke() 
							
						{
							

							for (var i = 0; i <= visina; i += velicinaKvadrata) {
							 
								ctx.beginPath();
								ctx.lineWidth = 0.4;
								ctx.moveTo(0, i);
								ctx.lineTo(sirina, i);
								ctx.stroke();
					
							}

							for (var j = 0; j <= sirina; j += velicinaKvadrata) {
								 
								ctx.beginPath();
								ctx.lineWidth = 0.4;
								ctx.moveTo(j, 0);
								ctx.lineTo(j, visina);
								ctx.stroke();
							}
				
							}
						// za odabir n ili d ili ocisti
						
							function promjena(i,j){
								
								
								
								var odaberi = document.getElementById("odaberi");
							var unos = odaberi.options[odaberi.selectedIndex].value;
							if (unos == "1") {
								 broj = document.getElementById("broj").value;
								var BrojUGriduPomaki=velicinaKvadrata*i+1;
								var BrojUGriduPomakj=velicinaKvadrata*j+(0.9*velicinaKvadrata);
								
								rubniUvjet[i][j] = "d";
								potencijal[i][j] = parseFloat(broj);
								
								
								ctx.fillStyle = "rgba(104, 180, 247, 1)";  
								ctx.fillRect((i * velicinaKvadrata)+1.5, (j * velicinaKvadrata)+1.5, velicinaKvadrata-3, velicinaKvadrata-3);
								ctx.fillStyle ="black";
								ctx.font = "15px Arial";
										
										ctx.fillText(potencijal[i][j],BrojUGriduPomaki,BrojUGriduPomakj);
										
										ctx.font = "bold 9px Arial";
								
							} else if (unos == "2") {
								rubniUvjet[i][j] = "n";
								potencijal[i][j] = 0.0;
								ctx.fillStyle = "rgba(167, 30, 6, 1)";
								
									ctx.fillRect((i * velicinaKvadrata)+1.5, (j * velicinaKvadrata)+1.5, velicinaKvadrata-3, velicinaKvadrata-3);
							
																
							}
							
							
							else if (unos=="3"){
								ctx.fillStyle = "white";
								rubniUvjet[i][j] = "h";
								
								potencijal[i][j] = 0.00;
								ctx.fillRect((i * velicinaKvadrata)+1.5, (j * velicinaKvadrata)+1.5, velicinaKvadrata-3, velicinaKvadrata-3);
								
								
							}
							
							
							
				
								
							}
							
							
							
							// za crtanje (handleClick)
							
							function lokacijaClicka(e) {
							var i = parseInt(Math.floor(e.offsetX / velicinaKvadrata));
							var j = parseInt(Math.floor(e.offsetY / velicinaKvadrata));
							
							

							promjena(i,j);
							
							
						}
						
						
						//funkcija za strelicu
						//function canvas_strelica Uzeto sa:https://stackoverflow.com/questions/808826/draw-arrow-on-canvas-tag (Cieslewski, 2011)
						
						function canvas_strelica(context, odx, ody, premax, premay){
	
		var sirinaPGlave = 4;	// sirinaP glave u pixelima
		
		var dx = premax-odx;
		var dy = premay-ody;
		var kut = Math.atan2(dy,dx);
		context.lineWidth=1;
		context.moveTo(odx, ody);
		context.lineTo(premax, premay);
		context.lineTo(premax-sirinaPGlave*Math.cos(kut-Math.PI/6),premay-sirinaPGlave*Math.sin(kut-Math.PI/6));
		context.moveTo(premax, premay);
		context.lineTo(premax-sirinaPGlave*Math.cos(kut+Math.PI/6),premay-sirinaPGlave*Math.sin(kut+Math.PI/6));
	}
						
				
						
						function pokaziVektore() {
						
								var	 vektorXPostotak;
								var	 vektorYPostotak;
									ctx.fillStyle="black";
									ctx.font = "8px Arial";
									var krug = '\u25C9';
							for (var i = 0; i < brojRedova; i++) {


								for (var j = 0; j < brojStupaca; j++) {

									var BrojUGriduPomaki=velicinaKvadrata*i+(0.4*velicinaKvadrata);
									var BrojUGriduPomakj=velicinaKvadrata*j+(0.6*velicinaKvadrata); 
									
									var BrojUGriduPomakiBroj=velicinaKvadrata*i+1;
									var BrojUGriduPomakjBroj=velicinaKvadrata*j+(0.9*velicinaKvadrata);	
									var zaokruzi =+potencijal[i][j].toFixed(2);
								
								if (rubniUvjet [i][j]=="d"){
									ctx.fillStyle ="black";
								ctx.font = "15px Arial";
										
										ctx.fillText(zaokruzi,BrojUGriduPomakiBroj,BrojUGriduPomakjBroj);
								
								}
								
	
									if (i==0|| j==0 || i==sirinaR-1 || j==visinaR-1){
								
									
									}
								else {
									
									var desno = potencijal[i+1][j];
									var dolje = potencijal[i][j+1];
									var lijevo = potencijal[i-1][j];
									var gore = potencijal[i][j-1];
									
								}
						
								
								//pregled dal se nalazimo na "d" ili "n", ako ne idemo s iteracijom	
									
									
									if (rubniUvjet[i][j]==="d" || rubniUvjet[i][j]==="n" ) {
						
											}
											
											
									else
				
										//prvo da li smo na rubu, i onda jednadzba
									
									{
										
										if (rubniUvjet[i+1][j]==="n" )
											
											{
												
												desno = potencijal[i][j];
												
											}
										
										
											if (rubniUvjet[i-1][j]==="n" )
											
											{
												
												lijevo = potencijal[i][j];
												
											}
									
										
										
										
										
											if (rubniUvjet[i][j+1]==="n" )
											
											{
												
												dolje = potencijal[i][j];
												
											}
											
											
											
												if (rubniUvjet[i][j-1]==="n" )
											
											{
												
												gore = potencijal[i][j];
												
											}
										
										 deltaVectorX=0;
										 deltaVectorY=0;
											
										
										//jednadzba 
									
										 
										var  vektorX= -(desno-lijevo)/2
										var  vektorY= -(dolje-gore)/2
										 
										
										 if (vektorXMax < vektorX   ){
											 
											 vektorXMax=vektorX;
											 
											 
											 
										 }
										 
										 
										  if (vektorYMax < vektorY   ){
											 
											 vektorYMax=vektorY;
											 
											 
											 
										 }
										 

										
										if (vektorXMin > vektorX ){
											 
											 	 vektorXMin=vektorX;
							 
										 }
										 
										 	
										if (vektorYMin > vektorY ){
											 
											 	 vektorYMin=vektorY;
			 
											 
										 }
										 
										 
										 if (vektorXMax>vektorYMax){
											 
											 vektorXYMax=vektorXMax;
											 
										 }
										
										else{
											
											vektorXYMax=vektorYMax;
										}
										
										
										
											 if (vektorXMin<vektorYMin){
											 
											 vektorXYMin=vektorXMin;
											 
										 }
										
										else{
											
											vektorXYMin=vektorYMin;
										}
										
										if(Math.abs(vektorXYMin)>Math.abs(vektorXYMax)){
											
											vektorMaxAbsolutni=Math.abs(vektorXYMin);
											
										
										}
										
										
										else {
											
											
											vektorMaxAbsolutni=Math.abs(vektorXYMax);
											
										}
									
										 vektorXPostotak=(vektorX/vektorMaxAbsolutni);
										 vektorYPostotak=(vektorY/vektorMaxAbsolutni);
		
									if(vektorBoolean==1){

									
									
									ctx.beginPath();

										  canvas_strelica(ctx,BrojUGriduPomaki+3,BrojUGriduPomakj-3,BrojUGriduPomaki+3+vektorXPostotak*50,BrojUGriduPomakj-3+vektorYPostotak*50);
										ctx.stroke();
									ctx.font = "8px Arial";	
	
									ctx.fillText(krug,BrojUGriduPomaki,BrojUGriduPomakj);
									
									
									}
						
									}

								}

							}

							if(vektorBoolean==0){
								vektorBoolean=1;
							}
							
							else {
								
								vektorBoolean=0;
							}
							
							
						}

					
							
		// funkcija potvrdi 
		
		function potvrdi(){
			 ctx.font = "bold 9px Arial";
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ruboviResetke() ;
			if ( document.getElementById("provjeriC").checked==true)
			{
				
				prikaziVrijednostiBojom();
				ruboviResetke() ;
				
			}
			
			
			if (document.getElementById("provjeriV").checked==true){
				
				
				pokaziRubove();
				
					vektorXMax=-50000000;
						 vektorXMin=50000000000;
							vektorYMax=-50000000;
						 vektorYMin=50000000000;
							vektorXYMax=-50000000;
						 vektorXYMin=50000000000;
							pokaziVektore();
							pokaziVektore() ;
				
				
			}
			
			if ( document.getElementById("provjeriN").checked==true)
			{

										pokaziRubove();  
										 pokaziBrojeve() ;
				
				
			}
			

		}
				

//listener za ekvipotencijale

document.getElementById('posaljiE').addEventListener('click', function() {
					
					ekvipotencijale(document.getElementById("ekvipotencijala").value);
					pokaziBrojeveDrichlet();
		
		
					
						 }, false);	
			
			
		//listener za potvrdi 


	 document.getElementById('potvrdi').addEventListener('click', function() {
					
						potvrdi();
		
					
						 }, false);		
							
			
		//listener za iteriranje				
						
						document.getElementById('start').addEventListener('click', function() {
							var brojIteracija = document.getElementById("brojIteracija").value;
							if(brojIteracija % 1 === 0 && isNaN(broj)==false  ) 
						
							{
				for (var i=0; i < brojIteracija; i++){
								konacneRazlikeIteracija();
							}
							
							document.getElementById("deltaHtml").innerHTML = "Najveća delta iteracije: "+najveciDelta;
							
							
							document.getElementById("maxHtml").innerHTML = "Maksimalna vrijednost: "+najveci;
							
							
							document.getElementById("minHtml").innerHTML = "Minimalna vrijednost: "+najmanji;
							
						
							
							potvrdi();
							ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
							koordSustav();	
					
}	
				else {
					window.alert("Upisite broj, a ne slova, i/ili, definirajte dirichleta");
				
       
				}
							

						}, false);


						 //skalirajGridKlizac ilitiga za skalirat canvas div

						 var skalirajGridKlizac = document.getElementById("klizac");
						var izlaz = skalirajGridKlizac.value;

						skalirajGridKlizac.oninput = function() {

  
			izlaz = skalirajGridKlizac.value;
			var izlazPostotak=izlaz*0.01
			document.getElementById("canvasesdiv").style.transform = "scale("+izlazPostotak+")";

					}

						inicijalizacija();
						ruboviResetke();
						pokaziRubove();
						
					
					
						}