import { Component } from '@angular/core';
import { App, Events, NavController, NavParams } from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert';
import { AuthProvider } from '../../providers/auth/auth';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { AddPetBreedPage } from '../add-pet-breed/add-pet-breed';
import { AddPetDetailPage } from '../add-pet-detail/add-pet-detail';
import { AddPetGenderPage } from '../add-pet-gender/add-pet-gender';
import { AddPetSizePage } from '../add-pet-size/add-pet-size';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the AddNewPetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-new-pet',
  templateUrl: 'add-new-pet.html',
})
export class AddNewPetPage {
  formData:any = {
    pet_name:'',
    race:'',
    raceid:'',
    color:'',
    colorid:'',
    weight:'',
    coat:'',
    coatid:'',
    gendar:'',
    breed:'',
    breedid:'',
    size:'',
    cover_img:'',
    cover_blob:'',
    cover_name:'',
    img:'',
    img_blob:'',
    img_name:'',
    pet_id:'0',
    wall_image:'',
    profile:'',
  }
  isupdate:any;
  constructor(public navCtrl: NavController,
    public events:Events,
    public auth:AuthProvider,
    public alertP:AlertProvider,
    public app:App,
    public restApi:RestApiProvider,
     public navParams: NavParams) {      

      this.isupdate = navParams.data.isupdate || 0;

      if(this.isupdate==1) {
        this.formData=navParams.data.pet;
        console.log('edit pet',this.formData);
      }

      events.subscribe('back_',(data) => {
        if(data){
          console.log(data);
          if(data.pet_name) {
            this.formData=data;
            // this.formData.pet_name = data.pet_name;
            // this.formData.race = data.race;
            // this.formData.color= data.color;
            // this.formData.size = data.size;
            // this.formData.img = data.img;
            // this.formData.img_blob=data.img_blob;
            // this.formData.img_name=data.img_name;
            // this.formData.cover_img=data.cover_img;
            // this.formData.cover_blob=data.cover_blob;
            // this.formData.cover_name=data.cover_name;
          }
          if(data.gendar){
            this.formData.gendar=data.gendar;
          }
          if(data.breed){
            this.formData.breed=data.breed;
          }
          if(data.size){
            this.formData.size=data.size;
          }
        }
      })

      // events.subscribe('edit_pet',(data) => {
      //   if(data){
      //     this.formData=data;
      //   }
      // })
  }

  go_mainScreen() {
    this.app.getRootNav().setRoot(TabsPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddNewPetPage');
  }

  detail(){
    this.navCtrl.push(AddPetDetailPage,{data:this.formData,isupdate: this.isupdate});
  }

  gender(){
    this.navCtrl.push(AddPetGenderPage,{gendar:this.formData.gendar,data:this.formData,isupdate: this.isupdate});
  }

  size(){
    this.navCtrl.push(AddPetSizePage,{size:this.formData.size,data:this.formData,isupdate: this.isupdate});
  }

  breed(){
    this.navCtrl.push(AddPetBreedPage,{breed:this.formData.breed,data:this.formData,isupdate: this.isupdate});
  }

  update_pet() {
    // let Data = {
    //   id:{value:this.formData.pet_id,type:"NO"},
    //   user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
    //   name:{"value":this.formData.pet_name,"type":"PNAME"},
    //   gender:{"value":this.formData.gendar,"type":"NO"},
    //   dob:{"value":'',"type":"NO"},
    //   race:{"value":'',"type":"NO"},
    //   breed:{"value":this.formData.breed,"type":"NO"},
    //   coat:{"value":this.formData.coat,"type":"COAT"},
    //   color:{"value":this.formData.color,"type":"COLR"},
    //   behaviour:{"value":'',"type":"NO"},
    //   size:{"value":this.formData.size,"type":"NO"},
    //   weight:{"value":this.formData.weight,"type":"NO"},
    // }
    let Data = {
      id:{value:this.formData.pet_id,type:"NO"},
      user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
      name:{"value":this.formData.pet_name,"type":"PNAME"},
      gender:{"value":this.formData.gendar,"type":"NO"},
      dob:{"value":'',"type":"NO"},
      race:{"value":this.formData.race,"type":"NO"},
      raceid:{"value":this.formData.raceid,"type":"NO"},
      breed:{"value":this.formData.breed,"type":"NO"},
      breedid:{"value":this.formData.breedid,"type":"NO"},
      coat:{"value":this.formData.coat,"type":"NO"},
      coatid:{"value":this.formData.coatid,"type":"NO"},
      color:{"value":this.formData.color,"type":"NO"},
      colorid:{"value":this.formData.colorid,"type":"NO"},
      behaviour:{"value":'',"type":"NO"},
      size:{"value":this.formData.size,"type":"NO"},
      weight:{"value":this.formData.weight,"type":"NO"},
    }
    if(this.formData.img_blob){
      Data['profile'] = {"value":this.formData.img_blob,"type":"IMAGE1","name":this.formData.img_name};
    }

    if(this.formData.cover_blob){
      Data['wall_image'] = {"value":this.formData.cover_blob,"type":"IMAGE1","name":this.formData.cover_name};
    }
    this.restApi.postData2(Data,0,'edit_pet').then((result:any) => {
      if(result.status == 1){
        console.log(result);
       
      } else {
        this.alertP.show('Alert',result.msg);
      }
    });
  }
}
