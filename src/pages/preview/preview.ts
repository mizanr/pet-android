import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { NavController, NavParams ,ViewController} from 'ionic-angular';


/**
 * Generated class for the PreviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-preview',
  templateUrl: 'preview.html',
})
export class PreviewPage {
info:any;

  constructor(public navCtrl: NavController,
    public auth:AuthProvider,
    public view:ViewController, 
  	public navParams: NavParams) {
  	this.info = navParams.get('data');
    console.log(this.info);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreviewPage');
  }

  close() {
  	this.view.dismiss();
  }

  go_url(){
    if(this.info.url != ''){
      window.open(this.info.url,'_system');
    }
  }

}
