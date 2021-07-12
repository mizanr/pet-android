import { UploadImagePage } from './../upload-image/upload-image';
import { Component } from '@angular/core';
import { Events, NavController, NavParams } from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the UserAccountGenderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-user-account-gender',
  templateUrl: 'user-account-gender.html',
})
export class UserAccountGenderPage {
  public current_user:any = {
    wall_image:'',
    profile:'',
    nic_name:'',
    city:'',
    lat:'',
    lng:'',
    state:'',
    wall_blob:'',
    wall_name:'',
    profile_blob:'',
    profile_name:'',
    isshow:false,
  };
  ismale:any=false;
  isfemale:any=false;
  isdont:any=false;

  constructor(public navCtrl: NavController,
    public restApi:RestApiProvider,
    public alertP:AlertProvider,
    public events:Events,
    public auth:AuthProvider,
     public navParams: NavParams) {
  }

  ionViewWillEnter() {
    this.current_user = this.navParams.data.data;
      console.log('user detail--',this.current_user);
    if (this.current_user.gender == 'male' || this.current_user.gender == 'Masculino' ||
    this.current_user.gender=='masculino') {
        this.ismale=true;       ;
    } else if (this.current_user.gender == 'female' || this.current_user.gender == 'Femenino'
    || this.current_user.gender=='femenino') {
        this.isfemale=true;
      }else if(this.current_user.gender='dont'){
        this.isdont=true;
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserAccountGenderPage');
  }
  getProfileImage(){
    this.navCtrl.push(UploadImagePage)
  }
  back(){
    this.navCtrl.pop()
  }

  gendar(g:any){
    if(g=='m'){
      this.ismale=true;
      this.current_user.gender='male';
      this.update_account();
    }else if(g=='f'){
      this.isfemale=true;
      this.current_user.gender='female';
      this.update_account();
    }else if(g=='d'){
      this.isdont=true;
      this.current_user.gender='dont';
      this.update_account();
    }
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
     // "city":{value:this.current_user.city, type:"NO"},
      lat:{value:this.current_user.lat,type:"NO"},
      lng:{value:this.current_user.lng,type:"NO"},
      "zipcode":{value:this.current_user.zipcode, type:"NO"},
      "dob":{value:this.current_user.dob1, type:"NO"},
      isshow:{value:this.current_user.isshow?1:0,type:"NO"},

      //"dob1":{value:this.current_user.dob1, type:"NO"},
      //"profile":{"value":this.blob_image,"type":'IMAGE1',"name":this.blobImageName}
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
            this.navCtrl.pop();
        //  })
       }

    }).catch((err)=>{
          // console.log('mizan',err);
         //  this.alertP.presentToast(err.error.Message,'bottom')
    })
  }

}
