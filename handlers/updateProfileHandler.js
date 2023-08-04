import axios from "axios";

const updateProfileHandler = (
  currentMeasurements,
  data,
  setIsLoading,
  onclose,
  success,
  error,
  _id,
  refresh
) => {
  setIsLoading(true);
  const measurements = [...currentMeasurements, data];
  axios
    .put(
      `http://localhost:5000/api/users/${_id}`,
      { measurements },
      { withCredentials: true }
    )
    .then((res) => {
      success();
      onclose();
      refresh();
    })
    .catch((err) => {
      error();
    });
};

export default updateProfileHandler;
