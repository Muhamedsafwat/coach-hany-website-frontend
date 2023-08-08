import * as yup from "yup";

const schema = yup.object().shape({
  duration: yup.string().required(),
  price: yup.string().required(),
  insteadOf: yup.string().required(),
});

export default schema;
