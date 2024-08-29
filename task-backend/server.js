const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('./models/User'); // importing user model
const taskRoutes = require('./routes/task.routes')

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/api', taskRoutes);

let deletedUserStack = [];
// Connect to MongoDB

mongoose.connect('mongodb://localhost:27017/taskapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Failed to connect to MongoDB', err);
});


app.use(express.static(path.join(__dirname, '../task-frontend/build')));

app.post('/login', async(req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({message:'Invalid user'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: 'Invalid password'});
        }
        res.status(200).json({message:'Login Successful'});
    }
    catch(err) {
        console.log("Error during login", err);
        res.status(500).json({message:'Error logging in'});
    }
});

app.post('/signup', async(req, res) => {
    const {email, password, username} = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({email, password:hashedPassword, username});
        await newUser.save();
        res.status(201).json({message:'User Created Successfully'});
    }
    catch(err) {
        console.log('Err saving user', err);
        res.status(500).json({message: 'Error creating User'});
    }
});


app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    }
    catch(err) {
        console.log('Error while fetching users list', err);
        res.status(500).send('Error While fetching Users list');
    }
});

app.delete('/users/:id', async(req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByIdAndDelete(userId);
        if (user) {
            deletedUserStack.push(user);
        }
        res.status(204).send();
    }
    catch(err) {
        console.log('Error while deleting the user', err);
        res.status(500).send('Error while deleting the User from the list');
    }
});

app.post('/users/undo', async(req, res) => {
    try {
        if (deletedUserStack.length > 0) {
            console.log('deleted user stack', deletedUserStack)
            const lastDeletedUser = deletedUserStack.pop();
            if (lastDeletedUser) {
                const {_id, ...userData } = lastDeletedUser;
                const restoreUser = new User(userData);
                await restoreUser.save();
                res.status(200).send(restoreUser);
            }
        }
        else {
            res.status(400).send('No undo user found');
        }
    }
    catch(err) {
        console.log('Error while doing undo', err);
        res.status(500).send('Error while undo');
    }
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../task-frontend/build/index.html'));
});

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
  });
  
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});