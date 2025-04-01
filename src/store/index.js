import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        selectedPost: null, /* 선택 게시물 */
        commentsInfo: {},
        posts: [
            { no: '1', title: '제목 1', cnt: 0, writer: '개발자', content: '개발자가 작성한 글내용1' },
            { no: '2', title: '제목 2', cnt: 0, writer: '디자이너', content: '디자이너가 작성한 글내용2' },
            {no:'3', title: '제목3', cnt :0, writer: '작성자3', content: '작성자3가 작성한 글내용3'},
            {no:'4', title: '제목4', cnt :0, writer: '작성자4', content: '작성자4가 작성한 글내용4'},
            {no:'5', title: '제목5', cnt :0, writer: '작성자5', content: '작성자5가 작성한 글내용5'},
            {no:'6', title: '제목6', cnt :0, writer: '작성자6', content: '작성자6가 작성한 글내용6'},
            {no:'7', title: '제목7', cnt :0, writer: '작성자7', content: '작성자7가 작성한 글내용7'},
            {no:'8', title: '제목8', cnt :0, writer: '작성자8', content: '작성자8가 작성한 글내용8'},
            {no:'9', title: '제목9', cnt :0, writer: '작성자9', content: '작성자9가 작성한 글내용9'},
            {no:'10', title: '제목10', cnt :0, writer: '작성자10', content: '작성자10가 작성한 글내용10'},
            {no:'11', title: '제목11', cnt :0, writer: '작성자11', content: '작성자11가 작성한 글내용11'},
            {no:'12', title: '제목12', cnt :0, writer: '작성자12', content: '작성자12가 작성한 글내용12'},
            {no:'13', title: '제목13', cnt :0, writer: '작성자13', content: '작성자13가 작성한 글내용13'},
            {no:'14', title: '제목14', cnt :0, writer: '작성자14', content: '작성자14가 작성한 글내용14'},
            {no:'15', title: '제목15', cnt :0, writer: '작성자15', content: '작성자15가 작성한 글내용15'},
            {no:'16', title: '제목16', cnt :0, writer: '작성자16', content: '작성자16가 작성한 글내용16'},
            {no:'17', title: '제목17', cnt :0, writer: '작성자17', content: '작성자17가 작성한 글내용17'},
        ]
    },
    mutations: {
        setSelectedPost(state, post) {
            state.selectedPost = post
        },
        pushComments(state, comment) {

            if (!state.commentsInfo || Object.keys(state.commentsInfo).length === 0) {
                const local = JSON.parse(localStorage.getItem('commentsInfo'))
                if( local != null ) {
                    state.commentsInfo = local
                }
            }

            if ( state.commentsInfo != null && !state.commentsInfo[comment.postno] ) {
                // postno 키가 없으면 배열로 초기화
                Vue.set(state.commentsInfo, comment.postno, [])
            }

            state.commentsInfo[comment.postno].push(comment)

            state.commentsInfo[comment.postno].sort((a, b) => {
                return new Date(b.regDate) - new Date(a.regDate) // 최신순
            })

            localStorage.setItem('commentsInfo', JSON.stringify(state.commentsInfo))
        }
    },
    getters: {
        getPostById: state => no => state.posts.find(post => post.no === no),
        getCommentsInfo: state => {
            if (!(!state.commentsInfo || Object.keys(state.commentsInfo).length === 0)) {
                return state.commentsInfo
            }
            const stored = localStorage.getItem('commentsInfo')
            if (stored) {
                try {
                    return JSON.parse(stored)
                } catch (e) {
                    console.error('댓글 복원 실패:', e)
                }
            }

            return {}
        },
        getPosts: (state, getters) => {
            const tmp = getters.getCommentsInfo
            state.posts.map(post=>{
                const tmpchk = !!tmp[post.no]
                if ( tmpchk ) {
                    post.cnt = tmp[post.no].length
                }
                return post
            })

            return state.posts
        },
    }
})
