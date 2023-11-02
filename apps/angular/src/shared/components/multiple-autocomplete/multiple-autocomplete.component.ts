import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormControl, NonNullableFormBuilder } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MultipleAutocompleteItem } from '@js-camp/core/models/multiple-autocomplete-item';
import { debounceTime, startWith, tap } from 'rxjs';
import { ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MultipleAutocompleteParameters } from '@js-camp/core/models/multiple-autocomplete-parameters';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/** Multiple autocomplete component. */
@Component({
	selector: 'camp-multiple-autocomplete',
	templateUrl: './multiple-autocomplete.component.html',
	styleUrls: ['./multiple-autocomplete.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultipleAutocompleteComponent implements OnInit {

	private readonly formBuilder = inject(NonNullableFormBuilder);

	private readonly destroyRef = inject(DestroyRef);

	/** Chip input separators. */
	protected readonly chipInputSeparators = [ENTER] as readonly number[];

	/** Selected multiple autocomplete items. */
	protected readonly selectedItems: MultipleAutocompleteItem[] = [];

	/** Input control for item name. */
	protected itemNameControl: FormControl<string>;

	/** Total multiple autocomplete items. */
	@Input({ required: true })
	public totalItems: readonly MultipleAutocompleteItem[] = [];

	/** Parameters changed event. */
	@Output() 
	public parametersChanged = new EventEmitter<MultipleAutocompleteParameters>();

	public constructor() {
		this.itemNameControl = this.formBuilder.control<string>('');
	}

	/** @inheritdoc */
	public ngOnInit(): void {
		this.subscribeToItemSearch();
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

		const itemNameToAdd = event.value;

		if (itemNameToAdd === '') {
			return;
		}

		const isSelectedBefore = this.selectedItems
			.some(item => this.compareItemNames(item.name, itemNameToAdd));

		if (isSelectedBefore) {
			return;
		}

		let itemToAdd = this.totalItems
			.find(item => this.compareItemNames(item.name, itemNameToAdd));

		if (itemToAdd === undefined) {
			itemToAdd = {
				id: null,
				name: itemNameToAdd,
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

	private subscribeToItemSearch(): void {
		this.itemNameControl.valueChanges.pipe(
			startWith(''),
			debounceTime(1500),
			tap(itemName => this.parametersChanged.emit({
				search: itemName,
			})),
			takeUntilDestroyed(this.destroyRef),
		)
			.subscribe();
	}

	private compareItemNames(itemName: string, itemNameToCompare: string): boolean {
		return itemName.toLowerCase() === itemNameToCompare.toLowerCase();
	}
}
