import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert';
import { AuthProvider } from '../../providers/auth/auth';
import { RestApiProvider } from '../../providers/rest-api/rest-api';

/**
 * Generated class for the VendorProductCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-vendor-product-category',
  templateUrl: 'vendor-product-category.html',
})
export class VendorProductCategoryPage {
  categories:any=new Array();
all_categories:any=new Array();
cate:any;

  constructor(public navCtrl: NavController,
    public restApi:RestApiProvider,
    public alertP:AlertProvider,
    public auth:AuthProvider,
    public view:ViewController,
     public navParams: NavParams) {
  }

  ionViewDidLoad() {3
    this.get_category();
    console.log('ionViewDidLoad VendorProductCategoryPage');
  }

  closemodal() {
    this.view.dismiss();
  }


  get_category() {
    var Data = {
      user_id:{value:this.auth.getCurrentUserId(),"type":"NO"},
    }
  		this.restApi.postData(Data,'get_category').then((result:any) => {
  		console.log(result);
  		if(result.status == 1){
  			this.categories = result.data; 
        this.all_categories=result.data; 		
  		}	
  	})
  }

  search(ev:any) {
    console.log(ev.target.value);
    var val = ev.target.value;
    if(val&&val.trim !=''){
      this.categories = this.all_categories.filter((item) => {
        return item.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
      })
    } else {
      this.categories=this.all_categories;
    }
   }

   cate_chagne() {
    this.view.dismiss(this.cate);
  }

}
