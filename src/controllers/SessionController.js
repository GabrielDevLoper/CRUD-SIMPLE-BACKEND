const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    async store(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if(!user){
            return res.status(404).json({message: "Email de usuário não existe"})
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);

        if(!isPasswordCorrect){
            return res.status(401).json({ message: "Senha Incorreta" });
        }

        return res.json({
            token: jwt.sign({ userId: user._id }, process.env.APP_SECRET, {
                expiresIn: '2d',
            })
        });
    }
}