import React from 'react';
import './App.css';
import TrainCard from "./TrainCard/TrainCard";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';

function App() {
    const tempTrain = {
        station: 'Franklin',
        direction: 'inbound',
        departureTime: '2020-09-08T05:45'
    }
    const tempBBTrain = {
        station: 'Back Bay',
        direction: '0',
        departureTime: '2020-09-07T22:45'
    }
    return (
        <div className="App">
            <Container fluid>
                <Row className="justify-content-md-center">
                    <Col xs lg="8">
                        <div className="h1 text-center">Next Train</div>
                        <hr className="mb-0"/>
                    </Col>
                </Row>

                <Row className="justify-content-md-center">
                    <Col xs lg="4"><TrainCard nextTrain={tempTrain}/></Col>
                    <Col xs lg="4"><TrainCard nextTrain={tempBBTrain}/></Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
