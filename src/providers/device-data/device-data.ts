import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { File ,FileEntry} from '@ionic-native/file';
import { VideoEditor, CreateThumbnailOptions } from '@ionic-native/video-editor';
import { LoadingController } from 'ionic-angular';
/*
  Generated class for the DeviceDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DeviceDataProvider {
  loader:any;
  allData:any=new Array();
  profile_allData:any=new Array();

  constructor(public http: HttpClient,
    public loading:LoadingController,
    public videoEditor:VideoEditor,
    public file:File
    ) {
    console.log('Hello DeviceDataProvider Provider');
  }

// 'WhatsApp/Media/WhatsApp Images/'

  getDeviceFiles(path:any) {  
   // this.show();
    return new Promise ((resolve,reject) => {
     // console.log('funtion call-----',this.file.externalRootDirectory,path);      
      this.file.listDir(this.file.externalRootDirectory,path).
        then((entry:any) => {
         // console.log('get_image-----',entry);
          this.getallDevicedata(entry).then((arr:any) => {
            resolve(arr);
          });
      })
        .catch(err => {
          this.hide();
          reject(err);
           //console.log('Directory doesn\'t exist',err);
          });
    })
   
  }

  TwentySlotImageVideo(inx, limit) {
    var array = [];
    return new Promise((resolve, reject) => {
      for (let i = inx; i < limit; i++){
        // this.allData[i]['isChecked'] = false;
        array.push(this.allData[i]);
      }
      resolve(array);
    })
  }

  getallDevicedata(array:any){
    // var images_array:any=new Array();
    // var video_array:any=new Array();
    return new Promise((resolve,reject) => {
      for (let i = 0; i < array.length; i++){
        if (this.allData.length < 500) {
          if (array[i].isFile == true) {
            let dot_val = array[i].name.substr(array[i].name.indexOf('.'));
            if (dot_val == '.jpg' || dot_val == '.png' || dot_val == '.mp4') {
              this.allData.push(array[i]);           
            }
            } else { 
            if(array[i].name[0]!='.' && array[i].name!='Android' && array[i].name!='android'){
             this.getDeviceFiles(array[i].fullPath.substr(1));
              }
            }
        }
       
        
        // if(this.allData.length<500){
        // if(array[i].isFile==true){
        //   let dot_val=array[i].name.substr(array[i].name.indexOf('.'));
        //  // console.log('dot_val----',dot_val);
        //   if(dot_val=='.jpg' || dot_val=='.png'){
        //     array[i]['thumb']=(<any>window).Ionic.WebView.convertFileSrc(array[i].nativeURL);
        //     array[i]['type']='Image';
        //     this.allData.push(array[i]);           
            
        //   } else if(dot_val=='.mp4') {
        //     // array[i]['thumb']='';
        //     // array[i]['type']='Video';
        //     // this.allData.push(array[i]);            
        //       // array[i]['thumb']=this.getThumbByVideo(array[i].nativeURL,i);           
        //       array[i]['type']='Video';            
        //       this.allData.push(array[i]);                 
        //   }
        // } else {
        //  // this.hide();
        //  if(array[i].name[0]!='.' && array[i].name!='Android' && array[i].name!='android'){
        //   this.getDeviceFiles(array[i].fullPath.substr(1));
        //  }

        // }
          
        // }
        // if(i==array.length-1){
        //   this.generatethumbes(0);
        // }
      }
      // this.allData=images_array.concat(video_array);
      setTimeout(()=>{
        this.generatethumbes(0);
      },10000)
      resolve(this.allData);

      console.log('all data----',this.allData);
      this.hide();
    });   
  }


  // getallDevicedata_Backuup(array:any){
  //   // var images_array:any=new Array();
  //   // var video_array:any=new Array();
  //   return new Promise((resolve,reject) => {
  //     for(let i=0;i<array.length;i++){
  //       if(this.allData.length<500){
  //       if(array[i].isFile==true){
  //         let dot_val=array[i].name.substr(array[i].name.indexOf('.'));
  //        // console.log('dot_val----',dot_val);
  //         if(dot_val=='.jpg' || dot_val=='.png'){
  //           array[i]['thumb']=(<any>window).Ionic.WebView.convertFileSrc(array[i].nativeURL);
  //           array[i]['type']='Image';
  //           this.allData.push(array[i]);           
            
  //         } else if(dot_val=='.mp4') {
  //           // array[i]['thumb']='';
  //           // array[i]['type']='Video';
  //           // this.allData.push(array[i]);            
  //             // array[i]['thumb']=this.getThumbByVideo(array[i].nativeURL,i);           
  //             array[i]['type']='Video';
            
  //               this.allData.push(array[i]);
                     
  //         }
  //       } else {
  //        // this.hide();
  //        if(array[i].name[0]!='.' && array[i].name!='Android' && array[i].name!='android'){
  //         this.getDeviceFiles(array[i].fullPath.substr(1));
  //        }

  //       }
          
  //       }
  //       // if(i==array.length-1){
  //       //   this.generatethumbes(0);
  //       // }
  //     }
  //     // this.allData=images_array.concat(video_array);
  //     setTimeout(()=>{
  //       this.generatethumbes(0);
  //     },10000)
  //     resolve(this.allData);

  //     console.log('all data----',this.allData);
  //     this.hide();
  //   });   
  // }

  getDeviceFilesForProfile(path:any) {  
    // this.show();
     return new Promise ((resolve,reject) => {
      // console.log('funtion call-----',this.file.externalRootDirectory,path);      
       this.file.listDir(this.file.externalRootDirectory,path).
         then((entry:any) => {
          // console.log('get_image-----',entry);
           this.getallDevicedataForProfile(entry).then((arr:any) => {
             resolve(arr);
           });
       })
         .catch(err => {
           this.hide();
           reject(err);
            //console.log('Directory doesn\'t exist',err);
           });
     })
    
  }
  
  getallDevicedataForProfile(array:any){
    // var images_array:any=new Array();
    // var video_array:any=new Array();
    return new Promise((resolve,reject) => {
      for(let i=0;i<array.length;i++){
        if(this.profile_allData.length<500){
        if(array[i].isFile==true){
          let dot_val=array[i].name.substr(array[i].name.indexOf('.'));
         // console.log('dot_val----',dot_val);
          if(dot_val=='.jpg' || dot_val=='.png'){
            array[i]['thumb']=(<any>window).Ionic.WebView.convertFileSrc(array[i].nativeURL);
            array[i]['type']='Image';    
              this.profile_allData.push(array[i]);
          }
          // else if (dot_val == '.mp4') {
          //     // array[i]['type']='Video';            
          //     //   this.allData.push(array[i]);
                     
          // }
        } else {
         // this.hide();
         if(array[i].name[0]!='.' && array[i].name!='Android' && array[i].name!='android'){
          this.getDeviceFilesForProfile(array[i].fullPath.substr(1));
         }

        }          
        }
      }
      resolve(this.profile_allData);
      console.log('all data----',this.allData);
    });   
  }


  generatethumbes(index){     
      if(index<this.allData.length-1){
  
        if(this.allData[index]['type']=='Video'&&!this.allData[index].thumb){
          // console.log("generat thumb",index, this.allData[index]);
          this.thumbbyVideo(this.allData[index].nativeURL,index).then((thumb)=>{
            if(thumb!=0){
              this.allData[index]['thumb']=thumb;
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
      else{
        console.log('alldata with thumb',this.allData);//
      }

  }
  //check kar ise..ok build bana ke check kar ok 

  show(){
    // this.loader = this.loading.create({
    //   content:''
    // });
   // this.loader.present();
  }
  
  hide(){
  //  this.loader.dismiss();
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

  generateImageName(name) {
    let ext = this.getImageExt(name);
    return new Date().getTime() + '.' + ext;
  }

  getImageExt(name) {
    return name.substr(name.lastIndexOf('.') + 1);
  }

  readAsBlobforImage(path){
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
          //name:file.name,
          file:blob,
          //preview:(<any>window).Ionic.WebView.convertFileSrc(path),
          //path:path,
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

  readAsBlobforVideo(path){
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
          thumb:(<any>window).Ionic.WebView.convertFileSrc(path),
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

  getThumbByVideo(filepath:any,inx:any){
    return new Promise((resolve) => {
    let checkingdir = this.file.externalDataDirectory + "files/videos/";
    let filename = "thumb_"+this.allData[inx].name+".jpg"
    let thumb_nativeURL=checkingdir+filename;
    console.log('thumcheck********************',checkingdir,filename, checkingdir+filename);
    this.file.checkFile(checkingdir,filename).then((res)=>{
        console.log("checkthumb",res);
        if(res==true){
          let thumb=(<any>window).Ionic.WebView.convertFileSrc(checkingdir+filename);
          console.log('video_thumb-----already exist-----',thumb);
          resolve(thumb);
        } else {
          var option:CreateThumbnailOptions = 
            {
                fileUri:filepath,
                width:300,
                height:300, 
                atTime:1,
                outputFileName:"thumb_"+this.allData[inx].name,
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
        }
        
    }).catch((err)=>{
      console.log("checkthumberr",err);
      var option:CreateThumbnailOptions = 
      {
          fileUri:filepath,
          width:300,
          height:300, 
          atTime:1,
          outputFileName:"thumb_"+this.allData[inx].name,
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
    })
  }


  thumbbyVideo(filepath:any,inx:any) {
    return new Promise((resolve,reject) => {
      var option:CreateThumbnailOptions = 
      {
          fileUri:filepath,
          width:300,
          height:300, 
          atTime:1,
          outputFileName:"thumb_"+this.allData[inx].name,
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

}
