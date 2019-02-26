import { all, call, put, fork } from "redux-saga/effects";

import * as videoSagas from "./videos";

export default function*() {
	yield all([
		fork(helloSaga),
		fork(videoSagas.saga_watchMostPopular),
		fork(videoSagas.saga_watchCategories),
		fork(videoSagas.saga_watchMostPopularByCategory),
	]);
}

function* helloSaga() {
	console.log("Hello Saga!");
}

// entity refers to action group
// entity must have request, success, failure methods
// request is function that returns promise when called
export function* saga_fetchEntity(request, entity, ...args) {
	try {
		const response = yield call(request);
		console.log("ENTITY SUCCESS", entity.success(response.result, ...args));
		// return response.result, throwing away headers/status text
		// if headers/status are needed, return full response instead of response.result
		yield put(entity.success(response.result, ...args));
	} catch (error) {
		console.log("ENTITY FAILURE", entity.failure(error, ...args));
		yield put(entity.failure(error, ...args));
	}
}
export function* saga_fetchEntities(requests, entity, ...args) {
	try {
		const response = yield all(requests);
		console.log("ENTITIES SUCCESS", entity.success(response, ...args));
		// return response.result, throwing away headers/status text
		// if headers/status are needed, return full response instead of response.result
		yield put(entity.success(response, ...args));
	} catch (error) {
		console.log("ENTITIES FAILURE", entity.failure(error, ...args));
		yield put(entity.failure(error, ...args));
	}
}

// helper function that returns responses and errors from promises
export const ignoreErrors = promise => () =>
	promise
		.then(response => response.result)
		.catch(response => response.result.error);
