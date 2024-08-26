const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const linkedinRouter = express.Router();
const app = express();
const PORT = 3333;

app.use(express.json());
app.use(cors());

const postagens = [];

// POST - Cria uma nova postagem
linkedinRouter.post('/postagens', (req, res) => {
    const { content, format } = req.body;
    const novaPostagem = {
        id: uuidv4(),
        content: content,
        format: format,
        created_at: new Date().toLocaleDateString('pt-BR')
    };

    postagens.push(novaPostagem);
    res.status(201).json({ message: `Postagem criada com sucesso`, postagem: novaPostagem });
});

// GET Lista todas as postagens
linkedinRouter.get('/postagens', (req, res) => {
    res.json(postagens);
});

// GET Lista uma postagem específica
linkedinRouter.get('/postagens/:id', (req, res) => {
    const { id } = req.params;
    const postagem = postagens.find(p => p.id === id);

    if (!postagem) {
        return res.status(404).json({ message: `Postagem com o id ${id} não encontrada` });
    }

    res.json(postagem);
});

// PATCH - Edita uma postagem específica
linkedinRouter.patch('/postagens/:id', (req, res) => {
    const { id } = req.params;
    const { content, format } = req.body;
    const postagem = postagens.find(p => p.id === id);

    if (!postagem) {
        return res.status(404).json({ message: `Postagem com o id ${id} não encontrada` });
    }

    if (content) {
        postagem.content = content;
    }

    if (format) {
        postagem.format = format;
    }

    res.json({ message: `Postagem com id ${id} editada com sucesso`, postagem });
});

// DELETE - Exclui uma postagem específica
linkedinRouter.delete('/postagens/:id', (req, res) => {
    const { id } = req.params;
    const index = postagens.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ message: `Postagem com o id ${id} não encontrada` });
    }

    postagens.splice(index, 1);
    res.json({ message: `Postagem com id ${id} excluída com sucesso` });
});

app.use('/linkedin', linkedinRouter);
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
