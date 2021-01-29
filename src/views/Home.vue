<template>
  <!-- <div class="home w-100 w-full h-100 h-full cover-full text-blue-700" :style="image"> -->
   <!-- grid gap-0 grid-cols-1 md:grid-cols-2 bg-blackl w-full md:w-screen h-full md:h-screen -->
  <div class="home grid gap-0 grid-cols-1 md:grid-cols-2 bg-jas w-full md:w-screen h-full md:h-screen overflow-hidden">
    <div class="search-window grid gap-0 grid-cols-1 md:w-full h-screen md:h-full">
      <div class="up flex justify-center items-center">
        <input type="text" class="search-input w-3/4 px-4 py-2 font-light text-xl rounded-3xl focus:outline-none focus:ring-8 focus:ring-bdo text-bdo text-center transition-all" placeholder="Let's search for 'Rambo 4'">
      </div>
      <div class="down grid gap-0 grid-cols-2">
        <div class="history">
          <p class="title mb-5 text-center font-bold text-2xl underline">History</p>
          <ul>
            <li>None available</li>
          </ul>
        </div>
        <div class="frequent">
          <p class="title mb-5 text-center font-bold text-2xl underline">Frequent</p>
          <ul>
            <li>None available</li>
          </ul></div>
      </div>
    </div>
    <div class="result-window h-screen md:h-full bg-white flex flex-wrap overflow-y-auto pb-16">
      <div class="card w-64 md:w-72 h-72 md:h-80 my-4 mx-auto" v-for="n in 10" :key="n"></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    // HelloWorld
  },

  data() {
            return {
                // image: {backgroundImage: "url(https://source.unsplash.com/{width}x{height})"}
                // image: {backgroundImage: "url(https://source.unsplash.com/4050x6000)"}
                // image: {backgroundImage: "url(https://source.unsplash.com/1600x900)"}
                // https://picsum.photos/200/300
                // https://picsum.photos/200/300?grayscale
                // https://picsum.photos/200/300/?blur=2
                // https://picsum.photos/id/870/200/300?grayscale&blur=2
                // https://loremflickr.com/1600/900
            };
        }
}
</script>

<style lang="scss" scoped>
$bdo: #9C2542;
// .home {

// }

.result-window::-webkit-scrollbar {
  display: none;
}

// .search-input:hover .search-input::placeholder {
//    color: transparent;
//    }

.search-input::placeholder {
   color: $bdo;
   text-align: center;
   }

.search-input::-moz-placeholder {
  color: $bdo;
   text-align: center;
  }

.result-window {
  -ms-overflow-style: none;
  scrollbar-width: none; }

.history,
.frequent {
  background-color: white;
  padding: 10px 20px;
  clip-path: inset(10px round 10px 20px 40px 30px);
  -webkit-clip-path: inset(10px round 10px 20px 40px 30px);
}

.result-window {
  margin: 10px;
    border-radius: 10px;
clip-path: polygon(0% 0%, 100% 0%, 100% 90%, 40% 100%, 0% 100%);
-webkit-clip-path: polygon(0% 0%, 100% 0%, 100% 90%, 40% 100%, 0% 100%);
}

.card {
  border-radius: 17px;
background: #e0e0e0;
box-shadow:  12px 12px 24px #c7c7c7,
             -12px -12px 24px #f9f9f9;
}
</style>
