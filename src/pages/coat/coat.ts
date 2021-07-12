import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert';
import { AuthProvider } from '../../providers/auth/auth';
import { ImageProvider } from '../../providers/image/image';
import { RestApiProvider } from '../../providers/rest-api/rest-api';

/**
 * Generated class for the CoatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-coat',
  templateUrl: 'coat.html',
})
export class CoatPage {
  coats:any=new Array();
  all_coats:any=new Array();
  coat:any;
  constructor(public navCtrl: NavController,
    public auth:AuthProvider,
    public imageP:ImageProvider,
    public restApi:RestApiProvider,
    public alertP:AlertProvider,
    public view:ViewController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CoatPage');
  }

  closemodal() {
    this.view.dismiss(this.coat);
  }

  ionViewWillEnter() {
    this.get_coat();
  }

  get_coat() {
    let Data = {
    user_id:{value:this.auth.getCurrentUserId(),"type":"NO"},
  }
   this.restApi.postData(Data,'getcoat').then((result:any) => {
     console.log('coat_all_data--------',result);
     if(result.status == 1) {
       this.coats = result.coat;
       this.all_coats = result.coat;
     }
   })
 }

 coat_chagne() {
  this.view.dismiss(this.coat);
 }

 search(ev:any) {
  console.log(ev.target.value);
  var val = ev.target.value;
  if(val&&val.trim !=''){
    this.coats = this.all_coats.filter((item) => {
      return item.coat_name.toLowerCase().indexOf(val.toLowerCase()) > -1;
    })
  } else {
    this.coats=this.all_coats;
  }
 }

}
