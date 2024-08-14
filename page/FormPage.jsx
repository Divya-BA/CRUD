import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createUser, getUserById, updateUser } from '../api/userAPi';
import Dropdown from '../components/Dropdown';
import InputField from '../components/InputFeild';
import { fetchCountries, fetchStates, fetchCities } from '../api/locationApi';

const FormPage = () => {
    const [formData, setFormData] = useState({
        fname: '', lname: '', email: '', phoneNumber: '', location: { country: '', state: '', city: '' }, hobby: ''
    });
    const [options, setOptions] = useState({ countries: [], states: [], cities: [] });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const countriesData = await fetchCountries();
                setOptions(prev => ({
                    ...prev,
                    countries: countriesData.map(c => ({ value: c.iso2, label: c.name }))
                }));
                if (id) {
                    const userData = await getUserById(id);
                    setFormData(userData);
                    const statesData = await fetchStates(userData.location.country);
                    setOptions(prev => ({
                        ...prev,
                        states: statesData.map(s => ({ value: s.iso2, label: s.name })),
                        cities: []
                    }));
                    const citiesData = await fetchCities(userData.location.country, userData.location.state);
                    setOptions(prev => ({
                        ...prev,
                        cities: citiesData.map(c => ({ value: c.name, label: c.name }))
                    }));
                }
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        fetchData();
    }, [id]);

    const handleChange = async e => {
        const { name, value } = e.target;
        if (name === 'country') {
            setFormData(prev => ({ ...prev, location: { ...prev.location, country: value, state: '', city: '' } }));
            try {
                const statesData = await fetchStates(value);
                setOptions(prev => ({
                    ...prev,
                    states: statesData.map(s => ({ value: s.iso2, label: s.name })),
                    cities: []
                }));
            } catch (error) {
                console.error('Error fetching states', error);
            }
        } else if (name === 'state') {
            setFormData(prev => ({ ...prev, location: { ...prev.location, state: value, city: '' } }));
            try {
                const citiesData = await fetchCities(formData.location.country, value);
                setOptions(prev => ({
                    ...prev,
                    cities: citiesData.map(c => ({ value: c.name, label: c.name }))
                }));
            } catch (error) {
                console.error('Error fetching cities', error);
            }
        } else if (name === 'city') {
            setFormData(prev => ({ ...prev, location: { ...prev.location, city: value } }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            id ? await updateUser(id, formData) : await createUser(formData);
            navigate('/');
        } catch (error) {
            console.error('Error submitting form', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {['fname', 'lname', 'email', 'phoneNumber', 'hobby'].map(field => (
                <InputField
                    key={field}
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    name={field}
                    type={field === 'email' ? 'email' : field === 'phoneNumber' ? 'tel' : 'text'}
                    value={formData[field]}
                    onChange={handleChange}
                />
            ))}
            {['country', 'state', 'city'].map(field => (
                <Dropdown
                    key={field}
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    name={field}
                    value={formData.location[field]}
                    onChange={handleChange}
                    options={options[field === 'country' ? 'countries' : field === 'state' ? 'states' : 'cities']}
                />
            ))}
            <button type="submit">Save</button>
        </form>
    );
};

export default FormPage;
