// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  defaultToken: { token: '3MXW4BhcQnXumqT9z9sgNJaZHpD2' },
  site: 'stackoverflow',
  usersDbUrl: 'http://localhost:3000/users',
  getSearchData: 'https://api.stackexchange.com/2.3/search/advanced?q=',
  getUser: 'https://api.stackexchange.com/2.3/users/',
  getTags: 'https://api.stackexchange.com/2.3/tags/',
  getQuestion:'https://api.stackexchange.com/2.3/questions/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
