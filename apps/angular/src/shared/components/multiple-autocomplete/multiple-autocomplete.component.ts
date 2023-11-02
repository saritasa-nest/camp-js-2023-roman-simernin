import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { FormControl, NonNullableFormBuilder } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MultipleAutocompleteItem } from '@js-camp/core/models/multiple-autocomplete-item';
import { Observable, map, startWith } from 'rxjs';
import {ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

/** Multiple autocomplete component. */
@Component({
	selector: 'camp-multiple-autocomplete',
	templateUrl: './multiple-autocomplete.component.html',
	styleUrls: ['./multiple-autocomplete.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultipleAutocompleteComponent {

	private readonly formBuilder = inject(NonNullableFormBuilder);

	/** Chip input separators. */
	protected readonly chipInputSeparators = [ENTER] as readonly number[];

	/** Selected multiple autocomplete items. */
	protected readonly selectedItems: MultipleAutocompleteItem[] = [];

	/** Input control for item name. */
	protected itemNameControl: FormControl<string>;

	/** Filtered multiple autocomplete items stream. */
	protected filteredItems$: Observable<readonly MultipleAutocompleteItem[]>;

	/** Total multiple autocomplete items. */
	@Input({ required: true })
	public totalItems: readonly MultipleAutocompleteItem[] = [];

	public constructor() {
		this.itemNameControl = this.formBuilder.control<string>('');

		this.filteredItems$ = this.itemNameControl.valueChanges.pipe(
			startWith(''),
			map(itemName => this.filterItems(itemName)),
		); 
	}

	/**
	 * Handle item selection.
	 * @param event - Event.
	 */
	protected handleItemSelected(event: MatAutocompleteSelectedEvent): void {
		this.itemNameControl.setValue('');

		const selectedItemId = event.option.value as number;

		const selectedItem = this.totalItems.find(item => item.id === selectedItemId);

		if (selectedItem === undefined) {
			return;
		}

		const isSelectedBefore = this.selectedItems.includes(selectedItem);

		if (isSelectedBefore) {
			return;
		}

		this.selectedItems.push(selectedItem);
	}

	/**
	 * Handle item adding.
	 * @param event - Event.
	 */
	protected handleItemAdded(event: MatChipInputEvent): void {
		event.chipInput.clear();
		this.itemNameControl.setValue('');

		const itemName = event.value;

		if (itemName === '') {
			return;
		}

		const isSelectedBefore = this.selectedItems
			.some(item => item.name.toLowerCase() === itemName.toLowerCase());

		if (isSelectedBefore) {
			return;
		}

		let itemToAdd = this.totalItems
			.find(item => item.name.toLowerCase() === itemName.toLowerCase());

		if (itemToAdd === undefined) {
			itemToAdd = {
				id: null,
				name: itemName,
			};
		}

		this.selectedItems.push(itemToAdd);
	}

	/**
	 * Remove multiple autocomplete item.
	 * @param itemToRemove - Item to remove.
	 */
	protected removeItem(itemToRemove: MultipleAutocompleteItem): void {
		const itemIndexToRemove = this.selectedItems.indexOf(itemToRemove); 
		this.selectedItems.splice(itemIndexToRemove, 1);
	}

	/** 
	 * Track multiple autocomplete item.
	 * @param index - Index.
	 * @param item - Item.
	 */
	protected trackItem(index: number, item: MultipleAutocompleteItem): string {
		return item.name;
	}

	private filterItems(itemIdentity: string | number): readonly MultipleAutocompleteItem[] {
		if (typeof (itemIdentity) === 'number') {
			return this.totalItems
				.filter(item => item.id === itemIdentity);
		}

		return itemIdentity === '' ? this.totalItems : this.totalItems
			.filter(item => item.name.toLowerCase()
				.includes(itemIdentity.toLowerCase()));
	}
}
