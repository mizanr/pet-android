import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { AuthProvider } from './../../providers/auth/auth';
import { AlertProvider } from './../../providers/alert/alert';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import { ImageProvider } from '../../providers/image/image';
import { PreviewPage } from '../preview/preview';
/**
 * Generated class for the AdsEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ads-edit',
  templateUrl: 'ads-edit.html',
})
export class AdsEditPage {

title:any = '';

add_name:any = '';
sponsor:any = '';
website:any = '';
url:any = '';
desc:any = '';

image:any = '';
com_logo:any = '';

blob_image:any='';
blob_img_name:any='';

blob_com_logo:any='';
blob_com_logo_name:any='';

info:any = '';
duration: number = 5;
budget:number = 5;
projected_exposure:number;
projected_cost:number;
startdate:any;

  constructor(public navCtrl: NavController,
	  public auth:AuthProvider,
	  public imageP:ImageProvider,
	  public alertP:AlertProvider,
    public rest_api:RestApiProvider, 
    public modalCtrl:ModalController,
  	public navParams: NavParams) {
  	var data = navParams.get('data');
  	this.get_info(data.id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdsEditPage');
  }

  initalizedata() {
    this.title = this.info.title;
    this.url = this.info.url;
    this.startdate = this.info.start_date1;
    this.duration = this.info.duration;
    this.budget = this.info.budget;
    this.blob_img_name = this.info.image.substr(this.info.image.lastIndexOf('/') + 1);
    this.projected_cost = this.info.projected_cost;
    this.projected_exposure = this.info.projected_exposure;
    this.desc = this.info.description;
  	this.image = this.info.image;
  	// this.com_logo = this.info.company_logo;
  	// this.add_name = this.info.company_name;
  	// this.sponsor = this.info.sponsor;
  	// this.website = this.info.website;
  	// this.url = this.info.url;
  }

  get_info(Id: any) {
  	let Data = {
  		user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
  		ad_id:{"value":Id,"type":"NO"},
  	}
  	this.rest_api.postData(Data,'get_single_ads').then((result: any) => {
  		console.log(result);
  		if(result.status == 1){
  			this.info = result.data;
  			this.initalizedata();
  		}
  	})
  }

  submit() {
    let Data = {
      user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
      ad_id:{"value":this.info.id,"type":"NO"},
      // image:{"value":this.blob_image,"name":this.blob_img_name,"type":"NO"},
      title:{"value":this.title,"type":"TITLE"},
      start_date:{"value":this.startdate,"type":"NO"},
      duration:{"value":this.duration,"type":"NO"},
      budget:{"value":this.budget,"type":"NO"},
      url:{"value":this.url,"type":"NO"},
      projected_exposure:{"value":this.projected_exposure,"type":"NO"},
      projected_cost:{"value":this.projected_cost,"type":"NO"},
      description:{"value":this.desc,"type":"NO"},
      
    }

    if(this.blob_image){
      Data['image']={"value":this.blob_image,"name":this.blob_img_name,"type":"NO"};
    }


    this.rest_api.postData2(Data,0,'edit_ads').then((result:any) => {
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
      this.blob_image = file;
      this.blob_img_name = this.imageP.generateImageName('hello.jpg');
      console.log('blob img:::--',this.blob_image,'blobname---',this.blob_img_name);
      })
    }

    get_logo() {
      this.imageP.getImage().then((img) => {
        this.com_logo = img;
      var file = this.imageP.imgURItoBlob(img);
      this.blob_com_logo = file;
      this.blob_com_logo_name = this.imageP.generateImageName('hello.jpg');
      console.log('blob logo:::--',this.blob_com_logo,'blobname---',this.blob_com_logo_name);
      })
    }


    duratin_change(ev: any){
      console.log(ev.value);
      this.duration = ev.value;
    this.projected_exposure = this.duration * this.budget /.18; 
    this.projected_cost = this.duration * this.budget; 
    }

    budget_change(ev :any) {
      console.log(ev.value);
      this.budget = ev.value;
      this.projected_exposure = this.duration * this.budget /.18; 
      this.projected_cost = this.duration * this.budget; 
    }

    remove_img(){
      this.image ='';
      this.blob_image = '';
      this.blob_img_name= '';
    }

    preview() {
      let Data = {
        title:this.title,
        desc:this.desc,
        img:this.image,
        url:this.url,
        duration:this.duration,
        buget:this.budget,
        date:this.startdate,
        p_exposure:this.projected_exposure,
        cost:this.projected_cost,
      }
      this.navCtrl.push(PreviewPage,{data:Data});
      // modal.present();
    }

}
