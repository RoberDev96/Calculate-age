document.addEventListener('DOMContentLoaded', function () {

    // 1. Inicializar Flatpickr en el input
    const fechaInput = document.querySelector("#input");
    const flatpickrInstance = flatpickr(fechaInput, {
        locale: "es",
        dateFormat: "d/m/Y",
        altFormat: "j F, Y",
        altInput: false,
        maxDate: "today",
        placeholder: "Selecciona tu fecha de nacimiento",
        onChange: function (selectedDates, dateStr, instance) {
            // Opcional: validar mientras escribe
            console.log("Fecha seleccionada:", dateStr);
        }
    });
    const button = document.querySelector('.button')
    var resultado = document.querySelector('.resultado')


    button.addEventListener('click', () => {

        //capturo fecha seleccionada
        const fechaSelect = fechaInput.value;

        //lo llevo a formato luxon
        const fechaLuxon = luxon.DateTime.fromFormat(fechaSelect, 'dd/MM/yyyy')
        // console.log(fechaLuxon);




        //valido si esta vacio
        if (!fechaSelect) {
            resultado.innerHTML = 'Selecciona tu fecha de nacimiento'
            return;
        }

        const dt = luxon.DateTime.now();
        // console.log(dt);

        const resultado1 = dt.diff(fechaLuxon, ['years', 'months', 'days', 'hours', 'minutes', 'seconds']).toObject()
        //separo el year, mes y dia
        const años = Math.floor(resultado1.years);
        const meses = Math.floor(resultado1.months);
        const días = Math.floor(resultado1.days);
        const horas = Math.floor(resultado1.hours);
        const minutos = Math.floor(resultado1.minutes);
        const segundos = Math.floor(resultado1.seconds);

        const mesesTotales = (años * 12) + meses;
        const diasTotales = (mesesTotales * 30.44) + días; // Promedio real de días por mes
        const horasTotales = (diasTotales * 24) + horas;
        const minutosTotales = (horasTotales * 60) + minutos;
        const segundosTotales = (minutosTotales * 60) + segundos;


        const textYears = `Tienes ${años} años ${meses} meses y ${días} dias de vida`
        const textHours = `Lo que equivale a : `

        resultado.innerHTML = ` 
    ${textYears} <br> 
    ${textHours} <br> 
    Meses Totales: ${Math.floor(mesesTotales)}<br> 
    Días Totales: ${Math.floor(diasTotales)}<br>
    Horas Totales: ${Math.floor(horasTotales)}<br>
    Minutos Totales: ${Math.floor(minutosTotales)}<br>
    Segundos Totales: ${Math.floor(segundosTotales)}
`;

    })
})