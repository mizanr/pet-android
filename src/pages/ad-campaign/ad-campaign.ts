import { CreateCampaignPage } from './../create-campaign/create-campaign';
import { CampaignDetailPage } from './../campaign-detail/campaign-detail';
import { Component } from '@angular/core';
import { ActionSheetController, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { AlertProvider } from '../../providers/alert/alert';
import { ImageProvider } from '../../providers/image/image';

/**
 * Generated class for the AdCampaignPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ad-campaign',
  templateUrl: 'ad-campaign.html',
})
export class AdCampaignPage {
  lists:any=new Array();

  constructor(public navCtrl: NavController,
    public auth:AuthProvider,
    public restApi:RestApiProvider,
    public alertP:AlertProvider,
    public actionCtrl:ActionSheetController,
    public imageP:ImageProvider,
     public navParams: NavParams) {
  }

  ionViewWillEnter() {
    this.get_list();
  }

  get_list() {
    let Data = {
      user_id:{"value":this.auth.getCurrentUserId(),"type":'NO'},
    }
    this.restApi.postData(Data,'my_ads_list').then((result:any) => {
      console.log(result);
      if(result.status == 1){
        this.lists = result.data;
      } else {
        this.lists = new Array();
       
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdCampaignPage');
  }


  details(item:any){
    this.navCtrl.push(CampaignDetailPage,{comp_id:item.id});
  }

  create(){
    this.navCtrl.push(CreateCampaignPage);
  }

  delete(item:any) {
    this.alertP.confirmation('Remove Campaign','Are you sure, you want to Remove Campaign?','Yes','No').then((data) => {
      if(data) {
         let Data = {
      user_id:{"value":this.auth.getCurrentUserId(),"type":'NO'},
      ad_id:{"value":item.id,"type":'NO'},
    }

    this.restApi.postData(Data,'delete_ads').then((result:any) => {
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
    this.navCtrl.push(CreateCampaignPage,{comp_id:item.id,isupdate:1});
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
       },
      //  {
      //    text: 'Campaign Achievements',
      //    //role: 'cancel',
      //    handler: () => {
      //      const modal = this.modalCtrl.create(CampaignAchievementsPage,
      //        {data:item});
      //      modal.present();
      //    }
      //  }
     ]
   });

   actionSheet.present();
  }
}
