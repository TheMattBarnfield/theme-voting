import React, {ReactElement} from "react";

interface SignInBaseFormProps {
    children: ReactElement;
    formError: string | null;
}

const SignInBaseForm: React.FC<SignInBaseFormProps> = ({children, formError}) => {
    return (
        <>
            {children}
            {
                formError
                    ? <div className="mt-3 text-danger">Error: {formError}</div>
                    : null
            }
        </>
    )
        ;
}

export default SignInBaseForm;
