import { Component } from '@angular/core';
import { Events, NavController, NavParams, ModalController } from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert';
import { AuthProvider } from '../../providers/auth/auth';
import { ImageProvider } from '../../providers/image/image';
import { MediaProvider } from '../../providers/media/media';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { BreedPage } from '../breed/breed';
import { CoatPage } from '../coat/coat';
import { ColorPage } from '../color/color';
import { ProfileGalleryPage } from '../profile-gallery/profile-gallery';
import { RacePage } from '../race/race';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the AddPetDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-pet-detail',
  templateUrl: 'add-pet-detail.html',
})
export class AddPetDetailPage {

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
coats:any = new Array();
all_color:any = new Array();
color:any = new Array();
all_data:any;
isupdate:any;

  constructor(
    public navCtrl: NavController,
    public events:Events,
    public auth:AuthProvider,
    public imageP:ImageProvider,
    public restApi: RestApiProvider,
    public mediaP:MediaProvider,
    public alertP:AlertProvider,
    public navParams: NavParams,
    public modalCtrl: ModalController) {
      this.all_data=navParams.data.data;
      this.isupdate = navParams.data.isupdate || 0;

      console.log(this.all_data);
     this.formData=this.all_data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPetDetailPage');
  }

  ionViewWillEnter() {
    this.get_coat();
    this.get_color();
  }

  back(){
    //this.navCtrl.pop();
    this.events.publish('back_',this.formData);
    this.submit();
  }

  race(){
    const modal = this.modalCtrl.create(RacePage,{},{cssClass:'moremodel', showBackdrop:true, enableBackdropDismiss:true});
    modal.present();
    modal.onDidDismiss((data)=>{
      console.log(data);
      if(data){
        this.formData.race=data.name;
        this.formData.raceid=data.id;

        this.formData.breed='';
        this.formData.breedid='';
      }
    })
   }

   color_modal(){
     if(this.formData.coatid){
          const modal = this.modalCtrl.create(ColorPage,{coat_id:this.formData.coatid},{cssClass:'moremodel', showBackdrop:true, enableBackdropDismiss:true});
        modal.present();
        modal.onDidDismiss((data)=>{
      console.log(data);
      if(data){
        this.formData.color=data.color_name;
        this.formData.colorid=data.id;
         }
       })
     }
    
   }

   coat(){
    const modal = this.modalCtrl.create(CoatPage,{},{cssClass:'moremodel', showBackdrop:true, enableBackdropDismiss:true});
    modal.present();
    modal.onDidDismiss((data)=>{
      console.log(data);
      if(data){
        this.formData.coat=data.coat_name;
        this.formData.coatid=data.id;

        this.formData.color='';
        this.formData.colorid='';
      }
    })
   }

   breed(){
     if(this.formData.raceid){
      const modal = this.modalCtrl.create(BreedPage,{raceId:this.formData.raceid},{cssClass:'moremodel', showBackdrop:true, enableBackdropDismiss:true});
    modal.present();
    modal.onDidDismiss((data) => {
      console.log(data);
      if(data){
        this.formData.breed=data.breed_name;
        this.formData.breedid=data.id;
        }
      })
     }    
   }

  get_coat() {
    let Data = {
    user_id:{value:this.auth.getCurrentUserId(),"type":"NO"},
  }
   this.restApi.postwithoutldr(Data,'getcoat').then((result:any) => {
     console.log('coat_all_data--------',result);
     if(result.status == 1) {
       this.coats = result.coat;
     }
   })
 }

 get_color() {
  let Data = {
  // coat_id:{"value":coat_id,"type":"NO"},
  user_id:{value:this.auth.getCurrentUserId(),"type":"NO"},
 }

 this.restApi.postData(Data,'getcolor').then((result:any) => {
   if(result.status == 1){
     // this.color = result.color;
     this.all_color = result.color;
     this.mergeup(this.formData.coat,1);
   }
 })
}

  mergeup(id:any,t:any) {
    console.log('coatid------',id)
    if(t==0){
      this.color=[];
      this.formData.color='';
    }
    for(let i=0;i<this.all_color.length;i++){
      if(id == this.all_color[i]['coat_id']){
        this.color.push(this.all_color[i]);
      }
    }
   console.log('color------',this.color);
   this.formData.color=this.all_data.color;
  }

