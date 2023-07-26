const { celebrate, Joi } = require('celebrate');

/* module.exports.validationCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().max(30).min(2),
    about: Joi.string().required().max(30).min(2),
    avatar: Joi.string()
      .required()
      .pattern(
        /(http|https):\/\/(www\.)?[a-z0-9]([\w.[](),_!@?=*;&$':\/~+#-](#)?)/,
      ),
  }),
}); */

module.exports.validationCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().max(30).min(2),
    about: Joi.string().max(30).min(2),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
});

module.exports.validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
});
