import axios from "axios";

const logoutHandler = (setIsLoading, logout, router) => {
  setIsLoading(true);
  axios
    .post("http://localhost:5000/api/logout")
    .then((res) => {
      logout();
      router.push("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default logoutHandler;
