const url = 'http://localhost/ExamenWebFinal/ajax/prestamos.php';



// document.addEventListener('DOMContentLoaded', () => {
const formulario = document.getElementById('prestamos');

// Agrega un evento de clic al formulario
formulario.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita que el formulario se envíe

    // Determina qué botón se hizo clic
    const botonClicado = e.submitter.id;


    let Id = e.target.validationCustom01.value;
    let IdLibro = e.target.validationCustom02.value;
    let IdUsuario = e.target.validationCustomUsername.value;
    let FechaPrestamo = e.target.validationCustom03.value;
    let FechaDevolucion = e.target.validationCustom04.value;

    let message = '';

    // Validar campos requeridos antes de enviar la solicitud
    if (botonClicado === 'btnInsertar' && (IdLibro === '' || IdUsuario === '' || FechaPrestamo === '' || FechaDevolucion === '')) {
        // Mostrar mensaje de error si algún campo está vacío
        Swal.fire({
            title: 'Error',
            text: 'Todos los campos son obligatorios para la inserción',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
        return; // Detener el flujo si hay campos vacíos
    }

    // Realiza la acción correspondiente según el botón clicado
    switch (botonClicado) {
        case 'btnInsertar':
            // Id = e.target.validationCustom01.value;
            // IdLibro = e.target.validationCustom02.value;
            // IdUsuario = e.target.validationCustomUsername.value;
            // FechaPrestamo = e.target.validationCustom03.value;
            // FechaDevolucion = e.target.validationCustom04.value;
            message = '';
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Id: Id, IdLibro: IdLibro, IdUsuario: IdUsuario, FechaPrestamo: FechaPrestamo, FechaDevolucion: FechaDevolucion }),
            })
                .then((response) => {
                    console.log(response);
                    if (!response.ok) {
                        throw new Error("No se puede completar el registro");
                    }
                    return response.json();
                })
                .then((data) => {
                    message = data.mensaje;
                    console.log(data);
                    e.target.reset();
                    initDataTable(); // Recargar la tabla

                    Swal.fire({
                        title: 'Mensaje',
                        text: message,
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    }).then(() => {
                        initDataTable(); // Recargar la página
                        // location.reload();

                    });
                })
                .catch((error) => {
                    message = error.mensaje;
                    console.log(error);
                    Swal.fire({
                        title: 'Error',
                        text: message,
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    }).then(() => {
                        // location.reload(); // Recargar la página
                    });
                });


            break;

        case 'btnActualizar':

            Id = e.target.validationCustom01.value;
            IdLibro = e.target.validationCustom02.value;
            IdUsuario = e.target.validationCustomUsername.value;
            FechaPrestamo = e.target.validationCustom03.value;
            FechaDevolucion = e.target.validationCustom04.value;


            message = '';
            await fetch(url, {
                method: 'PUT',  // Utiliza el método PUT para operaciones de actualización
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({ Id: Id, IdLibro: IdLibro, IdUsuario: IdUsuario, FechaPrestamo: FechaPrestamo, FechaDevolucion: FechaDevolucion }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("No se puede completar la actualización");
                    }
                    return response.json();
                })
                .then((data) => {
                    message = data.mensaje;
                    console.log(message);
                    e.target.reset();
                    // e.target.reload
                    // initDataTable(); // Recargar la tabla

                    Swal.fire({
                        title: 'Mensaje',
                        text: message,
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    }).then(() => {
                        initDataTable();  // Recargar la página
                        // location.reload();
                        let boton = document.getElementById("btnInsertar");
                        boton.disabled = false;
                        let actualizar = document.getElementById("btnActualizar");
                        actualizar.disabled = true;
                        let borrar = document.getElementById("btnBorrar");
                        borrar.disabled = true;
                    });
                })
                .catch((error) => {
                    console.log(error);
                    message = error.mensaje;
                    Swal.fire({
                        title: 'Error',
                        text: message,
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    }).then(() => {
                        // location.reload(); // Recargar la página
                    });
                });

            break;



        case 'btnLimpiar':
            e.target.validationCustom01.value = '';
            e.target.validationCustom02.value = '';
            e.target.validationCustomUsername.value = '';
            e.target.validationCustom03.value = '';
            e.target.validationCustom04.value = '';

            let insertar = document.getElementById("btnInsertar");
            insertar.disabled = false;
            let borrar = document.getElementById("btnBorrar");
            borrar.disabled = true;
            let actualizar = document.getElementById("btnActualizar");
            actualizar.disabled = true;
            break;

        case 'btnBorrar':
            // Lógica para el botón Borrar
            Id = e.target.validationCustom01.value;
            Swal.fire({
                title: 'Confirmar eliminación',
                text: '¿Estás seguro de que deseas eliminar este elemento?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Confirmar'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Si el usuario hace clic en "Confirmar"
                    message = '';
                    fetch(url, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Id': e.target.validationCustom01.value,
                        },
                        body: JSON.stringify({ Id: Id }),
                    })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("No se puede completar la eliminación");
                        }
                        return response.json();
                    })
                    .then((data) => {
                        message = data.mensaje;
                        console.log(message);
                        e.target.reset();

                        Swal.fire({
                            title: 'Mensaje',
                            text: message,
                            icon: 'success',
                            confirmButtonText: 'Aceptar'
                        }).then(() => {
                            initDataTable(); // Recargar la página
                            let insertar = document.getElementById("btnInsertar");
                            insertar.disabled = false;


                            let actualizar = document.getElementById("btnActualizar");
                            actualizar.disabled = true;

                        });

                    })
                    .catch((Error) => {
                        message = Error.mensaje;
                        Swal.fire({
                            title: 'Error',
                            text: message,
                            icon: 'error',
                            confirmButtonText: 'Aceptar'
                        });
                    });
                }
            });
            break;
        default:
            // Acción por defecto si no se reconoce el botón
            console.log('Acción por defecto');
    }

});
// });




