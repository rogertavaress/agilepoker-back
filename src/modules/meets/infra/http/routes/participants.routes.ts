import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ParticipantsController from '../controllers/ParticipantsController';

const participantsRouter = Router();
const participantsController = new ParticipantsController();

participantsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      idMeet: Joi.string().required(),
      name: Joi.string().required(),
    },
  }),
  participantsController.store,
);

export default participantsRouter;
