import { Component } from '@angular/core';
import { Events, ModalController, NavController, NavParams } from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert';
import { AuthProvider } from '../../providers/auth/auth';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { AutofillPlacesPage } from '../autofill-places/autofill-places';

/**
 * Generated class for the UserAccountLocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-user-account-location',
  templateUrl: 'user-account-location.html',
})
export class UserAccountLocationPage {
  public current_user:any = {
    wall_image:'',
    profile:'',
    nic_name:'',
    city:'',
    cityid:'',
    lat:'',
    lng:'',
    state:'',
    stateid:'',
    country:'',
    countryid:'',
    wall_blob:'',
    wall_name:'',
    profile_blob:'',
    profile_name:'',
    isshow:false,
  };

  selected_city=0;
  selected_country=0;
  selected_state=0;
  countries:any=new Array();
  states:any=new Array();
  sel_states:any=new Array();
  sel_cities:any=new Array();
  cities:any=new Array();
  showcitycountrystate=false;


  showcity =false;
  showstate=false;
  
  constructor(public navCtrl: NavController,
    public restApi:RestApiProvider,
    public alertP:AlertProvider,
    public events:Events,
    public modalCtrl:ModalController,
    public auth:AuthProvider,
     public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserAccountLocationPage');
    
  }

  ionViewWillEnter() {
    // this.getCountry();
 
    this.current_user = this.navParams.data.data;
      console.log('user detail--',this.current_user);
      //this.current_user.cityid=this.navParams.data.data.city_id;
      
      
      
    
      console.log("city country state", this.selected_city,this.selected_country,this.selected_state)
    
      // this.getcity();
      this.countries= this.auth.country;
      this.states = this.auth.state;

      
      this.cities=this.auth.cities;
      this.selected_country = (this.navParams.data.data.country_id == null)?'':this.navParams.data.data.country_id;
      setTimeout(()=>{
        

      },200)
      console.log('cities',this.cities);      
  }

  back(){
    this.navCtrl.pop()
  }

  // getCountry(){    
  //   var Data = {
  //     user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
  //   }
  //        this.restApi.postwithoutldr(Data,"getcountry").then((res:any)=>{
  //          console.log(res);
  //         if(res.status == 1){

  //           this.countries = res.country_detail;
  //           this.get_state();
  //           this.selected_country = (this.navParams.data.data.country_id == null)?'':this.navParams.data.data.country_id;
            
          
  //         } 
 
  //    }).catch((err)=>{
  //          this.alertP.presentToast(err.error.Message,'bottom')
  //    })
  // }

  // get_state() {
  //   let Data = {
  //     //country_id:{"value":this.data.countryid,"type":"NO"},
  //     user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
  //   }
  //   this.restApi.postwithoutldr(Data,'getstate').then((res:any) => {
  //     console.log(res);
  //     if(res.status == 1){
  //       this.states=res.state_detail;
  //       setTimeout(()=>{
  //         this.selected_state = (this.navParams.data.data.state_id == null)?'':this.navParams.data.data.state_id;
  //       },200);
        
  //     }
  //   })
  // }

  state_change(m) {
    
    console.log("country changed.......", this.selected_country);
    // this.showstate=false;
    // console.log(id);
    this.sel_states=[];
    this.sel_cities=[];
    // if(m==0){

    //   // this.current_user.stateid='';
    //   // this.selected_state=0;
    // }else if(m==1){
    //   // this.current_user.stateid=this.current_user.state_id;
    //   // this.city_change(this.current_user.stateid,1);
    // }    
    // this.current_user.country=country.country;
    for(let i=0;i<this.states.length;i++){
      if(this.selected_country==this.states[i].country_id){
        this.sel_states.push(this.states[i]);
      }
      if(i== this.states.length-1){
        this.selected_state = (this.navParams.data.data.state_id == null)?'':this.navParams.data.data.state_id;
        //this.selected_state = (this.navParams.data.data.country_id == null)?'':this.navParams.data.data.country_id;
        
      }
    }
  }

  // getcity(){
  // let Data = {
  //     user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
  //   }

  //   this.restApi.postwithoutldr(Data,'getcity').then((res:any) => {
  //     console.log(res);
  //     if(res.status == 1){
  //       this.cities = res.city_detail;
  //     }
  //   })
  // }

  get_city(city:any) {
    // this.current_user.city=city.city;
  }

  city_change(id:any,m:any) {
    console.log("state changed.......", this.selected_state);
    // this.showcity=false;
    this.sel_cities=[];
    // if(m==0){
     
    //   this.current_user.cityid='';
    //   // this.selected_city=0;
    // } else if(m==1){
    //   this.current_user.cityid=this.current_user.city_id;
    // }
    // this.current_user.state=state.state;
    for(let i=0;i<this.cities.length;i++){
      //console.log('prasoon',this.cities[i].state_id);
      if(this.selected_state==this.cities[i].state_id){
     
        this.sel_cities.push(this.cities[i]);
      }
      if(i==this.cities.length-1){
          this.selected_city = (this.navParams.data.data.city_id == null)?'':this.navParams.data.data.city_id;
      }
    }
  }

  update_account() {
    let Data = {
      "user_id":{value:this.auth.getCurrentUserId(), type:"NO"},
      "nic_name": { value: this.current_user.nic_name, type: "NINAME" },
      first_name:{value:this.current_user.first_name1,type:'NO'},      
      "address":{value:this.current_user.address, type:"NO"},
      "gender":{value:this.current_user.gender, type:"NO"},
      "country":{value:this.selected_country, type:"NO"},
      "state":{value:this.selected_state, type:"NO"},
     // "city":{value:this.current_user.city, type:"NO"},
      lat:{value:this.current_user.lat,type:"NO"},
      lng:{value:this.current_user.lng,type:"NO"},
      "zipcode":{value:this.current_user.zipcode, type:"NO"},
      "dob":{value:this.current_user.dob1, type:"NO"},
      isshow:{value:this.current_user.isshow?1:0,type:"NO"},

     //"dob1":{value:this.current_user.dob1, type:"NO"},
      //"profile":{"value":this.blob_image,"type":'IMAGE1',"name":this.blobImageName}
   }

   if(this.current_user.city != null&&this.current_user.city!='null'){
     console.log('city---------------',this.current_user.city);
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
            this.current_user=res.userDetails;
          
            this.navCtrl.pop();
            setTimeout(() => {
              this.events.publish('ownerProfile_',res.userDetails);
              this.events.publish('loginAuth','');
            }, 500);
        //  })
       }

    }).catch((err)=>{
          // console.log('mizan',err);
         //  this.alertP.presentToast(err.error.Message,'bottom')
    })
  }

  OpenAutofillPlaces() {
    const modal = this.modalCtrl.create(AutofillPlacesPage);
    modal.onDidDismiss((location: any) => {
      if (location) {
        console.log(location);
        this.current_user.city=location.fulladdress;
        this.current_user.lat=location.lat;
        this.current_user.lng=location.lng;
        // this.address = location.fulladdress;
        // this.lat = location.lat;
        // this.lng = location.lng;
      }
    });
    modal.present();
  }

}
