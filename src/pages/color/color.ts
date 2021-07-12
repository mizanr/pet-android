import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert';
import { AuthProvider } from '../../providers/auth/auth';
import { ImageProvider } from '../../providers/image/image';
import { RestApiProvider } from '../../providers/rest-api/rest-api';

/**
 * Generated class for the ColorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-color',
  templateUrl: 'color.html',
})
export class ColorPage {
  colors:any = new Array();
  all_colors:any = new Array();
  color:any;

  constructor(public navCtrl: NavController,
    public auth:AuthProvider,
    public imageP:ImageProvider,
    public restApi:RestApiProvider,
    public alertP:AlertProvider, 
    public view:ViewController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ColorPage');
  }

  closemodal() {
    this.view.dismiss(this.color);
  }

  ionViewWillEnter() {
    this.get_color();
  }

  get_color() {
    let Data = {
    coat_id:{value:this.navParams.data.coat_id,type:"NO"},
    user_id:{value:this.auth.getCurrentUserId(),type:"NO"},      
   }
   this.restApi.postData(Data,'getcolor').then((result:any) => {
     console.log('color------',result);
     if(result.status == 1){
       this.colors = result.color;
       this.all_colors = result.color;
     }
   })
 }

 color_chagne () {
  this.view.dismiss(this.color);
 }
  
 search(ev:any) {
  console.log(ev.target.value);
  var val = ev.target.value;
  if(val&&val.trim !=''){
    this.colors = this.all_colors.filter((item) => {
      return item.color_name.toLowerCase().indexOf(val.toLowerCase()) > -1;
    })
  } else {
    this.colors=this.all_colors;
  }
 }

}
