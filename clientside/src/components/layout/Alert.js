import React from 'react'
import PropTypes from 'prop-types'

// anytime we interact with component with redux, whether we calling an action or getting a state we need to use connector
import {connect} from 'react-redux'

const Alert = ({alerts}) => {
    alerts!==null && alerts.length > 0 && alerts.map(alert => (

        <div key ={alert.id} className={`alert alert-${alert.alertType}`}>

            {alert.msg}
        </div>

    ));
}

Alert.propTypes = {
     alert: PropTypes.array.isRequired,
}

//In this case we actually get the alert state. In redux dev tools we actually fetch that array into that component
//mapStateToProps: we are mapping the redux state to a prop in this component, so that we have to access to it, in this case it is array of alerts
const mapStateToProps =  (state) => ({
    alerts:state.alert
});


export default connect(mapStateToProps)(Alert);
