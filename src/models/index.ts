import { quickDbInstance } from './database'
import seed from './seed'

(async function() {
    await seed();
    console.log( await quickDbInstance.db?.get('q-5'))
})()