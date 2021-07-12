import { HttpClient } from '@angular/common/http';
import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
/*
  Generated class for the OnesignalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OnesignalProvider {

  open: BehaviorSubject<any> = new BehaviorSubject(null);
  received: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(public http: HttpClient,private oneSignal: OneSignal,private platform: Platform) {
    console.log('Hello OnesignalProvider Provider');
  }

  init(){
    if(this.platform.is("cordova")){
      console.log("onesignal initialization ----------------------------");      
      this.oneSignal.startInit('454b4e83-626c-44c9-8005-f3d226f51208', '1024516850181'); //devlopment_key's

      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
      
      this.oneSignal.handleNotificationReceived().subscribe((data:any) => {
        let newData=data.payload.additionalData;
        if(newData){
          newData["isFocus"]=data.isAppInFocus;
          this.received.next(newData);
        }
     
      });
  
      this.oneSignal.handleNotificationOpened().subscribe((data:any) => {
        // console.log('provider noti data',data);
        let newData=data.notification.payload.additionalData;
        if(newData){
          newData["isFocus"]=data.notification.isAppInFocus;
          this.open.next(newData);
        }
       
      });
      this.oneSignal.endInit();


    }
    else { 
      this.received.next(0);
      this.open.next(0);
    }

  }


  id(){
    return new Promise((resolve, reject) => {
      if(this.platform.is("cordova")){
          this.oneSignal.getIds().then(identity => {
            resolve(identity.userId);
          });
      }else{
        resolve(0);
      }
  });

  }

}
