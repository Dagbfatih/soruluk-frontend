import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(private router:Router) { }

  reloadPage(routerUrl:string) {
    window.location.reload();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([routerUrl]);
  }
}
