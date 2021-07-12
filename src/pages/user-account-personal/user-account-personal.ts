import { Component } from '@angular/core';
import { Events, NavController, NavParams } from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert';
import { AuthProvider } from '../../providers/auth/auth';
import { ImageProvider } from '../../providers/image/image';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { DatePicker } from '@ionic-native/date-picker';
import { Crop } from '@ionic-native/crop';
import { LangPipe } from '../../pipes/lang/lang';
/**
 * Generated class for the UserAccountPersonalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-user-account-personal',
  templateUrl: 'user-account-personal.html',
})
export class UserAccountPersonalPage {
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
    dob1:'',
    isshow:false,
  };
  Max:any = new Date().toISOString();
  constructor(public navCtrl: NavController, 
    public auth:AuthProvider,
    public restApi:RestApiProvider,
    public alertP:AlertProvider,
    public events:Events,
    public crop: Crop,
    public lang:LangPipe,
    private datePicker: DatePicker,
    public imageP:ImageProvider,
    public navParams: NavParams) {

      console.log(new Date().valueOf(),
       new Date(new Date().setDate(new Date().getDate() + 10)).valueOf(),)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserAccountPersonalPage');
  }

  ionViewWillEnter() {
    this.current_user = this.navParams.data.data;
      console.log('user detail--',this.current_user);
      this.current_user.isshow=this.current_user.isshow==1?true:false;
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


  datepicker() {

    let d=new Date()
    let day= d.getDate()>9?d.getDate():"0"+d.getDate() ;
    let month= ((d.getMonth()+1)>9)?(d.getMonth()+1):"0"+(d.getMonth()+1) ;
    let year= d.getFullYear();
   let Max= year+"-"+month+"-"+day;

   console.log(Max);

    this.datePicker.show({
      date: this.current_user.dob,
      mode: 'date',
      // minDate: new Date().valueOf(),
      maxDate: new Date(),
      androidTheme:this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(
      date => {
          console.log('Got date: ', date);
          let d=new Date(date)
          let day= d.getDate()>9?d.getDate():"0"+d.getDate() ;
          let month= ((d.getMonth()+1)>9)?(d.getMonth()+1):"0"+(d.getMonth()+1) ;
          let year= d.getFullYear();
         this.current_user.dob= day+"-"+month+"-"+year; //year+"-"+month+"-"+day;
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  update_account() {
    let Data = {
      "user_id":{value:this.auth.getCurrentUserId(), type:"NO"},
      "nic_name":{value:this.current_user.nic_name, type:"NINAME"},
      "address":{value:this.current_user.address, type:"NO"},
      "gender":{value:this.current_user.gender, type:"NO"},
      "country":{value:this.current_user.country, type:"NO"},
      "state":{value:this.current_user.state, type:"NO"},
      isshow:{value:this.current_user.isshow?1:0,type:"NO"},
      first_name:{value:this.current_user.first_name1,type:'NO'},
     // "city":{value:this.current_user.city, type:"NO"},
      lat:{value:this.current_user.lat,type:"NO"},
      lng:{value:this.current_user.lng,type:"NO"},
      "zipcode":{value:this.current_user.zipcode, type:"NO"},
      "dob":{value:this.current_user.dob1, type:"NO"},
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
         this.alertP.showAsync(
           this.lang.transform('SUCCESS',[]), res.msg).then(() => {
            this.auth.updateUserDetails(res.userDetails);
            this.events.publish('loginAuth','');
            this.navCtrl.pop();
         })
       }

    }).catch((err)=>{
          // console.log('mizan',err);
         //  this.alertP.presentToast(err.error.Message,'bottom')
    })
  }

}
