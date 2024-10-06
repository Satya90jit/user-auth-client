import { useMutation } from "@/hooks";
import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import * as Yup from "yup";

const RegistrationForm = () => {
  const { mutation } = useMutation();
  const router = useRouter();

  // Registration form fields
  const REGISTRATION_FIELDS = [
    {
      key: "1",
      name: "name",
      label: "Name",
      type: "text",
      required: true,
      validationSchema: Yup.string()
        .required("Name is required")
        .test(
          "not-only-spaces",
          "Name should not contain only spaces",
          (value) => value.trim() !== ""
        ),
      initialValue: "",
    },
    {
      key: "2",
      name: "email",
      label: "Email",
      type: "email",
      required: true,
      validationSchema: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      initialValue: "",
    },
    {
      key: "3",
      name: "password",
      label: "Password",
      type: "password",
      required: true,
      validationSchema: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .matches(/[0-9]/, "Password must contain a number")
        .matches(/[a-z]/, "Password must contain a lowercase letter")
        .matches(/[A-Z]/, "Password must contain an uppercase letter")
        .matches(/[^\w]/, "Password must contain a symbol"),
      initialValue: "",
    },
    {
      key: "4",
      name: "age",
      label: "Age",
      type: "number",
      required: true,
      validationSchema: Yup.number()
        .required("Age is required")
        .min(18, "You must be at least 18 years old")
        .max(100, "Age must be below 100"),
      initialValue: "",
    },
    {
      key: "5",
      name: "address",
      label: "Address",
      type: "text",
      required: true,
      validationSchema: Yup.string()
        .required("Address is required")
        .min(5, "Address must be at least 5 characters long"),
      initialValue: "",
    },
  ];

  //? initial value & validation set
  const initialValues = REGISTRATION_FIELDS.reduce(
    (accumulator: any, currentValue: any) => {
      accumulator[currentValue.name] = currentValue.initialValue;
      return accumulator;
    },
    {}
  );

  const validationSchema = REGISTRATION_FIELDS.reduce(
    (accumulator: any, currentValue: any) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {}
  );

  //? handle submit function
  const handleSubmit = async (
    values: any,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const res = await mutation("users/register", {
        method: "POST",
        body: {
          name: values.name,
          email: values.email,
          password: values.password,
          age: values.age,
          address: values.address,
        },
        isAlert: true,
      });

      if (res?.status === 201) {
        router.push("/");
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "You have been registered successfully. Redirecting to login...",
        }).then(() => {
          router.push("/login");
        });
        resetForm();
      } else {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: `${res?.results?.error?.message}` || "Something went wrong.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong, please try again.",
      });
    }
  };

  return (
    <section className="w-full p-4 lg:p-6">
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={Yup.object(validationSchema)}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form className="w-full flex flex-col gap-4">
            {REGISTRATION_FIELDS.map((inputItem) => (
              <Field name={inputItem.name} key={inputItem.key}>
                {(props: {
                  meta: { touched: any; error: any };
                  field: any;
                }) => (
                  <div className="w-full flex flex-col">
                    <TextField
                      fullWidth
                      label={inputItem.label}
                      variant="standard"
                      required={inputItem?.required}
                      type={inputItem.type}
                      error={Boolean(props.meta.touched && props.meta.error)}
                      helperText={props.meta.touched && props.meta.error}
                      {...props.field}
                    />
                  </div>
                )}
              </Field>
            ))}
            <p className="text-center tracking-wide py-1">
              Have an account?{" "}
              <Link href="/login">
                <span className="text-blue-600 hover:underline cursor-pointer text-right common-transition">
                  Login
                </span>
              </Link>{" "}
              now.
            </p>

            <div className="w-full flex justify-center items-center">
              <LoadingButton
                fullWidth
                type="submit"
                disabled={formik.isSubmitting || !formik.isValid}
                loading={formik.isSubmitting}
                className="!rounded-lg !bg-primary !h-10 !w-36 !text-base !capitalize !text-white disabled:!cursor-not-allowed disabled:!bg-gray-300"
              >
                Register
              </LoadingButton>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};
export default RegistrationForm;
