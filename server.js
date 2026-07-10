const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'db.json');

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(__dirname));

// Endpoint para ler os animais
app.get('/api/animals', (req, res) => {
  fs.readFile(DB_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error("Erro ao ler o arquivo db.json:", err);
      return res.status(500).json({ error: "Erro ao ler o banco de dados" });
    }
    try {
      const animals = JSON.parse(data);
      res.json(animals);
    } catch (parseErr) {
      console.error("Erro ao decodificar JSON:", parseErr);
      res.status(500).json({ error: "Banco de dados corrompido" });
    }
  });
});

// Endpoint para atualizar ou inserir animais
app.post('/api/animals', (req, res) => {
  const updatedAnimals = req.body;
  if (!Array.isArray(updatedAnimals)) {
    return res.status(400).json({ error: "Corpo da requisição deve ser um array de animais" });
  }

  fs.writeFile(DB_FILE, JSON.stringify(updatedAnimals, null, 2), 'utf8', (err) => {
    if (err) {
      console.error("Erro ao escrever no arquivo db.json:", err);
      return res.status(500).json({ error: "Erro ao salvar no banco de dados" });
    }
    res.json({ success: true, message: "Banco de dados atualizado com sucesso!" });
  });
});

// Servir a página principal para qualquer outra rota
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(` Servidor rodando em: http://localhost:${PORT}`);
  console.log(` Conectado ao arquivo de banco de dados: db.json`);
  console.log(`==================================================`);
});
