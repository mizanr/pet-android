import { Component } from '@angular/core';
import { NavController, NavParams,ViewController} from 'ionic-angular';
import { AuthProvider } from './../../providers/auth/auth';
import { AlertProvider } from './../../providers/alert/alert';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import{OwnerprofilePage} from '../ownerprofile/ownerprofile';
import { MemberProfilePage } from '../member-profile/member-profile';
import { Keyboard } from '@ionic-native/keyboard';


/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {
feed_id:any;
comments:any = new Array();
comment:any = '';
type:any = '';
adds:any;

  constructor(public navCtrl: NavController, 
  	public auth:AuthProvider,
    public alertP: AlertProvider,
    public keyboard:Keyboard,
    public rest_api:RestApiProvider,     
   	public viewCtrl:ViewController,
  	public navParams: NavParams) {

  	this.feed_id = this.navParams.get('feed_id');
    this.adds = this.navParams.get('adds');
    
  	this.get_comment(this.feed_id);

    var type = this.navParams.get('type');
    if(type == 'Post Detail'){
      this.type = 'Comments'
    }else if(type == 'Bark Detail'){
      this.type = 'Barks'
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }

  get_comment(feed_id:any) {
  	let Data = {
      user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
      feed_id:{"value":feed_id,"type":"NO"},
      type:{"value":this.adds,"type":"NO"},
    }
    this.rest_api.postwithoutldr(Data,'comment_user_list').then((result:any) => {
      console.log(result);
      if(result.status == 1) {
      	this.comments = result.comments;
      }
    })
  }

  postComment() {
  	let Data = {
      user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
      feed_id:{"value":this.feed_id,"type":"NO"},
      description:{"value":this.comment.trim(),"type":"DES"},
      type:{"value":this.adds,"type":"NO"},

    }
    this.rest_api.postData(Data,'add_comment_form').then((result:any) => {
      console.log(result);
      if(result.status == 1) {
      	this.get_comment(this.feed_id);
        this.comment = '';
      }
    })
  }

  close() {
  	this.viewCtrl.dismiss(this.comments.length);
  }

  deleteComment(list:any){
  	let Data = {
      user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
      comment_id:{"value":list.id,"type":"NO"},
      // description:{"value":this.comment.trim(),"type":"DES"}
    }
    this.rest_api.postData(Data,'delete_comment').then((result:any) => {
      console.log(result);
      if(result.status == 1) {
      	this.get_comment(this.feed_id);
      }
    })
  }

  otherUser(id:any) {
    if(id!=this.auth.getCurrentUserId()){
      this.navCtrl.push(MemberProfilePage,{user_id:id});
    }
  }

}
