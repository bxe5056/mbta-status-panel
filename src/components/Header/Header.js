import moment from "moment";
import React from "react";

class Header extends React.Component {

    componentDidMount() {
        setInterval(() => {
            this.setState({ time: new Date().toLocaleTimeString() })
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render(){
        return(
            <div className="header">
                <div className="h1 text-center my-3">Next Train</div>
                <div className="h5 text-center">
                    It is currently {moment().format('h:mm a')}
                </div>
                <br />
                {
                    moment().format('dddd, MMMM Do ')
                }
                <hr className="mb-0"/>
            </div>
        )
    }

}
export default Header;