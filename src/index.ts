import "./setup";
import express from 'express';
import path from 'path';
import staticFiles from './static';
import session from 'express-session';
import constatns from './constants';
import cors from "cors";
const cookieParser = require('cookie-parser');

import seed from "./models/seed";
import { getQuestionRoute, addAnswersRoute, getResults } from "./routes";

const { PORT, build, exceptEndpoints } = constatns;

(async () => {
    await seed();
})();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));

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
app.get('/score', getResults );


app.listen(PORT, () => {
    console.log(`App live :${PORT}`);
});
