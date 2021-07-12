import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from './../../providers/auth/auth';
import { AlertProvider } from './../../providers/alert/alert';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import { ImageProvider } from '../../providers/image/image';
import { LangPipe } from '../../pipes/lang/lang';

/**
 * Generated class for the CreateCampaignPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-create-campaign',
  templateUrl: 'create-campaign.html',
})
export class CreateCampaignPage {

formData:any = {
  image:'',
  title:'',
  start_date:'',
  duration:5,
  budget:5,
  url:'',
  projected_exposure:0,
  projected_cost:0,
  status:'',
  description:'',
  blob_image:'',
  blob_img_name:'',
}
isupdate:any;
max:any=new Date().toISOString();

  constructor(public navCtrl: NavController, 
    public auth:AuthProvider,
    public restApi:RestApiProvider,
    public alertP:AlertProvider,
    public imageP: ImageProvider,
    public lang:LangPipe,
    public navParams: NavParams) {
      this.isupdate=navParams.data.isupdate||0;
      this.formData.projected_exposure = this.formData.duration * this.formData.budget /.18; 
    this.formData.projected_cost = this.formData.duration * this.formData.budget; 

    if(this.isupdate==1){
      this.get_info();
    }

  }

  get_info() {
  	let Data = {
  		user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
  		ad_id:{"value":this.navParams.data.comp_id,"type":"NO"},
  	}
  	this.restApi.postData(Data,'get_single_ads').then((result: any) => {
  		console.log(result);
  		if(result.status == 1){
  			this.formData = result.data;
  		}
  	})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateCampaignPage');
  }


  back(){
    this.navCtrl.pop();
  }

  get_image() {
    this.imageP.getImage().then((img) => {
      this.formData.image = img;
    var file = this.imageP.imgURItoBlob(img);
    this.formData.blob_image = file;
    this.formData.blob_img_name = this.imageP.generateImageName('hello.jpg');
    console.log('blob img:::--',this.formData.blob_image,'blobname---',this.formData.blob_img_name);
    })
  }

  submit(status:any) {
    if(!this.formData.blob_image){
      this.alertP.show('Alert','Please Upload banner image.');
      return;
    }

    let Data = {
      user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
      title:{"value":this.formData.title.trim(),"type":"TITLE"},
      start_date:{"value":this.formData.start_date,"type":"NO"},
      duration:{"value":this.formData.duration,"type":"NO"},
      budget:{"value":this.formData.budget,"type":"NO"},
      url:{"value":this.formData.url,"type":"NO"},
      projected_exposure:{"value":this.formData.projected_exposure,"type":"NO"},
      projected_cost:{"value":this.formData.projected_cost,"type":"NO"},
      status:{"value":status,"type":"NO"},
      description:{"value":this.formData.description,"type":"NO"},
      image:{"value":this.formData.blob_image,"name":this.formData.blob_img_name,"type":"NO"},
    }

    this.restApi.postData2(Data,0,'add_ads').then((result:any) => {
      console.log(result);
      if(result.status == 1){
        this.alertP.showAsync('Success',result.message).then(() => {
          this.navCtrl.pop();
        })
      }
    })
  }


  update() {
    // if(!this.formData.blob_image){
    //   this.alertP.show('Alert','Please Upload banner image.');
    //   return;
    // }

    let Data = {
      ad_id:{"value":this.formData.id,"type":"NO"},
      user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
      title:{"value":this.formData.title.trim(),"type":"TITLE"},
      start_date:{"value":this.formData.start_date1,"type":"NO"},
      duration:{"value":this.formData.duration,"type":"NO"},
      budget:{"value":this.formData.budget,"type":"NO"},
      url:{"value":this.formData.url,"type":"NO"},
      projected_exposure:{"value":this.formData.projected_exposure,"type":"NO"},
      projected_cost:{"value":this.formData.projected_cost,"type":"NO"},
      //status:{"value":status,"type":"NO"},
      description:{"value":this.formData.description,"type":"NO"},
      image:{"value":this.formData.blob_image,"name":this.formData.blob_img_name,"type":"NO"},
    }

    this.restApi.postData2(Data,0,'edit_ads').then((result:any) => {
      console.log(result);
      if(result.status == 1){
        this.alertP.showAsync(
          this.lang.transform('SUCCESS',[]), result.message).then(() => {
          this.navCtrl.pop();
        })
      }
    })
  }

  duratin_change(ev: any){
    console.log(ev.value);
    this.formData.duration = ev.value;
  this.formData.projected_exposure = this.formData.duration * this.formData.budget /.18; 
  this.formData.projected_cost = this.formData.duration * this.formData.budget; 
  }

  budget_change(ev :any) {
    console.log(ev.value);
    this.formData.budget = ev.value;
    this.formData.projected_exposure = this.formData.duration * this.formData.budget /.18; 
    this.formData.projected_cost = this.formData.duration * this.formData.budget; 
  }


}
