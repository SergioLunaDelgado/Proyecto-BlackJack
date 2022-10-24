document.addEventListener('DOMContentLoaded', function () {
    eventListeners();
});

/* Estos son los puntajes de las cartas de la computadora y el jugador */
Crupier = 0;
Jugador = 0;

function eventListeners() {
    /* Secciones padres */
    const opciones = document.querySelector('#opciones');
    const game = document.querySelector('#game');
    const info = document.querySelector('#info');

    /* Botones */
    const btn_play = document.querySelector('#btn_play');
    const btn_how = document.querySelector('#btn_how');
    const btn_regresar = document.querySelector('#btn_regresar');

    /* Oculta el menu y muestra el juego */
    btn_play.addEventListener('click', function () {
        opciones.classList.add('ocultar');
        game.classList.remove('ocultar');
        inicioCrupier();
    });

    /* Oculta el menu y muestra la informacion */
    btn_how.addEventListener('click', function () {
        opciones.classList.add('ocultar');
        info.classList.remove('ocultar');
    });

    /* Oculta la informacion y muestra el menu */
    btn_regresar.addEventListener('click', function () {
        info.classList.add('ocultar');
        opciones.classList.remove('ocultar');
    });
}

function cartaAleatoria() {
    let carta = Math.floor(Math.random() * 13) + 1;
    return carta;
}

function inicioCrupier() {
    const cartasCrupier = document.querySelector('#cartasCrupier'); /* div padre */
    const valorCrupier = document.querySelector('.valorCrupier'); /* span */

    let cartaValor = cartaAleatoria();
    (cartaValor == 11 || cartaValor == 12 || cartaValor == 13) ? Crupier += 10 : (cartaValor == 1 ? Crupier += 11 : Crupier += cartaValor);

    const primeraCarta = document.createElement('DIV');
    primeraCarta.innerHTML = `<img src="img/${cartaValor}.png" alt="${cartaValor}" class="carta">`;

    valorCrupier.textContent = Crupier;
    cartasCrupier.appendChild(primeraCarta);

    const segundaCarta = document.createElement('DIV');
    segundaCarta.classList.add('incognito');
    segundaCarta.innerHTML = `<img src="img/Incognito.png" alt="cartas" class="carta">`;

    setTimeout(() => {
        cartasCrupier.appendChild(segundaCarta);
        setTimeout(() => {
            inicioJugador();
        }, 1000);
    }, 1000);
}

function inicioJugador() {
    const game = document.querySelector('#game'); /* Section */

    const cartasJugador = document.querySelector('#cartasJugador'); /* div padre */
    const valorJugador = document.querySelector('.valorJugador'); /* span */

    const contenedorBtn = document.createElement('DIV'); /* Contenedor con los botones del blackjack */
    contenedorBtn.classList.add('contenedor-botones');
    contenedorBtn.innerHTML =
        `<div class="botones">
            <button id="btn_Otra" class="btn bg-amarillo mr-5" onclick="Agregar()">
                <div class="center">
                    <img src="img/add.svg" alt="add" class="botones__icono">
                    Add
                </div>
            </button>
            <button id="btn_Parar" class="btn bg-rojo">
                <div class="center">
                    <img src="img/hand.svg" alt="hand" class="botones__icono" onclick="Parar()">
                    Stop
                </div>
            </button>
        </div>`;

    let cartaValor = cartaAleatoria();
    (cartaValor == 11 || cartaValor == 12 || cartaValor == 13) ? Jugador += 10 : (cartaValor == 1 ? Jugador += 11 : Jugador += cartaValor);

    const primeraCarta = document.createElement('DIV');
    primeraCarta.innerHTML = `<img src="img/${cartaValor}.png" alt="${cartaValor}" class="carta">`;
    valorJugador.textContent = Jugador;

    let cartaValor2 = cartaAleatoria();
    (cartaValor2 == 11 || cartaValor2 == 12 || cartaValor2 == 13) ? Jugador += 10 : ((cartaValor2 == 1 && Jugador != 11) ? Jugador += 11 : Jugador += cartaValor2);
    cartasJugador.appendChild(primeraCarta);

    const segundaCarta = document.createElement('DIV');
    segundaCarta.innerHTML = `<img src="img/${cartaValor2}.png" alt="${cartaValor2}" class="carta">`;

    setTimeout(() => {
        cartasJugador.appendChild(segundaCarta);
        valorJugador.textContent = Jugador;
        setTimeout(() => {
            game.appendChild(contenedorBtn);
            if (Jugador == 21) {
                setTimeout(() => {
                    reiniciar("You win :)", "success");
                }, 1000);
            }
        }, 1000);
    }, 1000);
}

