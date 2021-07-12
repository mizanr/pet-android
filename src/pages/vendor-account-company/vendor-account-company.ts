import { Component } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard';
import { Events, NavController, NavParams } from 'ionic-angular';
import { LangPipe } from '../../pipes/lang/lang';
import { AlertProvider } from '../../providers/alert/alert';
import { AuthProvider } from '../../providers/auth/auth';
import { RestApiProvider } from '../../providers/rest-api/rest-api';

/**
 * Generated class for the VendorAccountCompanyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-vendor-account-company',
  templateUrl: 'vendor-account-company.html',
})
export class VendorAccountCompanyPage {
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
    public events:Events,
    public auth:AuthProvider,
    public restApi:RestApiProvider,
    public alertP: AlertProvider,
    public lang:LangPipe,
    public keyboard:Keyboard,
    public navParams: NavParams) {
      this.formData=navParams.data.data;
      console.log(this.formData);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VendorAccountCompanyPage');
  }

  update() {
    let Data = {
      user_id:{value:this.auth.getCurrentUserId(),"type":'NO'},
      company_name:{value:this.formData.company_name,"type":'CNAME'},
      first_name:{value:this.formData.first_name,"type":'NO'},
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
        this.alertP.showAsync(
          this.lang.transform('SUCCESS',[]), res.msg).then(() => {
          this.auth.updateUserDetails(res.userDetails);
          this.navCtrl.pop();          
        });
      } else {
        this.alertP.show(this.lang.transform('ALERT',[]),res.msg);
      }
    })
  }

  submit() {
   this.navCtrl.pop();
  }

}
