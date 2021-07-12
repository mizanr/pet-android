import { Component } from '@angular/core';
import { NavController, NavParams ,ViewController,ModalController, Events} from 'ionic-angular';

import { AuthProvider } from './../../providers/auth/auth';
import { AlertProvider } from './../../providers/alert/alert';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import { ImageProvider } from '../../providers/image/image';

import { FileTransfer } from '@ionic-native/file-transfer';
import { FileChooser } from '@ionic-native/file-chooser';
import { File,FileEntry} from '@ionic-native/file';
import {VideopreviewPage} from '../videopreview/videopreview';
import {ImageGalleryPage} from '../image-gallery/image-gallery';
import { MediaProvider } from '../../providers/media/media';
import { LangPipe } from '../../pipes/lang/lang';

/**
 * Generated class for the NewPostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-new-post',
  templateUrl: 'new-post.html',
})
export class NewPostPage {
//pet_id:any;
ownerInfo:any = '';
desc:any = '';

feedImage:any = '';
blob_feedimg:any = '';
blob_feedimgname:any = '';

blob_feedvideo:any = '';
blob_feedvideo_name:any = '';

file_type:any = null;
new_video:any;
upload_video:any = 0;
post_type:any;
pet_id:any;

  media_data: any = '';

  is_update: any;
  feed_id: any;

  update_data: any;

  constructor(public navCtrl: NavController,
  	public auth:AuthProvider,
    public rest_api:RestApiProvider,
    public viewCtrl:ViewController,
    public image:ImageProvider,
    public fileChooser:FileChooser,
    public file:File,
    public events: Events,
    public lang:LangPipe,
    public modal:ModalController,
    public alertP: AlertProvider,
    public mediaP:MediaProvider,
  	public navParams: NavParams) {
      this.post_type=navParams.data.post_type||1;
    this.pet_id = this.navParams.data.pet_id;
    
    this.is_update = navParams.data.is_update || 0;
    this.feed_id = navParams.data.feed_id;

    if (this.is_update == 1) {
      this.get_feed_data(this.feed_id);
    }

      console.log(this.pet_id);

  	this.ownerInfo = this.auth.getUserDetails();

    events.subscribe('_backTo',(data) => {
      if(data){
        console.log('post data---',data);
        this.media_data=data;
      }
    })
  }

  get_feed_data(feed_id:any) {
    let Data = {
      user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
      feed_id:{"value":feed_id,"type":"NO"},
    }
    this.rest_api.postData(Data,'get_feed_detail').then((result:any) => {
      console.log('result-------',result);
      if (result.status == 1) {
        this.update_data = result.feed;
        this.desc = this.update_data.description;
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewPostPage');
  }

  ionViewWillLeave(){
    //this.events.unsubscribe('_backTo');
  }

  getImage2() {
    // this.updatefile_deletefile();
    // this.navCtrl.push(ImageGalleryPage);
    this.mediaP.selectImage(false,'').then((res: any) => {
      console.log(res, '---------res');
      if (res != 0) {
        if (res.type == 'Image') {
          this.media_data = res;
        } else if (res.type == 'Video') {
          this.media_data = res;
        }
      }
    })
  }

  getImage(){
    this.deletefile();
	//this.blob_feedvideo = '';
	//this.blob_feedvideo_name = '';
	//this.file_type = null;

      // this.file_type = null;
      // this.blob_feedvideo = '';
      // this.blob_feedvideo_name = '';
      // this.new_video = '';
      // this.upload_video = 0;

       this.image.getImage().then((data:any) => {
         console.log('final fetch----',data);
          if(data.video){
            this.upload_video = 1;
            this.file_type = 'Video';  
            this.new_video = data;	         
          } else {
            this.file_type = 'Image';
            this.feedImage=data.preview;
            this.blob_feedimg=data.file;
            this.blob_feedimgname=data.name;
          }
        //  var file = this.image.imgURItoBlob(img);
        //  if(file.type == 'image/jpeg'){
        //  	this.feedImage = img;
        //  	this.blob_feedimg = file;
	      //    this.file_type = 'Image';
	      //    this.blob_feedimgname = this.image.generateImageName('img.jpg');
	      //    console.log('blob--',this.blob_feedimg,'name--',this.blob_feedimgname);
        //  } else {
        //  	this.alertP.show('Alert','Only jpg format Image accpected.');
        //  }
         
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
      this.new_video = '';
      this.upload_video = 0;
    }

    deletefile2() {
    	this.media_data='';
      this.file_type=null;
    }


    Add_feed() {
      if(this.media_data){
        var type = 'NO';
        this.file_type=this.media_data.type;
      } else {
        type = 'DES';
        this.file_type=null;
      }

    	let Data = {
    		user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},    		
    		description:{"value":this.desc.trim(),"type":type},
    		type:{"value":this.post_type,"type":"NO"},
    		file_type:{"value":this.file_type,"type":"NO"},
    	}

      if(this.post_type==2){
        Data['pet_id']={"value":this.pet_id,"type":"NO"};
        Data['posted_pet']={"value":this.pet_id,"type":"NO"};
      }

    	if(this.media_data.type=='Image'){
    		Data['image'] = {"value":this.media_data.file,"type":'NO',"name":this.media_data.name};
    	}

    	if(this.media_data.type=='Video'){
    		Data['image'] = {"value":this.media_data.video.file,"type":'NO',"name":this.media_data.video.name};
        Data['thumbnail'] = {"value":this.media_data.thumb.file,"name":this.media_data.thumb.name,"type":"NO"};
    	}
    	this.rest_api.postData2(Data,0,'add_feed_form').then((result:any) => {
    		console.log(result);
    		if(result.status == 1){
          this.alertP.showAsync(
            this.lang.transform('SUCCESS',[]), result.msg).then(() => {
    				this.viewCtrl.dismiss(true);
    			})
    		}
    	})
    }

    // Add_feed() {
    //   if(this.blob_feedimg || this.upload_video==1){
    //     var type = 'NO';
    //   } else {
    //     type = 'DES';
    //   }

    // 	let Data = {
    // 		user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
    		
    // 		description:{"value":this.desc.trim(),"type":type},
    // 		type:{"value":this.post_type,"type":"NO"},
    // 		file_type:{"value":this.file_type,"type":"NO"},
    // 	}

    //   if(this.post_type==2){
    //     Data['pet_id']={"value":this.pet_id,"type":"NO"};
    //     Data['posted_pet']={"value":this.pet_id,"type":"NO"};
    //   }

    // 	if(this.blob_feedimg){
    // 		Data['image'] = {"value":this.blob_feedimg,"type":'IMAGE1',"name":this.blob_feedimgname};
    // 	}

    // 	if(this.upload_video==1){
    // 		Data['image'] = {"value":this.new_video.video.file,"type":'IMAGE1',"name":this.new_video.video.name};
    //     Data['thumbnail'] = {"value":this.new_video.thumb.file,"name":this.new_video.thumb.name,"type":"NO"};
    // 	}

    // 	this.rest_api.postData2(Data,0,'add_feed_form').then((result:any) => {
    // 		console.log(result);
    // 		if(result.status == 1){
    // 			this.alertP.showAsync('Success',result.msg).then(() => {
    // 				this.viewCtrl.dismiss(true);
    // 			})
    // 		}
    // 	})
    // }



    close() {
    this.viewCtrl.dismiss();
  }

  new_video_thamb(){
      this.deletefile();
    this.image.getVideoByGallery().then((res:any) => {
      console.log(res);
      if(res != 0){
        this.upload_video = 1;
          this.file_type = 'Video';  
        this.new_video = res;
      }
    })
  }

  previewVideo_update() {
    const modal = this.modal.create(VideopreviewPage,{thumb:this.update_data.thumbnail, 
      video:this.update_data.image});
       modal.present();
  }

  previewVideo(res:any){
      console.log("select video",res);
      const modal = this.modal.create(VideopreviewPage,{thumb:this.media_data.video.thumb, 
        video:this.media_data.thumb.preview});
      modal.onDidDismiss((resa)=>{
        if(resa==true){
          // this.selectedVideoobj=res;
          // this.selectedVideo=res.video.path;
          // this.uploadVideo();t
        }
        else{
          // this.navCtrl.pop();
        }
      })
      modal.present();
  }
  
  updatefile_deletefile() {
    this.update_data.image = '';
    this.update_data.thumbnail = '';
    this.update_data.file_type = '';
  }

  update() {
    if(this.media_data){
      var type = 'NO';
      this.file_type=this.media_data.type;
    } else {
      type = 'DES';
      this.file_type=null;
    }

    let Data = {
      user_id: { "value": this.auth.getCurrentUserId(), "type": "NO" },
      feed_id:{"value":this.update_data.id,"type":"NO"},      
      description:{"value":this.desc.trim(),"type":type},
      type:{"value":this.post_type,"type":"NO"},
      file_type:{"value":this.file_type,"type":"NO"},
    }

    if(this.post_type==2){
      Data['pet_id']={"value":this.pet_id,"type":"NO"};
      Data['posted_pet']={"value":this.pet_id,"type":"NO"};
    }

    // if(this.media_data.type=='Image'){
    //   Data['image'] = {"value":this.media_data.file,"type":'NO',"name":this.media_data.name};
    // }

    // if(this.media_data.type=='Video'){
    //   Data['image'] = {"value":this.media_data.file,"type":'NO',"name":this.media_data.name};
    //   Data['thumbnail'] = {"value":this.media_data.thumb_val.file,"name":this.media_data.thumb_val.name,"type":"NO"};
    // }

    if(this.media_data.type=='Image'){
      Data['image'] = {"value":this.media_data.file,"type":'NO',"name":this.media_data.name};
    }

    if(this.media_data.type=='Video'){
      Data['image'] = {"value":this.media_data.video.file,"type":'NO',"name":this.media_data.video.name};
      Data['thumbnail'] = {"value":this.media_data.thumb.file,"name":this.media_data.thumb.name,"type":"NO"};
    }

    this.rest_api.postData2(Data,0,'edit_feed_form').then((result:any) => {
      console.log(result);
      if(result.status == 1){
        this.alertP.showAsync(
          this.lang.transform('SUCCESS',[]), result.msg).then(() => {
          this.viewCtrl.dismiss(true);
        })
      }
    })
  }


}


