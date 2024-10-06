import { useMutation } from "@/hooks";
import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import { saveToLocalStorage, saveToSessionStorage } from "@/utils";

const LoginForm = () => {
  const { mutation, isLoading } = useMutation();
  const { setUser } = useAuth();
  const [isShowing, setIsShowing] = useState(false); // Toggle password visibility
  const router = useRouter();

  // Login form fields
  const LOGIN_FIELDS = [
    {
      key: "1",
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
      key: "2",
      name: "password",
      label: "Password",
      type: isShowing ? "text" : "password",
      required: true,
      validationSchema: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long"),
      initialValue: "",
    },
  ];

  //? initial value & validation set
  const initialValues = LOGIN_FIELDS.reduce(
    (accumulator: any, currentValue: any) => {
      accumulator[currentValue.name] = currentValue.initialValue;
      return accumulator;
    },
    {}
  );

  const validationSchema = LOGIN_FIELDS.reduce(
    (accumulator: any, currentValue: any) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {}
  );

  //? handle submit function
  // Handle form submission
  const handleSubmit = async (
    values: any,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const res = await mutation("users/login", {
        method: "POST",
        body: {
          email: values.email,
          password: values.password,
        },
        isAlert: true,
      });

      if (res?.status === 200) {
        const userRole = res.results?.role;
        const { token, user } = res.results;

        // Store token and user data
        saveToSessionStorage("ACCESS_TOKEN", token);
        saveToLocalStorage("USER_DATA", JSON.stringify(user));

        // Set user in zustand store
        await setUser(user);

        if (userRole === "admin") {
          Swal.fire({
            icon: "success",
            title: "Admin Login Successful",
            text: "Welcome, Admin!",
          }).then(() => {
            router.push("/admin");
          });
        } else if (userRole === "user") {
          Swal.fire({
            icon: "success",
            title: "User Login Successful",
            text: "Welcome to your account!",
          }).then(() => {
            router.push("/account/my-profile");
          });
        }
        resetForm(); // Reset form on success
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: res?.results?.error?.message || "Invalid credentials.",
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
            {LOGIN_FIELDS.map((inputItem) => (
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

            {/* <div className="text-right">
              <Link href="/forgot-password">
                <p className="text-blue-600 hover:underline">
                  Forgot Password?
                </p>
              </Link>
            </div> */}

            <p className="text-center tracking-wide py-1">
              Don't have an account?{" "}
              <Link href="/">
                <span className="text-blue-600 hover:underline cursor-pointer text-right common-transition">
                  Register
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
                Login
              </LoadingButton>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default LoginForm;
