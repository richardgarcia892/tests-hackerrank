const { isNumber } = require('lodash');
var recipes = require('../recipes.json');
var router = require('express').Router();

router.get(
  '/',
  (req, res, next) => {
    const { page, limit, q } = req.query;
    console.log({ page, limit, q });
    let context = {};
    context = {
      page: isNumber(page) ? parseInt(page) : 1,
      limit: isNumber(limit) ? parseInt(limit) : 3,
      skip: (parseInt(page) - 1) * parseInt(limit),
      searchTerm: q,
      search: q,
    };
    req.context = context;
    next();
  },
  (req, res) => {
    const { context } = req;
    let results = [];
    if (context.searchTerm) {
      results = recipes.filter(({ name }) => name.match(context.search));
    } else {
      results = recipes;
    }
    results = results.slice(context.skip, context.skip + context.limit);
    res.json({
      page: context.page,
      limit: context.limit,
      skip: context.skip,
      search: context.searchTerm,
      data: results,
    });
  }
);

module.exports = router;
