// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { alltranslates } from 'src/app/constants/TranslateManager';

export const environment = {
  production: true,
  // apiUrl: 'https://funnytest.somee.com/api/',
  // baseUrl:"https://funnytest.somee.com/",
  apiUrl: 'https://localhost:44389/api/',
  baseUrl: 'https://localhost:44389/',
  allFieldsRequired: 'Tüm alanlar zorunludur',
  warningMessage: 'Uyarı',
  successMessage: 'Başarılı',
  errorMessage: 'Hata',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
