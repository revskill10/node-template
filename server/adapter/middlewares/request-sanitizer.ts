/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import _ from 'underscore';
import assert from 'assert-plus';

const escapeObject = function (obj, exclude) {
  return _.mapObject(obj, function (val, key) {
    return _.isString(val) && !_.contains(exclude, key) ? _.escape(val) : val;
  });
};
const escapeArray = function (arr, exclude) {
  return _.map(arr, function (val, key) {
    if (_.isString(val) && !_.contains(exclude, key)) {
      return _.escape(val);
    } else if (_.isObject(val)) {
      return escapeObject(val, exclude);
    } else {
      return val;
    }
  });
};
export default function (options) {
  assert.object(options);
  assert.optionalArrayOfString(options.exclude);

  return function (req, res, next) {
    req.params = escapeObject(req.params, options.exclude);

    req.query = escapeObject(req.query, options.exclude);

    req.body = _.mapObject(req.body, function (val, key) {
      if (_.isString(val) && !_.contains(options.exclude, key)) {
        return _.escape(val);
      } else if (_.isArray(val)) {
        return escapeArray(val, options.exclude);
      } else if (_.isObject(val)) {
        return escapeObject(val, options.exclude);
      } else {
        return val;
      }
    });

    next();
  };
}
