import { AuthProvider } from './../providers/auth/auth';
import { Component, ViewChild ,NgZone} from '@angular/core';
import { Platform, Nav, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { NewsFeedPage } from '../pages/news-feed/news-feed';
import { NewsFeedDetailPage } from '../pages/news-feed-detail/news-feed-detail';
import { CreatFeedPage } from '../pages/creat-feed/creat-feed';
import { SearchPage } from '../pages/search/search';
import { ChatListPage } from '../pages/chat-list/chat-list';
import { ProfilePage } from '../pages/profile/profile';
import { ChatdetailsPage } from '../pages/chatdetails/chatdetails';
import { OwnerprofilePage } from '../pages/ownerprofile/ownerprofile';
import { NotificationsPage } from '../pages/notifications/notifications';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { ChangepasswordPage } from '../pages/changepassword/changepassword';
import { TabsPage } from '../pages/tabs/tabs';
import { AddpetsPage } from '../pages/addpets/addpets';
import { EditpetprofilePage } from '../pages/editpetprofile/editpetprofile';
import { EditprofilePage } from '../pages/editprofile/editprofile';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { ProductsPage } from '../pages/products/products';
import { ServicesPage } from '../pages/services/services';
import { AdsPage } from '../pages/ads/ads';
import { AddadsPage } from '../pages/addads/addads';
import { AddproductPage } from '../pages/addproduct/addproduct';
import { AddservicesPage } from '../pages/addservices/addservices';
import { EditvendorPage } from '../pages/editvendor/editvendor';
import { VendorprofilePage } from '../pages/vendorprofile/vendorprofile';
import { LoginVendorPage } from '../pages/login-vendor/login-vendor';
import { ModalpagePage } from '../pages/modalpage/modalpage';
import { LikesPage } from '../pages/likes/likes';
import { ForgotPage } from '../pages/forgot/forgot';

import { WelcomePage } from '../pages/welcome/welcome';
import { SocialLoginPage } from '../pages/social-login/social-login';
import { RegisterNewPage } from '../pages/register-new/register-new';
import {VendorSelectPage} from '../pages/vendor-select/vendor-select';
import {HomeNewPage} from '../pages/home-new/home-new';
import {TermsPage} from '../pages/terms/terms';
import {PrivacyPage} from '../pages/privacy/privacy';


import { AddNewPetPage } from '../pages/add-new-pet/add-new-pet';
import { AddPetDetailPage } from '../pages/add-pet-detail/add-pet-detail';
import { AddPetGenderPage } from '../pages/add-pet-gender/add-pet-gender';
import { AddPetSizePage } from '../pages/add-pet-size/add-pet-size';

import {VendorAccountPage} from '../pages/vendor-account/vendor-account';
import {PetAccountPage} from '../pages/pet-account/pet-account';


import { RestApiProvider } from '../providers/rest-api/rest-api';
import {AlertProvider} from '../providers/alert/alert';
import { OnesignalProvider } from '../providers/onesignal/onesignal';
import { ModalController } from 'ionic-angular';
import {CommentPage} from '../pages/comment/comment';
import { AndroidPermissions } from '@ionic-native/android-permissions';

// import { LikesPage } from '../pages/likes/likes';
import { Network } from '@ionic-native/network';
import { SearchBusinessPage } from '../pages/search-business/search-business';
import { VisitStorePage } from '../pages/visit-store/visit-store';
import { InviteFriendPage } from '../pages/invite-friend/invite-friend';
import { AccountPage } from '../pages/account/account';
import { VendorLoginPage } from '../pages/vendor-login/vendor-login';
import { VendorAccountSettingsPage } from '../pages/vendor-account-settings/vendor-account-settings';
import { VendorAddProductPage } from '../pages/vendor-add-product/vendor-add-product';
import { VendorProductPage } from '../pages/vendor-product/vendor-product';
import { VendorServicePage } from '../pages/vendor-service/vendor-service';
import { AdCampaignPage } from '../pages/ad-campaign/ad-campaign';
import { MemberProfilePage } from '../pages/member-profile/member-profile';
import { PetProfilePage } from '../pages/pet-profile/pet-profile';
import { LangPipe } from '../pipes/lang/lang';




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any;//=HomePage;
  type = 1;
  currentUser:any = '';
is_page:any=false;
  constructor(
   public platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private androidPermissions: AndroidPermissions,
    public auth:AuthProvider,
    public api: RestApiProvider,
    public alertP:AlertProvider,
    private onesignal:OnesignalProvider,
    public network:Network,
    public zone: NgZone,
    public lang:LangPipe,
    public modalCtrl: ModalController,
    public event:Events) {
    platform.ready().then(() => {

      const lang = (<any>window).navigator.language;
      console.log('device lang-----', lang);
      // lang == 'es' || lang == 'es-ES' || lang=='es-MX'
      if (lang.includes('es')) {
        this.auth.updateAppLanguage('es');
        localStorage.setItem("PetAppLanguage", JSON.stringify('es'));
      } else {
        this.auth.updateAppLanguage('en');
        localStorage.setItem("PetAppLanguage", JSON.stringify('en'));        
      }


      statusBar.backgroundColorByHexString('#a64686');
      this.initializeNetworkEvents();
     this.checkUserExists();
      statusBar.styleLightContent();
      splashScreen.hide();
      this.onesignal.init();

      this.onesignal.open.subscribe((data:any)=>{
        if(data!=0 && data){
          console.log("-------------------noti:",data);
          if(this.auth.isUserLoggedIn()){


            if(data.screen == 'user_profile'){
              setTimeout(() => {
                // this.nav.setRoot(OwnerprofilePage,{user_id:data.page_id});
                this.nav.push(MemberProfilePage,{user_id:data.page_id});
              },700)
            }

            if(data.screen == 'share_post_user_wall'){
              setTimeout(() => {
                this.nav.push(TabsPage);
              },700)
            }

            if(data.screen == 'share_post_pet_wall'){
              let Data = {
                id:data.page_id
              }
              setTimeout(() => {
                // this.nav.push(ProfilePage,{data:Data});
                this.nav.push(PetProfilePage,{pet_id:data.page_id});
              },700)
            }

            if(data.screen == "user_post_like"){
              setTimeout(() => {
                const modal = this.modalCtrl.create(NewsFeedDetailPage,{feed_id:data.page_id,type:'Post Detail'});
                modal.present();
              },700)
            }

            if(data.screen == "pet_post_like"){
              setTimeout(() => {
                const modal = this.modalCtrl.create(NewsFeedDetailPage,{feed_id:data.page_id,type:'Bark Detail'});
                modal.present();
              },700)
            }

            if(data.screen == "user_post_comm"){
              setTimeout(() => {
             const modal = this.modalCtrl.create(NewsFeedDetailPage,{feed_id:data.page_id,type:'Post Detail',adds:1});
              modal.present();
              },700)
            }

            if(data.screen == "pet_post_comm"){
              setTimeout(() => {
             const modal = this.modalCtrl.create(NewsFeedDetailPage,{feed_id:data.page_id,type:'Bark Detail',adds:1});
              modal.present();
              },700)
            }


            if (data.screen == "chat") {
              let d = {
                id: data.page_id,
                first_name:data.name,
              }
              setTimeout(() => {
               this.nav.push(ChatdetailsPage,{user:d});
                // this.nav.setRoot(TabsPage,{tabindex:2});
              },700)
            }



          }
        }
      });
      this.requestAllPermission();

     
      
    });

     this.event.subscribe('loginAuth',() => {
        this.currentUser = this.auth.getUserDetails();
        console.log('current-user----',this.currentUser);
      })
  }

  retry(){
    window.location.href='';
  }

  initializeNetworkEvents(){
    console.log('netwrok calling...');
    // setInterval(() => {
      this.network.onDisconnect().subscribe((res) => {
           console.log('offline');
           this.zone.run(() => {
             this.is_page = true;
           // this.alertP.presentToast2('You have not internet connectivity, connect to the Internet and try again!!','top');

           })
        });
       this.network.onConnect().subscribe((res) => {
           console.log('Online');
           this.zone.run(() => {
             this.is_page = false;
           // this.alertP.presentToast2('You have not internet connectivity, connect to the Internet and try again!!','top');

           })

        });
      // },1000);
    }

  requestAllPermission(){
      this.androidPermissions.requestPermissions([
      //this.androidPermissions.PERMISSION.INTERNET,
      //this.androidPermissions.PERMISSION.FOREGROUND_SERVICE,
      //this.androidPermissions.PERMISSION.REQUEST_COMPANION_RUN_IN_BACKGROUND,
      //this.androidPermissions.PERMISSION.REQUEST_COMPANION_USE_DATA_IN_BACKGROUND,
      // this.androidPermissions.PERMISSION.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS,
      // this.androidPermissions.PERMISSION.ACCESS_NETWORK_STATE,
      // this.androidPermissions.PERMISSION.BIND_TELECOM_CONNECTION_SERVICE,
      // this.androidPermissions.PERMISSION.CALL_PHONE,
      // this.androidPermissions.PERMISSION.CAMERA,
      // this.androidPermissions.PERMISSION.GET_ACCOUNTS,
      // this.androidPermissions.PERMISSION.MANAGE_OWN_CALLS,
      // this.androidPermissions.PERMISSION.MODIFY_AUDIO_SETTINGS,
      // this.androidPermissions.PERMISSION.READ_CONTACTS,
      //this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
      // this.androidPermissions.PERMISSION.READ_PHONE_STATE,
      // this.androidPermissions.PERMISSION.RECORD_AUDIO,
      // this.androidPermissions.PERMISSION.VIBRATE,
      // this.androidPermissions.PERMISSION.WAKE_LOCK,
      // this.androidPermissions.PERMISSION.WRITE_CONTACTS,
   //   this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
      // this.androidPermissions.PERMISSION.WRITE_SETTINGS
      ]);
    }

  checkUserExists() {
     if(this.auth.isUserLoggedIn()){
       this.update_deviceId();
        this.currentUser = this.auth.getUserDetails();
        if(this.auth.getUserDetails().user_type == 1){
          if(this.auth.getUserDetails().is_pet_added == 1 || this.auth.getUserDetails().is_pet_added == 0){
            this.rootPage = TabsPage;
          }
          // else {
          //   this.rootPage =  AddNewPetPage//AddpetsPage // when not pet added
          // }
        }
        else {
          if(this.auth.getUserDetails().company_name != null){
            this.rootPage = VendorLoginPage//DashboardPage; // for vendor case;
          }else{
            this.rootPage = VendorLoginPage // EditvendorPage; // for vendor case;

          }
        }
      }
      else {
        this.rootPage = WelcomePage;  //HomePage;
      }
  }

  getuserapi(){
     let data={
           'UserID':{value:20,type:"NO"}
     }
     this.api.postData(data,'GetProfile').then((res)=>{
       console.log('get api',res);
     })

    //  this.api.get(data,0,'GetProfile',this.auth.getToken()).then((res)=>{
    //   console.log('get api',res);
    // })
  }


  updateDeviceToken(){ //get
    let data={
          'Userid': {value:this.auth.getCurrentUserId(), type:"NO"},//{value:this.auth.getCurrentUserId(),type:"NO"},
          "DeviceToken": {value:"TokenForOneSignal", type:"NO"}
    }
    this.api.postData(data,'UpdateToken').then((res)=>{
      console.log('get api',res);
    })
 }

 home() {
   this.nav.setRoot(TabsPage);
 }

  feed() {
    this.nav.push(CreatFeedPage);
  }

  profile () {
    this.nav.push(ProfilePage);
  }

  ownerprofile () {
    this.nav.setRoot(TabsPage,{tabindex:3});
  }

  about() {
    this.nav.push(AboutPage);
  }

  changepass() {
    this.nav.push(ChangepasswordPage);
  }

  contact() {
    this.nav.push(ContactPage);
  }
  login() {
    this.nav.push(HomePage);
  }
  addpet() {
    this.nav.push(AddpetsPage);
  }

  profilevend() {
    this.nav.push(VendorAccountSettingsPage);
  }

  logout() {
    this.alertP.confirmation(
      this.lang.transform('LOGOUT', []),
      this.lang.transform('LOGOUTCONTENT', []),
      this.lang.transform('YES', []),
      this.lang.transform('NO',[])).then((data) => {
      if(data){
        this.nullupdate_deviceId();
        //  window.location.href="";
        // this.nav.push(HomePage);
        // this.auth.removeAllSessions();
      }
    })
  }


nullupdate_deviceId() {
        let Data = {
      user_id:{"value":this.auth.getCurrentUserId(),"type":'NO'},
     device_id:{"value":null,"type":'NO'},
    }
      this.api.postwithoutldr(Data,'update_device_id').then((result:any) => {
      console.log(result);
        if(result.status == 1){
          window.location.href="";
        this.nav.push(HomePage);
        this.auth.removeAllSessions();
        }
      })
  }


  update_deviceId() {
    if(this.platform.is('cordova')){
      this.onesignal.id().then(identity => {
        console.log('-------Device Id----------',identity);
        let Data = {
      user_id:{"value":this.auth.getCurrentUserId(),"type":'NO'},
     device_id:{"value":identity,"type":'NO'},
    }
      this.api.postwithoutldr(Data,'update_device_id').then((result:any) => {
      console.log('update device id-----',result);
      })
      })
    }
  }

  search_business() {
    this.nav.push(SearchBusinessPage);
  }

  visit_store() {
    this.nav.push(VisitStorePage);
  }

  invite_friend() {
    this.nav.push(InviteFriendPage);
  }

  products() {
   this.nav.push(VendorProductPage); 
  }

  services() {
    this.nav.push(VendorServicePage);
  }

  comp() {
    this.nav.push(AdCampaignPage);
  }

  alet() {
    alert('Coming Soon.');
  }

}

