const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

//User Model
const User = require('../../models/User');

//Admin Model

const Admin = require('../../models/Admin')


//@route   POST api/auth
//@desc    Authenticate users
// @access  Public

router.post('/', (req, res) => {
    const { email, password } = req.body;

    //Simple Validation
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    //Check for existing User
    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(400).json({ msg: 'User does not exists' });

            //Validate Password
            bcrypt.compare(password, user.password, function (err, isMatch) {
                if (err) {
                    throw err
                } else if (!isMatch) {
                    return res.status(400).json({ msg: 'Password does not match!' });
                } else
                    jwt.sign(
                        { id: user.id },
                        config.get('jwtSecret'),
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            });
                        })
            })
        })
});

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private

router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user))
});

router.post("/admin", async (req, res) => {
    const { username, password } = req.body;
    //Simple Validation
    if (!username || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }
    const admin = await Admin.findOne({ username });
    if (admin)
        return res
            .status(400)
            .json({ msg: "Username already exist" });

    const newAdmin = new Admin({
        username,
        password
    });
    const main = await newAdmin.save();
    res.json({
        main
    });
})

router.post("/admin_login", async (req, res) => {
    const { username, password } = req.body;
    //Simple Validation
    if (!username || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }
    const admin = await Admin.findOne({ username: username });
    if (!admin)
        return res
            .status(400)
            .json({ msg: "There is no username as per your input" });

    if (password !== admin.password) {
        return res.status(400).json({ msg: "Wrong password" });
    }
    const token = jwt.sign({ id: admin._id }, config.get('jwtSecret'));
    res.json({
        token,
        user: {
            id: admin._id,
            username: admin.username,
        },
    });
})

router.get("/alluser", async (req, res) => {
    try {
        const user = await User.find();
        console.log(user);
        res.json(user);
    }
    catch (err) {
        return res.status(500).json('error');
    }
}
);

router.delete('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(User => User.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }))
})
module.exports = router;
