<template>
  <div class="scrapper-statistics">
    <div class="scrapper-statistics__block">
      <div>Giveaways stats</div>
      <div>total: {{ GIVEAWAYS ? giveawaysStats.total : loading }}</div>
      <div>restricted: {{ GIVEAWAYS ? giveawaysStats.restricted : loading }}</div>
    </div>
    <div class="scrapper-statistics__block">
      <div>level 0: {{ GIVEAWAYS ? giveawaysStats.lvl_0 : loading }}</div>
      <div>level 1: {{ GIVEAWAYS ? giveawaysStats.lvl_1 : loading }}</div>
      <div>level 2: {{ GIVEAWAYS ? giveawaysStats.lvl_2 : loading }}</div>
      <div>level 3: {{ GIVEAWAYS ? giveawaysStats.lvl_3 : loading }}</div>
      <div>level 4: {{ GIVEAWAYS ? giveawaysStats.lvl_4 : loading }}</div>
    </div>
    <div class="scrapper-statistics__block">
      <div>level 5: {{ GIVEAWAYS ? giveawaysStats.lvl_5 : loading }}</div>
      <div>level 6: {{ GIVEAWAYS ? giveawaysStats.lvl_6 : loading }}</div>
      <div>level 7: {{ GIVEAWAYS ? giveawaysStats.lvl_7 : loading }}</div>
      <div>level 8: {{ GIVEAWAYS ? giveawaysStats.lvl_8 : loading }}</div>
      <div>level 9: {{ GIVEAWAYS ? giveawaysStats.lvl_9 : loading }}</div>
      <div>level 10: {{ GIVEAWAYS ? giveawaysStats.lvl_10 : loading }}</div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'; 
  export default {
    name: "scrapper-statistics",
    components: {},
    props: {},
    data() {
      return {
        loading: 'loading data...',
      };
    },
    created() {
    },
    mounted() {
    },
    methods: {
      
    },
    computed: {
      ...mapGetters([
        'GIVEAWAYS',
      ]),
      giveawaysTotal() {
        return this.GIVEAWAYS.length;
      },
      giveawaysRestricted() {
        return this.GIVEAWAYS.filter(g => g.restricted).length;
      },
      giveawaysStats() {
        const stats = {
          total: 0,
          restricted: 0,
          lvl_0: 0, lvl_1: 0, lvl_2: 0, lvl_3: 0, lvl_4: 0, lvl_5: 0,
          lvl_6: 0, lvl_7: 0, lvl_8: 0, lvl_9: 0, lvl_10: 0,
        };
        this.GIVEAWAYS.forEach(el => {
          stats.total++;
          if(el.restricted) stats.restricted++;
          if(el.level === '0') stats.lvl_0++;
          if(el.level === '1') stats.lvl_1++;
          if(el.level === '2') stats.lvl_2++;
          if(el.level === '3') stats.lvl_3++;
          if(el.level === '4') stats.lvl_4++;
          if(el.level === '5') stats.lvl_5++;
          if(el.level === '6') stats.lvl_6++;
          if(el.level === '7') stats.lvl_7++;
          if(el.level === '8') stats.lvl_8++;
          if(el.level === '9') stats.lvl_9++;
          if(el.level === '10') stats.lvl_10++;
        });

        return stats;
      },
    },
    watch: {},
  }
</script>

<style lang="sass">
.scrapper-statistics
  padding: 20px 0
  // width: 50%
  display: flex
  justify-content: center
  &__block
    padding: 20px
    > div
      padding: 10px
      border: 1px solid #fff
      margin-bottom: 6px
      &:last-child
        margin-bottom: 0
</style>