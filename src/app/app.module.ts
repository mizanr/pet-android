import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { Form, IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/sign-up/sign-up';
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
import { RestApiProvider } from '../providers/rest-api/rest-api';
import { AuthProvider } from '../providers/auth/auth';
import { HttpClientModule } from '@angular/common/http';
import { AlertProvider } from '../providers/alert/alert';
import { ImageProvider } from '../providers/image/image';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import {OptPage} from '../pages/opt/opt';
import {CreatePassPage} from '../pages/create-pass/create-pass';
import {NewPostPage} from '../pages/new-post/new-post';
import {CommentPage} from '../pages/comment/comment';
import {EditFeedPage} from '../pages/edit-feed/edit-feed';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import {OtherUserPage} from '../pages/other-user/other-user';
import{EditBrakPage} from '../pages/edit-brak/edit-brak';
import {SharePage} from '../pages/share/share';
import {EditProductPage} from '../pages/edit-product/edit-product';
import {ServiceDetailPage} from '../pages/service-detail/service-detail';
import {ServiceEditPage} from '../pages/service-edit/service-edit';
import {ProductsDetailPage} from '../pages/products-detail/products-detail';
import { OnesignalProvider } from '../providers/onesignal/onesignal';
import { OneSignal } from '@ionic-native/onesignal';
import {AdsDetailPage} from '../pages/ads-detail/ads-detail';
import {AdsEditPage} from '../pages/ads-edit/ads-edit';
import {AddPetBreedPage} from '../pages/add-pet-breed/add-pet-breed';
import {BreedPage} from'../pages/breed/breed';
import {RacePage} from'../pages/race/race';

import { WelcomePage } from '../pages/welcome/welcome';
import { SocialLoginPage } from '../pages/social-login/social-login';
import { RegisterNewPage } from '../pages/register-new/register-new';
import {VendorSelectPage} from '../pages/vendor-select/vendor-select';
import {HomeNewPage} from '../pages/home-new/home-new';
import {VendorAccountPage} from '../pages/vendor-account/vendor-account';
import {PetAccountPage} from '../pages/pet-account/pet-account';
import {TermsPage} from '../pages/terms/terms';
import {PrivacyPage} from '../pages/privacy/privacy';
import {AccountPage} from '../pages/account/account';
import {UploadImagePage} from '../pages/upload-image/upload-image';
import { AddNewPetPage } from '../pages/add-new-pet/add-new-pet';
import { AddPetDetailPage } from '../pages/add-pet-detail/add-pet-detail';
import { AddPetGenderPage } from '../pages/add-pet-gender/add-pet-gender';
import { AddPetSizePage } from '../pages/add-pet-size/add-pet-size';
import {MemberProfilePage} from'../pages/member-profile/member-profile';
import {PetProfilePage} from'../pages/pet-profile/pet-profile';
import { UserAccountLocationPage } from './../pages/user-account-location/user-account-location';
import { UserAccountPersonalPage } from './../pages/user-account-personal/user-account-personal';
import { UserAccountGenderPage } from './../pages/user-account-gender/user-account-gender';
import { UserAccountEditPage } from './../pages/user-account-edit/user-account-edit';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { IonicImageLoader } from 'ionic-image-loader';
import {IonicImageCacheModule} from 'ionic3-image-cache';
import {PreviewPage} from '../pages/preview/preview';
import {ServicePreviewPage} from '../pages/service-preview/service-preview';
import {CampaignAchievementsPage} from '../pages/campaign-achievements/campaign-achievements';
import { VideoEditor } from '@ionic-native/video-editor';
import {VideopreviewPage} from '../pages/videopreview/videopreview';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Network } from '@ionic-native/network';
import {LoginNewPage} from '../pages/login-new/login-new';
import { DatePicker } from '@ionic-native/date-picker';
import {AutofillPlacesPage} from '../pages/autofill-places/autofill-places';
import { Keyboard } from '@ionic-native/keyboard';
import { CoatPage } from '../pages/coat/coat';
import { ColorPage } from '../pages/color/color';
// import {AutosizeModule} from 'ngx-autosize';
import {PetListPage} from '../pages/pet-list/pet-list';
import {FriendListPage} from '../pages/friend-list/friend-list';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SearchBusinessPage } from '../pages/search-business/search-business';
import { VisitStorePage } from '../pages/visit-store/visit-store';
import { InviteFriendPage } from '../pages/invite-friend/invite-friend';
import { FacebookProvider } from '../providers/facebook/facebook';
import { Facebook } from '@ionic-native/facebook';
import { LoaderProvider } from '../providers/loader/loader';
import { GooglePlusProvider } from '../providers/google-plus/google-plus';
import { GooglePlus } from '@ionic-native/google-plus';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { NewSharePage } from '../pages/new-share/new-share';
import { Crop } from '@ionic-native/crop';
import {VendorLoginPage} from '../pages/vendor-login/vendor-login';
import {VendorProductPage} from '../pages/vendor-product/vendor-product';
import { VendorAddProductPage } from '../pages/vendor-add-product/vendor-add-product';
import {VendorProductCategoryPage} from '../pages/vendor-product-category/vendor-product-category';
import {VendorAccountSettingsPage} from '../pages/vendor-account-settings/vendor-account-settings';
import {VendorAccountCompanyPage} from '../pages/vendor-account-company/vendor-account-company';
import {VendorAccountFullNamePage} from '../pages/vendor-account-full-name/vendor-account-full-name';
import { VendorAccountAddressPage } from '../pages/vendor-account-address/vendor-account-address';
import { VendorAccountWebPage } from '../pages/vendor-account-web/vendor-account-web';
import { VendorAccountPhonePage } from '../pages/vendor-account-phone/vendor-account-phone';
import {VendorServicePage} from '../pages/vendor-service/vendor-service';
import { VendorAddServicePage } from '../pages/vendor-add-service/vendor-add-service';
import{AdCampaignPage} from '../pages/ad-campaign/ad-campaign';
import {CampaignDetailPage} from '../pages/campaign-detail/campaign-detail';
import {CreateCampaignPage} from '../pages/create-campaign/create-campaign';    
import { RatioCrop } from 'ionic-cordova-plugin-ratio-crop';
import { MemberFriendPage } from '../pages/member-friend/member-friend';
import { MemberPostsPage } from '../pages/member-posts/member-posts';
import { FilePath } from '@ionic-native/file-path';
import {ImageGalleryPage} from '../pages/image-gallery/image-gallery';
import {FriendsSearchPage} from '../pages/friends-search/friends-search';
import { DeviceDataProvider } from '../providers/device-data/device-data';
import { ProfileGalleryPage } from '../pages/profile-gallery/profile-gallery';
import { Instagram } from '@ionic-native/instagram';
import { ImageModalPage } from '../pages/image-modal/image-modal';
import { MediaProvider } from '../providers/media/media';
import { LangPipe } from '../pipes/lang/lang';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';

