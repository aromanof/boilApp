import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector   : 'app-header-desktop',
  templateUrl: './header-desktop.component.html',
  styleUrls  : [ './header-desktop.component.sass' ],
})
export class HeaderComponent implements OnInit {
  @Output() public logOut: EventEmitter<any> = new EventEmitter();

  public constructor() {
  }

  public ngOnInit(): void {

  }
}
