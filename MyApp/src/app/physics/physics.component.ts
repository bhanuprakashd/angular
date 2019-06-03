import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-physics',
  templateUrl: './physics.component.html',
  styleUrls: ['./physics.component.css']
})
export class PhysicsComponent implements OnInit {
  public show:boolean = false;
  public buttonName:any = 'Show';
  public xyz:boolean = false;
  public btName:any = 'xyz';
  favoriteSeason: string;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn','India', 'China', 'Russia', 'Brazil','India', 'China', 'Russia', 'Brazil','India', 'China', 'Russia', 'Brazil','India', 'China', 'Russia', 'Brazil','India', 'China', 'Russia', 'Brazil'];
  country: string;
  countries: string[] = ['India', 'China', 'Russia', 'Brazil'];
  constructor() { }

  ngOnInit() {
  }
  toggle() {
    this.show = !this.show;

    // CHANGE THE NAME OF THE BUTTON.
    if(this.show)  
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }
  toggle1() {
    this.xyz = !this.xyz;

    // CHANGE THE NAME OF THE BUTTON.
    if(this.xyz)  
      this.btName = "abc";
    if (this.buttonName=='Hide')
      this.buttonName='show'
    else
      this.btName = "xyz";
  }
}
