import { AlertProvider } from './../alert/alert';
import { AuthProvider } from './../auth/auth';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from 'ionic-angular';

// let apiUrl = `https://www.friendmypet.com/Api/api.php?action=`;
// let apiUrl = `https://www.friendmypet.com/Api/stagingapi.php?action=`;
let apiUrl = `https://www.friendmypet.com/Api/api.php?action=`;
let tokenUrl= 'https://www.friendmypet.com/FMPWebAPI/token'
/*
    usefullData

*/
/***validation***/

const validation = {
  // "EMAIL": /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

  "EMAIL": /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

  "PHONE": /^[0-9]{10,14}$/,
  "DICNT":/^[0-99]{0,2}$/,
  "postal_code": /^[0-9\ ]{4,8}$/,
  "onlyAlpha":/^[a-zA-Z\s]*$/,
  // 'NINAME':/^\s*([0-9a-zA-Z]+)\s*$/,
  //"URL":/^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
  // "URL":/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/ || /^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,

  "URL":/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/,
  
  //"PASSW": /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  //"NPASS": /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,

//  "PASSW": /^[a-zA-Z0-9]{6,20}$/,
//   "NPASS": /^[a-zA-Z0-9]{6,20}$/,

  // "PASSW":/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,20}$/,
  //   "NPASS":/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,20}$/,

      "PASSW":/^.{6,20}$/, //^[.*\s]{6,20}$/,
      "NPASS":/^.{6,20}$/,


  "PARTICPTN":/^0*(?:[2-9]|[12]\d)\d*$/,
}




/*****************/
@Injectable()
export class RestApiProvider {
  localStorageUserKey = "yallaLanguage";
  constructor(
    public http: HttpClient, 
    public loadingCtrl: LoadingController, 
    public auth:AuthProvider,
    public alert:AlertProvider,
    public alertCtrl: AlertController) {
    console.log('Hello RestApiProvider Provider');
  }


  // presentAlert(message) {
  //
  //
  //
  //   let alert = this.alertCtrl.create({
  //     subTitle: 'GoFrakt',
  //     cssClass: 'simpleAlert',
  //     message: message,
  //     buttons: [{
  //     text:'Okay',
  //     cssClass:'cancel'
  //   }
  //     ]
  //   });
  //   alert.present();
  // }




  /***************************************************************************************************
  *******************************************POST DATA*************************************************
  ****************************************************************************************************/

  validation(data: any) {
    for (let key in data) {
      if (data[key].type != "NO") {
        
        if (data[key].value == null || data[key].value == "" || data[key].value === false || data[key].value.trim() == "") {
         this.alert.showEmptyMessage(data[key].type);
          return 0;
        }
        else if ((data["New_password"]&&(key == "confirmP" && (data[key].value != data["New_password"].value))) || (data["password"]&&(key == "confirmP" && (data[key].value != data["password"].value)) )) {
          console.log("pass not matached", data[key]);
        this.alert.showMessage(data[key].type);
          return 0;
        }      
        else {
          // || data[key].type == "NINAME"
          if (data[key].type == "EMAIL" || data[key].type == "PHONE" || data[key].type == "onlyAlpha" || data[key].type == "PASSW" || data[key].type == "NPASS" || data[key].type == "DICNT" 
          ) {
            if (!validation[data[key].type].test(data[key].value)) {
             this.alert.showMessage(data[key].type);
              return 0;
            }
          }
        }
      }

    }
    return 1;
  }

  validation2(data: any) {
    console.log('data-------------',data);
    for (let key in data) {
      if (data[key].type != "NO" && data[key].type != "IMAGE1") {
        if (data[key].value == null || data[key].value == "" || data[key].value === false) {
          this.alert.showEmptyMessage(data[key].type);
          return 0;
        }
        else if (key == "confirmP" && (data[key].value != data["New_password"].value)) {
          this.alert.showMessage(data[key].type);
          return 0;
        }
        else {
          // || data[key].type == "NINAME"
          if ( data[key].type == "DICNT" || data[key].type == "EMAIL" || data[key].type == "PHONE" || data[key].type == "onlyAlpha" || data[key].type == "PASSW" || data[key].type == "NPASS" || data[key].type == "HEADLINE") {
            if (!validation[data[key].type].test(data[key].value)) {
              this.alert.showMessage(data[key].type);
              return 0;
            }
          }
        }
      }

    }
    return 1;
  }



