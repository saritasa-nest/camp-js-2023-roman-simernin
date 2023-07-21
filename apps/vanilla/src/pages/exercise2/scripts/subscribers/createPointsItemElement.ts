/**
 * Create element for points list.
 *  @param points - Points.
 * */
export function createPointsItemElement(points: number): HTMLLIElement {
	const pointsElement = document.createElement('li');

	pointsElement.textContent = points.toString();

	pointsElement.classList.add('points-container__points-item');

	return pointsElement;
}
