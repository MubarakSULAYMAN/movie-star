<template>
  <div @mouseover="visible = true" @mouseleave="visible = false">
    <div class="intro text-xs sm:text-base font-light z-50">We understand how embarrassing it can be when lost.</div>

    <img
      src="../assets/images/404-Pages.jpg"
      alt="Image showing a woman on a lookout."
    />

    <div class="return-home text-base sm:text-xl md:text-3xl font-bold z-50" v-if="visible">
      Let's help you <span @click="goTo('/')" class="inline-block cursor-default text-white text-3xl font-black hover:underline transition duration-500 ease-in-out">return</span> safely.
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    goTo(route) {
      this.$router.push(route);
    },
  },
};
</script>

<style scoped>
.intro {
  position: absolute;
  bottom: 0;
  left: 35%;
}

.return-home {
  position: absolute;
  bottom: 38%;
  left: 33.5%;
}

img {
  width: 100vw;
  height: 100vh;
}

@media (max-width: 768px) {
.intro {
  left: 20%;
}

.return-home {
  bottom: 40%;
  left: 28%;
}
}
@media (max-width: 420px) {
 .intro {
  left: 10%;
}

.return-home {
  left: 15%;
}
}
</style>
