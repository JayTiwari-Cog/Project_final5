import express, { Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Hotel from '../models/Hotel.js';
import { downloadFile } from '../controllers/fileDownload.js';
 import verifyTokenWithRoles from '../middleware/verifyWithRole.js';
import { verify } from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const down = Router();
const upload = multer();

down.post('/download', upload.none(), verifyTokenWithRoles(['manager']), downloadFile);

export default down;