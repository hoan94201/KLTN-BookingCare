export enum ServerStatusCode {
    OK = 200,
    FOUND = 302,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNPROCESSABLE_CONTENT = 422,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    ALREADY_EXISTS = 409,
    INTERNAL_SERVER_ERROR = 500,
}
export enum SessionStatus {
    LOADING = "loading",
    AUTHENTICATED = "authenticated",
    UNAUTHENTICATED = "unauthenticated",
}
export enum StatusComponent {
    PATIENT = "R3",
    DOCTOR = "R2",
    ADMIN = "R1",
}
export enum positionEnum {
    ASSOCIATE_PROFESSOR = 'P3',
    PROFESSOR = 'P4',
    MASTER = 'P2',
    DOCTOR = "P0"
}
