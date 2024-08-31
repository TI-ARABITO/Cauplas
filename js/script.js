// script.js

document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.querySelector('.dt-add');
    const editButtons = document.querySelectorAll('.dt-edit');
    const deleteButtons = document.querySelectorAll('.dt-delete');

    // Función para agregar una nueva fila
    addButton.addEventListener('click', function() {
        const tableBody = document.querySelector('#example tbody');
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>Nuevo IT</td>
            <td>Nuevo CAUPLAS</td>
            <td>Nuevo TORFLEX</td>
            <td>Nuevo INDOMAX</td>
            <td>Nueva DESCRIPCION</td>
            <td>Nueva ESTATUS</td>
            <td>Nueva FOTO B</td>
            <td>Nueva FOTO C</td>
            <td>Nueva Amount</td>
            <td>
                <button type="button" class="btn btn-primary btn-xs dt-edit">Edit</button>
                <button type="button" class="btn btn-danger btn-xs dt-delete">Delete</button>
            </td>
        `;
        tableBody.appendChild(newRow);
    });

    // Funciones para editar y eliminar filas
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Aquí deberías abrir el modal y llenar los detalles de la fila
            $('#myModal').modal('show');
        });
    });

    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = button.closest('tr'); // Obtener la fila correspondiente
            if (confirm('¿Está seguro de que desea eliminar esta fila?')) {
                row.remove(); // Eliminar la fila de la tabla
            }
        });
    });
});
