import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Camera } from '@ionic-native/camera';
import { AlertController ,LoadingController} from 'ionic-angular';

import { FileTransfer } from '@ionic-native/file-transfer';
import { FileChooser } from '@ionic-native/file-chooser';
import { File,FileEntry} from '@ionic-native/file';
import { VideoEditor, CreateThumbnailOptions } from '@ionic-native/video-editor';
import { Crop } from '@ionic-native/crop';
import { RatioCrop, RatioCropOptions } from 'ionic-cordova-plugin-ratio-crop';
import { FilePath } from '@ionic-native/file-path';
/*
  Generated class for the ImageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImageProvider {
load:any;

private cropOptions: RatioCropOptions = {
  quality: 100,
  targetWidth: 1080,
  targetHeight: 1080,
  widthRatio: 2,
  heightRatio: 1
};

  constructor(
    public http: HttpClient,
    public camera: Camera,
    public alertCtrl: AlertController,
    public fileChooser:FileChooser,
    public file:File,
    public filePath:FilePath,
    private crop: Crop,
    private cropR: RatioCrop,
    public loading:LoadingController,
    private videoEditor: VideoEditor,
  ) {
    console.log('Hello ImageProvider Provider');
  }  


  squareCroper(img_path:any) {
    return new Promise((resolve,reject) => {
      this.crop.crop(img_path, {quality: 100})
      .then(
        newImage => {
          this.readAsBlob(newImage).then((val) => {
            resolve(val);
          })
        },
        error => {
            console.error('Error squareCroper image', error);
            reject(error);
        }
      );
    })
  }


  retegularCroper(img_path:any) {
    return new Promise((resolve,reject) => {
      this.cropR.ratioCrop(img_path, this.cropOptions)
      .then(
        newImage => {
          this.readAsBlob(newImage).then((val) => {
            resolve(val);
          })
        },
        error => {
            console.error('Error retegularCroper image', error);
            reject(error);
        }
      );
    })
  }


  getImageForCrop() {
    return new Promise((resolve, reject) => {
      if (Camera['installed']()) {

        this.alertCtrl.create({
          title: 'Set Photo',
          message: 'Do you want to take a photo or choose from your photo gallery?',
          buttons: [
            {
              text: 'Cancel',
              handler: data => { }
            },
            {
              text: 'Choose from Gallery',
              handler: () => {

               

                this.camera.getPicture({
                  quality: 100,
                  // destinationType : this.camera.DestinationType.FILE_URI,
                  sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
                  //encodingType: this.camera.EncodingType.JPEG,
                  targetHeight: 600,
                  targetWidth: 600,
                  saveToPhotoAlbum: false,
                  correctOrientation: true

                }).then((data) => {
                  this.retegularCroper(data).then((data) => {
                    resolve(data);
                  });
                }, (err) => {
                  reject('Unable to take photo: ' + err);
                })


              }
            },
            {
              text: 'Take Photo',
              handler: () => {

                this.camera.getPicture({
                  quality: 100,
                  //destinationType: this.camera.DestinationType.FILE_URI,
                  //encodingType: this.camera.EncodingType.JPEG,
                  targetHeight: 600,
                  targetWidth: 600,
                  saveToPhotoAlbum: false,
                  correctOrientation: true
                }).then((data) => {
                  this.retegularCroper(data).then((data) => {
                    resolve(data);
                  });
                  // resolve(data);
                }, (err) => {
                  reject('Unable to take photo: ' + err);
                })

              }
            }
          ]
        }).present();



      } else {
        var self = this;
        var file  = document.createElement("INPUT");
        file.setAttribute("type", "file");
        file.style.height="0px";
        file.style.visibility="hidden";
        file.click();
        file.onchange = function(ev:any){
          self.getWebImage(ev.target.files[0]).then((res:any)=>{
            resolve(res);            
          });
          }
      }
    });
  }

  getImageForCrop2() {
    return new Promise((resolve, reject) => {
      if (Camera['installed']()) {

        this.alertCtrl.create({
          title: 'Set Photo',
          message: 'Do you want to take a photo or choose from your photo gallery?',
          buttons: [
            {
              text: 'Cancel',
              handler: data => { }
            },
            {
              text: 'Choose from Gallery',
              handler: () => {

                this.camera.getPicture

                this.camera.getPicture({
                  quality: 100,
                  // destinationType : this.camera.DestinationType.FILE_URI,
                  sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
                  //encodingType: this.camera.EncodingType.JPEG,
                  targetHeight: 600,
                  targetWidth: 600,
                  saveToPhotoAlbum: false,
                  correctOrientation: true

                }).then((data) => {
                  this.squareCroper(data).then((data) => {
                    resolve(data);
                  });
                }, (err) => {
                  reject('Unable to take photo: ' + err);
                })


              }
            },
            {
              text: 'Take Photo',
              handler: () => {

                this.camera.getPicture({
                  quality: 100,
                  //destinationType: this.camera.DestinationType.FILE_URI,
                  //encodingType: this.camera.EncodingType.JPEG,
                  targetHeight: 600,
                  targetWidth: 600,
                  saveToPhotoAlbum: false,
                  correctOrientation: true
                }).then((data) => {
                  this.squareCroper(data).then((data) => {
                    resolve(data);
                  });
                  // resolve(data);
                }, (err) => {
                  reject('Unable to take photo: ' + err);
                })

              }
            }
          ]
        }).present();



      } else {
        var self = this;
        var file  = document.createElement("INPUT");
        file.setAttribute("type", "file");
        file.style.height="0px";
        file.style.visibility="hidden";
        file.click();
        file.onchange = function(ev:any){
          self.getWebImage(ev.target.files[0]).then((res:any)=>{
            resolve(res);            
          });
          }
      }
    });
  }

  getImage() {
    return new Promise((resolve, reject) => {
      if (Camera['installed']()) {

        this.alertCtrl.create({
          title: 'Set Photo',
          message: 'Do you want to take a photo or choose from your photo gallery?',
          buttons: [
            {
              text: 'Cancel',
              handler: data => { }
            },
            {
              text: 'Choose from Gallery',
              handler: () => {
                this.getVideoByGallery().then((data:any) => {
                  resolve(data);
                })
                // this.camera.getPicture
                // this.camera.getPicture({
                //   quality: 100,
                //   destinationType: this.camera.DestinationType.DATA_URL,
                //   sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
                //   encodingType: this.camera.EncodingType.JPEG,
                //   // mediaType:this.camera.MediaType.ALLMEDIA,
                //   targetHeight: 600,
                //   targetWidth: 600,
                //   saveToPhotoAlbum: false,
                //   correctOrientation: true

                // }).then((data) => {
                //   resolve('data:image/jpeg;base64,' + data);
                // }, (err) => {
                //   reject('Unable to take photo: ' + err);
                // })
              }
            },
            {
              text: 'Take Photo',
              handler: () => {

                this.camera.getPicture({
                  quality: 100,
                  destinationType: this.camera.DestinationType.FILE_URI,
                  // destinationType: this.camera.DestinationType.DATA_URL,
                  encodingType: this.camera.EncodingType.JPEG,
                  targetHeight: 600,
                  targetWidth: 600,
                  saveToPhotoAlbum: false,
                  correctOrientation: true
                }).then((data) => {
                  // resolve('data:image/jpeg;base64,' + data);
                  this.readAsBlob(data).then((res:any) => {
                    resolve(res);
                  })
                }, (err) => {
                  reject('Unable to take photo: ' + err);
                })

              }
            },
          ]
        }).present();



      } else {
        var self = this;
        var file  = document.createElement("INPUT");
        file.setAttribute("type", "file");
        file.style.height="0px";
        file.style.visibility="hidden";
        file.click();
        file.onchange = function(ev:any){
          self.getWebImage(ev.target.files[0]).then((res:any)=>{
            resolve(res);            
          });
          }
        }
    });
  }


  TakephotobyCamera() {
    return new Promise((resolve, reject) => {
      if (Camera['installed']()) {
        this.camera.getPicture({
          quality: 100,
          destinationType: this.camera.DestinationType.DATA_URL,
          encodingType: this.camera.EncodingType.JPEG,
          targetHeight: 600,
          targetWidth: 600,
          saveToPhotoAlbum: false,
          correctOrientation: true
        }).then((data) => {
          resolve('data:image/jpeg;base64,' + data);
        }, (err) => {
          reject('Unable to take photo: ' + err);
        })

      } else {
        var self = this;
        var file  = document.createElement("INPUT");
        file.setAttribute("type", "file");
        file.style.height="0px";
        file.style.visibility="hidden";
        file.click();
        file.onchange = function(ev:any){
          self.getWebImage(ev.target.files[0]).then((res:any)=>{
            resolve(res);            
          });
          }
        }
    });
  }

  TakephotobyCameraForProfile() {
    return new Promise((resolve, reject) => {
      if (Camera['installed']()) {
        this.camera.getPicture({
          quality: 100,
          //destinationType: this.camera.DestinationType.FILE_URI,
          //encodingType: this.camera.EncodingType.JPEG,
          targetHeight: 600,
          targetWidth: 600,
          saveToPhotoAlbum: false,
          correctOrientation: true
        }).then((data) => {
          // this.retegularCroper(data).then((data) => {
            resolve(data);
          // });
          // resolve(data);
        }, (err) => {
          reject('Unable to take photo: ' + err);
        })

      } else {
        var self = this;
        var file  = document.createElement("INPUT");
        file.setAttribute("type", "file");
        file.style.height="0px";
        file.style.visibility="hidden";
        file.click();
        file.onchange = function(ev:any){
          self.getWebImage(ev.target.files[0]).then((res:any)=>{
            resolve(res);            
          });
          }
        }
    });
  }



  // getImage() {
  //   return new Promise((resolve, reject) => {
  //     if (Camera['installed']()) {

  //       this.alertCtrl.create({
  //         title: 'Set Photo',
  //         message: 'Do you want to take a photo or choose from your photo gallery?',
  //         buttons: [
  //           {
  //             text: 'Cancel',
  //             handler: data => { }
  //           },
  //           {
  //             text: 'Choose from Gallery',
  //             handler: () => {
  //               this.camera.getPicture
  //               this.camera.getPicture({
  //                 quality: 100,
  //                 destinationType: this.camera.DestinationType.DATA_URL,
  //                 sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  //                 encodingType: this.camera.EncodingType.JPEG,
  //                 // mediaType:this.camera.MediaType.ALLMEDIA,
  //                 targetHeight: 600,
  //                 targetWidth: 600,
  //                 saveToPhotoAlbum: false,
  //                 correctOrientation: true

  //               }).then((data) => {
  //                 resolve('data:image/jpeg;base64,' + data);
  //               }, (err) => {
  //                 reject('Unable to take photo: ' + err);
  //               })


  //             }
  //           },
  //           {
  //             text: 'Take Photo',
  //             handler: () => {

  //               this.camera.getPicture({
  //                 quality: 100,
  //                 destinationType: this.camera.DestinationType.DATA_URL,
  //                 encodingType: this.camera.EncodingType.JPEG,
  //                 targetHeight: 600,
  //                 targetWidth: 600,
  //                 saveToPhotoAlbum: false,
  //                 correctOrientation: true
  //               }).then((data) => {
  //                 resolve('data:image/jpeg;base64,' + data);
  //               }, (err) => {
  //                 reject('Unable to take photo: ' + err);
  //               })

  //             }
  //           },
  //           // {
  //           //   text:'Video Upload',
  //           //   handler:() => {
  //           //     resolve('Video');
  //           //   }
  //           // }
  //         ]
  //       }).present();



  //     } else {
  //       var self = this;
  //       var file  = document.createElement("INPUT");
  //       file.setAttribute("type", "file");
  //       file.style.height="0px";
  //       file.style.visibility="hidden";
  //       file.click();
  //       file.onchange = function(ev:any){
  //         self.getWebImage(ev.target.files[0]).then((res:any)=>{
  //           resolve(res);            
  //         });
  //         }
  //       }
  //   });
  // }

  readVideoFile(file: any) {
    // this.readAsbase64(file);
    if(file.type == 'video/mp4'){
      // var ext;
      // var n = file.type.lastIndexOf('/');
      // var result = file.type.substring(n + 1);  
      // console.log('extion----',result);
      // ext = `.${result}`;

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const imgBlob = new Blob([reader.result], {
            type: file.type
          });

          let blobimageName = file.name;
          let videoBlob = imgBlob;

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


  b64toBlob(b64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 512;
    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }


  imgURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    console.log(mimeString);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
      type: mimeString
    });
  }


  getWebImage(imagefile: any) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = (readerEvent) => {
        let imageData = (readerEvent.target as any).result;
        resolve(imageData);
      };
      reader.readAsDataURL(imagefile);
    });

  }

  generateImageName(name) {
    let ext = this.getImageExt(name);
    return new Date().getTime() + '.' + ext;
  }

  getImageExt(name) {
    return name.substr(name.lastIndexOf('.') + 1);
  }

   getVideoByGallery(){
    console.log("media provider");
    return new Promise((resolve, reject) => {
      if (Camera['installed']()) {
        this.camera.getPicture({
          sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
          destinationType: this.camera.DestinationType.FILE_URI,
          mediaType:this.camera.MediaType.ALLMEDIA
      }).then(async (data) => {
        console.log('checking path for get video by gallery',data);
         if(data){

          if(data.includes("file://")){
            this.readAsBlob(data).then((res:any) => {
              resolve(res);
            })
          } else if(data.includes("content://")){
              this.filePath.resolveNativePath(data)
                .then(filePath => {
                      console.log('file path get-----',filePath);
                      if(filePath.includes("file://")){
                    this.readAsBlob(filePath).then((res:any) => {
                      resolve(res);
                    })
             } else {
                let d = filePath.includes("file://") ? filePath : "file://" + filePath;
                this.readAsBlob(d).then((res:any) => {
                  resolve(res);
                })
             }
                })
                .catch(err => console.log(err));
          } else {
         // let path = data.includes("file://") ? data : "file://" + data;
          let path = data.includes("file://") ? data : "file://" + data;
          console.log('checking path ',path);
          this.show();
          var filename = data.substr(data.lastIndexOf('/') + 1);
          var dirpath = data.substr(0, data.lastIndexOf('/') + 1);
          console.log('dirpath----',dirpath,'filename---',filename);
          dirpath = dirpath.includes("file://") ? dirpath : "file://" + dirpath;        
          this.readAsBlob(dirpath+filename).then((res:any)=>{
            if(res==0){
              this.hide();
              resolve(0);
            }
            else{
              console.log("get blob successfull",res);
              if(res.file.type=='video/mp4') {
                this.getThumbByVideo(path).then((thmb:any)=>{
                  this.hide();
                      if(thmb==0){
                        resolve(0);
                      }
                      else{
                        resolve({thumb:thmb,video:res});
                      }
                });
              } else {
                resolve(res);
              }              
            }
          });
          }

          

          
         }
         else{
           console.log('did not get any data');
           resolve(0);
         }
      }, (err) => {
        console.error('get error-----',err);
        resolve(0);
      })
      }
    });
  }

  getThumbByVideo(filepath){
    console.log('getThumbByVideo',filepath);
    return new Promise((resolve) => {
    var option:CreateThumbnailOptions = {fileUri:filepath,width:300, height:300, atTime:1, outputFileName: 'thumb', quality:100 };
    this.videoEditor.createThumbnail(option).then(result=>{
       let thumbpath=this.file.externalDataDirectory+"files/videos/thumb.jpg";
      //  thumbpath = thumbpath.includes("file://") ? thumbpath : "file://" + thumbpath;

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
          // console.log("blob.....",blob);
          let val = {
          name:file.name,
          file:blob,
          preview:(<any>window).Ionic.WebView.convertFileSrc(path),
          path:path,
        }
          resolve(val);
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

  show(){
    this.load = this.loading.create({
      content:''
    });
    this.load.present();
  }
  hide(){
    this.load.dismiss();
  }

  getthumbblobImgVid(data){
    return new Promise((resolve, reject) => {
        console.log('checking path for get video by gallery',data);
         if(data){
         // let path = data.includes("file://") ? data : "file://" + data;
          let path = data.includes("file://") ? data : "file://" + data;
          console.log('checking path ',path);
          this.show();
          var filename = data.substr(data.lastIndexOf('/') + 1);
          var dirpath = data.substr(0, data.lastIndexOf('/') + 1);
          console.log('dirpath----',dirpath,'filename---',filename);
          dirpath = dirpath.includes("file://") ? dirpath : "file://" + dirpath;        
          this.readAsBlob(dirpath+filename).then((res:any)=>{
            if(res==0){
              this.hide();
              resolve(0);
            }
            else{
              console.log("get blob successfull",res);
              if(res.file.type=='video/mp4') {
                this.getThumbByVideo(path).then((thmb:any)=>{
                  this.hide();
                      if(thmb==0){
                        resolve(0);
                      }
                      else{
                        resolve({thumb:thmb,video:res});
                      }
                });
              } else {
                resolve(res);
              }              
            }
          });
         }
         else{
           console.log('did not get any data');
           resolve(0);
         }
    });
  }

}
