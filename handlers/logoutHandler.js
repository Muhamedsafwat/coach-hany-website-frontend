import axios from "axios";

const logoutHandler = (logout, router) => {
  axios
    .post(`${process.env.API_URL}/api/logout`)
    .then((res) => {
      logout();
      router.push("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default logoutHandler;
