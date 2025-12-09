const router = require('express').Router();
const {createProject, getAllProjects, getProjectByID, updateProject, deleteProject} = require('../controllers/projectControllers');
const { authMiddleware } = require('../middlewares/auth');

router.use(authMiddleware);

router.post('/', createProject)
router.get('/', getAllProjects)
router.get('/:id', getProjectByID)
router.put('/:id', updateProject)
router.delete('/:id', deleteProject)

module.exports = router;