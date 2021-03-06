import {Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CurrentUserService} from '../../../../modules/shared/services/current-user';
import {Router} from '@angular/router';

@Component({
  selector:    'bla-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls:   ['./user-dropdown.component.scss']
})
export class UserDropdownComponent implements OnInit, OnChanges {

  @Output() public onAction = new EventEmitter<void>();

  constructor(private userService: CurrentUserService, private router: Router) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  public showUserProfile(): void {
    this.onAction.emit();

    this.router.navigateByUrl('/user/profile');
  }

  public logout() {
    this.onAction.emit();

    this.userService.logout();
    this.router.navigateByUrl('/home');
  }
}
