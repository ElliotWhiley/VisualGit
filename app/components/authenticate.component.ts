import { Component } from "@angular/core";


@Component({
  selector: "user-auth",
  template: `
    <div class="authenticate" id="authenticate">
      <nav class="navbar navbar-inverse" role="navigation">
        <div class="container-fluid">
          <button class="btn btn-inverse dropdown-toggle btn-sm navbar-btn" id="color-scheme" data-toggle="dropdown">
            color
            <span class="caret"></span>
          </button>
          <ul class="dropdown-menu" id="color-dropdown" role="menu" aria-labelledby="branch-name">
            <li class="white" onclick="changeColor('white')">white</li>
            <li class="default" onclick="changeColor('default')">default</li>
          </ul>
        </div>
      </nav>
      <form role="form" style="text-align:center; margin-top:100px">
        <label>
          <h1>VisualGit</h1>
        </label>
        <br><br>
        <div class="input-group" style="width:280px;">
          <span class="input-group-addon" id="basic-addon1">@</span>
          <input id="username" type="text" class="form-control" placeholder="username" aria-describedby="basic-addon1">
        </div>
        <br>

        <div class="input-group" style="width:280px;">
          <span class="input-group-addon" id="basic-addon1">@</span>
          <input id="password" type="password" class="form-control" placeholder="password" aria-describedby="basic-addon1">
        </div>
        <br>
        <div>
          <button type="submit" style="width:280px;" class="btn btn-success" (click)="switchToMainPanel()">Sign In</button>
        </div>
        <br>
        <button type="submit" style="width:280px;" class="btn btn-primary" onclick="switchToMainPanel()">Continue without sign in</button>
      </form>
    </div>
  `
})

export class AuthenticateComponent {
  switchToMainPanel(): void {
    signInPage(switchToMainPanel);
  }
}
