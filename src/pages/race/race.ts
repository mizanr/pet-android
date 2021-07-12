import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert';
import { AuthProvider } from '../../providers/auth/auth';
import { ImageProvider } from '../../providers/image/image';
import { RestApiProvider } from '../../providers/rest-api/rest-api';

/**
 * Generated class for the RacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-race',
  templateUrl: 'race.html',
})
export class RacePage {

  constructor(
    public navCtrl: NavController, 
    public auth:AuthProvider,
    public imageP:ImageProvider,
    public restApi:RestApiProvider,
    public alertP:AlertProvider,
    public navParams: NavParams, 
    public view: ViewController) {
  }
  races:any = new Array();
  all_races:any = new Array();
  race:any='';
  ionViewDidLoad() {
    console.log('ionViewDidLoad RacePage');
  }

  closemodal(){
    this.view.dismiss(this.race);
  }

  ionViewWillEnter() {
    this.get_race();
  }

  get_race() {
    let Data = {
      user_id:{value:this.auth.getCurrentUserId(),"type":"NO"},
    }
     this.restApi.postData(Data,'getrace').then((result:any) => {
       console.log(result);
       if(result.status == 1) {
         this.races = result.race;
         this.all_races = result.race;
       }
     })
   }

   search(ev:any) {
    console.log(ev.target.value);
    var val = ev.target.value;
    if(val&&val.trim !=''){
      this.races = this.all_races.filter((item) => {
        return item.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
      })
    } else {
      this.races=this.all_races;
    }
   }

   race_chagne() {
     this.view.dismiss(this.race);
   }

}
