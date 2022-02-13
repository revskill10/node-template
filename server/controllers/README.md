Controller coordinates usecases, this is where dependencies for use cases are created and injected

Controller is NOT related to HTTP, it could be reused for RESTUL API, console, queue,..

http api => controller + middleware

controller => usecase + usecase

usecase => repository

user => [middlewares] => controller (usecases) => [repository] domain [entity/errors/events] => [resources]