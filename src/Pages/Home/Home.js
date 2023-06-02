import React, { useState } from "react";
import { Formik, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ConfirmBox from "../../Components/Box/ConfirmBox";

const validationSchema = Yup.object().shape({
  selectField: Yup.string().required("Field is required"),
  dateField: Yup.date().required("Field is required"),
  inputFields: Yup.array().of(Yup.string().required("Field is required"))
});

const initialValues = {
  selectField: "",
  dateField: null,
  inputFields: [""]
};

const Home = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setShowConfirmation(true);
    }, 3000);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, isSubmitting, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Select Field</label>
            <Field
              as="select"
              name="selectField"
              id="selectField"
              className="form-control"
            >
              <option value="">Select an option</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Field>
            <ErrorMessage
              name="selectField"
              component="div"
              className="text-danger"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Date Field</label>
            <Field name="dateField">
              {({ field, form }) => (
                <DatePicker
                  {...field}
                  id="dateField"
                  className="form-control"
                  placeholderText="Select a date"
                  selected={field.value}
                  onChange={(date) => form.setFieldValue(field.name, date)}
                />
              )}
            </Field>
            <ErrorMessage
              name="dateField"
              component="div"
              className="text-danger"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Input Fields</label>

            <FieldArray name="inputFields">
              {({ push }) => (
                <>
                  {values.inputFields.map((inputField, index) => (
                    <div className="input-group mb-3" key={index}>
                      <Field
                        name={`inputFields.${index}`}
                        className="form-control"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => push("")}
                  >
                    Add New
                  </button>
                </>
              )}
            </FieldArray>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Loading..." : "Submit"}
          </button>
          {showConfirmation && (
            <ConfirmBox
              showConfirmation={showConfirmation}
              setShowConfirmation={setShowConfirmation}
            />
          )}
        </form>
      )}
    </Formik>
  );
};

export default Home;
