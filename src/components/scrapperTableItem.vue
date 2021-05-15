<template>
  <div class="scrapper-table-item">
    <div class="scrapper-table-item__element">
      <a 
        :href="this.giveaway.giveawayLink"
        class="scrapper-table-item__game-name"
        target="_blank"
      >
        {{ this.giveaway.game }}
      </a>
    </div>
    <div class="scrapper-table-item__element">
      <a
      :href="giveaway.giveawayLink"
      :style="{ background: giveaway.gameIcon }"
      class="scrapper-table-item__game-icon"
      target="_blank"
      >
      </a>
    </div>
    <div
      :style="{ color: chooseColor }"
      class="scrapper-table-item__element scrapper-table-item__odds"
    > 
      {{ calculateOdds}}% 
    </div>
    <div class="scrapper-table-item__element">cost: {{giveaway.cost}}P</div>
    <div class="scrapper-table-item__element">{{giveaway.entries}} entries</div>
    <div class="scrapper-table-item__element">{{giveaway.remaining}} remaining</div>
    <div class="scrapper-table-item__element">level {{giveaway.level}}+</div>
    <div class="scrapper-table-item__element">{{giveaway.copies}} copies</div>
  </div>
</template>

<script>
  export default {
    name: "scrapper-table-item",
    components: {},
    props: {
      giveaway: {
        type: Object,
        default: () => {
          return {
          };
        }
      }
    },
    data() {
      return {
        
      };
    },
    created() {},
    mounted() {},
    methods: {},
    computed: {
      calculateOdds() {
        if (+this.giveaway.entries === 0) return 100;
        return (Math.round((this.giveaway.copies / (+this.giveaway.entries + 1) * 100) * 100) / 100).toFixed(2);
      },
      chooseColor() {
        if (this.calculateOdds >= 0.7 && this.giveaway.secondsRemaining <= 14600) return 'green';
        // if (this.calculateOdds >= 0.7 && this.giveaway.secondsRemaining >= 14600) return 'yellow';
        if (this.calculateOdds >= 0.25 && this.giveaway.secondsRemaining <= 3600) return 'green';
        if (this.calculateOdds < 0.3) return 'red';

      }
    },
    watch: {},
  }
</script>

<style lang="sass">
@import '@/assets/sass/mixins.sass'
.scrapper-table-item
  display: flex
  +r(870)
    padding: 4px
    border-bottom: 1px solid #fff
    border-top: 1px solid #fff
  // align-items: center

.scrapper-table-item__element
  padding: 0 10px
  line-height: 69px
  color: #fff
  +r(1080)
    line-height: 1
  +r(870)
    padding: 0 4px
  
.scrapper-table-item__game-icon
  display: inline-block
  vertical-align: top
  width: 184px
  height: 69px
  +r(870)
    display: none

.scrapper-table-item__odds,
.scrapper-table-item__game-name
  color: #fff

.scrapper-table-item__game-name
  overflow: hidden
  text-overflow: ellipsis
  float: left
  width: 200px
  white-space: nowrap
  text-decoration: none
  transition: color 300ms ease-in-out
  &:visited
    color: #f7aef8
  &:hover
    color: aqua
  +r(870)
    width: 100px
  

</style>