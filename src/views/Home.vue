<template>
  <!-- <div class="home w-100 w-full h-100 h-full cover-full text-blue-700" :style="image"> -->
  <div
    class="home grid gap-0 grid-cols-1 md:grid-cols-2 relative bg-jas w-full md:w-screen h-full md:h-screen p-2 text-blackl text-base overflow-hidden"
  >
    <div
      class="search-window grid gap-0 grid-rows-2 w-full h-screen md:h-full overflow-y-hidden"
    >
      <div class="up flex flex-col justify-center items-center">
        <p class="label inline-block mb-5 font-extrabold text-5xl">
          <span class="app-name mr-4">Movie</span>
          <span
            class="star inline-block bg-fer px-2 py-1 rounded-md text-white"
          >
            <font-awesome-icon :icon="['far', 'star']" />
          </span>
        </p>

        <span class="inline-block relative w-5/6">
          <input
            type="text"
            class="search-input w-full pr-12 pl-4 py-2 font-light text-xl rounded-3xl focus:outline-none focus:ring-8 focus:ring-bdo text-bdo text-center transition duration-700 ease-in-out"
            placeholder="Let's search for 'Rambo 4'"
          />
          <font-awesome-icon
            :icon="['fas', 'search']"
            size="lg"
            class="absolute top-3 right-4 text-bdo"
          />
          <!-- <font-awesome-icon :icon="['fas', 'share-alt']" /> -->
        </span>
      </div>
      <div class="down grid gap-2 grid-cols-1 sm:grid-cols-2 pr-2">
        <div class="history px-2 pb-12 overflow-hidden">
          <p class="title mb-2 text-center font-bold text-2xl underline">
            History
          </p>
          <div class="list w-full h-full px-4 py-2 overflow-y-auto">
            <ul v-for="(n, index) in 20" :key="n">
              <li>{{ ++index }}. None available</li>
            </ul>
          </div>
        </div>
        <div class="frequent px-2 pb-12 overflow-hidden">
          <p class="title mb-2 text-center font-bold text-2xl underline">
            Frequent
          </p>
          <div class="list w-full h-full px-4 py-2 overflow-y-auto">
            <ul v-for="(n, index) in 20" :key="n">
              <li>{{ ++index }}. None available</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div
      class="result-window h-screen md:h-full relative mt-12 md:mt-0 bg-white flex flex-row flex-wrap overflow-y-auto rounded-lg"
    >
      <div
        class="adult-warning sticky top-0 p-2 rounded-br-lg rounded-tl-lg text-white font-medium bg-fer"
      >
        Adult contents included
      </div>
      <div
        class="per-page sticky top-0 p-2 rounded-b-lg text-white font-medium bg-bdo"
      >
        Per Page
        <input
          type="number"
          class="per-page-input w-8 md:w-10 md:px-1 rounded-lg font-medium focus:outline-none text-bdo text-center"
          placeholder="10"
        />
      </div>
      <div
        class="results-info sticky top-0 left-full p-2 rounded-tr-lg rounded-bl-lg text-white font-medium bg-bdo"
      >
        5678 results found
      </div>
      <div
        class="pages-info p-2 rounded-bl-lg rounded-tr-lg text-white font-medium bg-bdo"
      >
        Page 1 of 2345
      </div>
      <div
        class="nominations w-72 sm:w-80 px-4 py-2 bg-white border-b-4 border-l-4 border-jas rounded-xl transition duration-700 ease-in-out"
      >
        <span
          class="nomination-header inline-block bg-blackl my-2 mr-32 px-2 py-1 rounded-md text-white font-bold"
        >
          Nominations
        </span>

        <font-awesome-icon
          :icon="['far', 'minus-square']"
          size="2x"
          class="minimize inline-block"
          v-if="!minimized"
          @click="minimized = !minimized"
        />
        <font-awesome-icon
          :icon="['far', 'plus-square']"
          size="2x"
          class="not-minimize inline-block"
          v-if="minimized"
          @click="minimized = !minimized"
        />
        <transition-group
          name="fly-in"
          tag="span"
          appear
          v-if="!minimized"
          @click="minimized = !minimized"
        >
          <div
            class="nominated-card relative w-full first:mt-2 last:mb-2 my-4 py-2 pr-10 pl-4 text-xs sm:text-sm bg-jas"
            v-for="n in 5"
            :key="n"
          >
            <div class="name font-bold">King Kong</div>
            <div class="others flex justify-between">
              <div class="year">2021</div>
              <div class="group text-fer">PG-13</div>
              <div class="rate">
                <font-awesome-icon :icon="['far', 'star']" class="text-jas" />
                7.5
              </div>
            </div>
            <span>
              <font-awesome-icon
                :icon="['far', 'trash-alt']"
                class="absolute right-2 top-6 text-fer"
              />
            </span>
          </div>
        </transition-group>
      </div>

      <transition name="fly-in" appear v-if="fullNomination">
        <div class="nomination-info-overlay sticky top-0 left-0 w-full h-full bg-gray-50 rounded-lg opacity-80">
          <div
            class="nomination-info absolute top-60 sm:top-48 left-20 sm:left-36 p-4 border-2 border-fer rounded-xl bg-white opacity-100 shadow-2xl"
          >
            <p class="font-black text-lg sm:text-3xl">Nomination Completed</p>
            <p class="text-sm sm:text-xl text-bdo">You can only select 5 items</p>
            <div class="flex justify-around mt-4">
              <button class="px-2 sm:px-4 py-1 sm:py-2 rounded-xl sm:rounded-3xl bg-jas text-white focus:outline-none">Reset</button>
            <button class="px-2 sm:px-4 py-1 sm:py-2 rounded-xl sm:rounded-3xl bg-fer text-white focus:outline-none" @click="fullNomination =! fullNomination">Close</button>
            </div>
          </div>
        </div>
      </transition>
      <p class="w-full"></p>
      <div
        class="card w-64 md:w-72 h-72 md:h-80 my-6 last:mb-20 mx-auto sm:ml-6 md:ml-4"
        v-for="n in 11"
        :key="n"
      >
        <img src="" alt="Avatar for " class="w-full h-52 md:h-64 rounded-xl" />
        <div class="details px-4 pb-1 text-sm font-medium">
          <div class="name text-jas font-black">King Kong</div>
          <div class="others flex justify-around">
            <div class="year">2021</div>
            <div class="group text-fer">PG-13</div>
            <div class="rate">
              <font-awesome-icon :icon="['far', 'star']" class="text-jas" />
              7.5
            </div>
          </div>
          <div class="extra flex justify-around">
            <font-awesome-icon :icon="['fas', 'share-alt']" />
            <font-awesome-icon
              :icon="['fab', 'creative-commons-share']"
              class="text-xl"
            />
            <font-awesome-icon :icon="['fas', 'external-link-alt']" class="" />
          </div>
        </div>
      </div>
    </div>
    <div
      class="navigate flex flex-row justify-between absolute bottom-0 right-2 w-36 sm:w-48 md:w-52 p-1 text-lg sm:text-2xl md:text-3xl"
    >
      <button class="double-back">
        <font-awesome-icon :icon="['fas', 'angle-double-left']" />
      </button>
      <button class="back">
        <font-awesome-icon :icon="['fas', 'chevron-circle-left']" />
      </button>
      <button class="next">
        <font-awesome-icon :icon="['fas', 'chevron-circle-right']" />
      </button>
      <button class="double-next">
        <font-awesome-icon :icon="['fas', 'angle-double-right']" />
      </button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "Home",
  components: {
    // HelloWorld
  },

  data() {
    return {
      minimized: true,
      fullNomination: true,
      // image: {backgroundImage: "url(https://source.unsplash.com/{width}x{height})"}
      // image: {backgroundImage: "url(https://source.unsplash.com/4050x6000)"}
      // image: {backgroundImage: "url(https://source.unsplash.com/1600x900)"}
      // https://picsum.photos/200/300
      // https://picsum.photos/200/300?grayscale
      // https://picsum.photos/200/300/?blur=2
      // https://picsum.photos/id/870/200/300?grayscale&blur=2
      // https://loremflickr.com/1600/900
    };
  },
};
</script>

