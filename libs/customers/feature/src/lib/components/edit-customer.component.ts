import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '@eternal/customers/model';
import { CustomerComponentModule } from '@eternal/customers/ui';
import { Options } from '@eternal/shared/form';
import { fromMaster } from '@eternal/shared/master-data';
import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CustomersRepository } from '@eternal/customers/data';
import { Store } from '@ngrx/store';

@Component({
  selector: 'eternal-edit-customer',
  template: ` <eternal-customer
    *ngIf="data$ | async as data"
    [customer]="data.customer"
    [countries]="data.countries"
    [disableSubmitButton]="disableSubmitButton"
    (save)="this.submit($event, data.customer.id)"
    (remove)="this.remove($event, data.customer.id)"
  ></eternal-customer>`,
})
export class EditCustomerComponent {
  data$: Observable<{ customer: Customer; countries: Options }>;
  customerId = 0;
  disableSubmitButton = false;

  constructor(
    private customersRepository: CustomersRepository,
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const countries$ = this.store.select(fromMaster.selectCountries);
    const customer$ = this.customersRepository.findById(
      Number(this.route.snapshot.paramMap.get('id') || '')
    );

    this.data$ = combineLatest({
      countries: countries$,
      customer: customer$,
    }).pipe(map(({ countries, customer }) => ({ countries, customer })));
  }

  submit(customer: Customer, id: number) {
    const urlTree = this.router.createUrlTree(['..'], {
      relativeTo: this.route,
    });
    this.disableSubmitButton = true;
    this.customersRepository.update(
      { ...customer, id },
      urlTree.toString(),
      'Customer has been updated',
      () => (this.disableSubmitButton = true)
    );
  }

  remove(customer: Customer, id: number) {
    this.customersRepository.remove({ ...customer, id});
  }

  private verifyCustomer(customer$: Observable<undefined | Customer>) {
    function customerGuard(
      customer: undefined | Customer
    ): customer is Customer {
      return customer !== undefined;
    }

    return customer$.pipe(filter(customerGuard));
  }
}

@NgModule({
  declarations: [EditCustomerComponent],
  exports: [EditCustomerComponent],
  imports: [CommonModule, CustomerComponentModule],
})
export class EditCustomerComponentModule {}