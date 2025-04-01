<template>
  <div id="app">
    <header class="site-header">
      <div class="logo-wrapper">
        <img alt="Vue logo" src="./assets/logo.png" class="logo-img" />
        <router-link to="/" class="menu-link">게시판</router-link>
      </div>
    </header>
    <main class="site-content">
      <HelloWorld msg="게시판" />
      <router-view />
    </main>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
/* 전체 앱 */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

.site-header {
  display: flex;
  align-items: center;
  height: 70px;
  padding: 0 30px;
  background-color: #f8f8f8;
  border-bottom: 1px solid #ddd;
  position: sticky;
  top: 0;
  z-index: 100;
}

/* 로고 + 메뉴 묶는 래퍼 */
.logo-wrapper {
  display: flex;
  align-items: center;
  gap: 24px; /* 로고와 메뉴 간격 */
}

/* 로고 이미지 */
.logo-img {
  height: 50px;
  width: auto;
}

/* 메뉴 링크 */
.menu-link {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  text-decoration: none;
}

.menu-link:hover {
  color: #42b983;
}

.site-content {
  padding: 30px;
}

</style>
