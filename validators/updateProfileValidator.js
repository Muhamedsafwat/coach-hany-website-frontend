import * as yup from "yup";

const schema = yup.object().shape({
  weight: yup.number().required(),
  neck: yup.number().required(),
  chest: yup.number().required(),
  arm: yup.number().required(),
  waist: yup.number().required(),
  hip: yup.number().required(),
  thigh: yup.number().required(),
});

export default schema;
