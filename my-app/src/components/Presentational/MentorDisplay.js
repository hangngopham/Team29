import React from 'react'
import PropTypes from 'prop-types'

const MentorDisplay = ({item}) => (
    <div>
        <h3>{item.name}</h3>
        <h4>Email: {item.email}</h4>
        <p style={{ color: 'blue' }}>Matched Preference</p>
        {
            item.pref.map((param, key) => (
                <li
                    key={key}
                    role='presentation'>
                    {param.key}: {param.value}
                </li>
            ))
        }
        <p style={{ color: 'blue' }}>Profile Preference</p>
        {
            item.profile.map((param, key) => (
                <li
                    key={key}
                    role='presentation'>
                    {param.key}: {param.value}
                </li>
            ))
        }
    </div>
)

export default MentorDisplay