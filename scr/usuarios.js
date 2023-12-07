const mostrarDatos11 = 'https://localhost/SistemaBiblioteca/ajax/usuarios.php?op=listar';
const mostrarPorID11 = 'https://localhost/SistemaBiblioteca/ajax/usuarios.php?op=listarId';
const insertar11 = 'https://localhost/SistemaBiblioteca/ajax/usuarios.php?op=insertar';
const actualizar11= 'https://localhost/SistemaBiblioteca/ajax/usuarios.php?op=actualizar';
const borrar11 = 'https://localhost/SistemaBiblioteca/ajax/usuarios.php?op=eliminar';



document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('usuario');

    // Agrega un evento de clic al formulario
    formulario.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita que el formulario se envíe

        // Determina qué botón se hizo clic
        const botonClicado = e.submitter.id;


        let Id = e.target.validationCustom0111.value;
        let Nombre = e.target.validationCustom0222.value;
        let Apellido = e.target.validationCustomUsername11.value;
        let Direccion = e.target.validationCustom0333.value;
        let NumeroTelefono = e.target.validationCustom0444.value;
        let Email = e.target.validationCustom0555.value;

        let message = '';

         // Validar campos requeridos antes de enviar la solicitud
    if (botonClicado === 'btnInsertar11' && (Id === '' || Nombre === '' || Apellido === '' || Direccion === '' || NumeroTelefono === '' || Email === '')) {
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



            case 'btnInsertar11':


                console.log(Nombre);
                message = '';
                await fetch(insertar11, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ Id: Id, Nombre: Nombre, Apellido: Apellido, Direccion: Direccion, NumeroTelefono: NumeroTelefono, Email: Email}),
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
                        initDataTable11(); // Recargar la tabla

                        Swal.fire({
                            title: 'Mensaje',
                            text: message,
                            icon: 'success',
                            confirmButtonText: 'Aceptar'
                        }).then(() => {
                            initDataTable11(); // Recargar la página
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
            case 'btnActualizar11':

            Id = e.target.validationCustom0111.value;
            Nombre = e.target.validationCustom0222.value;
            Apellido = e.target.validationCustomUsername11.value;
            Direccion = e.target.validationCustom0333.value;
            NumeroTelefono = e.target.validationCustom0444.value;
            Email = e.target.validationCustom0555.value;


                message = '';
                await fetch(actualizar11, {
                    method: 'PUT',  // Utiliza el método PUT para operaciones de actualización
                    headers: {
                        'Content-Type': 'application/json',
                    },

                    body: JSON.stringify({ Id: Id, Nombre: Nombre, Apellido: Apellido, Direccion: Direccion, NumeroTelefono: NumeroTelefono, Email: Email }),
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
                            initDataTable11();  // Recargar la página
                            // location.reload();
                            let boton = document.getElementById("btnInsertar11");
                            boton.disabled = false;

                            let actualizar = document.getElementById("btnActualizar11");
                            actualizar.disabled = true;

                            let borrar = document.getElementById("btnBorrar11");
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
            case 'btnLimpiar11':


                e.target.validationCustom0111.value = '';
                e.target.validationCustom0222.value = '';
                e.target.validationCustomUsername11.value = '';
                e.target.validationCustom0333.value = '';
                e.target.validationCustom0444.value = '';
                e.target.validationCustom0555.value = '';

                let insertar = document.getElementById("btnInsertar11");
                let borrar = document.getElementById("btnBorrar11");
                let actualizar = document.getElementById("btnActualizar11");
                insertar.disabled = false;
                borrar.disabled = true;
                actualizar.disabled = true;


                break;
            case 'btnBorrar11':
                // Lógica para el botón Borrar
                Id = e.target.validationCustom0111.value;

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
                        fetch(borrar11, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
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
                                    initDataTable11(); // Recargar la página
                                    let insertar = document.getElementById("btnInsertar11");
                                    let borrar = document.getElementById("btnBorrar11");
                                    let actualizar = document.getElementById("btnActualizar11");
                                    insertar.disabled = false;
                                    borrar.disabled = true;
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
});




let dataTable11;
let dataTableIsInitialized11 = false;

let dataTableOptions11 = {
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

const initDataTable11= async () => {
    if (dataTableIsInitialized11) {
        dataTable11.clear().destroy();
    }

    await listUsuario();

    dataTable11 = $('#example11').DataTable(dataTableOptions11);

    dataTableIsInitialized11 = true;
};

const listUsuario = async () => {
    try {
        const response = await fetch(mostrarDatos11);
        const usuarios = await response.json();
        console.log(usuarios);

        let content = ``;
        usuarios.forEach((usuario, index) => {
            console.log(usuario.Nombre);
            content += `
                <tr>
                 <td> ${index + 1} </td>
                    <th>${usuario.Id}</th>
                    <th>${usuario.Nombre}</th>
                    <th>${usuario.Apellido}</th>
                    <th>${usuario.Direccion}</th>
                    <th>${usuario.NumeroTelefono}</th>
                    <th>${usuario.Email}</th>
                </tr>`;
        });
        table_usuario.innerHTML = content;
    } catch (error) {
        console.log(error);
    }
    $(document).ready(() => {

        // Obtener la tabla
        const table = document.getElementById('example11').getElementsByTagName('tbody')[0];

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
                    document.getElementById('validationCustom0111').value = rowData[1]; // Reemplaza con el índice correcto de tu columna
                    document.getElementById('validationCustom0222').value = rowData[2];
                    document.getElementById('validationCustomUsername11').value = rowData[3];
                    document.getElementById('validationCustom0333').value = rowData[4];
                    document.getElementById('validationCustom0444').value = rowData[5];
                    document.getElementById('validationCustom0555').value = rowData[6];

                    let insertar = document.getElementById("btnInsertar11");
                    let borrar = document.getElementById("btnBorrar11");
                    let actualizar = document.getElementById("btnActualizar11");
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
    await initDataTable11();
    let insertar = document.getElementById("btnInsertar11");
    let borrar = document.getElementById("btnBorrar11");
    let actualizar = document.getElementById("btnActualizar11");
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


