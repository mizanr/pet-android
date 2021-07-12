import { PetProfilePage } from './../pet-profile/pet-profile';
import { Component } from '@angular/core';
import { ActionSheetController, ModalController, NavController, NavParams } from 'ionic-angular';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { AuthProvider } from '../../providers/auth/auth';
import { AlertProvider } from '../../providers/alert/alert';
import { ChatdetailsPage } from '../chatdetails/chatdetails';
import { CommentPage } from '../comment/comment';
import { NewsFeedDetailPage } from '../news-feed-detail/news-feed-detail';
import { LikesPage } from '../likes/likes';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SharePage } from '../share/share';
import { EditBrakPage } from '../edit-brak/edit-brak';
import { EditFeedPage } from '../edit-feed/edit-feed';
import { MemberFriendPage } from '../member-friend/member-friend';
import { MemberPostsPage } from '../member-posts/member-posts';

/**
 * Generated class for the MemberProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-member-profile',
  templateUrl: 'member-profile.html',
})
export class MemberProfilePage {
user_id:any;
pets:any=new Array();
user_info:any;
isfriend:any;
type:any=2;
buddies:any=new Array();
Post:any=new Array();

  constructor(public navCtrl: NavController, 
    public rest_api:RestApiProvider,
    public modalCtrl: ModalController,
    public actionSheetCtrl:ActionSheetController,
    public auth:AuthProvider,
    public spinnerDialog:SpinnerDialog,
    public socialSharing:SocialSharing,
    public alertP:AlertProvider,
    public navParams: NavParams) {
      this.user_id=navParams.data.user_id;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MemberProfilePage');
  }

  detail(){
    this.navCtrl.push(PetProfilePage);
  }

  ionViewWillEnter() {
    this.get_profile_info();
    this.get_buddies();
  }

  get_profile_info() {
    let Data = {
      user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
      login_user:{"value":this.user_id,"type":"NO"},
    }

    this.rest_api.postData(Data,'getuserdata').then((result:any) => {
      console.log(result);
      if(result.status == 1){
        this.Post=result.feeds;
        this.user_info=result.userDetails;
        this.pets=result.pets;
        this.isfriend=result.friend;
      } else {

      }
    })
  }

  send_request(){
    let Data = {
      sent_by:{"value":this.auth.getCurrentUserId(),"type":"NO"},
      user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
      received_by:{"value":this.user_id,"type":"NO"},

    }
    this.rest_api.postData(Data,'add_friend').then((result:any) => {
      console.log(result);
      if(result.status == 1){
        this.get_profile_info();
      }
    })
  }

  reject_friend_requist() {
    let Data = {
   friend_id:{"value":this.isfriend.id,"type":"NO"},
   user_id:{value:this.auth.getCurrentUserId(),type:"NO"},
 }
  this.rest_api.postData(Data,'cancel_friend_request').then((result:any) => {
    console.log(result);
    if(result.status == 1){
      this.get_profile_info();
    }
    })
  }

  go_topet(item:any) {
    this.navCtrl.push(PetProfilePage,{data:item,pet_id:item.id});
  }

  accept() {
    let Data = {
    friend_id:{"value":this.isfriend.id,"type":"NO"},
    user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
  }
    this.rest_api.postData(Data,'accept_friend_request').then((result:any) => {
      console.log(result);
      if(result.status == 1){
        this.get_profile_info();
      }
    })
  }

  reject() {
    let Data = {
      friend_id:{"value":this.isfriend.id,"type":"NO"},
      user_id:{value:this.auth.getCurrentUserId(),type:"NO"},
     }
    this.rest_api.postData(Data,'cancel_friend_request').then((result:any) => {
      console.log(result);
      if(result.status == 1){
        this.get_profile_info();
        }
      })
    }

    chat(item:any) {
      this.navCtrl.push(ChatdetailsPage,{user:this.user_info});
    }

    change(type:any) {
        this.type=type; 
    }

    go_friend(){
      this.type=5;
      this.navCtrl.push(MemberFriendPage,{friends:this.buddies,user:this.user_info});
    }

    go_feeds(){
      this.type=4;
      this.navCtrl.push(MemberPostsPage,{feed:this.Post,user:this.user_info});
    }

    get_buddies() {
      let Data = {
      user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
      login_user:{"value":this.user_id,"type":"NO"},
    }
    this.rest_api.postData(Data,'get_buddies_list').then((result:any) => {
      console.log('get buddiss---',result);
      if(result.status == 1){
        this.buddies = result.users;
      } else {
        this.buddies = new Array();
   }
 })
}

userinfo(item:any) {
  if(item.id!=this.auth.getCurrentUserId()){
    this.navCtrl.push(MemberProfilePage,{user_id:item.id});
  }
}

// detail(item:any) {
//   console.log(item);
//   if(item.type == 1){
//     var type = 'Post Detail';
//   }else{
//     var type = 'Bark Detail';
//   }
//  const modal = this.modalCtrl.create(NewsFeedDetailPage,{feed_id:item.id,type:type});
//  modal.present();
//  modal.onDidDismiss((data) => {
//     if(data){
//     this.limit = 0;
//     //this.get_userfeedList();
//     }
//   })
// }

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
    // this.limit = 0;
    
    }
  })
}

comment_pet(feed_id) {
   const modal = this.modalCtrl.create(CommentPage,{feed_id:feed_id,type:'Bark Detail',adds:1});
  modal.present();
  modal.onDidDismiss((data) => {
    if(data){
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
