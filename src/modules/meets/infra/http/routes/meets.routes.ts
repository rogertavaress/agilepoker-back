import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import MeetsController from '../controllers/MeetsController';

const meetsRouter = Router();
const meetsController = new MeetsController();

meetsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required().messages({
        'string.empty': `Seu nome não pode ficar vazio`,
        'any.required': `Campo nome é obrigatório`,
      }),
      email: Joi.string().email().required().messages({
        'string.empty': `Seu email não pode ser vazio`,
        'string.email': `Email inválido`,
        'any.required': `Campo email é obrigatório`,
      }),
    },
  }),
  meetsController.store,
);

meetsRouter.get('/:id', meetsController.show);

meetsRouter.patch(
  '/status',
  celebrate({
    [Segments.BODY]: {
      meet_id: Joi.string().required().messages({
        'string.empty': `O código da reunião não pode ser vazio`,
        'any.required': `Campo código da reunião é obrigatório`,
      }),
      status_meet: Joi.string().required(),
    },
  }),
  meetsController.updateStatus,
);

meetsRouter.patch(
  '/historyNow',
  celebrate({
    [Segments.BODY]: {
      meet_id: Joi.string().required(),
      history_now_id: Joi.string().required(),
    },
  }),
  meetsController.updateHistoryNow,
);

export default meetsRouter;
