import express, { Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Hotel from '../models/Hotel.js';
import { downloadFile } from '../controllers/fileDownload.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const down = Router();
const upload = multer();

down.post('/download', upload.none(),downloadFile);

export default down;