export interface ApiResponse<T> {
 status: string,
 data: T,
 message?: string
}

export interface PaginatedResponse<T> {
     status: string,
     data: T,
     meta: {
        page: number,
        pageSize: number,
        total: number,
        totalPages: number
     }
}

export class ApiError extends Error {
    public readonly status: string;
    public readonly errorCode: string;
    public readonly details?: Record<string, string[]>;

    constructor(
        message: string = 'An unknown API error occurred',
        status: string,
        errorCode: string,
        details?: Record<string, string[]>
    ) {
        super(message);
        
        // Ensure the error name is set to the class name
        this.name = 'ApiError';
        
        this.status = status;
        this.errorCode = errorCode;
        this.details = details;

        // Required to make `instanceof ApiError` work properly when extending Error
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}