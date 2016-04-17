import 'es6-shim';
import {App, Platform} from 'ionic-angular';
import {LoginPage} from './pages/user/login';
import {CreateAccountPage} from './pages/createAccount/createAccount';
import {ListStuffPage} from './pages/listStuff/listStuff';
import {Push} from 'ionic-native';

// https://angular.io/docs/ts/latest/api/core/Type-interface.html
import {Type} from 'angular2/core';
import {Authentication} from './services/authentication';
import {pushService} from './services/pushService';

@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  config: {}, // http://ionicframework.com/docs/v2/api/config/Config/
  providers: [Authentication, pushService],
})
export class MyApp {
  rootPage: Type = LoginPage;
  pages

  constructor(platform: Platform, pushService: pushService) {
    platform.ready().then(() => {
      // The platform is now ready. Note: if this callback fails to fire, follow
      // the Troubleshooting guide for a number of possible solutions:
      //
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //
      // First, let's hide the keyboard accessory bar (only works natively) since
      // that's a better default:
      //
      // Keyboard.setAccessoryBarVisible(false);
      //
      // For example, we might change the StatusBar color. This one below is
      // good for dark backgrounds and light text:
      // StatusBar.setStyle(StatusBar.LIGHT_CONTENT)

      /*
      pushService.registerDevice().subscribe(
        (data) => {
          console.log('getAllItems', data)
        },
        (err) => console.log("Error Retrieving Data:", JSON.parse(err._body).description),
        () => { console.log("All Good With The Data") }
        );
        */

      var push = Push.init({
         android: {
             senderID: "630148386673"
         },
         ios: {
             alert: "true",
             badge: true,
             sound: 'false'
         }
      });

      push.on('registration', function(data) {
        console.log(data.registrationId);
      });

      push.on('notification', function(data) {
      	console.log("notification event");
        console.log(JSON.stringify(data));
      });

    });
    // set our app's pages
    this.pages = [
      { title: 'Welcome To My APp', component: LoginPage },
      { title: 'Create Account', component: CreateAccountPage },
      { title: 'List Some Stuff', component: ListStuffPage }
    ];
    this.rootPage = SignupPage;
  }
}
