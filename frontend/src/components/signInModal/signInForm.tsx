import React, {useState} from "react";
import {ErrorMessage, Field, Form, Formik, FormikHelpers, FormikProps} from "formik";
import * as Yup from 'yup';
import Button from "react-bootstrap/Button";
import {auth} from "../../firebase";
import SignInBaseForm from "./signInBaseForm";
import Spinner from "react-bootstrap/Spinner";

interface SignInFormProps {
    handleSubmitted: () => void
}

interface FormValues {
    email: string;
    password: string;
}

const SignInForm: React.FC<SignInFormProps> = ({handleSubmitted}) => {
    const [formError, setFormError] = useState<string | null>(null);

    const handleSubmit = (values: FormValues, {setSubmitting}: FormikHelpers<FormValues>) => {
        auth.signInWithEmailAndPassword(values.email, values.password)
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
            .required('This field is required')
    });

    return (
        <SignInBaseForm formError={formError}>
            <Formik
                initialValues={{email: '', password: ''}}
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

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? <Spinner animation="border" size="sm"/> : "Sign in"}
                        </Button>
                    </Form>
                )}
            </Formik>
        </SignInBaseForm>
    )
}

export default SignInForm;
