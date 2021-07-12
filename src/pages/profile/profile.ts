import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { NavController, NavParams,ActionSheetController} from 'ionic-angular';
import { NotificationsPage } from '../notifications/notifications';
import { EditpetprofilePage } from '../editpetprofile/editpetprofile';


import { ModalpagePage } from '../modalpage/modalpage';
import { LikesPage } from '../likes/likes';
import {AddpetsPage} from '../addpets/addpets';
import {CreatFeedPage} from '../creat-feed/creat-feed';

import { AuthProvider } from './../../providers/auth/auth';
import { AlertProvider } from './../../providers/alert/alert';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import {OwnerprofilePage} from '../ownerprofile/ownerprofile';
import {NewPostPage} from '../new-post/new-post';
import {CommentPage} from '../comment/comment';
import {EditBrakPage} from '../edit-brak/edit-brak';
import {OtherUserPage} from '../other-user/other-user';
import { NewsFeedDetailPage } from '../news-feed-detail/news-feed-detail';
import {SharePage} from '../share/share';


/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
type:any = 1;
limit:any = 0;
petId:any;
petInfo:any = '';

petPost:any = new Array();
buddies:any = new Array();

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public auth:AuthProvider,
    public rest_api:RestApiProvider,
     public actionSheetCtrl: ActionSheetController,    
    public alertP:AlertProvider,
    public modalCtrl: ModalController) {

    var data = this.navParams.get('data');
    this.petId= data.id;
  }

  ionViewDidLoad() {
    this.get_petProfile(this.petId);    
    console.log('ionViewDidLoad ProfilePage');
  }

  ionViewWillEnter() {
   // this.get_petProfile(this.petId);
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.ionViewDidLoad();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 900);
  }

  get_petProfile(pet_id:any) {
    let Data = {
      id:{"value":pet_id,"type":"NO"},
      start:{"value":this.limit,"type":"NO"},
      limit:{"value":10,"type":"NO"},
      user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
      login_user:{"value":this.auth.getCurrentUserId(),"type":"NO"},

    }
    this.rest_api.postwithoutldr(Data,'get_pet_profile').then((result:any) => {
      console.log(result);
      if(result.status == 1){
        this.petInfo = result.pet_data;
        this.get_buddies();
        // this.petPost = result.feeds;
        if(this.limit != 0) {
          this.petPost = this.petPost.concat(result.feeds);
        } else {
          this.petPost = result.feeds;
        }
         this.limit = this.limit + 10;
      }
    })
  }

  change(val) {
    this.type = val;
  }

  addpet(){
    const modal = this.modalCtrl.create(CreatFeedPage,{pet_id:this.petId});
    modal.present();
    modal.onDidDismiss((data) => {
      if(data){
        this.limit = 0;
        this.get_petProfile(this.petId);
      }
    })
  }

  comment(feed_id) {
     const modal = this.modalCtrl.create(CommentPage,{feed_id:feed_id,type:'Bark Detail',adds:1});
    modal.present();
    modal.onDidDismiss((data) => {
      if(data){
        this.limit = 0;
        this.get_petProfile(this.petId);
      }
    })
  }

  editpetprofile() {
    this.navCtrl.push(EditpetprofilePage,{id:this.petId});
  }

  presentModal() {
    const modal = this.modalCtrl.create(ModalpagePage);
    //modal.present();
  }
  
  likes(feed_id:any) {
    const modal = this.modalCtrl.create(LikesPage,{feed_id:feed_id,type:'Bark Detail'});
    modal.present();
  }

  notification() {
    this.navCtrl.push(NotificationsPage)
  }

  owner_profile() {
    this.navCtrl.setRoot(OwnerprofilePage);
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.get_petProfile(this.petId);
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 2000);
  }



  more_content(item:any,inx) {
    item.is_long = true;
    item.is_less = 0;
    const modal = this.modalCtrl.create(NewsFeedDetailPage,{feed_id:item.id,type:'Bark Detail'});
     modal.present();
     modal.onDidDismiss((data) => {
          if(data){
          this.limit = 0;
          this.get_petProfile(this.petId);   
          }
        })
  }

  read_more(item:any,inx) {
    const modal = this.modalCtrl.create(NewsFeedDetailPage,{feed_id:item.id,type:'Bark Detail'});
     modal.present();
     modal.onDidDismiss((data) => {
          if(data){
          this.limit = 0;
          this.get_petProfile(this.petId);   
          }
        })
    //this.navCtrl.push(DoctorFeedDetailPage,{Data:item,val:inx});
  }

  detail(feed_id) {
   const modal = this.modalCtrl.create(NewsFeedDetailPage,{feed_id:feed_id,type:'Bark Detail'});
   modal.present();
   modal.onDidDismiss((data) => {
      if(data){
      this.limit = 0;
      this.get_petProfile(this.petId);    
      }
    })
  }

  ownerActionSheet(list:any) {
    if(list.is_shared == 0){
      if(list.user_id == this.auth.getCurrentUserId()){
          let actionSheet = this.actionSheetCtrl.create({
     buttons: [
       {
         text: 'Delete Feed',
         role: 'destructive',
         handler: () => {
           console.log('Destructive clicked');
           this.alertP.confirm('Delete','Are you sure.You want to delete this feed.').then((data)=>{
             if(data){
               this.delete_feed(list.id);
             }
           })
         }
       },
       {
         text: 'Edit',
         handler: () => {
           console.log('Edit clicked');
           const modal = this.modalCtrl.create(EditBrakPage,{feed_id:list.id});
           modal.present();
           modal.onDidDismiss((data) => {
            if(data){
            this.limit = 0;
            this.get_petProfile(this.petId);     
            }
          })
         }
       },{
         text: 'Share',
         handler: () => {
           const modal = this.modalCtrl.create(SharePage,{feed_id:list.id});
           modal.present();
           modal.onDidDismiss((data) => {
            if(data){
            this.limit = 0;
            this.get_petProfile(this.petId);     
            }
          })
         }
        },
       {
         text: 'Cancel',
         role: 'cancel',
         handler: () => {
           console.log('Cancel clicked');
         }
       }
     ]
   });
   actionSheet.present();
      } else {
          let actionSheet = this.actionSheetCtrl.create({
     buttons: [
        {
         text: 'Share',
         handler: () => {
           const modal = this.modalCtrl.create(SharePage,{feed_id:list.id});
           modal.present();
           modal.onDidDismiss((data) => {
            if(data){
            this.limit = 0;
            this.get_petProfile(this.petId);     
            }
          })
         }
        },
       {
         text: 'Cancel',
         role: 'cancel',
         handler: () => {
           console.log('Cancel clicked');
         }
       }
     ]
   });
   actionSheet.present();
      }

     
    } else {
        let actionSheet = this.actionSheetCtrl.create({
     buttons: [
       {
         text: 'Delete Feed',
         role: 'destructive',
         handler: () => {
           console.log('Destructive clicked');
           this.alertP.confirm('Delete','Are you sure.You want to delete this feed.').then((data)=>{
             if(data){
               this.delete_feed(list.id);
             }
           })
         }
       },
       {
         text: 'Edit',
         handler: () => {
           console.log('Edit clicked');
           const modal = this.modalCtrl.create(EditBrakPage,{feed_id:list.id});
           modal.present();
           modal.onDidDismiss((data) => {
            if(data){
            this.limit = 0;
            this.get_petProfile(this.petId);     
            }
          })
         }
       },
       {
         text: 'Cancel',
         role: 'cancel',
         handler: () => {
           console.log('Cancel clicked');
         }
       }
     ]
   });

   actionSheet.present();
    }
 }

 delete_feed(feed_id:any){
   let Data = {
     feed_id:{"value":feed_id,"type":"NO"},
     user_id:{value:this.auth.getCurrentUserId(),"type":"NO"},     
   }
   this.rest_api.postData(Data,'delete_feed').then((result:any) => {
     console.log(result);
     if(result.status == 1){
       this.limit = 0;
       this.get_petProfile(this.petId);
     } else {

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
        item.likes = parseInt(item.likes) + 1;
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
        item.likes = parseInt(item.likes) - 1;

      }
    })
  }

  get_buddies() {
    let Data = {
      pet_owner_id:{"value":this.petInfo.user_id,"type":"NO"},
      user_id:{value:this.auth.getCurrentUserId(),type:"NO"},     
    }
    this.rest_api.postwithoutldr(Data,'get_pet_buddies_list').then((result:any) => {
      console.log(result);
      if(result.status == 1){
        this.buddies = result.pets; 
      }
    })
  }

}
