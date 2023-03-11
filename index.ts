import express,{ Application} from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import ip from 'ip'

dotenv.config();

const app:Application = express();
const PORT:any = process.env.SERVER_PORT;
const router = require("./src/routers/router");

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'));
app.use(cors());

app.use("/", router)

app.listen(PORT, () => {
  console.log(`Server is running at http://${ip.address()}:${PORT}`);
});