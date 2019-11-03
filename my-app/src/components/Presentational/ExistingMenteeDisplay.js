import React from 'react'
import PropTypes from 'prop-types'

const ExistingMenteeDisplay = ({item}) => (
    <div>
        <h3>{item.name}</h3>
        <h4>Email: {item.mentee_email}</h4>
        <p style={{ color: 'blue' }}>Mentor's Message</p>
        {
            item.message
        }
        <p style={{ color: 'blue' }}>Meetup Details</p>
        {
            item.appointment
        }
    </div>
)

export default ExistingMenteeDisplay