import "./setup";
import express, { Request, Response } from 'express';
import path from 'path';
import staticFiles from './static';
import session from 'express-session';
import constatns from './constants';

import seed from "./models/seed";
import { getQuestionRoute } from "./routes";

const { PORT, build, exceptEndpoints } = constatns;

(async () => {
    await seed();
})();

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

app.use(express.static(path.resolve(`./${build}`)));

app.get("*", staticFiles(exceptEndpoints));
app.get(`/question/:id`, getQuestionRoute );

app.listen(PORT, () => {
    console.log(`App live :${PORT}`);
});