let dataTable;
let dataTableIsInitialized = false;

let dataTableOptions = {
    dom: 'Bfrtilp',
    buttons: [
        {
            extend: 'excelHtml5',
            text: '<i class="fas fa-file-excel"></i> ',
            titleAttr: 'Exportar a Excel',
            className: 'btn btn-success',
        },
        {
            extend: 'pdfHtml5',
            text: '<i class="fas fa-file-pdf"></i> ',
            titleAttr: 'Exportar a PDF',
            className: 'btn btn-danger',
        },
        {
            extend: 'print',
            text: '<i class="fa fa-print"></i> ',
            titleAttr: 'Imprimir',
            className: 'btn btn-info',
        },
    ],
    lengthMenu: [5, 10, 15, 20, 100, 200, 500],
    columnDefs: [
        { className: 'centered', targets: [0, 1, 2, 3, 4, 5] },
        { orderable: false, targets: [4] },
        { searchable: false, targets: [1] },
        // { width: '60%', targets: [0,1, 2, 3,4] },
    ],
    pageLength: 3,
    destroy: true,
    language: {
        processing: 'Procesando...',
        lengthMenu: 'Mostrar _MENU_ registros',
        zeroRecords: 'No se encontraron resultados',
        emptyTable: 'Ningún dato disponible en esta tabla',
        infoEmpty: 'Mostrando registros del 0 al 0 de un total de 0 registros',
        infoFiltered: '(filtrado de un total de _MAX_ registros)',
        search: 'Buscar:',
        infoThousands: ',',
        loadingRecords: 'Cargando...',
        paginate: {
            first: 'Primero',
            last: 'Último',
            next: 'Siguiente',
            previous: 'Anterior',
        },
        // aria: {
        //   sortAscending: ': Activar para ordenar la columna de manera ascendente',
        //   sortDescending: ': Activar para ordenar la columna de manera descendente',
        // },
        // buttons: {
        //   copy: 'Copiar',
        //   colvis: 'Visibilidad',
        //   collection: 'Colección',
        //   colvisRestore: 'Restaurar visibilidad',
        //   copyKeys:
        //     'Presione ctrl o u2318 + C para copiar los datos de la tabla al portapapeles del sistema. <br /> <br /> Para cancelar, haga clic en este mensaje o presione escape.',
        //   copySuccess: {
        //     1: 'Copiada 1 fila al portapapeles',
        //     _: 'Copiadas %ds fila al portapapeles',
        //   },
        //   copyTitle: 'Copiar al portapapeles',
        //   csv: 'CSV',
        //   excel: 'Excel',
        //   pageLength: {
        //     '-1': 'Mostrar todas las filas',
        //     _: 'Mostrar %d filas',
        //   },
        //   pdf: 'PDF',
        //   print: 'Imprimir',
        //   renameState: 'Cambiar nombre',
        //   updateState: 'Actualizar',
        //   createState: 'Crear Estado',
        //   removeAllStates: 'Remover Estados',
        //   removeState: 'Remover',
        //   savedStates: 'Estados Guardados',
        //   stateRestore: 'Estado %d',
        // },
        // autoFill: {
        //   cancel: 'Cancelar',
        //   fill: 'Rellene todas las celdas con <i>%d</i>',
        //   fillHorizontal: 'Rellenar celdas horizontalmente',
        //   fillVertical: 'Rellenar celdas verticalmentemente',
        // },
        decimal: ',',
        searchBuilder: {
            add: 'Añadir condición',
            button: {
                0: 'Constructor de búsqueda',
                _: 'Constructor de búsqueda (%d)',
            },
            clearAll: 'Borrar todo',
            condition: 'Condición',
            conditions: {
                date: {
                    after: 'Despues',
                    before: 'Antes',
                    between: 'Entre',
                    empty: 'Vacío',
                    equals: 'Igual a',
                    notBetween: 'No entre',
                    notEmpty: 'No Vacio',
                    not: 'Diferente de',
                },
                number: {
                    between: 'Entre',
                    empty: 'Vacio',
                    equals: 'Igual a',
                    gt: 'Mayor a',
                    gte: 'Mayor o igual a',
                    lt: 'Menor que',
                    lte: 'Menor o igual que',
                    notBetween: 'No entre',
                    notEmpty: 'No vacío',
                    not: 'Diferente de',
                },
                string: {
                    contains: 'Contiene',
                    empty: 'Vacío',
                    endsWith: 'Termina en',
                    equals: 'Igual a',
                    notEmpty: 'No Vacio',
                    startsWith: 'Empieza con',
                    not: 'Diferente de',
                    notContains: 'No Contiene',
                    notStartsWith: 'No empieza con',
                    notEndsWith: 'No termina con',
                },
                array: {
                    not: 'Diferente de',
                    equals: 'Igual',
                    empty: 'Vacío',
                    contains: 'Contiene',
                    notEmpty: 'No Vacío',
                    without: 'Sin',
                },
            },
            data: 'Data',
            deleteTitle: 'Eliminar regla de filtrado',
            leftTitle: 'Criterios anulados',
            logicAnd: 'Y',
            logicOr: 'O',
            rightTitle: 'Criterios de sangría',
            title: {
                0: 'Constructor de búsqueda',
                _: 'Constructor de búsqueda (%d)',
            },
            value: 'Valor',
        },
        searchPanes: {
            clearMessage: 'Borrar todo',
            collapse: {
                0: 'Paneles de búsqueda',
                _: 'Paneles de búsqueda (%d)',
            },
            count: '{total}',
            countFiltered: '{shown} ({total})',
            emptyPanes: 'Sin paneles de búsqueda',
            loadMessage: 'Cargando paneles de búsqueda',
            title: 'Filtros Activos - %d',
            showMessage: 'Mostrar Todo',
            collapseMessage: 'Colapsar Todo',
        },
        select: {
            cells: {
                1: '1 celda seleccionada',
                _: '%d celdas seleccionadas',
            },
            columns: {
                1: '1 columna seleccionada',
                _: '%d columnas seleccionadas',
            },
            rows: {
                1: '1 fila seleccionada',
                _: '%d filas seleccionadas',
            },
        },
        thousands: '.',
        datetime: {
            previous: 'Anterior',
            next: 'Proximo',
            hours: 'Horas',
            minutes: 'Minutos',
            seconds: 'Segundos',
            unknown: '-',
            amPm: ['AM', 'PM'],
            months: {
                0: 'Enero',
                1: 'Febrero',
                10: 'Noviembre',
                11: 'Diciembre',
                2: 'Marzo',
                3: 'Abril',
                4: 'Mayo',
                5: 'Junio',
                6: 'Julio',
                7: 'Agosto',
                8: 'Septiembre',
                9: 'Octubre',
            },
            weekdays: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
        },
        editor: {
            close: 'Cerrar',
            create: {
                button: 'Nuevo',
                title: 'Crear Nuevo Registro',
                submit: 'Crear',
            },
            edit: {
                button: 'Editar',
                title: 'Editar Registro',
                submit: 'Actualizar',
            },
            remove: {
                button: 'Eliminar',
                title: 'Eliminar Registro',
                submit: 'Eliminar',
                confirm: {
                    _: '¿Está seguro que desea eliminar %d filas?',
                    1: '¿Está seguro que desea eliminar 1 fila?',
                },
            },
            error: {
                system:
                    'Ha ocurrido un error en el sistema (<a target="\\" rel="\\ nofollow" href="\\">Más información&lt;\\/a&gt;).</a>',
            },
            multi: {
                title: 'Múltiples Valores',
                info: 'Los elementos seleccionados contienen diferentes valores para este registro. Para editar y establecer todos los elementos de este registro con el mismo valor, hacer click o tap aquí, de lo contrario conservarán sus valores individuales.',
                restore: 'Deshacer Cambios',
                noMulti:
                    'Este registro puede ser editado individualmente, pero no como parte de un grupo.',
            },
        },
        info: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
        stateRestore: {
            creationModal: {
                button: 'Crear',
                name: 'Nombre:',
                order: 'Clasificación',
                paging: 'Paginación',
                search: 'Busqueda',
                select: 'Seleccionar',
                columns: {
                    search: 'Búsqueda de Columna',
                    visible: 'Visibilidad de Columna',
                },
                title: 'Crear Nuevo Estado',
                toggleLabel: 'Incluir:',
            },
            emptyError: 'El nombre no puede estar vacio',
            removeConfirm: '¿Seguro que quiere eliminar este %s?',
            removeError: 'Error al eliminar el registro',
            removeJoiner: 'y',
            removeSubmit: 'Eliminar',
            renameButton: 'Cambiar Nombre',
            renameLabel: 'Nuevo nombre para %s',
            duplicateError: 'Ya existe un Estado con este nombre.',
            emptyStates: 'No hay Estados guardados',
            removeTitle: 'Remover Estado',
            renameTitle: 'Cambiar Nombre Estado',
        },
    },
};

