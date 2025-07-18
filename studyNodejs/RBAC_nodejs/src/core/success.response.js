'use strict';

const StatusCode = {
    OK: 200,
    CREATED: 201,
};

const ReasonStatusCode = {
    OK: 'Success!',
    CREATED: 'Created!',
};

class SuccessResponse {
    constructor({
        message,
        statusCode = StatusCode.OK,
        reasonStatusCode = ReasonStatusCode.OK,
        metadata = {},
    }) {
        this.message = message || reasonStatusCode;
        this.status = statusCode;
        this.metadata = metadata;
    }

    send(res, headers = {}) {
        return res.status(this.status).json(this);
    }
}

class OKResponse extends SuccessResponse {
    constructor({ message, metadata, options = {} }) {
        super({ message, metadata });
        this.options = options;
    }
}

class CreatedResponse extends SuccessResponse {
    constructor({
        message,
        statusCode = StatusCode.CREATED,
        reasonStatusCode = ReasonStatusCode.CREATED,
        metadata,
        options = {},
    }) {
        super({ message, statusCode, reasonStatusCode, metadata });
        this.options = options;
    }
}

export { OKResponse, CreatedResponse, SuccessResponse };
