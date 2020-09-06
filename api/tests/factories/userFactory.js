export default (overrideProps) => ({
  id: 5,
  name: 'Eduardo Moreira',
  email: 'fake@email.com',
  password: 'Password10#',
  isAdmin: true,
  confirmPassword: 'Password10#',
  ...overrideProps
});
