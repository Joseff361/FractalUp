import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var DZ;


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    DZ.init({
      appId  : '473142',
      channelUrl : 'https://joseff361.github.io/FractalUp/chanel.html'
    })
  }

  doSearch(value: string): void{
    if(value != null && value != ''){
      this.router.navigateByUrl(`/search/${value}`);
     }
  }


  khe():void{
    DZ.login(function(response) {
      if (response.authResponse) {
          console.log('Welcome!  Fetching your information.... ');
          DZ.api('/user/me', function(response) {
              console.log('Good to see you, ' + response.name + '.');
          });
      } else {
          console.log('User cancelled login or did not fully authorize.');
      }
    },{perms: 'basic_access,email'});
  }

}
