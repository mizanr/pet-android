import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NotificationsPage } from '../notifications/notifications';

import { AuthProvider } from './../../providers/auth/auth';
import { AlertProvider } from './../../providers/alert/alert';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import {OwnerprofilePage} from '../ownerprofile/ownerprofile';
import {ProfilePage} from '../profile/profile';
import { MemberProfilePage } from '../member-profile/member-profile';
import { PetProfilePage } from '../pet-profile/pet-profile';
import { Keyboard } from '@ionic-native/keyboard';


/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
items:any = new Array();
search_val:any='';
  constructor(public navCtrl: NavController,
  	public auth:AuthProvider,
    public rest_api:RestApiProvider,
    public alertP:AlertProvider, 
    public keyboard:Keyboard,
  	public navParams: NavParams) {
    console.log('ionViewDidLoad SearchPage');

  }

  ionViewDidLoad() {
  }

  ionViewWillLeave() {
    this.search_val='';
    this.items=[];
  }

  notification() {
    this.navCtrl.push(NotificationsPage)
  }

  search(ev:any){
  	console.log(ev.target.value);
  	var val = ev.target.value;
  	if(val && val.trim()){
  		let Data = {
  			user_id:{"value":this.auth.getCurrentUserId(),"type":'NO'},
  			q:{"value":val,"type":'NO'},
  		}
  		this.rest_api.postwithoutldr(Data,'search_users').then((result:any) => {
  			console.log(result);
  			if(result.status == 1){
  				this.items = result.users;
  			} else {
  				this.items = new Array();
  			}
  		})
  	}
  }

  go_to(item:any) {
    if(item.type == "User"){
    //this.navCtrl.setRoot(OwnerprofilePage,{user_id:item.id});
    this.navCtrl.push(MemberProfilePage,{user_id:item.id});
    } else {
      // this.navCtrl.push(ProfilePage,{data:item});
      this.navCtrl.push(PetProfilePage,{data:item,pet_id:item.id});
    }
  }

}
