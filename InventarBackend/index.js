const express = require('express');
const db = require('./db'); // import database
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// GET /items => vrne vse
app.get('/api/items', (req, res) => {
  db.all('SELECT * FROM items', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// POST /items => doda en item
app.post('/api/items', (req, res) => {
  const { name, category, firm, price, stock } = req.body;
  db.run(
    `INSERT INTO items (name, category, firm, price, stock) VALUES (?,?,?,?,?)`,
    [name, category, firm, price, stock],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID });
    }
  );
});

// PUT /items/:id => posodobi
app.put('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const { name, category, firm, price, stock } = req.body;
  db.run(
    `UPDATE items SET name=?, category=?, firm=?, price=?, stock=? WHERE id=?`,
    [name, category, firm, price, stock, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ updated: this.changes });
    }
  );
});

// DELETE /items/:id
app.delete('/api/items/:id', (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM items WHERE id=?`, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ deleted: this.changes });
  });
});

// Chat endpoint
app.post('/chat', async (req, res) => {
  const { question } = req.body;
  // TUKAJ poklici LLM (npr. ollama) => process question
  // Primer laznje implementacije:
  // 1) pridobis sezam items
  // 2) Klices ollama z prompt-om
  //    const answer = 'Sem dummy chatbot: vprasanje = ' + question;
  //    const foundItems = [];
  // => Ko bos dejansko integriral z ollamo => poglej ollama doc
  db.all('SELECT * FROM items', [], async (err, items) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Teoretično: sestavimo prompt => npr. 'Imas tele artikle: ... user question: ...'
    // Potem s fetch klicem posiljas na ollama v local
    // const ollamaRes = await fetch('http://localhost:11411/generate', { ... });
    // const data = await ollamaRes.json();
    // recimo data.content = 'Odgovor..'
    const answer = 'Odgovor iz LLM (placeholder).';

    // Ce zelis specificne items => npr. iskanje po questionu:
    const foundItems = items.filter(i =>
      question.toLowerCase().includes(i.name.toLowerCase())
    );

    return res.json({ answer, foundItems });
  });
});

// Listen
const PORT = 3000;
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
