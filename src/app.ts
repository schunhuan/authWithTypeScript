import express from 'express';
import 'express-async-errors';

import cookieSession from 'cookie-session';
// route
import { currentUserRouter } from './routes/currentuser';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
//middleware
import { errorHandler } from './middleware/errorhandler';
import { NotFoundError } from './errors/notfound-error';

const app = express();
app.set('trust proxy', true); //express trust request from proxy
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test', //scure = mean only set cookie with https request
  })
);
//route
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);
//after all route and not match any route not found
app.all('*', async () => {
  throw new NotFoundError();
});
//middleware errorHandler
app.use(errorHandler);

export { app };
