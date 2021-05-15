<template>
  <div class="scrapper-select">
    <p 
      class="select__title"
      ref="select"
      @click="isVisible = !isVisible"
    >
      {{selectTitle}}
    </p>
    <div class="select"
      v-if="isVisible"
    >
      <div
        v-for="(option, idx) in options"
        :key="idx"
        class="select__item"
        @click="selectOption(option)"
      >
        {{ option.name }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "scrapper-select",
    components: {},
    props: {
      options: {
        type: Array,
        default: () => [],
      },
      selectTitle: {
        type: String,
        default: 'selectTitle',
      }

    },
    data() {
      return {
       isVisible: false,
      };
    },
    created() {},
    mounted() {
      const v = this;
      document.addEventListener('click', (event) => {
        if(event.target !== v.$refs.select) {
          this.isVisible = false;
        }
      });
    },
    methods: {
      selectOption(option) {
        this.isVisible = false;
        this.$emit('select', option);
      }
    },
    computed: {},
    watch: {},
  }
</script>

<style lang="sass">
.scrapper-select
  position: absolute
  top: 0
  right: 0
  width: 150px
  z-index: 99
  user-select: none
  background-color: #0d1117
.select__item,
.select__title
  text-align: left
.select__item
  padding: 10px 4px
  border-bottom: 1px solid #fff
  cursor: pointer
  transition: 300ms ease-in-out
  &:hover
    color: green
    border-bottom-color: green
.select__title
  padding-bottom: 4px
  margin-bottom: 8px
  border-bottom: 1px solid #fff
  cursor: pointer
  &:hover
    color: aqua
    border-bottom-color: aqua 
</style>