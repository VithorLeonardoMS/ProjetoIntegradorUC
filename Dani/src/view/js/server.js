const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs-extra');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));  // se quiser servir arquivos estáticos

// Diretório uploads
const uploadsDir = path.join(__dirname, 'uploads');
fs.ensureDirSync(uploadsDir);

// Config multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const uniqueName = uuidv4() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error('Tipo de arquivo não suportado. Use JPG, PNG ou GIF.'));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});

// Simulação de armazenamento de perfis (em memória)
let profiles = {};

// Upload imagem perfil
app.post('/api/upload-profile-image', upload.single('profileImage'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Nenhum arquivo enviado' });
    }
    const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`;
    // Para simplicidade, usa IP como userId, mas ideal é autenticação real
    const userId = req.ip || 'default';
    if (!profiles[userId]) profiles[userId] = {};
    profiles[userId].avatarUrl = imageUrl;

    res.json({
      success: true,
      message: 'Imagem enviada com sucesso',
      avatarUrl: imageUrl,
      filename: req.file.filename
    });
  } catch (err) {
    console.error('Erro no upload:', err);
    res.status(500).json({ success: false, message: 'Erro interno do servidor' });
  }
});

// Rota para obter dados do usuário
app.get('/users/:userId', (req, res) => {
  const userId = req.params.userId || req.ip || 'default';
  const profile = profiles[userId] || {
    name: "Usuário Padrão",
    email: "usuario@exemplo.com",
    avatarUrl: "https://via.placeholder.com/150"
  };
  res.json(profile);
});

// Servir arquivos da pasta uploads
app.use('/uploads', express.static(uploadsDir));

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
