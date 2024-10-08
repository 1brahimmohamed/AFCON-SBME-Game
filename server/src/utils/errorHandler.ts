class ErrorHandler extends Error {

    private isOperational: boolean;
    private statusCode: number;
    private status: string;

    constructor(message: string, statusCode: number) {

        // call the parent constructor
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        // capture the stack trace
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ErrorHandler;
