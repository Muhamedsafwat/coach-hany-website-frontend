import axios from "axios";

const loginHandler = async (data) => {
  axios
    .post("http://localhost:5000/api/users/auth", data)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
};

export default loginHandler;
