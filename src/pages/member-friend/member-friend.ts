import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert';
import { AuthProvider } from '../../providers/auth/auth';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { MemberProfilePage } from '../member-profile/member-profile';

/**
 * Generated class for the MemberFriendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-member-friend',
  templateUrl: 'member-friend.html',
})
export class MemberFriendPage {
  buddies:any=[];
  User:any=[];

  constructor(public navCtrl: NavController,
    public auth:AuthProvider,
    public restApi:RestApiProvider,
    public alertP:AlertProvider,
     public navParams: NavParams) {
       this.buddies=navParams.data.friends;
       this.User=navParams.data.user;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MemberFriendPage');
  }

  userinfo(item:any) {
    if(item.id!=this.auth.getCurrentUserId()){
      this.navCtrl.push(MemberProfilePage,{user_id:item.id});
    }
  }

}
