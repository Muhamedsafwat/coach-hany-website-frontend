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
  //create date for the new measurement
  let objectDate = new Date();

  let day = objectDate.getDate();
  let month = objectDate.getMonth() + 1;
  const date = `${day}/${month}`;

  const newMeasurements = { ...data, date };

  setIsLoading(true);
  const measurements = [...currentMeasurements, newMeasurements];
  axios
    .put(
      `${process.env.API_URL}/api/users/${_id}`,
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
