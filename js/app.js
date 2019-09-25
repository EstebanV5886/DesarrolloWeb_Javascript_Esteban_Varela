var calculadora = {
	display:document.getElementById('display'),
	valor_display:"0",
	operacion:"",
	valor_uno:0,
	valor_dos:0,
	valor_ultimo:0,
	resultado:0,
	tecla_igual:false,

	init:(function(){
		this.estiloTeclas();
		this.eventos();
	}),

	estiloTeclas:function(){
		
		var teclas = document.getElementsByClassName("tecla");
		 for(var i = 0; i < teclas.length; i++){
			teclas[i].onclick = this.eventoDisminuyeTecla;
			teclas[i].onclick = this.eventoVuelveTecla;
		};
	},

	eventoDisminuyeTecla:function(event){
		calculadora.disminuyeTecla(event.target);
	},

	eventoVuelveTecla:function(event){
		calculadora.vuelveTecla(event.target);
	},

	disminuyeTecla:function(e){

		var x = e.id;

		if (x == "1" || x == "2" || x == "3" || x == "0" || x == "igual" || x == "punto" ) {
			e.style.width = "29%";
			e.style.height = "62px";
		} else if(x == "mas") {
			e.style.width = "90%";
			e.style.height = "100%";
		} else {
		    e.style.width = "22%";
		    e.style.height = "62px";
		}
	},

	vuelveTecla:function(e){

		var x = e.id;

		if (x == "1" || x == "2" || x == "3" || x == "0" || x == "igual" || x == "punto" ) {
			e.style.width = "29%";
			e.style.height = "62px";
		} else if(x == "mas") {
			e.style.width = "90%";
			e.style.height = "100%";
		} else {
		e.style.width = "22%";
		e.style.height = "62px";
		}
	},

	mostrarNumeros:function(num){
		if(this.valor_display.length < 8){
			if(this.valor_display == "0"){
				this.valor_display = "";
				this.valor_display = this.valor_display + num;
			}else{
				this.valor_display = this.valor_display + num;
			}
		  this.actualizarDisplay();		
		}
	},

	borrarNumeros:function(){
		this.valor_display = "0";
		this.operacion = "";
		this.valor_uno = 0;
		this.valor_dos = 0;
		this.resultado = 0;
		this.tecla_igual = false;
		this.actualizarDisplay();
	},

	agregarPunto:function(){
		if(this.valor_display.indexOf('.') == -1){
			if(this.valor_display == ''){
				this.valor_display = this.valor_display + "0.";
			}else{
				this.valor_display = this.valor_display + ".";
			}
			this.actualizarDisplay(); 
		}
	},

	agregarSignoNegativo:function(){
		if(this.valor_display != 0){
			var x;
			if(this.valor_display.charAt(0)=="-"){
				x = this.valor_display.slice(1);
			}else{
				x = "-" + this.valor_display;
			}
			this.valor_display = "";
			this.valor_display = x;
			this.actualizarDisplay();
		}
	},

	ingresarOperacion:function(op){
		this.valor_uno = parseFloat(this.valor_display);
		this.valor_display = "";
		this.operacion = op;
		this.tecla_igual = false;
		this.actualizarDisplay();	
	},

	realizarOperaciones:function(valor_uno, valor_dos, operacion){
		switch(operacion){
			case "+": 
				this.resultado = eval(valor_uno + valor_dos);
			break;
			case "-": 
				this.resultado = eval(valor_uno - valor_dos);
			break;
			case "*": 
				this.resultado = eval(valor_uno * valor_dos);
			break;
			case "/": 
				this.resultado = eval(valor_uno / valor_dos);
			break;
			case "raiz":
				this.resultado = eval(Math.sqrt(valor_uno));
		}
	},

	verResultado:function(){

		if(!this.tecla_igual){ 
			
			this.valor_dos = parseFloat(this.valor_display);
			this.valor_ultimo = this.valor_dos;
			
			this.realizarOperaciones(this.valor_uno, this.valor_dos, this.operacion);
		
		} else { 
		
		this.realizarOperaciones(this.valor_uno, this.valor_dos, this.operacion);
		}
			
		this.valor_uno = this.resultado;
			
		this.valor_display = "";

		if (this.resultado.toString().length < 9){
			this.valor_display = this.resultado.toString();
		} else {
			this.valor_display = this.resultado.toString().slice(0,8) + "...";
		}

		this.tecla_igual = true;		
		this.actualizarDisplay();
	},

	eventos:function(){
		document.getElementById("0").addEventListener("click", function() {calculadora.mostrarNumeros("0");});
		document.getElementById("1").addEventListener("click", function() {calculadora.mostrarNumeros("1");});
		document.getElementById("2").addEventListener("click", function() {calculadora.mostrarNumeros("2");});
		document.getElementById("3").addEventListener("click", function() {calculadora.mostrarNumeros("3");});
		document.getElementById("4").addEventListener("click", function() {calculadora.mostrarNumeros("4");});
		document.getElementById("5").addEventListener("click", function() {calculadora.mostrarNumeros("5");});
		document.getElementById("6").addEventListener("click", function() {calculadora.mostrarNumeros("6");});
		document.getElementById("7").addEventListener("click", function() {calculadora.mostrarNumeros("7");});
		document.getElementById("8").addEventListener("click", function() {calculadora.mostrarNumeros("8");});
		document.getElementById("9").addEventListener("click", function() {calculadora.mostrarNumeros("9");});
		document.getElementById("on").addEventListener("click", function() {calculadora.borrarNumeros();});
		document.getElementById("sign").addEventListener("click", function() {calculadora.agregarSignoNegativo();});
		document.getElementById("punto").addEventListener("click", function() {calculadora.agregarPunto();});
		document.getElementById("igual").addEventListener("click", function() {calculadora.verResultado();});
		document.getElementById("raiz").addEventListener("click", function() {calculadora.ingresarOperacion("raiz");});
		document.getElementById("dividido").addEventListener("click", function() {calculadora.ingresarOperacion("/");});
		document.getElementById("por").addEventListener("click", function() {calculadora.ingresarOperacion("*");});
		document.getElementById("menos").addEventListener("click", function() {calculadora.ingresarOperacion("-");});
		document.getElementById("mas").addEventListener("click", function() {calculadora.ingresarOperacion("+");});
	},

	actualizarDisplay:function(){
		this.display.innerHTML = this.valor_display;
	}
}

calculadora.init();