import { MemberProfilePage } from './../member-profile/member-profile';
import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { NavController, NavParams ,ActionSheetController} from 'ionic-angular';
import { NewsFeedDetailPage } from '../news-feed-detail/news-feed-detail';
import { NotificationsPage } from '../notifications/notifications';
import { ModalpagePage } from '../modalpage/modalpage';
import { LikesPage } from '../likes/likes';
import {AddpetsPage} from '../addpets/addpets';
import {ProfilePage} from '../profile/profile'

import { AuthProvider } from './../../providers/auth/auth';
import { AlertProvider } from './../../providers/alert/alert';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import {NewPostPage} from '../new-post/new-post';
import {CommentPage} from '../comment/comment';
import {EditFeedPage} from '../edit-feed/edit-feed';
import {OtherUserPage} from '../other-user/other-user';
import{OwnerprofilePage} from '../ownerprofile/ownerprofile';
import {SharePage} from '../share/share';
import {AdsDetailPage} from '../ads-detail/ads-detail';
import { SocialSharing } from '@ionic-native/social-sharing';
import { PetProfilePage } from '../pet-profile/pet-profile';
import { LoaderProvider } from '../../providers/loader/loader';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { LangPipe } from '../../pipes/lang/lang';
/**
 * Generated class for the NewsFeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-news-feed',
  templateUrl: 'news-feed.html',
})
export class NewsFeedPage {
petList:any = new Array();
limit:any = 0;
feeds:any = [];
is_show:boolean = false;
ads_id_arr:any ='';
noti_count:any = 0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
     public rest_api:RestApiProvider,
     private socialSharing: SocialSharing,
     public actionSheetCtrl: ActionSheetController,
    public auth: AuthProvider,
    public lang:LangPipe,
    private spinnerDialog: SpinnerDialog,
    public loader:LoaderProvider,
    public alertP:AlertProvider,
    public modalCtrl: ModalController) {
  }

  scrolling(ev:any){
    //console.log('scroll',ev);
  }

  scrollComplete(ev:any){
    //console.log('scrollComplete',ev);
  }
  member(){
    this.navCtrl.push(MemberProfilePage);
  }
    doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.get_userfeedList();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 900);
  }

  ionViewDidLoad() {
    this.get_petList();
    this.get_noti_count();
    console.log('ionViewDidLoad NewsFeedPage');
  }

  ionViewWillEnter() {
    this.get_petList();
   // this.set_interval();
   this.limit = 0;
    this.get_userfeedList();
  }

  isValidURL(string) {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
  };

  go_url(item:any) {
    console.log(item.url)
    var valid = this.isValidURL(item.url);
    console.log(valid);
    if(item.url != ''){
      window.open(item.url, '_system');
    } else {
      this.alertP.presentToast('Link not available.','bottom');
    }
  }

  get_noti_count() {
    setInterval(() => {
    let Data = {
      user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
    }

    this.rest_api.postwithoutldr(Data,'get_unread_notification_list').then((result: any) => {
      console.log('noti count------',result);
      if(result.status == 1){
        this.noti_count = result.total;
      }
    })
    },10000);
  }

  get_petList() {
    let Data = {
      user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
      login_user:{"value":this.auth.getCurrentUserId(),"type":"NO"},
    }
    this.rest_api.postwithoutldr(Data,'getuserdata').then((result:any) => {
      console.log(result);
      if(result.status == 1){
        this.petList = result.pets;
      } else {

      }
    })
  }

  set_interval() {
    setInterval(()=>{
      this.limit = 0;
     //this.get_userfeedList();
    },9000)
  }

  get_userfeedList() {
    var val ;
    if(this.limit>0){
      val = this.limit+1;
    } else {
      val = this.limit;
    }

      let Data = {
      user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
      start:{"value":val,"type":"NO"},
      limit:{"value":10,"type":"NO"},
      ads_id_arr:{"value":this.ads_id_arr,"type":"NO"},
      login_user:{"value":this.auth.getCurrentUserId(),"type":"NO"},
    }
    this.rest_api.postwithoutldr(Data,'get_user_feed').then((result:any) => {
      console.log('get feeds------',result);
      if(result.status == 1){
        this.ads_id_arr = result.ads_id_arr;
        if(this.limit>0) {
          console.log('------------------limit',this.limit);
          this.feeds = this.feeds.concat(result.feeds);
        } else {
          this.feeds = result.feeds;
        }
        // this.feeds = result.feeds;
          this.limit = parseInt(this.limit) + 10;
          this.is_show = true;
      }
    })
  }


  share(){
    const modal = this.modalCtrl.create(SharePage,{},{cssClass:'moremodel', showBackdrop:true, enableBackdropDismiss:true});
    modal.present();
  }

  presentModal() {
    const modal = this.modalCtrl.create(ModalpagePage);
   // modal.present();
  }

  // likes() {
  //   const modal = this.modalCtrl.create(LikesPage);
  //   modal.present();
  // }

  likes(feed_id:any) {
    const modal = this.modalCtrl.create(LikesPage,{feed_id:feed_id,type:'Post Detail'});
    modal.present();
  }

  likes_pet(feed_id:any){
    const modal = this.modalCtrl.create(LikesPage,{feed_id:feed_id,type:'Bark Detail'});
    modal.present();
  }

  comment(feed:any) {
     const modal = this.modalCtrl.create(CommentPage,{feed_id:feed.id,type:'Post Detail',adds:1});
    modal.present();
    modal.onDidDismiss((data) => {
      if (data) {
        console.log('conment length----', data);
        this.limit = 0;
        feed.comments = data;
      // this.get_userfeedList();
      }
    })
  }

  comment_pet(feed) {
     const modal = this.modalCtrl.create(CommentPage,{feed_id:feed.id,type:'Bark Detail',adds:1});
    modal.present();
    modal.onDidDismiss((data) => {
      if(data){
        this.limit = 0;
        console.log('conment length----', data);
        feed.comments = data;
      // this.get_userfeedList();
      }
    })
  }

  comment_add(item:any) {
    const modal = this.modalCtrl.create(CommentPage,{feed_id:item.id,type:'Bark Detail',adds:2});
    modal.present();
    modal.onDidDismiss((data) => {
      if (data) {
        console.log('conment length----', data);
        item.comments = data;
      this.limit = 0;
      // this.get_userfeedList();
      }
    })
  }

  // otherUser(user_id:any){
  //   this.navCtrl.setRoot(OwnerprofilePage,{user_id:user_id});

  //  //  const modal = this.modalCtrl.create(OtherUserPage,{});
  //  // modal.present();
  //  // modal.onDidDismiss((data) => {
  //  //    if(data){
  //  //    // this.limit = 0;
  //  //    // this.get_userfeedList();
  //  //    }
  //  //  })
  // }

  detail(item:any) {
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
      this.limit = 0;
      this.get_userfeedList();
      }
    })
  }

  notification() {
    this.navCtrl.push(NotificationsPage);
  }

  add() {
    this.navCtrl.push(AddpetsPage);
  }

  petProfile(pet:any){
    console.log('pet ---------------------------',pet);
    this.navCtrl.push(PetProfilePage,{pet_id:pet.pet_id});
  }

  newpost() {
    let m = this.modalCtrl.create(NewPostPage);
    m.present();
    m.onDidDismiss((data) => {
      if(data){
       this.limit = 0;
       this.get_userfeedList();
      }
    })
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.limit = parseInt(this.limit) + 10;
      console.log('limit-------',this.limit);
      this.get_userfeedList();
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 2000);
  }

 checkuser(list:any) {
   if(list.user_data.id == this.auth.getCurrentUserId()){
     this.ownerActionSheet(list);
   } else {
     this.otherActionSheet(list);
   }
 }

  ownerActionSheet(list:any) {
    if(list.is_shared == 0){
      let actionSheet = this.actionSheetCtrl.create({

     buttons: [
       {
         text: this.lang.transform('DELETEFEED',[]),
         role: 'destructive',
         handler: () => {
           console.log('Destructive clicked');
           this.alertP.confirm(this.lang.transform('DELETE',[]),
           this.lang.transform('AREDELETEFEED',[])).then((data)=>{
             if(data){
               this.delete_feed(list.id);
             }
           })
         }
       },
       {
         text:  this.lang.transform('EDIT',[]),
         handler: () => {
           console.log('Edit clicked');
          //  alert('Coming Soon');
           let m = this.modalCtrl.create(NewPostPage, {is_update:1,feed_id:list.id});
              m.present();
              m.onDidDismiss((data) => {
                if(data){
                this.limit = 0;
                this.get_userfeedList();
                }
              })
          //  const modal = this.modalCtrl.create(EditFeedPage,{feed_id:list.id});
          //  modal.present();
          //  modal.onDidDismiss((data) => {
          //   if(data){
          //   this.limit = 0;
          //   this.get_userfeedList();
          //   }
          // })
         }
       },{
         text: this.lang.transform('SHARE',[]),
         // disabled:true,
         handler: () => {           
           //alert('Coming Soon');
           const modal = this.modalCtrl.create(SharePage,{feed_id:list.id,post_data:list});
           modal.present();
           modal.onDidDismiss((data) => {
            if(data){
            this.limit = 0;
            this.get_userfeedList();
            }
          })

         }
        },
       {
         text: this.lang.transform('CANCEL',[]),
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
         text: this.lang.transform('DELETEFEED',[]),
         role: 'destructive',
         handler: () => {
           console.log('Destructive clicked');
           this.alertP.confirm(
             this.lang.transform('DELETE', []),
             this.lang.transform('AREDELETEFEED',[])).then((data) => {
             if(data){
               this.delete_feed(list.id);
             }
           })
         }
       },
       {
         text: this.lang.transform('EDIT',[]),
         handler: () => {
           console.log('Edit clicked');
           let m = this.modalCtrl.create(NewPostPage, {is_update:1,feed_id:list.id});
           m.present();
           m.onDidDismiss((data) => {
             if(data){
             this.limit = 0;
             this.get_userfeedList();
             }
           })
         }
       },
       {
         text: this.lang.transform('CANCEL',[]),
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

 otherActionSheet(list:any) {
   let actionSheet = this.actionSheetCtrl.create({
     buttons: [
       {
         text: this.lang.transform('SHARE',[]),
         handler: () => {
           console.log('Share clicked');
           const modal = this.modalCtrl.create(SharePage,{feed_id:list.id,post_data:list});
           modal.present();
           modal.onDidDismiss((data) => {
            if(data){
            this.limit = 0;
            this.get_userfeedList();
            }
          })
         }
        },
       {
         text: this.lang.transform('CANCEL',[]),
         role: 'cancel',
         handler: () => {
           console.log('Cancel clicked');
         }
       }
     ]
   });

   actionSheet.present();
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
       this.get_userfeedList();
     } else {

     }
   })
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
          this.limit = 0;
          this.get_userfeedList();
          }
        })
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
          this.limit = 0;
          this.get_userfeedList();
          }
        })
    //this.navCtrl.push(DoctorFeedDetailPage,{Data:item,val:inx});
  }

  like_unlike(item:any){
     if(item.is_like == 0){
       this.like(item);
     }else{
       this.Unlike(item);
     }
   }

   like_unlike_adds(item:any){
    if(item.is_like == 0){
      let Data = {
        user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
        feed_id:{"value":item.id,"type":"NO"},
        type:{"value":2,"type":"NO"},
      }
      this.rest_api.postData(Data,'like_feed').then((result:any) => {
        console.log(result);
        if(result.status == 1) {
          item.is_like = 1;
          item.likes =  parseInt(item.likes) + 1;
        }
      })
    } else {
      let Data = {
        user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
        feed_id:{"value":item.id,"type":"NO"},
        type:{"value":2,"type":"NO"},
      }
      this.rest_api.postData(Data,'unlike_feed').then((result:any) => {
        console.log(result);
        if(result.status == 1) {
          item.is_like = 0;
          item.likes = parseInt(item.likes) - 1;

        }
      })
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

  add_detail(item:any) {
    console.log(item);
    this.navCtrl.push(AdsDetailPage,{data:item});
  }

  share_content(item:any) {
    this.spinnerDialog.show();
    this.socialSharing.share(item.description,item.description,item.image,'https://www.friendmypet.com').then(() => {
      this.spinnerDialog.hide();
    }).catch((err) => {
      this.spinnerDialog.hide();
    })
//check kar
    // console.log(item);
    // var options = {
    //   message: item.description, // not supported on some apps (Facebook, Instagram)
    //   subject: item.description, // fi. for email
    //   files: [item.image], // an array of filenames either locally or remotely
    //   url: 'https://www.friendmypet.com',
    //   chooserTitle: 'Pick an app', // Android only, you can override the default share sheet title
    //  // appPackageName: 'com.apple.social.facebook', // Android only, you can provide id of the App you want to share with
    //  // iPadCoordinates: '0,0,0,0' //IOS only iPadCoordinates for where the popover should be point.  Format with x,y,width,height
    // };
    // this.socialSharing.shareWithOptions(options).then(() => {

    // }).catch((err) => {
    //   console.error(err);
    // })
  }

  otherUser(id:any) {
    if(id!=this.auth.getCurrentUserId()){
      this.navCtrl.push(MemberProfilePage,{user_id:id});
    }
  }

}