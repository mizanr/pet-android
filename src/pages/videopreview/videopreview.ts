import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
/**
 * Generated class for the VideopreviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-videopreview',
  templateUrl: 'videopreview.html',
})
export class VideopreviewPage {

  video="";
  thumb="";
  constructor(public navCtrl: NavController, public viewCtrl:ViewController, public navParams: NavParams) {
    this.video=this.navParams.get("video");
    this.thumb=this.navParams.get("thumb");
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad VideoPreviewPage');
    setTimeout(()=>{
    let m:any=document.getElementById('videopre');
    m.play();
    },1000);
  }
  close(){
    this.viewCtrl.dismiss();
  }
  ok(){
    this.viewCtrl.dismiss(true);
  }

}
