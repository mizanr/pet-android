import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { AuthProvider } from './../../providers/auth/auth';
import { AlertProvider } from './../../providers/alert/alert';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { CommentPage } from '../comment/comment';
/**
 * Generated class for the AdsDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ads-detail',
  templateUrl: 'ads-detail.html',
})
export class AdsDetailPage {
info:any = '';
feeds:any = new Array();
val:any;

  constructor(public navCtrl: NavController,
  		public auth:AuthProvider,
	  public rest_api:RestApiProvider,
    public alertP:AlertProvider,
    public modalCtrl:ModalController,
    private iab: InAppBrowser,
  		public navParams: NavParams) {
  	this.info = navParams.get('data');
  	// this.get_info(data.id);
    console.log(this.info);
    // this.feeds.push(this.info);
    this.get_info(this.info.id);

  }

  get_info(feed_id:any) {
    let Data = {
      user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
      ad_id:{"value":feed_id,"type":"NO"},
    }
    this.rest_api.postData(Data,'get_single_ads').then((result:any) => {
      console.log(result);
      if(result.status == 1) {
        this.feeds.push(result.data);
      }
    })
  }

  ionViewDidLoad() {
    this.get_click();
    this.view_an_ads();
    console.log('ionViewDidLoad AdsDetailPage');
  }

  view_an_ads() {
  	let Data = {
  		user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
      ad_id:{"value":this.info.id,"type":"NO"},
      login_user:{"value":this.auth.getCurrentUserId(),"type":"NO"},      
  	}
  	this.rest_api.postwithoutldr(Data,'view_an_ads').then((result: any) => {
  		console.log(result);
  		if(result.status == 1){
  			this.get_click();
  		}
  	})
  }

  link() {
  	// window.open(this.info.url,'_system', 'location=yes');
     let browser = this.iab.create(this.info.url, '_blank', 'location=yes,clearsessioncache=yes,clearcache=yes'); 
  }

  go_url() {
    var valid = this.isValidURL(this.info.url);
    console.log(valid);
    if(this.info.url != ''){
        this.click_on_ads();
      window.open(this.info.url, '_system','location=yes,clearsessioncache=yes,clearcache=yes');

    } else {
      this.alertP.presentToast('Link not available.','bottom');
    }
  }

  isValidURL(string) {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
  };

  click_on_ads() {
      let Data = {
        user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
        ad_id:{"value":this.info.id,"type":"NO"},
        login_user:{"value":this.auth.getCurrentUserId(),"type":"NO"},
      }
      this.rest_api.postwithoutldr(Data,'click_on_ads').then((result: any) => {
        console.log(result);
        if(result.status == 1){
          //this.info = result.data;
          this.get_click();
        }
      })
  }

  count() {
    this.alertP.showAsync(`Total View's`,`${this.val.total_views} View.`).then(() => {

    })
  }

  get_click() {
    let Data = {
      ad_id:{"value":this.info.id,"type":"NO"},
      user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
    }

    this.rest_api.postwithoutldr(Data,'get_total_click_on_ads').then((res:any) => {
      console.log(res);
      if(res.status == 1){
        this.val = res.data;
      }
    })
  }

getHTML(text){

  return text.replace("\n", function (url) {
      return "<br>";
    });
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
          item.likes = parseInt(item.likes) + 1;
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
          // item.likes -= 1;
  
        }
      })
    }
   }

   comment_add(item:any) {
    const modal = this.modalCtrl.create(CommentPage,{feed_id:item.id,type:'Bark Detail',adds:2});
    modal.present();
    modal.onDidDismiss((data) => {
      if(data){   
        this.feeds = new Array();
        this.get_info(this.info.id);
      }
    })
  }
}
