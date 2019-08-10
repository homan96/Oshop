import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { DataTableModule } from 'angular-4-data-table';
import { CustomFormsModule } from 'ng2-validation';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductQuantityComponent } from 'shared/components/product-quantity/product-quantity.component';
import { ProductCardComponent } from 'shared/components/product-card/product-card.component';
import { AuthService } from 'shared/services/auth.service';
import { CategoryService } from 'shared/services/category.service';
import { OrderService } from 'shared/services/order.service';
import { ProductService } from 'shared/services/product.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { UserService } from 'shared/services/user.service';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { OrderFormComponent } from 'shared/components/order-form/order-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot()
  ],
  declarations: [
    ProductCardComponent,
    OrderFormComponent,
    ProductQuantityComponent
  ],
  exports: [
    ProductCardComponent,
    OrderFormComponent,
    ProductQuantityComponent,

    CommonModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot().ngModule
  ],
  providers: [
    AuthService,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService,
    AuthGuard
  ]
})
export class SharedModule { }
