import nextVitals from 'eslint-config-next/core-web-vitals'
import configPrettier from 'eslint-config-prettier';
import path from 'path';
import { fileURLToPath } from 'url';

export default [
  ...nextVitals,
  configPrettier,
];
