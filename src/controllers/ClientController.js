const Client = require('../models/Client');

module.exports = {
    async index(req, res) {
        const client = await Client.find();

        return res.json(client);
    },

    async store(req, res) {
        const { name, cpf, email } = req.body;

        const clientEmail = await Client.findOne({email});

        if(clientEmail) {
            return res.json({ email: "Email ja utilizado" })
        }

        const clientCpf = await Client.findOne({cpf});

        if(clientCpf) {
            return res.json({ cpf: "CPF ja utilizado" })
        }

        const client = await Client.create({
            name,
            cpf,
            email,
        });

        return res.json({ message: `${name} Cadastrado com sucesso` });
    },
    
    async delete(req, res) {
        const { id } = req.params;

        await Client.findByIdAndDelete(id);

        return res.send('Excluído com sucesso');
    },

    async update(req, res) {
        //const { id } = req.params;
        //const { name, cpf, email } = req.body;

        const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });

        const { name } = client;

        return res.json({ message: `${name} Editado com sucesso` });
    },

    async show(req, res) {
        const { id } = req.params;

        const client = await Client.findById(id);

        return res.json(client);
    }
}