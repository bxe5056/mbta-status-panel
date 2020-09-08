import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment'

class TrainCard extends React.Component {
    componentDidMount() {
        this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
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

    render(){
        return (
            <div className="card-body">
                <div className="card-title mb-1 h3"><b>{this.props.nextTrain.station}</b></div>
                <div className="card-subtitle mb-2 text-muted">{this.calculateDirection(this.props.nextTrain.direction)}</div>
                <div className="card-subtitle mb-2">
                    {this.calculateTimeDiff(this.props.nextTrain.departureTime)}
                </div>
                <div className="card-subtitle">
                    {this.calculateTime(this.props.nextTrain.departureTime)}
                </div>
            </div>
        )
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