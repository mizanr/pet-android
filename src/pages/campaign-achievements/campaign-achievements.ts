import { Component } from '@angular/core';
import { NavController, NavParams, ViewController} from 'ionic-angular';
import { AuthProvider } from './../../providers/auth/auth';
import { AlertProvider } from './../../providers/alert/alert';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
/**
 * Generated class for the CampaignAchievementsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-campaign-achievements',
  templateUrl: 'campaign-achievements.html',
})
export class CampaignAchievementsPage {
info:any;
val:any;

  constructor(public navCtrl: NavController,
    public auth:AuthProvider,
    public rest_api:RestApiProvider,
    public alertP:AlertProvider,  
  	public viewCtrl:ViewController,
  	public navParams: NavParams) {
    this.info = navParams.get('data');
    console.log(this.info);
  }

  ionViewDidLoad() {
    this.get_click();
    console.log('ionViewDidLoad CampaignAchievementsPage');
  }

  close() {
  	this.viewCtrl.dismiss();
  }

  get_click() {
    let Data = {
      ad_id:{"value":this.info.id,"type":"NO"},
      user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
    }

    this.rest_api.postData(Data,'get_total_click_on_ads').then((res:any) => {
      console.log(res);
      if(res.status == 1){
        this.val = res.data;
      }
    })
  }

}
