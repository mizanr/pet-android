import { Component } from '@angular/core';
import { Events, LoadingController, NavController, NavParams } from 'ionic-angular';
import { ImageProvider } from '../../providers/image/image';
import { File } from '@ionic-native/file';
import { VideoEditor, CreateThumbnailOptions } from '@ionic-native/video-editor';
import { DeviceDataProvider } from '../../providers/device-data/device-data';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the ImageGalleryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-image-gallery',
  templateUrl: 'image-gallery.html',
})
export class ImageGalleryPage {
  loader:any;
  all_data:any=new Array();
  sel_value:any;
  main_array: any = new Array();
  limit: any;
  constructor(public navCtrl: NavController, 
    public imageP: ImageProvider,
    public auth:AuthProvider,
    public loading:LoadingController,
    public file: File,
    public videoEditor:VideoEditor,    
    public events:Events,
    public deviceP:DeviceDataProvider,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // this.deviceP.getDeviceFiles('').then((data:any) => {
    //   this.main_array = data;
    //   this.all_data=data;
    // })
    this.get_Files(0,20);
    console.log('ionViewDidLoad ImageGalleryPage');
  }

  get_Files(inx: any, limit: any) {
    this.limit = limit;
    var array = [];
    this.deviceP.TwentySlotImageVideo(inx, limit).then((data: any) => {
      for (let i = 0; i < data.length; i++){
        let dot_val = data[i].name.substr(data[i].name.indexOf('.'));
        if (dot_val == '.jpg' || dot_val == '.png') {
          data[i]['thumb'] = (<any>window).Ionic.WebView.convertFileSrc(data[i].nativeURL);
          data[i]['type'] = 'Image';
          array.push(data[i]);              
        } else if (dot_val == '.mp4') {
          data[i]['type'] = 'Video';
          array.push(data[i]);
          // this.allData.push(array[i]);
        }
        if(i==array.length-1){
          this.generatethumbes(0);
        }
      }
        setTimeout(() => {
          this.generatethumbes(0);
        }, 10000);

        console.log('20 data----------', data);
        this.all_data = this.all_data.concat(array);
        console.log(this.all_data, '-----------------final data');
    })
   

    //   var array = [];
    // for (let i = inx; i < limit; i++){
    //     this.main_array[i]['isChecked'] = false;
    //     array.push(this.main_array[i]);
    //   }
    // this.all_data = this.all_data.concat(array);
    //   console.log('data-------',this.all_data);
  }

  generatethumbes(index){     
    if(index<this.all_data.length-1){

      if(this.all_data[index]['type']=='Video'&&!this.all_data[index].thumb){
        console.log("generat thumb",index, this.all_data[index]);
        this.thumbbyVideo(this.all_data[index].nativeURL,index).then((thumb)=>{
          if(thumb!=0){
            this.all_data[index]['tuhmb']=thumb;
            this.generatethumbes(index+1);
          }
          else{
            this.generatethumbes(index+1);
          }

        })
      }
      else{        
        this.generatethumbes(index+1);
      }
    }
    else {
      console.log('alldata with thumb',this.all_data);
    }
  }
  
  thumbbyVideo(filepath:any,inx:any) {
    return new Promise((resolve,reject) => {
      var option:CreateThumbnailOptions = 
      {
          fileUri:filepath,
          width:300,
          height:300, 
          atTime:1,
          outputFileName:"thumb_"+this.all_data[inx].name,
          quality:100 
        };

      this.videoEditor.createThumbnail(option).then(result=>{
      let thumb=(<any>window).Ionic.WebView.convertFileSrc(result);
      console.log('video_thumb-----successfully-------',thumb);
      resolve(thumb);
      }).catch(e=>{
      console.log('thumb error', e);
      resolve(0);
      });
    })
  }

  ionViewWillLeave() {
    console.log('leave page');
    for(let i=0;i<this.all_data.length;i++){
        this.all_data[i].isChecked=false;
    }
  }

  ImagebyCamera() {
    this.imageP.TakephotobyCamera().then((img:any) => {
      console.log(img);
      let blob=this.imageP.imgURItoBlob(img);
      let img_name=this.imageP.generateImageName('img.jpg');
      this.sel_value={type:'Image',thumb:img,name:img_name,file:blob,takecamera:1};
      this.navCtrl.pop();
        setTimeout(() => {
          this.events.publish('_backTo',this.sel_value);
        }, 200);
    })
  }

  select_img_video(val:any,inx:any){
    for(let i=0;i<this.all_data.length;i++){
      if(i==inx){
        this.all_data[inx].isChecked=true;
        this.sel_value=this.all_data[inx];
      } else {
        this.all_data[i].isChecked=false;
      }
    }
  }

  backtopost(){
    if(this.sel_value.type=='Video'){      
      this.imageP.getthumbblobImgVid(this.sel_value.nativeURL).then((data:any) => {
        console.log('get video data-----',data);
        this.sel_value.file=data.video.file;
        this.sel_value.video_val=data.video;
        this.sel_value.thumb_val=data.thumb;
        console.log('sel_vallue----',this.sel_value);
        this.navCtrl.pop();
          setTimeout(() => {
            this.events.publish('_backTo',this.sel_value);
          }, 200);
      })

    } else {
      this.deviceP.readAsBlobforImage(this.sel_value.nativeURL).then((data:any) => {
        this.sel_value.file=data.file;
        console.log('sel_vallue----',this.sel_value);
        this.navCtrl.pop();
        setTimeout(() => {
          this.events.publish('_backTo',this.sel_value);
        }, 200);
      })
    }    
  }

  doInfinite(infiniteScroll:any) {
    setTimeout(() => {
      var inx = this.limit + 1;
      var limit = this.limit + 20;
      this.get_Files(inx, limit);
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 2000);
  }  

}
