import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from './../../providers/auth/auth';
import { AlertProvider } from './../../providers/alert/alert';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import {ImageProvider} from './../../providers/image/image';
/**
 * Generated class for the EditProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-product',
  templateUrl: 'edit-product.html',
})
export class EditProductPage {
category:any = new Array();
product_id:any = '';

pro_info:any = '';

cate:any = '';
p_name:any = '';
price:any = '';
discount:any = '';
url:any = '';
desc:any = '';

image:any = '';

blob_img:any = '';
blob_name:any = '';
  constructor(public navCtrl: NavController,
	public auth:AuthProvider,
 	public imageP:ImageProvider,
  	public rest_api:RestApiProvider,
  	public alertP:AlertProvider, 
  	public navParams: NavParams) {
  	this.product_id = this.navParams.get('product_id');
  	this.get_productinfo(this.product_id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProductPage');
  }

  initilazedata() {
  	this.image = this.pro_info.image;
  	this.p_name = this.pro_info.name;
  	this.cate = this.pro_info.category.id;
  	this.price = this.pro_info.price;
  	this.discount = this.pro_info.discount;
  	this.url = this.pro_info.url;
  	this.desc = this.pro_info.description;
  }

  get_category() {
   var Data = {
      user_id:{value:this.auth.getCurrentUserId(),"type":"NO"},
    }
  		this.rest_api.postwithoutldr(Data,'get_category').then((result:any) => {
  		console.log(result);
  		if(result.status == 1){
  			this.category = result.data;  		
  		}	
  	})
  }

  get_productinfo(product_id:any) {
  	let Data = {
  		user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
  		product_id:{"value":product_id,"type":"NO"},
  	}
  	this.rest_api.postData(Data,'get_single_product').then((result:any) => {
  		console.log(result);
  		if(result.status == 1){
  			this.get_category();
  			this.pro_info = result.data;
  			this.initilazedata();
  		}
  	})
  }

   update() {

	// if(this.discount != ''){
 //  		if(this.discount > 100 || this.discount < 0){
 //  			this.alertP.show('Alert','Discount can not be less than 0 or can not be more than 100.');
 //  		}
 //  	}
  	
  	let Data = {
  		product_id:{"value":this.product_id,"type":'NO'},
  		user_id:{"value":this.auth.getCurrentUserId(),"type":'NO'},
  		name:{"value":this.p_name,"type":'PROD'},
  		category:{"value":this.cate,"type":'CATE'},
  		price:{"value":this.price,"type":'PRICE'},
  		discount:{"value":this.discount,"type":'NO'}, //DICNT
  		url:{"value":this.url,"type":'NO'},
  		description:{"value":this.desc,"type":'DES'},
  	}



  	if(this.blob_img){
  		Data['image'] = {"value":this.blob_img,"type":'NO',"name":this.blob_name};
  	}

  	this.rest_api.postData2(Data,0,'edit_product').then((result:any) => {
  		console.log(result);
  		if(result.status == 1){
  			this.alertP.showAsync('Success',result.message).then(() => {
  				this.navCtrl.pop();
  			})
  		}
  	})
  }

  get_image() {
  		this.imageP.getImage().then((img) => {
  			this.image = img;
  		var file = this.imageP.imgURItoBlob(img);
  		this.blob_img = file;
  		this.blob_name = this.imageP.generateImageName('hello.jpg');

  		console.log('blob img:::--',this.blob_img,'blobname---',this.blob_name);
  		})
  	}

    remove_img() {
      this.image = '';
      this.blob_img = '';
      this.blob_name = '';
    }
}
