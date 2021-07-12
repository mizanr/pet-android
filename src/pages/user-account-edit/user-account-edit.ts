import { UserAccountPersonalPage } from './../user-account-personal/user-account-personal';
import { Component } from '@angular/core';
import { Events, ModalController, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { AlertProvider } from '../../providers/alert/alert';
import { ImageProvider } from '../../providers/image/image';
import { UserAccountGenderPage } from '../user-account-gender/user-account-gender';
import { UserAccountLocationPage } from '../user-account-location/user-account-location';
import { Crop } from '@ionic-native/crop';
import { ProfileGalleryPage } from '../profile-gallery/profile-gallery';
import { MediaProvider } from '../../providers/media/media';

/**
 * Generated class for the UserAccountEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-user-account-edit',
  templateUrl: 'user-account-edit.html',
})
export class UserAccountEditPage {
  public current_user:any = {
    wall_image:'',
    profile:'',
    nic_name:'',
    city:'',
    state:'',
    wall_blob:'',
    wall_name:'',
    profile_blob:'',
    profile_name:'',
    isshow:false,
  };
  constructor(public navCtrl: NavController,
    public auth:AuthProvider,
    public restApi:RestApiProvider,
    public alertP:AlertProvider,
    public imageP: ImageProvider,
    public modalCtrl:ModalController,
    private crop: Crop,
    public mediaP:MediaProvider,
    public events:Events,
    public navParams: NavParams) {
      events.subscribe('ownerProfile_',(data) => {
        if(data){
          this.current_user=data;
        }
      })

  }

  ionViewWillEnter() {
    this.current_user = this.navParams.data.data;
      console.log('user detail--',this.current_user);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserAccountEditPage');
  }


  squareCroper(img_path:any) {
    // return new Promise((resolve,reject) => {
      this.crop.crop(img_path, {quality: 75})
      .then(
        newImage => { 
          console.log('croped image path is: ' + newImage);
        },
        error => {
            console.error('Error cropping image', error)
        }
      );
    // })
  }


  personal(){
    this.navCtrl.push(UserAccountPersonalPage,{data:this.current_user});
  }

  gendar() {
    this.navCtrl.push(UserAccountGenderPage,{data:this.current_user});
  }

  location() {
    this.navCtrl.push(UserAccountLocationPage,{data:this.current_user});
  }

  getProfileimage() {
    // this.imageP.getImage().then((img:any) => {
    //   this.current_user.profile = img;
    //   var file = this.imageP.imgURItoBlob(img);
    //   this.current_user.profile_blob = file;
    //   this.current_user.profile_name = this.imageP.generateImageName('img.jpg');
    //   this.update_account();
    //   console.log('blob--',this.current_user.profile_blob,'name--',this.current_user.profile_name);
    // })
    // this.imageP.getImageForCrop2().then((data:any) => {
    //   this.current_user.profile=data.preview;
    //   this.current_user.profile_blob=data.file;
    //   this.current_user.profile_name=data.name;
    //   console.log('blob--',this.current_user.profile_blob,'name--',this.current_user.profile_name);
    //   this.update_account();
    // });

    // const modal = this.modalCtrl.create(ProfileGalleryPage,{});
    // modal.present();
    // modal.onDidDismiss((data) => {
    //   if (data) {
    //     console.log('get img path---', data);
    //     this.imageP.squareCroper(data.nativeURL).then((data:any) => {
    //         console.log('take img page -----',data);
    //         this.current_user.profile=data.preview;
    //         this.current_user.profile_blob=data.file;
    //         this.current_user.profile_name=data.name;
    //         this.update_account();
    //          console.log('blob--',this.current_user.wall_blob,'name--',this.current_user.wall_name);
    //       })
    //  }
    // })
    
    this.mediaP.selectImage(true,'square').then((res: any) => {
      if(res !=0) {
      console.log('image----', res);
            this.current_user.profile=res.preview;
            this.current_user.profile_blob=res.file;
            this.current_user.profile_name=res.name;
        this.update_account();
      }
    })
  }

  getwallimage() {
    // this.imageP.getImage().then((img:any) => {
    //   this.current_user.wall_image = img;
    //   var file = this.imageP.imgURItoBlob(img);
    //   this.current_user.wall_blob = file;
    //   this.current_user.wall_name = this.imageP.generateImageName('img.jpg');
    //   this.update_account();

    //   console.log('blob--',this.current_user.wall_blob,'name--',this.current_user.wall_name);
    // })
    // this.imageP.getImageForCrop().then((data:any) => {
    //   console.log('take img page -----',data);
    //   this.current_user.wall_image=data.preview;
    //   this.current_user.wall_blob=data.file;
    //   this.current_user.wall_name=data.name;
    //   this.update_account();
    //    console.log('blob--',this.current_user.wall_blob,'name--',this.current_user.wall_name);
    // })

    // const modal = this.modalCtrl.create(ProfileGalleryPage,{});
    // modal.present();
    // modal.onDidDismiss((data) => {
    //   if (data) {
    //     console.log('get img path---', data);
    //     this.imageP.retegularCroper(data.nativeURL).then((data:any) => {
    //         console.log('take img page -----',data);
    //         this.current_user.wall_image=data.preview;
    //         this.current_user.wall_blob=data.file;
    //         this.current_user.wall_name=data.name;
    //         this.update_account();
    //          console.log('blob--',this.current_user.wall_blob,'name--',this.current_user.wall_name);
    //       })
    //  }
    // })    
    this.mediaP.selectImage(true,'cover').then((res: any) => {
      if(res!=0){
      console.log('image----', res);
      this.current_user.wall_image=res.preview;
            this.current_user.wall_blob=res.file;
            this.current_user.wall_name = res.name;
        this.update_account();
      }
    })

  }

  update_account() {
    let Data = {
      "user_id":{value:this.auth.getCurrentUserId(), type:"NO"},
      "nic_name": { value: this.current_user.nic_name, type: "NINAME" },
      first_name:{value:this.current_user.first_name1,type:'NO'},      
      "address":{value:this.current_user.address, type:"NO"},
      "gender":{value:this.current_user.gender, type:"NO"},
      "country":{value:this.current_user.country, type:"NO"},
      "state":{value:this.current_user.state, type:"NO"},
      //"city":{value:this.current_user.city, type:"NO"},
      "zipcode":{value:this.current_user.zipcode, type:"NO"},
      "dob":{value:this.current_user.dob, type:"NO"},
      "dob1":{value:this.current_user.dob1, type:"NO"},
      //"profile":{"value":this.blob_image,"type":'IMAGE1',"name":this.blobImageName}
      isshow:{value:this.current_user.isshow?1:0,type:"NO"},
   }

   if(this.current_user.city!=null&&this.current_user.city!='null'){
    Data["city"]={value:this.current_user.city, type:"NO"};
   }

   if(this.current_user.profile_blob){
     Data['profile']={"value":this.current_user.profile_blob,"type":'NO',"name":this.current_user.profile_name}
   }
   if(this.current_user.wall_blob){
    Data['wall_image']={"value":this.current_user.wall_blob,"type":'NO',"name":this.current_user.wall_name}
    }
    this.restApi.postData2(Data,0,"edit_profile").then((res:any)=>{
      console.log("update profile", res);
       if(res.status == 1){
        //  this.alertP.showAsync('Success',res.msg).then(() => {
            this.auth.updateUserDetails(res.userDetails);
            this.events.publish('loginAuth','');
           // this.navCtrl.pop();
        //  })
       }

    }).catch((err)=>{
          // console.log('mizan',err);
         //  this.alertP.presentToast(err.error.Message,'bottom')
    })
  }

}
