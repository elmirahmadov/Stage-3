import { Formik, Form, Field, ErrorMessage } from "formik";
function FormikForm() {
  const validateName = (value) => {
    // console.log(value);
    if (!value) {
      return "this field is required";
    }
    if (value.length < 5 || value.length > 20) {
      return "Name must be between 5 and 20 character";
    }
    return;
  };
  const validateEmail = (value) => {
    // console.log(value);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
    if (!value) {
      return "email is required";
    }
    if (!emailRegex.test(value)) {
      return "please enter valid email address";
    }
    return;
  };
  const validateAge = (value) => {
    // console.log(value);
    if (!value) {
      return "age is required";
    }
    if (value <= 0) {
      return "enter positive number";
    }
    if (isNaN(value)) {
      return "please enter valid age";
    }
    return;
  };
  const validateTerms = (value) => {
    // console.log(value);
    if (!value) {
      return "please accept  the conditions";
    }
    return;
  };
  return (
    <div>
      <h1>Basic form</h1>
      <Formik
        initialValues={{ firstName: "", email: "", age: "", terms: false }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {() => (
          <Form>
            <div>
              <Field
                type="text"
                name="firstName"
                placeholder="first name"
                validate={validateName}
              />
              <ErrorMessage
                name="firstName"
                component="div"
                style={{ color: "red" }}
              />
            </div>
            <div>
              <Field
                type="email"
                name="email"
                placeholder="email"
                validate={validateEmail}
              />
              <ErrorMessage
                name="email"
                component="div"
                style={{ color: "red" }}
              />
            </div>
            <div>
              <Field
                type="text"
                name="age"
                placeholder="age"
                validate={validateAge}
              />
              <ErrorMessage
                name="age"
                component="div"
                style={{ color: "red" }}
              />
            </div>
            <div>
              <Field
                type="checkbox"
                name="terms"
                placeholder="terms"
                validate={validateTerms}
              />
              I agree to the terms and conditions
              <ErrorMessage
                name="terms"
                component="div"
                style={{ color: "red" }}
              />
            </div>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
export default FormikForm;
