import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert';
import { AuthProvider } from '../../providers/auth/auth';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { AddNewPetPage } from '../add-new-pet/add-new-pet';

/**
 * Generated class for the PetListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-pet-list',
  templateUrl: 'pet-list.html',
})
export class PetListPage {
  pets:any=new Array();

  constructor(public navCtrl: NavController, 
    public auth:AuthProvider,
    public restApi:RestApiProvider,
    public alertP:AlertProvider,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PetListPage');
  }

  ionViewWillEnter() {
    this.getPetList();
  }

  getPetList() {
    let Data = {
        user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
        login_user:{"value":this.auth.getCurrentUserId(),"type":"NO"},

    }
    this.restApi.postData(Data,'getuserdata').then((res:any) => {
      console.log(res);
      if(res.status == 1){
       // this.auth.updateUserDetails(res.userDetails);
        this.pets = res.pets;
        // this.info = this.auth.getUserDetails();
        // this.intializeData();
      }
    })
  }

  pet_edit(pet:any) {
    this.navCtrl.push(AddNewPetPage,{isupdate:1,pet:pet});
  }

  pet_delete(pet_id:any,inx:any){
    this.alertP.confirmation('Delete Pet','Are you sure, you want to delete this pet?','Yes','No')
    .then((data) => {
      if(data){
        let Data = {
      user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
      pet_id:{"value":pet_id,"type":"NO"},
    }

    this.restApi.postData(Data,'delete_pet').then((result:any) => {
      console.log(result);
      if(result.status == 1){
          this.pets.splice(inx,1);
          }
        })
      }
    })
    
  }

}
