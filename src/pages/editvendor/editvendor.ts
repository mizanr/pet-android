import { Component } from '@angular/core';
import { NavController, NavParams,ModalController} from 'ionic-angular';
import { AuthProvider } from './../../providers/auth/auth';
import { AlertProvider } from './../../providers/alert/alert';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import {ImageProvider} from './../../providers/image/image';
import { Platform, Nav, Events } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';



/**
 * Generated class for the EditvendorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-editvendor',
  templateUrl: 'editvendor.html',
})
export class EditvendorPage {
vender_info:any = '';

c_name:any = '';
phone:any = '';
website:any = '';
poc_name:any = '';
image:any = '';

blob_img:any = '';
blob_name:any = '';

  constructor(public navCtrl: NavController,
 	public rest_api:RestApiProvider,
    public modalCtrl: ModalController,
    public auth:AuthProvider, 
    public alertP:AlertProvider,
    public imageP:ImageProvider,
    public event:Events,
  	public navParams: NavParams) {
  }

  ionViewDidLoad() {
  	this.get_profile();
    console.log('ionViewDidLoad EditvendorPage');
  }

  initializedata() {
  	this.image = this.vender_info.profile;
  	this.c_name = this.vender_info.company_name;
  	this.phone = this.vender_info.phone;
  	this.website = this.vender_info.website;
  	this.poc_name = this.vender_info.poc;
  }

  get_profile() {
	    let Data = {
			user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
			login_user:{"value":this.auth.getCurrentUserId(),"type":"NO"},
	    }
	    this.rest_api.postData(Data,'getuserdata').then((result:any) => {
	      console.log(result);
	      if(result.status == 1){
	      	this.vender_info = result.userDetails;
	      	this.initializedata();
	      } else {

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

  	//action=&user_id=14&=Webwiders&
  	//=1236579&website=http://webwiders.com/&poc=Anil

  	update() {

      if(!this.blob_img&&!this.image){
        this.alertP.show('Alert','Please Upload your image.');
        return;
      }

  		let Data = {
  			user_id:{"value":this.auth.getCurrentUserId(),"type":'NO'},
  			company_name:{"value":this.c_name,"type":'CNAME'},
  			phone:{"value":this.phone,"type":'PHONE'},
  			website:{"value":this.website,"type":'NO'},
  			poc:{"value":this.poc_name,"type":'POC'},
        profile:{"value":this.blob_img,"type":"NO","name":this.blob_name},
  		}

  		

  		this.rest_api.postData2(Data,0,'edit_vendor_profile').then((result:any) => {
  			console.log(result);
  			if(result.status == 1){
  				this.alertP.showAsync('Success',result.msg).then(() => {
            if(this.auth.getUserDetails().company_name != null){
              this.auth.updateUserDetails(result.userDetails);
                 this.event.publish('loginAuth','');            
                 this.navCtrl.pop();
            } else {
              this.auth.updateUserDetails(result.userDetails);
                 this.event.publish('loginAuth','');  
                  this.navCtrl.setRoot(DashboardPage);// for vendor case;              
            }  					

  				})
  			}
  		})
  	}

}
