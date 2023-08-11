import axios from "axios";

const formSubmitHandler = (
  data,
  bodyImg,
  analysisImg,
  setIsLoading,
  sucess,
  error
) => {
  setIsLoading(true);

  //create date for the new measurement
  let objectDate = new Date();

  let day = objectDate.getDate();
  let month = objectDate.getMonth() + 1;
  const date = `${day}/${month}`;

  //create request body object
  const reqBody = {
    name: data.name,
    phone: data.phone,
    code: data.code,
    password: data.password,
    age: data.age,
    height: data.height,
    target: data.target,
    activityRate: data.activityRate,
    preferredFood: data.preferredFood,
    unpreferredFood: data.unpreferredFood,
    duration: data.duration,
    notes: data.notes || null,
    analysis: analysisImg,
    photo: bodyImg,
    measurements: {
      weight: data.weight,
      neck: data.neck,
      chest: data.chest,
      arm: data.arm,
      waist: data.waist,
      hip: data.hip,
      thigh: data.thigh,
      date,
    },
    weightMethod: data.weightMethod,
  };

  axios
    .post(`${process.env.API_URL}/api/applications`, reqBody)
    .then((res) => {
      sucess();
      setIsLoading(false);
      console.log(res);
    })
    .catch((err) => {
      error();
      setIsLoading(false);
      console.log(err);
    });
};

export default formSubmitHandler;
