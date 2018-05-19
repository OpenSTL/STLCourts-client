import {AppModule} from '../app/app.module';
import {RouterLinkStubDirective, RouterOutletStubComponent} from './router-stubs';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [
    AppModule
  ],
  declarations: [
    RouterLinkStubDirective,
    RouterOutletStubComponent
  ]
})
export class TestingModule { }
