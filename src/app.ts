import 'reflect-metadata';
import './shared/infra/configs/env';
import 'express-async-errors';

import swaggerDocs from '~/docs';
import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';

import './shared/infra/configs/db/mongo';

import { versions } from './shared/infra/configs/versions';
import router from './shared/infra/routes';
import { errors } from './shared/domain/errors/customErrors';

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use(`/v1/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/uploads', express.static('uploads'));

app.use(versions.current, router);

app.use(errors);

export default app;
