import { Component, Input } from '@angular/core';

/** Anime info item component. */
@Component({
	selector: 'camp-anime-info-item',
	templateUrl: './anime-info-item.component.html',
	styleUrls: ['./anime-info-item.component.css'],
})
export class AnimeInfoItemComponent {

	/** Anime info item title. */
	@Input({ required: true })
	public itemTitle = '';

	/** Anime info item value. */
	@Input({ required: true })
	public itemValue = '';
}
