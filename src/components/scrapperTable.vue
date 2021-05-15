<template>
  <div class="scrapper-table">
    <!-- {{ GIVEAWAYS }} -->
    <scrapper-select
      :options="options"
      :selectTitle="selectedOption"
      @select="optionSelected"
    />
    <scrapper-table-item 
      v-for="(giveaway, idx) in paginatedGiveaways"
      :key="idx"
      :giveaway="giveaway"
    />
  </div>
  <div class="scrapper-pagination"
    v-if="giveawaysPerPage < (GIVEAWAYS || []).length"
  >
  <div class="scrapper-pagination__page"
    v-if="currentPage > 1"
    @click="currentPage--"
  >
    Prev
  </div>
  <template
    v-if="pages <= 12"
  >
    <div
      class="scrapper-pagination__page"
      v-for="page in pages"
      :key="page"
      :class="{'is-active': page === currentPage}"
      @click="paginationClick(page)"
    >
      {{ page }}
    </div>
  </template>
  <div v-else>
    <div class="scrapper-pagination__page">{{ currentPage }}</div>
  </div>
    <div class="scrapper-pagination__page"
      v-if="currentPage < pages"
      @click="currentPage++"
    >
      Next
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import scrapperTableItem from '@/components/scrapperTableItem.vue'
  import scrapperSelect from '@/components/scrapperSelect.vue'


  export default {
    name: "scrapper-table",
    components: {
      scrapperTableItem,
      scrapperSelect,
    },
    props: {},
    data() {
      return {
        giveawaysPerPage: 10,
        currentPage: 1,
        options: [
          { name: 'infinite', value: 0 },
          { name: 'ten', value: 10 },
          { name: 'one hundred', value: 100 },
          { name: 'five hundred', value: 500 },
          { name: 'one thousand', value: 1000 },
        ],
        selectedOption: 'Select page length',
      };
    },
    created() {},
    mounted() {},
    methods: {
      paginationClick(page) {
        this.currentPage = page;
      },
      optionSelected(option) {
        this.currentPage = 1;
        this.selectedOption = option.name;
        if (!option.value) {
          return this.giveawaysPerPage = this.GIVEAWAYS.length;
        }
        this.giveawaysPerPage = option.value;
      },
    },
    computed: {
      ...mapGetters([
        'GIVEAWAYS',
      ]),
      pages() {
        return Math.ceil((this.GIVEAWAYS || []).length / this.giveawaysPerPage);
      },
      startIndex() {
        return (this.currentPage - 1) * this.giveawaysPerPage;
      },
      endIndex() {
        return this.currentPage * this.giveawaysPerPage;
      },
      paginatedGiveaways() {
        return (this.GIVEAWAYS || []).slice(this.startIndex, this.endIndex);
      },
    },
    watch: {},
  }
</script>

<style lang="sass">
.scrapper-table
  padding: 30px 0
  position: relative
.scrapper-pagination
  display: flex
  justify-content: center
  padding: 30px 0
  &__page
    padding: 20px
    margin: 0 4px
    border: 1px solid #fff
    cursor: pointer
    transition: 300ms ease-in-out
    &:hover
      border-color: lightgreen
      color: lightgreen
.is-active
  border-color: lightgreen
  color: lightgreen
</style>