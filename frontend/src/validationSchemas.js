import * as yup from 'yup';

export const userSchema = yup.object().shape({
  name: yup.string().required('Name is required').max(255),
  age: yup.number().required('Age is required').integer('Age must be an integer'),
});
