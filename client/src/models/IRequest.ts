export interface IRequest {
    state: RequestState;
    message: string;
}

export enum RequestState {
    Idle = 0,
    Loading,
    Error,
    Successful,
}
