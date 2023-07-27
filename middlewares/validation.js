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
    email: Joi.string()
      .required()
      .pattern(
        /([a-zA-Z0-9]+)([_.\-{1}])?([a-zA-Z0-9]+)@([a-zA-Z0-9]+)([.])([a-zA-Z.]+)/,
      ),
    password: Joi.string().required(),
    avatar: Joi.string()
      .pattern(
        /(http|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])/,
      ),
  }),
});

module.exports.validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .pattern(
        /([a-zA-Z0-9]+)([_.\-{1}])?([a-zA-Z0-9]+)@([a-zA-Z0-9]+)([.])([a-zA-Z.]+)/,
      ),
    password: Joi.string().required(),
  }),
});

module.exports.validationCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().max(30).min(2),
    link: Joi.string().required()
      .pattern(
        /(http|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])/,
      ),
  }),
});

module.exports.validationUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required()
      .pattern(
        /(http|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])/,
      ),
  }),
});

module.exports.validationUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().max(30).min(2),
    aboute: Joi.string().required().max(30).min(2),
  }),
});
