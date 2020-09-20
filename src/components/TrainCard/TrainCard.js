import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment'

const TrainDirectory = require('../TrainDirectory/TrainDirectory');


class TrainCard extends React.Component {
    dayOfWeek = moment().format('dddd');
    currentTime = moment().format('HH:mm');
    nextTrainObject = {};


    componentDidMount() {
        this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getNextTrain(){
        let trainObject = TrainDirectory.getNextTrain(this.dayOfWeek, this.props.direction, this.currentTime, this.props.station);
        console.log("OMG: " + JSON.stringify(trainObject));
        return trainObject;
    }

    calculateTimeDiff = (time) => {
        return moment(time).fromNow();
    }

    calculateTime = (time) => {
        return moment(time).format("[@] h:mm A");
    }

    calculateDirection = (direction) => {
        if( !isNaN(direction) ){
            return direction ? 'inbound to Back Bay' : 'outbound to Franklin'; // Per MBTA, 1 is inbound, 0 is outbound.
        } else {
            if (direction === 'inbound')
                return 'inbound to Back Bay';
            if (direction === 'outbound')
                return 'outbound to Franklin';
            return direction;
        }
    }

    getDestination = (origin) => {
        if (origin === 'Back Bay') {
            return 'Franklin';
        } else if (origin === 'Franklin') {
            return 'Back Bay';
        } else {
            return null;
        }
    }

    render(){
        if (this.getNextTrain()) {
            return (
                <div className="card-body">
                    <div className="card-title mb-1 h3"><b>{this.props.station}</b></div>
                    <div className="card-subtitle mb-2 text-muted">{this.calculateDirection(this.props.direction)}</div>
                    <div className="card-subtitle mb-2">
                        {
                            this.calculateTimeDiff(
                                moment()
                                    .hour(this.getNextTrain().time[this.props.station].slice(0, 2))
                                    .minute(this.getNextTrain().time[this.props.station].slice(3, 5))
                            )
                        }

                    </div>
                    <div className="card-subtitle">
                        Departs&nbsp;
                        {
                            this.calculateTime(
                                moment()
                                    .hour(this.getNextTrain().time[this.props.station].slice(0, 2))
                                    .minute(this.getNextTrain().time[this.props.station].slice(3, 5))
                            )
                        }
                        <br/>
                        Arrives at {
                        this.getDestination(this.props.station)
                    }&nbsp;
                        {
                            this.calculateTime(
                                moment()
                                    .hour(this.getNextTrain().time[this.getDestination(this.props.station)].slice(0, 2))
                                    .minute(this.getNextTrain().time[this.getDestination(this.props.station)].slice(3, 5))
                            )
                        }
                    </div>
                </div>
            )
        }
        else {
            return (
            <div className="card-body">
                <div className="card-title mb-1 h3"><b>{this.props.station}</b></div>
                <div className="card-subtitle mb-2 text-muted">{this.calculateDirection(this.props.direction)}</div>
                <div className="card-subtitle mb-2">
                    No more trains today :(
                </div>
            </div>
            )
        }
    }
}

TrainCard.defaultProps = {
    nextTrain: {
        station: 'null',
        departureTime: 'null pm',
        direction: 'circular'
    }
};

TrainCard.propTypes = {
    nextTrain: PropTypes.object
};

export default TrainCard;