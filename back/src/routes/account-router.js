'use strict';

import { Router } from 'express';
import { json } from 'body-parser';
import HttpError from 'http-errors';

import logger from '../lib/logger';

const accountRouter = new Router();
const jsonParser = json();

