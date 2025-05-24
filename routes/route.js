import express from 'express';
import addSchool from '../controllers/addSchool.js';
import listSchool from '../controllers/listSchools.js';

const apiRouter = express.Router();

// to add school details
apiRouter.post('/addSchool',addSchool);
// to get the school based on user's location
apiRouter.get('/listSchool',listSchool);

export default apiRouter;