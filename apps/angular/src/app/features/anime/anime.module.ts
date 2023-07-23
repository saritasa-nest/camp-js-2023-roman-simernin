import { NgModule } from '@angular/core';
import { AnimeDashboardComponent } from './anime-dashboard/anime-dashboard.component';
import { AnimeService } from '@js-camp/angular/core/services/animeService';
import { HttpClientModule } from '@angular/common/http';
import { AnimePreviewMapper } from '@js-camp/angular/core/services/mappers/animePreviewMapper/animePreview.mapper';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

/** Anime table module. */
@NgModule({
    imports: [HttpClientModule, CommonModule, MatTableModule],
    declarations: [AnimeDashboardComponent],
    exports: [AnimeDashboardComponent],
    providers: [
        AnimeService,
        AnimePreviewMapper]
})
export class AnimeModule { }