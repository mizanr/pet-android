import { Component } from '@angular/core';
import { Events, LoadingController, NavController, NavParams, ViewController } from 'ionic-angular';
import { DeviceDataProvider } from '../../providers/device-data/device-data';
import { ImageProvider } from '../../providers/image/image';

/**
 * Generated class for the ProfileGalleryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile-gallery',
  templateUrl: 'profile-gallery.html',
})
export class ProfileGalleryPage {
  all_data: any = new Array();
  sel_value: any;
  constructor(public navCtrl: NavController,
    public imageP:ImageProvider,
    public loading:LoadingController,
    public viewCtrl:ViewController,
    public events:Events,
    public deviceP:DeviceDataProvider,
    public navParams: NavParams) {
  }

  ImagebyCamera() {
    this.imageP.TakephotobyCameraForProfile().then((img:any) => {
      console.log(img);
      this.sel_value = { nativeURL: img };
      this.viewCtrl.dismiss(this.sel_value);
      // let blob=this.imageP.imgURItoBlob(img);
      // let img_name=this.imageP.generateImageName('img.jpg');
     // this.sel_value={type:'Image',thumb:img,name:img_name,file:blob,takecamera:1};
      // this.navCtrl.pop();
      //   setTimeout(() => {
      //     this.events.publish('_backTo',this.sel_value);
      //   }, 200);
    })
  }

  ionViewDidLoad() {
    this.deviceP.getDeviceFilesForProfile('').then((data:any) => {
      this.all_data = data;
      
      console.log('data-------',this.all_data);
    })
    console.log('ionViewDidLoad ProfileGalleryPage');
  }

  get_file(limit: any) {
   var demo_array = [];
    this.deviceP.getDeviceFilesForProfile('').then((data: any) => {
      
      for (let i = 0; i < limit; i++){
        demo_array.push(data[i]);
      }
      this.all_data = this.all_data.concate(demo_array);
      
      console.log('data-------',this.all_data);
    })
  }

  ionViewWillLeave() {
    console.log('leave page');
    for(let i=0;i<this.all_data.length;i++){
        this.all_data[i].isChecked=false;
    }
  }

  select_img_video(val:any,inx:any){
    for(let i=0;i<this.all_data.length;i++){
      if(i==inx){
        this.all_data[inx].isChecked=true;
        this.sel_value = this.all_data[inx];
        this.viewCtrl.dismiss(this.sel_value);
      } else {
        this.all_data[i].isChecked=false;
      }
    }
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
