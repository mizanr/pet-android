import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChatdetailsPage } from '../chatdetails/chatdetails';
import { NotificationsPage } from '../notifications/notifications';
import { AuthProvider } from './../../providers/auth/auth';
import { AlertProvider } from './../../providers/alert/alert';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import { LangPipe } from '../../pipes/lang/lang';
/**
 * Generated class for the ChatListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-chat-list',
  templateUrl: 'chat-list.html',
})
export class ChatListPage {
friends:any = new Array();
all_friends:any = new Array();
get_chat_interval:any;

  constructor(public navCtrl: NavController,
    public auth:AuthProvider,
    public rest_api:RestApiProvider,
    public aletP: AlertProvider,
    public lang:LangPipe,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.interval();
    },2000)
    console.log('ionViewDidLoad ChatListPage');
  }

  ionViewWillEnter() {
    this.get_chat();    
  }

  ionViewWillLeave() {
    clearInterval(this.get_chat_interval);
  }

  chatdetail(item:any) {
    this.navCtrl.push(ChatdetailsPage,{user:item});
  }

  notification() {
    this.navCtrl.push(NotificationsPage)
  }

  interval() {
    this.get_chat_interval = setInterval(() => {
      this.get_chat();
    },2000);
  }

  get_chat() {
    let Data = {
      user_id:{"value":this.auth.getCurrentUserId(),"type":'NO'},
    }
    this.rest_api.postwithoutldr(Data,'chat_users').then((result:any) => {
      console.log(result);
      if(result.status == 1){
        this.friends = result.users;
        this.all_friends = result.users;
        }
      })
  }

  search(ev:any){
    console.log(ev.target.value);
    var val = ev.target.value;
    if(val && val.trim()){
      clearInterval(this.get_chat_interval);
      this.friends = this.all_friends.filter((item) => {
        return item.first_name.toLowerCase().indexOf(val.toLowerCase()) > -1  
      })
    } else {
      // this.get_chat();
      this.friends=this.all_friends;
      this.interval();
    }
  }

  delete_chat(chat:any,inx:any) {
    console.log(chat);
    this.aletP.confirmation(
      this.lang.transform('REMOVECHAT', []),
      this.lang.transform('AREREMOVECHAT', []),
      this.lang.transform('YES', []),
      this.lang.transform('NO',[])).then((data) => {
      if(data){
        this.friends.splice(inx,1);
        this.remove_chat(chat.id);
      }
    })
  }

  remove_chat(chat_id:any){
    let Data = {
      user_id:{value:this.auth.getCurrentUserId(),type:"NO"},
      // chat_id:{value:chat_id,type:"NO"},
      sender:{value:this.auth.getCurrentUserId(),type:"NO"},
      receiver:{value:chat_id,type:'NO'},
    }
    this.rest_api.postData(Data,'delete_chat').then((res:any) => {
      console.log(res);
      if(res.status==1){

      }
    })
  }

}
