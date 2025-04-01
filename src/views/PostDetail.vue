<template>
  <div class="post-detail">
    <h1 class="post-title">{{ post.title }}</h1>

    <div class="post-meta">
      <span>NO: {{ post.no }}</span>|
      <span>작성자: {{ post.writer }}</span>
<!--      <span>작성일: {{ post.date || '알 수 없음' }}</span>-->
    </div>

    <hr />

    <div class="post-content">
      <p>{{ post.content }}</p>
    </div>

    <hr />

    <!-- 댓글 입력 영역 -->
    <div class="comment-form">
      <textarea v-model="newComment" placeholder="댓글을 입력하세요..." />
      <button @click="addComment" :disabled="!newComment.trim()">등록</button>
    </div>

    <!-- 댓글 목록 출력 -->
    <div class="comment-list" v-if="commentsInfo[post.no] && commentsInfo[post.no].length">
      <h3>댓글 {{ commentsInfo[post.no].length }}개</h3>
      <ul>
        <li v-for="(comment, index) in commentsInfo[post.no]" :key="index" class="comment-item">
          <div class="comment-header">
            <span class="comment-content">{{ comment.content }}</span>
            <span class="comment-date">{{ comment.regDate }}</span>
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      newComment: ''
    }
  },
  computed: {
    postId() {
      return this.$route.params.id
    },
    post() {
      return this.$store.getters.getPostById(this.$route.params.id)
    },
    commentsInfo() {
      return this.$store.getters.getCommentsInfo
    }
  },
  methods: {
    addComment() {
      const content = this.newComment.trim()
      if (content) {
        const tmp = {postno: this.post.no, regDate: this.today(), content: content}
        this.$store.commit('pushComments', tmp)
        this.newComment = ''
      }
    },
    today() {
      const date = new Date()

      const yyyy = date.getFullYear()
      const mm = String(date.getMonth() + 1).padStart(2, '0')
      const dd = String(date.getDate()).padStart(2, '0')

      const hh = String(date.getHours()).padStart(2, '0')
      const mi = String(date.getMinutes()).padStart(2, '0')
      const ss = String(date.getSeconds()).padStart(2, '0')

      return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`
    }
  }
}
</script>

<style scoped>
.post-detail {
  max-width: 800px;
  margin: 40px auto;
  padding: 24px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  font-family: 'Helvetica Neue', sans-serif;
}

.post-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #2c3e50;
}

.post-meta {
  display: flex;
  gap: 20px;
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}

.post-content {
  font-size: 16px;
  line-height: 1.6;
  color: #333;
}

/* 기존 스타일 유지 + 댓글 관련 스타일 추가 */
.comment-form {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.comment-form textarea {
  resize: none;
  min-height: 80px;
  padding: 10px;
  font-size: 14px;
  font-family: inherit;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.comment-form button {
  align-self: flex-end;
  padding: 6px 12px;
  font-size: 14px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.comment-form button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.comment-list {
  margin-top: 20px;
}

.comment-item {
  background: #f9f9f9;
  padding: 10px;
  margin-bottom: 8px;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
}

.comment-item {
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  font-size: 14px;
  color: #333;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.comment-content {
  flex: 1;
}

.comment-date {
  font-size: 12px;
  color: #888;
  margin-left: 20px;
  white-space: nowrap;
}
</style>
