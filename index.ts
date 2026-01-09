import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import admin from 'firebase-admin';
import { AppDataSource } from './AppDataSource';
import routes from './routes';

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

// Firebase init from env
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),
});

AppDataSource.initialize().then(() => {
  app.use('/api', routes);
  app.listen(3000, () => console.log('Server running on port 3000'));
});
