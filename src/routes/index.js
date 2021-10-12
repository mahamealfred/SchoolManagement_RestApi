import { Router } from 'express';
import UserRoutes from './auth.routes';
import classroomsRoutes from './classrooms.routes';
import StudentRoutes from './student.routes';
import LecturerRoutes from './lecturer.routes';



const route = Router();

route.use('/auth', UserRoutes);
route.use('/classroom',classroomsRoutes);
route.use('/student',StudentRoutes);
route.use('/lecturer',LecturerRoutes);

export default route;