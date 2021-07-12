import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AuthProvider } from './../../providers/auth/auth';
import { AlertProvider } from './../../providers/alert/alert';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import{OwnerprofilePage} from '../ownerprofile/ownerprofile';
import { MemberProfilePage } from '../member-profile/member-profile';


/**
 * Generated class for the LikesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-likes',
  templateUrl: 'likes.html',
})
export class LikesPage {
feed_id:any;
list:any = new Array();
type:any = '';

  constructor(public navCtrl: NavController,
    public rest_api:RestApiProvider,
    public auth:AuthProvider,
    public alertP:AlertProvider,
    public navParams: NavParams, 
    public modalController: ModalController, 
    public viewCtrl: ViewController)  {

    this.feed_id = this.navParams.get('feed_id');
    this.get_list(this.feed_id);

    var type = this.navParams.get('type');
    if(type == 'Post Detail'){
      this.type = 'Likes'
    }else if(type == 'Bark Detail'){
      this.type = 'Licks'
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LikesPage');
  }

  close() {
    this.viewCtrl.dismiss();
  }

  otherUser(id:any) {
    if(id!=this.auth.getCurrentUserId()){
      this.navCtrl.push(MemberProfilePage,{user_id:id});
    }
  }

  get_list(feed_id:any) {
    let Data = {
      user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
      feed_id:{"value":feed_id,"type":"NO"},
      type:{"value":1,"type":"NO"},
    }
    this.rest_api.postData(Data,'like_user_list').then((result:any) => {
      console.log(result);
      if(result.status == 1) {
        this.list = result.likes;
      }
    })
  }

}
