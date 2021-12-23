import { Joi, Segments } from "celebrate";

const todoSchema = {
  postTodo: {
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required().label("Todo title"),
      endDate: Joi.date().required().label("Todo end date"),
    }),
  },
  putTodo: {
    [Segments.PARAMS]: {
      id: Joi.string().required().label("Todo id"),
    },
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required().label("Todo title"),
      endDate: Joi.date().required().label("Todo end date"),
      status: Joi.string().required().label("Todo status"),
    }),
  },
  deleteTodo: {
    [Segments.PARAMS]: {
      id: Joi.string().required().label("Todo id"),
    },
  },
};

export default todoSchema;
