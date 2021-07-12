import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert';
import { AuthProvider } from '../../providers/auth/auth';
import { ImageProvider } from '../../providers/image/image';
import { RestApiProvider } from '../../providers/rest-api/rest-api';

/**
 * Generated class for the CampaignDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-campaign-detail',
  templateUrl: 'campaign-detail.html',
})
export class CampaignDetailPage {
  formData:any;

  constructor(public navCtrl: NavController,
    public auth:AuthProvider,
    public restApi:RestApiProvider,
    public alertP:AlertProvider,
    public imageP:ImageProvider,
     public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CampaignDetailPage');
  }

  ionViewWillEnter() {
    this.get_info();
  }

  back(){
    this.navCtrl.pop();
  }

  get_info() {
  	let Data = {
  		user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
  		ad_id:{"value":this.navParams.data.comp_id,"type":"NO"},
  	}
  	this.restApi.postData(Data,'get_single_ads').then((result: any) => {
  		console.log(result);
  		if(result.status == 1){
  			this.formData = result.data;
  		}
  	})
  }
}
