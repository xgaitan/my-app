import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AmplifyUIAngularModule} from "@aws-amplify/ui-angular";

/* new form imports */
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AmplifyUIAngularModule,
    /* configuring form modules */
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}