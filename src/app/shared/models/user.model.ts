export class User {

  public id: string;
  public firstName: string;
  public lastName: string;
  public password: string;
  public email: string;
  public role: string;

  constructor(id: string, firstName: string, lastName: string, password: string, email: string, role: string){
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.email = email;
    this.role = role;
  }

}
