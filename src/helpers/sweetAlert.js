import Swal from 'sweetalert2';

export function dispararSweetBasico(titulo, text, icon, textoBoton) {
  Swal.fire({
    title: titulo,
    text: text,
    icon: icon,
    confirmButtonText: textoBoton
  });
}

export function dispararConfirmacion(mensaje = "¿Estás segura?") {
  return Swal.fire({
    title: mensaje,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, confirmar",
    cancelButtonText: "Cancelar",
  }).then((result) => result.isConfirmed);
}
