import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthStore } from '../../../store/auth.store';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivateChild {
  public authStore = inject(AuthStore);

  constructor(private router: Router) {}

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.authStore.isLogged() || !this.authStore.isAdmin()) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
