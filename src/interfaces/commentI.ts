import type User from './userLightI';

export default interface CommentI {
	id: number,
	text: string,
	status: string,
	created_at: string,
	edited_at: string,
	moderated_at: string,
	written_by: User,
	belong_to_article: string,
	parent_comment: number,
}