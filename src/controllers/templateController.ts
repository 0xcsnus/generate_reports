import carbone from 'carbone';
import fs from 'fs';
import logger from '../logger';
import { Request, Response } from 'express';

export const generateDocx = async (req: Request, res: Response) => {
    const data = req.body;

    try {
        carbone.render('./templates/template.docx', data, function (err, result) {
            if (err) {
                logger.error(err);
                return res.status(500).json({ message: 'Error generating .docx file' });
            }

            const timestamp: string = new Date().toISOString().replace(/:/g, '-');
            const outputFilePath: string = `output/agreement${timestamp}.docx`;

            try {
                fs.writeFileSync(outputFilePath, result);
                res.status(200).json({ message: `File generated at ${outputFilePath}` });
                logger.info(data.id);
            } catch (writeErr) {
                logger.error(writeErr);
                return res.status(500).json({ message: 'Error writing .docx file' });
            }
        });
    } catch (e) {
        logger.error(e);
        res.status(500).end();
    }
};
