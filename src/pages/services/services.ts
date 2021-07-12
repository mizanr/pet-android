import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController} from 'ionic-angular';
import { AddservicesPage } from '../addservices/addservices';
import { AuthProvider } from './../../providers/auth/auth';
import { AlertProvider } from './../../providers/alert/alert';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import {ServiceDetailPage} from '../service-detail/service-detail';
import {ServiceEditPage} from '../service-edit/service-edit';
/**
 * Generated class for the ServicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
})
export class ServicesPage {
services:any = new Array();

  constructor(public navCtrl: NavController,
  public auth:AuthProvider,
  public rest_api:RestApiProvider,
  public alertP:AlertProvider, 
    public navParams: NavParams,
    public actionCtrl:ActionSheetController) {
  }

  ionViewDidLoad() {
    this.get_service();
    console.log('ionViewDidLoad ServicesPage');
  }

  ionViewWillEnter() {
    this.get_service();
  }

  // http://bluediamondresearch.com/WEB01/petapp/Api/api.php?action=my_service_list&user_id=14

  addService() {
    this.navCtrl.push(AddservicesPage);
  }

  get_service() {
    let Data = {
      user_id:{"value":this.auth.getCurrentUserId(),"type":'NO'},
    }

    this.rest_api.postwithoutldr(Data,'my_service_list').then((result:any) => {
      console.log(result);
      if(result.status == 1){
        this.services = result.data;
      }else {
        this.services = new Array();
      }
    })
  }

  delete(item:any) {
    this.alertP.confirmation('Remove Service','Are you sure, you want to delete this service','Yes','No').then((data) => {
      if(data) {
        let Data = {
          user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
          service_id:{"value":item.id,"type":"NO"},
        }
        this.rest_api.postData(Data,'delete_service').then((result:any) => {
          if(result.status == 1){
            this.get_service();
      }
    })
      }
    })
  }

  detail(item:any) {
    this.navCtrl.push(ServiceDetailPage,{data:item});
  }

  edit(item:any){
    this.navCtrl.push(ServiceEditPage,{s_id:item.id});
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
       }
     ]
   });

   actionSheet.present();
  }

}