@NgModule({
  declarations: [
    MyApp,
    LangPipe,
    ProductsPage,
    ForgotPage,
    VendorprofilePage,
    EditvendorPage,
    ServicesPage,
    HomePage,
    AddpetsPage,
    TabsPage,
    LoginPage,
    SignUpPage,
    NewsFeedPage,
    NewsFeedDetailPage,
    CreatFeedPage,
    SearchPage,
    ChatListPage,
    ProfilePage,
    ChatdetailsPage,
    OwnerprofilePage,
    NotificationsPage,
    AboutPage,
    ContactPage,
    ChangepasswordPage,
    EditpetprofilePage,
    EditprofilePage,
    DashboardPage,
    AdsPage,
    AddadsPage,
    AddproductPage,
    AddservicesPage,
    LoginVendorPage,
    ModalpagePage,
    LikesPage,
    OptPage,
    CreatePassPage,
    NewPostPage,
    CommentPage,
    EditFeedPage,
    OtherUserPage,
    EditBrakPage,
    SharePage,
    EditProductPage,
    ServiceDetailPage,
    ServiceEditPage,
    ProductsDetailPage,
    AdsDetailPage,
    AdsEditPage,
    PreviewPage,AdCampaignPage,
    CampaignDetailPage,
    CreateCampaignPage,
    ServicePreviewPage,VendorAccountPhonePage,VendorServicePage,VendorAddServicePage,
    CampaignAchievementsPage,VendorAccountAddressPage,VendorAccountWebPage,
    VideopreviewPage,VendorLoginPage,VendorAddProductPage,VendorAccountSettingsPage,
    WelcomePage,CoatPage,ColorPage,VendorProductPage,VendorProductCategoryPage,
    SocialLoginPage,RegisterNewPage,VendorSelectPage,HomeNewPage,VendorAccountPage,
    PetAccountPage,AddPetSizePage,AddPetGenderPage,SearchBusinessPage,
    AddPetDetailPage,AddNewPetPage,AddPetBreedPage,InviteFriendPage,VendorAccountCompanyPage,
    TermsPage,PrivacyPage,AccountPage,UploadImagePage,LoginNewPage,RacePage,
    MemberProfilePage,PetProfilePage,UserAccountEditPage,UserAccountGenderPage,UserAccountPersonalPage,UserAccountLocationPage,VendorAccountFullNamePage,
    BreedPage,AutofillPlacesPage,PetListPage,FriendListPage,VisitStorePage,NewSharePage,
    MemberFriendPage, MemberPostsPage, ImageGalleryPage, FriendsSearchPage, ProfileGalleryPage,
    ImageModalPage,
  ],
  imports: [
    TextareaAutosizeModule,
    BrowserModule,
    IonicModule.forRoot(MyApp,
      {mode:"ios",
    backButtonText:""}),
    IonicImageCacheModule.forRoot(),
    IonicImageLoader.forRoot(),
    HttpClientModule,
    IonicImageViewerModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProductsPage,
    ForgotPage,
    VendorprofilePage,
    ModalpagePage,
    EditvendorPage,
    AddadsPage,
    AddproductPage,
    AdsPage,
    AddservicesPage,
    ServicesPage,
    HomePage,
    LoginPage,
    AddpetsPage,
    TabsPage,
    SignUpPage,
    NewsFeedPage,
    NewsFeedDetailPage,
    CreatFeedPage,
    SearchPage,
    ChatListPage,
    ProfilePage,
    ChatdetailsPage,
    OwnerprofilePage,
    NotificationsPage,
    ContactPage,
    AboutPage,
    ChangepasswordPage,
    EditpetprofilePage,
    EditprofilePage,
    DashboardPage,
    LoginVendorPage,
    LikesPage,
    OptPage,
    CreatePassPage,
    NewPostPage,
    CommentPage,
    EditFeedPage,
    OtherUserPage,
    EditBrakPage,
    SharePage,
    EditProductPage,
    ServiceDetailPage,
    ServiceEditPage,
    ProductsDetailPage,
    AdsDetailPage,
    AdsEditPage,AdCampaignPage,
    CampaignDetailPage,
    CreateCampaignPage,
    PreviewPage,
    ServicePreviewPage,VendorAccountPhonePage,VendorServicePage,VendorAddServicePage,
    CampaignAchievementsPage,VendorAccountAddressPage,VendorAccountWebPage,
    VideopreviewPage,ColorPage,VendorProductCategoryPage,VendorAccountSettingsPage,
    WelcomePage,AutofillPlacesPage,CoatPage,VendorLoginPage,VendorProductPage,VendorAccountCompanyPage,
    SocialLoginPage,RegisterNewPage,VendorSelectPage,InviteFriendPage,VendorAddProductPage,
    HomeNewPage,VendorAccountPage,PetAccountPage,SearchBusinessPage,VisitStorePage,NewSharePage,
    AddPetSizePage,AddPetGenderPage,AddPetDetailPage,LoginNewPage,PetListPage,FriendListPage,
    AddNewPetPage,AddPetBreedPage,TermsPage,PrivacyPage,AccountPage,UploadImagePage,BreedPage,RacePage,
    MemberProfilePage,PetProfilePage,UserAccountEditPage,UserAccountGenderPage,UserAccountPersonalPage,UserAccountLocationPage,VendorAccountFullNamePage,
    MemberFriendPage, MemberPostsPage, ImageGalleryPage, FriendsSearchPage, ProfileGalleryPage,
    ImageModalPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ModalpagePage,
    LikesPage,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestApiProvider,
    AuthProvider,
    AlertProvider,
    ImageProvider,
    Camera,
    File,
	FileChooser,
	FileTransfer,
    OnesignalProvider,
    OneSignal,
    InAppBrowser,
    VideoEditor,
    AndroidPermissions,
    Network,
    DatePicker,
    Keyboard,
    SocialSharing,
    FacebookProvider,
    Facebook,
    LoaderProvider,
    GooglePlusProvider,
    GooglePlus,
    SpinnerDialog,
    Crop,
    RatioCrop,
    FilePath,
    DeviceDataProvider,
    Instagram,
    MediaProvider,
    LangPipe,
  ]
})
export class AppModule {}
