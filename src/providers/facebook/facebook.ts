import { LoaderProvider } from './../loader/loader';
import { Platform } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';


/*
*************************Important Content******************************
1. ionic cordova plugin add cordova-plugin-facebook4 --variable APP_ID="682845892332234" --variable APP_NAME="FMP" 
2. npm install --save @ionic-native/facebook@4

// Prasoon FB account using for this App:- Easyeat Application
url :- https://developers.facebook.com/apps/682845892332234/settings/basic/#

*/


@Injectable()
export class FacebookProvider {

      constructor(
            public http: HttpClient,
            public platform: Platform,
            public fb: Facebook,
            public loading: LoaderProvider
      ) {
            console.log('Hello FacebookProvider Provider');
      }



      login() {
            this.loading.show();
            return new Promise((resolve, reject) => {
                  if (this.platform.is("cordova")) {
                        this.fb.login(['public_profile', 'email']).then((res: FacebookLoginResponse) => {
                              this.fb.api(res.authResponse.userID + "/?fields=id,email,first_name,last_name,picture.width(300).height(300).as(picture_large)", []).then(profile => {
                                    let data = {
                                          "fname": profile.first_name,
                                          "lname": profile.last_name,
                                          "email": profile.email,
                                          "profilepic": profile.picture_large.data.url,
                                          "id": res.authResponse.userID,
                                    }

                                    resolve(data);
                                    this.loading.hide();
                              }, err => {
                                    reject(err);
                                    console.log("api error", err);
                                    this.loading.hide();

                              });
                        }).catch(e => {
                              reject(e);
                              console.log("calling error", e);
                              this.loading.hide();

                        });

                  } else {
                        reject(0);
                        this.loading.hide();
                  }
            })
      }



}




