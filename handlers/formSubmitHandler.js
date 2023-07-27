const formSubmitHandler = (data, bodyImg, analysisImg) => {
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
    },
  };

  console.log(reqBody);
};

export default formSubmitHandler;
