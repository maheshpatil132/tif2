import { Button, Flex, Box } from "@chakra-ui/react";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormInput from "../../components/formComponents/FormInput";
import { IJobDetails } from "../../interface/forms";
import { useData } from "./DataProvider";

const JobDetailsForm: React.FC = () => {
  const {state,ind  , setState , setInd} = useData()
 
  const { handleChange, errors, touched, handleBlur, handleSubmit, values } =
    useFormik<IJobDetails>({
      initialValues: {
        jobTitle: state.jobDetails.jobTitle,
        jobDetails: state.jobDetails.jobDetails,
        jobLocation: state.jobDetails.jobLocation,
      },
      validationSchema: Yup.object().shape({
        jobTitle: Yup.string().required("Job Title is required"),
        jobDetails: Yup.string().required("Job Details is required"),
        jobLocation: Yup.string().required("Job Location is required"),
      }),

      onSubmit: (values) => {
        setState((prev) => ({
          ...prev,
          jobDetails: values
        }));
       
        setInd((prev)=>prev+1);
        console.log(ind);

      },
    });


    const handleFieldChange = (fieldName: string, value: any) => {
      handleChange({
        target: { name: fieldName, value },
      });
  
      setState((prev) => ({
        ...prev,
        jobDetails: { ...prev.jobDetails, [fieldName]: value },
      }));
    };

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Job Title"
          placeholder="Enter job title"
          name="jobTitle"
          onChange={(e) => handleFieldChange("jobTitle", e.target.value)}
          onBlur={handleBlur}
          value={values?.jobTitle}
          error={errors?.jobTitle}
          touched={touched?.jobTitle}
        />
        <FormInput
          label="Job Details"
          placeholder="Enter job details"
          name="jobDetails"
          onChange={(e) => handleFieldChange("jobDetails", e.target.value)}
          onBlur={handleBlur}
          value={values?.jobDetails}
          error={errors?.jobDetails}
          touched={touched?.jobDetails}
        />
        <FormInput
          label="Job Location"
          name="jobLocation"
          placeholder="Enter job location"
          onChange={(e) => handleFieldChange("jobLocation", e.target.value)}
          onBlur={handleBlur}
          error={errors.jobLocation}
          touched={touched.jobLocation}
          value={values.jobLocation}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          {/* Disable Previous button if ind is already at its minimum value (0) */}
          <Button
            onClick={() => setInd((prev) => Math.max(prev - 1, 0))}
            colorScheme="gray"
            type="button"
            isDisabled={ind === 0}
          >
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default JobDetailsForm;