function Agregar() {
    const cartasJugador = document.querySelector('#cartasJugador'); /* div padre */
    const valorJugador = document.querySelector('.valorJugador'); /* span */

    let cartaValor = cartaAleatoria();
    (cartaValor == 11 || cartaValor == 12 || cartaValor == 13) ? Jugador += 10 : Jugador += cartaValor;

    const primeraCarta = document.createElement('DIV');
    primeraCarta.innerHTML = `<img src="img/${cartaValor}.png" alt="${cartaValor}" class="carta">`;

    valorJugador.textContent = Jugador;
    cartasJugador.appendChild(primeraCarta);

    if (Jugador > 21) {
        setTimeout(() => {
            reiniciar("You lost :(", "error");
        }, 1000);
    }
    if (Jugador == 21) {
        setTimeout(() => {
            reiniciar("You win :)", "success");
        }, 1000);
    }
}

function Parar() {
    /* Bloqueo el boton de agregar para evitar que el usuario siga pidiendo cartas */
    const btn_Otra = document.querySelector('#btn_Otra');
    btn_Otra.classList.add('bg-gris');
    btn_Otra.disabled = true;

    /* Quito la carta "?"" */
    const incognito = document.querySelector('.incognito');
    incognito.remove();

    const cartasCrupier = document.querySelector('#cartasCrupier'); /* div padre */
    const valorCrupier = document.querySelector('.valorCrupier'); /* span */

    do {
        let cartaValor = cartaAleatoria();
        (cartaValor == 11 || cartaValor == 12 || cartaValor == 13) ? Crupier += 10 : Crupier += cartaValor;

        let primeraCarta = document.createElement('DIV');
        primeraCarta.innerHTML = `<img src="img/${cartaValor}.png" alt="${cartaValor}" class="carta">`;

        valorCrupier.textContent = Crupier;
        cartasCrupier.appendChild(primeraCarta);
    } while (Crupier < 17);

    setTimeout(() => {
        if (Crupier > 21) {
            reiniciar("You win :)", "success");
        }
        else if (Crupier == Jugador) {
            reiniciar("It's a draw :O", "info");
        }
        else if (Crupier > Jugador) {
            reiniciar("You lost :(", "error");
        } else {
            reiniciar("You win :)", "success");
        }
    }, 1000);
}

function reiniciar(mensaje, status) {
    /* Bloqueo el boton de agregar para evitar que el usuario siga pidiendo cartas */
    const btn_Otra = document.querySelector('#btn_Otra');
    btn_Otra.classList.add('bg-gris');
    btn_Otra.disabled = true;

    const cartasCrupier = document.querySelector('#cartasCrupier'); /* div padre */
    const valorCrupier = document.querySelector('.valorCrupier'); /* span */
    const cartasJugador = document.querySelector('#cartasJugador'); /* div padre */
    const valorJugador = document.querySelector('.valorJugador'); /* span */
    const contenedorBotones = document.querySelector('.contenedor-botones'); /* div con los botones del blackjack */

    /* Esto es de Sweetalert */
    Swal.fire({
        title: mensaje,
        text: "Do you want to play again?",
        icon: status,
        showCancelButton: true,
        confirmButtonColor: '#ffd700',
        cancelButtonColor: '#ff6347',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.isConfirmed) {
            btn_Otra.disabled = false;
            cartasJugador.innerHTML = '';
            cartasCrupier.innerHTML = '';
            contenedorBotones.innerHTML = '';
            Jugador = 0;
            Crupier = 0;
            valorJugador.textContent = Jugador;
            valorCrupier.textContent = Crupier;
            inicioCrupier();
        } else {
            window.location.href = "/";
        }
    })
}