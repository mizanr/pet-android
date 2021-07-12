import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert';
import { AuthProvider } from '../../providers/auth/auth';
import { ImageProvider } from '../../providers/image/image';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { VendorProductCategoryPage } from '../vendor-product-category/vendor-product-category';

/**
 * Generated class for the VendorAddServicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-vendor-add-service',
  templateUrl: 'vendor-add-service.html',
})
export class VendorAddServicePage {
  formData:any = {
    description:'',
    name:'',
    category:'',
    price:'',
    duration1:'',
    duration2:'',
    image:'',
    img_blob:'',
    blob_name:'',
   }

   isupdate:any;
   weeks:any=[
     {name:'Monday'},
     {name:'Tuesday'},
     {name:'Wednesday'},
     {name:'Thursday'},
     {name:'Friday'},
     {name:'Saturday'},
     {name:'Sunday'},
   ]
  constructor(public navCtrl: NavController, 
    public restApi:RestApiProvider,
    public alertP:AlertProvider,
    public modal:ModalController,
    public auth:AuthProvider,
    public imageP:ImageProvider,
    public navParams: NavParams) {
      this.isupdate=navParams.data.isupdate || 0;
      if(this.isupdate==1){
        this.get_service();
      }
  }

  get_service() {
  	let Data = {
  		user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
  		service_id:{"value":this.navParams.data.service_id,"type":"NO"},
  	}
  	this.restApi.postData(Data,'get_single_service').then((res:any) => {
  		console.log('get service-----',res);
  		if(res.status == 1){
  			this.formData = res.data;
          if(this.formData.Mon_status == 1){
            this.weeks[0].ischeck=true;
            this.weeks[0].start=this.formData.Mon_start;
            this.weeks[0].end=this.formData.Mon_end;
          }

          if(this.formData.Tue_status == 1){
            this.weeks[1].ischeck=true;
            this.weeks[1].start=this.formData.Tue_start;
            this.weeks[1].end=this.formData.Tue_end;
          }

          if(this.formData.Wed_status == 1){
            this.weeks[2].ischeck=true;
            this.weeks[2].start=this.formData.Wed_start;
            this.weeks[2].end=this.formData.Wed_end;
          }

          if(this.formData.Thu_status == 1){
            this.weeks[3].ischeck=true;
            this.weeks[3].start=this.formData.Thu_start;
            this.weeks[3].end=this.formData.Thu_end;
          }

          if(this.formData.Fri_status == 1){
            this.weeks[4].ischeck=true;
            this.weeks[4].start=this.formData.Fri_start;
            this.weeks[4].end=this.formData.Fri_end;
          }

          if(this.formData.Sat_status == 1){
            this.weeks[5].ischeck=true;
            this.weeks[5].start=this.formData.Sat_start;
            this.weeks[5].end=this.formData.Sat_end;
          }

          if(this.formData.Sun_status == 1){
            this.weeks[6].ischeck=true;
            this.weeks[6].start=this.formData.Sun_start;
            this.weeks[6].end=this.formData.Sun_end;
          }

        if(this.formData.Mon_status == 1){
          let m={name:'M'}
        }
  		}
  	})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VendorAddServicePage');
  }

  getcategory(){
    const modal = this.modal.create(VendorProductCategoryPage,{},{cssClass:'moremodel', showBackdrop:true, enableBackdropDismiss:true});
    modal.present();
    modal.onDidDismiss((data)=>{
      console.log(data);
      if(data){
        this.formData.category=data;
      }
    })
  }

  get_image() {
    this.imageP.getImage().then((img:any) => {
      this.formData.image=img;
      let b =this.imageP.imgURItoBlob(img);
      this.formData.img_blob=b;
      this.formData.blob_name=this.imageP.generateImageName('img.jpg');
      console.log(this.formData.img_blob,this.formData.blob_name);
    })
  }


  add_service() {
    console.log(this.formData);
    if(!this.formData.img_blob){
      this.alertP.show('Alert','Please upload image.');
      return;
    }

    let Data = {
  		user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
  		description:{"value":this.formData.description.trim(),"type":"DES"},
  		name:{"value":this.formData.name.trim(),"type":"SNAME"},
  		category:{"value":this.formData.category.id,"type":"CATE"},
  		price:{"value":this.formData.price,"type":"NO"},
  		duration1:{"value":this.formData.duration1,"type":"NO"},
  		duration2:{"value":this.formData.duration2,"type":"NO"}, // pass two value dur1, dur2
  	}

  	if(this.formData.img_blob){
  		Data['image'] = {"value":this.formData.img_blob,"type":"NO","name":this.formData.blob_name};
  	}
    for(let i=0;i<this.weeks.length;i++){
      if(this.weeks[i].ischeck){
        // Data[`name[${i}]`]={value:this.weeks[i].name,type:"NO"};
        // Data[`ischeck[${i}]`]={value:this.weeks[i].ischeck.name,type:"NO"};
        // Data[`start[${i}]`]={value:this.weeks[i].name,type:"NO"};
        // Data[`end[${i}]`]={value:this.weeks[i].name,type:"NO"};
        if(this.weeks[i].name=='Monday'){
          Data['Mon_status']={value:1,type:"DUR"};
		  		Data['Mon_start']={value:this.weeks[i].start,type:"DUR"};
		  		Data['Mon_end']={value:this.weeks[i].end,type:"DUR"};
        }

        if(this.weeks[i].name=='Tuesday'){
          Data['Tue_status']={value:1,type:"DUR"};
		  		Data['Tue_start']={value:this.weeks[i].start,type:"DUR"};
		  		Data['Tue_end']={value:this.weeks[i].end,type:"DUR"};
        }

        if(this.weeks[i].name=='Wednesday'){
          Data['Wed_status']={value:1,type:"DUR"};
		  		Data['Wed_start']={value:this.weeks[i].start,type:"DUR"};
		  		Data['Wed_end']={value:this.weeks[i].end,type:"DUR"};
        }

        if(this.weeks[i].name=='Thursday'){
          Data['Thu_status']={value:1,type:"DUR"};
		  		Data['Thu_start']={value:this.weeks[i].start,type:"DUR"};
		  		Data['Thu_end']={value:this.weeks[i].end,type:"DUR"};
        }

        if(this.weeks[i].name=='Friday'){
          Data['Fri_status']={value:1,type:"DUR"};
		  		Data['Fri_start']={value:this.weeks[i].start,type:"DUR"};
		  		Data['Fri_end']={value:this.weeks[i].end,type:"DUR"};
        }

        if(this.weeks[i].name=='Saturday'){
          Data['Sat_status']={value:1,type:"DUR"};
		  		Data['Sat_start']={value:this.weeks[i].start,type:"DUR"};
		  		Data['Sat_end']={value:this.weeks[i].end,type:"DUR"};
        }

        if(this.weeks[i].name=='Sunday'){
          Data['Sun_status']={value:1,type:"DUR"};
		  		Data['Sun_start']={value:this.weeks[i].start,type:"DUR"};
		  		Data['Sun_end']={value:this.weeks[i].end,type:"DUR"};
        }
      }
    }
    this.restApi.postData2(Data,0,'add_service').then((result:any) => {
  		console.log(result);
  		if(result.status == 1){
  			this.alertP.showAsync('Success',result.message).then(() => {
  				this.navCtrl.pop();
  			})
  		} else {
  			//this.alertP.show('Alert',result.message);
  			}
  		});
  }

  update_service() {
    let Data = {
  		service_id:{"value":this.formData.id,"type":"NO"},
  		user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
  		description:{"value":this.formData.description.trim(),"type":"DES"},
  		name:{"value":this.formData.name.trim(),"type":"SNAME"},
  		category:{"value":this.formData.category.id,"type":"CATE"},
  		price:{"value":this.formData.price,"type":"NO"},
  		duration1:{"value":this.formData.duration1,"type":"NO"},
  		duration2:{"value":this.formData.duration2,"type":"NO"}, // pass two value dur1, dur2
  	}

  	if(this.formData.img_blob){
  		Data['image'] = {"value":this.formData.img_blob,"type":"NO","name":this.formData.blob_name};
  	}
    for(let i=0;i<this.weeks.length;i++){
      if(this.weeks[i].ischeck){
        // Data[`name[${i}]`]={value:this.weeks[i].name,type:"NO"};
        // Data[`ischeck[${i}]`]={value:this.weeks[i].ischeck.name,type:"NO"};
        // Data[`start[${i}]`]={value:this.weeks[i].name,type:"NO"};
        // Data[`end[${i}]`]={value:this.weeks[i].name,type:"NO"};
        if(this.weeks[i].name=='Monday'){
          Data['Mon_status']={value:1,type:"DUR"};
		  		Data['Mon_start']={value:this.weeks[i].start,type:"DUR"};
		  		Data['Mon_end']={value:this.weeks[i].end,type:"DUR"};
        }

        if(this.weeks[i].name=='Tuesday'){
          Data['Tue_status']={value:1,type:"DUR"};
		  		Data['Tue_start']={value:this.weeks[i].start,type:"DUR"};
		  		Data['Tue_end']={value:this.weeks[i].end,type:"DUR"};
        }

        if(this.weeks[i].name=='Wednesday'){
          Data['Wed_status']={value:1,type:"DUR"};
		  		Data['Wed_start']={value:this.weeks[i].start,type:"DUR"};
		  		Data['Wed_end']={value:this.weeks[i].end,type:"DUR"};
        }

        if(this.weeks[i].name=='Thursday'){
          Data['Thu_status']={value:1,type:"DUR"};
		  		Data['Thu_start']={value:this.weeks[i].start,type:"DUR"};
		  		Data['Thu_end']={value:this.weeks[i].end,type:"DUR"};
        }

        if(this.weeks[i].name=='Friday'){
          Data['Fri_status']={value:1,type:"DUR"};
		  		Data['Fri_start']={value:this.weeks[i].start,type:"DUR"};
		  		Data['Fri_end']={value:this.weeks[i].end,type:"DUR"};
        }

        if(this.weeks[i].name=='Saturday'){
          Data['Sat_status']={value:1,type:"DUR"};
		  		Data['Sat_start']={value:this.weeks[i].start,type:"DUR"};
		  		Data['Sat_end']={value:this.weeks[i].end,type:"DUR"};
        }

        if(this.weeks[i].name=='Sunday'){
          Data['Sun_status']={value:1,type:"DUR"};
		  		Data['Sun_start']={value:this.weeks[i].start,type:"DUR"};
		  		Data['Sun_end']={value:this.weeks[i].end,type:"DUR"};
        }
      }
    }
    this.restApi.postData2(Data,0,'edit_service').then((result:any) => {
  		console.log(result);
  		if(result.status == 1){
  			this.alertP.showAsync('Success',result.message).then(() => {
  				this.navCtrl.pop();
  			})
  		} else {
  			//this.alertP.show('Alert',result.message);
  			}
  		});
  }

}
