import axios from "axios";

const deletePlan = (id, refresh, error, sucess) => {
  axios
    .delete(`${process.env.API_URL}/api/plans/${id}`, { withCredentials: true })
    .then((res) => {
      refresh();
      sucess();
    })
    .catch((err) => {
      error();
    });
};

export default deletePlan;
