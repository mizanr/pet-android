import { Component } from '@angular/core';
import { NavController, NavParams ,ViewController,ModalController} from 'ionic-angular';
import { NotificationsPage } from '../notifications/notifications';
import { AuthProvider } from './../../providers/auth/auth';
import { AlertProvider } from './../../providers/alert/alert';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import { ImageProvider } from '../../providers/image/image';

import { FileTransfer } from '@ionic-native/file-transfer';
import { FileChooser } from '@ionic-native/file-chooser';
import { File,FileEntry} from '@ionic-native/file';
import {VideopreviewPage} from '../videopreview/videopreview';


/**
 * Generated class for the CreatFeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-creat-feed',
  templateUrl: 'creat-feed.html',
})
export class CreatFeedPage {
pet_id:any;
petInfo:any = '';
desc:any = '';

feedImage:any = '';
blob_feedimg:any = '';
blob_feedimgname:any = '';

blob_feedvideo:any = '';
blob_feedvideo_name:any = '';

file_type:any = null;
upload_video:any = 0;
new_video:any;

  constructor(public navCtrl: NavController,
  	public auth:AuthProvider,
    public rest_api:RestApiProvider,
    public viewCtrl:ViewController,
    public image:ImageProvider,
    public fileChooser:FileChooser,
    public file:File,
    public modal:ModalController,
    public alertP:AlertProvider, 
  	public navParams: NavParams) {

  	this.pet_id = this.navParams.get('pet_id');
  	this.get_petprofile(this.pet_id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatFeedPage');
  }

  get_petprofile(pet_id:any) {
    let Data = {
      id:{"value":pet_id,"type":"NO"},
      start:{"value":10,"type":"NO"},
      limit:{"value":0,"type":"NO"},
      user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
      login_user:{"value":this.auth.getCurrentUserId(),"type":"NO"},

    }
    this.rest_api.postData(Data,'get_pet_profile').then((result:any) => {
      console.log(result);
      if(result.status == 1){
        this.petInfo = result.pet_data;
      }
    })
  }

  notification() {
    this.navCtrl.push(NotificationsPage)
}

close() {
  this.viewCtrl.dismiss();
}

getImage(){

	    this.file_type = null;
      this.blob_feedvideo = '';
      this.blob_feedvideo_name = '';
      this.new_video = '';
      this.upload_video = 0;

       this.image.getImage().then((img:any) => {
         var file = this.image.imgURItoBlob(img);
         if(file.type == 'image/jpeg'){
         	this.feedImage = img;
         	this.blob_feedimg = file;
	         this.file_type = 'Image';
	         this.blob_feedimgname = this.image.generateImageName('img.jpg');
	         console.log('blob--',this.blob_feedimg,'name--',this.blob_feedimgname);
         } else {
         	this.alertP.show('Alert','Only jpg formate Image accpected.');
         }
         
       })
    }

    get_video() {
    	this.file_type = null;
    	this.feedImage = '';
    	this.blob_feedimg = '';
    	this.blob_feedimgname = '';

    this.fileChooser.open()
          .then(uri => {
            // resolve(uri);
            let videoId = uri;
           // console.log("Video URI ",videoId);
            this.file.resolveLocalFilesystemUrl(videoId)
            .then(entry => {                
              (<FileEntry>entry).file(file => this.readVideoFile(file))
            })
            .catch(err => {               
            });
         },err => {
          // reject(err);
         })
          .catch(e => console.log(e));
  }

  readVideoFile(file: any) {
    if(file.type == 'video/mp4'){
      var ext;
      var n = file.type.lastIndexOf('/');
      var result = file.type.substring(n + 1);  
      console.log('extion----',result);
      ext = `.${result}`;

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const vid_Blob = new Blob([reader.result], {
            type: file.type
          });

          let blobvideoName = file.name;
          let videoBlob = vid_Blob;

          this.blob_feedvideo = videoBlob;
          this.blob_feedvideo_name = this.createFileName(ext);
          this.file_type = 'Video';

          let videoObj = {
            blob: videoBlob,
            type:file.type
          }
          resolve(videoObj);
        };
        reader.readAsArrayBuffer(file);
       });
    
      } else {
        alert('Please choose only video file.');
      }
     
   }

   createFileName(ext:any) {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ext;
    return newFileName;
  }

    deletefile() {
    	this.file_type = null;
    	this.feedImage = '';
    	this.blob_feedimg = '';
    	this.blob_feedimgname = '';
    	this.blob_feedvideo = '';
    	this.blob_feedvideo_name = '';
      this.upload_video = 0;
      this.new_video = '';
    }

  

    Add_feed() {

      if(this.blob_feedimg || this.upload_video==1){
        var type = 'NO';
      } else {
        type = 'DES';
      }
      
    	let Data = {
    		user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
    		pet_id:{"value":this.petInfo.id,"type":"NO"},
    		posted_pet:{"value":this.petInfo.id,"type":"NO"},
    		description:{"value":this.desc.trim(),"type":type},
    		type:{"value":2,"type":"NO"},
    		file_type:{"value":this.file_type,"type":"NO"},
    	}

    	if(this.blob_feedimg){
    		Data['image'] = {"value":this.blob_feedimg,"type":'IMAGE1',name:this.blob_feedimgname}
    	}

    	if(this.upload_video==1){
        Data['image'] = {"value":this.new_video.video.file,"type":'IMAGE1',"name":this.new_video.video.name};
        Data['thumbnail'] = {"value":this.new_video.thumb.file,"name":this.new_video.thumb.name,"type":"NO"};
      }

    	this.rest_api.postData2(Data,0,'add_feed_form').then((result:any) => {
    		console.log(result);
    		if(result.status == 1){
    			this.alertP.showAsync('Success',result.msg).then(() => {
    				this.viewCtrl.dismiss(true);
    			})
    		}
    	})
    }

    new_video_thamb(){
      this.file_type = null;
      this.feedImage = '';
      this.blob_feedimg = '';
      this.blob_feedimgname = '';
    this.image.getVideoByGallery().then((res:any) => {
      console.log(res);
      if(res != 0){
        this.upload_video = 1;
          this.file_type = 'Video';  
        this.new_video = res;
      }
    })
  }

  previewVideo(res:any){
      console.log("select video",res);
      const modal = this.modal.create(VideopreviewPage,{thumb:res.thumb.preview, video:res.video.preview});
      modal.onDidDismiss((resa)=>{
        if(resa==true){
          // this.selectedVideoobj=res;
          // this.selectedVideo=res.video.path;
          // this.uploadVideo();
        }
        else{
          // this.navCtrl.pop();
        }
      })
      modal.present();
   }

}
