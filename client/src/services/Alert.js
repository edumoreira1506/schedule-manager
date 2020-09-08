import Swal from 'sweetalert2';

// eslint-disable-next-line import/prefer-default-export
export const error = (errorMessage) => Swal.fire(
  'Ops',
  errorMessage,
  'error',
);
