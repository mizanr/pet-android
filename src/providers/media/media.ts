import { HttpClient } from '@angular/common/http';
import { ImageModalPage } from './../../pages/image-modal/image-modal';
import { Injectable } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { File, FileEntry } from '@ionic-native/file';
import { RatioCrop, RatioCropOptions } from 'ionic-cordova-plugin-ratio-crop';
import { CreateThumbnailOptions, VideoEditor } from '@ionic-native/video-editor';

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaProvider {

  private cropOptions: RatioCropOptions = {
    quality: 90,
    targetWidth: 1080,
    targetHeight: 1080,
    widthRatio: -1,
    heightRatio: -1   // 1 hegiht and 1 with square 
                      // 1 height and 2 withd retengale k liye
  };                  //
  constructor(
    // public http: HttpClient,
    public camera:Camera,
    public file:File,
    public videoEditor:VideoEditor,
    public crop:RatioCrop,
    public modal:ModalController
    ) {
    console.log('Hello ImageProvider Provider');
  }
/*
  crop = "" // if dont want to use cropper
  crop = square"
  crop = "cover"

*/
  selectImage(isOnlyImage,crop){
    return new Promise((resolve, reject) => {
          const modal = this.modal.create(ImageModalPage,{},{ cssClass: 'imagePickerModal', showBackdrop: true, enableBackdropDismiss: true });
          modal.onDidDismiss((res)=>{
            console.log("selected ",res);
            if(res=='camera'){
              this.getImageByCamera(crop).then((res)=>{
                resolve(res);
              });
            }
            else if(res=='gallery'){
              this.getImageByGallery(isOnlyImage,crop).then((res)=>{
                resolve(res);
              });
            }
            else{
                resolve(0);
            }
          })
          modal.present();
  });
  }





  getImageByCamera(crop){
    console.log("media provider");
    return new Promise((resolve, reject) => {
      if (Camera['installed']()) {
        this.camera.getPicture({
          quality: 100,
          destinationType: this.camera.DestinationType.FILE_URI,
          correctOrientation: true
          // allowEdit:true
      }).then((data) => {
        let path = data.includes('file://') ? data : 'file://' + data;
        if (crop == '') {
          this.readAsBlob(path).then((res11) => {
            if (res11 == 0) {
              // this.loading.hide();
              resolve(0);
            }
            else {
              res11['type'] = 'Image';
              resolve(res11);
              console.log("get blob successfull", res11);
             
            }
          });          
        } else if (crop == 'square') {
          this.crop_image(path,crop).then((cpath) => {
            if (cpath != 0) {
              this.readAsBlob(cpath).then((res11) => {
                if (res11 == 0) {
                  // this.loading.hide();
                  resolve(0);
                }
                else {
                  res11['type'] = 'Image';
                  resolve(res11);
                  console.log("get blob successfull", res11);
                 
                }
              });
            }
            else {
              resolve(0);
            }
          });
        } else if (crop == 'cover') {
          this.crop_image(path,crop).then((cpath) => {
            if (cpath != 0) {
              this.readAsBlob(cpath).then((res11) => {
                if (res11 == 0) {
                  // this.loading.hide();
                  resolve(0);
                }
                else {
                  res11['type'] = 'Image';
                  resolve(res11);
                  console.log("get blob successfull", res11);
                 
                }
              });
            }
            else {
              resolve(0);
            }
          });
        }
       



        // console.log('getting image by camera',data);
         //resolve('data:image/png;base64,' + data);
      }, (err) => {
        console.log('getting image by camera',err);
        reject('Unable to take photo: ' + err);
      })
      }
      else{
        this.getWebImage().then((res:any)=>{
               this.imgURItoBlob(res).then((blob:any)=>{
         console.log(blob);
         let name = this.generateImageName("hello.png"); 
         resolve({file:blob,name:name, preview:res}); 
        
   
       })
         
        })
 
      }
    });
  }


  
  getImageByGallery(isOnlyImage: boolean,crop:any) {
    let mediatype = (isOnlyImage == true) ? this.camera.MediaType.PICTURE : this.camera.MediaType.ALLMEDIA
    //true for only images and false for all media video/image
    console.log("media provider");
    return new Promise((resolve, reject) => {
      if (Camera['installed']()) {
        this.camera.getPicture({
          sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
          quality: 100,
          destinationType: this.camera.DestinationType.FILE_URI,
          correctOrientation: true,
          mediaType:mediatype//,
          // allowEdit:true
        }).then((data) => {
          console.log('data-------', data);
          let path = data.includes('file://') ? data : 'file://' + data;

          console.log('path-------', path);
          
          let m = path.lastIndexOf('.');
          console.log('m-------', m);
          
          let ext = path.substr(m + 1);
          
          console.log("extencion is", ext);

          console.log('img----------', path.includes('.jpg'), 'video----', path.includes('.mp4'));
          
          // if (ext.toLowerCase().findIndex('jpg') > -1 || ext.toLowerCase().findIndex('jpeg') > -1 || ext.toLowerCase().findIndex('png') > -1) {
          if (path.includes('.jpg') || path.includes('.jpeg') || path.includes('.png')) {
              

            if (crop == '') {
              this.readAsBlob(path).then((res)=>{
                if(res==0){
                 // this.loading.hide();
                  resolve(0);
                }
                else {
                  res['type']='Image';
                  resolve(res); 
                  console.log("get blob successfull",res);
                 
                }
              });
            } else if (crop == 'square') {
              this.crop_image(path,crop).then((cpath)=>{
                if(cpath!=0){
                  this.readAsBlob(cpath).then((res)=>{
                    if(res==0){
                     // this.loading.hide();
                      resolve(0);
                    }
                    else{
    
                      res['type']='Image';
                      resolve(res); 
                      console.log("get blob successfull",res);
                     
                    }
                  });
                }
                else{
                  resolve(0);
                }
              })
            } else if (crop == 'cover') {
              this.crop_image(path,crop).then((cpath)=>{
                if(cpath!=0){
                  this.readAsBlob(cpath).then((res)=>{
                    if(res==0){
                     // this.loading.hide();
                      resolve(0);
                    }
                    else{
    
                      res['type']='Image';
                      resolve(res); 
                      console.log("get blob successfull",res);
                     
                    }
                  });
                }
                else{
                  resolve(0);
                }
              })
            }
      }
      // else if(ext.toLowerCase().findIndex('mp4')>-1){
        else if(path.includes('.mp4')){
        this.readAsBlob(path).then((res)=>{
          if(res==0){
            resolve(0);
          }
          else{
            console.log("get blob successfull",res);
            this.getThumbByVideo(path).then((thmb:any)=>{
     
                  if(thmb==0){
                    resolve(0);
                  }
                  else{
                    resolve({
                      thumb: thmb,
                      video: res,
                      type: 'Video'
                    })
                  }

                    
            });
          }
        });
      }
      else{
        alert("unsupported file");
      }





     //   resolve('data:image/png;base64,' + data);
      }, (err) => {
        reject('Unable to take photo: ' + err);
      })
      }
      else{
        this.getWebImage().then((res:any)=>{
          this.imgURItoBlob(res).then((blob:any)=>{
    console.log(blob);
    let name = this.generateImageName("hello.jpg"); 
    resolve({file:blob,name:name,preview:res,type:"image"}); 
   

  })
    
   })
 
      }
    });
  }



  
  readAsBlob(path){
    return new Promise((resolve, reject) => {
      console.log(path);

    this.file.resolveLocalFilesystemUrl(path)
    .then(entry => {
      (<FileEntry>entry).file(file =>{
        const reader = new FileReader();
        reader.onloadend = () => {
          const blob = new Blob([reader.result], {
            type: file.type
          });
          console.log("blob.....",blob);
          resolve({
            name: file.name,
            file: blob,
            preview: (<any>window).Ionic.WebView.convertFileSrc(path),
            thumb: (<any>window).Ionic.WebView.convertFileSrc(path),
            path: path
          });
         // this.blob['name']=file.name;
         // this.blob['file']=blob;
        //  console.log("got blob file successfully", this.blob);
        };
        reader.readAsArrayBuffer(file);
      })



    })
    .catch(err => {
      console.log("localfilesytem resolve.....",err);
           resolve(0);
      });
    })
  }



    
  getWebImage(){
    return new Promise((resolve, reject) => {
      var file  = document.createElement("INPUT");
      file.setAttribute("type", "file");
      file.style.height="0px";
      file.style.visibility="hidden";
      file.click();
      file.onchange = function(ev:any){
      let reader = new FileReader();
      reader.onload = (readerEvent) => {
          let imageData = (readerEvent.target as any).result;
          resolve(imageData);
      };
      reader.readAsDataURL(ev.target.files[0]); 
      }
   
    });
  
  }

  generateImageName(name){
    let ext = this.getImageExt(name);
    return  new Date().getTime() + '.'+ext;
}

getImageExt(name){
  return name.substr(name.lastIndexOf('.') + 1);
}

  imgURItoBlob(dataURI) {
    return new Promise((resolve, reject) => {
    var binary = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    console.log(mimeString);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    resolve(new Blob([new Uint8Array(array)], {
          type: mimeString
        })); 
  });
}


  crop_image(path,crop) {
    if (crop == 'square') {
      this.cropOptions.widthRatio = 1;
      this.cropOptions.heightRatio = 1;
    } else if (crop == 'cover') {
      this.cropOptions.widthRatio = 2;
      this.cropOptions.heightRatio = 1;
    }
    
  return new Promise((resolve, reject) => {
  this.crop.ratioCrop(path,this.cropOptions)
  .then(
    newImage => {
      resolve(newImage);
    },
    error => {
      resolve(0);
    }
  );

  })
}


getThumbByVideo(filepath){
  console.log('getThumbByVideo',filepath);
  return new Promise((resolve) => {
  let fn='thumb-'+(new Date()).getTime();
  var option:CreateThumbnailOptions = {fileUri:filepath,width:300, height:300, atTime:1, outputFileName: fn, quality:50 };
  this.videoEditor.createThumbnail(option).then(result=>{
     let thumbpath=this.file.externalDataDirectory+"files/videos/"+fn+".jpg";
     this.readAsBlob(thumbpath).then((res)=>{
      if(res==0){
   
        resolve(0);
      }
      else{
        console.log("get blob successfull",res);
        resolve(res);;
      }
    });  
  }).catch(e=>{
    console.log('thumb error', e);
   resolve(0);
  });
  })
}


}
