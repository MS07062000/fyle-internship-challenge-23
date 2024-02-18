import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from '../components/user-details/user-details.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from '../components/home/home.component';

const routes: Routes = [
    { path: 'user', component: UserDetailsComponent },
    { path: '', component: HomeComponent },
    // { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }