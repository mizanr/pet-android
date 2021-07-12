import { Component } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { ActionSheetController, ModalController, NavController, NavParams } from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert';
import { AuthProvider } from '../../providers/auth/auth';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { CommentPage } from '../comment/comment';
import { CreatFeedPage } from '../creat-feed/creat-feed';
import { EditBrakPage } from '../edit-brak/edit-brak';
import { EditFeedPage } from '../edit-feed/edit-feed';
import { LikesPage } from '../likes/likes';
import { MemberProfilePage } from '../member-profile/member-profile';
import { NewPostPage } from '../new-post/new-post';
import { NewsFeedDetailPage } from '../news-feed-detail/news-feed-detail';
import { SharePage } from '../share/share';

/**
 * Generated class for the PetProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-pet-profile',
  templateUrl: 'pet-profile.html',
})
export class PetProfilePage {
  limit:any = 0;
  petInfo:any;
  petPost:any=new Array();
  pet_id:any;
  type:any='1';

  constructor(
    public navCtrl: NavController, 
    public rest_api:RestApiProvider,
    public modalCtrl: ModalController,
    public auth:AuthProvider,
    private socialSharing: SocialSharing,
    private spinnerDialog: SpinnerDialog,
    public actionSheetCtrl:ActionSheetController,
    public alertP:AlertProvider,
    public navParams: NavParams) {
      this.pet_id=navParams.data.pet_id;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PetProfilePage');
  }

  ionViewWillEnter() {
    this.get_petProfile();
  }

  pet_post(){
    const modal = this.modalCtrl.create(NewPostPage,{pet_id:this.pet_id,post_type:2});
    modal.present();
    modal.onDidDismiss((data) => {
      if(data){
        this.limit = 0;
        this.get_petProfile();
      }
    })
  }

  selTab(type:any) {
    console.log(type);
    this.type=type;
  }

  get_petProfile() {
    let Data = {
      id:{"value":this.pet_id,"type":"NO"},
      start:{"value":this.limit,"type":"NO"},
      limit:{"value":10,"type":"NO"},
      user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
      login_user:{"value":this.auth.getCurrentUserId(),"type":"NO"},

    }
    this.rest_api.postData(Data,'get_pet_profile').then((result:any) => {
      console.log(result);
      if(result.status == 1){
        this.petInfo = result.pet_data;
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

  comment_add(item:any) {
    const modal = this.modalCtrl.create(CommentPage,{feed_id:item.id,type:'Bark Detail',adds:2});
    modal.present();
    modal.onDidDismiss((data) => {
      if(data){
        this.limit = 0;
        console.log('conment length----', data);
        item.comments = data;
      // this.get_petProfile();
      }
    })
    }

    otherUser(id:any) {
      if(id!=this.auth.getCurrentUserId()){
        this.navCtrl.push(MemberProfilePage,{user_id:id});
      }
    }

    petProfile(pet:any){
      this.navCtrl.push(PetProfilePage,{pet_id:pet.pet_id});
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
                this.delete_feed(list.id);
               }
             })
           }
         },
         {
           text: 'Edit',
           handler: () => {
            let m = this.modalCtrl.create(NewPostPage, {is_update:1,feed_id:list.id,pet_id:this.pet_id,post_type:2});
            m.present();
            m.onDidDismiss((data) => {
              if(data){
              this.limit = 0;
              this.get_petProfile();
              }
            })
          
          //   const modal = this.modalCtrl.create(EditBrakPage,{feed_id:list.id});
          //   modal.present();
          //   modal.onDidDismiss((data) => {
          //    if(data){
          //    this.limit = 0;
          //    this.get_petProfile();     
          //    }
          //  })
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
             let m = this.modalCtrl.create(NewPostPage, {is_update:1,feed_id:list.id,pet_id:this.pet_id,post_type:2});
            m.present();
            m.onDidDismiss((data) => {
              if(data){
              this.limit = 0;
              this.get_petProfile();
              }
            })
            //  const modal = this.modalCtrl.create(EditFeedPage,{feed_id:list.id});
            //  modal.present();
            //  modal.onDidDismiss((data) => {
            //   if(data){
            //   this.limit = 0;
            //  // this.get_userfeedList();
            //   }
            // })
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
              this.limit = 0;
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

   delete_feed(feed_id:any){
    let Data = {
      feed_id:{"value":feed_id,"type":"NO"},
      user_id:{value:this.auth.getCurrentUserId(),"type":"NO"},     
    }
    this.rest_api.postData(Data,'delete_feed').then((result:any) => {
      console.log(result);
      if(result.status == 1){
        this.limit = 0;
        this.get_petProfile();
      } else {
 
      }
    })
  }

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
      //this.get_userfeedList();
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

  comment(feed) {
     const modal = this.modalCtrl.create(CommentPage,{feed_id:feed.id,type:'Post Detail',adds:1});
    modal.present();
    modal.onDidDismiss((data) => {
      if(data){
      this.limit = 0;
      console.log('conment length----', data);
      feed.comments = data;
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
      // this.get_petProfile();
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
  

}
