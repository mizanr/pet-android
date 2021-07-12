import { VendorAddProductPage } from './../vendor-add-product/vendor-add-product';
import { Component } from '@angular/core';
import { ActionSheetController, NavController, NavParams } from 'ionic-angular';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { AlertProvider } from '../../providers/alert/alert';
import { AuthProvider } from '../../providers/auth/auth';
import { LangPipe } from '../../pipes/lang/lang';

/**
 * Generated class for the VendorProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-vendor-product',
  templateUrl: 'vendor-product.html',
})
export class VendorProductPage {
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
    console.log('ionViewDidLoad VendorProductPage');
  }

  ionViewWillEnter() {
    this.get_list();
  }
  
  add(){
    this.navCtrl.push(VendorAddProductPage);
  }

  get_list() {
    let Data = {
      user_id:{"value":this.auth.getCurrentUserId(),"type":'NO'},
    }

    this.restApi.postData(Data,'my_product_list').then((result:any) => {
      console.log(result);
      if(result.status == 1){
        this.lists = result.data;
      } else {
        this.lists = new Array();
      }
    })
  }

  edit(id:any) {
    this.navCtrl.push(VendorAddProductPage,{product_id:id,isupdate:1});
  }

  open_url(url:any){
    window.open(url,'_system', 'location=yes');
  }

  action_sheet(item:any) {
    const actionSheet = this.actionSheet.create({
      buttons: [
        {
          text: 'Edit',
          handler: () => {
            this.edit(item.id);
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.remove(item);
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();

  }


  remove(item:any){
    this.alertP.confirmation(
      this.lang.transform('REMOVEPRODUCT', []),
      this.lang.transform('AREREMOVEPRODUCT', []),
      this.lang.transform('YES', []),
      this.lang.transform('NO',[])).then((data) => {
      if(data) {
         let Data = {
      user_id:{"value":this.auth.getCurrentUserId(),"type":'NO'},
      product_id:{"value":item.id,"type":'NO'},
    }

    this.restApi.postData(Data,'delete_product').then((result:any) => {
      console.log(result);
      if(result.status == 1){
        this.get_list();
      }
    })
      }
    })
  }

}
