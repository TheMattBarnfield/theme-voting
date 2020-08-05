import React from 'react';
import Spinner from 'react-bootstrap/Spinner'
import './LoadingSpinner.scss'

interface Props {
    load: any
    spinnerClassName?: string
    large?: boolean
}

const LoadingSpinner: React.FC<Props> = ({load, spinnerClassName='', large, children}) => {
    return load
        ? <div>
            {children}
        </div>
        : (
            <Spinner
                className={`${spinnerClassName} ${large ? "large-spinner" : ""}`}
                animation="border"
                variant="primary"
                role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        )
};

export default LoadingSpinner;
