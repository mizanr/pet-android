import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from './../../providers/auth/auth';
import { AlertProvider } from './../../providers/alert/alert';
import { RestApiProvider } from './../../providers/rest-api/rest-api';
import {ImageProvider} from './../../providers/image/image';

/**
 * Generated class for the ServiceEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-service-edit',
  templateUrl: 'service-edit.html',
})
export class ServiceEditPage {
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

service_id:any = '';
ser_info:any = '';

category:any = new Array();
  constructor(public navCtrl: NavController,public auth:AuthProvider,
  	public rest_api:RestApiProvider,
  	public imageP:ImageProvider,
  	public alertP:AlertProvider,
   public navParams: NavParams) {
   	this.service_id = this.navParams.get('s_id');
  	this.get_service(this.service_id);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceEditPage');
  }

  initilazeData() {
  	this.image = this.ser_info.image;
  	this.s_name = this.ser_info.name;
  	this.desc = this.ser_info.description;
  	this.cate = this.ser_info.category.id;
  	this.price = this.ser_info.price;
  	this.dur1 = this.ser_info.duration1;
  	this.dur2 = this.ser_info.duration2;

  	if(this.ser_info.Mon_status == 1){
  		this.monday = true;
  		this.mon_tex = 'Open';
  		this.m1 = this.ser_info.Mon_start;
  		this.m2 = this.ser_info.Mon_end;
  	}

  	if(this.ser_info.Tue_status == 1){
  		this.tuesday = true;
  		this.tue_tex = 'Open';
  		this.tu1 = this.ser_info.Tue_start;
  		this.tu2 = this.ser_info.Tue_end;
  	}

  	if(this.ser_info.Wed_status == 1){
  		this.wednesday = true;
  		this.wed_tex = 'Open';
  		this.w1 = this.ser_info.Wed_start;
  		this.w2 = this.ser_info.Wed_end;
  	}

  	if(this.ser_info.Thu_status == 1){
  		this.thursday = true;
  		this.thu_tex = 'Open';
  		this.th1 = this.ser_info.Thu_start;
  		this.th2 = this.ser_info.Thu_end;
  	}

  	if(this.ser_info.Fri_status == 1){
  		this.friday = true;
  		this.fri_tex = 'Open';
  		this.f1 = this.ser_info.Fri_start;
  		this.f2 = this.ser_info.Fri_end;
  	}

  	if(this.ser_info.Sat_status == 1){
  		this.saturday = true;
  		this.sat_tex = 'Open';
  		this.sa1 = this.ser_info.Sat_start;
  		this.sa2 = this.ser_info.Sat_end;
  	}

  	if(this.ser_info.Sun_status == 1){
  		this.sunday = true;
  		this.sun_tex = 'Open';
  		this.su1 = this.ser_info.Sun_start;
  		this.su2 = this.ser_info.Sun_end;
  	}

  }

  get_service(s_id:any) {
  	let Data = {
  		user_id:{"value":this.auth.getCurrentUserId(),"type":"NO"},
  		service_id:{"value":s_id,"type":"NO"},
  	}
  	this.rest_api.postData(Data,'get_single_service').then((result:any) => {
  		console.log(result);
  		if(result.status == 1){
  			this.ser_info = result.data;
  			this.get_category();
  			this.initilazeData();
  		}
  	})
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


   update() {
  	let Data = {
  		service_id:{"value":this.service_id,"type":"NO"},
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
  		this.rest_api.postData2(Data,0,'edit_service').then((result:any) => {
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

}
