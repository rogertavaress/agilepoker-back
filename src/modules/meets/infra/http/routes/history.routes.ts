import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import HistoryController from '../controllers/HistoryController';

const historyRouter = Router();
const historyController = new HistoryController();

historyRouter.post(
  '/create',
  celebrate({
    [Segments.BODY]: {
      meetId: Joi.string().required(),
      name: Joi.string().required(),
      category: Joi.string(),
    },
  }),
  historyController.store,
);

historyRouter.post(
  '/remove',
  celebrate({
    [Segments.BODY]: {
      id: Joi.number().required()
    },
  }),
  historyController.destroy,
);

export default historyRouter;
