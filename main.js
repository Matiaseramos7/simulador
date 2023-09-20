const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const modal = document.getElementById('modal');
const closeButton = document.querySelector('.close');

const modalMail = document.getElementById('modal-mail');
const closeButtonMail = document.querySelector('.close-mail');

const contenedor = document.querySelector('.formulario')
const contPadre = document.querySelector('.div-padre')
const $nombre = document.querySelector('#nombre')
const $apellido = document.querySelector('#apellido')
const $fecha = document.querySelector('#fecha')
const $correo = document.querySelector('#correo')
const $sueldoAprox = document.querySelector('#sueldo')
const $monto = document.querySelector('#monto')

const btnSiguiente = document.querySelector('#btn-siguiente')

let contenidoVisible = false

btnSiguiente.addEventListener('click', async () => {
    let nombre = $nombre.value.toUpperCase().trim()
    let apellido = $apellido.value.toUpperCase().trim()
    let fecha = $fecha.value
    let correo = $correo.value.toUpperCase().trim()
    let sueldo = $sueldoAprox.value
    let monto = $monto.value

    if (nombre === '' || apellido === '' || fecha === '' || correo === '' || sueldo === '' || monto === '') {
        modal.style.display = 'block';
        return;
    }

    if (!emailRegex.test(correo)) {
        // alert('Por favor, ingrese una dirección de correo electrónico válida.');
        modalMail.style.display = 'block';
        return;
    }

    mostrarLoader();

    await new Promise(resolve => setTimeout(resolve, 3500));


    if (contenidoVisible) {
        contenedor.style.display = 'block'
        contenidoVisible = false
    } else {

        const cuotas12 = calcular(monto, 15, 12)
        const cuotas18 = calcular(monto, 25, 18)
        const cuotas24 = calcular(monto, 35, 24)
        const cuotas36 = calcular(monto, 45, 36)

        ocultarLoader();


        contenedor.innerHTML = `
        <div class="cont-div">
                <div class="mensaje">
                    <h3 class="h3">
                        BIENVENID@ ${nombre} ${apellido}, correo ${correo}. Me agrada informale que
                        mediante su salario mensual de $${sueldo} y su monto deseado de $${monto}, tenemos estas
                        opciones para usted!
                        </h2>
                </div>
                <div class="promociones">

                    <div class="promo1">
                        <div class="label1">
                            <label class="promocionesLabel" for="inputPromocion1">12 CUOTAS</label>
                        </div>
                        <input type="text" readonly name="" placeholder='$${cuotas12}' id="inputPromocion1">
                    </div>

                    <div class="promo2">
                        <div class="label2">
                            <label class="promocionesLabel" for="inputPromocion2">18 CUOTAS</label>
                        </div>
                        <input type="text" readonly name="" placeholder='$${cuotas18}' id="inputPromocion2">
                    </div>

                    <div class="promo3">
                        <div class="label3">
                            <label class="promocionesLabel" for="inputPromocion3">24 CUOTAS</label>
                        </div>
                        <input type="text" readonly name="" placeholder='$${cuotas24}' id="inputPromocion3">
                    </div>

                    <div class="promo4">
                        <div class="label4">
                            <label class="promocionesLabel" for="inputPromocion4">36 CUOTAS</label>
                        </div>
                        <input type="text" readonly name="" placeholder='$${cuotas36}' id="inputPromocion4">
                    </div>

                </div>
            </div>
        `
        contenidoVisible = true
    }

})

function calcular(monto, tasa, cuotas) {

    montoParseado = parseInt(monto)
    let interes = (tasa / 100) * montoParseado;
    let sumaFinal = interes + montoParseado
    let final = sumaFinal / cuotas
    return final.toFixed(2)

}

function mostrarLoader() {
    const loader = document.getElementById('loader');
    loader.style.display = 'block';
}

function ocultarLoader() {
    const loader = document.getElementById('loader');
    loader.style.display = 'none';
}

closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

closeButtonMail.addEventListener('click', () => {
    modalMail.style.display = 'none';
});