const validator = require("validator");

const validate = (parameters) => {
  let title_validation =
    !validator.isEmpty(parameters.title) &&
    validator.isLength(parameters.title, { min: 5, max: undefined }); //true que esta bien

  let content_validation = !validator.isEmpty(parameters.content);

  if (!title_validation || !content_validation) {
    console.log("holaaa");
    throw new Error("No se ha validado la informacion");
  }
};

module.exports = {
  validate,
};
