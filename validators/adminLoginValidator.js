import * as yup from "yup";

const schema = yup.object().shape({
  userName: yup.number().required(),
  password: yup.string().required(),
});

export default schema;
