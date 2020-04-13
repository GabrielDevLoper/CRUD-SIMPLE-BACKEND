const User = require('../models/User');

module.exports = {
    async authentic(req, res) {
        const user = await User.findById(req.userId);

        const { email } = user;

        return res.json({user: `${email}`});
    }
}