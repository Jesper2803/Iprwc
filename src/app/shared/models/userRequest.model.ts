export class UserRequest {

  public firstName: string;
  public lastName: string;
  public password: string;
  public email: string;

  constructor(firstName: string, lastName: string, password: string, email: string){
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.email = email;
  }

}
