export class SaveUpdateResult<T>{
    public result: T;
    public errorCode: ErrorCode
}

enum ErrorCode {
    Success = 1,
	Error = 2
}