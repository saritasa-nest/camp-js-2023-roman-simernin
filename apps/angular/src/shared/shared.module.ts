import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmptyPipe } from './pipes/empty.pipe';
import { CommaJoinPipe } from './pipes/comma-join.pipe';

/** Shared module. */
@NgModule({
	declarations: [EmptyPipe, CommaJoinPipe],
	imports: [CommonModule],
	exports: [EmptyPipe, CommaJoinPipe],
})
export class SharedModule { }
