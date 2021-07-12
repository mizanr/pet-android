import { Component } from '@angular/core';
import { NavController, NavParams,ActionSheetController,ModalController} from 'ionic-angular';
import { AddadsPage } from '../addads/addads';

import { AuthProvider } from './../../providers/auth/auth';
import { AlertProvider } from './../../providers/alert/alert';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import {AdsDetailPage} from '../ads-detail/ads-detail';
import {AdsEditPage} from '../ads-edit/ads-edit';
import {CampaignAchievementsPage} from '../campaign-achievements/campaign-achievements';
/**
 * Generated class for the AdsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ads',
  templateUrl: 'ads.html',
})
export class AdsPage {
lists:any = new Array();

  constructor(public navCtrl: NavController,
  public auth:AuthProvider,
  public rest_api:RestApiProvider,
  public actionCtrl:ActionSheetController,
  public alertP:AlertProvider, 
    public navParams: NavParams,
    public modalCtrl:ModalController,) {
  }

  ionViewDidLoad() {
    this.get_list();
    console.log('ionViewDidLoad AdsPage');
  }

  ionViewWillEnter() {
    this.get_list();
  }

  addads() {
    this.navCtrl.push(AddadsPage);
  }

  get_list() {
    let Data = {
      user_id:{"value":this.auth.getCurrentUserId(),"type":'NO'},
    }

    this.rest_api.postwithoutldr(Data,'my_ads_list').then((result:any) => {
      console.log(result);
      if(result.status == 1){
        this.lists = result.data;
      } else {
        this.lists = new Array();
      }
    })
  }

  delete(item:any) {
    this.alertP.confirmation('Remove Ads','Are you sure, you want to delete ads?','Yes','No').then((data) => {
      if(data) {
         let Data = {
      user_id:{"value":this.auth.getCurrentUserId(),"type":'NO'},
      ad_id:{"value":item.id,"type":'NO'},
    }

    this.rest_api.postData(Data,'delete_ads').then((result:any) => {
      console.log(result);
      if(result.status == 1){
        this.get_list();
      }
    })
      }
    })
  }

  detail(item:any) {
    //this.navCtrl.push(AdsDetailPage,{data:item});
  }

  edit(item: any){
    this.navCtrl.push(AdsEditPage,{data:item});
  }

  action(item: any) {
    let actionSheet = this.actionCtrl.create({
     buttons: [
       {
         text: 'Edit',
         handler: () => {
           this.edit(item);
         }
       },
       {
         text: 'Delete',
         role: 'destructive',         
         handler: () => {
           this.delete(item);
         }
       },
       {
         text: 'Cancel',
         role: 'cancel',
         handler: () => {
           console.log('Cancel clicked');
         }
       },{
         text: 'Campaign Achievements',
         //role: 'cancel',
         handler: () => {
           const modal = this.modalCtrl.create(CampaignAchievementsPage,
             {data:item});
           modal.present();
         }
       }
     ]
   });

   actionSheet.present();
  }

}
