import { Component, OnInit } from '@angular/core';
import { User } from "../../../../models/user";
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.scss']
})
export class DetailUserComponent implements OnInit {


  user: User = new User();

  constructor( private route: ActivatedRoute, private _serviceUser: UserService) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser(){
    const param = this.route.snapshot.params;
    this.user.id = param['id'];
    console.log(param['id']);
    this._serviceUser.get(this.user.id!).subscribe( (res: User) => {
      console.log(res);
      this.user = res;
    })
  }


}
