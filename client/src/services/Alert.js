import Swal from 'sweetalert2';

export const error = (errorMessage) => Swal.fire(
  'Ops',
  errorMessage,
  'error',
);

export const success = (successMessage) => Swal.fire(
  'Boa',
  successMessage,
  'success',
);
