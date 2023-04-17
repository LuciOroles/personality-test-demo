import "./setup";
import express, { Request, Response } from 'express';
import path from 'path';
import staticFiles from './static';
import session from 'express-session';
import constatns from './constants';

const { PORT, build, exceptEndpoints } = constatns;

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

app.use(express.static(path.resolve(`./${build}`)));

app.get("*", staticFiles(exceptEndpoints));
app.get('/get-data', (req: Request, res: Response) => {
    const data = { message: 'This is some data from the server!' };
    console.log(req.session, req.sessionID);
    // might use session storage;
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`App live :${PORT}`);
});
