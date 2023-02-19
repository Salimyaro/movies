export default class ApiError extends Error {
  status;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }

  static BadRequest(message: string): ApiError {
    return new ApiError(400, message);
  }

  static UnauthorizedError(message: string): ApiError {
    return new ApiError(401, message);
  }

  static ForbiddenError(message: string): ApiError {
    return new ApiError(403, message);
  }

  static NotFoundError(message: string): ApiError {
    return new ApiError(404, message);
  }
  static Conflict(message: string): ApiError {
    return new ApiError(409, message);
  }

  static InternalServerError(message: string): ApiError {
    return new ApiError(500, message);
  }
}
