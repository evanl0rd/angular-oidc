export class Login {
    id?: number;
    email: string;
    timestamp: string;

    constructor(email: string, timestamp: string) {
        this.email = email;
        this.timestamp = timestamp;
    }
}