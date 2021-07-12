import { Component } from '@angular/core';
import { NavController, NavParams ,ModalController} from 'ionic-angular';
import { EditvendorPage } from '../editvendor/editvendor';
import { AuthProvider } from './../../providers/auth/auth';
import { AlertProvider } from './../../providers/alert/alert';
import { RestApiProvider } from './../../providers/rest-api/rest-api';

/**
 * Generated class for the VendorprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-vendorprofile',
  templateUrl: 'vendorprofile.html',
})
export class VendorprofilePage {
vender_info:any = '';
  constructor(public navCtrl: NavController,
    public rest_api:RestApiProvider,
    public modalCtrl: ModalController,
    public auth:AuthProvider, 
  	public navParams: NavParams) {
  }

  ionViewDidLoad() {
  	this.get_profile();
    console.log('ionViewDidLoad VendorprofilePage');
  }

  ionViewWillEnter(){
  	this.vender_info = this.auth.getUserDetails();
  }

  edit() {
    this.navCtrl.push(EditvendorPage)
	}

	get_profile() {
	    let Data = {
			user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
			login_user:{"value":this.auth.getCurrentUserId(),"type":"NO"},
	    }
	    this.rest_api.postData(Data,'getuserdata').then((result:any) => {
	      console.log(result);
	      if(result.status == 1){
	      	this.vender_info = result.userDetails;
	      } else {

	      }
    	})
  	}

}
