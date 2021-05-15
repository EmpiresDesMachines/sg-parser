<template>
  <div class="scrapper-wrapper">
    <scrapper-header title="Steamgifts Giveaways Scrapper" />
    <scrapper-statistics />

    <scrapper-table />
  </div>
</template>

<script>
  import scrapperHeader from '@/components/scrapperHeader.vue'
  import scrapperTable from '@/components/scrapperTable.vue'
  import scrapperStatistics from '@/components/scrapperStatistics.vue'
  import {mapActions, mapGetters} from 'vuex';

  export default {
    name: "scrapper-wrapper",
    components: {
      scrapperHeader,
      scrapperTable,
      scrapperStatistics
    },
    props: {},
   
    data() {
      return {
        
      };
    },
    created() {},
    mounted() {},
    methods: {},
    computed: {
      ...mapGetters([
        'GIVEAWAYS',
      ]),
    },
    watch: {},
  }
</script>

<style lang="sass">

@import '@/assets/sass/mixins.sass'

.scrapper-wrapper
  max-width: 1180px
  margin: 0 auto
  +r(1200)
    max-width: 1200px
    margin: 0 10px
</style>