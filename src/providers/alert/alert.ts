import { AuthProvider } from './../auth/auth';

import { Injectable } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';
// import { RestApiProvider } from '../../providers/rest-api/rest-api';

const messages = {
  "en":{
    "NINAME": {title: 'Nick Name!', subTitle: 'Enter valid nick name special character & space not allowed.', empty: "Please enter nick name!"},
    
    "FNAME": {title: 'Username!', subTitle: 'Enter valid first name', empty: "Please enter first name!"},
    "FUNAME": {title: 'Fullname!', subTitle: 'Enter valid full name', empty: "Please enter full name!"},
    "LNAME": {title: 'Username!', subTitle: 'Enter valid email or username', empty: "Please enter last name!"},


    "PASSW": { title: 'Invalid Password!', subTitle: 'Your password must contain a minmum 6 and maximum 20 characters!', empty: "Please enter password!" }, 

    "CONFP": {title: 'Invalid Password!', subTitle: 'New password and confirm password should be match!', empty: "Please retype  password!"},
    "NCONFP":{title: 'Invalid Password!', subTitle: 'New password and confirm password should be match!', empty: "Please retype  password!"},
    "CPASS": {title: 'Password!', subTitle: '', empty: "Please enter your current password!"},


    "NPASS": { title: 'Invalid Password!', subTitle: 'New password must contain a minmum 6 and maximum 20 characters!!', empty: "Please enter new password!" },

    "EMAIL": {title: 'Email!', subTitle: 'Enter valid Email', empty: "Please enter your email id!"},
    "USRNM": {title: 'Username!', subTitle: 'Enter valid username', empty: "Please enter your username!"},
    "GENDR": {title: 'Gender!', subTitle: '', empty: "Please Select gender!"},
    "DOBTH": {title: 'Date of Birth!', subTitle: '', empty: "Please select your DOB!"},
    "OTP": {title: 'OTP', subTitle: '', empty: "Please enter otp!"},
    "MSG": {title: 'Message', subTitle: '', empty: "Please enter text message!"},
    "DUR": {title: 'Invalid', subTitle: '', empty: "Please fill all time!"},


    "ADDRS": {title: 'Address!', subTitle: '', empty: "Please enter your address!"},
    "CITY": {title: 'City!', subTitle: '', empty: "Please enter your city!"},
    "STATE": {title: 'State!', subTitle: '', empty: "Please enter your state!"},
    "COUNTRY": {title: 'Country!', subTitle: '', empty: "Please enter your country!"},
    "ZIPCODE": {title: 'Zip Code!', subTitle: '', empty: "Please enter zip code!"},
    "PHONE": {title: 'Phone!', subTitle: 'Please enter valid mobile number', empty: "Please enter your mobile number!"},

    "TECHP": { title: 'Technical Problem!', subTitle: 'Technical Problem, Please check your network connection!', empty: "" },

    "RAC": {title: 'Invalid Race!', subTitle: '', empty: "Please select race!"},
    "BRD": {title: 'Invalid Breed!', subTitle: '', empty: "Please select breed!"},
    "COAT": {title: 'Invalid Coat!', subTitle: '', empty: "Please select coat!"},
    "COLR": {title: 'Invalid Color!', subTitle: '', empty: "Please select color!"},
    "BEHAV": {title: 'Invalid Behavior!', subTitle: '', empty: "Please select behavior!"},
    "SZE": {title: 'Invalid Size!', subTitle: '', empty: "Please select size!"},
    "PNAME": {title: 'Invalid Pet Name!', subTitle: '', empty: "Please enter pet name!"},
    "SUB": {title: 'Invalid Subject!', subTitle: '', empty: "Please enter your subject!"},
    "DES": {title: 'Invalid Description!', subTitle: '', empty: "Please enter description!"},
    
    "PROD": {title: 'Invalid Product Name!', subTitle: '', empty: "Please enter product name!"},
    "CATE": {title: 'Invalid Category!', subTitle: '', empty: "Please select category!"},
    "PRICE": {title: 'Invalid Price!', subTitle: '', empty: "Please enter price!"},
    "DICNT": {title: 'Invalid Discount!', subTitle: 'Discount can not be less than 0 or can not be more than 100.', empty: "Please enter discount!"},
    "URL": {title: 'Invalid URL!', subTitle: 'Please enter valid URL', empty: "Please enter website Url!"},
    "CNAME": {title: 'Invalid Company Name!', subTitle: '', empty: "Please enter company name!"},
    "POC": {title: 'Invalid Contact!', subTitle: '', empty: "Please enter contact!"},
    "SNAME": {title: 'Invalid Service Name!', subTitle: '', empty: "Please enter service name!"},
    "SPONSOR": {title: 'Invalid Sponsor!', subTitle: '', empty: "Please enter sponsor name!"},
    "WEBSITE": {title: 'Invalid Web Address!', subTitle: '', empty: "Please enter your web address!"},
    "TITLE": {title: 'Invalid Title!', subTitle: '', empty: "Please enter your title!"},

  },
  "es":{
    "NINAME": {title: 'Apodo!', subTitle: ' Entre un apodo valido spacios no son permitidos.', empty: " Por favor provea el apodo!"},
    
    "FNAME": {title: 'Usuario!', subTitle: 'Entre un nombre valido', empty: "Entre su nombre!"},
    "FUNAME": {title: 'Nombre Completo!', subTitle: ' Entre un nombre completo valido', empty: "Por favor entre su nombre completo!"},
    "LNAME": {title: 'Usuario!', subTitle: ' Entre un Email or apellido valido', empty: "Por favor provea su apellido!"},


    "PASSW": { title: 'Clave Invalida!', subTitle: ' La clave debe tener un minimo de 6 a 20 caracters!', empty: "Por favor entre la clave!" }, 

    "CONFP": {title: 'Clave Invalida!', subTitle: 'La nueva Clave y la de confirmacion deben ser iguales!', empty: "Vuela a entrar la clave!"},
    "NCONFP":{title: 'Clave Invalida!', subTitle: ' La nueva Clave y la de confirmacion deben ser iguales!', empty: "Vuela a entrar la clave!"},
    "CPASS": {title: 'Clave!', subTitle: '', empty: " Por favor entre la clave actual!"},

    "NPASS": { title: 'Clave Invalida!', subTitle: ' La clave debe tener un minimo de 6 a 20 caracters!!', empty: " Por favor entre la clave!" },

    "EMAIL": {title: 'Email!', subTitle: ' Provea un Email valido', empty: " Por favor prevea un email de indentificacion!"},
    "USRNM": {title: 'Nombre de Usuario!', subTitle: 'Provea un nombre de Usuario valido', empty: " Por favor prevea el nombre de Usuario!"},
    "GENDR": {title: 'Genero!', subTitle: '', empty: "Por favor seleccione su genero!"},
    "DOBTH": {title: 'Fecha de Nacimiento!', subTitle: '', empty: " Por favor proveea su fecha de nacimiento!"},
    "OTP": {title: 'CDA', subTitle: '', empty: "Por favor prevea su codigo de activacion!"},
    "MSG": {title: 'Mensaje', subTitle: '', empty: "Por favor provea un mensaje de texto!"},
    "DUR": {title: 'Invalido', subTitle: '', empty: " Por favor prevea el tiempo!"},




    "ADDRS": {title: 'Direccion!', subTitle: '', empty: "Por favor provea su direccion!"},
    "CITY": {title: 'Ciudad!', subTitle: '', empty: "Por favor provea la ciudad!"},
    "STATE": {title: 'Stado!', subTitle: '', empty: "Por favor provea la provincia or estado!"},
    "COUNTRY": {title: 'Pais!', subTitle: '', empty: " Por favor provea pais done reside!"},
    "ZIPCODE": {title: 'Zona Postal!', subTitle: '', empty: "Por favor prevea su zona postal!"},
    "PHONE": {title: 'Telefono!', subTitle: 'Introduzca un número de móvil válido', empty: "Por favor prevea su numero de telefono!"},
    // "EMAIL": {title: 'Invalid Password!', subTitle: 'Enter valid Email', empty: "Please enter your registered email id!"}

    // "EMAIL": {title: 'Invalid Password!', subTitle: 'Enter valid Email', empty: "Please enter your registered email id!"}
    "TECHP": { title: 'Problemas Tecnicos!', subTitle: 'Problemas tecnicos, Por favor verifique su conneccion de Internet!', empty: "" },

    "RAC": {title: 'Raza Invalido!', subTitle: '', empty: "Por favor selecciones la raza!"},
    "BRD": {title: 'Especie Invalida!', subTitle: '', empty: " Por favor seleccione la especie!"},
    "COAT": {title: 'Pelaje Invalido!', subTitle: '', empty: " Por favor seleccione el pelaje de su mascota!"},
    "COLR": {title: 'Color Invalido!', subTitle: '', empty: "Por favor seleccione el color de su mascota!"},
    "BEHAV": {title: 'Personalidad Invalida!', subTitle: '', empty: "Por favor selecione un personalidad!"},
    "SZE": {title: 'Tamaño Invalido!', subTitle: '', empty: "Por favor seleccione el tamaño de su mascota!"},
    "PNAME": {title: 'Nombre Invalido!', subTitle: '', empty: "Por favor provea el nombre de sus mascota!"},
    "SUB": {title: 'Sujeto Invalido!', subTitle: '', empty: "Por favor provea un sujeto o tema!"},
    "DES": {title: 'Descripcion Invalida!', subTitle: '', empty: " Por favor prevea una descripcion!"},
    
    "PROD": {title: 'Producto Invalido!', subTitle: '', empty: " Por favor provea el nombre del producto!"},
    "CATE": {title: 'Categoria Invalida!', subTitle: '', empty: " Por favor prevea una categoria!"},
    "PRICE": {title: 'Precio Invalido!', subTitle: '', empty: "Por favor prevea un precio!"},
    "DICNT": {title: 'Descuento Invalido!', subTitle: 'El porciento del descuento no puede ser meno de 0 o major de 100, Por favor entre la cantidad de descuento!.', empty: "Por favor ingrese el descuento!"},
    "URL": {title: 'URL Invalido!', subTitle: 'Por favor entre un URL Valido', empty: " Por favor entre un URL correcto!"},
    "CNAME": {title: 'Empresa Invalida!', subTitle: '', empty: " Por favor prevea un nombre valido!"},
    "POC": {title: 'Contacto Invalido!', subTitle: '', empty: "Por favor provea el nombre del contacto!"},
    "SNAME": {title: 'Servicio Invalido!', subTitle: '', empty: " Por favor provea el nombre del servicio!"},
    "SPONSOR": {title: 'Patrocinador Invalido!', subTitle: '', empty: "Por favor prevea el nombre del patrocinador!"},
    "WEBSITE": {title: 'Direccion de Web Invalida!', subTitle: '', empty: "Por favor provea la direccion de Web!"},
    "TITLE": {title: 'Titulo invalido!', subTitle: '', empty: "Por favor prevea el Titulo!"},
  },



  "EMAIL": {
    title: 'Invalid Email!', subTitle: 'Your Email is invalid please enter valid email', empty: "Please enter your email!"
  },
  "FNAME": {
    title: 'Invalid Name!', subTitle: 'Please enter valid first name!', empty: "Please enter your first name!"
    
  },
  "LNAME": {
    title: 'Invalid Name!', subTitle: 'Please enter valid last name!', empty: "Please enter your last name!"
  },
  "PHONE": {
    title: 'Invalid Phone!', subTitle: 'Your phone number is invalid. Please enter valid phone number', empty: "Please enter your phone number!"
  },
  "PASSW": {
    title: 'Invalid Password!', subTitle: 'Password is invalid', empty: "Please enter password!"
  },
  "CPASS": {
    title: 'Invalid Password!', subTitle: 'Password is invalid', empty: "Please enter current password!" 
  },
  "NPASS": {
    title: 'Invalid Password!', subTitle: 'Password is invalid', empty: "Please enter new password!"
  },  

  "DOBTH": {
    title: 'Select DOB!', subTitle: 'Your Email is invalid please enter valid email', empty: "Please select your DOB!"
  },
  "GENDR": {
    title: 'Select Gender!', subTitle: 'Your Email is invalid please enter valid email', empty: "Please select your gender!",
  },
  "IMAGE": {
    title: 'Select Image!', subTitle: 'Please Select Profile Image', empty: "Please select your Profile image!",
  },
  "ADDRS": {
    title: 'Invalid Address!', subTitle: 'Please ', empty: "Please enter your Address!"  
  },
  "FILLP": {
    title: 'Invalid Input!', subTitle: 'Please fill all field properly', empty: "Please enter your Address!"  
  },
  "GDESC": {
    title: 'Invalid Description!', subTitle: 'Please fill all field properly', empty: "Please write description for your group!"  
  },
  

  "TECHP": {
    title: 'Technical Problem!', subTitle: 'Technical Problem, Please check your network connection!', empty: "",
    titleA: "مشكلة فنية!", subTitleA: "مشكلة فنية ، يرجى التحقق من اتصال الشبكة الخاص بك!", emptyA: ""
  },
  "AGE": {
    title: 'Select Age!', subTitle: 'Please select your Age!', empty: "Please select your Age!",
    titleA: "اختر العمر", subTitleA: "يرجى اختيار عمرك!", emptyA: "يرجى اختيار عمرك!"
  },
  "SDAT": {
    title: 'Select Start Date!', subTitle: 'Date is invalid', empty: "Please selct start date!",
    titleA: "اختر تاريخ البدء", subTitleA: "Date is invalid", emptyA: "يرجى تحديد تاريخ البدء!"
  },
  "EDAT": {
    title: 'Select End Date!', subTitle: 'Date is invalid', empty: "Please select end date!",
    titleA: "حدد تاريخ الانتهاء!", subTitleA: "Date is invalid", emptyA: "يرجى تحديد تاريخ الانتهاء!"
  },
  "KWRD": {
    title: 'Invalid Keyword!', subTitle: 'Keyword is invalid', empty: "Please enter keyword!",
    titleA: "كلمة رئيسية غير صالحة!", subTitleA: "الكلمة الرئيسية غير صالحة", emptyA: "من فضلك ادخل الكلمة"
  },
  "DST": {
    title: 'Invalid Destination!', subTitle: 'Password is invalid', empty: "Please enter destination!",
    titleA: "!وجهة غير صالحة", subTitleA: "كلمة المرور غير صالحة", emptyA: "!الرجاء إدخال الوجهة"
  },
  "AGNCY": {
    title: 'Invalid Agency!', subTitle: 'Password is invalid', empty: "Please select agency!",
    titleA: "!وكالة غير صالحة", subTitleA: "Password is invalid", emptyA: "!يرجى اختيار الوكالة"
  },
}
const m = {
  fnameEmpty: { title: 'Mendetory field!', subTitle: 'Your Email is invalid please enter valid email' },
  lnameInvalid: { title: 'Password Reset Sent!', subTitle: 'A password reset email has been sent to: ' },
  lnameEmpty: { title: 'Password Reset Sent!', subTitle: 'A password reset email has been sent to: ' },

  profileUpdated: { title: 'Profile Updated!', subTitle: 'Your profile has been successfully updated!' },
  emailVerified: { title: 'Email Confirmed!', subTitle: 'Congratulations! Your email has been confirmed!' },
  emailVerificationSent: { title: 'Email Confirmation Sent!', subTitle: 'An email confirmation has been sent to: ' },
  accountDeleted: { title: 'Account Deleted!', subTitle: 'Your account has been successfully deleted.' },
  passwordChanged: { title: 'Password Changed!', subTitle: 'Your password has been successfully changed.' },
  invalidCredential: { title: 'Invalid Credential!', subTitle: 'An error occured logging in with this credential.' },
  operationNotAllowed: { title: 'Login Failed!', subTitle: 'Logging in with this provider is not allowed! Please contact support.' },
  userDisabled: { title: 'Account Disabled!', subTitle: 'Sorry! But this account has been suspended! Please contact support.' },
  userNotFound: { title: 'Account Not Found!', subTitle: 'Sorry, but an account with this credential could not be found.' },
  wrongPassword: { title: 'Incorrect Password!', subTitle: 'Sorry, but the password you have entered is incorrect.' },
  invalidEmail: { title: 'Invalid Email!', subTitle: 'Sorry, but you have entered an invalid email address.' },
  emailAlreadyInUse: { title: 'Email Not Available!', subTitle: 'Sorry, but this email is already in use.' },
  weakPassword: { title: 'Weak Password!', subTitle: 'Sorry, but you have entered a weak password.' },
  requiresRecentLogin: { title: 'Credential Expired!', subTitle: 'Sorry, but this credential has expired! Please login again.' },
  userMismatch: { title: 'User Mismatch!', subTitle: 'Sorry, but this credential is for another user!' },
  providerAlreadyLinked: { title: 'Already Linked!', subTitle: 'Sorry, but your account is already linked to this credential.' },
  credentialAlreadyInUse: { title: 'Credential Not Available!', subTitle: 'Sorry, but this credential is already used by another user.' },
  changeName: { title: 'Change Name Failed!', subTitle: 'Sorry, but we\'ve encountered an error changing your name.' },
  changeEmail: { title: 'Change Email Failed!', subTitle: 'Sorry, but we\'ve encountered an error changing your email address.' },
  changePhoto: { title: 'Change Photo Failed!', subTitle: 'Sorry, but we\'ve encountered an error changing your photo.' },
  passwordsDoNotMatch: { title: 'Change Password Failed!', subTitle: 'Sorry, but the passwords you entered do not match.' },
  updateProfile: { title: 'Update Profile Failed', subTitle: 'Sorry, but we\'ve encountered an error updating your profile.' },
  usernameExists: { title: 'Username Already Exists!', subTitle: 'Sorry, but this username is already taken by another user.' },
  imageUpload: { title: 'Image Upload Failed!', subTitle: 'Sorry but we\'ve encountered an error uploading selected image.' }
};

