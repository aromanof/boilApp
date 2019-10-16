import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector   : 'app-header',
  templateUrl: './header.component.html',
  styleUrls  : [ './header.component.sass' ],
})
export class HeaderComponent implements OnInit {
  @Output() public logOut: EventEmitter<any> = new EventEmitter();

  public constructor(public userService: UserService) {
  }

  public ngOnInit(): void {

  }
}
