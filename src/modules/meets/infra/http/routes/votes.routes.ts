import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import VotesController from '../controllers/VotesController';

const votesRouter = Router();
const votesController = new VotesController();

votesRouter.post(
  '/create',
  celebrate({
    [Segments.BODY]: {
      number: Joi.number().required(),
      participantId: Joi.string().required(),
      historyId: Joi.string().required(),
      meetId: Joi.string().required(),
    },
  }),
  votesController.store,
);

export default votesRouter;
