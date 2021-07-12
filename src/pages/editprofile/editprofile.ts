import { ChatdetailsPage } from './../chatdetails/chatdetails';
import { AlertProvider } from './../../providers/alert/alert';
import { AuthProvider } from './../../providers/auth/auth';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ImageProvider } from '../../providers/image/image';
import { Platform, Nav, Events } from 'ionic-angular';


/**
 * Generated class for the EditprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage {

  country:any = new Array();
  cities:any = new Array();
  states:any = new Array();
  pincodearray:any = new Array();

  info:any='';
date_a:any = new Date().toISOString();
  blobImageName:any;
  // userBlobImage:any;
  blob_image:any = '';
  isState:any = false;
  isCity:any = false;

  profile:any;
  data={
    "Nickname":"",
    "CompanyName":"",
    "Email":"",
    "Genderid":"",
    "Address1":"",
    "Address2":"",
    "Dob":"",

    "Countryid":"",
    "Stateid":"",
    "Cityid":"",

    "Zipcode":"",

    "ProfilePicture":"",
    "Account_type":"",

    countryid:'',
    stateid:'',
    cityid:'',
    isshow:false,
  }
  state=[];

  constructor(
    public navCtrl: NavController,
    public api:RestApiProvider,
    public auth:AuthProvider,
    public image:ImageProvider,
    public alertP:AlertProvider,
    public navParams: NavParams,
    public event:Events,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditprofilePage');
    this.get_profile();

  }

  intializeData() {
    this.data.Nickname = this.info.nic_name;
    this.data.Genderid = this.info.gender;
    this.data.Address1 = this.info.address;
    // this.data.Dob = this.info.dob;
    this.data.Dob = this.info.dob1;
    this.data.countryid = this.info.country_id;
    this.data.stateid = this.info.state_id;
    this.data.cityid = this.info.city_id;
    this.data.Zipcode = this.info.zipcode_id;
    this.data.Zipcode = this.info.zipcode;
    this.data.ProfilePicture = this.info.profile;
    console.log(this.data,'data------------',this.info);
    //this.getcity(this.data.stateid); 
  }

  remove_dob() {
    this.data.Dob = '';
  }

  get_profile() {
    let Data = {
        user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
        login_user:{"value":this.auth.getCurrentUserId(),"type":"NO"},

    }
    this.api.postData(Data,'getuserdata').then((res:any) => {
      console.log(res);
      if(res.status == 1){
        this.getCountry();
        this.auth.updateUserDetails(res.userDetails);
        this.info = this.auth.getUserDetails();
        this.intializeData();
      }
    })
  }

  getCountry(){    
    var Data = {
      user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
    }
         this.api.postwithoutldr(Data,"getcountry").then((res:any)=>{
           console.log(res);
          if(res.status == 1){
            this.country = res.country_detail;
            this.get_state(1);

          } 
 
     }).catch((err)=>{
           this.alertP.presentToast(err.error.Message,'bottom')
     })
  }

  get_state(m){
    this.isState = true;
      //console.log(country_id);

    let Data = {
      country_id:{"value":this.data.countryid,"type":"NO"},
      user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},

    }

    this.api.postwithoutldr(Data,'getstate').then((res:any) => {
      console.log(res);
      if(res.status == 1){
        this.isCity = true;
        // this.getcity(this.data.stateid);
        this.states = res.state_detail;
       
           this.getcity(m);
        
        if(m==0){
            this.data.stateid="";
            this.data.cityid="";
            this.data.Zipcode="";
        }
       
      } else {
         this.isState = false;
      }
    })
  }

  

  getcity(m){
    this.isCity = true;
    console.log(m);
  let Data = {
      state_id:{"value":this.data.stateid,"type":"NO"},
      country_id:{"value":this.data.countryid,"type":"NO"},
      user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},

    }

    this.api.postwithoutldr(Data,'getcity').then((res:any) => {
      console.log(res);
      if(res.status == 1){
        this.isCity = false;
        this.cities = res.city_detail;
        if(m==0){
            this.data.cityid="";
            this.data.Zipcode="";
        }else if (m==2){
            this.data.Zipcode="";
        }
      } else {
        this.data.cityid="";
            this.data.Zipcode="";
        this.isCity = false;
      }
    })

  }

  zip_null(event:any) {
    this.data.Zipcode="";
  }

  get_zip(city_id) {
     let Data = {
      state_id:{"value":this.data.stateid,"type":"NO"},
      country_id:{"value":this.data.countryid,"type":"NO"},
      city_id:{"value":city_id,"type":"NO"},
      user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
      
    }

    this.api.postwithoutldr(Data,'getpincode').then((res:any) => {
      console.log(res);
      if(res.status == 1){
        this.pincodearray = res.pincode;
      }
    })
  }

  

//   getP(id){
//     this.api.postData({},"Provinces?CountryId="+id).then((res:any)=>{
//       this.state=res;


// }).catch((err)=>{
//       console.log('mizan',err);
//       this.alertP.presentToast(err.error.Message,'bottom')
// })
// }
// getCity(id){
//   this.api.postData({},"Cities?ProvinceId="+id).then((res:any)=>{
//    // this.city=res;


// }).catch((err)=>{
//     // console.log('mizan',err);
//     this.alertP.presentToast(err.error.Message,'bottom')
// })
// }


// user_id=1,nic_name=reshu,address=indore,dob='',gender=1,country=1,state=13,city=1,zipcode=1

updateProfile(){
    let Data = {
        "user_id":{value:this.auth.getCurrentUserId(), type:"NO"},
        "nic_name":{value:this.data.Nickname, type:"NINAME"},
        "address":{value:this.data.Address1, type:"NO"},
        "gender":{value:this.data.Genderid, type:"NO"},
        "country":{value:this.data.countryid, type:"COUNTRY"},
        "state":{value:this.data.stateid, type:"STATE"},
        "city":{value:this.data.cityid, type:"CITY"},
        "zipcode":{value:this.data.Zipcode, type:"ZIPCODE"},
        "dob":{value:this.data.Dob, type:"NO"},
        isshow:{value:this.data.isshow?1:0,type:"NO"},
       // "dob1":{value:this.data.Dob, type:"NO"},
        //"profile":{"value":this.blob_image,"type":'IMAGE1',"name":this.blobImageName}
     }

     if(this.blob_image){
       Data['profile']={"value":this.blob_image,"type":'IMAGE1',"name":this.blobImageName}
     }

     console.log(Data);
    
     this.api.postData2(Data,0,"edit_profile").then((res:any)=>{
       console.log("update profile", res);
        if(res.status == 1){
          this.alertP.showAsync('Success',res.msg).then(() => {            
             this.auth.updateUserDetails(res.userDetails);
             this.event.publish('loginAuth','');
             this.navCtrl.pop();
          })
        }

     }).catch((err)=>{
           // console.log('mizan',err);
          //  this.alertP.presentToast(err.error.Message,'bottom')
     })
   }
  

   getProfileImage(){
       this.image.getImage().then((img:any) => {
         this.data.ProfilePicture = img;

         var file = this.image.imgURItoBlob(img);

         console.log('file',file);

         this.blob_image = file;
         this.blobImageName = this.image.generateImageName('img.jpg');
         console.log('blob--',this.blob_image,'name--',this.blobImageName);
       })
    }
}
