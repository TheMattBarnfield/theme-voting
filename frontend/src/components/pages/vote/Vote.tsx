import React, {useEffect, useState} from 'react';
import {Theme} from '../../../model/theme';
import Button from 'react-bootstrap/Button';
import LoadingSpinner from '../../loadingSpinner/LoadingSpinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Vote.scss';
import {likeTheme, dislikeTheme, getUnvotedTheme, skipTheme} from '../../../client/votingClient';

const Vote: React.FC = () => {
    const [theme, setTheme] = useState<Theme>()

    const vote = (f: (id: string) => Promise<Theme>) => () => {
        if (!theme || theme.id === 'no-new-themes') {
            return;
        }
        const id = theme.id
        setTheme(undefined)
        f(id).then(setTheme)
    }

    useEffect(() => {
        getUnvotedTheme().then(setTheme);
    }, [])

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
                        <Button size="lg" onClick={vote(dislikeTheme)} variant="danger">
                            Hate it!
                        </Button>
                    </Col>
                    <Col className="text-center">
                        <Button size="lg" onClick={vote(skipTheme)} variant="outline-secondary">
                            Skip
                        </Button>
                    </Col>
                    <Col className="text-left">
                        <Button size="lg" onClick={vote(likeTheme)} variant="primary">
                            Love it!
                        </Button>
                    </Col>
                </Row>
            </LoadingSpinner>
        </Container>
    );
}

export default Vote;
