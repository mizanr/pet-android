import { Component } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { ActionSheetController, ModalController, NavController, NavParams } from 'ionic-angular';
import { AnonymousSubject } from 'rxjs/Subject';
import { AlertProvider } from '../../providers/alert/alert';
import { AuthProvider } from '../../providers/auth/auth';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { CommentPage } from '../comment/comment';
import { EditBrakPage } from '../edit-brak/edit-brak';
import { EditFeedPage } from '../edit-feed/edit-feed';
import { LikesPage } from '../likes/likes';
import { SharePage } from '../share/share';

/**
 * Generated class for the MemberPostsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-member-posts',
  templateUrl: 'member-posts.html',
})
export class MemberPostsPage {
  Post:any=[];
  User:any; 
  constructor(public navCtrl: NavController, 
    public auth:AuthProvider,
    public restApi:RestApiProvider,
    public alertP:AlertProvider,
    public actionSheetCtrl:ActionSheetController,
    public modalCtrl:ModalController,
    public spinnerDialog:SpinnerDialog,
    public socialSharing:SocialSharing,
    public navParams: NavParams) {
      this.Post=navParams.data.feed;
      this.User=navParams.data.user;

      console.log(this.Post);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MemberPostsPage');
  }


  likes(feed_id:any) {
    const modal = this.modalCtrl.create(LikesPage,{feed_id:feed_id,type:'Post Detail'});
    modal.present();
  }
  
  likes_pet(feed_id:any){
    const modal = this.modalCtrl.create(LikesPage,{feed_id:feed_id,type:'Bark Detail'});
    modal.present();
  }
  
  comment(feed) {
     const modal = this.modalCtrl.create(CommentPage,{feed_id:feed.id,type:'Post Detail',adds:1});
    modal.present();
    modal.onDidDismiss((data) => {
      if (data) {
        console.log('conment length----', data);
        feed.comments = data;
      // this.limit = 0;
      
      }
    })
  }
  
  comment_pet(feed) {
     const modal = this.modalCtrl.create(CommentPage,{feed_id:feed.id,type:'Bark Detail',adds:1});
    modal.present();
    modal.onDidDismiss((data) => {
      if (data) {
        console.log('conment length----', data);
        feed.comments = data;
     // this.limit = 0;
      //this.get_petProfile();
      }
    })
  }
  
  share_content(item:any) {
    this.spinnerDialog.show();
    this.socialSharing.share(item.description,item.description,[item.image],'https://www.friendmypet.com').then(() => {
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
   this.restApi.postData(Data,'like_feed').then((result:any) => {
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
   this.restApi.postData(Data,'unlike_feed').then((result:any) => {
     console.log(result);
     if(result.status == 1) {
       item.is_like = 0;
       item.likes = parseInt(item.likes) - 1;
  
     }
   })
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
         text: 'Delete Feed',
         role: 'destructive',
         handler: () => {
           console.log('Destructive clicked');
           this.alertP.confirm('Delete','Are you sure.You want to delete this feed.').then((data)=>{
             if(data){
             // this.delete_feed(list.id);
             }
           })
         }
       },
       {
         text: 'Edit',
         handler: () => {
          const modal = this.modalCtrl.create(EditBrakPage,{feed_id:list.id});
          modal.present();
          modal.onDidDismiss((data) => {
           if(data){
         //  this.limit = 0;
         //  this.get_petProfile();     
           }
         })
         }
       },{
         text: 'Share',
         // disabled:true,
         handler: () => {           
           //alert('Coming Soon');
           const modal = this.modalCtrl.create(SharePage,{feed_id:list.id});
           modal.present();
           modal.onDidDismiss((data) => {
            if(data){
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
    } else{
         let actionSheet = this.actionSheetCtrl.create({
  
     buttons: [
       {
         text: 'Delete Feed',
         role: 'destructive',
         handler: () => {
           console.log('Destructive clicked');
         }
       },
       {
         text: 'Edit',
         handler: () => {
           console.log('Edit clicked');
           const modal = this.modalCtrl.create(EditFeedPage,{feed_id:list.id});
           modal.present();
           modal.onDidDismiss((data) => {
            if(data){
            //this.limit = 0;
           // this.get_userfeedList();
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
  
  otherActionSheet(list:any) {
   let actionSheet = this.actionSheetCtrl.create({
     buttons: [
       {
         text: 'Share',
         handler: () => {
           console.log('Share clicked');
           const modal = this.modalCtrl.create(SharePage,{feed_id:list.id});
           modal.present();
           modal.onDidDismiss((data) => {
            if(data){
           // this.limit = 0;
           // this.get_userfeedList();
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
