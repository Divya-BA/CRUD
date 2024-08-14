const User = require('../Models/userModel');

// Create a new user
const createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//get a user by ID
const getUserById=async(req,res)=>{
    try {
        const user=await User.findById(req.params.id);
        if(!user)
        {
            res.json({message:'User Not found'})
        }else{
            res.json(user);
        }
       
    } catch (error) {
        res.json({message:error.message});
    }


}


// Update a user by ID
const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            res.status(404).json({ message: 'User Not Found' });
        } else {
            res.status(200).json({ message: 'User updated successfully', user });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'User Not Found' });
        } else {
            res.status(200).json({ message: 'Deleted Successfully' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createUser,
    getUsers,
    updateUser,
    deleteUser,
    getUserById
};