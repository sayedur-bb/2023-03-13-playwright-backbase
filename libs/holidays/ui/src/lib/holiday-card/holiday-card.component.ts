import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Holiday } from '@eternal/holidays/model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BlinkerDirective } from '@eternal/shared/ui';
import { NgClass, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TestidDirective } from '../../../../../shared/ui/src/lib/testid.directive';

@Component({
  selector: 'eternal-holiday-card',
  templateUrl: './holiday-card.component.html',
  styleUrls: ['./holiday-card.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    BlinkerDirective,
    MatIconModule,
    NgClass,
    NgIf,
    RouterLink,
    TestidDirective,
  ],
})
export class HolidayCardComponent {
  @Input() holiday: (Holiday & { isFavourite: boolean }) | undefined;
  @Output() addFavourite = new EventEmitter<number>();
  @Output() removeFavourite = new EventEmitter<number>();
}
