import * as dotenv from 'dotenv';
require('dotenv').config();


declare global {
    namespace NodeJS {
      interface ProcessEnv {
        SESSION_SECRET: string;
      }
    }
  }