import type ArticleLightI from './articleLightI';
import type FluxLightI from './fluxLightI';

export default interface FluxFullI extends FluxLightI {
	created_at: string,
	updated_at: string|null,
	created_by: string
	articles: ArticleLightI[],
}