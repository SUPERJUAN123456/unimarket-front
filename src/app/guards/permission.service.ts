import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from
  '@angular/router';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private tokenService: TokenService, private router: Router) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.tokenService.isLogged()) {
      this.router.navigate([""]);
      return false;
    }
    return true;
  }
}
export const LoginGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state:
  RouterStateSnapshot): boolean => {
  return inject(PermissionService).canActivate(next, state);
}

