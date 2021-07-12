import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert';
import { AuthProvider } from '../../providers/auth/auth';
import { ImageProvider } from '../../providers/image/image';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { ProfileGalleryPage } from '../profile-gallery/profile-gallery';
import { VendorAccountAddressPage } from '../vendor-account-address/vendor-account-address';
import { VendorAccountCompanyPage } from '../vendor-account-company/vendor-account-company';
import { VendorAccountFullNamePage } from '../vendor-account-full-name/vendor-account-full-name';
import { VendorAccountPhonePage } from '../vendor-account-phone/vendor-account-phone';
import {VendorAccountWebPage} from '../vendor-account-web/vendor-account-web';

/**
 * Generated class for the VendorAccountSettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-vendor-account-settings',
  templateUrl: 'vendor-account-settings.html',
})
export class VendorAccountSettingsPage {
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
    public restApi: RestApiProvider,
    public modalCtrl:ModalController,
    public alertP:AlertProvider,
    public navParams: NavParams) {
  }

  get_profile() {
    let Data = {
    user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
    login_user:{"value":this.auth.getCurrentUserId(),"type":"NO"},
    }
    this.restApi.postData(Data,'getuserdata').then((result:any) => {
      console.log(result);
      if(result.status == 1){
        this.formData = result.userDetails;
      } else {

      }
    })
  }

  ionViewDidLoad() {
    this.get_profile();
    console.log('ionViewDidLoad VendorAccountSettingsPage');
  }

  ionViewWillEnter() {
    var userData = this.auth.getUserDetails();
    this.formData=userData;
  }

  company() {
    this.navCtrl.push(VendorAccountCompanyPage,{data:this.formData});
  }

  fullname() {
    this.navCtrl.push(VendorAccountFullNamePage,{data:this.formData});
  }

  address() {
    this.navCtrl.push(VendorAccountAddressPage,{data:this.formData});
  }

  web() {
    this.navCtrl.push(VendorAccountWebPage,{data:this.formData});
  }

  phone() {
    this.navCtrl.push(VendorAccountPhonePage,{data:this.formData});
  }

  update() {
    let Data = {
      user_id:{value:this.auth.getCurrentUserId(),"type":'NO'},
      company_name:{value:this.formData.company_name,"type":'NO'},
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
        // this.alertP.showAsync('Success',res.msg).then(() => {
          this.auth.updateUserDetails(res.userDetails);
          this.formData=res.userDetails;
          // this.navCtrl.pop();
        // });
      } else {
        this.alertP.show('Alert',res.msg);
      }
    })
  }

  getProfileImage() {
    // this.imageP.getImageForCrop2().then((data:any) => {
    //   this.formData.profile=data.preview;
    //   this.formData.profile_blob=data.file;
    //   this.formData.profile_blob_name=data.name;
    //   this.update();
    // });

    const modal = this.modalCtrl.create(ProfileGalleryPage,{});
    modal.present();
    modal.onDidDismiss((data) => {
      if (data) {
        console.log('get img path---', data);
        this.imageP.squareCroper(data.nativeURL).then((data:any) => {
            console.log('take img page -----',data);
            this.formData.profile=data.preview;
            this.formData.profile_blob=data.file;
            this.formData.profile_blob_name=data.name;
            this.update();
          })
     }
   })
  }

  getwallimage() {
    // this.imageP.getImageForCrop().then((data:any) => {
    //   this.formData.wall_image=data.preview;
    //   this.formData.cover_blob=data.file;
    //   this.formData.cover_blob_name=data.name;
    //   this.update();
    // });

    const modal = this.modalCtrl.create(ProfileGalleryPage,{});
    modal.present();
    modal.onDidDismiss((data) => {
      if (data) {
        console.log('get img path---', data);
        this.imageP.retegularCroper(data.nativeURL).then((data:any) => {
            console.log('take img page -----',data);
            this.formData.wall_image=data.preview;
            this.formData.cover_blob=data.file;
            this.formData.cover_blob_name=data.name;
            this.update();
          })
     }
   })
  }

}
