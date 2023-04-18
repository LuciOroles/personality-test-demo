import  { Request, Response, NextFunction } from 'express';
import fs from "fs";
import path from 'path';

import constatns from '../constants';

const { build } = constatns;

export default function staticFiles (exceptEndpoints: string[]) {
    function checkFileExists(req: Request, res: Response, next: NextFunction) {
        const filePath = path.join(__dirname, 'build', req.url);
        if (req.method !== 'GET') {
            next();
        } 
        const paths = req.url.split('/') || [];
        if ( exceptEndpoints.includes(paths[1])  || fs.existsSync(filePath)) {
            next();
        } else {
            res.sendFile(path.resolve(`./${build}/index.html`));
        }
    };

    return checkFileExists;
}

