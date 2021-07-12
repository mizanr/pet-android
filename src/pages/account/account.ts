import { UserAccountEditPage } from './../user-account-edit/user-account-edit';
import { Component } from '@angular/core';
import { Events, NavController, NavParams } from 'ionic-angular';
import { AddNewPetPage } from '../add-new-pet/add-new-pet';
import { UploadImagePage } from '../upload-image/upload-image';
import { AuthProvider } from '../../providers/auth/auth';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { AlertProvider } from '../../providers/alert/alert';
import { PetListPage } from '../pet-list/pet-list';
import {FriendListPage} from '../friend-list/friend-list';
import { ChatdetailsPage } from '../chatdetails/chatdetails';
import { MemberProfilePage } from '../member-profile/member-profile';
import { PetProfilePage } from '../pet-profile/pet-profile';
import { LangPipe } from '../../pipes/lang/lang';
/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  public current_user:any = {
    wall_image:'',
    profile:'',
    nic_name:'',
    city:'',
    state:'',
    wall_blob:'',
    wall_name:'',
    profile_blob:'',
    profile_name:'',
  };
  cities:any=new Array();
  pets:any=new Array();
  type:any=1;
  select_type:any='mybuddies';
  buddies:any=new Array();
  incomingFriends:any=new Array();


  constructor(public navCtrl: NavController, 
    public auth:AuthProvider,
    public restApi:RestApiProvider,
    public alertP: AlertProvider,
    public lang:LangPipe,
    public events:Events,
    public navParams: NavParams) {
      events.subscribe('ownerProfile_',(data) => {
        if(data){
          this.current_user=data;
        }
      })      
  }

  ionViewWillEnter() {
    this.getPetList();

    this.get_buddies();
    this.incoming_friend();

    this.current_user = this.auth.getUserDetails();
      console.log('user detail--',this.current_user);
  }

  getPetList() {
    let Data = {
        user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
        login_user:{"value":this.auth.getCurrentUserId(),"type":"NO"},

    }
    this.restApi.postData(Data,'getuserdata').then((res:any) => {
      console.log(res);
      if(res.status == 1){
       // this.auth.updateUserDetails(res.userDetails);
        this.pets = res.pets;
        // this.info = this.auth.getUserDetails();
        // this.intializeData();
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

  add(){
    this.navCtrl.push(AddNewPetPage);
  }

  getwallimage(){
  //  this.navCtrl.push(UploadImagePage);
  }

  edit(){
    this.type=2;
    this.navCtrl.push(UserAccountEditPage,{data:this.current_user});
  }

  // getcity(){
  //   let Data = {
  //       user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
  //     }  
  //     this.restApi.postwithoutldr(Data,'getcity').then((res:any) => {
  //       console.log(res);
  //       if(res.status == 1){
  //         this.cities = res.city_detail;
  //         this.auth.cities=this.cities;
  //       }
  //     })
  //   }

    pet_edit(pet:any) {
      this.navCtrl.push(AddNewPetPage,{isupdate:1,pet:pet});
    }

    pet_delete(pet_id:any,inx:any){
      this.alertP.confirmation(this.lang.transform('DELETEPET', []),
        this.lang.transform('AREDELETPET', []),
        this.lang.transform('YES',[]), this.lang.transform('NO',[]))
      .then((data) => {
        if(data){
          let Data = {
        user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
        pet_id:{"value":pet_id,"type":"NO"},
      }
  
      this.restApi.postData(Data,'delete_pet').then((result:any) => {
        console.log(result);
        if(result.status == 1){
            this.pets.splice(inx,1);
            }
          })
        }
      })
      
    }

    Pet_list() {
      this.navCtrl.push(PetListPage);
    }

    friend_list() {
      this.navCtrl.push(FriendListPage);
    }

    change(type:any){
      this.type=type;
    }

    get_buddies() {
      let Data = {
   user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
   login_user:{"value":this.auth.getCurrentUserId(),"type":"NO"},
 }
 this.restApi.postwithoutldr(Data,'get_buddies_list').then((result:any) => {
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
 this.restApi.postwithoutldr(Data,'incoming_friend_list').then((result:any) => {
   console.log(result);
   if(result.status == 1){
     this.incomingFriends = result.users;
   } else {
     this.incomingFriends = new Array();
   }
 })
}

remove_buddies(item:any){
  this.alertP.confirmation(
    this.lang.transform('REMOVEFRIEND', []),
    this.lang.transform('AREREMOVEFRIEND',[]),
    this.lang.transform('YES',[]),
    this.lang.transform('NO',[]))
 .then((data) => {
   if(data){
     let Data = {
       friend_id:{"value":item.friend.id,"type":"NO"},
       user_id:{value:this.auth.getCurrentUserId(),type:"NO"},
     }
     this.restApi.postData(Data,'remove_from_friend').then((result:any) => {
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
this.restApi.postData(Data,'accept_friend_request').then((result:any) => {
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
    this.restApi.postData(Data,'cancel_friend_request').then((result:any) => {
    console.log(result);
    if(result.status == 1){
    this.incoming_friend();
    }
    })
  }

  otherUser(id:any) {
    this.navCtrl.push(MemberProfilePage,{user_id:id});
  }

  petProfile(pet:any){
    this.navCtrl.push(PetProfilePage,{pet_id:pet.pet_id});
  }

}
