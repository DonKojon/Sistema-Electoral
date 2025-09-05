const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

console.log('Iniciando backend...');
const db = require('./config/db');
db.connect((err) => {
	if (err) {
		console.error('Error de conexión a MySQL:', err);
	} else {
		console.log('Conexión a MySQL exitosa');
	}
});

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// Importar rutas
const authRoutes = require('./routes/auth');
const electionRoutes = require('./routes/election');
const voteRoutes = require('./routes/vote');
const resultRoutes = require('./routes/result');
const dbRoutes = require('./routes/db');
app.use('/api', authRoutes);
app.use('/api', electionRoutes);
app.use('/api', voteRoutes);
app.use('/api', resultRoutes);
app.use('/api', dbRoutes);


app.listen(PORT, () => {
	console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
