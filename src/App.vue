<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Quizwand</router-link>
    </div>
    <router-view id="router-view" />
  </div>
</template>

<script>
const actionKeys = ["1", "2", "3", "4"];
let actionKeyHandler = null;

export default {
  created() {
    actionKeyHandler = event => {
      const key = event.key;
      // console.log("Key", event);
      if (actionKeys.includes(key)) {
        this.$store.dispatch({
          type: "buzzerPress",
          index: +key,
        });
        return event;
      }
      if (event.ctrlKey && event.keyCode === 13) {
        event.preventDefault();
        this.$store.dispatch("ctrlEnterPress");
        return event;
      }
      if (event.keyCode === 13 && event.target.nodeName === "BODY") {
        this.$store.dispatch("enterPress");
        return event;
      }
      // if (event.keyCode === 8 && event.target.nodeName === "BODY") {
      //   this.$store.dispatch("backspacePress");
      //   return event;
      // }
      if (event.keyCode === 32 && event.target.nodeName === "BODY") {
        this.$store.dispatch("spacePress");
        return event;
      }
    };
    addEventListener("keydown", actionKeyHandler);
  },
  destroyed() {
    removeEventListener("keydown", actionKeyHandler);
  },
};
</script>

<style>
:root {
  --color: #eee;
  --background: #000;
  --background-accent: rgb(83, 83, 83);
}
body {
  background: var(--background);
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--color);
  height: 100vh;
  background: var(--background);
  /* overflow: hidden; */
  display: flex;
  flex-direction: column;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #505050;
}

#nav a.router-link-exact-active {
  color: #797979;
}

#router-view {
  /* height: 100vh; */
  flex-basis: 0;
  flex-grow: 1;
}

a {
  text-decoration: none;
}
</style>
