import type {ImbricatedCommentI} from '../interfaces/CommentI';

/**
 * Orders the comments in a nested structure.
 */
export default function( comments:Comment[]): ImbricatedCommentI[]{
	const imbricatedComments: ImbricatedCommentI[] = getRootComments(comments);

	imbricatedComments.forEach( (comment:ImbricatedCommentI) => {
		comment.children_comments = getAllChildComments(comment, comments);
	});
	return imbricatedComments;
}

/**
 * Retrieves the Comments that are not children of any other comment.
 */
function getRootComments( comments:Comment[] ){
	return comments.filter( (comment:Comment) => comment.parent_comment === null);
}
 
/**
 * Retreives all the comments that are children of a given comment, no matter how deep they are.
 * The returned comments are nested in the children_comments property of the input comment.
 */
function getAllChildComments( comment: Comment ,  children:Comment[] ):ImbricatedCommentI[]{
	const childComments: Comment[] = getImmediateChildComments(comment, children);
	childComments.forEach( (child:Comment) => {
		const subChildComments = getAllChildComments(child, children);
		child.children_comments = subChildComments;
	});
	return childComments;
}

/**
 * Retrieves the immediate child comments for a given comment.
 * The returned comments are filtered based on their parent comment ID,
 * which must match the ID of the input comment.
 */
function getImmediateChildComments( comment: Comment ,  children:Comment[]){
	return children.filter( (child:Comment) => child.parent_comment === comment.id);
}