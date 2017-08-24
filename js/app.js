
/*const horario = document.querySelector('.horario');
const minutero = document.querySelector('.minutero');
const segundero = document.querySelector('.segundero');

function fijarAgujas() {

	const ahora = new Date();

	const hora = ahora.getHours();
	const gradosHora = 90 + hora * 30; // * 360 / 12
	horario.style.transform = `rotate(${gradosHora}deg)`;

	const minutos = ahora.getMinutes();
	const gradosMinutos = 90 + minutos * 6; // *360 / 60
	minutero.style.transform = `rotate(${gradosMinutos}deg)`;

	const segundos = ahora.getSeconds();
	const gradosSegundos = ((segundos / 60) * 360) + 90;
	segundero.style.transform = `rotate(${gradosSegundos}deg)`;

}

setInterval(fijarAgujas, 1000);*/

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let radio = canvas.height / 2;
ctx.translate(radio, radio);
radio = radio * 0.90
setInterval(dibujaReloj, 1000);

function dibujaReloj() {
	dibujaEstructura(ctx, radio);
	dibujaNumeros(ctx, radio);
	dibujaTiempo(ctx, radio);
}

function dibujaEstructura(ctx, radio) {
	let gradianes;
	ctx.beginPath();
	ctx.arc(0, 0, radio, 0, 2*Math.PI);
	ctx.fillStyle = 'white';
	ctx.fill();
	gradianes = ctx.createRadialGradient(0,0,radio*0.9, 0,0,radio*1);
	gradianes.addColorStop(0, 'black');
	gradianes.addColorStop(0.5, 'white');
	gradianes.addColorStop(1, 'black');
	ctx.strokeStyle = gradianes;
	ctx.lineWidth = radio*0.1;
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(0, 0, 4, 0, 2*Math.PI);
	ctx.fillStyle = 'black';
	ctx.fill();
}

function dibujaNumeros(ctx, radio) {
	let angulo;
	let numero;
	ctx.font = radio*0.15 + "px arial";
	ctx.textBaseline="middle";
	ctx.textAlign="center";
	for(numero = 1; numero < 13; numero++){
		angulo = numero * Math.PI / 6;
		ctx.rotate(angulo);
		ctx.translate(0, -radio*0.85);
		ctx.rotate(-angulo);
		ctx.fillText(numero.toString(), 0, 0);
		ctx.rotate(angulo);
		ctx.translate(0, radio*0.85);
		ctx.rotate(-angulo);
	}
}

function dibujaTiempo(ctx, radio){
	const ahora = new Date();
	let hora = ahora.getHours();
	let minutos = ahora.getMinutes();
	let segundos = ahora.getSeconds();
    //hora
    hora=hora%12;
    hora=(hora*Math.PI/6)+
    (minutos*Math.PI/(6*60))+
    (segundos*Math.PI/(360*60));
    dibujaAgujas(ctx, hora, radio*0.4, radio*0.04);
    //minutos
    minutos=(minutos*Math.PI/30)+(segundos*Math.PI/(30*60));
    dibujaAgujas(ctx, minutos, radio*0.6, radio*0.04);
    // segundos
    segundos=(segundos*Math.PI/30);
    dibujaAgujas(ctx, segundos, radio*0.75, radio*0.02);
}

function dibujaAgujas(ctx, pos, length, width) {
	ctx.beginPath();
	ctx.lineWidth = width;
	ctx.lineCap = "round";
	ctx.moveTo(0,0);
	ctx.rotate(pos);
	ctx.lineTo(0, -length);
	ctx.stroke();
	ctx.rotate(-pos);
}