import { Component } from '@angular/core';
import { Platform, Nav, Events } from 'ionic-angular';

import { NavController, NavParams } from 'ionic-angular';
import { NewsFeedPage } from '../news-feed/news-feed';
import { TabsPage } from '../tabs/tabs';

import { AuthProvider } from './../../providers/auth/auth';
import { AlertProvider } from './../../providers/alert/alert';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import { ImageProvider } from '../../providers/image/image';

/**
 * Generated class for the AddpetsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-addpets',
  templateUrl: 'addpets.html',
})
export class AddpetsPage {
race:any = new Array();
breed:any = new Array();
all_breed:any = new Array();
coat:any = new Array();
color:any = new Array();
all_color:any = new Array();
bihavior:any = new Array();
size:any = new Array();
date_1:any = new Date().toISOString();
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

petImage:any = '';
blob_petimg:any = '';
blob_petname:any = '';

wallImage:any = '';
blob_petimg_wall:any = '';
blob_petimg_wall_name:any = '';

  constructor(public navCtrl: NavController,public auth:AuthProvider,
    public rest_api:RestApiProvider,
    public event:Events,
    public image:ImageProvider,    
    public alertP:AlertProvider,
   public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.get_race();
    console.log('ionViewDidLoad AddpetsPage');
  }

  remove_dob(){
    this.dob = '';
  }

  get_race() {
   let Data = {
     user_id:{value:this.auth.getCurrentUserId(),"type":"NO"},
   }
    this.rest_api.postData(Data,'getrace').then((result:any) => {
      // console.log(result);
      if(result.status == 1) {
        this.race = result.race;
        this.get_coat();
        this.get_bihavior();
        this.get_size();
        this.get_breed('');
        this.get_color('');
      }
    })
  }

   get_bihavior() {
     let Data = {
     user_id:{value:this.auth.getCurrentUserId(),"type":"NO"},
   }
    this.rest_api.postwithoutldr(Data,'getbehaviour').then((result:any) => {
      console.log('get_behave',result);
      if(result.status == 1) {
        this.bihavior = result.behaviour;
      }
    })
  }

  get_size() {
     let Data = {
     user_id:{value:this.auth.getCurrentUserId(),"type":"NO"},
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
     user_id:{value:this.auth.getCurrentUserId(),"type":"NO"},
   }
    this.rest_api.postwithoutldr(Data,'getcoat').then((result:any) => {
      console.log('coat_all_data--------',result);
      if(result.status == 1) {
        this.coat = result.coat;
      }
    })
  }

  get_breed(race_id) {
    let Data = {
     // race_id:{"value":race_id,"type":"NO"},
     user_id:{value:this.auth.getCurrentUserId(),"type":"NO"},      
    }

    this.rest_api.postwithoutldr(Data,'getbreed').then((result:any) => {
      console.log('get_breed------',result);
      if(result.status == 1){
        // this.breed = result.breed;
        this.all_breed = result.breed;
      }
    })
  }

  get_color(coat_id) {
     let Data = {
     // coat_id:{"value":coat_id,"type":"NO"},
     user_id:{value:this.auth.getCurrentUserId(),"type":"NO"},      
    }

    this.rest_api.postData(Data,'getcolor').then((result:any) => {
      console.log('color------',result);
      if(result.status == 1){
        // this.color = result.color;
        this.all_color = result.color;
      }
    })
  }

  addPet() {
    if(this.weight>250){
      this.alertP.show('Alert','Weight colud not be greater than 250 pounds.');
      return;
    }
    let Data = {
      user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
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

    this.rest_api.postData2(Data,0,'add_pet').then((result:any) => {
      console.log(result);
      if(result.status == 1){
        this.alertP.showAsync('Success',result.msg).then(() => {
          if(this.auth.getUserDetails().is_pet_added == 1){
            this.navCtrl.pop();
          } else {
              this.auth.updateUserDetails(result.userDetails);
              this.event.publish('loginAuth','');
              this.navCtrl.setRoot(TabsPage);
          }          
        })
      } else {
        this.alertP.show('Alert',result.msg);
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

  // home() {
  //   this.navCtrl.setRoot(TabsPage);
  // }

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

}
