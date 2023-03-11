import express,{Request,Response} from 'express'

const router = express.Router()
const booktype = require('./booktype')
const users = require('./users')
const book = require('./book')
const booklog = require('./booklog')

module.exports = router

router.get('/', (req:Request, res:Response) => res.send("router"));

router.use('/lib',booktype);
router.use('/user',users);
router.use('/book',book);
router.use('/booklog',booklog);