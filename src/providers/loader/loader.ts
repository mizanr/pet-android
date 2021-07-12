import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

/*
  Generated class for the LoadingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoaderProvider {
  loading:any;
  isshowing=false;
  constructor(public http: HttpClient,
    public loadingCtrl: LoadingController
    ) {
    console.log('Hello LoaderProvider Provider');
  
  }

  show(){
    if(this.isshowing==false){
      this.loading= this.loadingCtrl.create({
        content:''
      });
      this.loading.present();
      this.isshowing=true
    }
    
  }
  hide(){
    if(this.isshowing==true){
      this.loading.dismiss();
      this.isshowing=false;
    }
    
  }


}
