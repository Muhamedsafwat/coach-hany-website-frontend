import React, { useState } from "react";
import {
  Stack,
  Heading,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  Radio,
  RadioGroup,
  SimpleGrid,
} from "@chakra-ui/react";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import applicationFormValidator from "../validators/applicationFormValidator";
import formSubmitHandler from "../handlers/formSubmitHandler";

const Register = () => {
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

  //form submit handler
  const onSubmit = (data) => {
    formSubmitHandler(data, bodyImg, analysisImg);
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
            <Input variant="flushed" type="number" {...register("height")} />
            {errors.height && (
              <FormErrorMessage>Required field</FormErrorMessage>
            )}
          </StyledFormControl>
          <StyledFormControl error={errors.weight} label="الوزن الحالي">
            <Input variant="flushed" type="number" {...register("weight")} />
            {errors.weight && (
              <FormErrorMessage>Required field</FormErrorMessage>
            )}
          </StyledFormControl>
          <StyledFormControl error={errors.age} label="العمر">
            <Input variant="flushed" type="number" {...register("age")} />
            {errors.age && <FormErrorMessage>Required field</FormErrorMessage>}
          </StyledFormControl>
          <StyledFormControl label="للهدف من الدايت">
            <Controller
              name="target"
              control={control}
              render={({ field: { onChange, value } }) => (
                <RadioGroup
                  onChange={onChange}
                  value={value}
                  defaultValue="1"
                  ref={register()}
                >
                  <Stack>
                    <Radio value="1">تقلل وزنك (تخس بشكل صحي)</Radio>
                    <Radio value="2">تزود وزنك ( التغلب ع النحافة)</Radio>
                    <Radio value="3">تحافظ على وزنك مع تظبيط شكل جسمك</Radio>
                    <Radio value="4">لاعب رياضي ( يمارس اى لعبة رياضية)</Radio>
                    <Radio value="5">
                      مريض ضغط ( هدفه تظبيط الضغط مع تحسن صحته)
                    </Radio>
                    <Radio value="6">
                      مريض سكر ( تظبيط الاكل مع الجرعات لتجنب حدوث غيبوبة سكر +
                      تحسن الصحة العامة وممارسة رياضة)
                    </Radio>
                    <Radio value="7">
                      مريض غدة درقية ( سواء نشطة أو خاملة )
                    </Radio>
                    <Radio value="8">حالات الpco</Radio>
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
                  isInvalid={errors.neck}
                  placeholder="neck"
                  variant="flushed"
                  type="number"
                  {...register("neck")}
                />
                <Input
                  isInvalid={errors.chest}
                  placeholder="chest"
                  variant="flushed"
                  type="number"
                  {...register("chest")}
                />
                <Input
                  isInvalid={errors.arm}
                  placeholder="arm"
                  variant="flushed"
                  type="number"
                  {...register("arm")}
                />
                <Input
                  isInvalid={errors.waist}
                  placeholder="waist"
                  variant="flushed"
                  type="number"
                  {...register("waist")}
                />
                <Input
                  isInvalid={errors.hip}
                  placeholder="hip"
                  variant="flushed"
                  type="number"
                  {...register("hip")}
                />
                <Input
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
                <RadioGroup
                  onChange={onChange}
                  value={value}
                  defaultValue="1"
                  ref={register()}
                >
                  <Stack>
                    <Radio value="1">مرتفع</Radio>
                    <Radio value="2">متوسط</Radio>
                    <Radio value="3">منخفض</Radio>
                    <Radio value="4">مبتحركش الا نادرا</Radio>
                  </Stack>
                </RadioGroup>
              )}
            />
          </StyledFormControl>
          <StyledFormControl
            error={errors.preferredFood}
            label={"اكلات حابب متكونش موجودة في الدايت"}
          >
            <Input
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
            <Input
              {...register("unpreferredFood")}
              variant="flushed"
              type="text"
            />
            {errors.unpreferredFood && (
              <FormErrorMessage>Required field</FormErrorMessage>
            )}
          </StyledFormControl>
          <StyledFormControl label={"مدة الاشتراك"}>
            <Controller
              name="duration"
              control={control}
              render={({ field: { onChange, value } }) => (
                <RadioGroup
                  onChange={onChange}
                  value={value}
                  defaultValue="1"
                  ref={register()}
                >
                  <Stack>
                    <Radio value="1">شهر</Radio>
                    <Radio value="2">3 شهور</Radio>
                    <Radio value="3">6 شهور</Radio>
                    <Radio value="4">سنة</Radio>
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
