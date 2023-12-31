import { ChangeDetectionStrategy, Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NonNullableFormBuilder } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MultipleAutocompleteItem } from '@js-camp/core/models/multiple-autocomplete-item';
import {
	BehaviorSubject,
	EMPTY,
	Observable,
	Subject,
	combineLatest,
	debounceTime,
	distinctUntilChanged,
	finalize,
	map,
	shareReplay,
	startWith,
	switchMap,
	tap,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PaginationParameters } from '@js-camp/core/models/pagination-parameters';
import { MultipleAutocompleteParameters } from '@js-camp/core/models/multiple-autocomplete-parameters';
import { Pagination } from '@js-camp/core/models/pagination';

/** Multiple autocomplete item orovider. */
export type MultipleAutocompleteItemProvider = (
	parameters: MultipleAutocompleteParameters
) => Observable<Pagination<MultipleAutocompleteItem>>;

type MultipleAutocompleteChangedFunction = (addedItems: MultipleAutocompleteItem[]) => void;
type MultipleAutocompleteTouchedFunction = () => void;

/** Multiple autocomplete component. */
@Component({
	selector: 'camp-multiple-autocomplete',
	templateUrl: './multiple-autocomplete.component.html',
	styleUrls: ['./multiple-autocomplete.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			multi: true,
			useExisting: MultipleAutocompleteComponent,
		},
	],
})
export class MultipleAutocompleteComponent implements OnInit, ControlValueAccessor {
	/** Label. */
	@Input({ required: true })
	public label = '';

	/** Item group. */
	@Input({ required: true })
	public provider: MultipleAutocompleteItemProvider = () => EMPTY;

	private readonly formBuilder = inject(NonNullableFormBuilder);

	private readonly destroyRef = inject(DestroyRef);

	private readonly defaultPagination: PaginationParameters = {
		pageNumber: 1,
		pageSize: 50,
	};

	private onMultipleAutocompleteChanged: MultipleAutocompleteChangedFunction = () => undefined;

	private onMultipleAutocompleteTouched: MultipleAutocompleteTouchedFunction = () => undefined;

	private readonly itemIdentityToAdd$ = new Subject<string | number>();

	/** Selected multiple autocomplete items. */
	protected readonly addedItems: MultipleAutocompleteItem[] = [];

	/** Input control for item name. */
	protected readonly itemNameControl: FormControl<string>;

	/** Provide control is disabled.  */
	protected isDisabled = false;

	/** Total multiple autocomplete items stream. */
	protected readonly totalItems$: Observable<Pagination<MultipleAutocompleteItem>>;

	/** Multiple autocomplete parameters. */
	protected readonly parameters$: Observable<MultipleAutocompleteParameters>;

	/** Stream provides items are loading. */
	protected readonly isItemsLoading$ = new BehaviorSubject(true);

	private readonly pagination$ = new BehaviorSubject<PaginationParameters>(this.defaultPagination);

	public constructor() {
		this.itemNameControl = this.formBuilder.control<string>('');

		const search$ = this.itemNameControl.valueChanges
			.pipe(
				startWith(''),
				distinctUntilChanged(),
			);

		this.parameters$ = combineLatest([
			search$,
			this.pagination$,
		]).pipe(
			map(([search, pagination]) => ({
				search,
				...pagination,
			})),
		);

		this.totalItems$ = this.parameters$.pipe(
			tap(() => this.isItemsLoading$.next(true)),
			debounceTime(1000),
			switchMap(parameters => this.provider(parameters)),
			finalize(() => this.isItemsLoading$.next(false)),
			shareReplay({ bufferSize: 1, refCount: true }),
		);
	}

	/** @inheritdoc */
	public ngOnInit(): void {
		this.subscribeToItemAdd();
	}

	/** @inheritdoc */
	public writeValue(itemsToAdd: MultipleAutocompleteItem[]): void {
		for (const itemToAdd of itemsToAdd) {
			this.addedItems.push(itemToAdd);
		}
	}

	/** @inheritdoc */
	public registerOnChange(onMultipleAutocompleteChanged: MultipleAutocompleteChangedFunction): void {
		this.onMultipleAutocompleteChanged = onMultipleAutocompleteChanged;
	}

	/** @inheritdoc */
	public registerOnTouched(onMultipleAutocompleteTouched: MultipleAutocompleteTouchedFunction): void {
		this.onMultipleAutocompleteTouched = onMultipleAutocompleteTouched;
	}

	/** @inheritdoc */
	public setDisabledState?(isDisabled: boolean): void {
		this.isDisabled = isDisabled;
	}

	/**
	 * Handle item selection.
	 * @param event - Event.
	 */
	protected handleItemSelected(event: MatAutocompleteSelectedEvent): void {
		const autocompleteValue = event.option.value;

		if (typeof autocompleteValue !== 'number') {
			return;
		}

		const itemIdToSelect = autocompleteValue;

		this.itemIdentityToAdd$.next(itemIdToSelect);
	}

