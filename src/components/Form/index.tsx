import { Formik } from "formik";

type FormValues = {
  [key: string]: string;
};

type Props = {
  initialValues: FormValues;
  validationSchema: object;
  handleSubmit: (values: unknown) => void;
};

const FormData = ({ initialValues, handleSubmit, validationSchema }: Props) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, handleSubmit }) => (
        <form className='gap-3 flex-col flex w-full' onSubmit={handleSubmit}>
          {Object.keys(initialValues).map((key) => (
            <div key={key}>
              <label htmlFor={key}>{key}:</label>
              <input
                value={values[key]}
                type={
                  key === "email"
                    ? "email"
                    : key === "password"
                    ? "password"
                    : "text"
                }
                onChange={handleChange}
                id={key}
                name={key}
              />
            </div>
          ))}
        </form>
      )}
    </Formik>
  );
};

export default FormData;