  get_image() {
    // this.imageP.getImage().then((img:any) => {
    //   this.formData.img = img;
    //   if(this.isupdate==1){
    //     this.formData.profile=img;
    //   }
    //   var file = this.imageP.imgURItoBlob(img);
    //   this.formData.img_blob = file;
    //   this.formData.img_name = this.imageP.generateImageName('img.jpg');
    //   console.log('blob--',this.formData.img_blob,'name--',this.formData.img_name);
    // });

    // this.imageP.getImageForCrop2().then((data:any) => {
    //   this.formData.img=data.preview;
    //     if(this.isupdate==1){
    //         this.formData.profile=data.preview;
    //       }
    //   this.formData.img_blob=data.file;
    //   this.formData.img_name=data.name;
    //   console.log('blob--',this.formData.img_blob,'name--',this.formData.img_name);
    //   // this.update_account();
    // });

    // const modal = this.modalCtrl.create(ProfileGalleryPage,{});
    // modal.present();
    // modal.onDidDismiss((data) => {
    //   if (data) {
    //     console.log('get img path---', data);
    //     this.imageP.squareCroper(data.nativeURL).then((data:any) => {
    //         console.log('take img page -----',data);
    //         this.formData.img=data.preview;
    //           if(this.isupdate==1){
    //             this.formData.profile=data.preview;
    //           }
    //         this.formData.img_blob=data.file;
    //         this.formData.img_name=data.name;
    //         console.log('blob--',this.formData.img_blob,'name--',this.formData.img_name);
    //       })
    //  }
    // })
    
    this.mediaP.selectImage(true,'square').then((data: any) => {
      if (data != 0) {        
              this.formData.img=data.preview;
              if(this.isupdate==1){
                this.formData.profile=data.preview;
              }
            this.formData.img_blob=data.file;
            this.formData.img_name=data.name;
        console.log('blob--', this.formData.img_blob, 'name--', this.formData.img_name);
      }        
    })
  }

  getwallimage() {
    // this.imageP.getImage().then((img:any) => {
    //   this.formData.cover_img = img;
    //   if(this.isupdate==1){
    //     this.formData.wall_image=img;
    //   }
    //   var file = this.imageP.imgURItoBlob(img);
    //   this.formData.cover_blob = file;
     
    //   this.formData.cover_name = this.imageP.generateImageName('img.jpg');
    //   console.log('blob--',this.formData.cover_blob,'name--',this.formData.cover_name);
    // })
    // this.imageP.getImageForCrop().then((data:any) => {
    //   console.log('take img page -----',data);
    //   this.formData.cover_img=data.preview;
    //     if(this.isupdate==1){
    //     this.formData.wall_image=data.preview;
    //   }
    //   this.formData.cover_blob=data.file;
    //   this.formData.cover_name=data.name;
    //    console.log('blob--',this.formData.cover_blob,'name--',this.formData.cover_name);
    // })

    // const modal = this.modalCtrl.create(ProfileGalleryPage,{});
    // modal.present();
    // modal.onDidDismiss((data) => {
    //   if (data) {
    //     console.log('get img path---', data);
    //     this.imageP.retegularCroper(data.nativeURL).then((data:any) => {
    //       console.log('take img page -----', data);
    //       this.formData.cover_img=data.preview;          
    //         if(this.isupdate==1){
    //           this.formData.wall_image=data.preview;
    //         }
    //         this.formData.cover_blob=data.file;
    //         this.formData.cover_name=data.name;
    //          console.log('blob--',this.formData.cover_blob,'name--',this.formData.cover_name);
    //       })
    //  }
    // })
    
    this.mediaP.selectImage(true,'cover').then((data: any) => {
      if (data != 0) {
        
      this.formData.cover_img=data.preview;          
            if(this.isupdate==1){
              this.formData.wall_image=data.preview;
            }
            this.formData.cover_blob=data.file;
            this.formData.cover_name=data.name;
        console.log('blob--', this.formData.cover_blob, 'name--', this.formData.cover_name);
        }        
      })
    
  }


  submit() {
    let Data = {
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

    if(this.formData.pet_id>'0'){
      Data['id']={value:this.formData.pet_id,type:"NO"};
      this.restApi.postData2(Data,0,'edit_pet').then((result:any) => {
        if(result.status == 1){
        //  this.formData.pet_id=result.pet_detail.id;
          console.log(result);
          this.formData.cover_blob = '';
          this.formData.img_blob = '';
          this.navCtrl.pop();
          // this.navCtrl.setRoot(TabsPage, { tabindex: 3 });
          // this.alertP.showAsync('Success',result.msg).then(() => {
          //   if(this.auth.getUserDetails().is_pet_added == 1){
          //     this.navCtrl.pop();
          //   } else {
          //       this.auth.updateUserDetails(result.userDetails);
          //       this.events.publish('loginAuth','');
          //       this.navCtrl.setRoot(TabsPage);
          //   }
          // })
        } else {
          this.alertP.show('Alert',result.msg);
        }

      });
    } else {
      this.restApi.postData2(Data,0,'add_pet').then((result:any) => {
        if(result.status == 1){
          this.formData.pet_id=result.pet_detail.id;
          this.auth.updateUserDetails(result.userDetails);
          console.log(result);
          this.formData.cover_blob = '';
          this.formData.img_blob = '';
          this.navCtrl.pop();
          // this.navCtrl.pop();
          // this.navCtrl.setRoot(TabsPage, { tabindex: 3 });
          // this.alertP.showAsync('Success',result.msg).then(() => {
          //   if(this.auth.getUserDetails().is_pet_added == 1){
          //     this.navCtrl.pop();
          //   } else {
          //       this.auth.updateUserDetails(result.userDetails);
          //       this.events.publish('loginAuth','');
          //       this.navCtrl.setRoot(TabsPage);
          //   }
          // })
        } else {
          this.alertP.show('Alert',result.msg);
        }

      });
    }


  }

}
