import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/pages/home/home.component";
import {ItemPageComponent} from "./components/pages/item-page/item-page.component";
import {CartPageComponent} from "./components/pages/cart-page/cart-page.component";

const routes: Routes = [
  {'path': '', component: HomeComponent},
  {'path': 'search/:term', component: HomeComponent},
  {'path': 'tag/:tag', component: HomeComponent},
  {'path': 'item/:id', component: ItemPageComponent},
  {'path': 'cart-page', component: CartPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
