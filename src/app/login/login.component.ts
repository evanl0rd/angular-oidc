import { Component, OnInit } from '@angular/core';
import { OAuthService, OAuthStorage } from 'angular-oauth2-oidc';
import { ApiService } from '../services/api.service';
import { Login } from '../models/api.model';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  logins?: Login[];
  loading = false;

  constructor(
    private oauthService: OAuthService,
    private oauthStorage: OAuthStorage,
    private apiService: ApiService) { }
  
    ngOnInit() {
      this.getLogins();
    }

    public login() {
      console.log('Logging in!');
      this.oauthService.initImplicitFlow();
    }

    public logout() {
      this.oauthService.logOut();
      this.getLogins();
    }

    public get access_token() {
      return this.oauthStorage.getItem("access_token");
    }

    public get id_token() {
      return this.oauthStorage.getItem("id_token");
    }

    public get email() {
      return this.getClaim("email");
    }

    private getClaim(claim: string): string {
      let claims = this.oauthService.getIdentityClaims();
      if (!claims) return '';
      return claims[claim as keyof Object].toString();
    }

    public getLogins() {
      this.apiService.getLogins().subscribe(
        logins => {this.logins = logins;}
      )
    }
}