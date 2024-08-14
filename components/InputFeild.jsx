import React from 'react'
import '../styles/formStyles.css'

function InputFeild({ label, name, type, value, onChange }) {
    return (
        <label>
            {label}:
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required
            />
        </label>
    )
}

export default InputFeild