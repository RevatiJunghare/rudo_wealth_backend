import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { UserController } from '../controller/user.controller';
import { GroupController } from '../controller/GroupController';

const router = Router();

router.get('/profile', authenticate, UserController.getProfile.bind(UserController));
router.get('/balances', authenticate, UserController.getGlobalBalances.bind(UserController));

router.post('/groups', authenticate, GroupController.create.bind(GroupController));
router.get('/groups/:id/balances', authenticate, GroupController.getGroupBalances.bind(GroupController));

export default router;
