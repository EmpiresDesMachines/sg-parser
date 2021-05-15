<template>
  <scrapper-wrapper />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

import scrapper from './scrapper'

import {mapActions, mapGetters} from 'vuex';
import scrapperWrapper from "./components/scrapperWrapper.vue";


export default {
  name: 'App',
  components: {
    scrapperWrapper,
    HelloWorld,
  },
  data() {
    return {
      data: [],
    };
  },
  async created() {
    let giveaways = await scrapper();
    this.GET_DATA(giveaways);
    setInterval(async () => {
      let giveaways = await scrapper();
      this.GET_DATA(giveaways);
    }, 180000);
    
  },
  computed: {
    ...mapGetters([
      'GIVEAWAYS',
    ]),
  },
  async mounted() {    
  },
  methods: {
    ...mapActions([
      'GET_DATA',
    ]),
    
  },
}
</script>

<style lang="sass">

@import '@/assets/sass/reset.sass'
// @import '@/assets/sass/mixins.sass'
@import '@/assets/sass/style.sass'

#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  font-size: 16px
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #fff
  font-weight: 700
  background: #0d1117
  min-height: 100vh

</style>
