import videosReducer from "../videos";
import { MOST_POPULAR_SUCCESS } from "../../actions/videos";
import mostPopularResponse from "./responses/MOST_POPULAR_SUCCESS.json";
import mostPopularResponse_withPrevPageToken from "./responses/MOST_POPULAR_SUCCESS_withPrevPageToken.json";
import mostPopularSuccessState_prevState from "./states/MOST_POPULAR_SUCCESS_prevState.json";
import mostPopularSuccessState from "./states/MOST_POPULAR_SUCCESS.json";
import mostPopularSuccessState_withPrevPageToken from "./states/MOST_POPULAR_SUCCESS_withPrevPageToken.json";

const initialState = {
	mostPopular: {},
	byId: {},
};

describe("videos reducer", () => {
	test("test unused action type with default initial state", () => {
		const startState = undefined;
		const action = { type: "UNUSED_ACTION_TYPE" };
		const expectedEndState = { ...initialState };
		expect(videosReducer(startState, action)).toEqual(expectedEndState);
		expect(expectedEndState).toMatchSnapshot();
	});

	test("test with MOST_POPULAR_SUCCESS action", () => {
		const startState = { ...initialState };
		const action = {
			type: MOST_POPULAR_SUCCESS,
			payload: mostPopularResponse,
		};
		const expectedEndState = {
			...mostPopularSuccessState,
		};
		expect(videosReducer(startState, action)).toEqual(expectedEndState);
		expect(expectedEndState).toMatchSnapshot();
	});

	test("test for idempotence with MOST_POPULAR_SUCCESS action", () => {
		const startState = mostPopularSuccessState_prevState;
		const action = {
			type: MOST_POPULAR_SUCCESS,
			payload: mostPopularResponse,
		};
		// should keep and add to previous byId data, but not keep previous omstPopular
		const expectedEndState = {
			mostPopular: {
				...mostPopularSuccessState.mostPopular,
			},
			byId: {
				...startState.byId,
				...mostPopularSuccessState.byId,
			},
		};
		expect(videosReducer(startState, action)).toEqual(expectedEndState);
		expect(expectedEndState).toMatchSnapshot();
	});

	test("test for idempotence with MOST_POPULAR_SUCCESS action with prevPageToken", () => {
		const startState = mostPopularSuccessState_prevState;
		const action = {
			type: MOST_POPULAR_SUCCESS,
			payload: mostPopularResponse_withPrevPageToken,
		};
		// should keep and add to previous byId and mostPopular data
		const expectedEndState = {
			mostPopular: {
				...mostPopularSuccessState.mostPopular,
				itemIds: [
					...startState.mostPopular.itemIds,
					...mostPopularSuccessState.mostPopular.itemIds,
				],
			},
			byId: {
				...startState.byId,
				...mostPopularSuccessState.byId,
			},
		};
		expect(videosReducer(startState, action)).toEqual(expectedEndState);
		expect(expectedEndState).toMatchSnapshot();
	});
});
