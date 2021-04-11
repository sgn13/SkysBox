const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

//User Model
const User = require('../../models/User');


//@route   POST api/users
//@desc    Register new users
// @access  Public

router.post('/', (req, res) => {
    const { name, email, password, password2 } = req.body;


    //Simple Validation
    if (!name || !email || !password || !password2) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    if (password.length < 5) {
        return res
            .status(400)
            .json({ msg: "The password must to be atleast 5 characters long." });
    }

    if (password !== password2) {
        return res.status(400).json({ msg: 'Password did not match' })
    }

    //Check for existing User
    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ msg: 'User already exists' });


            const newUser = new User({
                name,
                email,
                password
            });

            //Create salt & hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
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


                                }
                            )


                        })

                })
            })
        })
});

module.exports = router;
