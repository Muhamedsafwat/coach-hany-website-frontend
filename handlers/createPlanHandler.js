import axios from "axios";

export const createPlan = (
  data,
  features,
  setIsLoading,
  onClose,
  success,
  error,
  refresh,
  method,
  id
) => {
  setIsLoading(true);
  if (method == "post") {
    axios
      .post(
        "http://localhost:5000/api/plans",
        { ...data, features },
        { withCredentials: true }
      )
      .then((res) => {
        success();
        onClose();
        refresh();
      })
      .catch((err) => {
        error();
      });
  } else {
    axios
      .put(
        `${process.env.API_URL}/api//${id}`,
        { ...data, features },
        { withCredentials: true }
      )
      .then((res) => {
        success();
        onClose();
        refresh();
      })
      .catch((err) => {
        error();
      });
  }
};