	/**
	 * Handle item adding.
	 * @param event - Event.
	 */
	protected handleItemAdding(): void {
		const itemNameToAdd = this.itemNameControl.value;
		this.itemIdentityToAdd$.next(itemNameToAdd);
	}

	/**
	 * Remove multiple autocomplete item.
	 * @param itemToRemove - Item to remove.
	 */
	protected removeItem(itemToRemove: MultipleAutocompleteItem): void {
		const itemIndexToRemove = this.addedItems.indexOf(itemToRemove);
		this.addedItems.splice(itemIndexToRemove, 1);
	}

	/**
	 * Provides prohibition for item creation.
	 * @param totalItems - Total items.
	 */
	protected isForbiddenToCreateItem(totalItems: readonly MultipleAutocompleteItem[]): boolean {
		const itemNameToCreate = this.itemNameControl.value;

		return !this.canCreateItem(itemNameToCreate, totalItems);
	}

	/**
	 * Scroll to next page.
	 * @param previousPagination - Previous pagination.
	 * @param totalCount - Total count.
	 */
	protected scrollToNextPage(previousPagination: PaginationParameters, totalCount: number): void {
		const lastPageNumber = Math.ceil(totalCount / previousPagination.pageSize);

		if (previousPagination.pageNumber === lastPageNumber) {
			return;
		}

		this.pagination$.next({
			pageSize: previousPagination.pageSize,
			pageNumber: previousPagination.pageNumber + 1,
		});
	}

	/**
	 * Scroll to previous page.
	 * @param previousPagination - Previous pagination.
	 */
	protected scrollToPreviousPage(previousPagination: PaginationParameters): void {
		if (previousPagination.pageNumber === 1) {
			return;
		}

		this.pagination$.next({
			pageSize: previousPagination.pageSize,
			pageNumber: previousPagination.pageNumber - 1,
		});
	}

	/**
	 * Track multiple autocomplete item.
	 * @param index - Index.
	 * @param item - Item.
	 */
	protected trackItem(index: number, item: MultipleAutocompleteItem): string {
		return item.name;
	}

	private subscribeToItemAdd(): void {
		combineLatest([this.itemIdentityToAdd$, this.totalItems$])
			.pipe(
				distinctUntilChanged(
					([previousItemIdentityToAdd], [currentItemIdentityToAdd]) =>
						previousItemIdentityToAdd === currentItemIdentityToAdd,
				),
				tap(([itemIdentityToAdd, totalItems]) => this.addItem(itemIdentityToAdd, totalItems.results)),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe();
	}

	private addItem(itemIdentity: number | string, totalItems: readonly MultipleAutocompleteItem[]): void {
		this.onMultipleAutocompleteTouched();
		this.itemNameControl.reset();

		const isItemAdded =
			typeof itemIdentity === 'number' ?
				this.trySelectItem(itemIdentity, totalItems) :
				this.tryCreateItem(itemIdentity, totalItems);

		if (!isItemAdded) {
			return;
		}

		this.onMultipleAutocompleteChanged(this.addedItems);
	}

	private trySelectItem(itemIdToSelect: number, totalItems: readonly MultipleAutocompleteItem[]): boolean {
		const isAddedBefore = this.addedItems.some(item => item.id === itemIdToSelect);

		if (isAddedBefore) {
			return false;
		}

		const itemToSelect = totalItems.find(item => item.id === itemIdToSelect);

		if (itemToSelect === undefined) {
			return false;
		}

		this.addedItems.push(itemToSelect);

		return true;
	}

	private tryCreateItem(itemNameToCreate: string, totalItems: readonly MultipleAutocompleteItem[]): boolean {
		const canCreateItem = this.canCreateItem(itemNameToCreate, totalItems);

		if (!canCreateItem) {
			return false;
		}

		const itemToCreate: MultipleAutocompleteItem = {
			id: null,
			name: itemNameToCreate,
		};

		this.addedItems.push(itemToCreate);

		return true;
	}

	private canCreateItem(itemNameToCreate: string, totalItems: readonly MultipleAutocompleteItem[]): boolean {
		if (itemNameToCreate === '') {
			return false;
		}

		const isSelectable = totalItems.some(item => this.equalItemNames(item.name, itemNameToCreate));

		if (isSelectable) {
			return false;
		}

		const isAddedBefore = this.addedItems.some(item => this.equalItemNames(item.name, itemNameToCreate));

		if (isAddedBefore) {
			return false;
		}

		return true;
	}

	private equalItemNames(itemName: string, itemNameToCompare: string): boolean {
		return itemName.toLowerCase() === itemNameToCompare.toLowerCase();
	}
}
