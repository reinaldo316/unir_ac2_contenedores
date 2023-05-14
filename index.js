const express = require('express');
const mongoose = require('mongoose');

const Animal = mongoose.model('Animal', new mongoose.Schema({
  tipo: String,
  estado: String,
}));

const app = express();

mongoose.connect('mongodb://root:password@mongo:27017/miapp?authSource=admin', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error: ', err));

app.get('/', async (_req, res) => {
  console.log('listando... chanchitos...');
  try {
    const animales = await Animal.find();
    return res.send(animales);
  } catch (err) {
    console.log(err);
    return res.status(500).send('Error al obtener animales');
  }
});

app.get('/crear', async (_req, res) => {
  console.log('creando...');
  try {
    await Animal.create({ tipo: 'Chanchito', estado: 'Feliz' });
    return res.send('ok');
  } catch (err) {
    console.log(err);
    return res.status(500).send('Error al crear animal');
  }
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection:', err);
  process.exit(1);
});

app.listen(3000, () => console.log('listening...'));
