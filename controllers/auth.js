const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require("jsonwebtoken");
exports.register = async (req, res) => {
    try {
        //check user
        const { username, firstname, lastname, email, tel, password } = req.body;
        var user = await User.findOne({ username })
        console.log(user)
        if (user) {
            return res.status(400).send("User Already exists");
        }
        const salt = await bcrypt.genSalt(10)
        user = new User({
            username,
            firstname,
            lastname,
            email,
            tel,
            password,
        });
        //Encrypt
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        res.send('Register Success');


    } catch (err) {
        console.log('err')
        res.status(500).send('Server Error!')

    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        var user = await User.findOneAndUpdate({ username }, { new: true });
        if (user && user.enabled) {
            //checkPassword
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).send("Password invalid !!")
            }

            //Payload
            const payload = {
                user: {
                    _id: user._id,
                    username: user.username,
                    role: user.role,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    tel: user.tel,
                    address: user.address,
                    createdAt: user.createdAt
                },
            };
            //Gen token
            jwt.sign(payload, 'jwtSecret',
                { expiresIn: 21600 }, (err, token) => {
                    if (err) throw err;
                    res.json({ token, payload })
                });

        } else {
            return res.status(400).send("User not found!!");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("server error!!");
    }
};

exports.currentUser = async (req, res) => {
    try {
        //Model user
        //console.log(req.user)
        const user = await User.findOne({ username: req.user.username })
            .select('-password').exec();
        res.send(user);
    } catch (err) {
        console.log(err)
        res.status(500).send("Server Error!!");
    }
}







exports.listUser = async (req, res) => {
    try {

        res.send('list get user')
    } catch {
        console.log('err')
        res.status(500).send('Server Error!')

    }
};
exports.editUser = async (req, res) => {
    try {

        res.send('list get user')
    } catch {
        console.log('err')
        res.status(500).send('Server Error!')

    }
}
exports.deleteUser = async (req, res) => {
    try {

        res.send('list get user')
    } catch {
        console.log('err')
        res.status(500).send('Server Error!')

    }
}