import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddBookComponent } from './components/add-book/add-book.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', component: DashboardComponent },
      { path: "add", component: AddBookComponent }
    ], { bindToComponentInputs: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }


