import "./setup";
import express, { Request, Response } from 'express';
import path from 'path';
import staticFiles from './static';
import session from 'express-session';
import constatns from './constants';

import seed from "./models/seed";
import { getQuestionRoute, addAnswersRoute } from "./routes";

const { PORT, build, exceptEndpoints } = constatns;

(async () => {
    await seed();
})();

const app = express();

app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

 
app.use(express.static(path.resolve(`./${build}`)));
app.get("*", staticFiles(exceptEndpoints));
app.get('/question/:id', getQuestionRoute );
app.post('/answers', addAnswersRoute );

app.listen(PORT, () => {
    console.log(`App live :${PORT}`);
});
