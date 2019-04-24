import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector   : 'app-header',
  templateUrl: './header.component.html',
  styleUrls  : [ './header.component.sass' ],
})
export class HeaderComponent implements OnInit {
  @Output() public logOut: EventEmitter<any> = new EventEmitter();

  public constructor() {
  }

  public ngOnInit(): void {

  }
}
