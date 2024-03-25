import InputFieldsProps from "~/interfaces/props/InputFieldsProps";

const AuthInputFields = [
  { id: 'username', label: 'Name', type: 'text', showOnRegister: true },
  { id: 'email', label: 'Email address', type: 'email' },
  { id: 'password', label: 'Password', type: 'password' }
];

export const AuthDefaultValues = {
  name: '',
  email: '',
  password: ''
}

export default AuthInputFields;
