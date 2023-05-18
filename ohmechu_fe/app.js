import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

import 'dotenv/config'; // 환경변수 사용
import express from 'express';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/src/pages/main/index.html`);
});

const handleListening = () => {
  console.log(`✅ Server listening on port ${PORT}`);
};

app.listen(PORT, handleListening);

export default app;
