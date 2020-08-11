import React, {useCallback, useEffect, useState} from 'react';
import {Theme} from '../../../model/theme';
import Button from 'react-bootstrap/Button';
import LoadingSpinner from '../../loadingSpinner/LoadingSpinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Vote.scss';

interface Props {
    getUnvotedTheme: () => Promise<Theme>
}

const Vote: React.FC<Props> = ({getUnvotedTheme}) => {
    const [theme, setTheme] = useState<Theme>()

    const loadTheme = useCallback(() => {
        setTheme(undefined);
        setTimeout(() =>
            getUnvotedTheme().then(setTheme),
            500
        );
    }, [getUnvotedTheme]);

    useEffect(() => {
        loadTheme();
    }, [loadTheme])

    return (
        <Container className="text-center pt-5 pb-5">
            <LoadingSpinner load={theme} large>
                <Row>
                    <Col className="text-center">
                        <h1 className="vote-theme">{theme?.theme}</h1>
                    </Col>
                </Row>
                <Row noGutters>
                    <Col className="text-right">
                        <Button size="lg" onClick={loadTheme} variant="danger">
                            Hate it!
                        </Button>
                    </Col>
                    <Col className="text-center">
                        <Button size="lg" onClick={loadTheme} variant="outline-secondary">
                            Skip
                        </Button>
                    </Col>
                    <Col className="text-left">
                        <Button size="lg" onClick={loadTheme} variant="primary">
                            Love it!
                        </Button>
                    </Col>
                </Row>
            </LoadingSpinner>
        </Container>
    );
}

export default Vote;
