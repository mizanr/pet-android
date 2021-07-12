import { Component } from '@angular/core';
import { NavController, NavParams ,PopoverController,ModalController} from 'ionic-angular';
import { EditprofilePage } from '../editprofile/editprofile';
import { NotificationsPage } from '../notifications/notifications';

import { AuthProvider } from './../../providers/auth/auth';
import { AlertProvider } from './../../providers/alert/alert';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import {AddpetsPage} from '../addpets/addpets';
import {ProfilePage} from '../profile/profile';
import { EditpetprofilePage } from '../editpetprofile/editpetprofile';
import {ChatdetailsPage} from '../chatdetails/chatdetails';
import { NewsFeedDetailPage } from '../news-feed-detail/news-feed-detail';
import {CommentPage} from '../comment/comment';
import { LikesPage } from '../likes/likes';




/**
 * Generated class for the OwnerprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ownerprofile',
  templateUrl: 'ownerprofile.html',
})
export class OwnerprofilePage {
  select_type:any = 'mybuddies';
  type:any = 1;
  currentUser:any = '';
  petList:any = new Array();

  is_otheruser:any = false;
  otheruser_id:any;

  user:any;'';
  friend:any = {};

  incomingFriends:any = new Array();
  buddies:any = new Array();
  otheruser_feeds:any = new Array();

  constructor(public navCtrl: NavController, 
    public popoverCtrl: PopoverController,
    public rest_api:RestApiProvider,
    public modalCtrl: ModalController,
    public auth:AuthProvider,
    public alertP:AlertProvider,
    public navParams: NavParams) {
    this.otheruser_id = this.navParams.get('user_id');
    console.log(this.otheruser_id);
    if(this.otheruser_id != this.auth.getCurrentUserId() && this.otheruser_id){
        this.is_otheruser = true;
        this.user = 'Profile';
        this.visit_profile(this.otheruser_id);
        this.get_buddies(this.otheruser_id);

    }
     if(this.otheruser_id == undefined || this.otheruser_id == this.auth.getCurrentUserId()) {
    this.currentUser = this.auth.getUserDetails();
    this.get_profile();    
     this.get_buddies(this.auth.getCurrentUserId());
    this.user = 'Owner Profile';
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OwnerprofilePage');
  }

  ionViewWillEnter() {
    if(!this.is_otheruser){
    this.currentUser = this.auth.getUserDetails();
    this.get_profile();
    }
  }

  get_profile() {
    let Data = {
      user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
      login_user:{"value":this.auth.getCurrentUserId(),"type":"NO"},
    }

    this.rest_api.postwithoutldr(Data,'getuserdata').then((result:any) => {
      console.log(result);
      if(result.status == 1){
          this.petList = result.pets;
          this.incoming_friend();
      } else {

      }
    })
  }


  visit_profile(visit_id) {
    let Data = {
      user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
      login_user:{"value":visit_id,"type":"NO"},
    }

    this.rest_api.postwithoutldr(Data,'getuserdata').then((result:any) => {
      console.log(result);
      if(result.status == 1){
          this.petList = result.pets;
          this.otheruser_feeds = result.feeds;
          this.friend = result.friend;
          this.currentUser = result.userDetails;
      }else {

      }
    })
  }

  change(val) {
    this.type = val;
  }

  editprofile() {
    this.navCtrl.push(EditprofilePage);
  }
  notification() {
    this.navCtrl.push(NotificationsPage)
  }

  addpet() {
    this.navCtrl.push(AddpetsPage);
  }

  pet_profile(pet:any){
    // if(!this.is_otheruser){
    this.navCtrl.push(ProfilePage,{data:pet});      
    // }

  }

  editpetprofile(pet_id) {
    this.navCtrl.push(EditpetprofilePage,{id:pet_id});
  }

  popover(ev) {
    // let popover = this.popoverCtrl.create(EditpetprofilePage);
    // popover.present({
    //   ev:ErrorEvent
    // })
  }

  send_request(){
    let Data = {
      sent_by:{"value":this.auth.getCurrentUserId(),"type":"NO"},
      user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
      received_by:{"value":this.currentUser.id,"type":"NO"},

    }
    this.rest_api.postData(Data,'add_friend').then((result:any) => {
      console.log(result);
      if(result.status == 1){
        this.visit_profile(this.otheruser_id);
      }
    })
  }

  cancel_request() {
    //  let Data = {
    //   sent_by:{"value":this.auth.getCurrentUserId(),"type":"NO"},
    //   received_by:{"value":this.currentUser.id,"type":"NO"},
    // }
    // this.rest_api.postData(Data,'add_friend').then((result:any) => {
    //   console.log(result);
    //   if(result.status == 1){
    //     this.visit_profile(this.otheruser_id);
    //   }
    // })
  }

  accept() {
      let Data = {
      friend_id:{"value":this.friend.id,"type":"NO"},
      user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
    }
    this.rest_api.postData(Data,'accept_friend_request').then((result:any) => {
      console.log(result);
      if(result.status == 1){
        this.visit_profile(this.otheruser_id);
        this.get_buddies(this.otheruser_id);
      }
    })
  }

  in_accept(item:any){
     let Data = {
      friend_id:{"value":item.friend.id,"type":"NO"},
      user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
    }
    this.rest_api.postData(Data,'accept_friend_request').then((result:any) => {
      console.log(result);
      if(result.status == 1){
        this.incoming_friend();
        this.get_buddies(this.auth.getCurrentUserId());
      }
    })
  }

  reject() {
       let Data = {
      friend_id:{"value":this.friend.id,"type":"NO"},
      user_id:{value:this.auth.getCurrentUserId(),type:"NO"},
    }
    this.rest_api.postData(Data,'cancel_friend_request').then((result:any) => {
      console.log(result);
      if(result.status == 1){
        this.visit_profile(this.otheruser_id);
      }
    })
  }

  in_reject(item:any) {
       let Data = {
      friend_id:{"value":item.friend.id,"type":"NO"},
      user_id:{value:this.auth.getCurrentUserId(),type:"NO"},
    }
    this.rest_api.postData(Data,'cancel_friend_request').then((result:any) => {
      console.log(result);
      if(result.status == 1){
        this.incoming_friend();
      }
    })
  }

  incoming_friend(){
    // setInterval(()=>{},1000);
        let Data = {
      user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
    }
    this.rest_api.postwithoutldr(Data,'incoming_friend_list').then((result:any) => {
      console.log(result);
      if(result.status == 1){
        this.incomingFriends = result.users;
      }else{
        this.incomingFriends = new Array();
      }
    })
  }

  get_buddies(user_id) {
    // setInterval(()=>{},1000);    
         let Data = {
      // user_id:{"value":user_id,"type":"NO"},
      user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
      login_user:{"value":user_id,"type":"NO"},
    }
    this.rest_api.postwithoutldr(Data,'get_buddies_list').then((result:any) => {
      console.log(result);
      if(result.status == 1){
        this.buddies = result.users;
      } else {
        this.buddies = new Array();
      }
    })
  }

  remove_buddies(item:any){
       let Data = {
      friend_id:{"value":item.friend.id,"type":"NO"},
      user_id:{value:this.auth.getCurrentUserId(),type:"NO"},
    }
    this.rest_api.postData(Data,'remove_from_friend').then((result:any) => {
      console.log(result);
      if(result.status == 1){
        this.get_buddies(this.auth.getCurrentUserId());
      }
    })
  }

  chat(item:any) {
    this.navCtrl.push(ChatdetailsPage,{user:item});
  }
  
  detail(item:any){
    if(item.id != this.auth.getCurrentUserId()){
      console.log(item);
      this.is_otheruser = true;
        this.user = 'Profile';
        this.visit_profile(item.id);
        this.get_buddies(item.id);
    } else {
        this.currentUser = this.auth.getUserDetails();
        this.is_otheruser = false;
        this.get_profile();    
       this.get_buddies(this.auth.getCurrentUserId());
      this.user = 'Owner Profile';
    }
    
  }

  otherUser(user_id:any){
   // this.navCtrl.setRoot(OwnerprofilePage,{user_id:user_id});
  }

  petProfile(pet:any){
    this.navCtrl.push(ProfilePage,{data:pet});
  }

  read_more(item:any,inx) {
    if(item.type == 1){
      var type = 'Post Detail';
    }else{
      var type = 'Bark Detail';
    }
    const modal = this.modalCtrl.create(NewsFeedDetailPage,{feed_id:item.id,type:type});
     modal.present();
     modal.onDidDismiss((data) => {
          if(data){    
          }
        })
    //this.navCtrl.push(DoctorFeedDetailPage,{Data:item,val:inx});
  }

  more_content(item:any,inx) {
    item.is_long = true;
    item.is_less = 0;
    if(item.type == 1){
      var type = 'Post Detail';
    }else{
      var type = 'Bark Detail';
    }
    const modal = this.modalCtrl.create(NewsFeedDetailPage,{feed_id:item.id,type:type});
     modal.present();
     modal.onDidDismiss((data) => {
          if(data){    
          }
        })
  }

  detail2(item:any) {
    console.log(item);
    if(item.type == 1){
      var type = 'Post Detail';
    }else{
      var type = 'Bark Detail';
    }
   const modal = this.modalCtrl.create(NewsFeedDetailPage,{feed_id:item.id,type:type});
   modal.present();
   modal.onDidDismiss((data) => {
      if(data){     
      }
    })
  }

  like_unlike(item:any){
     if(item.is_like == 0){
       this.like(item);
     }else{
       this.Unlike(item);
     }
   }

   like(item:any){
     let Data = {
      user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
      feed_id:{"value":item.id,"type":"NO"},
      type:{"value":1,"type":"NO"},
    }
    this.rest_api.postData(Data,'like_feed').then((result:any) => {
      console.log(result);
      if(result.status == 1) {
        item.is_like = 1;
        item.likes += 1;
      }
    })
  }

  Unlike(item:any) {
     let Data = {
      user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
      feed_id:{"value":item.id,"type":"NO"},
      type:{"value":1,"type":"NO"},
    }
    this.rest_api.postData(Data,'unlike_feed').then((result:any) => {
      console.log(result);
      if(result.status == 1) {
        item.is_like = 0;
        item.likes -= 1;

      }
    })
  }

   likes(feed_id:any) {
    const modal = this.modalCtrl.create(LikesPage,{feed_id:feed_id,type:'Post Detail'});
    modal.present();
  }

  likes_pet(feed_id:any){
    const modal = this.modalCtrl.create(LikesPage,{feed_id:feed_id,type:'Bark Detail'});
    modal.present();
  }

  comment(feed_id) {
     const modal = this.modalCtrl.create(CommentPage,{feed_id:feed_id,type:'Post Detail',adds:1});
    modal.present();
    modal.onDidDismiss((data) => {
      if(data){    
        if(this.otheruser_id){
        this.visit_profile(this.otheruser_id);
        }
      }
    })
  }

  comment_pet(feed_id) {
     const modal = this.modalCtrl.create(CommentPage,{feed_id:feed_id,type:'Bark Detail',adds:1});
    modal.present();
    modal.onDidDismiss((data) => {
      if(data){    
        if(this.otheruser_id){
          this.visit_profile(this.otheruser_id);
          }
      }
    })
  }

  delete(pet_id:any,inx:any){
    this.alertP.confirmation('Delete Pet','Are you sure, you want to delete this pet','Yes','No')
    .then((data) => {
      if(data){
        let Data = {
      user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
      pet_id:{"value":pet_id,"type":"NO"},
    }

    this.rest_api.postData(Data,'delete_pet').then((result:any) => {
      console.log(result);
      if(result.status == 1){
          this.petList.splice(inx,1);
          }
        })
      }
    })
    
  }

}
