class MiEtiqueta extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        this.innerHTML = '<p>View: SamplePage</p>'
    }

    static get NombreEtiqueta() {
        return ''
    }

    get is () {
        return this.getAttribute('is')
    }


    set is (value) {
        this.setAttribute('is', value || this.NombreEtiqueta)
    }
}

customElements.define('mi-p', MiEtiqueta)

class MiBoton extends HTMLElement {
    constructor() {
        super()
        this.addEventListener('click', (e) => {
            search()
        })
    }

    connectedCallback() {
        this.innerHTML = '<button>Search</button>'
        this.className = 'searching'
    }
    
    static get NameButton() {
        return ''
    }

    get is () {
        return this.getAttribute('is')
    }


    set is (value) {
        this.setAttribute('is', value || this.NameButton)
    }
}
customElements.define('mi-boton', MiBoton)

function search() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;

    input = document.getElementById("buscador");
    filter = input.value.toUpperCase();
    console.log(filter)
    
    table = document.getElementById("new_table");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        console.log(td)
        if (td) {
            txtValue = td.textContent;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

const botonClear = document.createElement('button', {is: MiBoton})
botonClear.textContent = 'Clear'
document.querySelector('#botones').appendChild(botonClear)
botonClear.addEventListener('click', () => {
    location.reload()
})

const botonOk = document.createElement('button', {is: MiBoton})
botonOk.textContent = 'Ok'
document.querySelector('#footer_table').appendChild(botonOk)

const botonCancel = document.createElement('button', {is: MiBoton})
botonCancel.textContent = 'Cancel'
document.querySelector('#footer_table').appendChild(botonCancel)

fetch('http://dummy.restapiexample.com/api/v1/employees')
.then(response => response.json()) //Formato en el que se quiere la informacion
.then(empleados => {
    //Referencia a la tabla
    let myTable = document.querySelector('.new_table')

    //Recorreomos el objeto JSON para obtener el valor de sus propiedades
    empleados.data.forEach(empleado => {
        //Creamos la etiqueta tr para las filas
        const row = document.createElement('tr');
        //Creamos las etiquetas td para las columnas de la fila creada
        row.innerHTML += `<td class="first">${empleado.id}</td>`
        row.innerHTML += `<td class="second">${empleado.employee_name}</td>`
        row.innerHTML += `<td class="third">${empleado.employee_salary}</td>`
        //Agregamos la fila junto con las celdas
        myTable.appendChild(row)
    });
})

//Función para la búsqueda en la tabla