<style lang="scss" scoped>
$fer: #ce2029;
$bdo: #9c2542;
$jas: #ffbd2d;
$blackl: #262a41;
// .home {

// }

svg:hover {
  color: $jas;
}

.navigate svg:hover,
.navigate button:focus {
  border: none;
  outline: none;
  color: white;
}

.label:hover .app-name {
  color: $fer;
}

.label:hover .star {
  background-color: $blackl;
  color: $jas;
}

.adult-warning,
.per-page,
.results-info,
.pages-info,
.nominations {
  height: fit-content;
}

// .adult-warning,
// .per-page,
// .pages-info,
// .nominations {
//   position: sticky;
//   top: 100%;
//   left: 0;
//   height: fit-content;
// }

.nominations {
  position: -webkit-sticky; /* Safari */
  position: sticky;
  // position: fixed;
  top: 7.5%;
  // bottom: 50vh;
  // right: 0;
  left: 100%;
  // right: .5rem;
}

.pages-info {
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 91.2vh;
  right: 100%;
}

.nomination-info-over {
  z-index: 2222;
}

.nomination-info {
  width: fit-content;
  height: fit-content;
  z-index: 3333;
}

.result-window::-webkit-scrollbar,
.list::-webkit-scrollbar {
  display: none;
}

.result-window,
.list {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

::placeholder {
  color: $bdo;
  text-align: center;
  font-weight: 100;
}

::-moz-placeholder {
  color: $bdo;
  text-align: center;
  font-weight: 100;
}

.history,
.frequent {
  background-color: white;
  // padding: 10px 20px;
  clip-path: inset(0 round 10px 20px 40px 30px);
  -webkit-clip-path: inset(0 round 10px 20px 40px 30px);
}

.result-window {
  // margin: 10px;
  // border-radius: 10px;
  clip-path: polygon(0% 0%, 100% 0%, 100% 90%, 40% 100%, 0% 100%);
  -webkit-clip-path: polygon(0% 0%, 100% 0%, 100% 90%, 40% 100%, 0% 100%);
}

// .minimize:focus .nominations {
//   width: 0;
//   height: 0;
//   display: none;
// }

// .not-minimize

// .nomination-header:hover {
//   background-color: $fer;
// }

.fa-minus-square:hover {
  color: red;
}

.fa-plus-square:hover {
  color: blue;
}

.card,
.nominated-card {
  background-color: #e0e0e0;
  border-radius: 16px;
  box-shadow: 12px 12px 24px #c7c7c7, -12px -12px 24px #f9f9f9;
}

.nominated-card {
  border-radius: 4px;
  box-shadow: 3px 3px 8px #c7c7c7, -3px -3px 8px #f9f9f9;
}

.list {
  border-radius: 16px;
  box-shadow: inset 2px 2px 4px #c7c7c7, inset -2px -2px 4px #f9f9f9;
}

.per-page {
  left: 50%;
}

@media screen and (max-width: 768px) {
  .home {
    font-size: 0.9rem;
  }

  .pages-info {
    position: -webkit-sticky; /* Safari */
    position: sticky;
    top: 94vh;
  }
}

@media screen and (max-width: 420px) {
  .home {
    font-size: 0.75rem;
  }

  .per-page {
    left: 40%;
  }

  .pages-info {
    position: -webkit-sticky; /* Safari */
    position: sticky;
    top: 94.5vh;
  }
}

// Transitions
.fly-in-enter {
  transform: translate(10px);
  opacity: 0;
}
.fly-in-enter-active,
.fly-in-leave-active {
  transition: all 0.5s ease;
}

.fly-in-leave-to {
  transform: translate(10px);
  opacity: 0;
}

.fly-in-move {
  transition: all 0.5s ease-in-out;
}
</style>
