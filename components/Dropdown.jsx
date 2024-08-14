import React from 'react'
import '../styles/formStyles.css'


function Dropdown( {label, name,value,onChange,options}) {
    return (
        <label>
            {label}:
            <select
                name={name}
                value={value}
                onChange={onChange}
                required
            >
                <option value=''>Select {label}</option>
                {options.map(option=>(
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}

            </select>
        </label>
    )
}

export default Dropdown