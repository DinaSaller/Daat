import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { DetailscardComponent } from './detailscard/detailscard.component';
import { ListComponent } from './list/list.component';

const routes:Routes=[
  {path:'',component:ListComponent},
  {path:'details/:id',component:DetailscardComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
