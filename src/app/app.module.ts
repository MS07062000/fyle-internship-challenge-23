import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from  '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './components/search/search.component';
import { AppComponent } from './app.component';
import { SearchResultUserCardComponent } from './components/search-result-user-card/search-result-user-card.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { UserReposCardComponent } from './components/user-repos-card/user-repos-card.component';
import { AppRoutingModule } from './routes/app-routing.module';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { HomeComponent } from './components/home/home.component'; 

@NgModule({
    declarations: [
        AppComponent,
        SearchComponent,
        SearchResultUserCardComponent,
        UserDetailsComponent,
        PaginationComponent,
        UserReposCardComponent,
        SearchResultComponent,
        HomeComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        AppRoutingModule
    ]
})
export class AppModule { }
