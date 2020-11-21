import { Component } from '@angular/core';
import { Config } from './app.config';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';
import { filter } from 'rxjs/operators';
import { ApiService } from './services/api.service';
import { Login } from './models/api.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-oidc';
  authConf = Object.assign({}, authConfig);
  private conf = Config.getInstance('config.json');

  public constructor(
    private oauthService: OAuthService,
    private apiService: ApiService
  ) {
    this.authConf.issuer = this.conf.get('oidcIssuer');
    this.authConf.loginUrl = this.conf.get('oidcAuthorizationEndpoint');
    this.authConf.clientId = this.conf.get('oidcClientId');

    this.oauthService.configure(this.authConf);

    this.oauthService.tryLogin();

    this.oauthService.setupAutomaticSilentRefresh();

    // after OIDC token received
    this.oauthService.events
      .pipe(filter(e => e.type === 'token_received'))
      .subscribe(_ => {
        let login = new Login(this.getClaim('email'),
                              (new Date()).toISOString());
        console.log(login);
        this.apiService.createLogin(login).subscribe(_ => {});
      })
  }

  private getClaim(claim: string): string {
    let claims = this.oauthService.getIdentityClaims();
    if (!claims) return '';
    return claims[claim as keyof Object].toString();
  }
}
