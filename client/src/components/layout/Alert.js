import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import '../../App.css'

const Alert = ({ alerts }) => alerts !== null && alerts.length > 0 && alerts.map(alert => (
  <div key={alert.id} className={`alert alert-${alert.alertType}`}>
    { alert.msg }
  </div>
))


Alert.propTypes = {
  alerts: PropTypes.array.isRequired
}

// Mapping the redux state to a prop in this component so we have access to import PropTypes from 'prop-types'
// In this case is an array of alerts
// state: the same value returned by a call to store.getState()).
const mapStateToProps = state => ({
  alerts: state.alert
})

export default connect(mapStateToProps)(Alert)
