import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { LangPipe } from '../../pipes/lang/lang';
import { AlertProvider } from '../../providers/alert/alert';
import { AuthProvider } from '../../providers/auth/auth';
import { ImageProvider } from '../../providers/image/image';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { VendorProductCategoryPage } from '../vendor-product-category/vendor-product-category';

/**
 * Generated class for the VendorAddProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-vendor-add-product',
  templateUrl: 'vendor-add-product.html',
})
export class VendorAddProductPage {

 formData:any = {
  desc:'',
  full_name:'',
  price:'',
  discount:'',
  url:'',
  img:'',
  img_blob:'',
  blob_name:'',
  cate:'',
 }

 isupdate:any;

  constructor(
    public navCtrl: NavController, 
    public restApi:RestApiProvider,
    public alertP:AlertProvider,
    public modal: ModalController,
    public lang:LangPipe,
    public auth:AuthProvider,
    public imageP:ImageProvider,
    public navParams: NavParams) {
      this.isupdate=navParams.data.isupdate || 0;
      if(this.isupdate==1){
        this.get_productinfo(this.navParams.data.product_id);
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VendorAddProductPage');
  }

  get_productinfo(product_id:any) {
  	let Data = {
  		user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
  		product_id:{"value":product_id,"type":"NO"},
  	}
  	this.restApi.postData(Data,'get_single_product').then((result:any) => {
  		console.log(result);
  		if(result.status == 1){
        this.formData.cate=result.data.category;
        this.formData.desc=result.data.description;
        this.formData.discount=result.data.discount;
        this.formData.full_name=result.data.name;
        this.formData.img=result.data.image;
        this.formData.price=result.data.price;
        this.formData.url=result.data.url;
        this.formData.id=result.data.id;
  		}
  	})
  }

  category(){
    const modal = this.modal.create(VendorProductCategoryPage,{},{cssClass:'moremodel', showBackdrop:true, enableBackdropDismiss:true});
    modal.present();
    modal.onDidDismiss((data)=>{
      console.log(data);
      if(data){
        this.formData.cate=data;
      }
    })
  }

  get_image() {
    this.imageP.getImage().then((img:any) => {
      this.formData.img=img;
      let b =this.imageP.imgURItoBlob(img);
      this.formData.img_blob=b;
      this.formData.blob_name=this.imageP.generateImageName('img.jpg');
      console.log(this.formData.img_blob,this.formData.blob_name);
    })
  }


  add_product() {
    if(!this.formData.img_blob){
      this.alertP.show('Alert','Please upload image.');
      return;
    }
      let Data = {
        user_id:{"value":this.auth.getCurrentUserId(),"type":'NO'},
        description:{"value":this.formData.desc.trim(),"type":'DES'},
        name:{"value":this.formData.full_name.trim(),"type":'PROD'},
        category:{"value":this.formData.cate.id,"type":'CATE'},
        price:{"value":this.formData.price,"type":'PRICE'},
        discount:{"value":this.formData.discount,"type":'NO'}, //DICNT
        url:{"value":this.formData.url,"type":'NO'},
      }
  
      if(this.formData.img_blob){
        Data['image']={"value":this.formData.img_blob,"type":'NO',"name":this.formData.blob_name};
      }
  
      this.restApi.postData2(Data,0,'add_product').then((result:any) => {
        console.log(result);
        if(result.status == 1){
          this.alertP.showAsync(
            this.lang.transform('SUCCESS',[]), result.message).then(() => {
            this.navCtrl.pop();
          })
        }
      })
  }


  update_product() {
    let Data = {
  		product_id:{"value":this.formData.id,"type":'NO'},
      user_id:{"value":this.auth.getCurrentUserId(),"type":'NO'},
      description:{"value":this.formData.desc,"type":'DES'},
      name:{"value":this.formData.full_name,"type":'PROD'},
      category:{"value":this.formData.cate.id,"type":'CATE'},
      price:{"value":this.formData.price,"type":'PRICE'},
      discount:{"value":this.formData.discount,"type":'NO'}, //DICNT
      url:{"value":this.formData.url,"type":'NO'},
    }

    if(this.formData.img_blob){
      Data['image']={"value":this.formData.img_blob,"type":'NO',"name":this.formData.blob_name};
    }

    this.restApi.postData2(Data,0,'edit_product').then((result:any) => {
      console.log(result);
      if(result.status == 1){
        this.alertP.showAsync('Success',result.message).then(() => {
          this.navCtrl.pop();
        })
      }
    })
  }

  
}
