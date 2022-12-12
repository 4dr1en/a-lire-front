export default interface ArticleLightI {
	id: number,
	url: string|null,
	title: string,
	thumbnail: string|null,
	status: string|null,
	created_at: string|null,
	belong_to: number,
}