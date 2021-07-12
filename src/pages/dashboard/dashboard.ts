import { Component } from '@angular/core';
import { NavController, NavParams , App} from 'ionic-angular';

import { ProductsPage } from '../products/products';
import { ServicesPage } from '../services/services';
import { AdsPage } from '../ads/ads';
import { AuthProvider } from './../../providers/auth/auth';
import { AlertProvider } from './../../providers/alert/alert';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import { ImageProvider } from '../../providers/image/image';
import { HomePage } from '../home/home';


/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
current_user:any = '';
interval:any;
  constructor(public navCtrl: NavController,
  public auth:AuthProvider, public alertP:AlertProvider,public app:App,
  public rest_api:RestApiProvider,
  public navParams: NavParams) {
    this.get_profile();
  }

  ionViewDidLoad() {
   console.log(this.auth.getUserDetails());
    console.log('ionViewDidLoad DashboardPage');
  }

  ionViewWillEnter() {
    this.get_profile();
    setTimeout(() => {
      this.unread_count();
    },700)
  }

  product() {
    this.navCtrl.push(ProductsPage);
  }

  services() {
    this.navCtrl.push(ServicesPage);
  }

  ads() {
    this.navCtrl.push(AdsPage);
  }

  get_profile() {
      let Data = {
        user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
        login_user:{"value":this.auth.getCurrentUserId(),"type":"NO"},
      }
      this.rest_api.postwithoutldr(Data,'getuserdata').then((result:any) => {
        console.log(result);
        if(result.status == 1){
          this.auth.updateUserDetails(result.userDetails);
        } else {

        }
      })
    }

    unread_count() {
      this.interval =   setInterval(() => {
            let Data = {
            user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
        }
            this.rest_api.postwithoutldr(Data,'total_unread_msg').then((result:any) => {
                console.log('unread count--',result);
                if(result.status == 1){
                   // this.total_count = result.unread;
                } else {
                      clearInterval(this.interval);
                      this.alertP.show('Alert','Your session is unauthorized');
                      setTimeout(() => {
                        this.app.getActiveNav().push(HomePage);
                        this.auth.removeAllSessions();  
                        window.location.href="";
                      },500);                   
                    }
            })
        },1000)     
      }

}
