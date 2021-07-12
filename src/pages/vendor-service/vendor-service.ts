import { Component } from '@angular/core';
import { ActionSheetController, NavController, NavParams } from 'ionic-angular';
import { LangPipe } from '../../pipes/lang/lang';
import { AlertProvider } from '../../providers/alert/alert';
import { AuthProvider } from '../../providers/auth/auth';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { VendorAddServicePage } from '../vendor-add-service/vendor-add-service';

/**
 * Generated class for the VendorServicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-vendor-service',
  templateUrl: 'vendor-service.html',
})
export class VendorServicePage {
  lists:any=new Array();

  constructor(public navCtrl: NavController,
    public restApi:RestApiProvider,
    public alertP:AlertProvider,
    public auth: AuthProvider,
    public lang:LangPipe,
    public actionSheet:ActionSheetController,
     public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VendorServicePage');
  }

  ionViewWillEnter() {
    this.get_service();
  }

  add() {
    this.navCtrl.push(VendorAddServicePage);
  }

  get_service() {
    let Data = {
      user_id:{"value":this.auth.getCurrentUserId(),"type":'NO'},
    }
    this.restApi.postData(Data,'my_service_list').then((result:any) => {
      console.log(result);
      if(result.status == 1){
        this.lists = result.data;
      }else {
        this.lists = new Array();
      }
    })
  }

  delete(item:any) {
    this.alertP.confirmation(
      this.lang.transform('REMOVESERVICE', []),
      this.lang.transform('AREREMOVESERVICE', []),
      this.lang.transform('YES', []),
      this.lang.transform('NO',[])).then((data) => {
      if(data) {
        let Data = {
          user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
          service_id:{"value":item.data1.id,"type":"NO"},
        }
        this.restApi.postData(Data,'delete_service').then((result:any) => {
          if(result.status == 1){
            this.get_service();
      }
    })
      }
    })
  }

  detail(item:any) {
   // this.navCtrl.push(ServiceDetailPage,{data:item});
  }

  edit(item:any){
   this.navCtrl.push(VendorAddServicePage,{service_id:item.data1.id,isupdate:1});

  }

  action_sheet(item: any) {
    let actionSheet = this.actionSheet.create({
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
