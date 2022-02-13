export default function (asyncHandler: any) {
  return function (req, res, next): void {
    const response = asyncHandler(req, res);

    (response as Promise<void>)
      .then(function (response) {
        res.locals = res.locals ? res.locals : {};
        res.locals.response_data = response;

        next(null);
      })
      .catch(function (err) {
        return next(err);
      });
  };
}
