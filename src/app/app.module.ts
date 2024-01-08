import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxCaptchaModule  } from 'ngx-captcha';
import { CommonModule } from '@angular/common';


import { AppComponent } from './app.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { LoginComponent } from './pages/user-page/login/login.component';
import { ProductsComponent } from './pages/user-page/products/products.component';
import {HttpClientModule} from '@angular/common/http';
import { ProductItemComponent } from './pages/user-page/products/product-list/product-item/product-item.component';
import { RegisterComponent } from './pages/user-page/register/register.component';
import { AddProductComponent } from './pages/admin-page/add-product/add-product.component';
import { AdminHeaderComponent } from './pages/admin-page/admin-header/admin-header.component';
import { AllUsersComponent } from './pages/admin-page/all-users/all-users.component';
import { ProductsAdminComponent } from './pages/admin-page/products-admin/products-admin.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { ProductListComponent } from './pages/user-page/products/product-list/product-list.component';
import { ErrorComponent } from './pages/error/error.component';
import { ManageCategoriesComponent } from './pages/admin-page/manage-categories/manage-categories.component';
import { ProductDetailComponent } from './pages/user-page/products/product-detail/product-detail.component';
import { ProductEditComponent } from './pages/admin-page/products-admin/product-edit/product-edit.component';
import { UserEditComponent } from './pages/admin-page/all-users/user-edit/user-edit.component';
import { MatDialogModule } from '@angular/material/dialog';
import { WinkelwagenComponent } from './pages/user-page/winkelwagen/winkelwagen.component';
import {AuthGuardUser} from "./services/auth.guard.user";
import {AuthGuardAdmin} from "./services/auth.guard.admin";
import { MyOrdersComponent } from './pages/user-page/my-orders/my-orders.component';
import { AllOrdersComponent } from './pages/admin-page/all-orders/all-orders.component';

const appRoutes: Routes = [
  { path: '', component: UserPageComponent, children:[
      {path: 'product/:id', component: ProductDetailComponent},
    ] },

  { path: 'login', component: LoginComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'products/:category', component: ProductsComponent, children:[
      {path: 'product/:id', component: ProductDetailComponent}
      ]},
  { path: 'user', component: UserPageComponent},
  { path: 'admin', component: AdminPageComponent, canActivate: [AuthGuardAdmin]},
  { path: 'add-product', component: AddProductComponent, canActivate: [AuthGuardAdmin]},
  { path: 'admin-all-users', component: AllUsersComponent, canActivate: [AuthGuardAdmin]},
  { path: 'admin-all-orders', component: AllOrdersComponent, canActivate: [AuthGuardAdmin]},
  { path: 'admin-all-users/edit/:id', component: UserEditComponent, canActivate: [AuthGuardAdmin]},
  { path: 'admin-all-products/edit/:id', component: ProductEditComponent, canActivate: [AuthGuardAdmin]},
  { path: 'admin-all-products', component: ProductsAdminComponent, canActivate: [AuthGuardAdmin], children:[
      {path: ':id', component: ProductDetailComponent, canActivate: [AuthGuardAdmin]},
      {path: ':id/edit', component: ProductEditComponent, canActivate: [AuthGuardAdmin]},
      { path: 'edit/:id', component: ProductEditComponent, canActivate: [AuthGuardAdmin]},
    ]},
  { path: 'register', component: RegisterComponent },
  { path: 'manage-categories', component: ManageCategoriesComponent, canActivate: [AuthGuardAdmin] },
  { path: 'basket', component: WinkelwagenComponent, canActivate: [AuthGuardUser]},
  { path: 'my-orders', component: MyOrdersComponent, canActivate: [AuthGuardUser]},
  {path: '**', redirectTo: '/error' }
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    AdminPageComponent,
    UserPageComponent,
    LoginComponent,
    ProductsComponent,
    ProductItemComponent,
    RegisterComponent,
    AddProductComponent,
    AdminHeaderComponent,
    AllUsersComponent,
    ProductsAdminComponent,
    ProductListComponent,
    ErrorComponent,
    ManageCategoriesComponent,
    ProductDetailComponent,
    ProductEditComponent,
    UserEditComponent,
    WinkelwagenComponent,
    MyOrdersComponent,
    AllOrdersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    NgxCaptchaModule,
  CommonModule],
  exports:[
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