  generateFormData(data: any) {
    let input = new FormData();
    for (let key in data) {
      if (key !== "confirmP" && key !== "terms") {
        // if (data[key].name && data[key].value) {
        //   input.append(key, data[key].value, data[key].name);
        // } else {
        //   input.append(key, data[key].value);
        // }
        if (data[key].name && data[key].value) {
          input.append(key, data[key].value, data[key].name);
        } else {
          input.append(key, data[key].value);
        }
      }
    }
    return input;
  }

  //  generateFormData(data: any) {
  //   let input = new FormData();
  //   for (let key in data) {
  //     if (key !== "confirmP" && key !== "terms") {
  //       if ((data[key].type == "IMAGE" || data[key].type == "IMAGE1") && data[key].value) {
  //         input.append(key, data[key].value, data[key].name);
  //       } else {
  //         input.append(key, data[key].value);
  //       }
  //     }
  //   }
  //   return input;
  // }


  postData2(data: any, showMsg: number, url: string) {
    var token = this.auth.getUserToken();
    if(token){
      data['SessionAuthToke'] = {value:token,"type":"NO"};
    }
    const lang = JSON.parse(localStorage.getItem('PetAppLanguage'));
    data['lang'] = {value:lang,"type":"NO"};
    const loader = this.loadingCtrl.create({
      // content: "<img src='/assets/f2.gif'>",
      // spinner:'hide',
      cssClass: 'customloading'
    });
    loader.present();
    let valid = this.validation2(data);
    // valid=0;
    //let formdata=this.generateFormData(data);
    //console.log(formdata);
    if (valid != 0) {
      let formdata = this.generateFormData(data);
      let headers = new HttpHeaders({ "Accept": "application/json" });
      return new Promise((resolve, reject) => {
        this.http.post(apiUrl + url, formdata, { headers: headers })
          .toPromise()
          .then((response: any) => {
            if (showMsg) {
              this.alert.show("Alert!", response.responseMessage);

            }
            resolve(response);

            loader.dismiss();
          })
          .catch((error) => {
            this.alert.showMessage("TECHP");

            // alert(JSON.stringify(error));

            reject(error);
            loader.dismiss();

          });
      });
    }
    else {
      return new Promise((resolve, reject) => {
        loader.dismiss();
      })
    }
  }

  generateBodyData(data: any) {
    //let input = new FormData();
    let input = new URLSearchParams();
    for (let key in data) {
      if (key !== "confirmP" && key !== "terms") {
      
          input.set(key, data[key].value);
        
      }
    }
    return input.toString();
  }

  postDataWithAuth(data: any, url:string, token:string) {
    // var token = this.auth.getUserToken();
    // if(token){
    //   data['SessionAuthToke'] = {value:token,"type":"NO"};
    // }
    // const lang = JSON.parse(localStorage.getItem('PetAppLanguage'));
    // data['lang'] = {value:lang,"type":"NO"};
    const loader = this.loadingCtrl.create({
      // content: "<img src='/assets/f2.gif'>",
      // spinner:'hide',
      cssClass: 'customloading'
    });
    loader.present();
   let valid = this.validation(data);
    // valid=0;
    //let formdata=this.generateFormData(data);
    //console.log(formdata);
   // let valid=1;
   //{firstname:data.firstname.value,latname:data.lastname.value,password:data.password.value, email:data.email.value, Account_type:data.Account_type.value}
    if (valid != 0) {
     let body = this.generateFormData(data);
     // let body = this.generateBodyData(data);

  
      let headers = new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" ,
      Authorization:"" + token

    });
    
      // if(token){
        
