import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController} from 'ionic-angular';
import { AddproductPage } from '../addproduct/addproduct';
import { AuthProvider } from './../../providers/auth/auth';
import { AlertProvider } from './../../providers/alert/alert';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import {EditProductPage} from '../edit-product/edit-product';
import {ProductsDetailPage} from '../products-detail/products-detail';

/**
 * Generated class for the ProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {
lists:any = new Array();

  constructor(public navCtrl: NavController,
  public rest_api:RestApiProvider,
    public auth:AuthProvider,
    public alertP:AlertProvider, 
    public navParams: NavParams,
    public actionCtrl:ActionSheetController) {
  }

  ionViewDidLoad() {
    this.get_list();
    console.log('ionViewDidLoad ProductsPage');
  }

  ionViewWillEnter() {
    this.get_list();
  }

  addproduct() {
    this.navCtrl.push(AddproductPage);
  }

  get_list() {
    let Data = {
      user_id:{"value":this.auth.getCurrentUserId(),"type":'NO'},
    }

    this.rest_api.postwithoutldr(Data,'my_product_list').then((result:any) => {
      console.log(result);
      if(result.status == 1){
        this.lists = result.data;
      } else {
        this.lists = new Array();
      }
    })
  }

  remove(item:any){
    this.alertP.confirmation('Remove Product','Are you sure, you want to delete product?','Yes','No').then((data) => {
      if(data) {
         let Data = {
      user_id:{"value":this.auth.getCurrentUserId(),"type":'NO'},
      product_id:{"value":item.id,"type":'NO'},
    }

    this.rest_api.postData(Data,'delete_product').then((result:any) => {
      console.log(result);
      if(result.status == 1){
        this.get_list();
      }
    })
      }
    })
  }

  edit(item:any){
    this.navCtrl.push(EditProductPage,{product_id:item.id});
  }

  detail(item:any){
    this.navCtrl.push(ProductsDetailPage,{data:item});
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
           this.remove(item);
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
