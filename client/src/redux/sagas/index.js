import { takeLatest, call, put } from 'redux-saga/effects';
import * as actions from '../actions';
import * as api from '../../api';

function* fetchPostSaga(action) {
    try {
        const posts = yield call(api.fetchPosts);
        console.log('[posts]', posts);
        yield put(actions.getPosts.getPostSuccess(posts.data));
    } catch (err){
        console.log(err);
        yield put(actions.getPosts.getPostFailure(err));
    }
    
}

function* createPostSaga(action) {
    try {
        const post = yield call(api.createPost, action.payload);
        console.log('[create-post-saga]', post);
        yield put(actions.createPost.createPostSuccess(post.data));
    } catch (err){
        console.log(err);
        yield put(actions.createPost.createPostFailure(err));
    }
    
}

function* updatePostSaga(action) {
    try {
        const updatedPost = yield call(api.updatePost, action.payload);
        console.log('[updated-post-saga]', updatedPost);
        yield put(actions.updatePost.updatePostSuccess(updatedPost.data));
    } catch (err){
        console.log(err);
        yield put(actions.updatePost.updatePostFailure(err));
    }
    
}

function* mySaga() {
    yield takeLatest(actions.getPosts.getPostsRequest, fetchPostSaga);
    yield takeLatest(actions.createPost.createPostRequest, createPostSaga);
    yield takeLatest(actions.updatePost.updatePostRequest, updatePostSaga);
}

export default mySaga;