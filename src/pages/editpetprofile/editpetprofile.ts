import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from './../../providers/auth/auth';
import { AlertProvider } from './../../providers/alert/alert';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import { ImageProvider } from '../../providers/image/image';

/**
 * Generated class for the EditpetprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-editpetprofile',
  templateUrl: 'editpetprofile.html',
})
export class EditpetprofilePage {
race:any = new Array();
breed:any = new Array();
all_breed:any = new Array();
coat:any = new Array();
color:any = new Array();
all_color:any = new Array();
bihavior:any = new Array();
size:any = new Array();
date_a:any = new Date().toISOString();
raceid:any = '';
breedid:any = '';
coatid:any = '';
colorid:any = '';
bihaviorid:any = '';
sizeid:any = '';
weight:any = '';
name:any = '';
gender:any = '';
dob:any = '';

petId:any;

petImage:any = '';
blob_petimg:any = '';
blob_petname:any = '';

wallImage:any = '';
blob_petimg_wall:any = '';
blob_petimg_wall_name:any = '';

petInfo:any = '';

  constructor(public navCtrl: NavController, 
  	 public rest_api:RestApiProvider,
    public image:ImageProvider,
    public auth:AuthProvider,
    public alertP:AlertProvider,
  	public navParams: NavParams) {

  	this.petId = this.navParams.get('id');
  	this.get_petProfile(this.petId);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditpetprofilePage');
  }

  remove_dob(){
    this.dob = '';
  }

  initializeData() {
  	this.wallImage = this.petInfo.wall_image;
  	this.petImage = this.petInfo.profile;
  	this.name = this.petInfo.name;
  	this.gender = this.petInfo.gender;
  	this.dob = this.petInfo.dob;

 


 
 	

  	this.bihaviorid = this.petInfo.behaviour.id;
  	this.sizeid = this.petInfo.size.id;
  	this.weight = this.petInfo.weight;
    
  }

  get_petProfile(pet_id:any) {
    let Data = {
      id:{"value":pet_id,"type":"NO"},
      start:{"value":10,"type":"NO"},
      limit:{"value":0,"type":"NO"},
      user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
      login_user:{"value":this.auth.getCurrentUserId(),"type":"NO"},
      
    }
    this.rest_api.postData(Data,'get_pet_profile').then((result:any) => {
      console.log(result);
      if(result.status == 1){
        this.petInfo = result.pet_data;
        this.raceid = this.petInfo.race.id;
      
        this.coatid = this.petInfo.coat.id;
 	
        console.log("raceid",this.raceid,this.breedid,this.coatid,this.colorid);

        this.get_race();
        this.get_coat();
      }
    })
  }

  get_race() {
    let Data = {
      user_id:{value:this.auth.getCurrentUserId(),type:'NO'},
    }
    this.rest_api.postwithoutldr(Data,'getrace').then((result:any) => {
      // console.log(result);
      if(result.status == 1) {
        this.race = result.race;

       
        this.get_bihavior();
        this.get_size();
        this.get_breed('');
       
      }
    })
  }

   get_bihavior() {
     let Data = {
      user_id:{value:this.auth.getCurrentUserId(),type:'NO'},
    }
    this.rest_api.postwithoutldr(Data,'getbehaviour').then((result:any) => {
      console.log(result);
      if(result.status == 1) {
        this.bihavior = result.behaviour;
      }
    })
  }

  get_size() {
    let Data = {
      user_id:{value:this.auth.getCurrentUserId(),type:'NO'},
    }
    this.rest_api.postwithoutldr(Data,'getsize').then((result:any) => {
      console.log(result);
      if(result.status == 1) {
        this.size = result.size;
      }
    })
  }

  get_coat() {
    let Data = {
      user_id:{value:this.auth.getCurrentUserId(),type:'NO'},
    }
    this.rest_api.postwithoutldr(Data,'getcoat').then((result:any) => {
      console.log(result);
      if(result.status == 1) {
        this.coat = result.coat;
        this.get_color('');
      }
    })
  }

  get_breed(race_id) {
    let Data = {
     // race_id:{"value":race_id,"type":"NO"},
      user_id:{value:this.auth.getCurrentUserId(),type:'NO'},      
    }

    this.rest_api.postwithoutldr(Data,'getbreed').then((result:any) => {
      console.log(result);
      if(result.status == 1){
        // this.breed = result.breed;
        this.all_breed = result.breed;

        if(this.raceid){
          this.mergeup(this.raceid,'race');
        }
        setTimeout((res)=>{
          this.breedid = this.petInfo.breed.id;
        },200)
       
       
      }
    })
  }

  get_color(coat_id) {
     let Data = {
     // coat_id:{"value":coat_id,"type":"NO"},
      user_id:{value:this.auth.getCurrentUserId(),type:'NO'},      
    }

    this.rest_api.postData(Data,'getcolor').then((result:any) => {
      console.log(result);
      if(result.status == 1){
        // this.color = result.color;
        this.all_color = result.color;
        if(this.coatid){
          this.mergeup1(this.coatid,'coat');
        }
        setTimeout(()=>{
          this.colorid = this.petInfo.color.id; 
        },100)
        
    	  this.initializeData();
      }
    })
  }

  getProfileImage(){
       this.image.getImage().then((img:any) => {
         this.petImage = img;

         var file = this.image.imgURItoBlob(img);

         this.blob_petimg = file;
         this.blob_petname = this.image.generateImageName('img.jpg');
         console.log('blob--',this.blob_petimg,'name--',this.blob_petname);
       })
    }

    getwallimage() {
      this.image.getImage().then((img:any) => {
         this.wallImage = img;

         var file = this.image.imgURItoBlob(img);

         this.blob_petimg_wall = file;
         this.blob_petimg_wall_name = this.image.generateImageName('img.jpg');
         console.log('blob--',this.blob_petimg_wall,'name--',this.blob_petimg_wall_name);
       })
    }

    update() {
      if(this.weight>250){
        this.alertP.show('Alert','Weight colud not be greater than 250 pounds.');
        return;
      }
    let Data = {
      user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
      id:{"value":this.petId,"type":"NO"},
      name:{"value":this.name,"type":"PNAME"},
      gender:{"value":this.gender,"type":"GENDR"},
      dob:{"value":this.dob,"type":"NO"},
      race:{"value":this.raceid,"type":"RAC"},
      breed:{"value":this.breedid,"type":"BRD"},
      coat:{"value":this.coatid,"type":"COAT"},
      color:{"value":this.colorid,"type":"COLR"},
      behaviour:{"value":this.bihaviorid,"type":"BEHAV"},
      size:{"value":this.sizeid,"type":"SZE"},
      weight:{"value":this.weight,"type":"NO"},
    }
    if(this.blob_petimg){
      Data['profile'] = {"value":this.blob_petimg,"type":"IMAGE1","name":this.blob_petname};
    }

    if(this.blob_petimg_wall){
      Data['wall_image'] = {"value":this.blob_petimg_wall,"type":"IMAGE1","name":this.blob_petimg_wall_name};
    }

    this.rest_api.postData2(Data,0,'edit_pet').then((result:any) => {
      console.log(result);
      if(result.status == 1){
        this.alertP.showAsync('Success',result.msg).then(() => {
            this.navCtrl.pop();         
        })
      } else {
        this.alertP.show('Alert',result.msg);
      }
    })
  }

  mergeup(id:any,type:any) {
    if(type=='race'){
      this.breed=[];
      this.breedid='';
     // console.log(id,type,this.all_breed);
      for(let i=0;i<this.all_breed.length;i++){
        if(id == this.all_breed[i]['race_id']){
         // console.log('match');
          this.breed.push(this.all_breed[i]);
        }
      }
     // console.log('find breed--',this.breed);
    }

    if(type=='coat'){
      this.color=[];
      this.colorid='';
      for(let i=0;i<this.all_color.length;i++){
        if(id == this.all_color[i]['coat_id']){
          this.color.push(this.all_color[i]);
        }
      }
    }
  }

  mergeup1(id:any,type:any) {
    if(type=='race'){
      this.breed=[];
      this.breedid='';
     // console.log(id,type,this.all_breed);
      for(let i=0;i<this.all_breed.length;i++){
        if(id == this.all_breed[i]['race_id']){
         // console.log('match');
          this.breed.push(this.all_breed[i]);
        }
      }
     // console.log('find breed--',this.breed);
    }

    if(type=='coat'){
      this.color=[];
      this.colorid='';
      for(let i=0;i<this.all_color.length;i++){
        if(id == this.all_color[i]['coat_id']){
          this.color.push(this.all_color[i]);
        }
      }
    }
  }

}
