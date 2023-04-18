import "./setup";
import express from 'express';
import path from 'path';
import staticFiles from './static';
import session from 'express-session';
import constatns from './constants';
const cookieParser = require('cookie-parser');

import seed from "./models/seed";
import { getQuestionRoute, addAnswersRoute, getScore } from "./routes";

const { PORT, build, exceptEndpoints } = constatns;

(async () => {
    await seed();
})();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

 
app.use(express.static(path.resolve(`./${build}`)));
app.get("*", staticFiles(exceptEndpoints));
app.get('/question/:id', getQuestionRoute );
app.post('/answers', addAnswersRoute);
app.get('/score', getScore );


app.listen(PORT, () => {
    console.log(`App live :${PORT}`);
});
