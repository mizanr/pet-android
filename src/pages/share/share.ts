import { Component } from '@angular/core';
import { Events, LoadingController, ModalController } from 'ionic-angular';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AuthProvider } from './../../providers/auth/auth';
import { AlertProvider } from './../../providers/alert/alert';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import { SocialSharing } from '@ionic-native/social-sharing';
import { FriendsSearchPage } from '../friends-search/friends-search';
import { Instagram } from '@ionic-native/instagram';
import { Keyboard } from '@ionic-native/keyboard';
/**
 * Generated class for the SharePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-share',
  templateUrl: 'share.html',
})
export class SharePage {
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
post_data:any;
load:any;

is_button:any=false;

sel_friend:any;

  constructor(public navCtrl: NavController,
  public rest_api:RestApiProvider,
    public auth:AuthProvider,
    public loading:LoadingController,
    private socialSharing: SocialSharing,
    public events: Events,
    private instagram: Instagram,
    public keyboard:Keyboard,
    public alertP:AlertProvider, 
    // public modalController: ModalController, 
    public viewCtrl: ViewController,
  	public navParams: NavParams) {

  	this.feed_id = this.navParams.get('feed_id');
    this.post_data=navParams.data.post_data;

    console.log(this.post_data);

    events.subscribe('share_friend',(data) => {
      if(data){
        this.is_button=true;
        console.log(data);
        this.sel_friend=data;
        this.friend_id=data.id;
      }
    })
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

	close(){
		this.viewCtrl.dismiss();
	}

  share2() {
		let Data = {
			description:{"value":this.desc.trim(),"type":'NO'},
			feed_id:{"value":this.feed_id,"type":'NO'},
			user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
		}
    if(this.friend_id) {
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


  message_share() {
    this.show();
    this.socialSharing.shareViaSMS(this.desc,'').then((success:any) => {
      console.log('share via message',success);
      this.hide();
    }).catch((error) => {
      this.hide();
      console.log('share via message error',error);
    })
  }

  facebook_share() {
    this.show();
    this.socialSharing.shareViaFacebook(this.desc,this.post_data.image,'https://www.friendmypet.com').then((success:any) => {
      this.hide();
      console.log('share via facebook',success);
    }).catch((error) => {
      this.hide();      
      console.log('share via facebook error',error);
    })
  }

  twitter_share() {
    this.show();
    this.socialSharing.shareViaTwitter(this.desc,this.post_data.image,'https://www.friendmypet.com').then((success:any) => {
      this.hide();
      console.log('share via twitter',success);
    }).catch((error) => {
      this.hide();
      console.log('share via twitter error',error);
    })
  }

  instagram_share() {
    this.show();

    if(!this.post_data.image){
      this.alertP.show('Alert','Image post can be share in instagram.');
      this.hide();
      return;
    }

  //   this.instagram.share(this.post_data.image, this.desc)
  //     .then(() => {
  //       this.hide();      
  //       console.log('Shared!');
  //     })
  // .catch((error: any) => console.error(error));
    this.socialSharing.shareViaInstagram(this.desc,this.post_data.image).then((success:any) => {
      this.hide();      
      console.log('share via instagram',success);
    }).catch((error) => {
      this.hide();
      console.log('share via instagram error',error);
    })
  }

  show(){
    this.load = this.loading.create({
      content:''
    });
    this.load.present();
  }
  hide(){
    this.load.dismiss();
  }

  share_friend() {
    this.navCtrl.push(FriendsSearchPage,{buddies:this.buddies});
  }

}
