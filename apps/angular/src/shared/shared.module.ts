import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmptyPipe } from './pipes/empty.pipe';

/** Shared module. */
@NgModule({
	declarations: [EmptyPipe],
	imports: [CommonModule],
	exports: [EmptyPipe],
})
export class SharedModule { }
