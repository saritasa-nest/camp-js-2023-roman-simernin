import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { AnimePreview } from '@js-camp/core/models/animePreview';
import { AnimeService } from '@js-camp/angular/core/services/animeService';

/** Anime table component. */
@Component({
    selector: 'anime-table',
    templateUrl: './anime-dashboard.component.html',
    styleUrls: ['./anime-dashboard.component.css'],
})
export class AnimeDashboardComponent {

    /** Displayed columns of anime table. */
    public readonly displayedAnimeTableColumns: string[] = [
        'imageUrl',
        'englishTitle',
        'japaneseTitle',
        'type',
        'airedStartDate',
        'status'
    ];

    /** Observable for anime previews. */
    public readonly $animePreviews: Observable<AnimePreview[]>;

    constructor(private readonly animeService: AnimeService) {
        this.$animePreviews = animeService.searchAnime();
    }
}