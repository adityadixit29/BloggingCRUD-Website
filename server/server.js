import {app} from "./app.js"
import { connectDB } from "./database/db.js"
connectDB()
const port = 4000

app.listen(port, (req,res)=>{
    console.log(`The server is running on port ${port}`);
});