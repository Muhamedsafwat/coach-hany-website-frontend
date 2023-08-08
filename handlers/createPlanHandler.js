import axios from "axios";

export const createPlan = (
  data,
  features,
  setIsLoading,
  onClose,
  success,
  error,
  refresh
) => {
  setIsLoading(true);
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
};