@Injectable()
export class AlertProvider {
  lang = JSON.parse(localStorage.getItem("yallaLanguage"));
  constructor(public alertCtrl: AlertController,
    public auth: AuthProvider,
    public toastCtrl: ToastController
    // public restApi: RestApiProvider
  ) { }

  showMessage(code: any) {
    let lang = this.auth.getAppLanguage();
    let subtitle = ""
    let okButton = ""
    console.log(lang);
    
 
    
      okButton = "Ok";
    
    const alert = this.alertCtrl.create({
      subTitle: messages[lang][code].title,
      message: messages[lang][code].subTitle,
      buttons: [
        {
          text: okButton,
          handler: () => {
          }
        }]
    });
    alert.present();
  }


  showEmptyMessage(code: any) {
    let lang = this.auth.getAppLanguage();
    console.log(lang);
    let sub = ""
    let mes = ""
    let okButton = ""
      sub = messages[lang][code].title;
      mes = messages[lang][code].empty;
      okButton = "Ok";
    
    const alert = this.alertCtrl.create({
      subTitle: sub,
      message: mes,
      buttons: [
        {
          text: okButton,
          handler: () => {
          }
        }]
    });
    alert.present();
    console.log(sub,mes);
  }


  show(title: string, message: string) {

    const alert = this.alertCtrl.create({
      subTitle: title,
      message: message,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
          }
        }]
    });
    alert.present();
  }

  showAsync(title: string, message: string) {


    return new Promise((resolve) => {
      this.alertCtrl.create({
        subTitle: title,
        enableBackdropDismiss:false,
        message: message,
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              resolve('');
            }
          }]
      }).present();
    

      

        
     
    });




  }


  confirm(title, subTitle) {
  
    return new Promise((resolve) => {
    const alert = this.alertCtrl.create({
      title:title,
      subTitle: subTitle,
      enableBackdropDismiss:false,
      buttons: [
        {
          text: 'Confirm',
          handler: () => {
            resolve(true);
          }
        },
        {
          text: 'Cancel',
          handler: () => {
            resolve(false);
          }
        }]
    });
    alert.present();
  });
  }

  showPrompt() {
    return new Promise((resolve) => {
    const prompt = this.alertCtrl.create({
      title: "Create A New Play List",
      message: "",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            resolve(null);
          }
        },
        {
          text: 'Create',
          handler: data => {
            if(data.title!=""){
              resolve(data);
            }else{
              return false;
            }
            
          }
        }
      ]
    });
    prompt.present();
  })}





  inputAlert(title:string,okbutton:string) {
    return new Promise((resolve) => {
    const prompt = this.alertCtrl.create({
      title: title,
      message: "",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            resolve(null);
          }
        },
        {
          text: okbutton,
          handler: data => {
            if(data.title!=""){
              resolve(data);
            }else{
              return false;
            }
            
          }
        }
      ]
    });
    prompt.present();
  })}








  confirmation(title, subTitle, buttonConfirm, buttonCancel) {
  
    return new Promise((resolve) => {
    const alert = this.alertCtrl.create({
      title:title,
      subTitle: subTitle,
      enableBackdropDismiss:false,
      buttons: [
        {
          text: buttonConfirm,
          handler: () => {
            resolve(true);
          }
        },
        {
          text: buttonCancel,
          handler: () => {
            resolve(false);
          }
        }]
    });
    alert.present();
  });
  }


  presentToast(message:string,position:string){

    const toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: position
    }); 
    toast.present();
  }

   presentToast2(message:string,position:string){

    const toast = this.toastCtrl.create({
      message: message,
      duration: 1000,
      position: position
    }); 
    toast.present();
  }

}


