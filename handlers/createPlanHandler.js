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
        `${process.env.API_URL}/api/plans`,
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
        `${process.env.API_URL}/api/plans/${id}`,
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
