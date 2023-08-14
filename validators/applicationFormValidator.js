import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required(),
  phone: yup.string().length(11).required(),
  code: yup.number().required(),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required(),
  height: yup.number().required().min(100).max(220),
  weight: yup.number().required(),
  age: yup.number().required(),
  neck: yup.number().required(),
  chest: yup.number().required(),
  arm: yup.number().required(),
  waist: yup.number().required(),
  hip: yup.number().required(),
  thigh: yup.number().required(),
  preferredFood: yup.string().required(),
  unpreferredFood: yup.string().required(),
});

export default schema;
