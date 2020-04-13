const User = require('../models/User');

module.exports = {
    async index(req, res) {
        const user = await User.find();

        return res.json(user);
    },

    async store(req, res) {
        const { firstName, lastName, email, password } = req.body;

        const userEmail = await User.findOne({email});

        if(userEmail) {
            return res.status(404).json({ message: "Email ja utilizado" })
        }
    
        const user = await User.create({
            firstName,
            lastName,
            email,
            password
        });

        return res.json({ message: `${firstName} ${lastName} Cadastrado com sucesso` })
    },

    async delete(req, res) {
        const { id } = req.params;

        const user = await User.findById(id);

        const { firstName, lastName } = user;

        await User.findByIdAndDelete(id);

        return res.json({ message:`${firstName} ${lastName} Excluido com sucesso`});
    }
}