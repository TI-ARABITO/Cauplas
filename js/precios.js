$(document).ready(function() {
    // Inicializar el DataTable
    var table = $('#example').DataTable();
    var rowCount = table.data().count(); // Contar el número de filas inicial
    var editingRow = null; // Variable para rastrear la fila que se está editando

    function calculateDiscountedPrice(precioFCA, precioVenta, descuento) {
        return precioVenta - (precioVenta * (descuento / 100));
    }

    // Evento para agregar fila
    $('#addRow').on('click', function() {
        $('#myModal').find('.modal-body').html(`
            <form id="addForm">
                <div class="form-group">
                    <label>CAUPLAS</label>
                    <input type="text" class="form-control" name="cauplas" required>
                </div>
                <div class="form-group">
                    <label>TORFLEX</label>
                    <input type="text" class="form-control" name="torflex" required>
                </div>
                <div class="form-group">
                    <label>INDOMAX</label>
                    <input type="text" class="form-control" name="indomax" required>
                </div>
                <div class="form-group">
                    <label>OE</label>
                    <input type="text" class="form-control" name="oe" required>
                </div>
                <div class="form-group">
                    <label>DESCRIPCION</label>
                    <input type="text" class="form-control" name="descripcion" required>
                </div>
                <div class="form-group">
                    <label>PRECIO FCA</label>
                    <input type="number" class="form-control" name="precio_fca" required>
                </div>
                <div class="form-group">
                    <label>PRECIO VENTA</label>
                    <input type="number" class="form-control" name="precio_venta" required>
                </div>
                <div class="form-group">
                    <label>DESCUENTO %</label>
                    <input type="number" class="form-control" name="descuento" required>
                </div>
                <div class="form-group">
                    <label>ESTATUS</label>
                    <input type="text" class="form-control" name="estatus" required>
                </div>
            </form>
        `);
        $('#myModal').modal('show');

        $('#myModal').off('click', '.modal-footer .btn-primary'); // Limpiar cualquier evento anterior
        $('#myModal').on('click', '.modal-footer .btn-primary', function() {
            var formData = $('#addForm').serializeArray();
            var newData = formData.map(item => item.value);
            var precioFCA = newData[5]; // Precio FCA
            var precioVenta = newData[6]; // Precio Venta
            var descuento = newData[7]; // Descuento 

            var precioConDescuento = calculateDiscountedPrice(precioFCA, precioVenta, descuento);
            rowCount++; // Incrementar el contador de filas
            
            // Agregar nueva fila
            table.row.add([rowCount]
                .concat(newData)
                .concat(precioConDescuento)
                .concat(`<button type="button" class="btn btn-primary btn-xs dt-edit">Edit</button>
                          <button type="button" class="btn btn-danger btn-xs dt-delete">Delete</button>`)).draw(false);
            $('#myModal').modal('hide'); // Ocultar el modal después de agregar la fila
        });
    });

    // Evento para editar fila
    $('#example tbody').on('click', '.dt-edit', function() {
        const row = $(this).closest('tr'); // Obtener la fila actual
        const rowData = table.row(row).data(); // Obtener datos de la fila actual
        editingRow = row; // Guardar la fila en edición

        $('#myModal').find('.modal-body').html(`
            <form id="editForm">
                <div class="form-group">
                    <label>CAUPLAS</label>
                    <input type="text" class="form-control" name="cauplas" value="${rowData[1]}" required>
                </div>
                <div class="form-group">
                    <label>TORFLEX</label>
                    <input type="text" class="form-control" name="torflex" value="${rowData[2]}" required>
                </div>
                <div class="form-group">
                    <label>INDOMAX</label>
                    <input type="text" class="form-control" name="indomax" value="${rowData[3]}" required>
                </div>
                <div class="form-group">
                    <label>OE</label>
                    <input type="text" class="form-control" name="oe" value="${rowData[4]}" required>
                </div>
                <div class="form-group">
                    <label>DESCRIPCION</label>
                    <input type="text" class="form-control" name="descripcion" value="${rowData[5]}" required>
                </div>
                <div class="form-group">
                    <label>PRECIO FCA</label>
                    <input type="number" class="form-control" name="precio_fca" value="${rowData[6]}" required>
                </div>
                <div class="form-group">
                    <label>PRECIO VENTA</label>
                    <input type="number" class="form-control" name="precio_venta" value="${rowData[7]}" required>
                </div>
                <div class="form-group">
                    <label>DESCUENTO %</label>
                    <input type="number" class="form-control" name="descuento" value="${rowData[8]}" required>
                </div>
                <div class="form-group">
                    <label>ESTATUS</label>
                    <input type="text" class="form-control" name="estatus" value="${rowData[9]}" required>
                </div>
            </form>
        `);
        $('#myModal').modal('show');

        $('#myModal').off('click', '.modal-footer .btn-primary'); // Limpiar cualquier evento anterior
        $('#myModal').on('click', '.modal-footer .btn-primary', function() {
            var formData = $('#editForm').serializeArray();
            var updatedData = formData.map(item => item.value); // Obtener datos actualizados
            updatedData.unshift(rowData[0]); // Mantener el índice de la fila
            
            // Calcular el precio con descuento
            var precioConDescuento = calculateDiscountedPrice(updatedData[6], updatedData[7], updatedData[8]);
            
            // Actualizar la fila
            table.row(editingRow).data(updatedData.concat(precioConDescuento)
                .concat(`<button type="button" class="btn btn-primary btn-xs dt-edit">Edit</button>
                          <button type="button" class="btn btn-danger btn-xs dt-delete">Delete</button>`)).draw(false);
            $('#myModal').modal('hide'); // Ocultar el modal después de editar la fila
            editingRow = null; // Limpiar la fila en edición
        });
    });

    // Evento para eliminar fila
    $('#example tbody').on('click', '.dt-delete', function() {
        table.row($(this).closest('tr')).remove().draw(false); // Eliminar la fila seleccionada
    });

    // Evento para exportar a Excel
    $('#exportExcel').on('click', function() {
        table.button('.buttons-excel').trigger();
    });

    // Evento para exportar a PDF
    $('#exportPdf').on('click', function() {
        table.button('.buttons-pdf').trigger();
    });

    // Evento para imprimir la tabla
    $('#printTable').on('click', function() {
        table.button('.buttons-print').trigger();
    });

    // Agregar DataTable buttons
    $.extend(true, $.fn.dataTable.Buttons.defaults.dom.button, {
        className: 'btn btn-default'
    });

    // Configuración de DataTable
    $('#example').DataTable({
        "paging": true,         
        "lengthChange": true,   
        "pageLength": 10,       
        "info": false,          
        "language": {
            "lengthMenu": "Mostrar _MENU_ filas",
            "zeroRecords": "No se encontraron resultados",
            "infoEmpty": "Sin registros disponibles",
            "infoFiltered": "(filtrado de _MAX_ registros totales)",
            "search": "Buscar:",
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });
});
