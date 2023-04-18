import constants from '../constants';  
import { Request } from 'express';

export function getUserId(req: Request) {
    const test = constants.test;
    return  req.hostname === 'localhost' && req.headers[test] ? req.headers[test] : req.cookies[constants.connectKey];
}