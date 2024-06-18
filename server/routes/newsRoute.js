import express from "express"
import {DeleteNews, addNews, getSinglenews, getcomments, getlikes, getnews, getviews, updateNews} from "../controller/newscontroller.js"
import { register,login, logout, getMyProfile } from "../controller/user.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();
router.post('/new', register)
router.post('/login', login)
router.get('/logout', logout)
router.get('/me',isAuthenticated,getMyProfile)
router.post('/newsubmit', addNews);
router.get('/getnews', getnews);
router.get('/getsinglenews/:id', getSinglenews);
router.put('/updatenews/:id', updateNews);
router.delete('/deletenews/:id', DeleteNews);
router.get('/getlikes', getlikes);
router.get('/getviews', getviews);
router.get('/getcomments', getcomments);

export default router