const initDataTable = async () => {
    if (dataTableIsInitialized) {
        dataTable.clear().destroy();
    }

    await listPrest();

    dataTable = $('#example').DataTable(dataTableOptions);
    dataTable.rows.add(dataTable).draw();
    dataTableIsInitialized = true;
};

const listPrest = async () => {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json', // Puedes ajustar los encabezados según sea necesario
              // Otros encabezados si es necesario
            },
            // Puedes incluir más opciones, como body para enviar datos en la solicitud
          });
        const presta = await response.json();
        if (presta.mensaje === 'No hay registros') {
            throw new Error("¡Error! No hay registros.");
        }else{
            console.log(presta);
            let content = ``;
            presta.forEach((prestamo, index) => {
                console.log(prestamo.Id);
                content += `
                    <tr>
                    <td> ${index + 1} </td>
                        <th>${prestamo.Id}</th>
                        <th>${prestamo.IdLibro}</th>
                        <th>${prestamo.IdUsuario}</th>
                        <th>${prestamo.FechaPrestamo}</th>
                        <th>${prestamo.FechaDevolucion}</th>
                    </tr>`;
            });
            table_prestamo.innerHTML = content;
            $Select = true;  
        }
    } catch (error) {
        console.log(error.message);
        return;
    }
    $(document).ready(() => {
        // Obtener la tabla
        const table = document.getElementById('example').getElementsByTagName('tbody')[0];
        // Manejar el clic en una fila
        table.addEventListener('click', (event) => {
            const target = event.target.closest('tr');
            if (target) {
                if (target.classList.contains('selected')) {

                    target.classList.remove('selected');
                } else {
                    // Desmarcar la fila seleccionada previamente
                    const selectedRow = table.querySelector('tr.selected');
                    if (selectedRow) {
                        selectedRow.classList.remove('selected');
                    }

                    // Marcar la fila actual como seleccionada
                    target.classList.add('selected');

                    // Obtener los datos de la fila seleccionada
                    const rowData = Array.from(target.cells).map(cell => cell.textContent);
                    console.log(rowData);

                    // Asignar los datos a los input en tu formulario
                    document.getElementById('validationCustom01').value = rowData[1]; // Reemplaza con el índice correcto de tu columna
                    document.getElementById('validationCustom02').value = rowData[2];
                    document.getElementById('validationCustomUsername').value = rowData[3];
                    document.getElementById('validationCustom03').value = rowData[4];
                    document.getElementById('validationCustom04').value = rowData[5];


                    let insertar = document.getElementById("btnInsertar");
                    let borrar = document.getElementById("btnBorrar");
                    let actualizar = document.getElementById("btnActualizar");
                    insertar.disabled = true;
                    borrar.disabled = false;
                    actualizar.disabled = false;

                }
            }
        });

    });
    // Utilizar requestAnimationFrame para operaciones después de la actualización de la interfaz de usuario
};

window.addEventListener('load', async () => {
    await initDataTable();

    let insertar = document.getElementById("btnInsertar");
    let borrar = document.getElementById("btnBorrar");
    let actualizar = document.getElementById("btnActualizar");
    insertar.disabled = false;
    borrar.disabled = true;
    actualizar.disabled = true;

    // requestAnimationFrame(() => {
    //   dataTable = $('#example').DataTable(dataTableOptions);
    //   dataTableIsInitialized = true;
    // });
});

// // Evento de clic para el botón
// document.getElementById('home-tab').addEventListener('click',async () => {
//   await initDataTable();
//   requestAnimationFrame(() => {
//           dataTable = $('#example').DataTable(dataTableOptions);
//           dataTableIsInitialized = true;
//       });

// });
//############################### VALIDACIONES DEL FORMULARIO ############################################

(() => {
    'use strict'

    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
})()


