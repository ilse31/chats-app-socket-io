import { Formik } from "formik";
import Input from "../Inputs";
import Button from "../buttons";

type FormValues = {
  [key: string]: string;
};

type Props = {
  initialValues: FormValues;
  validationSchema: object;
  handleSubmit: (values: unknown) => void;
};

const FormData = ({ initialValues, validationSchema, handleSubmit }: Props) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, handleSubmit, errors }) => (
        <form className='gap-3 flex-col flex w-full' onSubmit={handleSubmit}>
          {Object.keys(initialValues).map((key) => (
            <div key={key}>
              <Input
                type={
                  key === "email"
                    ? "email"
                    : key === "password"
                    ? "password"
                    : "text"
                }
                name={key}
                onChange={handleChange}
                label={key}
                value={values[key]}
                id={key}
                errorMessage={errors[key]}
              />
            </div>
          ))}

          <Button type='submit' variant='sky'>
            Submit
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default FormData;
