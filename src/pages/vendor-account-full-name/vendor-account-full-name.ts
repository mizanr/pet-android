import { Component } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard';
import { Events, NavController, NavParams } from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert';
import { AuthProvider } from '../../providers/auth/auth';
import { ImageProvider } from '../../providers/image/image';
import { RestApiProvider } from '../../providers/rest-api/rest-api';

/**
 * Generated class for the VendorAccountFullNamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-vendor-account-full-name',
  templateUrl: 'vendor-account-full-name.html',
})
export class VendorAccountFullNamePage {
  formData:any = {
    profile:'',
    profile_blob:'',
    profile_blob_name:'',
    wall_image:'',
    cover_blob:'',
    cover_blob_name:'',
    address:'',
    full_name:'',
    web:'',
    lat:'',
    lng:'',
  }
  constructor(public navCtrl: NavController, 
    public auth:AuthProvider,
    public imageP:ImageProvider,
    public restApi:RestApiProvider,
    public alertP:AlertProvider,
    public events:Events,
    public keyboard:Keyboard,
    public navParams: NavParams) {
      this.formData=navParams.data.data;
      console.log(this.formData);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VendorAccountFullNamePage');
  }

  update() {
    let Data = {
      user_id:{value:this.auth.getCurrentUserId(),"type":'NO'},
      company_name:{value:this.formData.company_name,"type":'NO'},
      first_name:{value:this.formData.first_name,"type":'FUNAME'},
      address:{value:this.formData.address,"type":'NO'},
      lat:{value:this.formData.lat,"type":'NO'},
      lng:{value:this.formData.lng,"type":'NO'},
      website:{value:this.formData.website,"type":'NO'},
      phone:{value:this.formData.phone,"type":'NO'},
      // poc:{"value":this.poc_name,"type":'POC'},
      // profile:{"value":this.blob_img,"type":"NO","name":this.blob_name},
    }

    if(this.formData.profile_blob){
      Data['company_logo']={value:this.formData.profile_blob,type:"NO",name:this.formData.profile_blob_name};
    }

    if(this.formData.cover_blob){
      Data['wall_image']={value:this.formData.cover_blob,type:"NO",name:this.formData.cover_blob_name};
    }
    this.restApi.postData2(Data,0,'edit_vendor_profile').then((res:any) => {
      if(res.status==1){
        this.alertP.showAsync('Success',res.msg).then(() => {
          this.auth.updateUserDetails(res.userDetails);
          this.navCtrl.pop();
        });
      } else {
        this.alertP.show('Alert',res.msg);
      }
    })
  }

  submit() {
    this.navCtrl.pop();
  }

}
