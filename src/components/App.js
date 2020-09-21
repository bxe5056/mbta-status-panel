import React from 'react';
import './App.css';
import TrainCard from "./TrainCard/TrainCard";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
import Header from './Header/Header'
function App() {
    return (
        <div className="App">
            <Container fluid>
                <Row className="justify-content-md-center">
                    <Col xs lg="8">
                        <Header />
                    </Col>
                </Row>

                <Row className="justify-content-md-center">
                    <Col xs lg="4"><TrainCard station='Franklin' direction='inbound'/></Col>
                    <Col xs lg="4"><TrainCard station='Back Bay' direction='outbound'/></Col>
                </Row>

            </Container>
        </div>
    );
}

export default App;
