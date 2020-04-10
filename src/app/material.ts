import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
    imports: [MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatToolbarModule,
        MatCardModule,
        MatSlideToggleModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatSelectModule
    ],
    exports: [MatButtonModule,
        MatInputModule, MatIconModule,
        MatToolbarModule, MatCardModule,
        MatSlideToggleModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatSelectModule
    ]
})

export class MaterialModule { }