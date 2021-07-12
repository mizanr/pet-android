import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from './../../providers/auth/auth';
import { AlertProvider } from './../../providers/alert/alert';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import {ImageProvider} from './../../providers/image/image';


/**
 * Generated class for the AddproductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-addproduct',
  templateUrl: 'addproduct.html',
})
export class AddproductPage {
category:any = new Array();
page_name:string =  'Create Add Product';
cate:any = '';
p_name:any = '';
price:any = '';
discount:any = '';
url:any = '';
desc:any = '';

image:any = '';

blob_img:any = '';
blob_name:any = '';
is_preview:boolean = false;
cate_name:any;

  constructor(public navCtrl: NavController,
  public auth:AuthProvider,
  public imageP:ImageProvider,
  public rest_api:RestApiProvider,
  public alertP:AlertProvider, 
  	public navParams: NavParams) {
  }

  ionViewDidLoad() {
  	this.get_category();
    console.log('ionViewDidLoad AddproductPage');
  }

  get_category() {

    var Data = {
      user_id:{value:this.auth.getCurrentUserId(),"type":"NO"},
    }
  		this.rest_api.postData(Data,'get_category').then((result:any) => {
  		console.log(result);
  		if(result.status == 1){
  			this.category = result.data;  		
  		}	
  	})
  }

  back() {
    this.navCtrl.pop();
  }


  add() {

	// if(this.discount != ''){
 //  		if(this.discount > 100 || this.discount < 0){
 //  			this.alertP.show('Alert','Discount can not be less than 0 or can not be more than 100.');
 //  		}
 //  	}
  	
  	let Data = {
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

  	this.rest_api.postData2(Data,0,'add_product').then((result:any) => {
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

    preview() {
      this.is_preview = true;
      this.page_name = "Product Preview";
      for(let i=0;i<this.category.length;i++){
        if(this.cate == this.category[i].id){
          this.cate_name = this.category[i].name;
        }
      }

    }

    close() {
      this.is_preview = false;
      this.page_name =  'Create Add Product';
    }


}
