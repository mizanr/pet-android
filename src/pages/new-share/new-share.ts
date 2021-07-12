import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AuthProvider } from './../../providers/auth/auth';
import { AlertProvider } from './../../providers/alert/alert';
import { RestApiProvider } from './../../providers/rest-api/rest-api';

/**
 * Generated class for the NewSharePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-new-share',
  templateUrl: 'new-share.html',
})
export class NewSharePage {
  petList:any = new Array();
  ownerinfo:any = '';
  desc:any = '';
  is_wall:boolean = true;
  is_friend:boolean = false;
  is_pet:boolean=false;
  index:any;
  friend_id:any = '';
  
  feed_id:any;
  pet_id:any = '';
  buddies:any = new Array();
  constructor(public navCtrl: NavController,
    public rest_api:RestApiProvider,
      public auth:AuthProvider,
      public alertP:AlertProvider,
      // public modalController: ModalController,
      public viewCtrl: ViewController,
      public navParams: NavParams) {
  
      this.feed_id = this.navParams.get('feed_id')
    }
  
    ionViewDidLoad() {
      this.get_profile();
      console.log('ionViewDidLoad SharePage');
    }
  
    get_profile() {
      let Data = {
        user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
        login_user:{"value":this.auth.getCurrentUserId(),"type":"NO"},
      }
  
      this.rest_api.postwithoutldr(Data,'getuserdata').then((result:any) => {
        console.log(result);
        if(result.status == 1){
          this.get_buddies();
          this.ownerinfo = result.userDetails;
          this.petList = result.pets;
        }else {
  
        }
      })
    }
  
    wall_change(check:any){
      this.is_friend = false;
      this.is_pet=false;
      for(let i=0;this.petList.length>i;i++){
        this.petList[i].is_pet = false;
      }
      for(let i=0;this.buddies.length>i;i++){
        this.buddies[i].is_check = false;
      }
      console.log(check);
    }
  
    change(check:any,inx){
      console.log(check);
      // this.petList[inx].is_pet = true;
      this.is_wall = false;
      this.is_friend=false;
      this.is_pet=check;
  
      this.friend_id = '';
      // this.buddies[this.index].is_check = false;
      for(let i=0;this.buddies.length>i;i++){
        this.buddies[i].is_check = false;
      }
      this.index = inx;
      for(let i=0;this.petList.length>i;i++){
        if(i == inx){
        this.petList[inx].is_pet = true;
        } else {
        this.petList[i].is_pet = false;
        }
      }
      this.pet_id = this.petList[inx].id;
      // console.log(check);
    }
  
    closemodal(){
      this.viewCtrl.dismiss();
    }
  
    share() {
      let Data = {
        description:{"value":this.desc.trim(),"type":'NO'},
        feed_id:{"value":this.feed_id,"type":'NO'},
        user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
      }
      if(!this.is_wall&&this.pet_id){
        Data['pet_id'] = {"value":this.pet_id,"type":"NO"};
      } else if(this.friend_id) {
        Data['shared_on_profile'] = {"value":this.friend_id,"type":'NO'};
      }
  
      this.rest_api.postData(Data,'share_feed').then((result:any) =>{
        console.log(result);
        if(result.status == 1){
          this.alertP.showAsync('Success',result.msg).then(() => {
            this.viewCtrl.dismiss(true);
          })
        }
      })
    }
  
    friend_wall(check,inx){
      console.log(check);
      //this.buddies[inx].is_check = true;
      this.is_friend=check;
      this.is_wall = false;
      this.is_pet=false;
      this.pet_id = '';
      for(let i=0;this.petList.length>i;i++){
        this.petList[i].is_pet = false;
      }
      this.index = inx;
      for(let i=0;this.buddies.length>i;i++){
        if(i == inx){
          console.log('work');
        this.buddies[inx].is_check = true;
        this.friend_id = this.buddies[inx].id;
  
        } else {
          this.buddies[i].is_check = false;
          this.friend_id = '';
        }
      }
    }
  
    get_buddies() {
      // setInterval(()=>{},1000);
           let Data = {
        user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
        login_user:{"value":this.auth.getCurrentUserId(),"type":"NO"},
      }
      this.rest_api.postwithoutldr(Data,'get_buddies_list').then((result:any) => {
        console.log(result);
        if(result.status == 1){
          this.buddies = result.users;
        } else {
          //this.buddies = new Array();
        }
      })
    }

}
