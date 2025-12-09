const {createTask, getAllTasks, updateTask, deleteTask} = require('../controllers/taskController');
const { authMiddleware } = require('../middlewares/auth');
const router = require('express').Router()

router.use(authMiddleware);

router.post('/projects/:projectId/tasks', createTask);
router.get('/projects/:projectId/tasks', getAllTasks);
router.put('/tasks/:taskId', updateTask);
router.delete('/tasks/:taskId', deleteTask)

module.exports = router;