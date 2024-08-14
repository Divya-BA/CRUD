import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import { useNavigate } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import { getUsers, deleteUser } from '../api/userAPi';

const HomePage = () => {
    const [usersData, setUsersData] = useState([]);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
            const data = await getUsers();
            setUsersData(data);
        } catch (error) {
            console.error('Error fetching users', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        await deleteUser(id);
        fetchUsers();
    };

    const handleEdit = (id) => {
        navigate(`/form/${id}`);
    };

    const csvData = usersData.map(user => ({
        'First Name': user.fname,
        'Last Name': user.lname,
        'Email': user.email,
        'Phone Number': user.phoneNumber,
        'Country': user.location.country,
        'State': user.location.state,
        'City': user.location.city,
        'Hobby': user.hobby
    }));

    const columnsData = [
        { Header: 'First Name', accessor: 'fname' },
        { Header: 'Last Name', accessor: 'lname' },
        { Header: 'Email', accessor: 'email' },
        { Header: 'Phone Number', accessor: 'phoneNumber' },
        {
            Header: 'Location',
            accessor: row => `${row.location.country}, ${row.location.state}, ${row.location.city}`
        },
        { Header: 'Hobby', accessor: 'hobby' },
        {
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => (
                <div>
                    <button className='editButton' onClick={() => handleEdit(row.original._id)}>Edit</button>
                    <button className='deleteButton' onClick={() => handleDelete(row.original._id)}>Delete</button>
                </div>
            )
        }
    ];

    return (
        <div>
            <Table columnsData={columnsData} usersData={usersData} />
            <button className='button' onClick={() => navigate('/form')}>Create</button>
            <button className='button'>
                <CSVLink
                    className='csvFile'
                    data={csvData}
                    filename={"users.csv"}
                >
                    Download CSV
                </CSVLink>
            </button>
        </div>
    );
};

export default HomePage;
