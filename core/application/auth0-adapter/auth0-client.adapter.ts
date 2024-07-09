// interface AuthenticationProvider {
//   getAccessToken(): string;
// }
//
// class Auth0AuthenticationProvider implements AuthenticationProvider {
//   getAccessToken() {
//     return "test";
//   }
// }
//
// class Auth0AuthenticationDecoratorProvider implements AuthenticationProvider {
//   constructor(private readonly authProvider: AuthenticationProvider) {}
//
//   getAccessToken() {
//     return this.authProvider.getAccessToken();
//   }
// }
