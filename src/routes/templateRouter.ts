import express from 'express';
import {generateDocx} from '../controllers/templateController'

const router = express.Router()


router.route('/generate')
.post(generateDocx)


export default router;