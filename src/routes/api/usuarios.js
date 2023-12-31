const router = require('express').Router();
const UsuariosController = require('../../controllers/usuarios.controller');
const { checkRole, preAuthMiddleware, checkToken } = require('../../middlewares/auth.middleware');

router.get('/todos', UsuariosController.getAllUsuarios);
router.get('/todos/pag', UsuariosController.getAllUsuariosByPage);
router.get('/:usuarioId', UsuariosController.getUsuarioById);
router.get('/clases/:usuarioId',checkToken, checkRole(['prof', 'alumn']), UsuariosController.getClasesByUsuarioId);
router.get('/conexion/:profesorId',checkToken, checkRole(['prof', 'alumn']), UsuariosController.getInfoProfesorByConexion);
router.get('/especialidades/:profesorId', checkToken, checkRole(['prof','alumn']), UsuariosController.getEspecialidadByProfesorId)
router.get('/foro/:profesorId&:alumnoId', checkToken, checkRole(['prof', 'alumn']), UsuariosController.getChatByUsuariosId)
router.get('/clases/:profesorId&:alumnoId&:especialidadId', checkToken, checkRole(['prof','alumn']), UsuariosController.getClasesByUsuariosId)
router.get('/puntuaciones/:profesorId', UsuariosController.getPuntuaciones)
router.get('/puntuaciones/:profesorId&:alumnoId', UsuariosController.getPuntuacionesByProfesorId)

router.get('/alumnos/:profesorId',checkToken, checkRole(['prof','alumn']), UsuariosController.getAlumnosByProfesorId)
router.post('/register', preAuthMiddleware, UsuariosController.register)
router.post('/login', preAuthMiddleware, UsuariosController.login)
router.post('/agenda/:profesorId/clases', checkToken, checkRole(['prof']), UsuariosController.insertClaseByProfesor)
router.post('/firstClass/:profesorId/clases', checkToken, checkRole(['prof']), UsuariosController.insertFirstClase)
router.post('/comentario/:profesorId/foro/:alumnoId', checkToken, checkRole(['prof', 'alumn']), UsuariosController.insertChatByUsersId)
router.post('/solicitud/:profesorId&:alumnoId&:especialidadId',checkToken, checkRole(['prof','alumn']), UsuariosController.insertAlumnoByProfesorId)
router.post('/opinion', checkToken, checkRole(['alumn']), UsuariosController.insertOpinionByUserId)
router.post('/:usuarioId',UsuariosController.sendRequest)
router.put('/clases/:profesorId&:alumnoId&:especialidadId',checkToken, checkRole(['prof','alumn']), UsuariosController.updateAlumnoByProfesorId)
router.put("/:usuarioId", checkToken, UsuariosController.updateUsuario)
router.put("/form/:usuarioId", checkToken, UsuariosController.updateUsuarioForm)
//pendiente
router.delete('/clases/:id', checkToken, checkRole(['prof','alumn']), UsuariosController.deleteClaseByProfesorId)
router.delete('/especialidades/:profesorId&:especialidadId', checkToken, checkRole(['prof']), UsuariosController.deleteEspecialidadByUsuario)
router.delete('/conexion/:profesorId&:alumnoId&:especialidadId',checkToken, checkRole(['prof','alumn']), UsuariosController.deleteAlumnoByProfesorId)

module.exports = router;
