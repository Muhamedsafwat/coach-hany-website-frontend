import axios from "axios";

const deletePlan = (id, refresh, error, sucess) => {
  axios
    .delete(`http://localhost:5000/api/plans/${id}`, { withCredentials: true })
    .then((res) => {
      refresh();
      sucess();
    })
    .catch((err) => {
      error();
    });
};

export default deletePlan;
