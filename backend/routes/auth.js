const router = require("express").Router();
const User = require("../models/User")
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//Register

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if username or email already exist in the database
        const existingUser = await User.findOne({
            $or: [{ username }, { email }],
        });

        if (existingUser) {
            return res.status(400).json({
                error: "Username or email already exists.",
            });
        }

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: CryptoJS.AES.encrypt(
                password,
                process.env.PASS_SEC
            ).toString(),
        });

        // Save the new user
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});


//Login

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if(!user)
        {return res.status(401).json("Wrong credentials!")}

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );
        const enteredPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        
            if(enteredPassword != req.body.password)
            {return res.status(401).json("Wrong credentials!")}
             const accessToken = jwt.sign({
                id:user._id,
                isAdmin: user.isAdmin,
                username: user.username,
             }, process.env.JWT_SEC,
                {expiresIn:"3d"}
             ); 

        const {password, ...others} = user._doc;

        res.status(200).json({...others, accessToken})
    } catch (err) {
        res.status(500).json(err);
    }

})

module.exports = router;