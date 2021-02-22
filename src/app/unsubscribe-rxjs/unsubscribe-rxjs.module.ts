import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnsubscribeRxjsRoutingModule } from './unsubscribe-rxjs-routing.module';
import { UnsubscribePocComponent } from './unsubscribe-poc/unsubscribe-poc.component';
import { PocAsyncComponent } from './components/poc-async.component.ts.component';
import { PocBaseComponent } from './poc-base/poc-base.component';
import { PocTakeUntilComponent } from './components/poc-take-until.component';
import { PocTakeComponent } from './components/poc-take.component';
import { PocUnsubComponent } from './components/poc-unsub.component';
import { PocComponent } from './components/poc.component';



@NgModule({
  declarations: [
    UnsubscribePocComponent,
    PocComponent,
    PocAsyncComponent,
    PocTakeUntilComponent,
    PocTakeComponent,
    PocUnsubComponent,
    PocBaseComponent
  ],
  imports: [
    CommonModule,
    UnsubscribeRxjsRoutingModule
  ]
})
export class UnsubscribeRxjsModule { }
