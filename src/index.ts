import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import staticFiles from './staticFiles';

import constatns from './constants';

const { PORT, build, exceptEndpoints } = constatns;
const app = express();

app.use(express.static(path.resolve(`./${build}`)));

app.get("*", staticFiles(exceptEndpoints));
app.get('/get-data', (req: Request, res: Response) => {
    const data = { message: 'This is some data from the server!' };
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`App live :${PORT}`);
});
