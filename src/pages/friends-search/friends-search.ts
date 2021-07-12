import { Component } from '@angular/core';
import { Events, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FriendsSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-friends-search',
  templateUrl: 'friends-search.html',
})
export class FriendsSearchPage {
  buddies:any=new Array();
  allbuddies:any=new Array();

  constructor(public navCtrl: NavController, 
    public events:Events,
    public navParams: NavParams) {
      this.buddies=navParams.data.buddies;
      this.allbuddies=navParams.data.buddies;
      console.log(this.buddies);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendsSearchPage');
  }

  search(ev:any){
    var val = ev.target.value;

    if(val&&val.trim() !=''){
      this.buddies=this.allbuddies.filter((item) => {
        return item.first_name.toLowerCase().indexOf(val.toLowerCase()) > -1;
      })
    } else {
      this.buddies=this.allbuddies;
    }

  }

  checkend(bool:any,inx:any) {
    for(let i=0;i<this.allbuddies.length;i++){
      if(this.allbuddies[i].is_check){
        console.log(this.allbuddies[i]);
        this.navCtrl.pop();
        setTimeout(() => {
          this.events.publish('share_friend',this.allbuddies[i]);          
        }, 200);
      }
    }
  }

}
