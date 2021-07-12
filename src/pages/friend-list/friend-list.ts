import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert';
import { AuthProvider } from '../../providers/auth/auth';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { ChatdetailsPage } from '../chatdetails/chatdetails';

/**
 * Generated class for the FriendListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-friend-list',
  templateUrl: 'friend-list.html',
})
export class FriendListPage {
  select_type:any='mybuddies';
  buddies:any=new Array();
  incomingFriends:any=new Array();

  constructor(public navCtrl: NavController, 
    public rest_api:RestApiProvider,
    public modalCtrl: ModalController,
    public auth:AuthProvider,
    public alertP:AlertProvider,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendListPage');
  }

  ionViewWillEnter() {
    this.get_buddies();
    this.incoming_friend();
  }

  get_buddies() {
         let Data = {
      user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
      login_user:{"value":this.auth.getCurrentUserId(),"type":"NO"},
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

  incoming_friend(){
        let Data = {
      user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
    }
    this.rest_api.postwithoutldr(Data,'incoming_friend_list').then((result:any) => {
      console.log(result);
      if(result.status == 1){
        this.incomingFriends = result.users;
      } else {
        this.incomingFriends = new Array();
      }
    })
  }

  remove_buddies(item:any){
    this.alertP.confirmation('Remove Friend','Are you sure, you want to remove this friend?','Yes','No')
    .then((data) => {
      if(data){
        let Data = {
          friend_id:{"value":item.friend.id,"type":"NO"},
          user_id:{value:this.auth.getCurrentUserId(),type:"NO"},
        }
        this.rest_api.postData(Data,'remove_from_friend').then((result:any) => {
          console.log(result);
          if(result.status == 1){
            this.get_buddies();
          }
          })
      }
    });
  }

  chat(item:any) {
    this.navCtrl.push(ChatdetailsPage,{user:item});
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
       this.get_buddies();
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

}
