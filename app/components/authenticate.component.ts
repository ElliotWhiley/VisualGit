import { Component } from "@angular/core";


@Component({
  selector: "user-auth",
  template: `
    <div class="authenticate" id="authenticate">
      <form role="form" style="text-align:center">
        <label>
          <h1>User Authentication</h1>
        </label>
        <div class="form-group">
          <label for="name">
            <p>Please Enter Your Username/Email</p>
          </label>
          <input type="text" name="username" size="50" id="username">
        </div>

        <div class="form-group">
          <label for="name">
            <p>Password</p>
          </label>
          <input type="password" name="password" size="50" id="password"/>
        </div>
        <p>
        <p>
        <button class="button-clone" (click)="switchToMainPanel()">Log In</button>
      </form>
    </div>
  `
})

export class AuthenticateComponent {
  switchToMainPanel(): void {
    getUserInfo();
    console.log(username);
    console.log(password);
    switchToMainPanel();
  }
}
