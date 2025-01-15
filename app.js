const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

let livros = [
];

app.post('/livros', (req, res) => {
  const novoLivro = { ...req.body, id: livros.length + 1 };
  livros.push(novoLivro);
  res.status(201).json(novoLivro);
});

app.get('/livros', (req, res) => {
  res.json(livros);
});

app.get('/livros/:id', (req, res) => {
  const livro = livros.find(l => l.id === parseInt(req.params.id));
  if (livro) {
    res.json(livro);
  } else {
    res.status(404).send('Livro não encontrado');
  }
});

app.put('/livros/:id', (req, res) => {
  const livroIndex = livros.findIndex(l => l.id === parseInt(req.params.id));
  if (livroIndex !== -1) {
    livros[livroIndex] = { ...livros[livroIndex], ...req.body };
    res.json(livros[livroIndex]);
  } else {
    res.status(404).send('Livro não encontrado');
  }
});

app.delete('/livros/:id', (req, res) => {
  const livroIndex = livros.findIndex(l => l.id === parseInt(req.params.id));
  if (livroIndex !== -1) {
    const livroRemovido = livros.splice(livroIndex, 1);
    res.json(livroRemovido);
  } else {
    res.status(404).send('Livro não encontrado');
  }
});

app.get('/livros/editora/:editora', (req, res) => {
  const livrosEditora = livros.filter(l => l.editora === req.params.editora);
  res.json(livrosEditora);
});

app.get('/livros/titulo/:keyword', (req, res) => {
  const livrosTitulo = livros.filter(l => l.titulo.includes(req.params.keyword));
  res.json(livrosTitulo);
});

app.get('/livros/preco/maior/:preco', (req, res) => {
  const livrosPrecoMaior = livros.filter(l => l.preco > parseFloat(req.params.preco));
  res.json(livrosPrecoMaior);
});

app.get('/livros/preco/menor/:preco', (req, res) => {
  const livrosPrecoMenor = livros.filter(l => l.preco < parseFloat(req.params.preco));
  res.json(livrosPrecoMenor);
});

app.get('/livros/mais-recentes', (req, res) => {
  const livrosOrdenados = [...livros].sort((a, b) => b.ano - a.ano);
  res.json(livrosOrdenados);
});

app.get('/livros/mais-antigos', (req, res) => {
  const livrosOrdenados = [...livros].sort((a, b) => a.ano - b.ano);
  res.json(livrosOrdenados);
});

app.get('/livros/sem-estoque', (req, res) => {
  const livrosSemEstoque = livros.filter(l => l.quant === 0);
  res.json(livrosSemEstoque);
});

app.use((req, res) => {
  res.status(404).send('Endpoint não encontrado');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

