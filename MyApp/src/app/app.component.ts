import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MyApp';
  physicsForm : FormGroup;
  topics=['Physics','Thermodynamics','Nuclear Physics','Magnetism','Electricity']
  constructor(private fb:FormBuilder){}
  ngOnInit()
  {
    this.physicsForm=this.fb.group({
      physicsControl:['Thermodynamics']
    });
  }
  
}
