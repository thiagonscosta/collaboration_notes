export class UserModel {

    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    username: string;

    email: string;

    password: string;
}