      //   headers.set("Authorization",token);
      //   console.log("this is token",headers);
      // }
      return new Promise((resolve, reject) => {
        this.http.post(apiUrl+url , body, { headers: headers })
          .toPromise()
          .then((response: any) => {
            resolve(response);
            loader.dismiss();
          })
          .catch((error) => {
            reject(error);
            loader.dismiss();

          });
      });
    }
    else {
      return new Promise((resolve, reject) => {
        loader.dismiss();
      })
    }
  }


  postData(data: any, url:string) {
    var token = this.auth.getUserToken();
    if(token){
      data['SessionAuthToke'] = {value:token,"type":"NO"};
    }
    const lang = JSON.parse(localStorage.getItem('PetAppLanguage'));
    data['lang'] = {value:lang,"type":"NO"};

    const loader = this.loadingCtrl.create({
      // content: "<img src='/assets/f2.gif'>",
      // spinner:'hide',
      cssClass: 'customloading'
    });
    loader.present();
   let valid = this.validation(data);
    // valid=0;
    //let formdata=this.generateFormData(data);
    //console.log(formdata);
   // let valid=1;
   //{firstname:data.firstname.value,latname:data.lastname.value,password:data.password.value, email:data.email.value, Account_type:data.Account_type.value}
    if (valid != 0) {
     // let body = this.generateFormData(data);
     let body = this.generateBodyData(data);

  
      let headers = new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" 

    });
    
      // if(token){
        
      //   headers.set("Authorization",token);
      //   console.log("this is token",headers);
      // }
      return new Promise((resolve, reject) => {
        this.http.post(apiUrl+url , body, { headers: headers })
          .toPromise()
          .then((response: any) => {
            resolve(response);
            loader.dismiss();
          })
          .catch((error) => {
            reject(error);
            loader.dismiss();

          });
      });
    }
    else {
      return new Promise((resolve, reject) => {
        loader.dismiss();
      })
    }
  }

  postwithoutldr(data: any, url:string) {
    var token = this.auth.getUserToken();
    if(token){
      data['SessionAuthToke'] = {value:token,"type":"NO"};
    }
    const lang = JSON.parse(localStorage.getItem('PetAppLanguage'));
    data['lang'] = {value:lang,"type":"NO"};

    const loader = this.loadingCtrl.create({
      // content: "<img src='/assets/f2.gif'>",
      // spinner:'hide',
      cssClass: 'customloading'
    });
   // loader.present();
   let valid = this.validation(data);
    // valid=0;
    //let formdata=this.generateFormData(data);
    //console.log(formdata);
   // let valid=1;
   //{firstname:data.firstname.value,latname:data.lastname.value,password:data.password.value, email:data.email.value, Account_type:data.Account_type.value}
    if (valid != 0) {
     // let body = this.generateFormData(data);
     let body = this.generateBodyData(data);

  
      let headers = new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" 

    });
    
      // if(token){
        
      //   headers.set("Authorization",token);
      //   console.log("this is token",headers);
      // }
      return new Promise((resolve, reject) => {
        this.http.post(apiUrl+url , body, { headers: headers })
          .toPromise()
          .then((response: any) => {
            resolve(response);
            loader.dismiss();
          })
          .catch((error) => {
            reject(error);
            loader.dismiss();

          });
      });
    }
    else {
      return new Promise((resolve, reject) => {
        loader.dismiss();
      })
    }
  }



  login(data: any, url: string) {
    const lang = JSON.parse(localStorage.getItem('PetAppLanguage'));
    data['lang'] = {value:lang,"type":"NO"};

    const loader = this.loadingCtrl.create({
      // content: "<img src='/assets/f2.gif'>",
      // spinner:'hide',
      cssClass: 'customloading'
    });
    loader.present();
   let valid = this.validation(data);
    // valid=0;
    //let formdata=this.generateFormData(data);
    //console.log(formdata);
   // let valid=1;
   //{firstname:data.firstname.value,latname:data.lastname.value,password:data.password.value, email:data.email.value, Account_type:data.Account_type.value}
    if (valid != 0) {
     //let formdata = this.generateFormData(data);
     let body = this.generateBodyData(data);

  
      let headers = new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" 

    });
    
      // if(token){
        
      //   headers.set("Authorization",token);
      //   console.log("this is token",headers);
      // }
      return new Promise((resolve, reject) => {
        this.http.post(apiUrl+url , body, { headers: headers })
          .toPromise()
          .then((response: any) => {
            resolve(response);
            loader.dismiss();
          })
          .catch((error) => {
            reject(error);
            loader.dismiss();

          });
      });
    }
    else {
      return new Promise((resolve, reject) => {
        loader.dismiss();
      })
    }
  }



  /***************************************************************************************************
  *******************************************GET DATA*************************************************
  ****************************************************************************************************/

  getUrlFromData(data: any) {
    const lang = JSON.parse(localStorage.getItem('PetAppLanguage'));
    data['lang'] = {value:lang,"type":"NO"};

    let params = new HttpParams();

    for (let key in data) {
      params = params.append(key, data[key]);
    }
    return params;
  }

  get(data: any, spinner: any, url, token) {
    const lang = JSON.parse(localStorage.getItem('PetAppLanguage'));
    data['lang'] = {value:lang,"type":"NO"};
    const loader = this.loadingCtrl.create({
      //   content: "<img src='/assets/f2.gif'>",
      //     spinner:'hide',
      cssClass: 'customloading'
    });
    if (spinner == "1") {
      loader.present();
    }
    let params = this.getUrlFromData(data);
    let headers = new HttpHeaders(
                { 
                     "Content-Type": "application/x-www-form-urlencoded",
                     "Authorization": "" +token
              });

    return new Promise((resolve, reject) => {
      this.http.get(apiUrl+url , { params: params, headers:headers})
        .toPromise()
        .then((response) => {
          resolve(response);
          loader.dismiss();
        })
        .catch((error) => {
          reject(error);
          loader.dismiss();
        });
    });
  }


  
  getToken(data: any) {
    const loader = this.loadingCtrl.create({
      // content: "<img src='/assets/f2.gif'>",
      // spinner:'hide',
      cssClass: 'customloading'
    });
    loader.present();
   let valid = this.validation(data);
    // valid=0;
    //let formdata=this.generateFormData(data);
    //console.log(formdata);
   // let valid=1;
   //{firstname:data.firstname.value,latname:data.lastname.value,password:data.password.value, email:data.email.value, Account_type:data.Account_type.value}
    if (valid != 0) {
     //let formdata = this.generateFormData(data);
     let body = this.generateBodyData(data);
 
  
      let headers = new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" });
      return new Promise((resolve, reject) => {
        this.http.post(tokenUrl , body, { headers: headers })
          .toPromise()
          .then((response: any) => {
            resolve(response);
            loader.dismiss();
          })
          .catch((error) => {
            reject(error);
            loader.dismiss();

          });
      });
    }
    else {
      return new Promise((resolve, reject) => {
        loader.dismiss();
      })
    }
  }
  check() {
    return new Promise((resolve, reject) => {
      this.http.get(apiUrl, {})
        .toPromise()
        .then((response) => {
          resolve(response);

        })
        .catch((error) => {
          reject(error);

        });
    });
  }


  /***************************************************************************************************
*******************************************GET LANGUAGE DETAILS*************************************************
****************************************************************************************************/

  getUserLanguage() {
    let lang = JSON.parse(localStorage.getItem(this.localStorageUserKey));
    return lang;
  }

  updateUserLanguage(lang: any) {
    localStorage.setItem(this.localStorageUserKey, JSON.stringify(lang));
  }





  getCountries() {
    const loader = this.loadingCtrl.create({
      //   content: "<img src='/assets/f2.gif'>",
      //     spinner:'hide',
      cssClass: 'customloading'
    });
    
      loader.present();
    

    return new Promise((resolve, reject) => {
      this.http.get("countries.json", {  })
        .toPromise()
        .then((response) => {
          resolve(response);
          loader.dismiss();
        })
        .catch((error) => {
          reject(error);
          loader.dismiss();
        });
    });
  }


  getCurrentCountry(){
  
    let url ="http://www.geoplugin.net/json.gp";

  return new Promise((resolve, reject) => {
    this.http.get(url,{})
        .toPromise()
        .then((response:any) =>{
      
                resolve(response);

                 
              })
              .catch((error) =>{
           
              reject(error);
                 

      });
 });
  
}

getRates(CUR:string){
//  let url = "https://www.saareyrecords.com/Api/api.php?action=currency_convert&from=INR&tos=USD"
  let url ="https://free.currconv.com/api/v7/convert?q="+CUR+"_USD&compact=ultra&apiKey=8c42958d50b1d4eeafb0";

return new Promise((resolve, reject) => {
  this.http.get(url,{})
      .toPromise()

      .then((response:any) =>{
    
              resolve(response[CUR+"_USD"]);

               
            })
            .catch((error) =>{
         
            reject(error);
               

    });
});

}






}
