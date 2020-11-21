import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { Config } from './app/app.config';

Config.loadInstance('config.json')
  .then(() => {
    let prod = Config.getInstance('config.json').get('production');
    if (prod) {
      enableProdMode();
    }
    platformBrowserDynamic().bootstrapModule(AppModule)
      .catch(err => console.log(err));
  });
