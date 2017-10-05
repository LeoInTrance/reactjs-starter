import fs from 'fs';
import fse from 'node-fs-extra';
import path from 'path';
import express from "express";
import favicon from 'serve-favicon';
import compression from 'compression'

import index from './source/index.js';

import { config } from './../config/config.js';

const app = express();
app.use(compression());
app.use(express.static(path.resolve(process.cwd(), './public')));

if (process.env.NODE_ENV !== "development") {
  app.use(favicon(path.resolve(process.cwd(), './public/favicon.ico')))
  fse.copy(path.resolve(process.cwd(), './.build/bundle.js'), path.resolve(process.cwd(), './public/javascripts/bundle.js'));
  fse.copy(path.resolve(process.cwd(), './.build/style.css'), path.resolve(process.cwd(), './public/stylesheets/style.css'));
}

app.get('/config', (req, res, next) => {
  res.json(config);
});

app.get('/healthcheck', (req, res, next) => {
  res.json({ success: true, uptime: process.uptime() });
});

app.get("*", index);

export default app;
