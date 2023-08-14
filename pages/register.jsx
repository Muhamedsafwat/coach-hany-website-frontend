import React, { useState } from "react";
import {
  Stack,
  Heading,
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  FormErrorMessage,
  Radio,
  RadioGroup,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";

import { useRouter } from "next/router";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import applicationFormValidator from "../validators/applicationFormValidator";
import formSubmitHandler from "../handlers/formSubmitHandler";

const Register = () => {
  const router = useRouter("/");
  //loading state
  const [isLoading, setIsLoading] = useState(false);

  //convert images to base64
  const [bodyImg, setBodyImg] = useState("");
  const [analysisImg, setAnalysisImg] = useState("");

  const onPhotoChange = (file) => {
    const photoReader = new FileReader();
    photoReader.onloadend = (e) => {
      setBodyImg(photoReader.result);
    };
    photoReader.readAsDataURL(file);
  };

  const onAnalysisChange = (file) => {
    const photoReader = new FileReader();
    photoReader.onloadend = (e) => {
      setAnalysisImg(photoReader.result);
    };
    photoReader.readAsDataURL(file);
  };

  //form validation
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(applicationFormValidator),
  });

  //feedback
  const toast = useToast();

  const success = () => {
    toast({
      title: "Form submitted succesfully",
      description: "Thank you for registering",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const error = () => {
    toast({
      title: "Network error",
      description: "please check your internet connection",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };

  //form submit handler
  const onSubmit = (data) => {
    if (!bodyImg) {
      toast({
        title: "No photo provided",
        description: "please provide a recent body photo",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      formSubmitHandler(
        data,
        bodyImg,
        analysisImg,
        setIsLoading,
        success,
        error
      );
      router.push("/");
    }
  };

  return (
    <Stack pt="9rem" pb="4rem">
      <Box
        position="fixed"
        top="0"
        left="0"
        w="100vw"
        h="100vh"
        boxSizing="border-box"
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        bg="url('/hero-2.jpg')"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack margin="auto" w="90vw" maxWidth="700px" align="center">
          <Heading zIndex={2} size="lg">
            Join us and become the next hero!
          </Heading>
          <StyledFormControl error={errors.name} label="الاسم ثلاثي">
            <Input variant="flushed" type="text" {...register("name")} />
            {errors.name && <FormErrorMessage>Required field</FormErrorMessage>}
          </StyledFormControl>
          <StyledFormControl error={errors.name} label="رقم الموبايل / واتساب">
            <Input variant="flushed" type="tel" {...register("phone")} />
            {errors.phone && (
              <FormErrorMessage>Required field</FormErrorMessage>
            )}
          </StyledFormControl>
          <StyledFormControl error={errors.code} label="الكود">
            <Input variant="flushed" type="number" {...register("code")} />
            {errors.code && <FormErrorMessage>Required field</FormErrorMessage>}
          </StyledFormControl>
          <StyledFormControl error={errors.password} label="كلمة المرور">
            <Input variant="flushed" type="text" {...register("password")} />
            {errors.password && (
              <FormErrorMessage>Required field</FormErrorMessage>
            )}
          </StyledFormControl>
          <StyledFormControl error={errors.height} label="الطول">
            <Input
              variant="flushed"
              step="0.01"
              type="number"
              {...register("height")}
            />
            {errors.height && (
              <FormErrorMessage>Required field</FormErrorMessage>
            )}
          </StyledFormControl>
          <StyledFormControl error={errors.weight} label="الوزن الحالي">
            <Input
              variant="flushed"
              step="0.01"
              type="number"
              {...register("weight")}
            />
            {errors.weight && (
              <FormErrorMessage>Required field</FormErrorMessage>
            )}
          </StyledFormControl>
          <StyledFormControl error={errors.age} label="العمر">
            <Input
              variant="flushed"
              step="0.01"
              type="number"
              {...register("age")}
            />
            {errors.age && <FormErrorMessage>Required field</FormErrorMessage>}
          </StyledFormControl>
          <StyledFormControl label="للهدف من الدايت">
            <Controller
              name="target"
              control={control}
              render={({ field: { onChange, value } }) => (
                <RadioGroup onChange={onChange} value={value} ref={register()}>
                  <Stack>
                    <Radio value="تقليل الوزن">تقلل وزنك (تخس بشكل صحي)</Radio>
                    <Radio value="زيادة الوزن">
                      تزود وزنك ( التغلب ع النحافة)
                    </Radio>
                    <Radio value="المحافظة علي الوزن">
                      تحافظ على وزنك مع تظبيط شكل جسمك
                    </Radio>
                    <Radio value="لاعب رياضي">
                      لاعب رياضي ( يمارس اى لعبة رياضية)
                    </Radio>
                    <Radio value="مريض ضغط">
                      مريض ضغط ( هدفه تظبيط الضغط مع تحسن صحته)
                    </Radio>
                    <Radio value="مريض سكر">
                      مريض سكر ( تظبيط الاكل مع الجرعات لتجنب حدوث غيبوبة سكر +
                      تحسن الصحة العامة وممارسة رياضة)
                    </Radio>
                    <Radio value="مريض غدة درقية">
                      مريض غدة درقية ( سواء نشطة أو خاملة )
                    </Radio>
                    <Radio value="حالة pco">حالات الpco</Radio>
                  </Stack>
                </RadioGroup>
              )}
            />
          </StyledFormControl>
          <Stack w="100%" align="flex-start">
            <StyledFormControl label={"مقاسات الجسم كما موضح بالصورة"}>
              <Box mb="2rem" h="300px">
                <img
                  style={{ height: "100%", margin: "auto" }}
                  src="/body.jpg"
                  alt="body"
                />
              </Box>
              <SimpleGrid columns={2} columnGap={12} rowGap={5}>
                <Input
                  step="0.01"
                  isInvalid={errors.neck}
                  placeholder="neck"
                  variant="flushed"
                  type="number"
                  {...register("neck")}
                />
                <Input
                  step="0.01"
                  isInvalid={errors.chest}
                  placeholder="chest"
                  variant="flushed"
                  type="number"
                  {...register("chest")}
                />
                <Input
                  step="0.01"
                  isInvalid={errors.arm}
                  placeholder="arm"
                  variant="flushed"
                  type="number"
                  {...register("arm")}
                />
                <Input
                  step="0.01"
                  isInvalid={errors.waist}
                  placeholder="waist"
                  variant="flushed"
                  type="number"
                  {...register("waist")}
                />
                <Input
                  step="0.01"
                  isInvalid={errors.hip}
                  placeholder="hip"
                  variant="flushed"
                  type="number"
                  {...register("hip")}
                />
                <Input
                  step="0.01"
                  isInvalid={errors.thigh}
                  placeholder="thigh"
                  variant="flushed"
                  type="number"
                  {...register("thigh")}
                />
              </SimpleGrid>
            </StyledFormControl>
          </Stack>
          <StyledFormControl label="معدل النشاط">
            <Controller
              control={control}
              name="activityRate"
              render={({ field: { onChange, value } }) => (
                <RadioGroup onChange={onChange} value={value} ref={register()}>
                  <Stack>
                    <Radio value="مرتفع">مرتفع</Radio>
                    <Radio value="متوسط">متوسط</Radio>
                    <Radio value="منخفض">منخفض</Radio>
                    <Radio value="مبتحركش الا نادرا">مبتحركش الا نادرا</Radio>
                  </Stack>
                </RadioGroup>
              )}
            />
          </StyledFormControl>
          <StyledFormControl
            error={errors.preferredFood}
            label={"اكلات حابب متكونش موجودة في الدايت"}
          >
            <Textarea
              {...register("preferredFood")}
              variant="flushed"
              type="text"
            />
            {errors.preferredFood && (
              <FormErrorMessage>Required field</FormErrorMessage>
            )}
          </StyledFormControl>
          <StyledFormControl
            error={errors.unpreferredFood}
            label={"اكلات حابب تكون موجودة الدايت"}
          >
            <Textarea
              {...register("unpreferredFood")}
              variant="flushed"
              type="text"
            />
            {errors.unpreferredFood && (
              <FormErrorMessage>Required field</FormErrorMessage>
            )}
          </StyledFormControl>
          <StyledFormControl label={"تحب كميات الاكل تتحسب ازاي"}>
            <Controller
              name="weightMethod"
              control={control}
              render={({ field: { onChange, value } }) => (
                <RadioGroup onChange={onChange} value={value} ref={register()}>
                  <Stack>
                    <Radio value="ميزان جرامات">ميزان جرامات</Radio>
                    <Radio value="عدد المعالق">عدد المعالق</Radio>
                  </Stack>
                </RadioGroup>
              )}
            />
          </StyledFormControl>
          <StyledFormControl label={"مدة الاشتراك"}>
            <Controller
              name="duration"
              control={control}
              render={({ field: { onChange, value } }) => (
                <RadioGroup onChange={onChange} value={value} ref={register()}>
                  <Stack>
                    <Radio value="1">شهر</Radio>
                    <Radio value="3">3 شهور</Radio>
                    <Radio value="6">6 شهور</Radio>
                  </Stack>
                </RadioGroup>
              )}
            />
          </StyledFormControl>
          <StyledFormControl label={"اي تحاليل طبية خلال اخر 3 شهور"}>
            <Input
              {...register("analysis")}
              onChange={(e) => onAnalysisChange(e.target.files[0])}
              variant="flushed"
              mt="5px"
              type="file"
              accept=".png, .jpg"
            />
          </StyledFormControl>
          <StyledFormControl label={"اي ملحوظة حابب تضيفها"}>
            <Input {...register("notes")} variant="flushed" type="text" />
          </StyledFormControl>
          <StyledFormControl
            error={errors.photo}
            label={"صورة بتاريخ اليوم للجسم (بدون وجه)"}
          >
            <Input
              {...register("photo")}
              onChange={(e) => onPhotoChange(e.target.files[0])}
              variant="flushed"
              mt="5px"
              type="file"
              accept=".png, .jpg"
            />
            {errors.photo && (
              <FormErrorMessage>Required field</FormErrorMessage>
            )}
          </StyledFormControl>
          <Button
            bg="brand"
            marginInline="auto"
            marginBlock="1rem"
            type="submit"
            isLoading={isLoading}
          >
            Submit
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

const StyledFormControl = ({ children, label, error }) => {
  return (
    <FormControl
      isInvalid={error}
      overflow="hidden"
      borderRadius={5}
      bg="rgba(0,0,0,0.7)"
      mt="2rem"
    >
      <FormLabel
        w="100%"
        paddingInline="2rem"
        paddingBlock="1rem"
        bg="rgba(255, 97, 50, 0.4)"
      >
        {label}
      </FormLabel>
      <Box pb="1rem" paddingInline="2rem">
        {children}
      </Box>
    </FormControl>
  );
};

export default Register;
