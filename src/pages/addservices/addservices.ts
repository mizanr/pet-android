import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from './../../providers/auth/auth';
import { AlertProvider } from './../../providers/alert/alert';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import {ImageProvider} from './../../providers/image/image';
import {ServicePreviewPage} from '../service-preview/service-preview';
/**
 * Generated class for the AddservicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-addservices',
  templateUrl: 'addservices.html',
})
export class AddservicesPage {
monday:any = false;
mon_tex:any = 'Close';
m1:any = '';
m2:any = '';

tuesday:any = false;
tue_tex:any = 'Close';
tu1:any = '';
tu2:any = '';

wednesday:any = false;
wed_tex:any = 'Close';
w1:any = '';
w2:any = '';

thursday:any = false;
thu_tex:any = 'Close';
th1:any = '';
th2:any = '';

friday:any = false;
fri_tex:any = 'Close';
f1:any = '';
f2:any = '';

saturday:any = false;
sat_tex:any = 'Close';
sa1:any = '';
sa2:any = '';

sunday:any = false;
sun_tex:any = 'Close';
su1:any = '';
su2:any = '';

s_name:any = '';
desc:any = '';
cate:any = '';
price:any = '';
dur1:any = '';
dur2:any = '';

image:any = '';
blob_img:any = '';
blob_name:any = '';

category:any = new Array();

  constructor(public navCtrl: NavController,public auth:AuthProvider,
  	public rest_api:RestApiProvider,
  	public imageP:ImageProvider,
  	public alertP:AlertProvider,
   public navParams: NavParams) {
   	
  }

  ionViewDidLoad() {
  	this.get_category();
    console.log('ionViewDidLoad AddservicesPage');
  }

  get_category() {
    var Data = {
      user_id:{value:this.auth.getCurrentUserId(),"type":"NO"},
    }
  		this.rest_api.postwithoutldr(Data,'get_category').then((result:any) => {
  		console.log(result);
  		if(result.status == 1){
  			this.category = result.data;  		
  		}	
  	})
  }

  add() {
  	let Data = {
  		user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
  		name:{"value":this.s_name,"type":"SNAME"},
  		description:{"value":this.desc,"type":"DES"},
  		category:{"value":this.cate,"type":"CATE"},
  		price:{"value":this.price,"type":"NO"},
  		duration1:{"value":this.dur1,"type":"NO"},
  		duration2:{"value":this.dur2,"type":"NO"}, // pass two value dur1, dur2
  	}

  	if(this.blob_img){
  		Data['image'] = {"value":this.blob_img,"type":"NO","name":this.blob_name};
  	}
//if(this.monday || this.tuesday || this.wednesday || this.thursday || this.friday || this.saturday || this.sunday){
	if(this.monday){
		if(this.m1 && this.m2){
			var valid = this.time(this.m1,this.m2);
			console.log(valid);
			if(valid == 1){
				Data['Mon_status'] = {"value":1,"type":"NO"};
		  		Data['Mon_start'] = {"value":this.m1,"type":"NO"};
		  		Data['Mon_end'] = {"value":this.m2,"type":"NO"};
			} else {
				return
			}		
		} 
		else {
			this.alertP.show('Alert','Please select time properly');
      return
		}  		
  	}  if(this.tuesday){
  		if(this.tu1 && this.tu2){
			var valid = this.time(this.tu1,this.tu2);
			if(valid == 1){
				Data['Tue_status'] = {"value":1,"type":"NO"};
		  		Data['Tue_start'] = {"value":this.tu1,"type":"NO"};
		  		Data['Tue_end'] = {"value":this.tu2,"type":"NO"};
			} else {
				return
			}
		} 
		else {
			this.alertP.show('Alert','Please select time properly');
      return
		} 
  	}  if(this.wednesday){
  		if(this.w1&&this.w2){
			var valid = this.time(this.w1,this.w2);		
  			if(valid == 1){
				Data['Wed_status'] = {"value":1,"type":"NO"};
		  		Data['Wed_start'] = {"value":this.w1,"type":"NO"};
		  		Data['Wed_end'] = {"value":this.w2,"type":"NO"};
			}else {
				return
			}
  		} else {
			this.alertP.show('Alert','Please select time properly');
      return

  		}
  	}  if(this.thursday) {
  		if(this.th1&&this.th2){
			var valid = this.time(this.th1,this.th2);
  			if(valid == 1){
				Data['Thu_status'] = {"value":1,"type":"NO"};
		  		Data['Thu_start'] = {"value":this.th1,"type":"NO"};
		  		Data['Thu_end'] = {"value":this.th2,"type":"NO"};
			}else {
				return
			}
  		} else {
			this.alertP.show('Alert','Please select time properly');
      return

  		}
  	}  if(this.friday){
  		if(this.f1&&this.f2){
			var valid = this.time(this.f1,this.f2);
			if(valid == 1){
				Data['Fri_status'] = {"value":1,"type":"NO"};
		  		Data['Fri_start'] = {"value":this.f1,"type":"NO"};
		  		Data['Fri_end'] = {"value":this.f2,"type":"NO"};
			}else {
				return
			}
  		}else {
			this.alertP.show('Alert','Please select time properly');
      return

  			}
  	}  if(this.saturday){
  		if(this.sa1&&this.sa2){
			var valid = this.time(this.sa1,this.sa2);
			if(valid == 1) {
				Data['Sat_status'] = {"value":1,"type":"NO"};
		  		Data['Sat_start'] = {"value":this.sa1,"type":"NO"};
		  		Data['Sat_end'] = {"value":this.sa2,"type":"NO"};
			}else {
				return
			}

  		} else {
			this.alertP.show('Alert','Please select time properly');
      return

  		}
  	}  if(this.sunday){
  		if(this.su1&&this.su2){
			var valid = this.time(this.su1,this.su2);
			if(valid == 1) {
				Data['Sun_status'] = {"value":1,"type":"NO"};
		  		Data['Sun_start'] = {"value":this.su1,"type":"NO"};
		  		Data['Sun_end'] = {"value":this.su2,"type":"NO"};
			}else {
				return
			}

  		} else {
			this.alertP.show('Alert','Please select time properly');
      return
      
  		}
  	} 
  	// else {
  		this.rest_api.postData2(Data,0,'add_service').then((result:any) => {
  		console.log(result);
  		if(result.status == 1){
  			this.alertP.showAsync('Success',result.message).then(() => {
  				this.navCtrl.pop();
  			})
  		} else {
  			this.alertP.show('Alert',result.message);
  			}
  		})
  	// }
  // } else {
  // 	this.alertP.show('Alert', 'Please Fill atleast one day');
  // }
  	
  }

  get_image() {
  		this.imageP.getImage().then((img) => {
  			this.image = img;
  		var file = this.imageP.imgURItoBlob(img);
  		this.blob_img = file;
  		this.blob_name = this.imageP.generateImageName('hello.jpg');

  		console.log('blob img:::--',this.blob_img,'blobname---',this.blob_name);
  		})
  	}

  	time(stime:any,endtime:any){
  		if(stime >= endtime){
  			this.alertP.show('Alert','Start time can not grater than or equal to end time');
  			return 0;
  		}else {
  			return 1;
  		}
  	}

  	time_mon(time:any) {
  		console.log(time);
  		// if(this.m1&&this.m2){
  		// 	var valid = this.time(this.m1,this.m2);
  		// }
  	}

  mon(check) {
  	console.log(check);
  	if(check){
  		this.mon_tex = 'Open';
  	}else {
  		this.mon_tex = 'Close';
  	}
  }

  tue(check) {
  	console.log(check);
  	if(check){
  		this.tue_tex = 'Open';
  	}else {
  		this.tue_tex = 'Close';
  	}
  }

  wed(check) {
  	console.log(check);
  	if(check){
  		this.wed_tex = 'Open';
  	}else {
  		this.wed_tex = 'Close';
  	}
  }

  thu(check) {
  	console.log(check);
  	if(check){
  		this.thu_tex = 'Open';
  	}else {
  		this.thu_tex = 'Close';
  	}
  }

  fri(check) {
  	console.log(check);
  	if(check){
  		this.fri_tex = 'Open';
  	}else {
  		this.fri_tex = 'Close';
  	}
  }

  sat(check) {
  	console.log(check);
  	if(check){
  		this.sat_tex = 'Open';
  	}else {
  		this.sat_tex = 'Close';
  	}
  }

  sun(check) {
  	console.log(check);
  	if(check){
  		this.sun_tex = 'Open';
  	}else {
  		this.sun_tex = 'Close';
  	}
  }

  remove_img() {
      this.image = '';
      this.blob_img = '';
      this.blob_name = '';
    }


    preview() {
      for(let i=0;i<this.category.length;i++){
        if(this.cate == this.category[i].id){
          var cate_name = this.category[i].name;
        }
      }
      let data = {
        img:this.image,
        s_name:this.s_name,
        desc:this.desc,
        price:this.price,
        duration1:this.dur1,
        duration2:this.dur2,
        cate:cate_name,
        mon:this.monday,
        mon_opne:this.m1,
        mon_close:this.m2,
        tue:this.tuesday,
        tue_open:this.tu1,
        tue_close:this.tu1,
        wed:this.wednesday,
        wed_open:this.w1,
        wed_close:this.w2,
        thu:this.thursday,
        thu_open:this.th1,
        thu_close:this.th2,
        fri:this.friday,
        fri_open:this.f1,
        fri_close:this.f2,
        sat:this.saturday,
        sat_open:this.sa1,
        sat_close:this.sa2,
        sun:this.sunday,
        sun_open:this.su1,
        sun_close:this.su2,
      }

      this.navCtrl.push(ServicePreviewPage,{data:data});
    }

}
