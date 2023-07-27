import * as yup from "yup";

const schema = yup.object().shape({
  code: yup.number().required(),
  password: yup.string().required(),
});

export default schema;
