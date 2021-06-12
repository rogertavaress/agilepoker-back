import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import VotesController from '../controllers/VotesController';

const votesRouter = Router();
const votesController = new VotesController();

votesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      number: Joi.number().required(),
      participant_id: Joi.string().required(),
      history_id: Joi.string().required(),
      meet_id: Joi.string().required(),
    },
  }),
  votesController.store,
);

export default votesRouter;
