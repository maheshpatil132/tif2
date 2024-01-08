import { Button, Flex, Box } from "@chakra-ui/react";
import React from "react";
import { useFormik } from "formik";

import FormSelect from "../../components/formComponents/FormSelect";
import { IInterViewSettings } from "../../interface/forms";
import {
  interviewDurationOptions,
  interviewLanguageOptions,
  interviewModeOptions,
} from "./constants";
import { useData } from "./DataProvider";
import * as Yup from "yup";

const InterviewDetailsForm: React.FC = () => {
  const { state, setState, setInd } = useData();
  const {
    errors,
    touched,
    handleSubmit,
    values,
    setFieldTouched,
  } = useFormik<IInterViewSettings>({
    initialValues: {
      interviewMode: "",
      interviewDuration: "",
      interviewLanguage: "",
    },
    validationSchema: Yup.object().shape({
      interviewMode: Yup.string().required("interviewMode is required"),
      interviewDuration: Yup.string().required("interviewDuration is required"),
      interviewLanguage: Yup.string().required("interviewLanguage is required"),
    }),
    onSubmit: (values) => {
      setState((prev) => ({
        ...prev,
        interviewSettings: values,
      }));
      alert("Form successfully submitted");
    },
  });

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormSelect
          label="Interview Mode"
          placeholder="Select interview mode"
          name="interviewMode"
          options={interviewModeOptions}
          onChange={(value:any) =>
            setState((prev) => ({
              ...prev,
              interviewSettings: {
                ...prev.interviewSettings,
                interviewMode: value,
              },
            }))
          }
          onBlur={setFieldTouched}
          value={values?.interviewMode}
          error={errors?.interviewMode}
          touched={touched?.interviewMode}
        />
        <FormSelect
          label="Interview Duration"
          placeholder="Select interview duration"
          name="interviewDuration"
          options={interviewDurationOptions}
          onChange={(value:any) =>
            setState((prev) => ({
              ...prev,
              interviewSettings: {
                ...prev.interviewSettings,
                interviewDuration: value,
              },
            }))
          }
          onBlur={setFieldTouched}
          value={values?.interviewDuration}
          error={errors?.interviewDuration}
          touched={touched?.interviewDuration}
        />
        <FormSelect
          label="Job Location"
          name="interviewLanguage"
          placeholder="Select interview language"
          options={interviewLanguageOptions}
          onChange={(value:any) =>
            setState((prev) => ({
              ...prev,
              interviewSettings: {
                ...prev.interviewSettings,
                interviewLanguage: value,
              },
            }))
          }
          onBlur={setFieldTouched}
          error={errors.interviewLanguage}
          touched={touched.interviewLanguage}
          value={values.interviewLanguage}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button
            onClick={() => setInd((prev) => prev - 1)}
            colorScheme="gray"
            type="button"
          >
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Submit
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default InterviewDetailsForm;
