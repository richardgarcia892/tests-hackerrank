const { isNumber } = require('lodash');

const PAGE_DEFAULT = 1;
const LIMIT_DEFAULT = 3;

module.exports = (req, res, next) => {
  let { page, limit, q } = req.query;
  page = page ? parseInt(page) : PAGE_DEFAULT;
  limit = limit ? parseInt(limit) : LIMIT_DEFAULT;
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const searchTerm = q;
  const search = q;
  console.log({ page, limit, q });
  const context = { page, limit, skip, searchTerm, search };
  req.context = context;
  next();
};
