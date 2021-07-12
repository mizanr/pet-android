import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert';
import { AuthProvider } from '../../providers/auth/auth';
import { ImageProvider } from '../../providers/image/image';
import { RestApiProvider } from '../../providers/rest-api/rest-api';

/**
 * Generated class for the BreedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-breed',
  templateUrl: 'breed.html',
})
export class BreedPage {
  breeds:any = new Array();
  all_breeds:any = new Array();
  breed:any='';
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public auth:AuthProvider,
    public imageP:ImageProvider,
    public restApi:RestApiProvider,
    public alertP:AlertProvider,
    public view: ViewController) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BreedPage');
  }

  closemodal(){
    this.view.dismiss(this.breed);
  }

  ionViewWillEnter() {
    this.get_breed();
  }

  get_breed() { 
    let Data = {
      race_id:{"value":this.navParams.data.raceId,"type":"NO"},
      user_id:{value:this.auth.getCurrentUserId(),"type":"NO"},      
    }

    this.restApi.postData(Data,'getbreed').then((result:any) => {
      console.log('get_breed------',result);
      if(result.status == 1){
        this.breeds = result.breed;
        this.all_breeds = result.breed;
      }
    })
  }

  search(ev:any){
    var val = ev.target.value;
    if(val&&val.trim() !=''){
      this.breeds = this.all_breeds.filter((item) => {
        return item.breed_name.toLowerCase().indexOf(val.toLowerCase()) > -1;
      })
    } else {
      this.breeds=this.all_breeds;
    }    
  }


  breed_change(c:any){
    this.view.dismiss(this.breed);
  }

}
