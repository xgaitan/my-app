import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {APIService, Restaurant} from "./API.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})

export class AppComponent implements OnInit, OnDestroy {
  title = "amplify-angular-app";
  public createForm: FormGroup; 

   /* declare restaurants variable */
   public restaurants: Array<Restaurant> = [];

  constructor(private api: APIService, private fb: FormBuilder) {
    this.createForm = this.fb.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      city: ["", Validators.required],
    });
  }

  private subscription : Subscription | null = null;

  async ngOnInit() {
    this.api.ListRestaurants().then(event => {
      this.restaurant = event.items;
    });

    /* subscribe to new restaurants being created */
    this.subscription = <Subscription>( 
      this.api.OnCreateRestaurantListener.subscribe((event: any) => {
        const newRestaurant = event.value.data.onCreateRestaurant;
        this.restaurants = [newRestaurant, ...this.restaurants];
      })
    );
  }

  public onCreate(restaurant: Restaurant) {
    this.api
      .CreateRestaurant(restaurant)
      .then((event) => {
        console.log("item created!");
        this.createForm.reset();
      })
      .catch((e) => {
        console.log("error creating restaurant...", e);
      });
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = null;
  }
}
