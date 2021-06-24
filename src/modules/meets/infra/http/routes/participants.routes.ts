import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ParticipantsController from '../controllers/ParticipantsController';

const participantsRouter = Router();
const participantsController = new ParticipantsController();

participantsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      meet_id: Joi.string().required().messages({
        'string.empty': `O código da reunião não pode ser vazio`,
        'any.required': `Campo código da reunião é obrigatório`,
      }),
      name: Joi.string().required().messages({
        'string.empty': `Seu nome não pode ficar vazio`,
        'any.required': `Campo nome é obrigatório`,
      }),
    },
  }),
  participantsController.store,
);

participantsRouter.patch(
  '/location',
  celebrate({
    [Segments.BODY]: {
      participant_id: Joi.string().required().messages({
        'string.empty': `O código do participante não pode ser vazio`,
        'any.required': `Campo código do participante é obrigatório`,
      }),
      altitude: Joi.number().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
    },
  }),
  participantsController.updateLocation,
);

export default participantsRouter;
