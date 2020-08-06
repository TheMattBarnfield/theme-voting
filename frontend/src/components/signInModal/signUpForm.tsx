import React, {useState} from "react";
import {ErrorMessage, Field, Form, Formik, FormikHelpers, FormikProps} from "formik";
import * as Yup from 'yup';
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import {auth} from "../../firebase";
import SignInBaseForm from "./signInBaseForm";

interface SignUpFormProps {
    handleSubmitted: () => void
}

interface FormValues {
    email: string;
    password: string;
    passwordConfirm: string;
}

const SignUpForm: React.FC<SignUpFormProps> = ({handleSubmitted}) => {
    const [formError, setFormError] = useState<string | null>(null);

    const handleSubmit = (values: FormValues, {setSubmitting}: FormikHelpers<FormValues>) => {
        auth.createUserWithEmailAndPassword(values.email, values.password)
            .then(() => {
                handleSubmitted();
            })
            .catch((err) => {
                console.error(err);
                setFormError(err.message);
                setSubmitting(false);
            })
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Your email is invalid')
            .required('This field is required'),
        password: Yup.string()
            .min(8, 'Your password must contain at least 8 characters')
            .required('This field is required'),
        passwordConfirm: Yup.string()
            .oneOf([Yup.ref('password')], 'Password must match')
            .required('This field is required')
    });

    return (
        <SignInBaseForm formError={formError}>
            <Formik
                initialValues={{email: '', password: '', passwordConfirm: ''}}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({isSubmitting}: FormikProps<any>) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <Field
                                type="email"
                                name="email"
                                placeholder="your@email.com"
                                className="form-control"
                            />
                            <ErrorMessage
                                name="email"
                                component="small"
                                className="form-text text-danger"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field
                                type="password"
                                name="password"
                                placeholder="**********"
                                className="form-control"
                            />
                            <ErrorMessage
                                name="password"
                                component="small"
                                className="form-text text-danger"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="passwordConfirm">Confirm password</label>
                            <Field
                                type="password"
                                name="passwordConfirm"
                                placeholder="**********"
                                className="form-control"
                            />
                            <ErrorMessage
                                name="passwordConfirm"
                                component="small"
                                className="form-text text-danger"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? <Spinner animation="border" size="sm"/> : "Sign up"}
                        </Button>
                    </Form>
                )}
            </Formik>
        </SignInBaseForm>
    )
}

export default SignUpForm;
