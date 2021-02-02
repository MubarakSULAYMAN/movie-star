<template>
  <!-- <div class="home w-100 w-full h-100 h-full cover-full text-blue-700" :style="image"> -->
  <div
    class="home grid gap-0 grid-cols-1 md:grid-cols-2 relative bg-jas w-full md:w-screen h-full md:h-screen p-2 text-blackl text-base overflow-hidden"
  >
    <div
      class="search-window grid gap-0 grid-rows-2 w-full h-screen md:h-full overflow-y-hidden"
    >
      <div class="up">
        <div class="w-full h-2/3 flex flex-col justify-end items-center">
          <p
            class="label inline-block mb-5 font-extrabold text-5xl"
            @click="goTo('/')"
          >
            <span class="app-name mr-4">Movie</span>
            <span class="star inline-block bg-fer p-2 rounded-md text-white">
              <font-awesome-icon :icon="['far', 'star']" />
            </span>
          </p>

          <span class="inline-block relative w-5/6">
            <input
              type="text"
              class="search-input w-full pr-12 pl-4 py-2 font-light text-base md:text-xl rounded-3xl focus:outline-none focus:ring-8 focus:ring-bdo text-bdo text-center transition duration-700 ease-in-out"
              placeholder="Let's search for 'Rambo 4'"
              autocomplete="off"
              autofocus
              v-model="movieName"
              @keyup.enter="refetchMovie"
            />
            <font-awesome-icon
              :icon="['fas', 'search']"
              size="lg"
              class="absolute top-3 right-4 text-bdo"
              @click="refetchMovie"
            />
          </span>
        </div>

        <div class="w-full h-1/3">
          <div class="loader1" v-if="searching === true">Loading...</div>
        </div>
      </div>

      <div class="down grid gap-2 grid-cols-1 sm:grid-cols-2 pr-2">
        <div class="history px-2 pb-12 overflow-hidden">
          <p class="title mb-2 text-center font-bold text-2xl underline">
            History
          </p>
          <div class="list w-full h-full px-4 py-2 overflow-y-auto">
            <ul v-for="(n, index) in 20" :key="n">
              <li>{{ ++index }} . None available</li>
            </ul>
          </div>
        </div>
        <div class="frequent px-2 pb-12 overflow-hidden">
          <p class="title mb-2 text-center font-bold text-2xl underline">
            Frequent
          </p>
          <div class="list w-full h-full px-4 py-2 overflow-y-auto">
            <ul v-for="(n, index) in 20" :key="n">
              <li>{{ ++index }} . None available</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div
      class="result-window h-screen md:h-full relative mt-12 md:mt-0 pt-28 md:pt-24 pb-10 bg-white flex flex-row flex-wrap overflow-hidden rounded-lg"
    >
      <div
        class="adult-warning absolute top-0 left-0 p-2 rounded-br-lg rounded-tl-lg text-white font-medium bg-fer"
        v-if="adultContent === true"
      >
        Adult contents included
      </div>

      <div
        class="per-page absolute top-0 left-52 p-2 rounded-b-lg text-white font-medium bg-bdo"
      >
        Per Page
        <input
          type="number"
          class="per-page-input w-8 md:w-10 md:px-1 rounded-lg font-medium focus:outline-none text-bdo text-center"
          placeholder="10"
          min="5"
          max="25"
          minlength="1"
          maxlength="2"
          step="5"
          v-model="perPage"
        />
        <span class="per-page-text">Between 5 and 25</span>
      </div>

      <div
        class="results-info absolute top-0 right-0 p-2 rounded-tr-lg rounded-bl-lg text-white font-medium bg-bdo"
      >
        5678 results found
      </div>

      <div
        class="pages-info p-2 absolute bottom-0 left-0 rounded-bl-lg rounded-tr-lg text-white font-medium bg-bdo"
      >
        Page 1 of 2345
      </div>

      <div
        class="w-full h-full flex flex-col justify-center items-center"
        v-if="movies.length === 0 && searching === false"
      >
        <p class="mb-6 text-center text-6xl md:text-9xl font-black">
          Welcome Here
        </p>
        <p class="text-3xl md:text-6xl font-bold text-fer">No Result Found</p>
      </div>

      <transition name="fly-in" appear>
        <div
          class="nominations w-72 sm:w-80 px-4 py-2 absolute right-0 top-11 z-50 bg-white border-b-4 border-l-4 border-jas rounded-xl transition duration-700 ease-in-out"
          v-if="nominations.length > 0"
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
              <div class="name font-bold">movie.Title</div>
              <div class="others flex justify-between">
                <div class="year">movie.Year | truncateYear</div>
                <div class="group text-fer">movie.Rated</div>
                <div class="rate">
                  <font-awesome-icon :icon="['far', 'star']" class="text-jas" />
                  movie.imdbRating
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
      </transition>

      <transition name="fly-in" appear>
        <div
          class="nomination-info-overlay absolute top-0 left-0 w-full h-full bg-gray-50 rounded-lg opacity-80"
          v-if="fullNomination"
        >
          <div
            class="nomination-info absolute top-64 md:top-56 left-14 md:left-40 p-4 border-2 border-fer rounded-xl bg-white opacity-100 shadow-2xl"
          >
            <p class="font-black text-lg sm:text-3xl">Nomination Completed</p>
            <p class="text-sm sm:text-xl text-bdo">
              You can only select 5 items
            </p>
            <div class="flex justify-around mt-4">
              <button
                class="px-2 sm:px-4 py-1 sm:py-2 rounded-xl sm:rounded-3xl bg-jas text-white focus:outline-none"
              >
                Reset
              </button>
              <button
                class="px-2 sm:px-4 py-1 sm:py-2 rounded-xl sm:rounded-3xl bg-fer text-white focus:outline-none"
                @click="fullNomination = !fullNomination"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </transition>

      <transition name="fly-in" appear>
        <!-- && window.outerWidth >= 768 -->
        <p
          class="absolute top-16 left-2 md:left-5 z-0 font-bold text-base md:text-xl"
          v-if="movieName && movies.length === 0"
        >
          <span v-if="searching === false"
            >Let's search for
          </span>
          <span v-if="searching === true"
            >Searching for
          </span>
          <span class="capitalize text-bdo">
            {{ this.movieName | truncateName }}
          </span>
        </p>

        <p
          class="absolute top-16 left-2 md:left-5 z-0 font-bold text-base md:text-xl"
          v-if="this.$route.query.name && movies.length > 0"
        >
          Showing results for
          <span class="capitalize text-bdo">
            "{{ this.$route.query.name | truncateName }}"
          </span>
        </p>
      </transition>

      <div class="w-full h-full">
        <div
          class="loader2-wrapper w-full h-full absolute top-0 left-0 flex justify-center items-center"
          v-if="searching === true"
        >
          <div class="loader2 flex place-items-center">Loading...</div>
        </div>
        <div
          class="movies-window w-full h-full flex flex-row flex-wrap overflow-y-auto"
          v-if="movies.length > 0"
        >
          <div
            class="movie-card w-64 md:w-72 h-72 md:h-80 my-6 last:mb-20 mx-auto sm:ml-6 md:ml-4"
            v-for="(movie, index) in movies"
            :key="index"
          >
            <div class="movie-image w-full h-52 relative md:h-64 rounded-xl">
              <img
                :src="movie.Poster"
                :alt="`Avatar for '${movie.Title}'`"
                class="w-full h-full rounded-xl p-6 text-center font-bold"
              />
              <span
                class="vote inline-block p-1 md:p-2 absolute top-0 left-0 bg-black opacity-80 rounded-xl hover:text-jas"
              >
                <font-awesome-icon
                  :icon="['far', 'thumbs-up']"
                  class="text-white text-lg md:text-3xl"
                />
              </span>
            </div>
            <div class="details px-4 pb-1 text-sm font-medium">
              <div class="name text-jas font-black">{{ movie.Title | truncateTitle }}</div>
              <div class="others flex justify-around">
                <div class="year">{{ movie.Year }}</div>
                <div class="group text-fer">{{ movie.Rated }}</div>
                <div class="rate">
                  <font-awesome-icon :icon="['far', 'star']" class="text-jas" />
                  {{ movie.imdbRating }}
                </div>
              </div>
              <div class="extra flex justify-around">
                <!-- <font-awesome-icon :icon="['fas', 'share-alt']" /> -->
                <span> {{ movie.Language }} </span>
                <!-- <font-awesome-icon
                :icon="['fab', 'creative-commons-share']"
                class="text-xl"
              /> -->
                <span> {{ movie.Runtime }} </span>
                <!-- <font-awesome-icon
                :icon="['fas', 'external-link-alt']"
                class=""
              /> -->
                <span class="capitalize"> {{ movie.Type }} </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="navigate flex flex-row justify-between absolute bottom-0 right-2 w-36 sm:w-48 md:w-44 lg:w-52 p-1 text-lg sm:text-xl md:text-2xl lg:text-3xl"
      v-if="movies.length > 0"
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

    <transition name="fly-in">
      <div class="warning" v-if="isWarning">
        <p>{{ message }}</p>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from "axios";
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "Home",
  components: {
    // HelloWorld
  },

  data() {
    return {
      movieName: "",
      perPage: 10,
      searching: false,
      minimized: true,
      fullNomination: false,
      movies: [],
      adultContent: false,
      nominations: [],
      isWarning: false,
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

  filters: {
    replaceEmpty(value, title) {
      if (!value) {
        return `No ${title} provided.`;
      } else return value;
    },

    truncateYear(value) {
      if (!value) {
        return "N/A";
      }

      value = value.toString();
      // value = String(value)

      if (value.length > 3) {
        value = value.slice(0, 3);
        return value;
      } else return value;
    },

    truncateName(value) {
      if (!value) {
        return "Not Available";
      }

      value = value.toString();
      // console.log('value: ', value)

      if (value.length > 15) {
        value = value.slice(0, 14) + "...";
        return value;
      } else return value;
    },

    truncateTitle(value) {
      if (!value) {
        return "N/A";
      }

      value = value.toString();
      // console.log('value: ', value)

      if (value.length > 34) {
        value = value.slice(0, 33) + "...";
        return value;
      } else return value;
    },

    truncateEmail(value) {
      if (!value) {
        return "No email provided.";
      }

      value = value.toString();

      if (value.length > 19) {
        value = value.slice(0, 21) + "...";
        return value;
      } else return value;
    },

    truncateBio(value) {
      if (!value) {
        return "No bio provided.";
      }

      value = value.toString();

      if (value.length > 37) {
        value = value.slice(0, 34) + "...";
        return value;
      } else return value;
    },

    formatNum(num) {
      if (!num) {
        return "No number provided.";
      }

      // num = num.toString()
      num = String(num);
      // num = `${num}`
      console.log(num);

      num.replace(/[- )(]/g, "");
      return num;
      //   return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },

  mounted() {
    // if (this.movies.length) {
      this.fetchMovie(this.$route.query.name);
    // }
  },

  methods: {
    goTo(route) {
      this.$router.push(route);
    },

    showWarning(message) {
      this.message = message;
      this.isWarning = true;
      setTimeout(() => (this.isWarning = false), 5000);
    },

    async refetchMovie() {
      // if (this.movieName) {
        await this.fetchMovie(this.movieName);
      // }
    },

    async fetchMovie(name) {
      const searchTerm = name;

      if (searchTerm) {
        this.searching = true;
      this.movies = [];
      
        try {
          let response = await axios.get(
            `http://www.omdbapi.com/?s=${searchTerm}&apikey=18a1df1e`
          );

          if ([200, 201].includes(response.status)) {
            let items = response.data.Search;

            if (items.length === 0) {
              this.searching = false;
              this.showWarning(`Zero (0) results found for ${searchTerm}.`);
              return;
            }

            for (let i = 0; i < items.length; i++) {
              let newReq = await axios.get(
                `http://www.omdbapi.com/?t=${items[i].Title}&page=1&apikey=18a1df1e`
              );
              this.movies.push(newReq.data);
            }

            this.searching = false;
            console.log(this.movies);

            this.$router.push({
              path: "/search",
              query: {
                name: searchTerm,
                page: 1
              },
            });
          }
        } catch (e) {
          this.showWarning("Error fetching data. Please try again.");
          this.searching = false;
          console.log(e);
        }
        return;
      }
      
      this.showWarning("A valid name is required to start a search.");
    },
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

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

.per-page .per-page-text {
  visibility: hidden;
  width: fit-content;
  background-color: $blackl;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  top: 120%;
  left: 42%;
  margin-left: -60px;
}

.per-page .per-page-text::after {
  content: "";
  position: absolute;
  bottom: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: $blackl transparent transparent transparent;
  transform: rotate(180deg);
}

.per-page:hover .per-page-text {
  visibility: visible;
}

.nomination-info-over {
  z-index: 2222;
}

.nomination-info {
  width: fit-content;
  height: fit-content;
  z-index: 3333;
}

.movies-window::-webkit-scrollbar,
.list::-webkit-scrollbar {
  display: none;
}

.movies-window,
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

.movie-card,
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

.movie-image:hover {
  transform: translate(0.5rem, -0.5rem) rotate(2deg) scale(1.02) skew(1deg);
  background-color: white;
  box-shadow: 8px 8px 16px #c7c7c7, inset -8px -8px 16px #f9f9f9;
}

.nomination-info-overlay {
  z-index: 5555;
}

.warning {
  position: fixed;
  bottom: 34px;
  left: 66px;
  display: inline-block;
  padding: 5px 10px;
  border: 2px solid red;
  border-radius: 5px;
  font-size: 20px;
  color: red;
  box-shadow: 4px 4px red;
  background-color: transparent;
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
  transition: all 0.5s;
  z-index: 1111;
}

.warning:hover {
  transform: translate(4px, 4px);
  box-shadow: none;
}

.warning p {
  margin: 0;
}
.warning p .active {
  position: fixed;
  bottom: -999px;
  left: 999px;
}

@media screen and (max-width: 768px) {
  .home {
    font-size: 0.9rem;
  }
}

@media screen and (max-width: 420px) {
  .home {
    font-size: 0.75rem;
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

// Animations

// Loader1
.loader1,
.loader1:before,
.loader1:after {
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation: load7 1.8s infinite ease-in-out;
  animation: load7 1.8s infinite ease-in-out;
}

.loader1 {
  color: #ffffff;
  font-size: 10px;
  margin: 80px auto;
  position: relative;
  text-indent: -9999em;
  -webkit-transform: translateZ(0) translateY(-5rem);
  -ms-transform: translateZ(0) translateY(-5rem);
  transform: translateZ(0) translateY(-5rem);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

.loader1:before,
.loader1:after {
  content: "";
  position: absolute;
  top: 0;
}

.loader1:before {
  left: -3.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.loader1:after {
  left: 3.5em;
}
@-webkit-keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
@keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}

// Loader2
.loader2-wrapper {
  z-index: 4444;
}

.loader2 {
  color: $jas;
  font-size: 90px;
  text-indent: -9999em;
  overflow: hidden;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  margin: 72px auto;
  position: relative;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  // z-index: 5555;
  -webkit-animation: load6 1.7s infinite ease, round 1.7s infinite ease;
  animation: load6 1.7s infinite ease, round 1.7s infinite ease;
}

@-webkit-keyframes load6 {
  0% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
      0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
  5%,
  95% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
      0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
  10%,
  59% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em,
      -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em,
      -0.297em -0.775em 0 -0.477em;
  }
  20% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em,
      -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em,
      -0.749em -0.34em 0 -0.477em;
  }
  38% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em,
      -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em,
      -0.82em -0.09em 0 -0.477em;
  }
  100% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
      0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
}
@keyframes load6 {
  0% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
      0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
  5%,
  95% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
      0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
  10%,
  59% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em,
      -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em,
      -0.297em -0.775em 0 -0.477em;
  }
  20% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em,
      -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em,
      -0.749em -0.34em 0 -0.477em;
  }
  38% {
    box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em,
      -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em,
      -0.82em -0.09em 0 -0.477em;
  }
  100% {
    box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
      0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
  }
}
@-webkit-keyframes round {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes round {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
