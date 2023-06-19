import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor( private location: Location, private router:Router ) { }

  ngOnInit(): void {
  }



  back() {
    this.location.back();
  }

  gotohome(): void {
		this.router.navigateByUrl("/auth", { skipLocationChange: true }).then(() => {
      this.router.navigate([decodeURI(this.location.path())]);
      });
	}
}
