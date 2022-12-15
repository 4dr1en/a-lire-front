import type ArticleLightI from './articleLightI';
import type Comment from './commentI';
import type User from './userLightI';

export default interface ArticleLightI extends ArticleLightI {
	description: string,
	updated_at: string,
	moderated_at: string
	created_by: User,
	comments: Comment[],
}